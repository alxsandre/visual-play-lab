import type p5 from "p5";
import type { FolderApi } from "tweakpane";
import { Circle } from "./circle";

const CIRCLES_TOTAL = 20;

export function circlesSketch(s: p5, _folder: FolderApi) {
  let circles: Circle[] = [];

  s.setup = () => {
    s.createCanvas(s.windowWidth, s.windowHeight);

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
