import { C, makeLayer, wrap, el, rc, fl, stk, aPos, aScale, aOpacity, aRotate, aPosOneWay } from "./helpers";

// ====== ROCKETS — triangle nose + rect body flying upward with exhaust ======
function genRockets(): object {
  const c: C[] = [[1, 0.3, 0.1], [1, 0.6, 0], [1, 0.9, 0.2]];
  const layers: object[] = [];
  for (let i = 0; i < 8; i++) {
    const col = c[i % c.length];
    const x = 30 + (i * 97) % 360;
    // Rocket body
    layers.push(makeLayer(i * 3, [rc(10, 28, 4), fl(col, 90)], {
      o: aOpacity(0, 90),
      p: aPosOneWay(x, 320, x - 20, -40),
      s: { a: 0, k: [100, 100, 100] },
      r: { a: 0, k: -15 + (i % 3) * 10 },
    }, { st: -(i * 18) }));
    // Rocket nose
    layers.push(makeLayer(i * 3 + 1, [rc(10, 10, 0), fl([1, 1, 1], 90)], {
      o: aOpacity(0, 80),
      p: aPosOneWay(x, 306, x - 20, -54),
      s: { a: 0, k: [80, 80, 100] },
      r: { a: 0, k: 30 + (i % 3) * 10 },
    }, { st: -(i * 18) }));
    // Exhaust flame
    layers.push(makeLayer(i * 3 + 2, [el(8), fl([1, 0.8, 0], 70)], {
      o: aOpacity(80, 0),
      p: aPosOneWay(x, 338, x - 20, -22),
      s: aScale(120, 40),
      r: { a: 0, k: 0 },
    }, { st: -(i * 18) }));
  }
  return wrap(layers);
}

// ====== COUNTER BLOCKS — numbers simulated as rising/falling blocks ======
function genCounter(): object {
  const c: C[] = [[0, 0.8, 1], [0.2, 1, 0.6], [1, 1, 0]];
  const layers: object[] = [];
  for (let i = 0; i < 12; i++) {
    const col = c[i % c.length];
    const x = 30 + (i * 33);
    // Block that grows from bottom like a bar chart counter
    layers.push(makeLayer(i, [rc(22, 18, 3), fl(col, 85)], {
      o: { a: 0, k: 85 },
      p: { a: 0, k: [x, 260, 0] },
      s: { a: 1, k: [
        { t: 0, s: [100, 20, 100], i: { x: [.4,.4,.4], y: [1,1,1] }, o: { x: [.6,.6,.6], y: [0,0,0] } },
        { t: 20 + i * 8, s: [100, 100 + (i * 37) % 300, 100], i: { x: [.4,.4,.4], y: [1,1,1] }, o: { x: [.6,.6,.6], y: [0,0,0] } },
        { t: 80 + i * 3, s: [100, 60 + (i * 19) % 150, 100], i: { x: [.4,.4,.4], y: [1,1,1] }, o: { x: [.6,.6,.6], y: [0,0,0] } },
        { t: 150, s: [100, 20, 100] },
      ]},
      r: { a: 0, k: 0 },
    }, { st: -(i * 4) }));
  }
  // Horizontal scan line
  layers.push(makeLayer(12, [rc(400, 2, 0), fl([1, 1, 1], 40)], {
    o: aOpacity(20, 60),
    p: aPos(200, 280, 200, 40),
    s: { a: 0, k: [100, 100, 100] },
    r: { a: 0, k: 0 },
  }));
  return wrap(layers);
}

// ====== ARROWS — upward-pointing arrows rising ======
function genArrows(): object {
  const c: C[] = [[0, 1, 0.5], [0.3, 1, 0.8], [0, 0.7, 0.3]];
  const layers: object[] = [];
  for (let i = 0; i < 10; i++) {
    const col = c[i % c.length];
    const x = 20 + (i * 79) % 370;
    // Arrow shaft
    layers.push(makeLayer(i * 2, [rc(4, 30, 2), fl(col, 80)], {
      o: aOpacity(0, 85),
      p: aPosOneWay(x, 320, x, -30),
      s: { a: 0, k: [100, 100, 100] },
      r: { a: 0, k: 0 },
    }, { st: -(i * 14) }));
    // Arrow head (diamond rotated)
    layers.push(makeLayer(i * 2 + 1, [rc(14, 14, 0), fl(col, 90)], {
      o: aOpacity(0, 90),
      p: aPosOneWay(x, 304, x, -46),
      s: { a: 0, k: [100, 100, 100] },
      r: { a: 0, k: 45 },
    }, { st: -(i * 14) }));
  }
  return wrap(layers);
}

// ====== DIAMONDS — spinning diamond shapes ======
function genDiamonds(): object {
  const c: C[] = [[0.4, 0.8, 1], [0.7, 0.5, 1], [1, 0.8, 0.9]];
  const layers = Array.from({ length: 12 }, (_, i) => {
    const col = c[i % c.length];
    const x = 40 + (i * 67) % 330;
    const y = 30 + (i * 47) % 240;
    return makeLayer(i, [rc(20, 20, 0), stk(col, 2, 80), fl(col, 20)], {
      o: aOpacity(30, 80),
      p: aPos(x, y, x + (i % 2 ? 25 : -25), y + (i % 3 ? -20 : 20)),
      s: aScale(60, 130),
      r: aRotate(360 * (i % 2 ? 1 : -1)),
    }, { st: -(i * 12) });
  });
  return wrap(layers);
}

// ====== DNA HELIX — two interleaving sine-wave chains ======
function genDNA(): object {
  const c1: C = [0, 0.8, 1];
  const c2: C = [1, 0.3, 0.5];
  const layers: object[] = [];
  for (let i = 0; i < 20; i++) {
    const t = i / 20;
    const x = 100 + t * 200;
    const y1 = 150 + Math.sin(t * Math.PI * 4) * 60;
    const y2 = 150 - Math.sin(t * Math.PI * 4) * 60;
    layers.push(makeLayer(i * 2, [el(8), fl(c1, 80)], {
      o: { a: 0, k: 80 },
      p: aPos(x, y1, x, y1 + Math.sin(t * Math.PI * 4 + 1) * 20),
      s: aScale(80, 120),
      r: { a: 0, k: 0 },
    }, { st: -(i * 5) }));
    layers.push(makeLayer(i * 2 + 1, [el(8), fl(c2, 80)], {
      o: { a: 0, k: 80 },
      p: aPos(x, y2, x, y2 - Math.sin(t * Math.PI * 4 + 1) * 20),
      s: aScale(80, 120),
      r: { a: 0, k: 0 },
    }, { st: -(i * 5) }));
  }
  // Connecting bars
  for (let i = 0; i < 10; i++) {
    const t = (i * 2 + 1) / 20;
    const x = 100 + t * 200;
    layers.push(makeLayer(40 + i, [rc(2, 30, 0), fl([0.5, 0.5, 0.6], 40)], {
      o: aOpacity(20, 50),
      p: { a: 0, k: [x, 150, 0] },
      s: { a: 0, k: [100, 100, 100] },
      r: { a: 0, k: 0 },
    }));
  }
  return wrap(layers);
}

// ====== METEOR SHOWER — diagonal streaks ======
function genMeteor(): object {
  const c: C[] = [[1, 0.8, 0.3], [1, 0.6, 0.1], [1, 1, 0.7]];
  const layers = Array.from({ length: 14 }, (_, i) => {
    const col = c[i % c.length];
    const x = (i * 57) % 400;
    const tailLen = 20 + (i % 4) * 10;
    return makeLayer(i, [rc(tailLen, 3, 1), fl(col, 80)], {
      o: aOpacity(0, 90),
      p: aPosOneWay(x + 100, -20, x - 60, 340),
      s: { a: 0, k: [100, 100, 100] },
      r: { a: 0, k: 35 },
    }, { st: -(i * 10) });
  });
  return wrap(layers);
}

// ====== HEART MONITOR — horizontal line with spikes ======
function genHeartbeat(): object {
  const c: C = [0, 1, 0.4];
  const layers: object[] = [];
  // Horizontal baseline
  layers.push(makeLayer(0, [rc(380, 2, 0), fl(c, 50)], {
    o: { a: 0, k: 50 }, p: { a: 0, k: [200, 150, 0] },
    s: { a: 0, k: [100, 100, 100] }, r: { a: 0, k: 0 },
  }));
  // Scanning dot
  layers.push(makeLayer(1, [el(10), fl(c, 90)], {
    o: { a: 0, k: 90 },
    p: { a: 1, k: [
      { t: 0, s: [0, 150, 0], i: { x: 0.4, y: 1 }, o: { x: 0.6, y: 0 } },
      { t: 40, s: [160, 150, 0], i: { x: 0.4, y: 1 }, o: { x: 0.6, y: 0 } },
      { t: 50, s: [180, 80, 0], i: { x: 0.4, y: 1 }, o: { x: 0.6, y: 0 } },
      { t: 55, s: [190, 220, 0], i: { x: 0.4, y: 1 }, o: { x: 0.6, y: 0 } },
      { t: 65, s: [210, 100, 0], i: { x: 0.4, y: 1 }, o: { x: 0.6, y: 0 } },
      { t: 70, s: [220, 150, 0], i: { x: 0.4, y: 1 }, o: { x: 0.6, y: 0 } },
      { t: 150, s: [400, 150, 0] },
    ]},
    s: { a: 0, k: [100, 100, 100] }, r: { a: 0, k: 0 },
  }));
  // Pulse flash at peak
  layers.push(makeLayer(2, [el(60), fl(c, 20)], {
    o: { a: 1, k: [
      { t: 0, s: [0], i: { x: [.4], y: [1] }, o: { x: [.6], y: [0] } },
      { t: 50, s: [40], i: { x: [.4], y: [1] }, o: { x: [.6], y: [0] } },
      { t: 70, s: [0], i: { x: [.4], y: [1] }, o: { x: [.6], y: [0] } },
      { t: 150, s: [0] },
    ]},
    p: { a: 0, k: [200, 150, 0] },
    s: aScale(50, 200), r: { a: 0, k: 0 },
  }));
  return wrap(layers);
}

// ====== BOUNCING BALLS ======
function genBounce(): object {
  const c: C[] = [[1, 0.3, 0.3], [0.3, 0.7, 1], [1, 0.8, 0], [0.5, 1, 0.3]];
  const layers = Array.from({ length: 8 }, (_, i) => {
    const col = c[i % c.length];
    const x = 40 + i * 45;
    return makeLayer(i, [el(16 + (i % 3) * 4), fl(col, 85)], {
      o: { a: 0, k: 85 },
      p: { a: 1, k: [
        { t: 0, s: [x, 260, 0], i: { x: 0.4, y: 1 }, o: { x: 0.6, y: 0 } },
        { t: 30 + i * 5, s: [x, 40 + (i % 3) * 30, 0], i: { x: 0.8, y: 0 }, o: { x: 0.2, y: 1 } },
        { t: 60 + i * 5, s: [x, 260, 0], i: { x: 0.4, y: 1 }, o: { x: 0.6, y: 0 } },
        { t: 90 + i * 3, s: [x, 120 + (i % 4) * 20, 0], i: { x: 0.8, y: 0 }, o: { x: 0.2, y: 1 } },
        { t: 120 + i * 3, s: [x, 260, 0], i: { x: 0.4, y: 1 }, o: { x: 0.6, y: 0 } },
        { t: 150, s: [x, 260, 0] },
      ]},
      s: { a: 0, k: [100, 100, 100] }, r: { a: 0, k: 0 },
    }, { st: -(i * 5) });
  });
  // Shadow under each ball
  for (let i = 0; i < 8; i++) {
    const x = 40 + i * 45;
    layers.push(makeLayer(8 + i, [el(20), fl([0.2, 0.2, 0.2], 30)], {
      o: aOpacity(10, 30),
      p: { a: 0, k: [x, 268, 0] },
      s: { a: 1, k: [
        { t: 0, s: [100, 30, 100], i: { x: [.4,.4,.4], y: [1,1,1] }, o: { x: [.6,.6,.6], y: [0,0,0] } },
        { t: 30 + i * 5, s: [60, 20, 100], i: { x: [.4,.4,.4], y: [1,1,1] }, o: { x: [.6,.6,.6], y: [0,0,0] } },
        { t: 60 + i * 5, s: [100, 30, 100] },
      ]},
      r: { a: 0, k: 0 },
    }, { st: -(i * 5) }));
  }
  return wrap(layers);
}

// ====== TORNADO ======
function genTornado(): object {
  const c: C[] = [[0.6, 0.7, 0.8], [0.4, 0.5, 0.6], [0.8, 0.8, 0.9]];
  const layers = Array.from({ length: 16 }, (_, i) => {
    const col = c[i % c.length];
    const t = i / 16;
    const width = 20 + t * 60;
    const y = 50 + t * 200;
    return makeLayer(i, [rc(width, 4, 2), fl(col, 40 + t * 30)], {
      o: { a: 0, k: 40 + t * 30 },
      p: aPos(200, y, 200 + Math.sin(t * 8) * (20 + t * 30), y),
      s: { a: 0, k: [100, 100, 100] },
      r: aRotate((i % 2 ? 10 : -10)),
    }, { st: -(i * 8) });
  });
  return wrap(layers);
}

// ====== CLOCK HANDS ======
function genClock(): object {
  const c: C[] = [[1, 1, 1], [0.8, 0.8, 0.8]];
  const layers: object[] = [];
  // Clock face circle
  layers.push(makeLayer(0, [el(120), stk(c[1], 2, 50)], {
    o: { a: 0, k: 50 }, p: { a: 0, k: [200, 150, 0] },
    s: { a: 0, k: [100, 100, 100] }, r: { a: 0, k: 0 },
  }));
  // Hour hand (slow)
  layers.push(makeLayer(1, [rc(4, 40, 2), fl(c[0], 80)], {
    o: { a: 0, k: 80 }, p: { a: 0, k: [200, 130, 0] },
    s: { a: 0, k: [100, 100, 100] }, r: aRotate(360),
  }));
  // Minute hand (faster, 2x)
  layers.push(makeLayer(2, [rc(3, 55, 1), fl(c[0], 70)], {
    o: { a: 0, k: 70 }, p: { a: 0, k: [200, 123, 0] },
    s: { a: 0, k: [100, 100, 100] },
    r: { a: 1, k: [{ t: 0, s: [0], i: { x: [.4], y: [1] }, o: { x: [.6], y: [0] } }, { t: 150, s: [720] }] },
  }));
  // Center dot
  layers.push(makeLayer(3, [el(8), fl(c[0], 90)], {
    o: { a: 0, k: 90 }, p: { a: 0, k: [200, 150, 0] },
    s: { a: 0, k: [100, 100, 100] }, r: { a: 0, k: 0 },
  }));
  // Tick marks
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2;
    const x = 200 + Math.cos(angle) * 55;
    const y = 150 + Math.sin(angle) * 55;
    layers.push(makeLayer(4 + i, [rc(2, 8, 1), fl(c[1], 60)], {
      o: { a: 0, k: 60 }, p: { a: 0, k: [x, y, 0] },
      s: { a: 0, k: [100, 100, 100] },
      r: { a: 0, k: (i / 12) * 360 },
    }));
  }
  return wrap(layers);
}

// ====== SCANLINES ======
function genScanlines(): object {
  const c: C = [0.3, 1, 0.3];
  const layers: object[] = [];
  // Horizontal lines
  for (let i = 0; i < 20; i++) {
    const y = i * 15 + 7;
    layers.push(makeLayer(i, [rc(400, 1, 0), fl(c, 15)], {
      o: { a: 0, k: 15 }, p: { a: 0, k: [200, y, 0] },
      s: { a: 0, k: [100, 100, 100] }, r: { a: 0, k: 0 },
    }));
  }
  // Scanning bar
  layers.push(makeLayer(20, [rc(400, 8, 0), fl(c, 30)], {
    o: aOpacity(10, 40),
    p: aPos(200, -5, 200, 310),
    s: { a: 0, k: [100, 100, 100] }, r: { a: 0, k: 0 },
  }));
  // Flicker overlay
  layers.push(makeLayer(21, [rc(400, 300, 0), fl(c, 5)], {
    o: { a: 1, k: [
      { t: 0, s: [3], i: { x: [.4], y: [1] }, o: { x: [.6], y: [0] } },
      { t: 10, s: [8], i: { x: [.4], y: [1] }, o: { x: [.6], y: [0] } },
      { t: 15, s: [2], i: { x: [.4], y: [1] }, o: { x: [.6], y: [0] } },
      { t: 30, s: [6], i: { x: [.4], y: [1] }, o: { x: [.6], y: [0] } },
      { t: 150, s: [3] },
    ]},
    p: { a: 0, k: [200, 150, 0] },
    s: { a: 0, k: [100, 100, 100] }, r: { a: 0, k: 0 },
  }));
  return wrap(layers);
}

// ====== CROSSHAIR / TARGET LOCK ======
function genCrosshair(): object {
  const c: C = [1, 0.2, 0.2];
  const layers: object[] = [];
  // Outer ring
  layers.push(makeLayer(0, [el(80), stk(c, 2, 70)], {
    o: aOpacity(40, 80), p: { a: 0, k: [200, 150, 0] },
    s: aScale(80, 120), r: aRotate(360),
  }));
  // Inner ring
  layers.push(makeLayer(1, [el(40), stk(c, 1.5, 60)], {
    o: aOpacity(50, 80), p: { a: 0, k: [200, 150, 0] },
    s: aScale(90, 110), r: aRotate(-180),
  }));
  // Cross lines
  layers.push(makeLayer(2, [rc(100, 2, 0), fl(c, 60)], {
    o: { a: 0, k: 60 }, p: { a: 0, k: [200, 150, 0] },
    s: { a: 0, k: [100, 100, 100] }, r: { a: 0, k: 0 },
  }));
  layers.push(makeLayer(3, [rc(2, 100, 0), fl(c, 60)], {
    o: { a: 0, k: 60 }, p: { a: 0, k: [200, 150, 0] },
    s: { a: 0, k: [100, 100, 100] }, r: { a: 0, k: 0 },
  }));
  // Center dot
  layers.push(makeLayer(4, [el(6), fl(c, 90)], {
    o: aOpacity(60, 100), p: { a: 0, k: [200, 150, 0] },
    s: aScale(80, 120), r: { a: 0, k: 0 },
  }));
  // Corner brackets
  for (let i = 0; i < 4; i++) {
    const angle = i * 90;
    const cos = Math.cos((angle * Math.PI) / 180);
    const sin = Math.sin((angle * Math.PI) / 180);
    layers.push(makeLayer(5 + i, [rc(20, 3, 0), fl(c, 70)], {
      o: aOpacity(40, 70),
      p: { a: 0, k: [200 + cos * 50, 150 + sin * 50, 0] },
      s: { a: 0, k: [100, 100, 100] },
      r: { a: 0, k: angle },
    }));
  }
  return wrap(layers);
}

// ====== WARP SPEED — stars stretching from center ======
function genWarp(): object {
  const c: C[] = [[1, 1, 1], [0.8, 0.9, 1], [0.6, 0.7, 1]];
  const layers = Array.from({ length: 20 }, (_, i) => {
    const col = c[i % c.length];
    const angle = (i / 20) * Math.PI * 2;
    const r1 = 5;
    const r2 = 200;
    return makeLayer(i, [rc(2, 8 + (i % 4) * 4, 1), fl(col, 80)], {
      o: aOpacity(0, 90),
      p: aPosOneWay(200 + Math.cos(angle) * r1, 150 + Math.sin(angle) * r1, 200 + Math.cos(angle) * r2, 150 + Math.sin(angle) * r2),
      s: { a: 1, k: [
        { t: 0, s: [100, 30, 100], i: { x: [.4,.4,.4], y: [1,1,1] }, o: { x: [.6,.6,.6], y: [0,0,0] } },
        { t: 150, s: [100, 400, 100] },
      ]},
      r: { a: 0, k: (angle * 180 / Math.PI) + 90 },
    }, { st: -(i * 7) });
  });
  return wrap(layers);
}

// ====== RADAR SWEEP ======
function genRadar(): object {
  const c: C = [0, 1, 0.5];
  const layers: object[] = [];
  // Radar circles
  for (let i = 0; i < 4; i++) {
    layers.push(makeLayer(i, [el(30 + i * 30), stk(c, 1, 30)], {
      o: { a: 0, k: 30 }, p: { a: 0, k: [200, 150, 0] },
      s: { a: 0, k: [100, 100, 100] }, r: { a: 0, k: 0 },
    }));
  }
  // Sweep line
  layers.push(makeLayer(4, [rc(3, 70, 0), fl(c, 70)], {
    o: { a: 0, k: 70 },
    p: { a: 0, k: [200, 115, 0] },
    s: { a: 0, k: [100, 100, 100] },
    r: aRotate(360),
  }));
  // Blips
  for (let i = 0; i < 6; i++) {
    const angle = (i * 1.2) + 0.5;
    const r = 20 + (i * 17) % 50;
    layers.push(makeLayer(5 + i, [el(5), fl(c, 80)], {
      o: aOpacity(0, 90),
      p: { a: 0, k: [200 + Math.cos(angle) * r, 150 + Math.sin(angle) * r, 0] },
      s: aScale(50, 120),
      r: { a: 0, k: 0 },
    }, { st: -(i * 20) }));
  }
  return wrap(layers);
}

// ====== EXPLOSION — radial burst ======
function genExplosion(): object {
  const c: C[] = [[1, 0.6, 0], [1, 0.3, 0], [1, 0.9, 0.2], [1, 0.1, 0]];
  const layers: object[] = [];
  // Central flash
  layers.push(makeLayer(0, [el(40), fl([1, 1, 0.8], 90)], {
    o: { a: 1, k: [
      { t: 0, s: [0], i: { x: [.4], y: [1] }, o: { x: [.6], y: [0] } },
      { t: 5, s: [100], i: { x: [.4], y: [1] }, o: { x: [.6], y: [0] } },
      { t: 40, s: [0], i: { x: [.4], y: [1] }, o: { x: [.6], y: [0] } },
      { t: 150, s: [0] },
    ]},
    p: { a: 0, k: [200, 150, 0] },
    s: aScale(20, 300), r: { a: 0, k: 0 },
  }));
  // Debris particles
  for (let i = 0; i < 16; i++) {
    const col = c[i % c.length];
    const angle = (i / 16) * Math.PI * 2;
    const dist = 80 + (i % 4) * 30;
    layers.push(makeLayer(1 + i, [el(4 + (i % 3) * 2), fl(col, 85)], {
      o: aOpacity(90, 0),
      p: aPosOneWay(200, 150, 200 + Math.cos(angle) * dist, 150 + Math.sin(angle) * dist),
      s: aScale(120, 20),
      r: aRotate(180 * (i % 2 ? 1 : -1)),
    }, { st: -(i % 4) * 2 }));
  }
  return wrap(layers);
}

// ====== ENERGY FIELD ======
function genEnergy(): object {
  const c: C[] = [[0.3, 0.5, 1], [0.5, 0.3, 1], [0.2, 0.8, 1]];
  const layers: object[] = [];
  // Electric arcs (thin lines at angles)
  for (let i = 0; i < 12; i++) {
    const col = c[i % c.length];
    const angle = (i / 12) * Math.PI * 2;
    const len = 40 + (i % 3) * 20;
    layers.push(makeLayer(i, [rc(2, len, 0), fl(col, 70)], {
      o: { a: 1, k: [
        { t: 0, s: [0], i: { x: [.4], y: [1] }, o: { x: [.6], y: [0] } },
        { t: 3 + (i * 3) % 10, s: [90], i: { x: [.4], y: [1] }, o: { x: [.6], y: [0] } },
        { t: 8 + (i * 3) % 10, s: [0], i: { x: [.4], y: [1] }, o: { x: [.6], y: [0] } },
        { t: 150, s: [0] },
      ]},
      p: { a: 0, k: [200 + Math.cos(angle) * 30, 150 + Math.sin(angle) * 30, 0] },
      s: { a: 0, k: [100, 100, 100] },
      r: { a: 0, k: (angle * 180 / Math.PI) },
    }, { st: -(i * 12) }));
  }
  // Central glow
  layers.push(makeLayer(12, [el(50), fl(c[0], 15)], {
    o: aOpacity(10, 30),
    p: { a: 0, k: [200, 150, 0] },
    s: aScale(60, 180), r: { a: 0, k: 0 },
  }));
  return wrap(layers);
}

// ====== VINYL SPIN ======
function genVinyl(): object {
  const c: C = [0.3, 0.3, 0.3];
  const layers: object[] = [];
  // Disc grooves
  for (let i = 0; i < 8; i++) {
    layers.push(makeLayer(i, [el(30 + i * 15), stk(c, 1, 30 + i * 5)], {
      o: { a: 0, k: 30 + i * 5 },
      p: { a: 0, k: [200, 150, 0] },
      s: { a: 0, k: [100, 100, 100] },
      r: aRotate(360),
    }));
  }
  // Label center
  layers.push(makeLayer(8, [el(25), fl([0.8, 0.2, 0.2], 70)], {
    o: { a: 0, k: 70 }, p: { a: 0, k: [200, 150, 0] },
    s: { a: 0, k: [100, 100, 100] }, r: aRotate(360),
  }));
  // Center hole
  layers.push(makeLayer(9, [el(6), fl([0.1, 0.1, 0.1], 90)], {
    o: { a: 0, k: 90 }, p: { a: 0, k: [200, 150, 0] },
    s: { a: 0, k: [100, 100, 100] }, r: { a: 0, k: 0 },
  }));
  // Light reflection
  layers.push(makeLayer(10, [rc(3, 120, 0), fl([1, 1, 1], 15)], {
    o: aOpacity(5, 20),
    p: { a: 0, k: [200, 150, 0] },
    s: { a: 0, k: [100, 100, 100] }, r: aRotate(360),
  }));
  return wrap(layers);
}

// ====== HEAVY RAIN ======
function genHeavyRain(): object {
  const c: C[] = [[0.4, 0.6, 1], [0.3, 0.5, 0.9], [0.5, 0.7, 1]];
  const layers = Array.from({ length: 30 }, (_, i) => {
    const col = c[i % c.length];
    const x = (i * 27) % 420 - 10;
    return makeLayer(i, [rc(1.5, 18 + (i % 5) * 4, 1), fl(col, 50 + (i % 3) * 15)], {
      o: { a: 0, k: 50 + (i % 3) * 15 },
      p: aPosOneWay(x + 30, -20, x, 320),
      s: { a: 0, k: [100, 100, 100] },
      r: { a: 0, k: 8 },
    }, { st: -(i * 4) });
  });
  return wrap(layers);
}

// ====== GRID PULSE ======
function genGridPulse(): object {
  const c: C = [0, 0.8, 1];
  const layers: object[] = [];
  let idx = 0;
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 8; col++) {
      const x = col * 50 + 25;
      const y = row * 50 + 25;
      layers.push(makeLayer(idx, [rc(3, 3, 1), fl(c, 50)], {
        o: aOpacity(15, 70),
        p: { a: 0, k: [x, y, 0] },
        s: aScale(80, 200),
        r: { a: 0, k: 0 },
      }, { st: -((row + col) * 4) }));
      idx++;
    }
  }
  return wrap(layers);
}

// ====== ORBITAL ======
function genOrbit(): object {
  const c: C[] = [[0.8, 0.5, 0.2], [0.3, 0.6, 1], [0.9, 0.9, 0.4]];
  const layers: object[] = [];
  // Central body
  layers.push(makeLayer(0, [el(30), fl(c[0], 70)], {
    o: { a: 0, k: 70 }, p: { a: 0, k: [200, 150, 0] },
    s: aScale(90, 110), r: { a: 0, k: 0 },
  }));
  // Orbiting bodies
  for (let i = 0; i < 5; i++) {
    const col = c[(i + 1) % c.length];
    const r = 50 + i * 20;
    // Orbit path
    layers.push(makeLayer(1 + i * 2, [el(r * 2), stk([0.3, 0.3, 0.4], 1, 20)], {
      o: { a: 0, k: 20 }, p: { a: 0, k: [200, 150, 0] },
      s: { a: 0, k: [100, 60, 100] }, r: { a: 0, k: 0 },
    }));
    // Planet
    const speed = 360 * (1 + i * 0.3);
    layers.push(makeLayer(2 + i * 2, [el(8 + (i % 3) * 3), fl(col, 85)], {
      o: { a: 0, k: 85 },
      p: { a: 1, k: [
        { t: 0, s: [200 + r, 150, 0], i: { x: 0.4, y: 1 }, o: { x: 0.6, y: 0 } },
        { t: 37, s: [200, 150 - r * 0.6, 0], i: { x: 0.4, y: 1 }, o: { x: 0.6, y: 0 } },
        { t: 75, s: [200 - r, 150, 0], i: { x: 0.4, y: 1 }, o: { x: 0.6, y: 0 } },
        { t: 112, s: [200, 150 + r * 0.6, 0], i: { x: 0.4, y: 1 }, o: { x: 0.6, y: 0 } },
        { t: 150, s: [200 + r, 150, 0] },
      ]},
      s: { a: 0, k: [100, 100, 100] }, r: { a: 0, k: 0 },
    }, { st: -(i * 10) }));
  }
  return wrap(layers);
}

// ====== FLAMES WALL ======
function genFlames(): object {
  const c: C[] = [[1, 0.3, 0], [1, 0.6, 0], [1, 0.9, 0.1], [1, 0.1, 0]];
  const layers = Array.from({ length: 20 }, (_, i) => {
    const col = c[i % c.length];
    const x = (i * 20) + 10;
    return makeLayer(i, [el(15 + (i % 4) * 5), fl(col, 60)], {
      o: aOpacity(40, 80),
      p: aPos(x, 280, x + (i % 3 - 1) * 10, 120 + (i % 5) * 15),
      s: { a: 1, k: [
        { t: 0, s: [100, 100, 100], i: { x: [.4,.4,.4], y: [1,1,1] }, o: { x: [.6,.6,.6], y: [0,0,0] } },
        { t: 40 + (i * 7) % 30, s: [120, 200, 100], i: { x: [.4,.4,.4], y: [1,1,1] }, o: { x: [.6,.6,.6], y: [0,0,0] } },
        { t: 100, s: [80, 60, 100], i: { x: [.4,.4,.4], y: [1,1,1] }, o: { x: [.6,.6,.6], y: [0,0,0] } },
        { t: 150, s: [100, 100, 100] },
      ]},
      r: { a: 0, k: 0 },
    }, { st: -(i * 5) });
  });
  return wrap(layers);
}

// ====== LASER BEAMS ======
function genLaser(): object {
  const c: C[] = [[1, 0, 0], [0, 1, 0], [0, 0.5, 1], [1, 0, 1]];
  const layers: object[] = [];
  for (let i = 0; i < 8; i++) {
    const col = c[i % c.length];
    const fromX = (i % 2) * 400;
    const toX = 400 - fromX;
    const y = 30 + (i * 37) % 260;
    layers.push(makeLayer(i, [rc(400, 2, 0), fl(col, 70)], {
      o: { a: 1, k: [
        { t: 0, s: [0], i: { x: [.4], y: [1] }, o: { x: [.6], y: [0] } },
        { t: 5 + i * 3, s: [90], i: { x: [.4], y: [1] }, o: { x: [.6], y: [0] } },
        { t: 15 + i * 3, s: [0], i: { x: [.4], y: [1] }, o: { x: [.6], y: [0] } },
        { t: 150, s: [0] },
      ]},
      p: { a: 1, k: [
        { t: 0, s: [fromX, y, 0], i: { x: .4, y: 1 }, o: { x: .6, y: 0 } },
        { t: 10 + i * 3, s: [toX, y + (i % 2 ? 20 : -20), 0] },
      ]},
      s: { a: 0, k: [100, 100, 100] },
      r: { a: 0, k: (i % 2 ? 3 : -3) },
    }, { st: -(i * 18) }));
  }
  // Glow spots where beams cross
  for (let i = 0; i < 4; i++) {
    layers.push(makeLayer(8 + i, [el(15), fl(c[i], 20)], {
      o: aOpacity(0, 40),
      p: { a: 0, k: [100 + i * 70, 80 + (i * 50) % 160, 0] },
      s: aScale(50, 200),
      r: { a: 0, k: 0 },
    }, { st: -(i * 30) }));
  }
  return wrap(layers);
}

export function genNewBackgrounds(): Record<string, () => object> {
  return {
    "rockets-1": genRockets,
    "counter-1": genCounter,
    "arrows-1": genArrows,
    "diamonds-1": genDiamonds,
    "dna-1": genDNA,
    "meteor-1": genMeteor,
    "heartbeat-1": genHeartbeat,
    "bounce-1": genBounce,
    "tornado-1": genTornado,
    "clock-1": genClock,
    "scanlines-1": genScanlines,
    "crosshair-1": genCrosshair,
    "warp-1": genWarp,
    "radar-1": genRadar,
    "explosion-1": genExplosion,
    "energy-1": genEnergy,
    "vinyl-1": genVinyl,
    "rain-heavy-1": genHeavyRain,
    "grid-pulse-1": genGridPulse,
    "orbit-1": genOrbit,
    "flames-1": genFlames,
    "laser-1": genLaser,
  };
}
