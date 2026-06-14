import p5 from "p5";
import { waveSurferSketch } from "./sketches/waveSurfer/index";
import { circlesSketch } from "./sketches/circles/index";

export const SKETCHES = [
  { name: "waveSurfer" as const, fn: waveSurferSketch },
  { name: "circles" as const,    fn: circlesSketch },
] satisfies Array<{ name: string; fn: (s: p5) => void }>;

export type SketchName = (typeof SKETCHES)[number]["name"];
