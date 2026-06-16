import type p5 from "p5";
import { Pane } from "tweakpane";

export function setupSaveKey(s: p5, filename: string) {
  s.keyPressed = () => {
    if (s.key === "s") s.saveCanvas(filename, "png");
  };
}

export function createPane(title: string): Pane {
  return new Pane({ title });
}
