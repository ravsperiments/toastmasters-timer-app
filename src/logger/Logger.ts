// Minimal logging interface used by the timer logic.
export interface Logger {
    event(name: string, data?: Record<string, any>): void;
}
  