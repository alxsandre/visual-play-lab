import type p5 from "p5";
import { colorHsluv } from "../utils"

export class Wave {
  color: p5.Color;
  pX: number;
  pY: number;
  w: number;
  h: number;
  v: number;
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
    this.points = 100;
    this.vertices = [];
  }

  generateColor(s: p5) {
    return colorHsluv(s, 30, 100, s.random(20, 80));
  }

  draw(s: p5) {
    s.push();
    s.noStroke();
    s.fill(this.color);
    s.translate(this.pX, this.pY);
    s.beginShape();
    this.vertices = [];
    for (let i = 0; i < this.points; i++) {
      const x = i * this.w;
      const freq = 0.15;
      const phase = s.millis() * this.v;
      const y = i === 0 || i === this.points - 1
        ? - (this.pY - s.height)
        : s.cos(i * freq + phase) * this.h;
      s.vertex(x, y);
      this.vertices.push(s.createVector(x, y));
    }
    s.endShape();
    s.pop();
  }
}