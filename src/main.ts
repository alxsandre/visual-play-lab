import p5 from "p5";
import { SKETCHES, type SketchName } from "./sketches";

let currentInstance: p5 | null = null;

function mountSketch(name: SketchName) {
  if (currentInstance) currentInstance.remove();
  currentInstance = new p5(SKETCHES.find((s) => s.name === name)!.fn);
}

document.querySelectorAll<HTMLButtonElement>("[data-sketch]").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll<HTMLButtonElement>("[data-sketch]").forEach((b) =>
      b.classList.remove("active")
    );
    btn.classList.add("active");
    mountSketch(btn.dataset.sketch as SketchName);
  });
});

const defaultSketch: SketchName = "circles";
document.querySelector<HTMLButtonElement>(`[data-sketch="${defaultSketch}"]`)?.classList.add("active");
mountSketch(defaultSketch);
