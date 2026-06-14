import type p5 from "p5";

export class Circle {
  position: p5.Vector;
  velocity: p5.Vector;
  acceleration: p5.Vector;
  d: number;
  c: p5.Color;
  randomX: number;
  randomY: number;

  constructor(s: p5, canvasWidth: number, canvasHeight: number) {
    this.position = s.createVector(Math.random() * canvasWidth, Math.random() * canvasHeight);
    this.velocity = s.createVector(1, 1);
    this.acceleration = s.createVector(0, 0);
    this.d = Math.random() * 50.0;
    this.c = s.color(Math.random() * 255, Math.random() * 255, Math.random() * 255);
    this.randomX = Math.random();
    this.randomY = Math.random();
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  checkEdges(s: p5) {
    if (this.position.x > s.width) {
      this.position.x = s.width;
      this.velocity.x *= -1;
    } else if (this.position.x < 0) {
      this.velocity.x *= -1;
      this.position.x = 0;
    }

    if (this.position.y > s.height) {
      this.velocity.y *= -1;
      this.position.y = s.height;
    } else if (this.position.y < 0) {
      this.velocity.y *= -1;
      this.position.y = 0;
    }
  }

  draw(s: p5) {
    s.noStroke();
    s.fill(this.c);
    s.circle(this.position.x, this.position.y, this.d);
    const xOffset = this.d * 0.12 + this.randomX * this.d * 0.15;
    const yOffset = (this.randomY * 2 - 1) * this.d * 0.2;
    s.fill("black");
    s.circle(this.position.x - xOffset, this.position.y + yOffset, this.d * 0.2);
    s.circle(this.position.x + xOffset, this.position.y + yOffset, this.d * 0.2);
  }
}
