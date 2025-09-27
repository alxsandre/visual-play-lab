import type p5 from "p5";
import { colorHsluv } from "../utils";

export class Ellipse {
    color: p5.Color;
    size: number;
    x: number;
    y: number;

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
        this.x = x;
        this.y = y;
    }

    static generateColor(s: p5) {
        return colorHsluv(s, 30, 100, s.random(20, 80));
    }

    updatePosition(moveLeft: boolean, moveRight: boolean) {
        this.x += (moveRight ? 1 : 0) - (moveLeft ? 1 : 0);
    }

    attachToWave(wave: any, index: number) {
        this.x = wave.pX + wave.vertices[index].x;
        this.y = wave.pY + wave.vertices[index].y - this.size / 2;
    }

    draw(s: p5) {
        s.push();
        s.noStroke();
        s.fill(this.color);
        s.ellipse(this.x, this.y, this.size);
        s.pop();
    }
}
