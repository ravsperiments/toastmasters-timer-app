import { useEffect, useRef, useState } from 'react';
import { Severity, TimerConfig } from '../types/timerTypes';
import { getCurrentSeverity } from '../utils/getCurrentSeverity';
import { Logger } from '../logger/Logger';
import { ConsoleLogger } from '../logger/ConsoleLogger';

export function useTimer(config: TimerConfig, logger: Logger = ConsoleLogger): TimerController {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [lastSeverity, setLastSeverity] = useState<'gray' | string>('gray');

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimestamp = useRef<number | null>(null);
  const pausedOffset = useRef(0);
  const isRunningRef = useRef(false); // ✅ source of truth

  const tick = () => {
    if (startTimestamp.current === null) return;
    const now = Date.now();
    const delta = Math.floor((now - startTimestamp.current + pausedOffset.current) / 1000);
    setElapsedSeconds(delta);
  };

  const start = () => {
    startTimestamp.current = Date.now();
    intervalRef.current = setInterval(tick, 1000);
    isRunningRef.current = true;       // ✅ sync ref
    setIsRunning(true);
    logger.event('start', { name: config.name, startTime: startTimestamp.current });
  };

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
  
    logger.event('pause', { elapsed: elapsedAtPause });
  };

  const toggle = () => {
    isRunningRef.current ? pause() : start(); // ✅ use ref, not possibly stale state
  };

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

  useEffect(() => {
    if (currentSeverity !== lastSeverity) {
      setLastSeverity(currentSeverity);
      logger.event('thresholdCross', {
        severity: currentSeverity,
        time: elapsedSeconds,
      });
    }
  }, [currentSeverity]);

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
    pause, // This should now match the updated TimerController type
    reset,
  };
}

type TimerController = {
  config: TimerConfig;
  state: {
    isRunning: boolean;
    elapsedSeconds: number;
    startTimestamp: number | null;
    currentSeverity: Severity;
  };
  toggle: () => void;
  reset: () => void;
  pause: () => void; // Add this line
};
