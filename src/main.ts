import p5 from "p5";
import { Wave } from "./shape/wave";
// import "p5play"
// controls
// const particulesNbCtrl = document.querySelector('#particules_nb_ctrl');

let waves: Wave[] = [];

new p5((s: p5) => {
  s.setup = () => {
    s.createCanvas(s.windowWidth - 250, s.windowHeight);
    //  const nbWaves = 5; // Pour la physique, commence avec peu de vagues
    // for (let i = 0; i < nbWaves; i++) {
    //   waves.push(
    //     new Wave(
    //       s,
    //       -30,
    //       200 + i * 80, // espace les vagues verticalement
    //       20,
    //       40,
    //       s.random(0.0005, 0.001)
    //     )
    //   );
    // }
    // // Crée la boule dynamique
    // ball = new Sprite(s.width / 2, 50, 30, "dynamic");
    // ball.bounciness = 0.3;
    // ball.friction = 0.01;
    // ball.color = "white";
    const nbWaves = 20;
    for (let i = 0; i < nbWaves; i++) {
      waves.push(new Wave(s, -30, -60 + (i * (nbWaves + 30)), 20, nbWaves + 30, s.random(0.0005, 0.001)));
    }
    // const nbWaves = 1;
    // for (let i = 0; i < nbWaves; i++) {
    //   waves.push(new Wave(s, 0, s.height/2, 5, 30, s.random(0.0005, 0.001)));
    // };
  };

  s.draw = () => {
    s.clear();
    // s.background(colorHsluv(s, 40, 100, 65))
     for (const wave of waves) {
      wave.draw(s);
    }
  };
});
