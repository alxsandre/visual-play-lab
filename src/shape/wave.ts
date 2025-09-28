import type p5 from "p5";
import { colorHsluv } from "../utils"

export class Wave {
  color: p5.Color;
  pX: number;
  pY: number;
  w: number;
  h: number;
  v: number;
  freq: number;
  points: number = 100;
  vertices: p5.Vector[] = [];

  constructor({
    s,
    pX = 0,
    pY = 100,
    w = 2,
    h = 100,
    v = 0.005
  }: {
    s: p5,
    pX?: number,
    pY?: number,
    w?: number,
    h?: number,
    v?: number
  }) {
    this.color = this.generateColor(s);
    this.pX = pX;
    this.pY = pY;
    this.w = w;
    this.h = h;
    this.v = v;
    this.freq = 0.01;
    this.points = 100;
    this.vertices = [];
  }

  generateColor(s: p5) {
    return colorHsluv(s, 30, 100, s.random(20, 80));
  }

  getY(s: p5, x: number) {
    const phase = s.millis() * this.v;
    return this.pY + s.cos(x * this.freq + phase) * this.h;
  }

  draw(s: p5) {
    s.push();
    s.noStroke();
    s.fill(this.color);
    s.beginShape();
    for (let i = 0; i < this.points; i++) {
      const x = this.pX + i * this.w;
      const y = i === 0 || i === this.points - 1
        ? s.height
        : this.getY(s, x);
      s.vertex(x, y);
    }
    s.endShape();
    s.pop();
  }
}