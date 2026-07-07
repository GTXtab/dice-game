# Dice Game — Test Task

Implementation of the test task: A dice game built with React (Next.js) + TypeScript + Material UI.

## Features (AC)

- The user enters a threshold number (1–100).
- The user selects a condition: "Over" or "Under".
- Clicking the "Play" button generates a random outcome (1–100).
- The result is checked against the chosen condition, and a status icon/message (success/failure) is displayed.
- The history of the last 10 rolls is displayed in a table layout, complete with an icon and the status of each roll.

## Tech Stack

- **Next.js** (Pages Router)
- **TypeScript**
- **Material UI (MUI v5)**

## Project Structure

src/
components/ 
  dice-game/  # Game UI (MUI)
    DiceDisplay.tsx
    GameControls.tsx
    GameHistoryTable.tsx
    GameStatusAlert.tsx
  DiceGame.tsx       
hooks/
  useDiceGame.ts     # Game core logic (state, roll execution, history) — decoupled from UI
  useDiceGame.test.ts
types/
  game.types.ts            # Type definitions & constants (Condition, MAX_HISTORY_LENGTH, MIN/MAX_ROLL)
pages/
  api/
    roll.ts          # Mock API 
  _app.tsx           # ThemeProvider + CssBaseline
  index.tsx          # Main entrypoint page
theme.ts             # Custom MUI theme configuration

## Getting Started

```bash
npm install
npm run dev
Open http://localhost:3000 in your browser.