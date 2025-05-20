import { useEffect, useRef, useState } from 'react';
import { TimerConfig, TimerController } from '../types/timerTypes';
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

  const tick = () => {
    if (startTimestamp.current === null) return;
    const now = Date.now();
    const delta = Math.floor((now - startTimestamp.current + pausedOffset.current) / 1000);
    setElapsedSeconds(delta);
  };

  const toggle = () => {
    if (isRunning) {
      // Pause
      if (startTimestamp.current) {
        pausedOffset.current += Date.now() - startTimestamp.current;
      }
      clearInterval(intervalRef.current!);
      intervalRef.current = null;
      startTimestamp.current = null;
      setIsRunning(false);
      logger.event('pause', { elapsed: elapsedSeconds });
    } else {
      // Start
      startTimestamp.current = Date.now();
      intervalRef.current = setInterval(tick, 1000);
      setIsRunning(true);
      logger.event('start', { name: config.name, startTime: startTimestamp.current });
    }
  };

  const reset = () => {
    const now = Date.now();
    const elapsedAtReset = startTimestamp.current
      ? Math.floor((now - startTimestamp.current) / 1000)
      : 0;
    clearInterval(intervalRef.current!);
    intervalRef.current = null;
    pausedOffset.current = 0;
    startTimestamp.current = null;
    setElapsedSeconds(0);
    setIsRunning(false);
    setLastSeverity('gray');
    logger.event('reset', { elapsed: elapsedAtReset, name: config.name });
  };

  const currentSeverity = getCurrentSeverity(config.warnings, elapsedSeconds);

  useEffect(() => {
    if (currentSeverity !== lastSeverity) {
      setLastSeverity(currentSeverity);
      logger.event('thresholdCross', { severity: currentSeverity, time: elapsedSeconds });
    }
  }, [currentSeverity]);

  useEffect(() => {
    return () => {
      if (isRunning) {
        logger.event('interrupted', { elapsed: elapsedSeconds, reason: 'unmount' });
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
    reset,
  };
}
