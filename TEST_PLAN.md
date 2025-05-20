# TEST_PLAN.md

## Toastmasters Timer App — Final QA Checklist (v1.0.0)

This document outlines the comprehensive test plan for verifying the functionality, performance, and readiness of the Toastmasters Timer App for its initial release (`v1.0.0`).

---

## ✅ 1. Functional Tests

| Feature | Test Description | Pass? |
|--------|------------------|-------|
| Start Timer | Timer begins counting when "Start" is pressed | ☐ |
| Stop Timer | Timer pauses when "Pause" is pressed | ☐ |
| Reset Timer | Timer resets to 0 when "Reset" is pressed | ☐ |
| Presets | Preset buttons set correct speech durations | ☐ |
| Color Transitions | Background color changes at green/yellow/red thresholds | ☐ |
| Timer Persistence | Timer resumes correctly after pause/resume | ☐ |
| Logging | Events (start, pause, reset) are logged correctly | ☐ |

---

## 🎨 2. UI & UX Tests

| Area | Check | Pass? |
|------|-------|-------|
| Timer Display | Digits are large, readable, and update in real time | ☐ |
| Color Transition | Visual transitions are smooth and intuitive | ☐ |
| Preset UI | Preset buttons are labeled and positioned correctly | ☐ |
| Accessibility | VoiceOver reads controls appropriately (if supported) | ☐ |
| Layout | Layout adapts across screen sizes (iPhone SE to iPad) | ☐ |

---

## ⚠️ 3. Edge Case Tests

| Case | Check | Pass? |
|------|-------|-------|
| Background/Resume | Timer resumes without drift when app is backgrounded | ☐ |
| Rapid Input | App handles rapid start/pause/reset presses | ☐ |
| Reset During Run | Resetting while timer is active does not crash | ☐ |
| App Lifecycle | App handles foreground/background/terminate cleanly | ☐ |

---

## 🧪 4. Non-Functional Requirements

| Check | Pass? |
|-------|-------|
| App bundle size < 10MB | ☐ |
| No console errors/warnings in production build | ☐ |
| No crashes or memory leaks observed during test runs | ☐ |

---

## 📱 5. Device & OS Compatibility

| Device / OS | Tested | Pass? |
|-------------|--------|-------|
| iPhone SE (iOS 15) — Simulator | ☐ | ☐ |
| iPhone 14 (iOS 17) — Physical Device | ☐ | ☐ |
| iPad — Layout Verification | ☐ | ☐ |

---

## 🔁 6. Automated Tests

| Area | Test | Pass? |
|------|------|-------|
| Unit Tests | All `useTimer` hook tests passing | ☐ |
| CI Build | GitHub Actions runs clean | ☐ |

---

## 🚀 7. Release Checklist

| Task | Status |
|------|--------|
| App version set to `1.0.0` | ☐ |
| App icon, splash screen, and name finalized | ☐ |
| App Store metadata prepared (title, desc, screenshots) | ☐ |
| Privacy policy and Terms of Service linked (if needed) | ☐ |

---

## 🔏 QA Sign-Off

- [ ] All tests passed
- [ ] Reviewed by a second developer or tester
- [ ] `main` branch protected
- [ ] `v1.0.0` tag created upon merge

---

**Note:** This checklist should be updated for all future releases (v1.1.0, v1.2.0, etc.) to reflect new features or platform targets.

