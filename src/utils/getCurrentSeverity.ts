import { Severity, WarningSpec } from '../types/timerTypes';

// Determine which severity level a timer is currently in based on elapsed time.

/**
 * Find the highest warning threshold that has been crossed by the elapsed time.
 * Returns `'gray'` when no threshold has been reached.
 */
export function getCurrentSeverity(warnings: WarningSpec[], elapsed: number): Severity {
  const matched = warnings
    .filter(w => elapsed >= w.at)
    .sort((a, b) => b.at - a.at); // take latest crossed threshold

  return matched[0]?.severity ?? 'gray';
}
