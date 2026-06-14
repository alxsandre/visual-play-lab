# Code style

Priority: readable by a human, not a compiler.

- Succinct — if one line is enough, no block
- No wrapper functions that only exist to call another function
- No types for the sake of it: `string` often beats `type MyName = string`
- No comments that explain what the code already says
- No premature abstractions — three similar cases don't justify a generalization
- Code and comments in English

The goal: code you read once and understand.

# Sketch structure

Each sketch lives in `src/sketches/<name>/`:
- `index.ts` — sketch entry point (`setup`, `draw`, orchestration only)
- one file per shape/entity — each as a class with a `draw(s)` method

`index.ts` creates instances in `setup`, calls `draw` in the loop. Logic and rendering belong in the entity class, not in `index.ts`.
