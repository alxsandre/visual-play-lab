import type p5 from "p5";
import { colorHsluv } from "../../utils";

export class Grain {
  x: number;
  y: number;
  w: number;
  h: number;
  angle: number;
  color: p5.Color;

  constructor(s: p5, cw: number, ch: number, sizeMin: number, sizeMax: number) {
    this.x = s.random(cw);
    this.y = s.random(ch);
    const size = s.random(sizeMin, sizeMax);
    this.w = size * s.random(0.4, 1.9);
    this.h = size;
    this.angle = s.random(Math.PI);
    this.color = colorHsluv(s, s.random(25, 55), s.random(15, 55), s.random(45, 82));
  }

  draw(s: p5) {
    s.push();
    s.translate(this.x, this.y);
    s.rotate(this.angle);
    s.noStroke();
    s.fill(this.color);
    s.ellipse(0, 0, this.w, this.h);
    s.pop();
  }
}
