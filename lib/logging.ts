/**
 * Structured Logging and Observability Service
 *
 * Provides structured logging, metrics collection, alerting hooks,
 * and observability capabilities for incident response readiness.
 *
 * @module lib/logging
 */

// ============================================================================
// Types and Interfaces
// ============================================================================

export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'fatal';

export type MetricType = 'counter' | 'gauge' | 'histogram' | 'timer';

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: Record<string, unknown>;
  correlationId?: string;
  traceId?: string;
  spanId?: string;
  service: string;
  environment: string;
  version: string;
  duration?: number;
  error?: {
    name: string;
    message: string;
    stack?: string;
  };
  metadata?: Record<string, unknown>;
}

export interface Metric {
  name: string;
  type: MetricType;
  value: number;
  timestamp: string;
  labels?: Record<string, string>;
  unit?: string;
}

export interface AlertPayload {
  alertId: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  source: string;
  timestamp: string;
  context?: Record<string, unknown>;
  runbookUrl?: string;
  correlationId?: string;
}

export interface AlertHandler {
  name: string;
  enabled: boolean;
  handler: (alert: AlertPayload) => void | Promise<void>;
  minSeverity?: AlertPayload['severity'];
}

export interface LoggingConfig {
  service: string;
  environment: string;
  version: string;
  minLevel: LogLevel;
  enableConsole: boolean;
  enablePersistence: boolean;
  enableMetrics: boolean;
  maxLogEntries: number;
  alertHandlers: AlertHandler[];
  onLog?: (entry: LogEntry) => void;
}

// ============================================================================
// Constants
// ============================================================================

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
  fatal: 4,
};

const STORAGE_KEYS = {
  LOGS: 'coding-drills-logs',
  METRICS: 'coding-drills-metrics',
  ALERTS: 'coding-drills-alerts',
} as const;

const DEFAULT_CONFIG: LoggingConfig = {
  service: 'coding-drills',
  environment: process.env.NODE_ENV || 'development',
  version: process.env.NEXT_PUBLIC_APP_VERSION || '0.1.0',
  minLevel: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  enableConsole: true,
  enablePersistence: process.env.NODE_ENV === 'development',
  enableMetrics: true,
  maxLogEntries: 100,
  alertHandlers: [],
};

// ============================================================================
// State
// ============================================================================

let config: LoggingConfig = { ...DEFAULT_CONFIG };
let correlationIdStore: string | undefined;
const metrics: Map<string, Metric[]> = new Map();
const activeTimers: Map<string, number> = new Map();

// ============================================================================
// Utility Functions
// ============================================================================

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
}

function generateId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
}

function getTimestamp(): string {
  return new Date().toISOString();
}

function shouldLog(level: LogLevel): boolean {
  return LOG_LEVELS[level] >= LOG_LEVELS[config.minLevel];
}

function severityToLevel(severity: AlertPayload['severity']): LogLevel {
  switch (severity) {
    case 'critical':
      return 'fatal';
    case 'high':
      return 'error';
    case 'medium':
      return 'warn';
    case 'low':
      return 'info';
  }
}

function levelToSeverity(level: LogLevel): AlertPayload['severity'] {
  switch (level) {
    case 'fatal':
      return 'critical';
    case 'error':
      return 'high';
    case 'warn':
      return 'medium';
    default:
      return 'low';
  }
}

// ============================================================================
// Storage Functions
// ============================================================================

function getStoredLogs(): LogEntry[] {
  if (!isBrowser() || !config.enablePersistence) return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEYS.LOGS);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function storeLogs(logs: LogEntry[]): void {
  if (!isBrowser() || !config.enablePersistence) return;

  try {
    const trimmed = logs.slice(-config.maxLogEntries);
    localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(trimmed));
  } catch {
    // Storage might be full; silently fail
  }
}

function persistLog(entry: LogEntry): void {
  const logs = getStoredLogs();
  logs.push(entry);
  storeLogs(logs);
}

// ============================================================================
// Core Logging Functions
// ============================================================================

/**
 * Configure the logging service
 */
export function configureLogging(newConfig: Partial<LoggingConfig>): void {
  config = { ...config, ...newConfig };
}

/**
 * Set correlation ID for request tracing
 */
export function setCorrelationId(id: string): void {
  correlationIdStore = id;
}

/**
 * Get current correlation ID
 */
export function getCorrelationId(): string | undefined {
  return correlationIdStore;
}

/**
 * Clear correlation ID
 */
export function clearCorrelationId(): void {
  correlationIdStore = undefined;
}

/**
 * Create a log entry
 */
function createLogEntry(
  level: LogLevel,
  message: string,
  context?: Record<string, unknown>,
  error?: Error,
): LogEntry {
  const entry: LogEntry = {
    timestamp: getTimestamp(),
    level,
    message,
    service: config.service,
    environment: config.environment,
    version: config.version,
  };

  if (context) {
    entry.context = context;
  }

  if (correlationIdStore) {
    entry.correlationId = correlationIdStore;
  }

  if (error) {
    entry.error = {
      name: error.name,
      message: error.message,
      stack: error.stack,
    };
  }

  return entry;
}

/**
 * Output log entry to console
 */
function consoleOutput(entry: LogEntry): void {
  if (!config.enableConsole) return;

  const prefix = `[${entry.timestamp}] [${entry.level.toUpperCase()}] [${entry.service}]`;
  const msg = `${prefix} ${entry.message}`;

  const consoleData: unknown[] = [];
  if (entry.context) consoleData.push({ context: entry.context });
  if (entry.error) consoleData.push({ error: entry.error });
  if (entry.correlationId) consoleData.push({ correlationId: entry.correlationId });

  switch (entry.level) {
    case 'debug':
      console.debug(msg, ...consoleData);
      break;
    case 'info':
      console.info(msg, ...consoleData);
      break;
    case 'warn':
      console.warn(msg, ...consoleData);
      break;
    case 'error':
    case 'fatal':
      console.error(msg, ...consoleData);
      break;
  }
}

/**
 * Core log function
 */
function log(
  level: LogLevel,
  message: string,
  context?: Record<string, unknown>,
  error?: Error,
): LogEntry | null {
  if (!shouldLog(level)) return null;

  const entry = createLogEntry(level, message, context, error);

  // Console output
  consoleOutput(entry);

  // Persist
  if (config.enablePersistence) {
    persistLog(entry);
  }

  // Call external handler
  if (config.onLog) {
    try {
      config.onLog(entry);
    } catch {
      // Prevent handler errors from breaking logging
    }
  }

  // Trigger alerts for error and fatal levels
  if (level === 'error' || level === 'fatal') {
    triggerAlertFromLog(entry);
  }

  return entry;
}

// ============================================================================
// Log Level Functions
// ============================================================================

export const logger = {
  debug: (message: string, context?: Record<string, unknown>) => log('debug', message, context),

  info: (message: string, context?: Record<string, unknown>) => log('info', message, context),

  warn: (message: string, context?: Record<string, unknown>) => log('warn', message, context),

  error: (message: string, error?: Error, context?: Record<string, unknown>) =>
    log('error', message, context, error),

  fatal: (message: string, error?: Error, context?: Record<string, unknown>) =>
    log('fatal', message, context, error),

  /**
   * Log with explicit level
   */
  log: (level: LogLevel, message: string, context?: Record<string, unknown>, error?: Error) =>
    log(level, message, context, error),
};

// ============================================================================
// Metrics Functions
// ============================================================================

/**
 * Record a metric
 */
export function recordMetric(
  name: string,
  type: MetricType,
  value: number,
  labels?: Record<string, string>,
  unit?: string,
): void {
  if (!config.enableMetrics) return;

  const metric: Metric = {
    name,
    type,
    value,
    timestamp: getTimestamp(),
    labels,
    unit,
  };

  const existing = metrics.get(name) || [];
  existing.push(metric);

  // Keep only last 1000 data points per metric
  if (existing.length > 1000) {
    existing.shift();
  }

  metrics.set(name, existing);
}

/**
 * Increment a counter
 */
export function incrementCounter(
  name: string,
  labels?: Record<string, string>,
  increment = 1,
): void {
  recordMetric(name, 'counter', increment, labels);
}

/**
 * Set a gauge value
 */
export function setGauge(name: string, value: number, labels?: Record<string, string>): void {
  recordMetric(name, 'gauge', value, labels);
}

/**
 * Start a timer
 */
export function startTimer(name: string): string {
  const timerId = `${name}-${generateId()}`;
  activeTimers.set(timerId, performance.now());
  return timerId;
}

/**
 * Stop a timer and record the duration
 */
export function stopTimer(timerId: string, labels?: Record<string, string>): number {
  const startTime = activeTimers.get(timerId);
  if (startTime === undefined) {
    logger.warn('Timer not found', { timerId });
    return 0;
  }

  const duration = performance.now() - startTime;
  activeTimers.delete(timerId);

  const name = timerId.split('-').slice(0, -1).join('-');
  recordMetric(name, 'timer', duration, labels, 'ms');

  return duration;
}

/**
 * Record a histogram value
 */
export function recordHistogram(
  name: string,
  value: number,
  labels?: Record<string, string>,
  unit?: string,
): void {
  recordMetric(name, 'histogram', value, labels, unit);
}

/**
 * Get all metrics
 */
export function getMetrics(): Map<string, Metric[]> {
  return new Map(metrics);
}

/**
 * Get metrics summary
 */
export function getMetricsSummary(): Record<
  string,
  { count: number; latest: number; avg: number; min: number; max: number }
> {
  const summary: Record<
    string,
    { count: number; latest: number; avg: number; min: number; max: number }
  > = {};

  for (const [name, values] of metrics.entries()) {
    if (values.length === 0) continue;

    const numericValues = values.map((v) => v.value);
    summary[name] = {
      count: values.length,
      latest: numericValues[numericValues.length - 1],
      avg: numericValues.reduce((a, b) => a + b, 0) / numericValues.length,
      min: Math.min(...numericValues),
      max: Math.max(...numericValues),
    };
  }

  return summary;
}

/**
 * Clear all metrics
 */
export function clearMetrics(): void {
  metrics.clear();
  activeTimers.clear();
}

// ============================================================================
// Alerting Functions
// ============================================================================

/**
 * Register an alert handler
 */
export function registerAlertHandler(handler: AlertHandler): void {
  config.alertHandlers.push(handler);
}

/**
 * Unregister an alert handler
 */
export function unregisterAlertHandler(name: string): void {
  config.alertHandlers = config.alertHandlers.filter((h) => h.name !== name);
}

/**
 * Send an alert
 */
export async function sendAlert(alert: Omit<AlertPayload, 'alertId' | 'timestamp'>): Promise<void> {
  const fullAlert: AlertPayload = {
    ...alert,
    alertId: generateId(),
    timestamp: getTimestamp(),
    correlationId: correlationIdStore,
  };

  // Log the alert
  logger.log(severityToLevel(fullAlert.severity), `ALERT: ${fullAlert.title}`, {
    alert: fullAlert,
  });

  // Store alert
  if (isBrowser() && config.enablePersistence) {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.ALERTS);
      const alerts = stored ? JSON.parse(stored) : [];
      alerts.push(fullAlert);
      // Keep only last 50 alerts
      if (alerts.length > 50) alerts.shift();
      localStorage.setItem(STORAGE_KEYS.ALERTS, JSON.stringify(alerts));
    } catch {
      // Silently fail
    }
  }

  // Dispatch to handlers
  const severityOrder = ['low', 'medium', 'high', 'critical'];
  const alertSeverityIndex = severityOrder.indexOf(fullAlert.severity);

  for (const handler of config.alertHandlers) {
    if (!handler.enabled) continue;

    const minSeverityIndex = severityOrder.indexOf(handler.minSeverity || 'low');
    if (alertSeverityIndex < minSeverityIndex) continue;

    try {
      await handler.handler(fullAlert);
    } catch (error) {
      logger.error(
        'Alert handler failed',
        error instanceof Error ? error : new Error(String(error)),
        {
          handlerName: handler.name,
          alertId: fullAlert.alertId,
        },
      );
    }
  }
}

/**
 * Create alert from log entry
 */
function triggerAlertFromLog(entry: LogEntry): void {
  const severity = levelToSeverity(entry.level);

  sendAlert({
    severity,
    title: `${entry.level.toUpperCase()}: ${entry.message.substring(0, 100)}`,
    description: entry.message,
    source: entry.service,
    context: {
      ...entry.context,
      error: entry.error,
    },
    runbookUrl: `/docs/runbook#${entry.error?.name?.toLowerCase() || 'general-error'}`,
  });
}

/**
 * Get stored alerts
 */
export function getAlertHistory(): AlertPayload[] {
  if (!isBrowser()) return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEYS.ALERTS);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

/**
 * Clear alert history
 */
export function clearAlertHistory(): void {
  if (!isBrowser()) return;

  try {
    localStorage.removeItem(STORAGE_KEYS.ALERTS);
  } catch {
    // Silently fail
  }
}

// ============================================================================
// Pre-built Alert Handlers
// ============================================================================

/**
 * Console alert handler
 */
export const consoleAlertHandler: AlertHandler = {
  name: 'console',
  enabled: true,
  handler: (alert) => {
    const emoji = {
      low: 'i',
      medium: '!',
      high: '!!',
      critical: '!!!',
    }[alert.severity];

    console.group(`[${emoji}] ALERT: ${alert.title}`);
    console.log('Severity:', alert.severity);
    console.log('Description:', alert.description);
    console.log('Source:', alert.source);
    console.log('Timestamp:', alert.timestamp);
    if (alert.context) console.log('Context:', alert.context);
    if (alert.runbookUrl) console.log('Runbook:', alert.runbookUrl);
    console.groupEnd();
  },
};

/**
 * Webhook alert handler factory
 */
export function createWebhookAlertHandler(
  name: string,
  webhookUrl: string,
  minSeverity: AlertPayload['severity'] = 'medium',
): AlertHandler {
  return {
    name,
    enabled: true,
    minSeverity,
    handler: async (alert) => {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(alert),
        });
      } catch (error) {
        logger.error(
          'Webhook alert delivery failed',
          error instanceof Error ? error : new Error(String(error)),
          {
            webhookUrl,
            alertId: alert.alertId,
          },
        );
      }
    },
  };
}

/**
 * Slack alert handler factory
 */
export function createSlackAlertHandler(
  webhookUrl: string,
  channel?: string,
  minSeverity: AlertPayload['severity'] = 'high',
): AlertHandler {
  return {
    name: 'slack',
    enabled: true,
    minSeverity,
    handler: async (alert) => {
      const color = {
        low: '#36a64f',
        medium: '#daa520',
        high: '#ff8c00',
        critical: '#ff0000',
      }[alert.severity];

      const payload = {
        channel,
        attachments: [
          {
            color,
            title: alert.title,
            text: alert.description,
            fields: [
              { title: 'Severity', value: alert.severity, short: true },
              { title: 'Source', value: alert.source, short: true },
              { title: 'Alert ID', value: alert.alertId, short: true },
              { title: 'Time', value: alert.timestamp, short: true },
            ],
            footer: alert.runbookUrl ? `Runbook: ${alert.runbookUrl}` : undefined,
          },
        ],
      };

      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } catch (error) {
        logger.error(
          'Slack alert delivery failed',
          error instanceof Error ? error : new Error(String(error)),
        );
      }
    },
  };
}

// ============================================================================
// Application Metrics (Pre-defined)
// ============================================================================

export const appMetrics = {
  // User activity
  drillAttempt: (language: string, result: 'success' | 'failure') => {
    incrementCounter('app.drill.attempts', { language, result });
  },

  quizAttempt: (language: string, score: number) => {
    incrementCounter('app.quiz.attempts', { language });
    recordHistogram('app.quiz.score', score, { language });
  },

  sessionDuration: (duration: number, language: string) => {
    recordHistogram('app.session.duration', duration, { language }, 'ms');
  },

  // Performance
  pageLoad: (page: string, duration: number) => {
    recordHistogram('app.page.load', duration, { page }, 'ms');
  },

  codeExecution: (language: string, duration: number, success: boolean) => {
    recordHistogram('app.code.execution', duration, { language, success: String(success) }, 'ms');
  },

  // Errors
  errorOccurred: (category: string, severity: string) => {
    incrementCounter('app.errors', { category, severity });
  },

  // Storage
  storageUsage: (bytes: number) => {
    setGauge('app.storage.usage', bytes);
  },
};

// ============================================================================
// Log History and Debugging
// ============================================================================

/**
 * Get stored log entries
 */
export function getLogHistory(): LogEntry[] {
  return getStoredLogs();
}

/**
 * Clear log history
 */
export function clearLogHistory(): void {
  if (!isBrowser()) return;

  try {
    localStorage.removeItem(STORAGE_KEYS.LOGS);
  } catch {
    // Silently fail
  }
}

/**
 * Export logs and metrics for debugging
 */
export function exportDiagnostics(): {
  logs: LogEntry[];
  metrics: Record<string, Metric[]>;
  alerts: AlertPayload[];
  config: Omit<LoggingConfig, 'alertHandlers' | 'onLog'>;
  timestamp: string;
} {
  const metricsObj: Record<string, Metric[]> = {};
  for (const [key, value] of metrics.entries()) {
    metricsObj[key] = value;
  }

  const { alertHandlers: _alertHandlers, onLog: _onLog, ...safeConfig } = config;

  return {
    logs: getStoredLogs(),
    metrics: metricsObj,
    alerts: getAlertHistory(),
    config: safeConfig,
    timestamp: getTimestamp(),
  };
}

// ============================================================================
// Default Export
// ============================================================================

const loggingModule = {
  // Configuration
  configure: configureLogging,
  setCorrelationId,
  getCorrelationId,
  clearCorrelationId,

  // Logging
  ...logger,
  logger,

  // Metrics
  recordMetric,
  incrementCounter,
  setGauge,
  startTimer,
  stopTimer,
  recordHistogram,
  getMetrics,
  getMetricsSummary,
  clearMetrics,
  appMetrics,

  // Alerting
  registerAlertHandler,
  unregisterAlertHandler,
  sendAlert,
  getAlertHistory,
  clearAlertHistory,
  consoleAlertHandler,
  createWebhookAlertHandler,
  createSlackAlertHandler,

  // History
  getLogHistory,
  clearLogHistory,
  exportDiagnostics,
};

export default loggingModule;
