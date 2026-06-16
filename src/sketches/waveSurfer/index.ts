import type p5 from "p5";
import type { FolderApi } from "tweakpane";
import { Wave } from "./wave";
import { Ellipse } from "./ellipse";

const ARROW = {
  LEFT: 37,
  RIGHT: 39,
};

export function waveSurferSketch(s: p5, _folder: FolderApi) {
  let moveLeft = false;
  let moveRight = false;
  let waves: Wave[] = [];
  let ellipse: Ellipse;

  const nbWaves = 20;

  s.setup = () => {
    s.createCanvas(s.windowWidth, s.windowHeight);

    for (let i = 0; i < nbWaves; i++) {
      waves.push(new Wave({
        s,
        pX: -30,
        pY: -60 + (i * (nbWaves + 30)),
        w: 20,
        h: nbWaves + 30,
        v: s.random(0.0005, 0.001),
      }));
    }

    ellipse = new Ellipse({ s, x: 3, y: 200, radius: 30 });
  };

  s.draw = () => {
    s.clear();
    for (const wave of waves) {
      wave.draw(s);
    }
    ellipse.updatePosition(s, moveLeft, moveRight, waves);
    ellipse.draw(s);
  };

  s.keyPressed = () => {
    if (s.keyCode === ARROW.LEFT) moveLeft = true;
    if (s.keyCode === ARROW.RIGHT) moveRight = true;
  };

  s.keyReleased = () => {
    if (s.keyCode === ARROW.LEFT) moveLeft = false;
    if (s.keyCode === ARROW.RIGHT) moveRight = false;
  };
}
