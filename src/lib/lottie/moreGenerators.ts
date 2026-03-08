import { C, makeLayer, wrap, el, rc, fl, stk, aPos, aScale, aOpacity, aRotate, aPosOneWay } from "./helpers";

// ====== BALLOONS RISING ======
function genBalloons(): object {
  const c: C[] = [[1, 0.2, 0.3], [0.2, 0.6, 1], [1, 0.8, 0], [0.4, 1, 0.4], [1, 0.4, 0.8]];
  const layers: object[] = [];
  for (let i = 0; i < 10; i++) {
    const col = c[i % c.length];
    const x = 30 + (i * 79) % 360;
    // Balloon body (oval)
    layers.push(makeLayer(i * 2, [el(22 + (i % 3) * 4), fl(col, 80)], {
      o: aOpacity(0, 85),
      p: aPosOneWay(x, 320, x + (i % 2 ? 15 : -15), -40),
      s: { a: 0, k: [90, 110, 100] },
      r: { a: 0, k: (i % 2 ? 5 : -5) },
    }, { st: -(i * 14) }));
    // String
    layers.push(makeLayer(i * 2 + 1, [rc(1, 30, 0), fl(col, 50)], {
      o: aOpacity(0, 60),
      p: aPosOneWay(x, 348, x + (i % 2 ? 15 : -15), -12),
      s: { a: 0, k: [100, 100, 100] },
      r: { a: 0, k: (i % 2 ? 8 : -8) },
    }, { st: -(i * 14) }));
  }
  return wrap(layers);
}

// ====== GEARS TURNING ======
function genGears(): object {
  const c: C[] = [[0.5, 0.5, 0.6], [0.6, 0.6, 0.7], [0.4, 0.4, 0.5]];
  const layers: object[] = [];
  const gears = [
    { x: 130, y: 120, r: 50, dir: 1 },
    { x: 210, y: 120, r: 40, dir: -1 },
    { x: 170, y: 190, r: 35, dir: 1 },
    { x: 270, y: 170, r: 45, dir: -1 },
    { x: 100, y: 200, r: 30, dir: 1 },
  ];
  gears.forEach((g, i) => {
    const col = c[i % c.length];
    // Gear body
    layers.push(makeLayer(i * 2, [el(g.r * 2), stk(col, 3, 60), fl(col, 20)], {
      o: { a: 0, k: 60 },
      p: { a: 0, k: [g.x, g.y, 0] },
      s: { a: 0, k: [100, 100, 100] },
      r: aRotate(360 * g.dir),
    }));
    // Gear teeth (squares around)
    for (let t = 0; t < 8; t++) {
      const angle = (t / 8) * Math.PI * 2;
      layers.push(makeLayer(100 + i * 8 + t, [rc(8, 8, 1), fl(col, 50)], {
        o: { a: 0, k: 50 },
        p: { a: 0, k: [g.x + Math.cos(angle) * g.r, g.y + Math.sin(angle) * g.r, 0] },
        s: { a: 0, k: [100, 100, 100] },
        r: aRotate(360 * g.dir),
      }));
    }
    // Center hole
    layers.push(makeLayer(i * 2 + 1, [el(10), fl([0.15, 0.15, 0.2], 90)], {
      o: { a: 0, k: 90 },
      p: { a: 0, k: [g.x, g.y, 0] },
      s: { a: 0, k: [100, 100, 100] },
      r: { a: 0, k: 0 },
    }));
  });
  return wrap(layers);
}

// ====== CHERRY BLOSSOMS ======
function genBlossoms(): object {
  const c: C[] = [[1, 0.7, 0.8], [1, 0.6, 0.7], [1, 0.8, 0.85], [1, 0.5, 0.65]];
  const layers = Array.from({ length: 18 }, (_, i) => {
    const col = c[i % c.length];
    const x = (i * 47) % 420 - 10;
    const drift = (i % 2 ? 1 : -1) * (20 + (i % 6) * 8);
    return makeLayer(i, [el(6 + (i % 3) * 2), fl(col, 65)], {
      o: aOpacity(0, 70),
      p: aPosOneWay(x, -15, x + drift, 320),
      s: { a: 0, k: [120, 80, 100] },
      r: aRotate(720 * (i % 2 ? 1 : -1)),
    }, { st: -(i * 8) });
  });
  return wrap(layers);
}

// ====== BUTTERFLIES ======
function genButterflies(): object {
  const c: C[] = [[1, 0.5, 0], [0.3, 0.5, 1], [0.8, 0.2, 0.8], [0, 0.8, 0.6]];
  const layers: object[] = [];
  for (let i = 0; i < 6; i++) {
    const col = c[i % c.length];
    const x = 50 + (i * 97) % 300;
    const y = 50 + (i * 67) % 200;
    // Left wing
    layers.push(makeLayer(i * 3, [el(18), fl(col, 70)], {
      o: { a: 0, k: 70 },
      p: aPos(x - 8, y, x - 8 + (i % 2 ? 30 : -20), y - 15),
      s: { a: 1, k: [
        { t: 0, s: [100, 80, 100], i: { x: [.4,.4,.4], y: [1,1,1] }, o: { x: [.6,.6,.6], y: [0,0,0] } },
        { t: 10, s: [40, 80, 100], i: { x: [.4,.4,.4], y: [1,1,1] }, o: { x: [.6,.6,.6], y: [0,0,0] } },
        { t: 20, s: [100, 80, 100], i: { x: [.4,.4,.4], y: [1,1,1] }, o: { x: [.6,.6,.6], y: [0,0,0] } },
        { t: 30, s: [40, 80, 100], i: { x: [.4,.4,.4], y: [1,1,1] }, o: { x: [.6,.6,.6], y: [0,0,0] } },
        { t: 40, s: [100, 80, 100] },
      ]},
      r: { a: 0, k: 0 },
    }, { st: -(i * 20) }));
    // Right wing
    layers.push(makeLayer(i * 3 + 1, [el(18), fl(col, 70)], {
      o: { a: 0, k: 70 },
      p: aPos(x + 8, y, x + 8 + (i % 2 ? 30 : -20), y - 15),
      s: { a: 1, k: [
        { t: 0, s: [100, 80, 100], i: { x: [.4,.4,.4], y: [1,1,1] }, o: { x: [.6,.6,.6], y: [0,0,0] } },
        { t: 10, s: [40, 80, 100], i: { x: [.4,.4,.4], y: [1,1,1] }, o: { x: [.6,.6,.6], y: [0,0,0] } },
        { t: 20, s: [100, 80, 100], i: { x: [.4,.4,.4], y: [1,1,1] }, o: { x: [.6,.6,.6], y: [0,0,0] } },
        { t: 30, s: [40, 80, 100], i: { x: [.4,.4,.4], y: [1,1,1] }, o: { x: [.6,.6,.6], y: [0,0,0] } },
        { t: 40, s: [100, 80, 100] },
      ]},
      r: { a: 0, k: 0 },
    }, { st: -(i * 20) }));
    // Body
    layers.push(makeLayer(i * 3 + 2, [rc(2, 12, 1), fl([0.2, 0.2, 0.2], 80)], {
      o: { a: 0, k: 80 },
      p: aPos(x, y, x + (i % 2 ? 30 : -20), y - 15),
      s: { a: 0, k: [100, 100, 100] },
      r: { a: 0, k: 0 },
    }, { st: -(i * 20) }));
  }
  return wrap(layers);
}

// ====== PAINT SPLATTER ======
function genPaintSplatter(): object {
  const c: C[] = [[1, 0, 0.3], [0, 0.7, 1], [1, 0.8, 0], [0.5, 0, 1], [0, 1, 0.4]];
  const layers: object[] = [];
  for (let i = 0; i < 12; i++) {
    const col = c[i % c.length];
    const cx = 80 + (i * 73) % 240;
    const cy = 60 + (i * 51) % 180;
    // Main splat
    layers.push(makeLayer(i * 2, [el(20 + (i % 4) * 8), fl(col, 75)], {
      o: { a: 1, k: [
        { t: 0, s: [0], i: { x: [.4], y: [1] }, o: { x: [.6], y: [0] } },
        { t: 5 + i * 2, s: [85], i: { x: [.4], y: [1] }, o: { x: [.6], y: [0] } },
        { t: 100, s: [85], i: { x: [.4], y: [1] }, o: { x: [.6], y: [0] } },
        { t: 140, s: [0] },
      ]},
      p: { a: 0, k: [cx, cy, 0] },
      s: { a: 1, k: [
        { t: 0, s: [0, 0, 100], i: { x: [.4,.4,.4], y: [1,1,1] }, o: { x: [.6,.6,.6], y: [0,0,0] } },
        { t: 8 + i * 2, s: [130, 130, 100], i: { x: [.4,.4,.4], y: [1,1,1] }, o: { x: [.6,.6,.6], y: [0,0,0] } },
        { t: 20 + i * 2, s: [100, 100, 100] },
      ]},
      r: { a: 0, k: 0 },
    }, { st: -(i * 10) }));
    // Droplets
    for (let d = 0; d < 3; d++) {
      const angle = (d + i) * 2.1;
      const dist = 25 + d * 10;
      layers.push(makeLayer(100 + i * 3 + d, [el(4 + d * 2), fl(col, 65)], {
        o: aOpacity(0, 70),
        p: aPosOneWay(cx, cy, cx + Math.cos(angle) * dist, cy + Math.sin(angle) * dist),
        s: aScale(0, 100),
        r: { a: 0, k: 0 },
      }, { st: -(i * 10 + 3) }));
    }
  }
  return wrap(layers);
}

// ====== FILM STRIP ======
function genFilmStrip(): object {
  const c: C = [0.9, 0.9, 0.8];
  const layers: object[] = [];
  // Moving strip
  for (let i = 0; i < 8; i++) {
    const y = i * 50 - 50;
    // Frame border
    layers.push(makeLayer(i * 2, [rc(100, 40, 3), stk(c, 2, 50)], {
      o: { a: 0, k: 50 },
      p: aPosOneWay(200, y, 200, y + 400),
      s: { a: 0, k: [100, 100, 100] },
      r: { a: 0, k: 0 },
    }, { st: -(i * 18) }));
    // Sprocket holes
    layers.push(makeLayer(i * 2 + 1, [el(6), fl(c, 40)], {
      o: { a: 0, k: 40 },
      p: aPosOneWay(140, y, 140, y + 400),
      s: { a: 0, k: [100, 100, 100] },
      r: { a: 0, k: 0 },
    }, { st: -(i * 18) }));
  }
  // Side perforations
  layers.push(makeLayer(16, [rc(2, 400, 0), fl(c, 30)], {
    o: { a: 0, k: 30 },
    p: { a: 0, k: [135, 150, 0] },
    s: { a: 0, k: [100, 100, 100] },
    r: { a: 0, k: 0 },
  }));
  layers.push(makeLayer(17, [rc(2, 400, 0), fl(c, 30)], {
    o: { a: 0, k: 30 },
    p: { a: 0, k: [265, 150, 0] },
    s: { a: 0, k: [100, 100, 100] },
    r: { a: 0, k: 0 },
  }));
  return wrap(layers);
}

// ====== PENDULUM ======
function genPendulum(): object {
  const c: C[] = [[1, 0.8, 0.2], [0.3, 0.7, 1], [1, 0.3, 0.5]];
  const layers: object[] = [];
  for (let i = 0; i < 5; i++) {
    const col = c[i % c.length];
    const x = 120 + i * 40;
    // String
    layers.push(makeLayer(i * 2, [rc(1.5, 100, 0), fl([0.5, 0.5, 0.5], 50)], {
      o: { a: 0, k: 50 },
      p: { a: 0, k: [x, 50, 0] },
      s: { a: 0, k: [100, 100, 100] },
      r: { a: 1, k: [
        { t: 0, s: [30], i: { x: [.4], y: [1] }, o: { x: [.6], y: [0] } },
        { t: 75, s: [-30], i: { x: [.4], y: [1] }, o: { x: [.6], y: [0] } },
        { t: 150, s: [30] },
      ]},
    }, { st: -(i * 3) }));
    // Ball
    layers.push(makeLayer(i * 2 + 1, [el(20), fl(col, 85)], {
      o: { a: 0, k: 85 },
      p: { a: 1, k: [
        { t: 0, s: [x + 50, 140, 0], i: { x: 0.4, y: 1 }, o: { x: 0.6, y: 0 } },
        { t: 75, s: [x - 50, 140, 0], i: { x: 0.4, y: 1 }, o: { x: 0.6, y: 0 } },
        { t: 150, s: [x + 50, 140, 0] },
      ]},
      s: { a: 0, k: [100, 100, 100] },
      r: { a: 0, k: 0 },
    }, { st: -(i * 3) }));
  }
  return wrap(layers);
}

// ====== LOADING SPINNER ======
function genSpinner(): object {
  const c: C = [0, 0.8, 1];
  const layers: object[] = [];
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2;
    const r = 40;
    const opacity = 20 + (i / 12) * 60;
    layers.push(makeLayer(i, [rc(4, 12, 2), fl(c, opacity)], {
      o: { a: 0, k: opacity },
      p: { a: 0, k: [200 + Math.cos(angle) * r, 150 + Math.sin(angle) * r, 0] },
      s: { a: 0, k: [100, 100, 100] },
      r: { a: 0, k: (angle * 180 / Math.PI) + 90 },
    }));
  }
  // Make it spin by wrapping in a group rotation
  return {
    v: "5.5.7", fr: 30, ip: 0, op: 150, w: 400, h: 300, assets: [],
    layers: [{
      ddd: 0, ind: 0, ty: 4, nm: "spinner", sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        p: { a: 0, k: [200, 150, 0] },
        s: { a: 0, k: [100, 100, 100] },
        r: aRotate(360),
      },
      ao: 0,
      shapes: layers.map((l: any) => l.shapes[0]),
      ip: 0, op: 150, st: 0,
    }],
  };
}

// ====== SHOOTING STARS ======
function genShootingStars(): object {
  const c: C[] = [[1, 1, 0.8], [0.8, 0.9, 1], [1, 0.9, 0.6]];
  const layers = Array.from({ length: 8 }, (_, i) => {
    const col = c[i % c.length];
    const startX = (i * 97) % 300 + 100;
    const startY = (i * 31) % 100;
    return makeLayer(i, [rc(30 + (i % 3) * 10, 2, 1), fl(col, 80)], {
      o: aOpacity(0, 90),
      p: aPosOneWay(startX, startY, startX - 150, startY + 120),
      s: { a: 1, k: [
        { t: 0, s: [20, 100, 100], i: { x: [.4,.4,.4], y: [1,1,1] }, o: { x: [.6,.6,.6], y: [0,0,0] } },
        { t: 40, s: [100, 100, 100], i: { x: [.4,.4,.4], y: [1,1,1] }, o: { x: [.6,.6,.6], y: [0,0,0] } },
        { t: 80, s: [20, 30, 100] },
      ]},
      r: { a: 0, k: 35 },
    }, { st: -(i * 18) });
  });
  return wrap(layers);
}

// ====== OCEAN WAVES ======
function genOceanWaves(): object {
  const c: C[] = [[0.1, 0.4, 0.7], [0.15, 0.5, 0.8], [0.05, 0.3, 0.6]];
  const layers: object[] = [];
  for (let i = 0; i < 6; i++) {
    const col = c[i % c.length];
    const y = 180 + i * 20;
    layers.push(makeLayer(i, [rc(450, 40 + i * 10, 20), fl(col, 30 + i * 8)], {
      o: { a: 0, k: 30 + i * 8 },
      p: { a: 1, k: [
        { t: 0, s: [200, y, 0], i: { x: 0.4, y: 1 }, o: { x: 0.6, y: 0 } },
        { t: 50 + i * 5, s: [220, y - 8, 0], i: { x: 0.4, y: 1 }, o: { x: 0.6, y: 0 } },
        { t: 100 + i * 5, s: [180, y + 5, 0], i: { x: 0.4, y: 1 }, o: { x: 0.6, y: 0 } },
        { t: 150, s: [200, y, 0] },
      ]},
      s: { a: 0, k: [100, 100, 100] },
      r: { a: 0, k: 0 },
    }, { st: -(i * 10) }));
  }
  // Foam particles
  for (let i = 0; i < 10; i++) {
    const x = (i * 43) % 400;
    layers.push(makeLayer(10 + i, [el(3), fl([0.9, 0.95, 1], 50)], {
      o: aOpacity(0, 60),
      p: aPos(x, 175, x + (i % 2 ? 10 : -10), 170),
      s: aScale(50, 120),
      r: { a: 0, k: 0 },
    }, { st: -(i * 12) }));
  }
  return wrap(layers);
}

// ====== RAINBOW ARC ======
function genRainbow(): object {
  const colors: C[] = [
    [1, 0, 0], [1, 0.5, 0], [1, 1, 0],
    [0, 1, 0], [0, 0, 1], [0.3, 0, 0.5], [0.5, 0, 1],
  ];
  const layers = colors.map((col, i) =>
    makeLayer(i, [el(200 + i * 20), stk(col, 8, 50)], {
      o: aOpacity(0, 55),
      p: { a: 0, k: [200, 250, 0] },
      s: { a: 1, k: [
        { t: 0, s: [0, 0, 100], i: { x: [.4,.4,.4], y: [1,1,1] }, o: { x: [.6,.6,.6], y: [0,0,0] } },
        { t: 30 + i * 5, s: [100, 70, 100], i: { x: [.4,.4,.4], y: [1,1,1] }, o: { x: [.6,.6,.6], y: [0,0,0] } },
        { t: 120, s: [100, 70, 100], i: { x: [.4,.4,.4], y: [1,1,1] }, o: { x: [.6,.6,.6], y: [0,0,0] } },
        { t: 150, s: [0, 0, 100] },
      ]},
      r: { a: 0, k: 0 },
    }, { st: -(i * 3) })
  );
  return wrap(layers);
}

// ====== BASS DROP ======
function genBassDrop(): object {
  const c: C[] = [[1, 0.2, 0], [1, 0.5, 0], [0.8, 0, 0.3]];
  const layers: object[] = [];
  // Shockwave rings
  for (let i = 0; i < 6; i++) {
    const col = c[i % c.length];
    layers.push(makeLayer(i, [el(20 + i * 10), stk(col, 4, 80)], {
      o: aOpacity(80, 0),
      p: { a: 0, k: [200, 150, 0] },
      s: aScale(10, 400),
      r: { a: 0, k: 0 },
    }, { st: -(i * 20) }));
  }
  // Central impact
  layers.push(makeLayer(6, [el(30), fl([1, 1, 1], 90)], {
    o: { a: 1, k: [
      { t: 0, s: [0], i: { x: [.4], y: [1] }, o: { x: [.6], y: [0] } },
      { t: 3, s: [100], i: { x: [.4], y: [1] }, o: { x: [.6], y: [0] } },
      { t: 20, s: [0] },
    ]},
    p: { a: 0, k: [200, 150, 0] },
    s: { a: 1, k: [
      { t: 0, s: [100, 100, 100], i: { x: [.4,.4,.4], y: [1,1,1] }, o: { x: [.6,.6,.6], y: [0,0,0] } },
      { t: 10, s: [300, 300, 100], i: { x: [.4,.4,.4], y: [1,1,1] }, o: { x: [.6,.6,.6], y: [0,0,0] } },
      { t: 20, s: [0, 0, 100] },
    ]},
    r: { a: 0, k: 0 },
  }));
  // Screen shake particles
  for (let i = 0; i < 10; i++) {
    const angle = (i / 10) * Math.PI * 2;
    layers.push(makeLayer(7 + i, [rc(3, 15, 1), fl(c[i % c.length], 70)], {
      o: aOpacity(80, 0),
      p: aPosOneWay(200, 150, 200 + Math.cos(angle) * 150, 150 + Math.sin(angle) * 150),
      s: { a: 0, k: [100, 100, 100] },
      r: { a: 0, k: (angle * 180 / Math.PI) },
    }, { st: -2 }));
  }
  return wrap(layers);
}

// ====== DICE ROLLING ======
function genDice(): object {
  const c: C = [1, 1, 1];
  const layers: object[] = [];
  for (let i = 0; i < 4; i++) {
    const x = 80 + i * 80;
    const y = 100 + (i % 2) * 60;
    // Die body
    layers.push(makeLayer(i * 2, [rc(35, 35, 5), fl(c, 85), stk([0.7, 0.7, 0.7], 2, 60)], {
      o: { a: 0, k: 85 },
      p: aPos(x, y, x + (i % 2 ? 20 : -20), y + (i % 3 ? -15 : 15)),
      s: { a: 0, k: [100, 100, 100] },
      r: aRotate(360 * (i % 2 ? 1 : -1)),
    }, { st: -(i * 15) }));
    // Dots on die
    layers.push(makeLayer(i * 2 + 1, [el(5), fl([0.1, 0.1, 0.1], 90)], {
      o: { a: 0, k: 90 },
      p: aPos(x, y, x + (i % 2 ? 20 : -20), y + (i % 3 ? -15 : 15)),
      s: { a: 0, k: [100, 100, 100] },
      r: aRotate(360 * (i % 2 ? 1 : -1)),
    }, { st: -(i * 15) }));
  }
  return wrap(layers);
}

// ====== SPARKLE TRAIL ======
function genSparkleTrail(): object {
  const c: C[] = [[1, 1, 0.5], [1, 0.9, 0.3], [1, 1, 0.8]];
  const layers: object[] = [];
  // Main sparkle path
  const points = 20;
  for (let i = 0; i < points; i++) {
    const col = c[i % c.length];
    const t = i / points;
    const x = 50 + t * 300;
    const y = 150 + Math.sin(t * Math.PI * 3) * 60;
    layers.push(makeLayer(i, [el(4 + (i % 3) * 2), fl(col, 80)], {
      o: { a: 1, k: [
        { t: 0, s: [0], i: { x: [.4], y: [1] }, o: { x: [.6], y: [0] } },
        { t: i * 5 + 5, s: [100], i: { x: [.4], y: [1] }, o: { x: [.6], y: [0] } },
        { t: i * 5 + 15, s: [0] },
      ]},
      p: { a: 0, k: [x, y, 0] },
      s: aScale(50, 200),
      r: aRotate(45),
    }, { st: -(i * 2) }));
  }
  return wrap(layers);
}

// ====== BUILDING BLOCKS (Tetris-like) ======
function genBuildingBlocks(): object {
  const c: C[] = [[0, 1, 1], [1, 1, 0], [1, 0, 1], [0, 1, 0], [1, 0.5, 0]];
  const layers: object[] = [];
  const blocks = [
    { x: 100, y: 260, w: 60, h: 20 },
    { x: 140, y: 240, w: 40, h: 20 },
    { x: 200, y: 260, w: 80, h: 20 },
    { x: 180, y: 240, w: 40, h: 20 },
    { x: 260, y: 260, w: 60, h: 20 },
    { x: 120, y: 220, w: 60, h: 20 },
    { x: 220, y: 240, w: 60, h: 20 },
    { x: 160, y: 200, w: 40, h: 20 },
    { x: 280, y: 240, w: 40, h: 20 },
    { x: 200, y: 220, w: 60, h: 20 },
  ];
  blocks.forEach((b, i) => {
    const col = c[i % c.length];
    layers.push(makeLayer(i, [rc(b.w, b.h, 2), fl(col, 80), stk(col, 1, 40)], {
      o: aOpacity(0, 85),
      p: aPosOneWay(b.x, -30, b.x, b.y),
      s: { a: 0, k: [100, 100, 100] },
      r: { a: 0, k: 0 },
    }, { st: -(i * 12) }));
  });
  return wrap(layers);
}

// ====== COUNTDOWN TIMER ======
function genCountdown(): object {
  const c: C = [1, 0.3, 0.1];
  const layers: object[] = [];
  // Circular progress
  layers.push(makeLayer(0, [el(100), stk(c, 5, 70)], {
    o: { a: 0, k: 70 },
    p: { a: 0, k: [200, 150, 0] },
    s: { a: 0, k: [100, 100, 100] },
    r: aRotate(-360),
  }));
  // Background circle
  layers.push(makeLayer(1, [el(100), stk([0.3, 0.3, 0.3], 2, 30)], {
    o: { a: 0, k: 30 },
    p: { a: 0, k: [200, 150, 0] },
    s: { a: 0, k: [100, 100, 100] },
    r: { a: 0, k: 0 },
  }));
  // Pulsing center
  layers.push(makeLayer(2, [el(30), fl(c, 40)], {
    o: aOpacity(20, 60),
    p: { a: 0, k: [200, 150, 0] },
    s: aScale(80, 120),
    r: { a: 0, k: 0 },
  }));
  // Tick marks
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2;
    const x = 200 + Math.cos(angle) * 60;
    const y = 150 + Math.sin(angle) * 60;
    layers.push(makeLayer(3 + i, [rc(2, 8, 1), fl([0.6, 0.6, 0.6], 50)], {
      o: { a: 0, k: 50 },
      p: { a: 0, k: [x, y, 0] },
      s: { a: 0, k: [100, 100, 100] },
      r: { a: 0, k: (i / 12) * 360 },
    }));
  }
  return wrap(layers);
}

// ====== CRYSTAL BALL ======
function genCrystalBall(): object {
  const c: C[] = [[0.5, 0.3, 1], [0.3, 0.5, 1], [0.7, 0.2, 0.9]];
  const layers: object[] = [];
  // Ball outline
  layers.push(makeLayer(0, [el(120), stk([0.6, 0.5, 0.8], 2, 50), fl([0.2, 0.1, 0.3], 30)], {
    o: { a: 0, k: 50 },
    p: { a: 0, k: [200, 130, 0] },
    s: { a: 0, k: [100, 100, 100] },
    r: { a: 0, k: 0 },
  }));
  // Inner swirling particles
  for (let i = 0; i < 10; i++) {
    const col = c[i % c.length];
    const angle = (i / 10) * Math.PI * 2;
    const r = 20 + (i % 3) * 12;
    layers.push(makeLayer(1 + i, [el(5 + (i % 3) * 2), fl(col, 60)], {
      o: aOpacity(20, 70),
      p: aPos(200 + Math.cos(angle) * r, 130 + Math.sin(angle) * r, 200 + Math.cos(angle + 2) * r, 130 + Math.sin(angle + 2) * r),
      s: aScale(60, 140),
      r: { a: 0, k: 0 },
    }, { st: -(i * 12) }));
  }
  // Base
  layers.push(makeLayer(11, [rc(60, 20, 5), fl([0.4, 0.3, 0.2], 70)], {
    o: { a: 0, k: 70 },
    p: { a: 0, k: [200, 200, 0] },
    s: { a: 0, k: [100, 100, 100] },
    r: { a: 0, k: 0 },
  }));
  // Glow
  layers.push(makeLayer(12, [el(140), fl(c[0], 10)], {
    o: aOpacity(5, 20),
    p: { a: 0, k: [200, 130, 0] },
    s: aScale(80, 120),
    r: { a: 0, k: 0 },
  }));
  return wrap(layers);
}

// ====== MOON PHASES ======
function genMoonPhases(): object {
  const c: C = [0.9, 0.9, 0.8];
  const layers: object[] = [];
  // Full moon
  layers.push(makeLayer(0, [el(70), fl(c, 60)], {
    o: { a: 0, k: 60 },
    p: { a: 0, k: [200, 120, 0] },
    s: { a: 0, k: [100, 100, 100] },
    r: { a: 0, k: 0 },
  }));
  // Shadow (creates phase effect)
  layers.push(makeLayer(1, [el(72), fl([0.05, 0.05, 0.1], 90)], {
    o: { a: 0, k: 90 },
    p: { a: 1, k: [
      { t: 0, s: [130, 120, 0], i: { x: 0.4, y: 1 }, o: { x: 0.6, y: 0 } },
      { t: 50, s: [200, 120, 0], i: { x: 0.4, y: 1 }, o: { x: 0.6, y: 0 } },
      { t: 100, s: [270, 120, 0], i: { x: 0.4, y: 1 }, o: { x: 0.6, y: 0 } },
      { t: 150, s: [130, 120, 0] },
    ]},
    s: { a: 0, k: [100, 100, 100] },
    r: { a: 0, k: 0 },
  }));
  // Craters
  for (let i = 0; i < 5; i++) {
    const x = 185 + (i * 13) % 30;
    const y = 110 + (i * 11) % 20;
    layers.push(makeLayer(2 + i, [el(5 + (i % 3) * 2), fl([0.7, 0.7, 0.6], 30)], {
      o: { a: 0, k: 30 },
      p: { a: 0, k: [x, y, 0] },
      s: { a: 0, k: [100, 100, 100] },
      r: { a: 0, k: 0 },
    }));
  }
  // Stars around
  for (let i = 0; i < 12; i++) {
    const x = (i * 67) % 400;
    const y = (i * 43) % 200;
    layers.push(makeLayer(7 + i, [el(2), fl([1, 1, 0.8], 70)], {
      o: aOpacity(20, 80),
      p: { a: 0, k: [x, y, 0] },
      s: aScale(40, 120),
      r: { a: 0, k: 0 },
    }, { st: -(i * 10) }));
  }
  return wrap(layers);
}

// ====== THEATER MASKS ======
function genTheaterMasks(): object {
  const c1: C = [1, 0.8, 0.2]; // Happy - gold
  const c2: C = [0.3, 0.4, 0.8]; // Sad - blue
  const layers: object[] = [];
  // Happy mask
  layers.push(makeLayer(0, [el(50), fl(c1, 70), stk(c1, 2, 50)], {
    o: { a: 0, k: 70 },
    p: aPos(150, 140, 160, 130),
    s: { a: 0, k: [100, 120, 100] },
    r: { a: 1, k: [
      { t: 0, s: [10], i: { x: [.4], y: [1] }, o: { x: [.6], y: [0] } },
      { t: 75, s: [-5], i: { x: [.4], y: [1] }, o: { x: [.6], y: [0] } },
      { t: 150, s: [10] },
    ]},
  }));
  // Happy eyes
  layers.push(makeLayer(1, [el(6), fl([0.1, 0.1, 0.1], 90)], {
    o: { a: 0, k: 90 },
    p: aPos(140, 130, 150, 120),
    s: { a: 0, k: [100, 100, 100] }, r: { a: 0, k: 0 },
  }));
  layers.push(makeLayer(2, [el(6), fl([0.1, 0.1, 0.1], 90)], {
    o: { a: 0, k: 90 },
    p: aPos(160, 130, 170, 120),
    s: { a: 0, k: [100, 100, 100] }, r: { a: 0, k: 0 },
  }));
  // Sad mask
  layers.push(makeLayer(3, [el(50), fl(c2, 70), stk(c2, 2, 50)], {
    o: { a: 0, k: 70 },
    p: aPos(250, 140, 240, 150),
    s: { a: 0, k: [100, 120, 100] },
    r: { a: 1, k: [
      { t: 0, s: [-10], i: { x: [.4], y: [1] }, o: { x: [.6], y: [0] } },
      { t: 75, s: [5], i: { x: [.4], y: [1] }, o: { x: [.6], y: [0] } },
      { t: 150, s: [-10] },
    ]},
  }));
  // Sad eyes
  layers.push(makeLayer(4, [el(6), fl([0.1, 0.1, 0.1], 90)], {
    o: { a: 0, k: 90 },
    p: aPos(240, 130, 230, 140),
    s: { a: 0, k: [100, 100, 100] }, r: { a: 0, k: 0 },
  }));
  layers.push(makeLayer(5, [el(6), fl([0.1, 0.1, 0.1], 90)], {
    o: { a: 0, k: 90 },
    p: aPos(260, 130, 250, 140),
    s: { a: 0, k: [100, 100, 100] }, r: { a: 0, k: 0 },
  }));
  return wrap(layers);
}

// ====== HOURGLASS ======
function genHourglass(): object {
  const c: C = [0.9, 0.7, 0.3];
  const layers: object[] = [];
  // Frame
  layers.push(makeLayer(0, [rc(60, 4, 0), fl([0.6, 0.5, 0.3], 70)], {
    o: { a: 0, k: 70 }, p: { a: 0, k: [200, 80, 0] },
    s: { a: 0, k: [100, 100, 100] }, r: { a: 0, k: 0 },
  }));
  layers.push(makeLayer(1, [rc(60, 4, 0), fl([0.6, 0.5, 0.3], 70)], {
    o: { a: 0, k: 70 }, p: { a: 0, k: [200, 220, 0] },
    s: { a: 0, k: [100, 100, 100] }, r: { a: 0, k: 0 },
  }));
  // Upper bulb
  layers.push(makeLayer(2, [el(50), fl(c, 40)], {
    o: { a: 0, k: 40 },
    p: { a: 0, k: [200, 110, 0] },
    s: { a: 1, k: [
      { t: 0, s: [100, 100, 100], i: { x: [.4,.4,.4], y: [1,1,1] }, o: { x: [.6,.6,.6], y: [0,0,0] } },
      { t: 150, s: [100, 30, 100] },
    ]},
    r: { a: 0, k: 0 },
  }));
  // Lower bulb (filling)
  layers.push(makeLayer(3, [el(50), fl(c, 40)], {
    o: { a: 0, k: 40 },
    p: { a: 0, k: [200, 190, 0] },
    s: { a: 1, k: [
      { t: 0, s: [100, 30, 100], i: { x: [.4,.4,.4], y: [1,1,1] }, o: { x: [.6,.6,.6], y: [0,0,0] } },
      { t: 150, s: [100, 100, 100] },
    ]},
    r: { a: 0, k: 0 },
  }));
  // Sand stream
  layers.push(makeLayer(4, [rc(2, 30, 0), fl(c, 60)], {
    o: aOpacity(40, 70),
    p: { a: 0, k: [200, 150, 0] },
    s: { a: 0, k: [100, 100, 100] }, r: { a: 0, k: 0 },
  }));
  // Sand particles
  for (let i = 0; i < 6; i++) {
    layers.push(makeLayer(5 + i, [el(2), fl(c, 70)], {
      o: aOpacity(0, 70),
      p: aPosOneWay(200, 135, 195 + (i % 3) * 5, 185),
      s: { a: 0, k: [100, 100, 100] },
      r: { a: 0, k: 0 },
    }, { st: -(i * 20) }));
  }
  return wrap(layers);
}

// ====== PIANO KEYS ======
function genPianoKeys(): object {
  const layers: object[] = [];
  // White keys
  for (let i = 0; i < 14; i++) {
    const x = 15 + i * 27;
    layers.push(makeLayer(i, [rc(24, 80, 2), fl([0.95, 0.95, 0.9], 70), stk([0.5, 0.5, 0.5], 1, 40)], {
      o: { a: 0, k: 70 },
      p: { a: 0, k: [x, 230, 0] },
      s: { a: 1, k: [
        { t: 0, s: [100, 100, 100], i: { x: [.4,.4,.4], y: [1,1,1] }, o: { x: [.6,.6,.6], y: [0,0,0] } },
        { t: 10 + (i * 7) % 40, s: [100, 95, 100], i: { x: [.4,.4,.4], y: [1,1,1] }, o: { x: [.6,.6,.6], y: [0,0,0] } },
        { t: 20 + (i * 7) % 40, s: [100, 100, 100] },
      ]},
      r: { a: 0, k: 0 },
    }, { st: -(i * 5) }));
  }
  // Black keys
  const blackPositions = [1, 2, 4, 5, 6, 8, 9, 11, 12, 13];
  blackPositions.forEach((pos, i) => {
    const x = 28 + pos * 27;
    layers.push(makeLayer(14 + i, [rc(16, 50, 2), fl([0.1, 0.1, 0.1], 85)], {
      o: { a: 0, k: 85 },
      p: { a: 0, k: [x, 210, 0] },
      s: { a: 1, k: [
        { t: 0, s: [100, 100, 100], i: { x: [.4,.4,.4], y: [1,1,1] }, o: { x: [.6,.6,.6], y: [0,0,0] } },
        { t: 15 + (i * 11) % 40, s: [100, 95, 100], i: { x: [.4,.4,.4], y: [1,1,1] }, o: { x: [.6,.6,.6], y: [0,0,0] } },
        { t: 25 + (i * 11) % 40, s: [100, 100, 100] },
      ]},
      r: { a: 0, k: 0 },
    }, { st: -(i * 7) }));
  });
  return wrap(layers);
}

// ====== CIRCUIT BOARD ======
function genCircuitBoard(): object {
  const c: C = [0, 0.8, 0.4];
  const layers: object[] = [];
  // Traces (horizontal and vertical lines)
  const traces = [
    { x1: 20, y1: 50, x2: 200, y2: 50 },
    { x1: 200, y1: 50, x2: 200, y2: 150 },
    { x1: 200, y1: 150, x2: 350, y2: 150 },
    { x1: 100, y1: 100, x2: 100, y2: 250 },
    { x1: 100, y1: 250, x2: 300, y2: 250 },
    { x1: 300, y1: 150, x2: 300, y2: 250 },
    { x1: 50, y1: 180, x2: 200, y2: 180 },
    { x1: 250, y1: 80, x2: 380, y2: 80 },
  ];
  traces.forEach((t, i) => {
    const isH = t.y1 === t.y2;
    const len = isH ? Math.abs(t.x2 - t.x1) : Math.abs(t.y2 - t.y1);
    const mx = (t.x1 + t.x2) / 2;
    const my = (t.y1 + t.y2) / 2;
    layers.push(makeLayer(i, [rc(isH ? len : 2, isH ? 2 : len, 0), fl(c, 50)], {
      o: { a: 1, k: [
        { t: 0, s: [0], i: { x: [.4], y: [1] }, o: { x: [.6], y: [0] } },
        { t: i * 8 + 5, s: [70], i: { x: [.4], y: [1] }, o: { x: [.6], y: [0] } },
        { t: i * 8 + 20, s: [30], i: { x: [.4], y: [1] }, o: { x: [.6], y: [0] } },
        { t: 150, s: [30] },
      ]},
      p: { a: 0, k: [mx, my, 0] },
      s: { a: 0, k: [100, 100, 100] },
      r: { a: 0, k: 0 },
    }, { st: -(i * 5) }));
  });
  // Nodes (junctions)
  const nodes = [[200, 50], [200, 150], [100, 100], [100, 250], [300, 150], [300, 250]];
  nodes.forEach(([x, y], i) => {
    layers.push(makeLayer(20 + i, [el(8), fl(c, 80)], {
      o: aOpacity(0, 80),
      p: { a: 0, k: [x, y, 0] },
      s: aScale(50, 130),
      r: { a: 0, k: 0 },
    }, { st: -(i * 15) }));
  });
  // Chip
  layers.push(makeLayer(30, [rc(40, 30, 3), fl([0.1, 0.1, 0.1], 70), stk(c, 1, 50)], {
    o: aOpacity(0, 70),
    p: { a: 0, k: [200, 150, 0] },
    s: aScale(80, 110),
    r: { a: 0, k: 0 },
  }));
  return wrap(layers);
}

// ====== PIXEL RAIN (8-bit style) ======
function genPixelRain(): object {
  const c: C[] = [[0, 1, 0.5], [0, 0.8, 1], [1, 0.5, 0], [1, 0, 0.5]];
  const layers = Array.from({ length: 25 }, (_, i) => {
    const col = c[i % c.length];
    const x = (i * 33) % 400;
    const size = 6 + (i % 3) * 4;
    return makeLayer(i, [rc(size, size, 0), fl(col, 75)], {
      o: aOpacity(0, 80),
      p: aPosOneWay(x, -10, x, 310),
      s: { a: 0, k: [100, 100, 100] },
      r: { a: 0, k: 0 },
    }, { st: -(i * 5) });
  });
  return wrap(layers);
}

// ====== ELECTRIC WAVES ======
function genElectricWaves(): object {
  const c: C[] = [[0, 0.6, 1], [0.3, 0.8, 1], [0, 0.4, 0.8]];
  const layers: object[] = [];
  for (let wave = 0; wave < 5; wave++) {
    const col = c[wave % c.length];
    const segments = 15;
    for (let s = 0; s < segments; s++) {
      const x = s * (400 / segments) + 13;
      const y = 80 + wave * 40;
      const zigY = s % 2 === 0 ? y - 15 : y + 15;
      layers.push(makeLayer(wave * segments + s, [rc(2, 20, 0), fl(col, 60)], {
        o: { a: 1, k: [
          { t: 0, s: [0], i: { x: [.4], y: [1] }, o: { x: [.6], y: [0] } },
          { t: s * 2 + wave * 5, s: [80], i: { x: [.4], y: [1] }, o: { x: [.6], y: [0] } },
          { t: s * 2 + wave * 5 + 10, s: [0] },
        ]},
        p: { a: 0, k: [x, zigY, 0] },
        s: { a: 0, k: [100, 100, 100] },
        r: { a: 0, k: s % 2 === 0 ? 30 : -30 },
      }, { st: -(wave * 20) }));
    }
  }
  return wrap(layers);
}

export function genMoreBackgrounds(): Record<string, () => object> {
  return {
    "balloons-1": genBalloons,
    "gears-1": genGears,
    "blossoms-1": genBlossoms,
    "butterflies-1": genButterflies,
    "paint-splatter-1": genPaintSplatter,
    "film-strip-1": genFilmStrip,
    "pendulum-1": genPendulum,
    "spinner-1": genSpinner,
    "shooting-stars-1": genShootingStars,
    "ocean-waves-1": genOceanWaves,
    "rainbow-1": genRainbow,
    "bass-drop-1": genBassDrop,
    "dice-1": genDice,
    "sparkle-trail-1": genSparkleTrail,
    "building-blocks-1": genBuildingBlocks,
    "countdown-1": genCountdown,
    "crystal-ball-1": genCrystalBall,
    "moon-phases-1": genMoonPhases,
    "theater-masks-1": genTheaterMasks,
    "hourglass-1": genHourglass,
    "piano-keys-1": genPianoKeys,
    "circuit-board-1": genCircuitBoard,
    "pixel-rain-1": genPixelRain,
    "electric-waves-1": genElectricWaves,
  };
}
