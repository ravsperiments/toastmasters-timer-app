# Toastmasters Timer

A minimal, reliable, and distraction-free timer for Toastmasters speech events. Built with Expo + TypeScript, this app offers precise visual cues for timing speeches — perfect for use by the Timer role in club meetings or speech contests.

## 🎯 Purpose

Designed with simplicity and trust in mind. The timer must be:
- Easy to use with no configuration
- Visually clear from a distance
- Reliable even when backgrounded or interrupted
- Architected deliberately, with attention to clarity, quality, and correctness

## 🧩 Features (v0.1.0)

- Start, pause, and reset a speech timer
- Large readable MM:SS display
- Color transitions at speech milestones:
  - Green: 1:00
  - Yellow: 1:30
  - Red: 2:00
  - Black: 2:30 (absolute max)
- Logger traces all lifecycle events and threshold crossings
- Accurate timing based on timestamps (not just intervals)

## 📐 Architecture

- Timer logic encapsulated in a `useTimer` hook
- Clean type model (`TimerConfig`, `TimerRuntimeState`)
- Functional separation of state, view, and control
- Configurable warning thresholds and behavior

## 🔧 Built With

- [Expo](https://expo.dev/) (React Native)
- TypeScript
- Functional state management (React hooks)
- Custom logging interface for debug and observability


## 📦 Roadmap
- Preset selector for different speech types
- Vibration or sound feedback at thresholds
- Persist state across reloads
- Export logs or timing history
- Animations and visual polish

## 🤝 Contributions
Not open to contributions yet — this is a focused, deliberate solo build. But ideas are welcome!
