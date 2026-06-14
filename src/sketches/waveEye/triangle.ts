import type p5 from "p5";
import { colorHsluv } from "../../utils";

export class Triangle {
  ax: number; ay: number;
  lx: number; ly: number; lyExt: number;
  rx: number; ry: number; ryExt: number;
  eyeR: number;
  color: p5.Color;

  constructor(
    s: p5,
    ax: number, ay: number,
    lx: number, ly: number, lyExt: number,
    rx: number, ry: number, ryExt: number,
    eyeR: number
  ) {
    this.ax = ax; this.ay = ay;
    this.lx = lx; this.ly = ly; this.lyExt = lyExt;
    this.rx = rx; this.ry = ry; this.ryExt = ryExt;
    this.eyeR = eyeR;
    this.color = colorHsluv(s, s.random(0, 360), 100, s.random(40, 70));
  }

  draw(s: p5) {
    const ctx = s.drawingContext as CanvasRenderingContext2D;

    // clip eye to triangle interior
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(this.ax, this.ay);
    ctx.lineTo(this.lx, this.lyExt);
    ctx.lineTo(this.rx, this.ryExt);
    ctx.closePath();
    ctx.clip();

    const whiteH = this.eyeR * 5;
    const whiteCY = this.ay + whiteH / 2;
    const pupilCY = this.ay + whiteH - this.eyeR;

    s.noStroke();
    s.fill(240);
    s.ellipse(this.ax, whiteCY, this.eyeR * 8, whiteH);
    s.fill(this.color);
    s.circle(this.ax, pupilCY, this.eyeR * 2);

    ctx.restore();

    // lines drawn on top, outside clip
    s.stroke(220);
    s.strokeWeight(1.5);
    s.line(this.ax, this.ay, this.lx, this.lyExt);
    s.line(this.ax, this.ay, this.rx, this.ryExt);
  }
}
