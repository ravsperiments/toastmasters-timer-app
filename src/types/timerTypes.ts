// Core type definitions used by the timer hook and UI components.
export type Severity = 'gray' | 'green' | 'yellow' | 'red' | 'black';

export interface WarningSpec {
  at: number;             // time in seconds
  severity: Severity;
}

export interface TimerConfig {
  /** Display name shown in the UI */
  name: string;
  /** Maximum time in seconds */
  duration: number;
  /** Whether the timer counts upward (true) or downward */
  countUp: boolean;
  /** Thresholds at which severity levels change */
  warnings: WarningSpec[];
  /** Optional vibration feedback when thresholds are crossed */
  vibrate?: boolean;
  /** Optional sound to play when thresholds are crossed */
  sound?: boolean;
}

export interface TimerRuntimeState {
  /** Whether the timer is currently active */
  isRunning: boolean;
  /** Elapsed time in seconds */
  elapsedSeconds: number;
  /** Epoch timestamp when the timer was started */
  startTimestamp: number | null;
  /** Severity at the current elapsed time */
  currentSeverity: Severity;
}

/** Public API returned by the timer hook */
export interface TimerController {
  config: TimerConfig;
  state: TimerRuntimeState;
  /** Start or pause the timer depending on its current state */
  toggle: () => void;
  /** Reset the timer back to zero */
  reset: () => void;
  /** Pause the timer without resetting elapsed time */
  pause: () => void;
}
