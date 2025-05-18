import { TimerConfig } from '../types/timerTypes';

export const timerPresets: TimerConfig[] = [
  {
    name: 'Evaluation',
    duration: 180,
    countUp: true,
    warnings: [
      { at: 60, severity: 'green' },
      { at: 90, severity: 'yellow' },
      { at: 120, severity: 'red' },
      { at: 150, severity: 'black' },
    ],
  },
  {
    name: 'Table Topics',
    duration: 150,
    countUp: true,
    warnings: [
      { at: 60, severity: 'green' },
      { at: 90, severity: 'yellow' },
      { at: 120, severity: 'red' },
      { at: 150, severity: 'black' },
    ],
  },
  {
    name: 'Prepared Speech',
    duration: 420,
    countUp: true,
    warnings: [
      { at: 300, severity: 'green' },
      { at: 360, severity: 'yellow' },
      { at: 420, severity: 'red' },
      { at: 450, severity: 'black' },
    ],
  },
];
