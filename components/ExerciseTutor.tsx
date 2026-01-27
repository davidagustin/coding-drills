'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  buildExerciseTutorSystemPrompt,
  getRandomTutorStarter,
} from '@/lib/exercises/tutor-prompt';
import type { Exercise } from '@/lib/exercises/types';
import { checkCompatibility, initializeModel, isModelLoaded, streamChat } from '@/lib/webllm';

// ============================================================================
// Types
// ============================================================================

type TutorPhase = 'idle' | 'loading' | 'ready' | 'error';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ExerciseTutorProps {
  exercise: Exercise;
  hasVisualization: boolean;
  languageConfig: {
    color: string;
    bgColor: string;
    borderColor: string;
  };
}

// ============================================================================
// Helpers
// ============================================================================

function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

// ============================================================================
// Icons
// ============================================================================

function ChatIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
      />
    </svg>
  );
}

function SendIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
    </svg>
  );
}

// ============================================================================
// Component
// ============================================================================

const MAX_CONVERSATION_MESSAGES = 20;

export default function ExerciseTutor({
  exercise,
  hasVisualization,
  languageConfig,
}: ExerciseTutorProps) {
  const [phase, setPhase] = useState<TutorPhase>('idle');
  const [loadProgress, setLoadProgress] = useState(0);
  const [loadStatus, setLoadStatus] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isWebGPUSupported, setIsWebGPUSupported] = useState<boolean | null>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingContent, setStreamingContent] = useState('');
  const [input, setInput] = useState('');

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const systemPromptRef = useRef('');

  // Check WebGPU support and whether model is already loaded
  useEffect(() => {
    let cancelled = false;
    async function check() {
      // If model already loaded, jump straight to ready
      if (isModelLoaded()) {
        if (!cancelled) {
          setIsWebGPUSupported(true);
          startChat();
        }
        return;
      }
      const compat = await checkCompatibility();
      if (!cancelled) {
        setIsWebGPUSupported(compat.isCompatible);
      }
    }
    check();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Focus input when ready
  // biome-ignore lint/correctness/useExhaustiveDependencies: focus on phase change
  useEffect(() => {
    if (phase === 'ready') {
      inputRef.current?.focus();
    }
  }, [phase]);

  const startChat = useCallback(() => {
    systemPromptRef.current = buildExerciseTutorSystemPrompt(exercise, hasVisualization);
    const greeting: Message = {
      id: generateId(),
      role: 'assistant',
      content: getRandomTutorStarter(),
      timestamp: new Date(),
    };
    setMessages([greeting]);
    setPhase('ready');
  }, [exercise, hasVisualization]);

  const handleActivate = useCallback(async () => {
    // If model already loaded, skip download
    if (isModelLoaded()) {
      startChat();
      return;
    }

    setPhase('loading');
    setLoadProgress(0);
    setLoadStatus('Preparing to download model...');

    try {
      await initializeModel((progress) => {
        setLoadProgress(progress);
        if (progress < 10) {
          setLoadStatus('Connecting to model server...');
        } else if (progress < 50) {
          setLoadStatus('Downloading model weights...');
        } else if (progress < 90) {
          setLoadStatus('Loading model into GPU memory...');
        } else {
          setLoadStatus('Finalizing...');
        }
      });
      startChat();
    } catch (err) {
      setPhase('error');
      setErrorMessage(err instanceof Error ? err.message : 'Failed to load AI model');
    }
  }, [startChat]);

  const handleSend = useCallback(async () => {
    const text = input.trim();
    if (!text || isStreaming) return;

    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsStreaming(true);
    setStreamingContent('');

    try {
      // Build history, trimmed to last N messages
      const allMessages = [...messages, userMessage];
      const trimmed = allMessages.slice(-MAX_CONVERSATION_MESSAGES);
      const history = trimmed.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      let fullResponse = '';

      await streamChat(systemPromptRef.current, history, {
        onToken: (token) => {
          fullResponse += token;
          setStreamingContent(fullResponse);
        },
        onComplete: (response) => {
          const assistantMessage: Message = {
            id: generateId(),
            role: 'assistant',
            content: response,
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, assistantMessage]);
          setStreamingContent('');
          setIsStreaming(false);
        },
        onError: (error) => {
          console.error('Tutor streaming error:', error);
          const errMsg: Message = {
            id: generateId(),
            role: 'assistant',
            content: 'Sorry, I ran into an error. Please try sending your message again.',
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, errMsg]);
          setStreamingContent('');
          setIsStreaming(false);
        },
      });
    } catch (err) {
      console.error('Tutor chat error:', err);
      setStreamingContent('');
      setIsStreaming(false);
    }
  }, [input, isStreaming, messages]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // ============================================================================
  // Render phases
  // ============================================================================

  // Idle phase — activate button
  if (phase === 'idle') {
    return (
      <div className={`rounded-xl border ${languageConfig.borderColor} bg-zinc-900/50 p-6`}>
        <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
          <ChatIcon className={`w-5 h-5 ${languageConfig.color}`} />
          AI Tutor
        </h2>
        <p className="text-sm text-zinc-400 mb-4">
          Get Socratic guidance from a local AI tutor. It will ask questions and give hints without
          revealing the solution.
        </p>

        {isWebGPUSupported === false ? (
          <div className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg p-3">
            WebGPU is required but not supported in this browser. Please use Chrome 113+ or Edge
            113+.
          </div>
        ) : (
          <>
            <button
              type="button"
              onClick={handleActivate}
              disabled={isWebGPUSupported === null}
              className={`w-full py-2.5 px-4 rounded-lg font-medium transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${languageConfig.bgColor} ${languageConfig.color} hover:opacity-80`}
            >
              {isWebGPUSupported === null ? 'Checking compatibility...' : 'Activate AI Tutor'}
            </button>
            <p className="text-xs text-zinc-500 mt-2 text-center">
              Runs locally via WebGPU. ~3 GB download on first use (cached after).
            </p>
          </>
        )}
      </div>
    );
  }

  // Loading phase — progress bar
  if (phase === 'loading') {
    return (
      <div className={`rounded-xl border ${languageConfig.borderColor} bg-zinc-900/50 p-6`}>
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <ChatIcon className={`w-5 h-5 ${languageConfig.color}`} />
          AI Tutor
        </h2>

        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-zinc-400">Loading model</span>
            <span className="text-zinc-100 font-medium">{Math.round(loadProgress)}%</span>
          </div>
          <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300 ease-out"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
          <p className="text-xs text-zinc-500 text-center">{loadStatus}</p>
        </div>
      </div>
    );
  }

  // Error phase
  if (phase === 'error') {
    return (
      <div className={`rounded-xl border ${languageConfig.borderColor} bg-zinc-900/50 p-6`}>
        <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
          <ChatIcon className={`w-5 h-5 ${languageConfig.color}`} />
          AI Tutor
        </h2>
        <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-4">
          {errorMessage}
        </div>
        <button
          type="button"
          onClick={handleActivate}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-all cursor-pointer ${languageConfig.bgColor} ${languageConfig.color} hover:opacity-80`}
        >
          Retry
        </button>
      </div>
    );
  }

  // Ready phase — chat interface
  return (
    <div
      className={`rounded-xl border ${languageConfig.borderColor} bg-zinc-900/50 overflow-hidden`}
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-zinc-800 flex items-center gap-2">
        <ChatIcon className={`w-4 h-4 ${languageConfig.color}`} />
        <span className="text-sm font-medium text-white">AI Tutor</span>
        <span className="ml-auto text-xs text-zinc-500">{messages.length} messages</span>
      </div>

      {/* Messages */}
      <div className="max-h-[500px] overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${
                msg.role === 'user'
                  ? `${languageConfig.bgColor} ${languageConfig.color}`
                  : 'bg-zinc-800 text-zinc-100'
              }`}
            >
              <p className="whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}

        {/* Streaming content */}
        {isStreaming && streamingContent && (
          <div className="flex justify-start">
            <div className="max-w-[85%] rounded-xl px-3 py-2 text-sm bg-zinc-800 text-zinc-100">
              <p className="whitespace-pre-wrap">
                {streamingContent}
                <span className="inline-block w-1.5 h-3.5 bg-cyan-500 animate-pulse ml-0.5 align-text-bottom" />
              </p>
            </div>
          </div>
        )}

        {/* Typing dots */}
        {isStreaming && !streamingContent && (
          <div className="flex justify-start">
            <div className="rounded-xl px-3 py-2 bg-zinc-800">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" />
                <span
                  className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce"
                  style={{ animationDelay: '0.1s' }}
                />
                <span
                  className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce"
                  style={{ animationDelay: '0.2s' }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-zinc-800 p-3">
        <div className="flex gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a question..."
            disabled={isStreaming}
            rows={1}
            className="flex-1 px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-zinc-100 placeholder-zinc-500 resize-none focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-transparent disabled:opacity-50"
          />
          <button
            type="button"
            onClick={handleSend}
            disabled={!input.trim() || isStreaming}
            className={`px-3 rounded-lg transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${languageConfig.bgColor} ${languageConfig.color} hover:opacity-80`}
          >
            <SendIcon className="w-4 h-4" />
          </button>
        </div>
        <p className="text-xs text-zinc-600 mt-1.5">Enter to send, Shift+Enter for newline</p>
      </div>
    </div>
  );
}
