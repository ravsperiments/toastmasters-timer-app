import { Severity, WarningSpec } from '../types/timerTypes';

export function getCurrentSeverity(warnings: WarningSpec[], elapsed: number): Severity {
  const matched = warnings
    .filter(w => elapsed >= w.at)
    .sort((a, b) => b.at - a.at); // take latest

  return matched[0]?.severity ?? 'gray';
}
