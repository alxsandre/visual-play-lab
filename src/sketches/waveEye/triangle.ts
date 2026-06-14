import type p5 from "p5";
import { colorHsluv } from "../../utils";

export class Triangle {
  ax: number; ay: number;
  lx: number; ly: number;
  rfx: number; rfy: number;
  rx: number; ry: number;
  eyeR: number;
  color: p5.Color;

  constructor(
    s: p5,
    ax: number, ay: number,
    lx: number, ly: number,
    rfx: number, rfy: number,
    rx: number, ry: number,
    eyeR: number
  ) {
    this.ax = ax; this.ay = ay;
    this.lx = lx; this.ly = ly;
    this.rfx = rfx; this.rfy = rfy;
    this.rx = rx; this.ry = ry;
    this.eyeR = eyeR;
    this.color = colorHsluv(s, s.random(0, 360), 100, s.random(40, 70));
  }

  draw(s: p5) {
    const ctx = s.drawingContext as CanvasRenderingContext2D;

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(this.ax, this.ay);
    ctx.lineTo(this.lx, this.ly);
    ctx.lineTo(this.rx, this.ry);
    ctx.closePath();
    ctx.clip();

    const whiteH = this.eyeR * 5;
    s.noStroke();
    s.fill(240);
    s.ellipse(this.ax, this.ay + whiteH / 2, this.eyeR * 8, whiteH);
    s.fill(this.color);
    s.circle(this.ax, this.ay + whiteH - this.eyeR, this.eyeR * 2);

    ctx.restore();

    s.stroke(240);
    s.strokeWeight(1.5);
    s.line(this.ax, this.ay, this.lx, this.ly);
    s.line(this.ax, this.ay, this.rx, this.ry);
  }
}
