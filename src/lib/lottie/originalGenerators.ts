import { C, makeLayer, wrap, el, rc, fl, stk, aPos, aScale, aOpacity, aRotate } from "./helpers";

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

function g(id: string, fn: (c: C[]) => object): () => object {
  return () => fn(BG_COLORS[id] || [[1,1,1]]);
}

function genParticles(c: C[]) {
  const layers = Array.from({ length: 16 }, (_, i) => {
    const col = c[i % c.length]; const x = 25 + (i * 137) % 350; const y = 20 + (i * 97) % 260;
    return makeLayer(i, [el(6 + (i % 5) * 2), fl(col, 50 + (i % 4) * 10)], { o: aOpacity(0, 70), p: aPos(x, y, x + (i % 2 ? 30 : -30), y - 40), s: aScale(50, 120), r: { a: 0, k: 0 } }, { st: -(i * 9) });
  });
  return wrap(layers);
}

function genWave(c: C[]) {
  const layers = Array.from({ length: 20 }, (_, i) => {
    const col = c[i % c.length]; const x = i * 20 + 10;
    return makeLayer(i, [rc(8, 30 + Math.sin(i * 0.8) * 20, 3), fl(col, 70)], {
      o: { a: 0, k: 70 }, p: { a: 0, k: [x, 150, 0] },
      s: { a: 1, k: [{ t: 0, s: [100, 60, 100], i: { x: [.4,.4,.4], y: [1,1,1] }, o: { x: [.6,.6,.6], y: [0,0,0] } }, { t: 75, s: [100, 180 + (i % 5) * 30, 100], i: { x: [.4,.4,.4], y: [1,1,1] }, o: { x: [.6,.6,.6], y: [0,0,0] } }, { t: 150, s: [100, 60, 100] }] },
      r: { a: 0, k: 0 },
    }, { st: -(i * 5) });
  });
  return wrap(layers);
}

function genBlob(c: C[]) {
  const layers = Array.from({ length: 5 }, (_, i) => {
    const col = c[i % c.length];
    return makeLayer(i, [el(80 + i * 20), fl(col, 25)], { o: aOpacity(20, 50), p: aPos(150 + i * 30, 120 + i * 20, 200 + i * 20, 160 - i * 10), s: aScale(80, 140), r: aRotate(120 * (i % 2 ? 1 : -1)) }, { st: -(i * 20) });
  });
  return wrap(layers);
}

function genStars(c: C[]) {
  const layers = Array.from({ length: 30 }, (_, i) => {
    const col = c[i % c.length]; const x = (i * 53) % 400; const y = (i * 41) % 300;
    return makeLayer(i, [el(2 + (i % 4)), fl(col, 90)], { o: aOpacity(10, 90), p: { a: 0, k: [x, y, 0] }, s: aScale(30, 130), r: { a: 0, k: 0 } }, { st: -(i * 5) });
  });
  return wrap(layers);
}

function genCircles(c: C[]) {
  const layers = Array.from({ length: 6 }, (_, i) => {
    const col = c[i % c.length];
    return makeLayer(i, [el(40 + i * 30), stk(col, 2, 60)], { o: aOpacity(60, 20), p: { a: 0, k: [200, 150, 0] }, s: aScale(40, 200), r: { a: 0, k: 0 } }, { st: -(i * 20) });
  });
  return wrap(layers);
}

function genSmoke(c: C[]) {
  const layers = Array.from({ length: 8 }, (_, i) => {
    const col = c[i % c.length]; const x = 100 + (i * 40) % 200;
    return makeLayer(i, [el(60 + i * 10), fl(col, 15)], { o: aOpacity(5, 30), p: aPos(x, 250, x + (i % 2 ? 40 : -40), 80), s: aScale(60, 200), r: aRotate(60 * (i % 2 ? 1 : -1)) }, { st: -(i * 15) });
  });
  return wrap(layers);
}

function genConfetti(c: C[]) {
  const layers = Array.from({ length: 20 }, (_, i) => {
    const col = c[i % c.length]; const x = (i * 67) % 380 + 10;
    return makeLayer(i, [rc(8, 5 + (i % 3) * 3, 1), fl(col, 80)], { o: aOpacity(0, 90), p: aPos(x, -20, x + (i % 3 - 1) * 40, 320), s: { a: 0, k: [100, 100, 100] }, r: aRotate(720 * (i % 2 ? 1 : -1)) }, { st: -(i * 7) });
  });
  return wrap(layers);
}

function genGeometric(c: C[]) {
  const layers = Array.from({ length: 10 }, (_, i) => {
    const col = c[i % c.length]; const x = 40 + (i * 80) % 360; const y = 40 + (i * 60) % 260;
    const shape = i % 3 === 0 ? rc(25, 25, 0) : i % 3 === 1 ? el(25) : rc(35, 15, 3);
    return makeLayer(i, [shape, i % 2 === 0 ? fl(col, 50) : stk(col, 2, 70)], { o: { a: 0, k: 70 }, p: { a: 0, k: [x, y, 0] }, s: aScale(80, 120), r: aRotate(90 * (i % 2 ? 1 : -1)) }, { st: -(i * 12) });
  });
  return wrap(layers);
}

function genEqualizer(c: C[]) {
  const layers = Array.from({ length: 16 }, (_, i) => {
    const col = c[i % c.length]; const x = 25 + i * 22;
    return makeLayer(i, [rc(12, 60, 4), fl(col, 75)], {
      o: { a: 0, k: 80 }, p: { a: 0, k: [x, 250, 0] },
      s: { a: 1, k: [{ t: 0, s: [100, 30 + (i * 17) % 40, 100], i: { x: [.4,.4,.4], y: [1,1,1] }, o: { x: [.6,.6,.6], y: [0,0,0] } }, { t: 40 + (i * 7) % 30, s: [100, 100 + (i * 23) % 150, 100], i: { x: [.4,.4,.4], y: [1,1,1] }, o: { x: [.6,.6,.6], y: [0,0,0] } }, { t: 90, s: [100, 40 + (i * 13) % 60, 100], i: { x: [.4,.4,.4], y: [1,1,1] }, o: { x: [.6,.6,.6], y: [0,0,0] } }, { t: 150, s: [100, 30 + (i * 17) % 40, 100] }] },
      r: { a: 0, k: 0 },
    }, { st: -(i * 3) });
  });
  return wrap(layers);
}

function genFireworks(c: C[]) {
  const layers: object[] = [];
  for (let burst = 0; burst < 3; burst++) {
    const cx = 80 + burst * 120; const cy = 80 + burst * 40;
    for (let j = 0; j < 8; j++) {
      const angle = (j / 8) * Math.PI * 2; const col = c[(burst + j) % c.length]; const idx = burst * 8 + j;
      layers.push(makeLayer(idx, [el(5), fl(col, 85)], { o: aOpacity(0, 90), p: aPos(cx, cy, cx + Math.cos(angle) * 80, cy + Math.sin(angle) * 80), s: aScale(100, 40), r: { a: 0, k: 0 } }, { st: -(burst * 40) }));
    }
  }
  return wrap(layers);
}

function genLightning(c: C[]) {
  const layers = Array.from({ length: 6 }, (_, i) => {
    const col = c[i % c.length]; const x = 60 + (i * 70) % 300;
    return makeLayer(i, [rc(3, 120 + i * 20, 0), fl(col, 80)], {
      o: { a: 1, k: [{ t: 0, s: [0], i: { x: [.4], y: [1] }, o: { x: [.6], y: [0] } }, { t: 5 + i * 2, s: [100], i: { x: [.4], y: [1] }, o: { x: [.6], y: [0] } }, { t: 15 + i * 2, s: [0], i: { x: [.4], y: [1] }, o: { x: [.6], y: [0] } }, { t: 150, s: [0] }] },
      p: { a: 0, k: [x, 150, 0] }, s: { a: 0, k: [100, 100, 100] }, r: { a: 0, k: -5 + (i % 3) * 5 },
    }, { st: -(i * 25) });
  });
  return wrap(layers);
}

function genRain(c: C[]) {
  const layers = Array.from({ length: 24 }, (_, i) => {
    const col = c[i % c.length]; const x = (i * 37) % 400;
    return makeLayer(i, [rc(2, 12 + (i % 4) * 3, 1), fl(col, 60)], { o: { a: 0, k: 50 + (i % 3) * 10 }, p: aPos(x, -20, x - 15, 320), s: { a: 0, k: [100, 100, 100] }, r: { a: 0, k: 10 } }, { st: -(i * 6) });
  });
  return wrap(layers);
}

function genSpiral(c: C[]) {
  const layers = Array.from({ length: 12 }, (_, i) => {
    const col = c[i % c.length]; const angle = (i / 12) * Math.PI * 2; const r = 40 + i * 8;
    return makeLayer(i, [el(8 + (i % 3) * 3), fl(col, 70)], { o: aOpacity(30, 80), p: aPos(200 + Math.cos(angle) * r, 150 + Math.sin(angle) * r, 200 + Math.cos(angle + 2) * r, 150 + Math.sin(angle + 2) * r), s: aScale(60, 120), r: aRotate(360) }, { st: -(i * 10) });
  });
  return wrap(layers);
}

function genBubbles(c: C[]) {
  const layers = Array.from({ length: 14 }, (_, i) => {
    const col = c[i % c.length]; const x = 30 + (i * 53) % 340;
    return makeLayer(i, [el(15 + (i % 5) * 8), stk(col, 1.5, 50), fl(col, 15)], { o: aOpacity(0, 60), p: aPos(x, 300, x + (i % 2 ? 20 : -20), 20), s: aScale(50, 110), r: { a: 0, k: 0 } }, { st: -(i * 10) });
  });
  return wrap(layers);
}

function genGalaxy(c: C[]) {
  const layers = Array.from({ length: 20 }, (_, i) => {
    const col = c[i % c.length]; const angle = (i / 20) * Math.PI * 4; const r = 20 + i * 6;
    return makeLayer(i, [el(3 + (i % 3) * 2), fl(col, 70)], { o: aOpacity(20, 80), p: { a: 0, k: [200 + Math.cos(angle) * r, 150 + Math.sin(angle) * r * 0.6, 0] }, s: aScale(50, 130), r: aRotate(360) }, { st: -(i * 7) });
  });
  layers.push(makeLayer(20, [el(50), fl(c[0], 20)], { o: aOpacity(10, 30), p: { a: 0, k: [200, 150, 0] }, s: aScale(80, 150), r: aRotate(-180) }));
  return wrap(layers);
}

function genPulse(c: C[]) {
  const layers = Array.from({ length: 5 }, (_, i) => {
    const col = c[i % c.length];
    return makeLayer(i, [el(30 + i * 15), stk(col, 3, 60)], {
      o: { a: 1, k: [{ t: 0, s: [70], i: { x: [.4], y: [1] }, o: { x: [.6], y: [0] } }, { t: 15, s: [90], i: { x: [.4], y: [1] }, o: { x: [.6], y: [0] } }, { t: 25, s: [40], i: { x: [.4], y: [1] }, o: { x: [.6], y: [0] } }, { t: 35, s: [85], i: { x: [.4], y: [1] }, o: { x: [.6], y: [0] } }, { t: 60, s: [30], i: { x: [.4], y: [1] }, o: { x: [.6], y: [0] } }, { t: 150, s: [70] }] },
      p: { a: 0, k: [200, 150, 0] },
      s: { a: 1, k: [{ t: 0, s: [100, 100, 100], i: { x: [.4,.4,.4], y: [1,1,1] }, o: { x: [.6,.6,.6], y: [0,0,0] } }, { t: 15, s: [130, 130, 100], i: { x: [.4,.4,.4], y: [1,1,1] }, o: { x: [.6,.6,.6], y: [0,0,0] } }, { t: 25, s: [90, 90, 100], i: { x: [.4,.4,.4], y: [1,1,1] }, o: { x: [.6,.6,.6], y: [0,0,0] } }, { t: 35, s: [125, 125, 100], i: { x: [.4,.4,.4], y: [1,1,1] }, o: { x: [.6,.6,.6], y: [0,0,0] } }, { t: 60, s: [95, 95, 100], i: { x: [.4,.4,.4], y: [1,1,1] }, o: { x: [.6,.6,.6], y: [0,0,0] } }, { t: 150, s: [100, 100, 100] }] },
      r: { a: 0, k: 0 },
    }, { st: -(i * 8) });
  });
  return wrap(layers);
}

function genAurora(c: C[]) {
  const layers = Array.from({ length: 6 }, (_, i) => {
    const col = c[i % c.length]; const x = 50 + i * 60;
    return makeLayer(i, [rc(80, 200, 20), fl(col, 18)], {
      o: aOpacity(10, 30), p: aPos(x, 150, x + 40, 130),
      s: { a: 1, k: [{ t: 0, s: [100, 80, 100], i: { x: [.4,.4,.4], y: [1,1,1] }, o: { x: [.6,.6,.6], y: [0,0,0] } }, { t: 75, s: [120, 120, 100], i: { x: [.4,.4,.4], y: [1,1,1] }, o: { x: [.6,.6,.6], y: [0,0,0] } }, { t: 150, s: [100, 80, 100] }] },
      r: aRotate(15 * (i % 2 ? 1 : -1)),
    }, { st: -(i * 20) });
  });
  return wrap(layers);
}

function genMatrix(c: C[]) {
  const layers = Array.from({ length: 20 }, (_, i) => {
    const col = c[i % c.length]; const x = (i * 20) + 10;
    return makeLayer(i, [rc(4, 4, 1), fl(col, 80)], { o: aOpacity(0, 80), p: aPos(x, -10, x, 310), s: { a: 0, k: [100, 100, 100] }, r: { a: 0, k: 0 } }, { st: -(i * 7) });
  });
  return wrap(layers);
}

function genDots(c: C[]) {
  const layers = Array.from({ length: 16 }, (_, i) => {
    const col = c[i % c.length]; const x = 30 + (i * 47) % 340; const y = 30 + (i * 37) % 240;
    return makeLayer(i, [el(8), fl(col, 75)], { o: { a: 0, k: 70 }, p: aPos(x, y, x + (i % 3 - 1) * 30, y + (i % 2 ? -25 : 25)), s: aScale(60, 140), r: { a: 0, k: 0 } }, { st: -(i * 8) });
  });
  return wrap(layers);
}

function genRings(c: C[]) {
  const layers = Array.from({ length: 8 }, (_, i) => {
    const col = c[i % c.length];
    return makeLayer(i, [el(20 + i * 10), stk(col, 2, 60)], { o: aOpacity(70, 0), p: { a: 0, k: [200, 150, 0] }, s: aScale(20, 300), r: { a: 0, k: 0 } }, { st: -(i * 18) });
  });
  return wrap(layers);
}

function genNoise(c: C[]) {
  const layers = Array.from({ length: 30 }, (_, i) => {
    const col = c[i % c.length]; const x = (i * 43) % 400; const y = (i * 31) % 300;
    return makeLayer(i, [rc(3, 3, 0), fl(col, 40)], {
      o: { a: 1, k: [{ t: 0, s: [0], i: { x: [.4], y: [1] }, o: { x: [.6], y: [0] } }, { t: 3 + (i % 5), s: [60], i: { x: [.4], y: [1] }, o: { x: [.6], y: [0] } }, { t: 8 + (i % 5), s: [0], i: { x: [.4], y: [1] }, o: { x: [.6], y: [0] } }, { t: 150, s: [0] }] },
      p: { a: 0, k: [x, y, 0] }, s: { a: 0, k: [100, 100, 100] }, r: { a: 0, k: 0 },
    }, { st: -(i * 5) });
  });
  return wrap(layers);
}

function genGlitch(c: C[]) {
  const layers = Array.from({ length: 8 }, (_, i) => {
    const col = c[i % c.length]; const y = 30 + i * 35;
    return makeLayer(i, [rc(400, 6 + (i % 3) * 4, 0), fl(col, 50)], {
      o: { a: 1, k: [{ t: 0, s: [0], i: { x: [.4], y: [1] }, o: { x: [.6], y: [0] } }, { t: 2 + i, s: [80], i: { x: [.4], y: [1] }, o: { x: [.6], y: [0] } }, { t: 6 + i, s: [0], i: { x: [.4], y: [1] }, o: { x: [.6], y: [0] } }, { t: 150, s: [0] }] },
      p: { a: 1, k: [{ t: 0, s: [200, y, 0], i: { x: .4, y: 1 }, o: { x: .6, y: 0 } }, { t: 3 + i, s: [200 + (i % 2 ? 30 : -30), y, 0], i: { x: .4, y: 1 }, o: { x: .6, y: 0 } }, { t: 6 + i, s: [200, y, 0] }] },
      s: { a: 0, k: [100, 100, 100] }, r: { a: 0, k: 0 },
    }, { st: -(i * 18) });
  });
  return wrap(layers);
}

function genSnow(c: C[]) {
  const layers = Array.from({ length: 24 }, (_, i) => {
    const col = c[i % c.length]; const x = (i * 37) % 400; const drift = (i % 2 ? 1 : -1) * (10 + i % 15);
    return makeLayer(i, [el(3 + (i % 4) * 2), fl(col, 60)], { o: aOpacity(0, 70), p: aPos(x, -10, x + drift, 310), s: { a: 0, k: [100, 100, 100] }, r: { a: 0, k: 0 } }, { st: -(i * 6) });
  });
  return wrap(layers);
}

function genFire(c: C[]) {
  const layers = Array.from({ length: 16 }, (_, i) => {
    const col = c[i % c.length]; const x = 120 + (i * 23) % 160;
    return makeLayer(i, [el(6 + (i % 4) * 3), fl(col, 70)], { o: aOpacity(80, 0), p: aPos(x, 280, x + (i % 3 - 1) * 20, 60), s: aScale(100, 30), r: { a: 0, k: 0 } }, { st: -(i * 8) });
  });
  return wrap(layers);
}

function genMusic(c: C[]) {
  const layers = Array.from({ length: 10 }, (_, i) => {
    const col = c[i % c.length]; const x = 50 + (i * 80) % 350;
    return makeLayer(i, [el(10), fl(col, 70)], { o: aOpacity(0, 80), p: aPos(x, 250, x + (i % 2 ? 30 : -30), 30), s: aScale(60, 100), r: aRotate(i % 2 ? 20 : -20) }, { st: -(i * 14) });
  });
  return wrap(layers);
}

function genNeon(c: C[]) {
  const layers = Array.from({ length: 8 }, (_, i) => {
    const col = c[i % c.length]; const size = 50 + i * 20;
    return makeLayer(i, [i % 2 === 0 ? el(size) : rc(size, size, 5), stk(col, 3, 80)], { o: aOpacity(30, 80), p: { a: 0, k: [200, 150, 0] }, s: aScale(80, 110), r: aRotate(45 * (i % 2 ? 1 : -1)) }, { st: -(i * 15) });
  });
  return wrap(layers);
}

function genHexagon(c: C[]) {
  const layers: object[] = []; let idx = 0;
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 5; col++) {
      const clr = c[idx % c.length]; const x = col * 80 + (row % 2) * 40 + 40; const y = row * 75 + 40;
      layers.push(makeLayer(idx, [el(30), stk(clr, 1.5, 50)], { o: aOpacity(20, 60), p: { a: 0, k: [x, y, 0] }, s: aScale(80, 110), r: { a: 0, k: 30 } }, { st: -(idx * 6) }));
      idx++;
    }
  }
  return wrap(layers);
}

function genWaveLines(c: C[]) {
  const layers = Array.from({ length: 8 }, (_, i) => {
    const col = c[i % c.length]; const y = 50 + i * 30;
    return makeLayer(i, [rc(380, 2, 1), stk(col, 1.5, 60)], {
      o: { a: 0, k: 50 },
      p: { a: 1, k: [{ t: 0, s: [200, y, 0], i: { x: .4, y: 1 }, o: { x: .6, y: 0 } }, { t: 50, s: [200, y - 15, 0], i: { x: .4, y: 1 }, o: { x: .6, y: 0 } }, { t: 100, s: [200, y + 15, 0], i: { x: .4, y: 1 }, o: { x: .6, y: 0 } }, { t: 150, s: [200, y, 0] }] },
      s: { a: 0, k: [100, 100, 100] }, r: { a: 0, k: 0 },
    }, { st: -(i * 10) });
  });
  return wrap(layers);
}

function genBokeh(c: C[]) {
  const layers = Array.from({ length: 12 }, (_, i) => {
    const col = c[i % c.length]; const x = 30 + (i * 67) % 340; const y = 30 + (i * 47) % 240;
    return makeLayer(i, [el(20 + (i % 4) * 15), fl(col, 18)], { o: aOpacity(10, 35), p: aPos(x, y, x + (i % 2 ? 15 : -15), y + (i % 3 ? -10 : 10)), s: aScale(70, 130), r: { a: 0, k: 0 } }, { st: -(i * 10) });
  });
  return wrap(layers);
}

export function genOriginalBackgrounds(): Record<string, () => object> {
  return {
    "particles-1": g("particles-1", genParticles),
    "wave-1": g("wave-1", genWave),
    "gradient-1": g("gradient-1", genBlob),
    "stars-1": g("stars-1", genStars),
    "circles-1": g("circles-1", genCircles),
    "smoke-1": g("smoke-1", genSmoke),
    "confetti-1": g("confetti-1", genConfetti),
    "geometric-1": g("geometric-1", genGeometric),
    "equalizer-1": g("equalizer-1", genEqualizer),
    "fireworks-1": g("fireworks-1", genFireworks),
    "lightning-1": g("lightning-1", genLightning),
    "rain-1": g("rain-1", genRain),
    "spiral-1": g("spiral-1", genSpiral),
    "bubbles-1": g("bubbles-1", genBubbles),
    "galaxy-1": g("galaxy-1", genGalaxy),
    "pulse-1": g("pulse-1", genPulse),
    "aurora-1": g("aurora-1", genAurora),
    "matrix-1": g("matrix-1", genMatrix),
    "dots-1": g("dots-1", genDots),
    "rings-1": g("rings-1", genRings),
    "noise-1": g("noise-1", genNoise),
    "glitch-bg-1": g("glitch-bg-1", genGlitch),
    "snow-1": g("snow-1", genSnow),
    "fire-1": g("fire-1", genFire),
    "music-1": g("music-1", genMusic),
    "neon-1": g("neon-1", genNeon),
    "hexagon-1": g("hexagon-1", genHexagon),
    "wave-lines-1": g("wave-lines-1", genWaveLines),
    "bokeh-1": g("bokeh-1", genBokeh),
  };
}
