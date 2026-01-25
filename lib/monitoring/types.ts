/**
 * Monitoring and Observability Type Definitions
 *
 * SRE-focused types for implementing SLIs, SLOs, error budgets,
 * and comprehensive application monitoring.
 */

// ============================================================================
// SLI/SLO Types
// ============================================================================

/**
 * Service Level Indicator types
 */
export type SLIType =
  | 'availability'      // Service is up and responding
  | 'latency'           // Response time percentiles
  | 'throughput'        // Requests per second
  | 'error_rate'        // Percentage of failed requests
  | 'saturation'        // Resource utilization
  | 'freshness';        // Data staleness

/**
 * SLI measurement configuration
 */
export interface SLIConfig {
  name: string;
  type: SLIType;
  description: string;
  unit: string;
  good_threshold: number;
  target_percentile?: number; // For latency SLIs (e.g., p99)
}

/**
 * Service Level Objective definition
 */
export interface SLOConfig {
  name: string;
  sli: SLIConfig;
  target: number;           // Target percentage (e.g., 99.9)
  window_days: number;      // Measurement window in days
  error_budget: number;     // Allowed failures as percentage
  alerting_threshold: number; // Alert when burn rate exceeds this
}

/**
 * Error budget status
 */
export interface ErrorBudgetStatus {
  slo_name: string;
  remaining_budget: number;     // Percentage remaining
  consumed_budget: number;      // Percentage consumed
  burn_rate: number;            // Current burn rate (budget consumed per hour)
  projected_exhaustion?: Date;  // When budget will be exhausted at current rate
  status: 'healthy' | 'warning' | 'critical' | 'exhausted';
}

// ============================================================================
// Health Check Types
// ============================================================================

/**
 * Component health status
 */
export type HealthStatus = 'healthy' | 'degraded' | 'unhealthy' | 'unknown';

/**
 * Individual health check result
 */
export interface HealthCheckResult {
  name: string;
  status: HealthStatus;
  latency_ms?: number;
  message?: string;
  last_check: string;
  metadata?: Record<string, unknown>;
}

/**
 * Aggregated health response
 */
export interface HealthResponse {
  status: HealthStatus;
  version: string;
  timestamp: string;
  uptime_seconds: number;
  checks: HealthCheckResult[];
  build_info?: BuildInfo;
}

/**
 * Build information for debugging
 */
export interface BuildInfo {
  version: string;
  commit_sha?: string;
  build_time?: string;
  node_version: string;
  environment: string;
}

/**
 * Liveness probe response (simple check)
 */
export interface LivenessResponse {
  status: 'ok' | 'error';
  timestamp: string;
}

/**
 * Readiness probe response (full check)
 */
export interface ReadinessResponse {
  ready: boolean;
  status: HealthStatus;
  timestamp: string;
  checks: HealthCheckResult[];
}

// ============================================================================
// Metrics Types
// ============================================================================

/**
 * Metric types following Prometheus conventions
 */
export type MetricType = 'counter' | 'gauge' | 'histogram' | 'summary';

/**
 * Metric definition
 */
export interface MetricDefinition {
  name: string;
  type: MetricType;
  description: string;
  labels?: string[];
  buckets?: number[]; // For histograms
}

/**
 * Metric data point
 */
export interface MetricDataPoint {
  name: string;
  value: number;
  timestamp: number;
  labels?: Record<string, string>;
}

/**
 * Histogram bucket
 */
export interface HistogramBucket {
  le: number;        // Less than or equal
  count: number;
}

/**
 * Histogram data
 */
export interface HistogramData {
  name: string;
  buckets: HistogramBucket[];
  sum: number;
  count: number;
  labels?: Record<string, string>;
}

// ============================================================================
// Error Tracking Types
// ============================================================================

/**
 * Error severity levels
 */
export type ErrorSeverity = 'debug' | 'info' | 'warning' | 'error' | 'critical';

/**
 * Structured error event
 */
export interface ErrorEvent {
  id: string;
  timestamp: string;
  severity: ErrorSeverity;
  message: string;
  stack?: string;
  context: ErrorContext;
  fingerprint?: string;     // For grouping similar errors
  tags?: Record<string, string>;
}

/**
 * Error context information
 */
export interface ErrorContext {
  component?: string;
  action?: string;
  user_id?: string;
  session_id?: string;
  page_url?: string;
  browser?: string;
  os?: string;
  device_type?: string;
  custom?: Record<string, unknown>;
}

/**
 * Error tracking configuration
 */
export interface ErrorTrackingConfig {
  enabled: boolean;
  sample_rate: number;           // 0-1, percentage of errors to track
  ignored_errors?: string[];     // Error messages to ignore
  context_lines?: number;        // Lines of code context
  max_breadcrumbs?: number;      // Max number of breadcrumbs to keep
  environment: string;
}

// ============================================================================
// Performance Types
// ============================================================================

/**
 * Core Web Vitals metrics
 */
export interface WebVitals {
  LCP?: number;  // Largest Contentful Paint (ms)
  FID?: number;  // First Input Delay (ms)
  CLS?: number;  // Cumulative Layout Shift (score)
  FCP?: number;  // First Contentful Paint (ms)
  TTFB?: number; // Time to First Byte (ms)
  INP?: number;  // Interaction to Next Paint (ms)
}

/**
 * Performance entry for tracking
 */
export interface PerformanceEntry {
  name: string;
  type: 'navigation' | 'resource' | 'measure' | 'mark' | 'paint';
  start_time: number;
  duration: number;
  metadata?: Record<string, unknown>;
}

/**
 * Performance budget definition
 */
export interface PerformanceBudget {
  metric: keyof WebVitals | string;
  budget: number;
  unit: 'ms' | 'score' | 'bytes' | 'count';
  severity: 'warning' | 'error';
}

/**
 * Performance report
 */
export interface PerformanceReport {
  page: string;
  timestamp: string;
  vitals: WebVitals;
  entries: PerformanceEntry[];
  budget_violations: Array<{
    budget: PerformanceBudget;
    actual: number;
  }>;
}

// ============================================================================
// Circuit Breaker Types
// ============================================================================

/**
 * Circuit breaker states
 */
export type CircuitState = 'closed' | 'open' | 'half-open';

/**
 * Circuit breaker configuration
 */
export interface CircuitBreakerConfig {
  name: string;
  failure_threshold: number;      // Failures before opening
  success_threshold: number;      // Successes before closing
  timeout_ms: number;             // Time in open state before half-open
  reset_timeout_ms?: number;      // Time to reset failure count
  volume_threshold?: number;      // Min requests before tripping
}

/**
 * Circuit breaker state
 */
export interface CircuitBreakerState {
  name: string;
  state: CircuitState;
  failure_count: number;
  success_count: number;
  last_failure?: string;
  last_success?: string;
  last_state_change: string;
  next_attempt?: string;
}

// ============================================================================
// Alerting Types
// ============================================================================

/**
 * Alert severity
 */
export type AlertSeverity = 'info' | 'warning' | 'error' | 'critical';

/**
 * Alert definition
 */
export interface AlertDefinition {
  id: string;
  name: string;
  description: string;
  condition: string;              // Expression to evaluate
  severity: AlertSeverity;
  for_duration?: string;          // Duration condition must be true (e.g., "5m")
  labels?: Record<string, string>;
  annotations?: Record<string, string>;
}

/**
 * Active alert instance
 */
export interface AlertInstance {
  alert_id: string;
  name: string;
  severity: AlertSeverity;
  status: 'firing' | 'resolved';
  started_at: string;
  resolved_at?: string;
  value: number;
  labels: Record<string, string>;
  annotations: Record<string, string>;
}

// ============================================================================
// Tracing Types (for future distributed tracing)
// ============================================================================

/**
 * Span context for distributed tracing
 */
export interface SpanContext {
  trace_id: string;
  span_id: string;
  parent_span_id?: string;
  sampling_decision: boolean;
}

/**
 * Trace span
 */
export interface Span {
  context: SpanContext;
  name: string;
  service: string;
  start_time: number;
  end_time?: number;
  duration_ms?: number;
  status: 'ok' | 'error' | 'unset';
  attributes?: Record<string, unknown>;
  events?: SpanEvent[];
}

/**
 * Span event
 */
export interface SpanEvent {
  name: string;
  timestamp: number;
  attributes?: Record<string, unknown>;
}
