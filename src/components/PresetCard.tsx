import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// Small card component used on the home screen to display a timer preset.
import { TimerConfig } from '../types/timerTypes';

type Props = {
  config: TimerConfig;
  onPress: () => void;
};

// Format seconds as M:SS for display on the card.
const format = (s: number) => {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, '0')}`;
};

export default function PresetCard({ config, onPress }: Props) {
  // Convert warning thresholds to human readable form for display
  const [green, yellow, red] = config.warnings.map(w => format(w.at));

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.title}>{config.name}</Text>
      <Text style={styles.thresholds}>
        <Text style={{ color: 'green' }}>Green: {green}</Text> |{' '}
        <Text style={{ color: 'orange' }}>Yellow: {yellow}</Text> |{' '}
        <Text style={{ color: 'red' }}>Red: {red}</Text>
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0,
    shadowRadius: 2,
    elevation: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  thresholds: {
    fontSize: 14,
    color: '#444',
  },
});
