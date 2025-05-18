export interface Logger {
    event(name: string, data?: Record<string, any>): void;
  }
  