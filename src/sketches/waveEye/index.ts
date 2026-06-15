import type p5 from "p5";
import { Triangle } from "./triangle";

type Point = { x: number; y: number };

export function waveEyeSketch(s: p5) {
  const triangles: Triangle[] = [];

  s.setup = () => {
    s.createCanvas(s.windowWidth - 250, s.windowHeight);
    s.noLoop();

    const cols = 30;
    const rows = 20;
    const tw = s.width / cols;
    const th = tw * 0.3;
    const amp = th * 0.3;
    const topPad = th + amp;

    for (let row = 0; row < rows; row++) {
      const baseY = topPad + (row / (rows - 1)) * (s.height - topPad);
      const phase = (row * Math.PI) / rows;

      const apexes = Array.from({ length: cols }, (_, col): Point => ({
        x: col * tw + tw / 2,
        y: baseY - th + Math.sin((col / (cols - 1)) * Math.PI * 2 + phase) * amp,
      }));

      const rightExts = Array.from({ length: cols }, (_, col): Point => ({
        x: (col + 1) * tw + s.map(s.noise(col * 0.85, row * 0.4), 0, 1, -tw * 0.5, tw * 0.5) + s.random(-tw * 0.12, tw * 0.12),
        y: Math.min(baseY + s.map(s.noise(col * 0.85 + 100, row * 0.4), 0, 1, th * 0.1, th * 0.8) + s.random(-th * 0.08, th * 0.08), s.height),
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
  };

  s.draw = () => {
    s.background(135, 195, 235);
    for (const tri of triangles) tri.draw(s);
  };

  s.keyPressed = () => {
    if (s.key === "s") s.saveCanvas("waveEye", "png");
  };
}
