import type p5 from "p5";
import { Circle } from "./circle";

const CIRCLES_TOTAL = 20;

export function circlesSketch(s: p5) {
  let circles: Circle[] = [];

  s.setup = () => {
    s.createCanvas(s.windowWidth - 250, s.windowHeight);

    for (let i = 0; i < CIRCLES_TOTAL; i++) {
      circles.push(new Circle(s, s.width, s.height));
    }
  };

  s.draw = () => {
    s.background(220);

    for (const circle of circles) {
      circle.update();
      circle.checkEdges(s);
      circle.draw(s);
    }
  };
}
