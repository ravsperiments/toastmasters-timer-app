import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { TimerConfig } from './src/types/timerTypes';
import { useTimer } from './src/hooks/useTimer';
import { COLORS, FONTS, SPACING } from './src/styles/theme';
import { SafeAreaView } from 'react-native-safe-area-context';


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

const radius = 100;
const strokeWidth = 10;
const circumference = 2 * Math.PI * radius;

const getColor = (severity: string) => {
  switch (severity) {
    case 'green': return COLORS.green;
    case 'yellow': return COLORS.yellow;
    case 'red': return COLORS.red;
    case 'black': return COLORS.black;
    default: return COLORS.gray;
  }
};

const formatTime = (s: number) => {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
};

export default function App() {
  const { state, toggle, reset } = useTimer(evaluationTimer);
  const progress = Math.min(state.elapsedSeconds / evaluationTimer.duration, 1);
  const strokeDashoffset = circumference * (1 - progress);
  const fillColor = getColor(state.currentSeverity);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Toastmasters Timer</Text>

      <View style={styles.timerWrapper}>
        <Svg height={2 * (radius + strokeWidth)} width={2 * (radius + strokeWidth)}>
          <Circle
            stroke={COLORS.timerRing}
            fill="none"
            cx={radius + strokeWidth}
            cy={radius + strokeWidth}
            r={radius}
            strokeWidth={strokeWidth}
          />
          <Circle
            stroke={fillColor}
            fill="none"
            cx={radius + strokeWidth}
            cy={radius + strokeWidth}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            rotation="-90"
            originX={radius + strokeWidth}
            originY={radius + strokeWidth}
          />
        </Svg>
        <Text style={styles.timeText}>{formatTime(state.elapsedSeconds)}</Text>
      </View>

      <View style={styles.controls}>
        <Button title={state.isRunning ? 'Pause' : 'Start'} onPress={toggle} />
        <Button title="Reset" onPress={reset} />
      </View>

      <Text style={styles.meta}>
        {evaluationTimer.name} • Max: {formatTime(evaluationTimer.duration)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: SPACING.outer,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: FONTS.title,
    color: COLORS.textPrimary,
    marginBottom: SPACING.between,
  },
  timerWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.between * 2,
  },
  timeText: {
    position: 'absolute',
    fontSize: FONTS.timer,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  controls: {
    flexDirection: 'row',
    gap: SPACING.between,
  },
  meta: {
    marginTop: SPACING.between * 2,
    fontSize: 14,
    color: COLORS.textSecondary,
  },

  title: {
    fontSize: FONTS.title,
    color: COLORS.textPrimary,
    marginBottom: SPACING.between,
    marginTop: SPACING.between * 2, // Add this line
  },
  
});
