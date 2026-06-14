import type p5 from "p5";
import { Triangle } from "./triangle";

export function waveEyeSketch(s: p5) {
  let triangles: Triangle[] = [];

  s.setup = () => {
    s.createCanvas(s.windowWidth - 250, s.windowHeight);
    s.noLoop();

    const cols = 7;
    const rows = 5;
    const tw = s.width / cols;
    const th = tw * 1.1;
    const amp = th * 0.3;
    const eyeR = tw * 0.13;

    const topPad = th + amp;

    for (let row = 0; row < rows; row++) {
      const baseY = topPad + (row / (rows - 1)) * (s.height - topPad);
      const phase = (row * Math.PI) / rows;

      // where each triangle fill ends / next starts (wide range = organic connections)
      const pts = Array.from({ length: cols + 1 }, () =>
        baseY + s.random(-th * 0.2, th * 0.5)
      );
      // how far the side lines extend past the fill vertices
      const lineEnds = pts.map(y => Math.min(y + s.random(tw * 0.2, tw * 0.6), s.height));

      for (let col = 0; col < cols; col++) {
        const ax = col * tw + tw / 2;
        const ay = baseY - th + Math.sin((col / (cols - 1)) * Math.PI * 2 + phase) * amp;
        triangles.push(new Triangle(
          s,
          ax, ay,
          col * tw,       pts[col],       lineEnds[col],
          (col + 1) * tw, pts[col + 1],   lineEnds[col + 1],
          eyeR
        ));
      }
    }
  };

  s.draw = () => {
    s.background(10, 20, 80);
    for (const tri of triangles) tri.draw(s);
  };
}
