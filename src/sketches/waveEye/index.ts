import type p5 from "p5";
import { Pane } from "tweakpane";
import { Triangle } from "./triangle";

type Point = { x: number; y: number };

// destroyed and recreated each time the sketch mounts
let pane: Pane | null = null;

const params = {
  // grid
  cols: 30,
  rows: 20,
  // triangle shape
  thRatio:      0.3,   // height = tw * thRatio  → lower = flatter
  waveAmpRatio: 0.3,   // amplitude = th * waveAmpRatio
  waveFreq:     2,     // full wave cycles per row
  // right corner chaos
  noiseStep: 0.85,     // higher = more chaotic between columns
  jitterX:   0.5,      // max horizontal spread (as fraction of tw)
  jitterY:   0.8,      // max vertical drop (as fraction of th)
};

export function waveEyeSketch(s: p5) {
  pane?.dispose();

  const triangles: Triangle[] = [];

  const generate = () => {
    triangles.length = 0;

    const { cols, rows, thRatio, waveAmpRatio, waveFreq, noiseStep, jitterX, jitterY } = params;
    const tw = s.width / cols;
    const th = tw * thRatio;
    const waveAmp = th * waveAmpRatio;
    const topPad = th + waveAmp;

    for (let row = 0; row < rows; row++) {
      const baseY = topPad + (row / (rows - 1)) * (s.height - topPad);
      const phase = (row * Math.PI) / rows;

      const apexes = Array.from({ length: cols }, (_, col): Point => ({
        x: col * tw + tw / 2,
        y: baseY - th + Math.sin((col / (cols - 1)) * Math.PI * waveFreq + phase) * waveAmp,
      }));

      const rightExts = Array.from({ length: cols }, (_, col): Point => ({
        x: (col + 1) * tw + s.map(s.noise(col * noiseStep, row * 0.4), 0, 1, -tw * jitterX, tw * jitterX) + s.random(-tw * 0.12, tw * 0.12),
        y: Math.min(baseY + s.map(s.noise(col * noiseStep + 100, row * 0.4), 0, 1, th * 0.1, th * jitterY) + s.random(-th * 0.08, th * 0.08), s.height),
      }));

      const connections: Point[] = [{ x: 0, y: baseY + s.map(s.noise(row * 0.4 + 200), 0, 1, -th * 0.1, th * 0.1) }];
      for (let col = 0; col < cols; col++) {
        const t = s.map(s.noise(col * 0.45 + 300, row * 0.4), 0, 1, 0.2, 0.9) + s.random(-0.08, 0.08);
        connections.push({
          x: apexes[col].x + t * (rightExts[col].x - apexes[col].x),
          y: apexes[col].y + t * (rightExts[col].y - apexes[col].y),
        });
      }

      for (let col = 0; col < cols; col++) {
        triangles.push(new Triangle(
          s,
          apexes[col].x,      apexes[col].y,
          connections[col].x, connections[col].y,
          rightExts[col].x,   rightExts[col].y,
        ));
      }
    }

    s.redraw();
  };

  s.setup = () => {
    s.createCanvas(s.windowWidth - 250, s.windowHeight);
    s.noLoop();

    pane = new Pane({ title: "waveEye" });

    const grid = pane.addFolder({ title: "Grid" });
    grid.addBinding(params, "cols",  { min: 5,   max: 500,  step: 1,   label: "colonnes" }).on("change", generate);
    grid.addBinding(params, "rows",  { min: 5,   max: 200,  step: 1,   label: "rangées"  }).on("change", generate);

    const shape = pane.addFolder({ title: "Forme" });
    shape.addBinding(params, "thRatio",      { min: 0.1, max: 1.5, label: "hauteur"  }).on("change", generate);
    shape.addBinding(params, "waveAmpRatio", { min: 0,   max: 1,   label: "amplitude"}).on("change", generate);
    shape.addBinding(params, "waveFreq",     { min: 0.5, max: 8,   label: "fréquence"}).on("change", generate);

    const jitter = pane.addFolder({ title: "Chaos" });
    jitter.addBinding(params, "noiseStep", { min: 0.1, max: 2,   label: "pas noise"  }).on("change", generate);
    jitter.addBinding(params, "jitterX",   { min: 0,   max: 1.5, label: "étalement X"}).on("change", generate);
    jitter.addBinding(params, "jitterY",   { min: 0.1, max: 2,   label: "chute Y"    }).on("change", generate);

    generate();
  };

  s.draw = () => {
    s.background(135, 195, 235);
    for (const tri of triangles) tri.draw(s);
  };

  s.keyPressed = () => {
    if (s.key === "s") s.saveCanvas("waveEye", "png");
  };
}
