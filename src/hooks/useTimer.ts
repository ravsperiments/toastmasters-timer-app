import { useEffect, useRef, useState } from 'react';
import { Severity, TimerConfig } from '../types/timerTypes';
import { getCurrentSeverity } from '../utils/getCurrentSeverity';
import { Logger } from '../logger/Logger';
import { ConsoleLogger } from '../logger/ConsoleLogger';

/**
 * React hook that implements the core timing logic used throughout the
 * application. It exposes an imperative controller that can start, pause,
 * toggle and reset the timer while also keeping track of the current severity
 * level based on configured warning thresholds.
 */

export function useTimer(config: TimerConfig, logger: Logger = ConsoleLogger): TimerController {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [lastSeverity, setLastSeverity] = useState<'gray' | string>('gray');

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimestamp = useRef<number | null>(null);
  const pausedOffset = useRef(0);
  const isRunningRef = useRef(false); // ✅ source of truth

  // Update elapsedSeconds every second using wall clock time to ensure
  // accuracy regardless of app pauses or slow intervals.
  const tick = () => {
    if (startTimestamp.current === null) return;
    const now = Date.now();
    const delta = Math.floor((now - startTimestamp.current + pausedOffset.current) / 1000);
    setElapsedSeconds(delta);
  };

  // Begin running the timer and record the start timestamp.
  const start = () => {
    startTimestamp.current = Date.now();
    intervalRef.current = setInterval(tick, 1000);
    isRunningRef.current = true;       // ✅ sync ref
    setIsRunning(true);
    logger.event('start', { name: config.name, startTime: startTimestamp.current });
  };

  // Halt the timer while retaining the elapsed time so far.
  const pause = () => {
    if (!isRunningRef.current || !startTimestamp.current) return;
  
    const now = Date.now();
  
    // calculate elapsed before mutating startTimestamp
    const elapsedAtPause = Math.floor((now - startTimestamp.current + pausedOffset.current) / 1000);
  
    pausedOffset.current += now - startTimestamp.current;
    clearInterval(intervalRef.current!);
    intervalRef.current = null;
    startTimestamp.current = null;
    isRunningRef.current = false;
    setIsRunning(false);
  
    // Log the pause including how many seconds have elapsed.
    logger.event('pause', { elapsed: elapsedAtPause });
  };

  // Convenience helper to switch between running and paused states.
  const toggle = () => {
    // use the ref as source of truth to avoid stale state issues
    isRunningRef.current ? pause() : start();
  };

  // Fully stop the timer and clear all internal state back to the initial
  // configuration.
  const reset = () => {
    const now = Date.now();
    const elapsedAtReset = startTimestamp.current
      ? Math.floor((now - startTimestamp.current + pausedOffset.current) / 1000)
      : elapsedSeconds;

    clearInterval(intervalRef.current!);
    intervalRef.current = null;
    pausedOffset.current = 0;
    startTimestamp.current = null;
    isRunningRef.current = false;
    setElapsedSeconds(0);
    setIsRunning(false);
    setLastSeverity('gray');

    logger.event('reset', {
      elapsed: elapsedAtReset,
      name: config.name,
    });
  };

  const currentSeverity = getCurrentSeverity(config.warnings, elapsedSeconds);

  // Emit a log event whenever the timer crosses a configured warning threshold.
  useEffect(() => {
    if (currentSeverity !== lastSeverity) {
      setLastSeverity(currentSeverity);
      logger.event('thresholdCross', {
        severity: currentSeverity,
        time: elapsedSeconds,
      });
    }
  }, [currentSeverity]);

  // Cleanup effect to fire when the component using this hook unmounts.
  useEffect(() => {
    return () => {
      if (isRunningRef.current) {
        logger.event('interrupted', {
          elapsed: elapsedSeconds,
          reason: 'unmount',
        });
      }
      clearInterval(intervalRef.current!);
    };
  }, []);

  return {
    config,
    state: {
      isRunning,
      elapsedSeconds,
      startTimestamp: startTimestamp.current,
      currentSeverity,
    },
    toggle,
    // expose explicit pause/reset controls to consumers
    pause,
    reset,
  };
}

/** Shape of the controller object returned from the useTimer hook. */
type TimerController = {
  config: TimerConfig;
  state: {
    /** Whether the timer is currently counting */
    isRunning: boolean;
    /** Seconds elapsed since the timer was started */
    elapsedSeconds: number;
    /** Epoch timestamp at which the timer began */
    startTimestamp: number | null;
    /** Severity derived from the warning thresholds */
    currentSeverity: Severity;
  };
  /** Toggle between running and paused states */
  toggle: () => void;
  /** Reset the timer to zero */
  reset: () => void;
  /** Pause the timer without resetting */
  pause: () => void;
};
