// Simple console based logger implementation used during development.
export interface Logger {
    event: (name: string, data?: Record<string, any>) => void;
    warn: (msg: string, data?: any) => void;
    error: (msg: string, err?: unknown) => void;
}
  
export const ConsoleLogger: Logger = {
    event: (name, data) => console.log(`[TIMER][${name}]`, data ?? ''),
    warn: (msg, data) => console.warn(`[TIMER][WARN] ${msg}`, data),
    error: (msg, err) => console.error(`[TIMER][ERROR] ${msg}`, err),
};
  