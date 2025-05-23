import { renderHook, act } from '@testing-library/react-hooks';
import { useTimer } from '../src/hooks/useTimer';
import { TimerConfig } from '../src/types/timerTypes';

jest.useFakeTimers();

const mockLogger = {
  event: jest.fn(),
};

const config: TimerConfig = {
  name: 'Evaluation',
  duration: 180,
  countUp: true,
  warnings: [
    { at: 60, severity: 'green' },
    { at: 90, severity: 'yellow' },
    { at: 120, severity: 'red' },
    { at: 150, severity: 'black' },
  ],
};

describe('useTimer', () => {
  beforeEach(() => {
    jest.clearAllTimers();
    mockLogger.event.mockClear();
  });

  it('starts and increments elapsed time', () => {
    const { result } = renderHook(() => useTimer(config, mockLogger));

    act(() => {
      result.current.toggle(); // start
    });

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(result.current.state.elapsedSeconds).toBe(5);
    expect(mockLogger.event).toHaveBeenCalledWith('start', expect.any(Object));
  });

  it('pauses correctly and logs pause', () => {
    const { result } = renderHook(() => useTimer(config, mockLogger));
  
    act(() => {
      result.current.toggle(); // start
      jest.advanceTimersByTime(3000); // simulate 3s
      result.current.toggle(); // pause
    });
  
    // Force state updates to flush
    act(() => {
      // simulate time to flush the internal setState
      jest.advanceTimersByTime(1);
    });
  
    expect(result.current.state.isRunning).toBe(false);
    expect(result.current.state.elapsedSeconds).toBe(3);
    expect(mockLogger.event).toHaveBeenCalledWith('pause', { elapsed: 3 });
  });   

  it('resets and logs reset', () => {
    const { result } = renderHook(() => useTimer(config, mockLogger));

    act(() => {
      result.current.toggle(); // start
    });

    act(() => {
      jest.advanceTimersByTime(3900);     // simulate 3.9s
      jest.runOnlyPendingTimers();        // flush 3 ticks
      result.current.reset();             // call reset before 4th tick
    });

    expect(result.current.state.elapsedSeconds).toBe(0);
    expect(result.current.state.isRunning).toBe(false);

    expect(mockLogger.event).toHaveBeenCalledWith('reset', {
      elapsed: 4,
      name: config.name,
    });
  });
});
