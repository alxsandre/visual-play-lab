import type p5 from "p5";
import { colorHsluv } from "../utils";
import type { Wave } from "./wave";

export class Ellipse {
    color: p5.Color;
    radius: number;
    position: p5.Vector;
    velocity: p5.Vector;
    acceleration: p5.Vector;
    attachedWaveIndex: number;

    constructor({
        s,
        x = 0,
        y = 0,
        radius = 15,
        attachedWaveIndex = 10,
    }: {
        s: p5;
        x?: number;
        y?: number;
        radius?: number;
        attachedWaveIndex?: number;
    }) {
        this.color = Ellipse.generateColor(s);
        this.radius = radius;
        this.position = s.createVector(x, y);
        this.velocity = s.createVector(0, 0);
        this.acceleration = s.createVector(0, 0);
        this.attachedWaveIndex = attachedWaveIndex;
    }

    static generateColor(s: p5) {
        return colorHsluv(s, 30, 100, s.random(20, 80));
    }

    updatePosition(s: p5, moveLeft: boolean, moveRight: boolean, waves: Wave[]) {
        this.calculateXPosition(moveLeft, moveRight);
        this.calculateYPosition(s, waves);
    }

    calculateXPosition(moveLeft: boolean, moveRight: boolean) {
        this.acceleration.set(0, undefined);

        if (moveRight) this.acceleration.x += 2;
        if (moveLeft) this.acceleration.x -= 2;

        this.velocity.add(this.acceleration);
        this.velocity.limit(18);

        if (!moveLeft && !moveRight) {
            this.velocity.mult(0.9); // friction
            if (this.velocity.mag() < 0.1) this.velocity.set(0, undefined); // stop net si trop faible
        }

        this.position.add(this.velocity);
    }

    calculateYPosition(s: p5, waves: Wave[]) {
        const currentWaveY = waves[this.attachedWaveIndex].getY(s, this.position.x);
        const upWaveY = waves[this.attachedWaveIndex - 1].getY(s, this.position.x);
        const bottomWaveY = waves[this.attachedWaveIndex + 1].getY(s, this.position.x);

        if (this.attachedWaveIndex > 0) {
            if (currentWaveY > bottomWaveY) {
                this.position.y = bottomWaveY - this.radius;
                return;
            }

            if (currentWaveY < upWaveY) {
                this.attachedWaveIndex--;
            }

            this.position.y = currentWaveY - this.radius;
        }
    }

    draw(s: p5) {
        s.push();
        s.noStroke();
        s.fill(this.color);
        s.ellipse(this.position.x, this.position.y, this.radius * 2);
        s.pop();
    }
}
