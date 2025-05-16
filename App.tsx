import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { TimerConfig } from './src/types/timerTypes';
import { useTimer } from './src/hooks/useTimer';

// Sample config: Evaluation Speech (2–3 min)
const evaluationTimer: TimerConfig = {
  name: 'Evaluation',
  duration: 180, // 3 minutes
  countUp: true,
  warnings: [
    { at: 60, severity: 'green' },
    { at: 90, severity: 'yellow' },
    { at: 120, severity: 'red' },
    { at: 150, severity: 'black' },
  ],
  vibrate: false,
  sound: false,
};

export default function App() {
  const { state, toggle, reset } = useTimer(evaluationTimer);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <View style={[styles.container, { backgroundColor: state.currentSeverity }]}>
      <Text style={styles.timer}>{formatTime(state.elapsedSeconds)}</Text>

      <View style={styles.controls}>
        <Button title={state.isRunning ? 'Pause' : 'Start'} onPress={toggle} />
        <Button title="Reset" onPress={reset} />
      </View>

      <Text style={styles.meta}>
        Duration: 2:30 • Green: 1:00 • Yellow: 1:30 • Red: 2:00
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  timer: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 32,
  },
  controls: {
    flexDirection: 'row',
    gap: 20,
  },
  meta: {
    marginTop: 40,
    fontSize: 14,
    color: '#eee',
  },
});
