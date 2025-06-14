import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

// Screen responsible for displaying the active timer and its controls.
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useTimer } from '../hooks/useTimer';
import { COLORS, FONTS, SPACING } from '../styles/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Timer'>;

const radius = 100;
const strokeWidth = 10;
const circumference = 2 * Math.PI * radius;

// Map a severity string to the color defined in the theme.
const getColor = (severity: string) => {
  switch (severity) {
    case 'green': return COLORS.green;
    case 'yellow': return COLORS.yellow;
    case 'red': return COLORS.red;
    case 'black': return COLORS.black;
    default: return COLORS.gray;
  }
};

// Convert a time in seconds to an MM:SS display string.
const formatTime = (s: number) => {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
};

export default function TimerScreen({ route }: Props) {
  // Timer configuration is passed via navigation parameters
  const { config } = route.params;
  // useTimer encapsulates all timer state and control logic
  const { state, toggle, reset } = useTimer(config);

  // Normalised progress between 0 and 1 for the circular progress ring.
  const progress = Math.min(state.elapsedSeconds / config.duration, 1);
  const strokeDashoffset = circumference * (1 - progress);
  const fillColor = getColor(state.currentSeverity);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{config.name}</Text>

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
        Max: {formatTime(config.duration)}
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
    marginBottom: SPACING.between * 2,
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
});
