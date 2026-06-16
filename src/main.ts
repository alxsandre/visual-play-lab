import p5 from "p5";
import type { FolderApi } from "tweakpane";
import { waveSurferSketch } from "./sketches/waveSurfer/index";
import { circlesSketch } from "./sketches/circles/index";
import { waveEyeSketch } from "./sketches/waveEye/index";
import { sandGrainsSketch } from "./sketches/sandGrains/index";
import { createPane } from "./sketch-utils";

type SketchFn = (s: p5, folder: FolderApi) => void;

const SKETCHES: { name: string; fn: SketchFn }[] = [
  { name: "sandGrains", fn: sandGrainsSketch },
  { name: "waveEye",    fn: waveEyeSketch },
  { name: "circles",    fn: circlesSketch },
  { name: "waveSurfer", fn: waveSurferSketch },
];

const pane = createPane("exploration");

const nav = { sketch: SKETCHES[0].name };
pane.addBinding(nav, "sketch", {
  view: "list",
  label: "sketch",
  options: SKETCHES.map((s) => ({ text: s.name, value: s.name })),
}).on("change", ({ value }) => mountSketch(value));

let currentInstance: p5 | null = null;
let currentFolder: FolderApi | null = null;

function mountSketch(name: string) {
  currentFolder?.dispose();
  if (currentInstance) currentInstance.remove();
  const sketch = SKETCHES.find((s) => s.name === name)!;
  currentFolder = pane.addFolder({ title: name });
  const folder = currentFolder;
  currentInstance = new p5((s) => sketch.fn(s, folder));
}

mountSketch(nav.sketch);
