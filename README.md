# Hamster Stack (test version)

A tiny one-tap stacking game in the Hamster Rocket universe. Sunflower seed blocks slide in, you drop them on the tower and the overhang gets chopped off. Separate test site; it may become a mode of the main Hamster Rocket demo later.

**Just a game for fun. No prizes, no rewards, no tokens to win.**

Play: https://botgrok558-ux.github.io/hamster-rocket-stack/

## Controls
- **Mobile:** tap anywhere to drop the block.
- **PC:** click or press **Space** (also ↓). **P** / **Esc** = pause, **M** = sound on/off, **Enter** / **Space** = start / play again.
- The game pauses automatically when the tab is hidden.

## Rules
- The block slides back and forth above the tower. Whatever hangs over the edge is cut off and falls down; the next block is only as wide as what stayed on.
- **Perfect drop** (within a few pixels): the block snaps into place, keeps its full width, sparkles and plays a rising note. Perfect drops in a row build a combo; from the 3rd in a row every perfect drop also widens the block again.
- Miss the tower completely and the run is over. The camera zooms out to show your whole tower.
- Every 10th block is a golden hamster box. The slide speed goes up with every block.
- Score = blocks stacked. Best score and best combo are stored locally (`hrs_best`, `hrs_bestCombo`).

## Code
- `stack.js`: self-contained game module (simulation, Canvas 2D rendering, input, WebAudio synth sounds). No dependencies.
  `HamsterStack.create({ canvas, assetBase, t, storagePrefix, onEvent })` returns `{ start(), drop(), pause(), resume(), toggleMute(), setMuted(), destroy(), state, muted, best() }`.
  Events: `state`, `score`, `gameover`, `mute`.
- `main.js`: page UI (overlays, buttons, share on X).
- `i18n.js`: DE / EN / FR (browser auto-detect, choice remembered).
- `assets/`: art and fonts copied from the main demo.

No external requests, no CDN libraries, no tracking.
