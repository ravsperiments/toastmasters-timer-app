export type Severity = 'gray' | 'green' | 'yellow' | 'red' | 'black';

export interface WarningSpec {
  at: number;             // time in seconds
  severity: Severity;
}

export interface TimerConfig {
  name: string;
  duration: number;
  countUp: boolean;
  warnings: WarningSpec[];
  vibrate?: boolean;
  sound?: boolean;
}

export interface TimerRuntimeState {
  isRunning: boolean;
  elapsedSeconds: number;
  startTimestamp: number | null;
  currentSeverity: Severity;
}

export interface TimerController {
  config: TimerConfig;
  state: TimerRuntimeState;
  toggle: () => void;
  reset: () => void;
}
