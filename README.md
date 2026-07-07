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

```text
src/
├── components/
│   ├── DiceGame.tsx            # Main game container component
│   └── dice-game/              # Atomic modular sub-components
│       ├── dice-display.tsx
│       ├── game-controls.tsx
│       ├── game-history.tsx
│       ├── game-status.tsx
│       └── index.tsx           # Barrel file for clean sub-component imports
├── hooks/
│   ├── useDiceGame.ts          # Core decoupled game execution hook (state, handlers)
│   └── useDiceGame.test.ts     # Isolated unit tests covering handlers & reactivity
├── pages/
│   ├── _app.tsx                # Context wrapper (MUI ThemeProvider + CssBaseline)
│   ├── index.tsx               # Client landing entrypoint page route
│   └── api/
│       └── roll.ts             # Mock server API rolling simulation logic
├── types/
│   └── game.types.ts           # Type dictionaries, definitions & schema shapes
├── utils/
│   ├── const.ts                # Immutable configuration rules & ranges
│   └── formatTime.ts           # Pure temporal styling formatting utility
└── theme.ts                    # Root customizable Material UI palette definitions
```

## Getting Started

```bash
npm install
npm run dev
Open http://localhost:3000 in your browser.
