import p5 from "p5";
import { waveSurferSketch } from "./sketches/waveSurfer/index";
import { circlesSketch } from "./sketches/circles/index";
import { waveEyeSketch } from "./sketches/waveEye/index";

const SKETCHES = [
  { name: "waveEye",    fn: waveEyeSketch },
  { name: "circles",    fn: circlesSketch },
  { name: "waveSurfer", fn: waveSurferSketch },
];

const defaultSketch = SKETCHES[0].name;

let currentInstance: p5 | null = null;

const mountSketch = (name: string) => {
  document.querySelectorAll<HTMLButtonElement>("[data-sketch]").forEach((b) =>
    b.classList.toggle("active", b.dataset.sketch === name)
  );
  if (currentInstance) currentInstance.remove();
  const sketch = SKETCHES.find((s) => s.name === name);
  if (sketch) currentInstance = new p5(sketch.fn);
};

// init
mountSketch(defaultSketch);

// event
document.querySelectorAll<HTMLButtonElement>("[data-sketch]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const name = btn.dataset.sketch;
    if (!name) return;
    mountSketch(name);
  });
});

