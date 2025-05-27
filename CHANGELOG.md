
---

## ✅ `CHANGELOG.md`

```md
# Changelog

All notable changes to this project will be documented here.

## [v0.1.0] - 2025-05-15

### Added
- Initial implementation of core timer functionality
- `useTimer()` hook with toggle, pause, and reset logic
- Timestamp-based time tracking for accuracy across app minimize/resume
- Color-coded visual cues (green, yellow, red, black)
- Logging of timer events, lifecycle transitions, and threshold crossings

### Technical
- Defined core types: `TimerConfig`, `WarningSpec`, `TimerRuntimeState`
- Pure function for threshold resolution: `getCurrentSeverity()`
- Modular directory structure: `hooks/`, `types/`, `utils/`, `logger/`
- P0 feature set locked to F1–F3 per design plan

---

## [v1.0.0] - 2025-05-26
### Added
- Reusable `PresetCard` component to display timer presets
- Green | Yellow | Red threshold formatting in mm:ss on HomeScreen

### Changed
- HomeScreen layout redesigned: white cards with shadows, soft gray background
- Replaced inline card logic with a clean visual component

