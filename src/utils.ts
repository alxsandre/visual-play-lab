import { Hsluv } from "hsluv";
import type p5 from "p5";

export function colorHsluv(s: p5, h: number, sat: number, l: number) {
  const hsluv = new Hsluv();
    hsluv.hsluv_h = h;
    hsluv.hsluv_s = sat;
    hsluv.hsluv_l = l;
    hsluv.hsluvToRgb();
  return s.color(hsluv.rgb_r * 255, hsluv.rgb_g * 255, hsluv.rgb_b * 255);
}

export function wrap(val: number, min: number, max: number) {
  let range = max - min;
  return ((val - min) % range + range) % range + min;
}

export function pingpong(val: number, min: number, max: number) {
  let range = max - min;
  let mod = (val - min) % (2 * range);
  if (mod < 0) mod += 2 * range;
  return mod < range ? min + mod : max - (mod - range);
}
