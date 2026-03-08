import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import { Check, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface LottieOption {
  id: string;
  name: string;
}

export const LOTTIE_BACKGROUNDS: LottieOption[] = [
  { id: "none", name: "No Background" },
  { id: "particles-1", name: "Floating Particles" },
  { id: "wave-1", name: "Sound Wave" },
  { id: "gradient-1", name: "Gradient Blob" },
  { id: "stars-1", name: "Starfield" },
  { id: "circles-1", name: "Pulsing Circles" },
  { id: "smoke-1", name: "Smoke Effect" },
  { id: "confetti-1", name: "Confetti" },
  { id: "geometric-1", name: "Geometric Shapes" },
  { id: "equalizer-1", name: "Equalizer Bars" },
  { id: "fireworks-1", name: "Fireworks" },
  { id: "lightning-1", name: "Lightning" },
  { id: "rain-1", name: "Rain Drops" },
  { id: "spiral-1", name: "Spiral Motion" },
  { id: "bubbles-1", name: "Bubbles" },
  { id: "galaxy-1", name: "Galaxy Swirl" },
  { id: "pulse-1", name: "Heartbeat Pulse" },
  { id: "aurora-1", name: "Aurora Borealis" },
  { id: "matrix-1", name: "Matrix Rain" },
  { id: "dots-1", name: "Dancing Dots" },
  { id: "rings-1", name: "Expanding Rings" },
  { id: "noise-1", name: "Noise Grain" },
  { id: "glitch-bg-1", name: "Glitch Lines" },
  { id: "snow-1", name: "Snowfall" },
  { id: "fire-1", name: "Fire Embers" },
  { id: "music-1", name: "Music Notes" },
  { id: "neon-1", name: "Neon Glow" },
  { id: "hexagon-1", name: "Hexagon Grid" },
  { id: "wave-lines-1", name: "Wave Lines" },
  { id: "bokeh-1", name: "Bokeh Lights" },
];

// Helper: create a shape layer
function makeLayer(
  i: number,
  shapes: object[],
  ks: object,
  opts?: { st?: number }
) {
  return {
    ddd: 0, ind: i, ty: 4, nm: `l${i}`, sr: 1,
    ks, ao: 0,
    shapes: [{ ty: "gr", it: [...shapes, { ty: "tr", p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } }] }],
    ip: 0, op: 150, st: opts?.st ?? 0,
  };
}

function wrap(layers: object[]) {
  return { v: "5.5.7", fr: 30, ip: 0, op: 150, w: 400, h: 300, assets: [], layers };
}

type C = [number, number, number];
const el = (s: number) => ({ ty: "el" as const, d: 1, s: { a: 0, k: [s, s] }, p: { a: 0, k: [0, 0] } });
const rc = (w: number, h: number, r = 0) => ({ ty: "rc" as const, d: 1, s: { a: 0, k: [w, h] }, p: { a: 0, k: [0, 0] }, r: { a: 0, k: r } });
const fl = (c: C, o = 80) => ({ ty: "fl" as const, c: { a: 0, k: [...c, 1] }, o: { a: 0, k: o } });
const st = (c: C, w = 2, o = 80) => ({ ty: "st" as const, c: { a: 0, k: [...c, 1] }, o: { a: 0, k: o }, w: { a: 0, k: w }, lc: 2, lj: 2 });

// Animated position keyframes
function aPos(x1: number, y1: number, x2: number, y2: number, dur = 150) {
  return { a: 1, k: [
    { t: 0, s: [x1, y1, 0], i: { x: 0.4, y: 1 }, o: { x: 0.6, y: 0 } },
    { t: dur / 2, s: [x2, y2, 0], i: { x: 0.4, y: 1 }, o: { x: 0.6, y: 0 } },
    { t: dur, s: [x1, y1, 0] },
  ]};
}

function aScale(s1: number, s2: number, dur = 150) {
  return { a: 1, k: [
    { t: 0, s: [s1, s1, 100], i: { x: [0.4,0.4,0.4], y: [1,1,1] }, o: { x: [0.6,0.6,0.6], y: [0,0,0] } },
    { t: dur / 2, s: [s2, s2, 100], i: { x: [0.4,0.4,0.4], y: [1,1,1] }, o: { x: [0.6,0.6,0.6], y: [0,0,0] } },
    { t: dur, s: [s1, s1, 100] },
  ]};
}

function aOpacity(o1: number, o2: number, dur = 150) {
  return { a: 1, k: [
    { t: 0, s: [o1], i: { x: [0.4], y: [1] }, o: { x: [0.6], y: [0] } },
    { t: dur / 2, s: [o2], i: { x: [0.4], y: [1] }, o: { x: [0.6], y: [0] } },
    { t: dur, s: [o1] },
  ]};
}

function aRotate(deg: number, dur = 150) {
  return { a: 1, k: [
    { t: 0, s: [0], i: { x: [0.4], y: [1] }, o: { x: [0.6], y: [0] } },
    { t: dur, s: [deg] },
  ]};
}

// ======= PATTERN GENERATORS =======

function genParticles(colors: C[]): object {
  const layers = Array.from({ length: 16 }, (_, i) => {
    const c = colors[i % colors.length];
    const x = 25 + (i * 137) % 350;
    const y = 20 + (i * 97) % 260;
    return makeLayer(i, [el(6 + (i % 5) * 2), fl(c, 50 + (i % 4) * 10)], {
      o: aOpacity(0, 70, 150),
      p: aPos(x, y, x + (i % 2 ? 30 : -30), y - 40),
      s: aScale(50, 120),
      r: { a: 0, k: 0 },
    }, { st: -(i * 9) });
  });
  return wrap(layers);
}

function genWave(colors: C[]): object {
  const layers = Array.from({ length: 20 }, (_, i) => {
    const c = colors[i % colors.length];
    const x = i * 20 + 10;
    const baseH = 30 + Math.sin(i * 0.8) * 20;
    return makeLayer(i, [rc(8, baseH, 3), fl(c, 70)], {
      o: { a: 0, k: 70 },
      p: { a: 0, k: [x, 150, 0] },
      s: { a: 1, k: [
        { t: 0, s: [100, 60, 100], i: { x: [.4,.4,.4], y: [1,1,1] }, o: { x: [.6,.6,.6], y: [0,0,0] } },
        { t: 75, s: [100, 180 + (i % 5) * 30, 100], i: { x: [.4,.4,.4], y: [1,1,1] }, o: { x: [.6,.6,.6], y: [0,0,0] } },
        { t: 150, s: [100, 60, 100] },
      ]},
      r: { a: 0, k: 0 },
    }, { st: -(i * 5) });
  });
  return wrap(layers);
}

function genBlob(colors: C[]): object {
  const layers = Array.from({ length: 5 }, (_, i) => {
    const c = colors[i % colors.length];
    return makeLayer(i, [el(80 + i * 20), fl(c, 25)], {
      o: aOpacity(20, 50),
      p: aPos(150 + i * 30, 120 + i * 20, 200 + i * 20, 160 - i * 10),
      s: aScale(80, 140),
      r: aRotate(120 * (i % 2 ? 1 : -1)),
    }, { st: -(i * 20) });
  });
  return wrap(layers);
}

function genStars(colors: C[]): object {
  const layers = Array.from({ length: 30 }, (_, i) => {
    const c = colors[i % colors.length];
    const x = (i * 53) % 400;
    const y = (i * 41) % 300;
    const s = 2 + (i % 4);
    return makeLayer(i, [el(s), fl(c, 90)], {
      o: aOpacity(10, 90, 150),
      p: { a: 0, k: [x, y, 0] },
      s: aScale(30, 130),
      r: { a: 0, k: 0 },
    }, { st: -(i * 5) });
  });
  return wrap(layers);
}

function genCircles(colors: C[]): object {
  const layers = Array.from({ length: 6 }, (_, i) => {
    const c = colors[i % colors.length];
    const size = 40 + i * 30;
    return makeLayer(i, [el(size), st(c, 2, 60)], {
      o: aOpacity(60, 20),
      p: { a: 0, k: [200, 150, 0] },
      s: aScale(40, 200),
      r: { a: 0, k: 0 },
    }, { st: -(i * 20) });
  });
  return wrap(layers);
}

function genSmoke(colors: C[]): object {
  const layers = Array.from({ length: 8 }, (_, i) => {
    const c = colors[i % colors.length];
    const x = 100 + (i * 40) % 200;
    return makeLayer(i, [el(60 + i * 10), fl(c, 15)], {
      o: aOpacity(5, 30),
      p: aPos(x, 250, x + (i % 2 ? 40 : -40), 80),
      s: aScale(60, 200),
      r: aRotate(60 * (i % 2 ? 1 : -1)),
    }, { st: -(i * 15) });
  });
  return wrap(layers);
}

function genConfetti(colors: C[]): object {
  const layers = Array.from({ length: 20 }, (_, i) => {
    const c = colors[i % colors.length];
    const x = (i * 67) % 380 + 10;
    return makeLayer(i, [rc(8, 5 + (i % 3) * 3, 1), fl(c, 80)], {
      o: aOpacity(0, 90),
      p: aPos(x, -20, x + (i % 3 - 1) * 40, 320),
      s: { a: 0, k: [100, 100, 100] },
      r: aRotate(720 * (i % 2 ? 1 : -1)),
    }, { st: -(i * 7) });
  });
  return wrap(layers);
}

function genGeometric(colors: C[]): object {
  const layers = Array.from({ length: 10 }, (_, i) => {
    const c = colors[i % colors.length];
    const x = 40 + (i * 80) % 360;
    const y = 40 + (i * 60) % 260;
    const shape = i % 3 === 0 ? rc(25, 25, 0) : i % 3 === 1 ? el(25) : rc(35, 15, 3);
    return makeLayer(i, [shape, i % 2 === 0 ? fl(c, 50) : st(c, 2, 70)], {
      o: { a: 0, k: 70 },
      p: { a: 0, k: [x, y, 0] },
      s: aScale(80, 120),
      r: aRotate(90 * (i % 2 ? 1 : -1)),
    }, { st: -(i * 12) });
  });
  return wrap(layers);
}

function genEqualizer(colors: C[]): object {
  const layers = Array.from({ length: 16 }, (_, i) => {
    const c = colors[i % colors.length];
    const x = 25 + i * 22;
    return makeLayer(i, [rc(12, 60, 4), fl(c, 75)], {
      o: { a: 0, k: 80 },
      p: { a: 0, k: [x, 250, 0] },
      s: { a: 1, k: [
        { t: 0, s: [100, 30 + (i * 17) % 40, 100], i: { x: [.4,.4,.4], y: [1,1,1] }, o: { x: [.6,.6,.6], y: [0,0,0] } },
        { t: 40 + (i * 7) % 30, s: [100, 100 + (i * 23) % 150, 100], i: { x: [.4,.4,.4], y: [1,1,1] }, o: { x: [.6,.6,.6], y: [0,0,0] } },
        { t: 90, s: [100, 40 + (i * 13) % 60, 100], i: { x: [.4,.4,.4], y: [1,1,1] }, o: { x: [.6,.6,.6], y: [0,0,0] } },
        { t: 150, s: [100, 30 + (i * 17) % 40, 100] },
      ]},
      r: { a: 0, k: 0 },
    }, { st: -(i * 3) });
  });
  return wrap(layers);
}

function genFireworks(colors: C[]): object {
  const layers: object[] = [];
  for (let burst = 0; burst < 3; burst++) {
    const cx = 80 + burst * 120;
    const cy = 80 + burst * 40;
    for (let j = 0; j < 8; j++) {
      const angle = (j / 8) * Math.PI * 2;
      const c = colors[(burst + j) % colors.length];
      const idx = burst * 8 + j;
      layers.push(makeLayer(idx, [el(5), fl(c, 85)], {
        o: aOpacity(0, 90),
        p: aPos(cx, cy, cx + Math.cos(angle) * 80, cy + Math.sin(angle) * 80),
        s: aScale(100, 40),
        r: { a: 0, k: 0 },
      }, { st: -(burst * 40) }));
    }
  }
  return wrap(layers);
}

function genLightning(colors: C[]): object {
  const layers = Array.from({ length: 6 }, (_, i) => {
    const c = colors[i % colors.length];
    const x = 60 + (i * 70) % 300;
    return makeLayer(i, [rc(3, 120 + i * 20, 0), fl(c, 80)], {
      o: { a: 1, k: [
        { t: 0, s: [0], i: { x: [.4], y: [1] }, o: { x: [.6], y: [0] } },
        { t: 5 + i * 2, s: [100], i: { x: [.4], y: [1] }, o: { x: [.6], y: [0] } },
        { t: 15 + i * 2, s: [0], i: { x: [.4], y: [1] }, o: { x: [.6], y: [0] } },
        { t: 150, s: [0] },
      ]},
      p: { a: 0, k: [x, 150, 0] },
      s: { a: 0, k: [100, 100, 100] },
      r: { a: 0, k: -5 + (i % 3) * 5 },
    }, { st: -(i * 25) });
  });
  return wrap(layers);
}

function genRain(colors: C[]): object {
  const layers = Array.from({ length: 24 }, (_, i) => {
    const c = colors[i % colors.length];
    const x = (i * 37) % 400;
    return makeLayer(i, [rc(2, 12 + (i % 4) * 3, 1), fl(c, 60)], {
      o: { a: 0, k: 50 + (i % 3) * 10 },
      p: aPos(x, -20, x - 15, 320),
      s: { a: 0, k: [100, 100, 100] },
      r: { a: 0, k: 10 },
    }, { st: -(i * 6) });
  });
  return wrap(layers);
}

function genSpiral(colors: C[]): object {
  const layers = Array.from({ length: 12 }, (_, i) => {
    const c = colors[i % colors.length];
    const angle = (i / 12) * Math.PI * 2;
    const r = 40 + i * 8;
    return makeLayer(i, [el(8 + (i % 3) * 3), fl(c, 70)], {
      o: aOpacity(30, 80),
      p: aPos(200 + Math.cos(angle) * r, 150 + Math.sin(angle) * r, 200 + Math.cos(angle + 2) * r, 150 + Math.sin(angle + 2) * r),
      s: aScale(60, 120),
      r: aRotate(360),
    }, { st: -(i * 10) });
  });
  return wrap(layers);
}

function genBubbles(colors: C[]): object {
  const layers = Array.from({ length: 14 }, (_, i) => {
    const c = colors[i % colors.length];
    const x = 30 + (i * 53) % 340;
    const size = 15 + (i % 5) * 8;
    return makeLayer(i, [el(size), st(c, 1.5, 50), fl(c, 15)], {
      o: aOpacity(0, 60),
      p: aPos(x, 300, x + (i % 2 ? 20 : -20), 20),
      s: aScale(50, 110),
      r: { a: 0, k: 0 },
    }, { st: -(i * 10) });
  });
  return wrap(layers);
}

function genGalaxy(colors: C[]): object {
  const layers = Array.from({ length: 20 }, (_, i) => {
    const c = colors[i % colors.length];
    const angle = (i / 20) * Math.PI * 4;
    const r = 20 + i * 6;
    const cx = 200 + Math.cos(angle) * r;
    const cy = 150 + Math.sin(angle) * r * 0.6;
    return makeLayer(i, [el(3 + (i % 3) * 2), fl(c, 70)], {
      o: aOpacity(20, 80),
      p: { a: 0, k: [cx, cy, 0] },
      s: aScale(50, 130),
      r: aRotate(360),
    }, { st: -(i * 7) });
  });
  // Add center glow
  layers.push(makeLayer(20, [el(50), fl(colors[0], 20)], {
    o: aOpacity(10, 30),
    p: { a: 0, k: [200, 150, 0] },
    s: aScale(80, 150),
    r: aRotate(-180),
  }));
  return wrap(layers);
}

function genPulse(colors: C[]): object {
  const layers = Array.from({ length: 5 }, (_, i) => {
    const c = colors[i % colors.length];
    return makeLayer(i, [el(30 + i * 15), st(c, 3, 60)], {
      o: { a: 1, k: [
        { t: 0, s: [70], i: { x: [.4], y: [1] }, o: { x: [.6], y: [0] } },
        { t: 15, s: [90], i: { x: [.4], y: [1] }, o: { x: [.6], y: [0] } },
        { t: 25, s: [40], i: { x: [.4], y: [1] }, o: { x: [.6], y: [0] } },
        { t: 35, s: [85], i: { x: [.4], y: [1] }, o: { x: [.6], y: [0] } },
        { t: 60, s: [30], i: { x: [.4], y: [1] }, o: { x: [.6], y: [0] } },
        { t: 150, s: [70] },
      ]},
      p: { a: 0, k: [200, 150, 0] },
      s: { a: 1, k: [
        { t: 0, s: [100, 100, 100], i: { x: [.4,.4,.4], y: [1,1,1] }, o: { x: [.6,.6,.6], y: [0,0,0] } },
        { t: 15, s: [130, 130, 100], i: { x: [.4,.4,.4], y: [1,1,1] }, o: { x: [.6,.6,.6], y: [0,0,0] } },
        { t: 25, s: [90, 90, 100], i: { x: [.4,.4,.4], y: [1,1,1] }, o: { x: [.6,.6,.6], y: [0,0,0] } },
        { t: 35, s: [125, 125, 100], i: { x: [.4,.4,.4], y: [1,1,1] }, o: { x: [.6,.6,.6], y: [0,0,0] } },
        { t: 60, s: [95, 95, 100], i: { x: [.4,.4,.4], y: [1,1,1] }, o: { x: [.6,.6,.6], y: [0,0,0] } },
        { t: 150, s: [100, 100, 100] },
      ]},
      r: { a: 0, k: 0 },
    }, { st: -(i * 8) });
  });
  return wrap(layers);
}

function genAurora(colors: C[]): object {
  const layers = Array.from({ length: 6 }, (_, i) => {
    const c = colors[i % colors.length];
    const x = 50 + i * 60;
    return makeLayer(i, [rc(80, 200, 20), fl(c, 18)], {
      o: aOpacity(10, 30),
      p: aPos(x, 150, x + 40, 130),
      s: { a: 1, k: [
        { t: 0, s: [100, 80, 100], i: { x: [.4,.4,.4], y: [1,1,1] }, o: { x: [.6,.6,.6], y: [0,0,0] } },
        { t: 75, s: [120, 120, 100], i: { x: [.4,.4,.4], y: [1,1,1] }, o: { x: [.6,.6,.6], y: [0,0,0] } },
        { t: 150, s: [100, 80, 100] },
      ]},
      r: aRotate(15 * (i % 2 ? 1 : -1)),
    }, { st: -(i * 20) });
  });
  return wrap(layers);
}

function genMatrix(colors: C[]): object {
  const layers = Array.from({ length: 20 }, (_, i) => {
    const c = colors[i % colors.length];
    const x = (i * 20) + 10;
    return makeLayer(i, [rc(4, 4, 1), fl(c, 80)], {
      o: aOpacity(0, 80),
      p: aPos(x, -10, x, 310),
      s: { a: 0, k: [100, 100, 100] },
      r: { a: 0, k: 0 },
    }, { st: -(i * 7) });
  });
  return wrap(layers);
}

function genDots(colors: C[]): object {
  const layers = Array.from({ length: 16 }, (_, i) => {
    const c = colors[i % colors.length];
    const x = 30 + (i * 47) % 340;
    const y = 30 + (i * 37) % 240;
    return makeLayer(i, [el(8), fl(c, 75)], {
      o: { a: 0, k: 70 },
      p: aPos(x, y, x + (i % 3 - 1) * 30, y + (i % 2 ? -25 : 25)),
      s: aScale(60, 140),
      r: { a: 0, k: 0 },
    }, { st: -(i * 8) });
  });
  return wrap(layers);
}

function genRings(colors: C[]): object {
  const layers = Array.from({ length: 8 }, (_, i) => {
    const c = colors[i % colors.length];
    return makeLayer(i, [el(20 + i * 10), st(c, 2, 60)], {
      o: aOpacity(70, 0),
      p: { a: 0, k: [200, 150, 0] },
      s: aScale(20, 300),
      r: { a: 0, k: 0 },
    }, { st: -(i * 18) });
  });
  return wrap(layers);
}

function genNoise(colors: C[]): object {
  const layers = Array.from({ length: 30 }, (_, i) => {
    const c = colors[i % colors.length];
    const x = (i * 43) % 400;
    const y = (i * 31) % 300;
    return makeLayer(i, [rc(3, 3, 0), fl(c, 40)], {
      o: { a: 1, k: [
        { t: 0, s: [0], i: { x: [.4], y: [1] }, o: { x: [.6], y: [0] } },
        { t: 3 + (i % 5), s: [60], i: { x: [.4], y: [1] }, o: { x: [.6], y: [0] } },
        { t: 8 + (i % 5), s: [0], i: { x: [.4], y: [1] }, o: { x: [.6], y: [0] } },
        { t: 150, s: [0] },
      ]},
      p: { a: 0, k: [x, y, 0] },
      s: { a: 0, k: [100, 100, 100] },
      r: { a: 0, k: 0 },
    }, { st: -(i * 5) });
  });
  return wrap(layers);
}

function genGlitch(colors: C[]): object {
  const layers = Array.from({ length: 8 }, (_, i) => {
    const c = colors[i % colors.length];
    const y = 30 + i * 35;
    return makeLayer(i, [rc(400, 6 + (i % 3) * 4, 0), fl(c, 50)], {
      o: { a: 1, k: [
        { t: 0, s: [0], i: { x: [.4], y: [1] }, o: { x: [.6], y: [0] } },
        { t: 2 + i, s: [80], i: { x: [.4], y: [1] }, o: { x: [.6], y: [0] } },
        { t: 6 + i, s: [0], i: { x: [.4], y: [1] }, o: { x: [.6], y: [0] } },
        { t: 150, s: [0] },
      ]},
      p: { a: 1, k: [
        { t: 0, s: [200, y, 0], i: { x: .4, y: 1 }, o: { x: .6, y: 0 } },
        { t: 3 + i, s: [200 + (i % 2 ? 30 : -30), y, 0], i: { x: .4, y: 1 }, o: { x: .6, y: 0 } },
        { t: 6 + i, s: [200, y, 0] },
      ]},
      s: { a: 0, k: [100, 100, 100] },
      r: { a: 0, k: 0 },
    }, { st: -(i * 18) });
  });
  return wrap(layers);
}

function genSnow(colors: C[]): object {
  const layers = Array.from({ length: 24 }, (_, i) => {
    const c = colors[i % colors.length];
    const x = (i * 37) % 400;
    const drift = (i % 2 ? 1 : -1) * (10 + i % 15);
    return makeLayer(i, [el(3 + (i % 4) * 2), fl(c, 60)], {
      o: aOpacity(0, 70),
      p: aPos(x, -10, x + drift, 310),
      s: { a: 0, k: [100, 100, 100] },
      r: { a: 0, k: 0 },
    }, { st: -(i * 6) });
  });
  return wrap(layers);
}

function genFire(colors: C[]): object {
  const layers = Array.from({ length: 16 }, (_, i) => {
    const c = colors[i % colors.length];
    const x = 120 + (i * 23) % 160;
    return makeLayer(i, [el(6 + (i % 4) * 3), fl(c, 70)], {
      o: aOpacity(80, 0),
      p: aPos(x, 280, x + (i % 3 - 1) * 20, 60),
      s: aScale(100, 30),
      r: { a: 0, k: 0 },
    }, { st: -(i * 8) });
  });
  return wrap(layers);
}

function genMusic(colors: C[]): object {
  const layers = Array.from({ length: 10 }, (_, i) => {
    const c = colors[i % colors.length];
    const x = 50 + (i * 80) % 350;
    // Music notes represented as small circles with stems (circle + rect)
    return makeLayer(i, [el(10), fl(c, 70)], {
      o: aOpacity(0, 80),
      p: aPos(x, 250, x + (i % 2 ? 30 : -30), 30),
      s: aScale(60, 100),
      r: aRotate((i % 2 ? 20 : -20)),
    }, { st: -(i * 14) });
  });
  return wrap(layers);
}

function genNeon(colors: C[]): object {
  const layers = Array.from({ length: 8 }, (_, i) => {
    const c = colors[i % colors.length];
    const size = 50 + i * 20;
    return makeLayer(i, [i % 2 === 0 ? el(size) : rc(size, size, 5), st(c, 3, 80)], {
      o: aOpacity(30, 80),
      p: { a: 0, k: [200, 150, 0] },
      s: aScale(80, 110),
      r: aRotate(45 * (i % 2 ? 1 : -1)),
    }, { st: -(i * 15) });
  });
  return wrap(layers);
}

function genHexagon(colors: C[]): object {
  // Approximate hexagons with rotated rectangles in a grid
  const layers: object[] = [];
  let idx = 0;
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 5; col++) {
      const c = colors[idx % colors.length];
      const x = col * 80 + (row % 2) * 40 + 40;
      const y = row * 75 + 40;
      layers.push(makeLayer(idx, [el(30), st(c, 1.5, 50)], {
        o: aOpacity(20, 60),
        p: { a: 0, k: [x, y, 0] },
        s: aScale(80, 110),
        r: { a: 0, k: 30 },
      }, { st: -(idx * 6) }));
      idx++;
    }
  }
  return wrap(layers);
}

function genWaveLines(colors: C[]): object {
  const layers = Array.from({ length: 8 }, (_, i) => {
    const c = colors[i % colors.length];
    const y = 50 + i * 30;
    return makeLayer(i, [rc(380, 2, 1), st(c, 1.5, 60)], {
      o: { a: 0, k: 50 },
      p: { a: 1, k: [
        { t: 0, s: [200, y, 0], i: { x: .4, y: 1 }, o: { x: .6, y: 0 } },
        { t: 50, s: [200, y - 15, 0], i: { x: .4, y: 1 }, o: { x: .6, y: 0 } },
        { t: 100, s: [200, y + 15, 0], i: { x: .4, y: 1 }, o: { x: .6, y: 0 } },
        { t: 150, s: [200, y, 0] },
      ]},
      s: { a: 0, k: [100, 100, 100] },
      r: { a: 0, k: 0 },
    }, { st: -(i * 10) });
  });
  return wrap(layers);
}

function genBokeh(colors: C[]): object {
  const layers = Array.from({ length: 12 }, (_, i) => {
    const c = colors[i % colors.length];
    const x = 30 + (i * 67) % 340;
    const y = 30 + (i * 47) % 240;
    const size = 20 + (i % 4) * 15;
    return makeLayer(i, [el(size), fl(c, 18)], {
      o: aOpacity(10, 35),
      p: aPos(x, y, x + (i % 2 ? 15 : -15), y + (i % 3 ? -10 : 10)),
      s: aScale(70, 130),
      r: { a: 0, k: 0 },
    }, { st: -(i * 10) });
  });
  return wrap(layers);
}

// ======= REGISTRY =======

const BG_COLORS: Record<string, C[]> = {
  "particles-1": [[0.9, 0.3, 1], [0.6, 0.2, 0.9]],
  "wave-1": [[0, 0.7, 1], [0, 0.4, 0.8]],
  "gradient-1": [[1, 0.4, 0.7], [0.5, 0.2, 1]],
  "stars-1": [[1, 1, 0.6], [0.8, 0.8, 1]],
  "circles-1": [[0, 1, 0.8], [0.2, 0.6, 1]],
  "smoke-1": [[0.6, 0.6, 0.7], [0.3, 0.3, 0.4]],
  "confetti-1": [[1, 0.2, 0.3], [1, 0.8, 0], [0.2, 0.8, 1], [0.2, 1, 0.4]],
  "geometric-1": [[1, 0.5, 0], [1, 0.8, 0.2]],
  "equalizer-1": [[0, 1, 0.5], [0, 0.8, 0.3]],
  "fireworks-1": [[1, 0.8, 0], [1, 0.3, 0.1], [1, 1, 0.5]],
  "lightning-1": [[0.7, 0.8, 1], [1, 1, 1]],
  "rain-1": [[0.3, 0.5, 0.9], [0.5, 0.7, 1]],
  "spiral-1": [[0.8, 0.2, 1], [0.4, 0, 0.8]],
  "bubbles-1": [[0.3, 0.8, 1], [0.6, 0.9, 1]],
  "galaxy-1": [[0.5, 0, 1], [0.8, 0.3, 1], [0.2, 0.2, 0.8]],
  "pulse-1": [[1, 0.1, 0.3], [1, 0.3, 0.4]],
  "aurora-1": [[0, 1, 0.5], [0.2, 0.5, 1], [0.5, 0, 1]],
  "matrix-1": [[0, 1, 0.2], [0, 0.7, 0.1]],
  "dots-1": [[1, 0.6, 0], [1, 0.9, 0.3]],
  "rings-1": [[0.3, 0.6, 1], [0.5, 0.8, 1]],
  "noise-1": [[0.5, 0.5, 0.5], [0.7, 0.7, 0.7]],
  "glitch-bg-1": [[1, 0, 0.5], [0, 1, 1]],
  "snow-1": [[0.8, 0.9, 1], [1, 1, 1]],
  "fire-1": [[1, 0.4, 0], [1, 0.7, 0.1], [1, 0.2, 0]],
  "music-1": [[1, 0.3, 0.6], [0.8, 0.2, 1]],
  "neon-1": [[0, 1, 1], [1, 0, 1]],
  "hexagon-1": [[0.2, 0.8, 0.6], [0.4, 1, 0.8]],
  "wave-lines-1": [[0.4, 0.6, 1], [0.6, 0.8, 1]],
  "bokeh-1": [[1, 0.8, 0.4], [0.4, 0.7, 1], [1, 0.4, 0.6]],
};

const GENERATORS: Record<string, (c: C[]) => object> = {
  "particles-1": genParticles,
  "wave-1": genWave,
  "gradient-1": genBlob,
  "stars-1": genStars,
  "circles-1": genCircles,
  "smoke-1": genSmoke,
  "confetti-1": genConfetti,
  "geometric-1": genGeometric,
  "equalizer-1": genEqualizer,
  "fireworks-1": genFireworks,
  "lightning-1": genLightning,
  "rain-1": genRain,
  "spiral-1": genSpiral,
  "bubbles-1": genBubbles,
  "galaxy-1": genGalaxy,
  "pulse-1": genPulse,
  "aurora-1": genAurora,
  "matrix-1": genMatrix,
  "dots-1": genDots,
  "rings-1": genRings,
  "noise-1": genNoise,
  "glitch-bg-1": genGlitch,
  "snow-1": genSnow,
  "fire-1": genFire,
  "music-1": genMusic,
  "neon-1": genNeon,
  "hexagon-1": genHexagon,
  "wave-lines-1": genWaveLines,
  "bokeh-1": genBokeh,
};

// Cache generated data
const lottieCache = new Map<string, object>();

function getLottieData(id: string): object | null {
  if (id === "none") return null;
  if (lottieCache.has(id)) return lottieCache.get(id)!;
  const gen = GENERATORS[id];
  const colors = BG_COLORS[id] || [[1, 1, 1]];
  if (gen) {
    const data = gen(colors);
    lottieCache.set(id, data);
    return data;
  }
  return null;
}

// ======= COMPONENTS =======

interface LottieBackgroundPickerProps {
  selectedId: string;
  onSelect: (id: string) => void;
}

function LottieThumb({ option, isSelected, onSelect }: { option: LottieOption; isSelected: boolean; onSelect: () => void }) {
  const animData = option.id === "none" ? null : getLottieData(option.id);

  return (
    <button
      onClick={onSelect}
      className={`relative rounded-md overflow-hidden border-2 transition-all aspect-video flex items-center justify-center ${
        isSelected
          ? "border-primary ring-2 ring-primary/30"
          : "border-border hover:border-muted-foreground/50"
      }`}
      style={{ backgroundColor: "hsl(0, 0%, 4%)" }}
    >
      {option.id === "none" ? (
        <X className="w-5 h-5 text-muted-foreground" />
      ) : animData ? (
        <Lottie animationData={animData} loop autoplay style={{ width: "100%", height: "100%", opacity: 0.8 }} />
      ) : null}

      {isSelected && (
        <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
          <Check className="w-3 h-3 text-primary-foreground" />
        </div>
      )}

      <span className="absolute bottom-0 inset-x-0 bg-background/80 text-[10px] text-muted-foreground px-1 py-0.5 truncate text-center">
        {option.name}
      </span>
    </button>
  );
}

export function LottieBackgroundPicker({ selectedId, onSelect }: LottieBackgroundPickerProps) {
  return (
    <ScrollArea className="h-[400px] pr-2">
      <div className="grid grid-cols-2 gap-2">
        {LOTTIE_BACKGROUNDS.map((opt) => (
          <LottieThumb
            key={opt.id}
            option={opt}
            isSelected={selectedId === opt.id}
            onSelect={() => onSelect(opt.id)}
          />
        ))}
      </div>
    </ScrollArea>
  );
}

// Hook to get Lottie data for the preview
export function useLottieBackground(selectedId: string) {
  const [animData, setAnimData] = useState<object | null>(null);

  useEffect(() => {
    setAnimData(getLottieData(selectedId));
  }, [selectedId]);

  return animData;
}
