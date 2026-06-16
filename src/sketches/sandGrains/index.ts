import type p5 from "p5";
import type { FolderApi } from "tweakpane";
import { Grain } from "./grain";
import { setupSaveKey } from "../../sketch-utils";

const params = {
  count:   10000,
  sizeMin: 4,
  sizeMax: 16,
};

export function sandGrainsSketch(s: p5, folder: FolderApi) {
  let grains: Grain[] = [];

  const generate = () => {
    grains = Array.from({ length: params.count }, () =>
      new Grain(s, s.width, s.height, params.sizeMin, params.sizeMax)
    );
    s.redraw();
  };

  s.setup = () => {
    s.createCanvas(s.windowWidth, s.windowHeight);
    s.noLoop();

    folder.addBinding(params, "count",   { min: 500,  max: 30000, step: 500, label: "grains"     }).on("change", generate);
    folder.addBinding(params, "sizeMin", { min: 1,    max: 20,    step: 0.5, label: "taille min" }).on("change", generate);
    folder.addBinding(params, "sizeMax", { min: 2,    max: 40,    step: 0.5, label: "taille max" }).on("change", generate);

    setupSaveKey(s, "sandGrains");
    generate();
  };

  s.draw = () => {
    s.background(236, 221, 179);
    for (const grain of grains) grain.draw(s);
  };
}
