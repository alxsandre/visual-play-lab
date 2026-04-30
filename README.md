# visual-play-lab

An interactive creative coding project built with **p5.js** and **TypeScript** — a personal space for experimenting with generative visuals, physics-based interactions, and real-time animation.

## Current experiment — Wave Rider

An ellipse surfing across a field of animated waves, controlled by the keyboard. The waves are drawn using cosine functions and rendered in warm HSLuv tones. The ellipse follows the wave surface dynamically with acceleration, velocity, and friction.

**Controls:** `←` `→` arrow keys to move the ellipse across the waves.

![wave-rider preview](public/preview.png)

> No preview yet? Run the project locally and take a screenshot.

## Tech stack

- [p5.js](https://p5js.org/) — creative coding / canvas rendering
- [TypeScript](https://www.typescriptlang.org/) — typed, structured code
- [Vite](https://vitejs.dev/) — fast dev server and build tool
- [HSLuv](https://www.hsluv.org/) — perceptually uniform color space
- [matter.js](https://brm.io/matter-js/) — 2D physics engine (in progress)

## Getting started

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

## Project structure

```
src/
├── main.ts          # Entry point — p5 sketch setup and draw loop
├── utils.ts         # Shared helpers (color, math…)
└── shape/
    ├── wave.ts      # Animated wave shape
    └── ellipse.ts   # Interactive ellipse with physics
```

## Philosophy

This repository is an ongoing playground — each experiment lives here as an iteration. The goal is to explore the intersection of **generative art** and **interactive experiences**, while keeping the code clean and modular enough to reuse across experiments.
