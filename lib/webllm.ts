/**
 * WebLLM integration for coding-drills app
 * Provides local LLM inference using Llama-3.1-8B-Instruct via WebLLM
 */

import * as webllm from '@mlc-ai/web-llm';

// ============================================================================
// WebGPU Type Declarations
// ============================================================================

/**
 * WebGPU types for browser environments
 * These extend the Navigator interface to include the WebGPU API
 * Note: In modern browsers with WebGPU support, these types are available
 * natively. This declaration is for TypeScript compilation in environments
 * where the WebGPU types might not be available.
 */
declare global {
  interface Navigator {
    readonly gpu?: GPU;
  }

  interface GPU {
    requestAdapter(options?: GPURequestAdapterOptions): Promise<GPUAdapter | null>;
    getPreferredCanvasFormat(): GPUTextureFormat;
  }

  interface GPURequestAdapterOptions {
    powerPreference?: 'low-power' | 'high-performance';
    forceFallbackAdapter?: boolean;
  }

  interface GPUAdapter {
    readonly features: ReadonlySet<string>;
    readonly limits: GPUSupportedLimits;
    readonly isFallbackAdapter: boolean;
    requestDevice(descriptor?: GPUDeviceDescriptor): Promise<GPUDevice>;
    requestAdapterInfo(): Promise<GPUAdapterInfo>;
  }

  interface GPUSupportedLimits {
    readonly maxTextureDimension1D: number;
    readonly maxTextureDimension2D: number;
    readonly maxTextureDimension3D: number;
    readonly maxTextureArrayLayers: number;
    readonly maxBindGroups: number;
    readonly maxBufferSize: number;
    readonly maxStorageBufferBindingSize: number;
    readonly maxUniformBufferBindingSize: number;
  }

  interface GPUAdapterInfo {
    readonly vendor: string;
    readonly architecture: string;
    readonly device: string;
    readonly description: string;
  }

  interface GPUDeviceDescriptor {
    label?: string;
    requiredFeatures?: Iterable<string>;
    requiredLimits?: Record<string, number>;
  }

  interface GPUDevice extends EventTarget {
    readonly features: ReadonlySet<string>;
    readonly limits: GPUSupportedLimits;
    readonly queue: GPUQueue;
    readonly lost: Promise<GPUDeviceLostInfo>;
    destroy(): void;
    createBuffer(descriptor: GPUBufferDescriptor): GPUBuffer;
  }

  interface GPUQueue {
    submit(commandBuffers: Iterable<GPUCommandBuffer>): void;
    writeBuffer(
      buffer: GPUBuffer,
      bufferOffset: number,
      data: BufferSource,
      dataOffset?: number,
      size?: number,
    ): void;
  }

  interface GPUDeviceLostInfo {
    readonly reason: 'unknown' | 'destroyed';
    readonly message: string;
  }

  interface GPUBufferDescriptor {
    label?: string;
    size: number;
    usage: number;
    mappedAtCreation?: boolean;
  }

  interface GPUBuffer {
    readonly size: number;
    readonly usage: number;
    readonly mapState: 'unmapped' | 'pending' | 'mapped';
    mapAsync(mode: number, offset?: number, size?: number): Promise<void>;
    getMappedRange(offset?: number, size?: number): ArrayBuffer;
    unmap(): void;
    destroy(): void;
  }

  interface GPUCommandBuffer {
    readonly label: string;
  }

  type GPUTextureFormat =
    | 'bgra8unorm'
    | 'rgba8unorm'
    | 'rgba8unorm-srgb'
    | 'bgra8unorm-srgb'
    | 'rgba16float'
    | 'rgba32float';
}

// ============================================================================
// Type Definitions
// ============================================================================

export type ModelStatus = 'idle' | 'loading' | 'ready' | 'error';

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface StreamCallbacks {
  onToken?: (token: string) => void;
  onComplete?: (fullResponse: string) => void;
  onError?: (error: Error) => void;
}

export interface ModelLoadProgress {
  progress: number;
  timeElapsed: number;
  text: string;
}

// ============================================================================
// Constants
// ============================================================================

const MODEL_ID = 'Llama-3.1-8B-Instruct-q4f32_1-MLC';

// ============================================================================
// Module State
// ============================================================================

let engine: webllm.MLCEngineInterface | null = null;
let modelStatus: ModelStatus = 'idle';
let lastError: Error | null = null;

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Check if code is running in browser environment with WebGPU support
 */
function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

/**
 * Check if WebGPU is supported
 */
async function checkWebGPUSupport(): Promise<boolean> {
  if (!isBrowser()) return false;

  try {
    if (!navigator.gpu) {
      return false;
    }
    const adapter = await navigator.gpu.requestAdapter();
    return adapter !== null;
  } catch {
    return false;
  }
}

/**
 * Format error message for user display
 */
function formatErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    // Handle common WebLLM errors with user-friendly messages
    if (error.message.includes('WebGPU')) {
      return 'WebGPU is not supported in this browser. Please use Chrome, Edge, or another WebGPU-compatible browser.';
    }
    if (error.message.includes('out of memory') || error.message.includes('OOM')) {
      return 'Not enough GPU memory to load the model. Please close other GPU-intensive applications and try again.';
    }
    if (error.message.includes('network') || error.message.includes('fetch')) {
      return 'Failed to download model files. Please check your internet connection and try again.';
    }
    return error.message;
  }
  return 'An unknown error occurred';
}

// ============================================================================
// Core Functions
// ============================================================================

/**
 * Initialize the Llama-3.1-8B-Instruct model
 * @param onProgress - Callback function receiving progress updates (0-100)
 * @returns Promise that resolves when model is loaded
 */
export async function initializeModel(onProgress?: (progress: number) => void): Promise<void> {
  // Prevent re-initialization if already loaded or loading
  if (modelStatus === 'ready') {
    return;
  }

  if (modelStatus === 'loading') {
    throw new Error('Model is already being loaded. Please wait for initialization to complete.');
  }

  // Check browser environment
  if (!isBrowser()) {
    throw new Error('WebLLM can only be initialized in a browser environment.');
  }

  // Check WebGPU support
  const hasWebGPU = await checkWebGPUSupport();
  if (!hasWebGPU) {
    modelStatus = 'error';
    lastError = new Error(
      'WebGPU is not supported in this browser. Please use Chrome 113+, Edge 113+, or another WebGPU-compatible browser.',
    );
    throw lastError;
  }

  modelStatus = 'loading';
  lastError = null;

  try {
    const initProgressCallback = (report: webllm.InitProgressReport) => {
      // Extract progress percentage from the report
      // The progress is typically in the format of download/initialization stages
      const progressMatch = report.text.match(/(\d+(?:\.\d+)?)\s*%/);
      let progressValue = 0;

      if (progressMatch) {
        progressValue = parseFloat(progressMatch[1]);
      } else if (report.progress !== undefined) {
        progressValue = report.progress * 100;
      }

      // Clamp progress between 0 and 100
      progressValue = Math.max(0, Math.min(100, progressValue));

      if (onProgress) {
        onProgress(progressValue);
      }
    };

    // Create the WebLLM engine
    engine = await webllm.CreateMLCEngine(MODEL_ID, {
      initProgressCallback,
    });

    modelStatus = 'ready';

    // Signal completion
    if (onProgress) {
      onProgress(100);
    }
  } catch (error) {
    modelStatus = 'error';
    lastError = error instanceof Error ? error : new Error(formatErrorMessage(error));
    engine = null;
    throw new Error(formatErrorMessage(error));
  }
}

/**
 * Send a chat message and get a complete response
 * @param systemPrompt - The system prompt to set context
 * @param messages - Array of conversation messages
 * @returns Promise resolving to the assistant's response
 */
export async function chat(
  systemPrompt: string,
  messages: Array<{ role: 'user' | 'assistant'; content: string }>,
): Promise<string> {
  if (!engine) {
    throw new Error('Model not initialized. Call initializeModel() first.');
  }

  if (modelStatus !== 'ready') {
    throw new Error(`Model is not ready. Current status: ${modelStatus}`);
  }

  try {
    // Build the messages array with system prompt
    const chatMessages: webllm.ChatCompletionMessageParam[] = [
      { role: 'system', content: systemPrompt },
      ...messages.map((msg) => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      })),
    ];

    const response = await engine.chat.completions.create({
      messages: chatMessages,
      temperature: 0.7,
      max_tokens: 2048,
    });

    // Use Array.at() for cleaner first element access (ES2022+)
    // Combined with optional chaining and nullish coalescing for safety
    const content = response.choices.at(0)?.message?.content ?? null;
    if (!content) {
      throw new Error('No response content received from model');
    }

    return content;
  } catch (error) {
    const errorMessage = formatErrorMessage(error);
    throw new Error(`Chat failed: ${errorMessage}`);
  }
}

/**
 * Send a chat message and stream the response
 * @param systemPrompt - The system prompt to set context
 * @param messages - Array of conversation messages
 * @param callbacks - Callbacks for streaming events
 * @returns Promise resolving to the complete response
 */
export async function streamChat(
  systemPrompt: string,
  messages: Array<{ role: 'user' | 'assistant'; content: string }>,
  callbacks: StreamCallbacks = {},
): Promise<string> {
  if (!engine) {
    throw new Error('Model not initialized. Call initializeModel() first.');
  }

  if (modelStatus !== 'ready') {
    throw new Error(`Model is not ready. Current status: ${modelStatus}`);
  }

  const { onToken, onComplete, onError } = callbacks;

  try {
    // Build the messages array with system prompt
    const chatMessages: webllm.ChatCompletionMessageParam[] = [
      { role: 'system', content: systemPrompt },
      ...messages.map((msg) => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      })),
    ];

    const stream = await engine.chat.completions.create({
      messages: chatMessages,
      temperature: 0.7,
      max_tokens: 2048,
      stream: true,
    });

    let fullResponse = '';

    for await (const chunk of stream) {
      // Use Array.at() for first element access (ES2022+)
      const delta = chunk.choices.at(0)?.delta?.content;
      if (delta) {
        fullResponse += delta;
        onToken?.(delta);
      }
    }

    // Use optional chaining for callback invocation
    onComplete?.(fullResponse);

    return fullResponse;
  } catch (error) {
    const wrappedError = error instanceof Error ? error : new Error(formatErrorMessage(error));
    if (onError) {
      onError(wrappedError);
    }
    throw new Error(`Stream chat failed: ${formatErrorMessage(error)}`);
  }
}

/**
 * Check if the model is loaded and ready
 * @returns boolean indicating if model is ready for inference
 */
export function isModelLoaded(): boolean {
  return modelStatus === 'ready' && engine !== null;
}

/**
 * Get the current model status
 * @returns Current status of the model
 */
export function getModelStatus(): ModelStatus {
  return modelStatus;
}

/**
 * Get the last error that occurred
 * @returns The last error or null if no error
 */
export function getLastError(): Error | null {
  return lastError;
}

/**
 * Reset the model state (useful for retry scenarios)
 * This will unload the current model if loaded
 */
export async function resetModel(): Promise<void> {
  if (engine) {
    try {
      // WebLLM engines don't have an explicit unload, but we can null the reference
      engine = null;
    } catch {
      // Ignore cleanup errors
    }
  }
  modelStatus = 'idle';
  lastError = null;
}

/**
 * Get information about the loaded model
 * @returns Model information or null if not loaded
 */
export function getModelInfo(): { modelId: string; status: ModelStatus } | null {
  if (!engine) {
    return null;
  }

  return {
    modelId: MODEL_ID,
    status: modelStatus,
  };
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Check browser compatibility for WebLLM
 * @returns Object with compatibility information
 */
export async function checkCompatibility(): Promise<{
  isCompatible: boolean;
  hasWebGPU: boolean;
  isBrowser: boolean;
  errorMessage?: string;
}> {
  const browserCheck = isBrowser();

  if (!browserCheck) {
    return {
      isCompatible: false,
      hasWebGPU: false,
      isBrowser: false,
      errorMessage: 'WebLLM requires a browser environment.',
    };
  }

  const webGPUCheck = await checkWebGPUSupport();

  if (!webGPUCheck) {
    return {
      isCompatible: false,
      hasWebGPU: false,
      isBrowser: true,
      errorMessage:
        'WebGPU is not supported. Please use Chrome 113+, Edge 113+, or another WebGPU-compatible browser.',
    };
  }

  return {
    isCompatible: true,
    hasWebGPU: true,
    isBrowser: true,
  };
}

// ============================================================================
// Default Export
// ============================================================================

export const webLLM = {
  initializeModel,
  chat,
  streamChat,
  isModelLoaded,
  getModelStatus,
  getLastError,
  resetModel,
  getModelInfo,
  checkCompatibility,
};

export default webLLM;
