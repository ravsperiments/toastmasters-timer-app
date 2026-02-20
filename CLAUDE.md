# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Toastmasters Timer is a minimal, distraction-free timer app for Toastmasters speech events. Built with Expo + TypeScript, it provides visual color cues at speech timing thresholds.

## Commands

| Command | Purpose |
|---------|---------|
| `npm start` | Launch Expo dev server |
| `npm run ios` | Run on iOS simulator |
| `npm run android` | Run on Android emulator |
| `npm test` | Run Jest test suite |

## Tech Stack

- **Expo** ~53.0.9 (React Native 0.79.2)
- **React** 19.0.0
- **TypeScript** ~5.8.3 (strict mode)
- **React Navigation** native-stack
- **Jest** with jest-expo preset

## Architecture

### Core Pattern: Hook-Based Timer Logic

The `useTimer` hook (`src/hooks/useTimer.ts`) encapsulates all timer state and logic:
- Uses refs (`isRunningRef`, `startTimestamp`, `pausedOffset`) as source of truth
- Timestamp-based timing via `Date.now()` for accuracy across app backgrounding
- Returns `TimerController` with `start`, `pause`, `reset` functions

### Type System

Key types in `src/types/timerTypes.ts`:
- `TimerConfig` - threshold configuration passed to useTimer
- `TimerRuntimeState` - current elapsed time and severity
- `Severity` - `'gray' | 'green' | 'yellow' | 'red' | 'black'`

### Screen Flow

`HomeScreen` (preset selection) → `TimerScreen` (active timer with SVG progress ring)

### Configuration-Driven Presets

`src/config/timerPresets.ts` defines speech types:
- Evaluation (3:00), Table Topics (2:30), Prepared Speech (7:00)
- Each with green/yellow/red/black thresholds

### Styling

Design tokens centralized in `src/styles/theme.ts` (COLORS, FONTS, SPACING).

### Logging

Injectable `Logger` interface (`src/logger/Logger.ts`) with `ConsoleLogger` implementation. Tracks: start, pause, reset, thresholdCross events.

## Testing

Tests live in `__tests__/`. Uses `@testing-library/react-hooks` with fake timers:

```typescript
jest.useFakeTimers();
const { result } = renderHook(() => useTimer(config, mockLogger));
act(() => result.current.start());
act(() => jest.advanceTimersByTime(1000));
```

## Key Conventions

- Pure functions for testability (`getCurrentSeverity.ts`)
- Threshold resolution: latest matching threshold determines severity
- Timer config is immutable - passed as prop, never mutated
- All state changes logged through Logger interface
