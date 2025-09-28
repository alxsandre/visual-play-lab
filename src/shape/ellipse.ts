import type p5 from "p5";
import { colorHsluv } from "../utils";

export class Ellipse {
    color: p5.Color;
    size: number;
    position: p5.Vector;
    velocity: p5.Vector;
    acceleration: p5.Vector;

    constructor({
        s,
        x = 0,
        y = 0,
        size = 30,
    }: {
        s: p5;
        x?: number;
        y?: number;
        size?: number;
    }) {
        this.color = Ellipse.generateColor(s);
        this.size = size;
        this.position = s.createVector(x, y);
        this.velocity = s.createVector(0, 0);
        this.acceleration = s.createVector(0, 0);
    }

    static generateColor(s: p5) {
        return colorHsluv(s, 30, 100, s.random(20, 80));
    }

    updatePosition(moveLeft: boolean, moveRight: boolean) {
        this.acceleration.set(0, 0);

        if (moveRight) this.acceleration.x += 0.1;
        if (moveLeft) this.acceleration.x -= 0.1;

        this.velocity.add(this.acceleration);
        this.velocity.limit(5);

        if (!moveLeft && !moveRight) {
            this.velocity.mult(0.9); // friction
            if (this.velocity.mag() < 0.1) this.velocity.set(0, 0); // stop net si trop faible
        }

        this.position.add(this.velocity);
    }

    // attachToWave(wave: any, index: number) {
    //     this.x = wave.pX + wave.vertices[index].x;
    //     this.y = wave.pY + wave.vertices[index].y - this.size / 2;
    // }

    draw(s: p5) {
        s.push();
        s.noStroke();
        s.fill(this.color);
        s.ellipse(this.position.x, this.position.y, this.size);
        s.pop();
    }
}
