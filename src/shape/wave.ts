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
  segments: Sprite[] = [];

  constructor(
    s: p5,
    pX = 0,
    pY = 100,
    w = 2,
    h = 100,
    v = 0.005
  ) {
    this.color = this.generateColor(s);
    this.pX = pX;
    this.pY = pY;
    this.w = w;
    this.h = h;
    this.v = v;
    // this.createSegments(s);
  }

  generateColor(s: p5) {
    return colorHsluv(s, 30, 100, s.random(20, 80));
  }

  // Crée les segments physiques une seule fois
  // createSegments(s: p5) {
  //   for (let i = 0; i < this.points - 1; i++) {
  //     const segment = new Sprite(0, 0, this.w, 6, "static");
  //     segment.color = this.color;
  //     this.segments.push(segment);
  //   }
  //   this.updateSegments(s);
  // }

  // Met à jour la position et la rotation des segments à chaque frame
  // updateSegments(s: p5) {
  //   const freq = 0.15;
  //   const phase = s.millis() * this.v;
  //   for (let i = 0; i < this.points - 1; i++) {
  //     const x1 = i * this.w + this.pX;
  //     const x2 = (i + 1) * this.w + this.pX;
  //     const y1 = s.cos(i * freq + phase) * this.h + this.pY;
  //     const y2 = s.cos((i + 1) * freq + phase) * this.h + this.pY;
  //     const segment = this.segments[i];
  //     segment.x = (x1 + x2) / 2;
  //     segment.y = (y1 + y2) / 2;
  //     segment.rotation = s.degrees(Math.atan2(y2 - y1, x2 - x1));
  //   }
  // }

  draw(s: p5) {
  s.push();
  s.noStroke();
  s.fill(this.color);
  s.translate(this.pX, this.pY);
  s.beginShape();
  for (let i = 0; i < this.points; i++) {
    const x = i * this.w;
    const freq = 0.15;
    const phase = s.millis() * this.v;
    const y = i === 0 || i === this.points - 1
        ? - (this.pY - s.height)
        : s.cos(i * freq + phase) * this.h;
    s.vertex(x, y);
  }
  s.endShape();
  s.pop();
}
}