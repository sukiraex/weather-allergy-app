# Weather-Allergy-App
GUI coursework group 55
A React weather app with pollen tracking, symptom logging, and medication reminders — built with a dark/light theme system.

## Project Overview

This dashboard displays real-time weather and pollen data for a given location. It includes:

- Current weather + 7-day forecast
- Pollen count with tree, grass and weed breakdown
- Symptom tracker with severity logging
- Medication schedule and reminders
- Changing widget, humidity, UV info widgets
- Full dark / light mode toggle

## Team Task Split

There are 9 tasks. **Tasks 1 and 2 must be completed before anyone else starts.** All other tasks can be worked on in parallel after that.

### ✅ Task 1 — API Layer

Responsibilities:
- Set up weather API fetch (current temp, hourly forecast, 7-day forecast)
- Set up pollen API fetch (overall score, tree/grass/weed levels)
- Write and export the following custom hooks:
  - `useWeather(location)` — returns weather data
  - `usePollen(location)` — returns pollen data
- Define and document the shape of data returned by each hook so all other team members know exactly what props to expect

### ✅ Task 2 — Theme System

Responsibilities:
- Write all CSS variables for **both light and dark mode** in `src/styles/theme.css`
- This file is the **single source of truth** for every colour, font size, spacing value and border radius used in the app
- Write `src/utils/theme.js` which exports `toggleTheme()` and `getTheme()`
- Test that switching themes updates all variables correctly

`src/styles/theme.css` must include variables for:
- Background colours (app, cards, secondary)
- Text colours (primary, secondary, muted)
- Pollen severity colours (low, medium, high, very high)
- Symptom severity colours
- Pollen card gradient
- Progress bar colours
- Border and shadow colours
- Font family, font sizes (xl, lg, md, sm, xs)
- Spacing (card padding, gap, border radius)

> ⚠️ **This task must be finished before card work begins.** If you need a variable that doesn't exist yet, message the theme person to add it — do not write hex codes in your component.

### 🔲 Task 3 — Header

**Depends on:** Task 2 (theme system)

Responsibilities:
- Location title with pin icon
- Live date and time display
- Dark / light mode toggle button (moon/sun icon, visible in top right)
- Import and call `toggleTheme()` from `src/utils/theme.js` on button click

### 🔲 Task 4 — Weather Card

**Depends on:** Task 1 (API) + Task 2 (theme)

Responsibilities:
- Current temperature display
- Weather condition label (e.g. "Rain Shower")
- Feels like + high/low temps
- Hourly forecast row (icons + temps for each hour)
- 7-day forecast panel — each day shows: day name, rain chance, weather icon, high/low, pollen score and pollen badge

Use `useWeather()` hook for all data. Use `var(--variable-name)` for all colours.

### 🔲 Task 5 — Pollen Count Card

**Depends on:** Task 1 (API) + Task 2 (theme)

Responsibilities:
- Gradient background card (use `var(--pollen-gradient)`)
- Large pollen score + level label (e.g. "8.2 HIGH")
- Three progress bars: Tree, Grass, Weed — each with percentage
- Trend label at the bottom (e.g. "Rising throughout the day")

Use `usePollen()` hook for all data.

### 🔲 Task 6 — Symptom Tracker Card

**Depends on:** Task 2 (theme)

Responsibilities:
- List of symptoms with checkboxes (Sneezing, Runny nose, Itchy eyes, Congestion, Headache, Fatigue)
- Severity label next to each active symptom (High / Moderate) using severity colour variables
- Today's status warning banner at the bottom
- "Log Symptoms" gradient button

Note: symptom data can be local state for now (no API needed).

### 🔲 Task 7 — Medication Card

**Depends on:** Task 2 (theme)

Responsibilities:
- Header with "Medication" title, "X/4 taken today" subtitle and + button
- Progress bar showing how many medications have been taken
- List of medications, each with: name, dosage, time, checkbox to mark as taken
- "Next Dose" alert banner at the bottom showing the next upcoming medication

Note: medication data can be hardcoded as local state for now.

### 🔲 Task 8 — Info Widgets

**Depends on:** Task 1 (API) + Task 2 (theme)

Responsibilities:
- Sunset card — displays sunset time with icon and "Don't miss the sunset" label
- Wind tile — speed in mph
- Humidity tile — percentage
- UV Index tile — level label (Low / Medium / High)

Use `useWeather()` hook for all data.

### 🔲 Task 9 — Video Submission


## Dependency Order

```
Task 1 — API Layer          ← start immediately
Task 2 — Theme System       ← start immediately

After Task 1 + 2 are done:

Task 3 — Header             ← needs Task 2
Task 4 — Weather Card       ← needs Task 1 + 2
Task 5 — Pollen Card        ← needs Task 1 + 2
Task 6 — Symptom Tracker    ← needs Task 2
Task 7 — Medication Card    ← needs Task 2
Task 8 — Info Widgets       ← needs Task 1 + 2
Task 9 - Video Submission
```

---

## Possible Folder Structure

```
src/
├── components/
│   ├── Header/
│   │   └── Header.jsx
│   ├── WeatherCard/
│   │   └── WeatherCard.jsx
│   ├── PollenCard/
│   │   └── PollenCard.jsx
│   ├── SymptomTracker/
│   │   └── SymptomTracker.jsx
│   ├── MedicationCard/
│   │   └── MedicationCard.jsx
│   └── InfoWidgets/
│       └── InfoWidgets.jsx
├── hooks/
│   ├── useWeather.js
│   └── usePollen.js
├── styles/
│   └── theme.css          ← all CSS variables, light + dark
├── utils/
│   └── theme.js           ← toggleTheme(), getTheme()
└── App.jsx                ← assembles all components
```

---

## Theme System — Read This First

All colours, fonts and spacing live in `src/styles/theme.css` as CSS custom properties. The file defines two sets of values — one for light mode under `:root` and one for dark mode under `[data-theme="dark"]`.

When the toggle is clicked, the `data-theme` attribute on the root `<html>` element switches between `"light"` and `"dark"`. Every component updates automatically because they all reference the same variables.

