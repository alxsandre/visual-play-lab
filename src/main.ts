import p5 from "p5";
import { Wave } from "./shape/wave";
import { Ellipse } from "./shape/ellipse";

new p5((s: p5) => {
  let moveLeft = false;
  let moveRight = false;
  const LEFT_ARROW = 37;
  const RIGHT_ARROW = 39;
  const nbWaves = 20;
  let currentWaveIndex = nbWaves - 1 - 9;

  let ellipsePosition = 3;

  let waves: Wave[] = [];
  let ellipse: Ellipse;

  s.setup = () => {
    s.createCanvas(s.windowWidth - 250, s.windowHeight);
    //s.frameRate(1);
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
    ellipse = new Ellipse({ s, x: 3, y: 200, size: 30 });
  };

  s.draw = () => {
    s.clear();
    // s.background(colorHsluv(s, 40, 100, 65))
    for (const wave of waves) {
      wave.draw(s);
    }

    if (moveLeft) {
      ellipsePosition--
    }
    if (moveRight) {
      ellipsePosition++
    }
    ellipse.updatePosition(moveLeft, moveRight);
    ellipse.draw(s);

    const currentWave = waves[currentWaveIndex];
    const ellipseSize = 30;
    const currentWaveX = currentWave.vertices[ellipsePosition].x;
    const currentWaveY = currentWave.vertices[ellipsePosition].y - ellipseSize / 2;


    if (currentWaveIndex > 0) {
      const upWave = waves[currentWaveIndex - 1];
      const bottomWave = waves[currentWaveIndex + 1];
      const upWaveY = upWave.vertices[ellipsePosition].y - ellipseSize / 2;
      const bottomWaveY = bottomWave.vertices[ellipsePosition].y - ellipseSize / 2;

      if (currentWaveY > bottomWaveY) {
        s.ellipse(bottomWave.vertices[ellipsePosition].x, bottomWaveY, ellipseSize);
        return;
      }

      if (currentWaveY < upWaveY) {
        currentWaveIndex--;
      }

      s.ellipse(currentWaveX, currentWaveY, ellipseSize);
    }
  };

  // Gestion des touches
  s.keyPressed = () => {
    if (s.keyCode === LEFT_ARROW) moveLeft = true;
    if (s.keyCode === RIGHT_ARROW) moveRight = true;
  };
  s.keyReleased = () => {
    if (s.keyCode === LEFT_ARROW) moveLeft = false;
    if (s.keyCode === RIGHT_ARROW) moveRight = false;
  };
});

// EXEMPLE INTERPOLATION
// const i = 5.3; // index "fractionnaire"
// const i0 = Math.floor(i);
// const i1 = Math.ceil(i);

// const p0 = this.vertices[i0];
// const p1 = this.vertices[i1];

// const t = i - i0;
// const interpolated = p5.Vector.lerp(p0, p1, t);
