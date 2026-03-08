export type C = [number, number, number];

export function makeLayer(
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

export function wrap(layers: object[]) {
  return { v: "5.5.7", fr: 30, ip: 0, op: 150, w: 400, h: 300, assets: [], layers };
}

export const el = (s: number) => ({ ty: "el" as const, d: 1, s: { a: 0, k: [s, s] }, p: { a: 0, k: [0, 0] } });
export const rc = (w: number, h: number, r = 0) => ({ ty: "rc" as const, d: 1, s: { a: 0, k: [w, h] }, p: { a: 0, k: [0, 0] }, r: { a: 0, k: r } });
export const fl = (c: C, o = 80) => ({ ty: "fl" as const, c: { a: 0, k: [...c, 1] }, o: { a: 0, k: o } });
export const stk = (c: C, w = 2, o = 80) => ({ ty: "st" as const, c: { a: 0, k: [...c, 1] }, o: { a: 0, k: o }, w: { a: 0, k: w }, lc: 2, lj: 2 });

export function aPos(x1: number, y1: number, x2: number, y2: number, dur = 150) {
  return { a: 1, k: [
    { t: 0, s: [x1, y1, 0], i: { x: 0.4, y: 1 }, o: { x: 0.6, y: 0 } },
    { t: dur / 2, s: [x2, y2, 0], i: { x: 0.4, y: 1 }, o: { x: 0.6, y: 0 } },
    { t: dur, s: [x1, y1, 0] },
  ]};
}

export function aScale(s1: number, s2: number, dur = 150) {
  return { a: 1, k: [
    { t: 0, s: [s1, s1, 100], i: { x: [0.4,0.4,0.4], y: [1,1,1] }, o: { x: [0.6,0.6,0.6], y: [0,0,0] } },
    { t: dur / 2, s: [s2, s2, 100], i: { x: [0.4,0.4,0.4], y: [1,1,1] }, o: { x: [0.6,0.6,0.6], y: [0,0,0] } },
    { t: dur, s: [s1, s1, 100] },
  ]};
}

export function aOpacity(o1: number, o2: number, dur = 150) {
  return { a: 1, k: [
    { t: 0, s: [o1], i: { x: [0.4], y: [1] }, o: { x: [0.6], y: [0] } },
    { t: dur / 2, s: [o2], i: { x: [0.4], y: [1] }, o: { x: [0.6], y: [0] } },
    { t: dur, s: [o1] },
  ]};
}

export function aRotate(deg: number, dur = 150) {
  return { a: 1, k: [
    { t: 0, s: [0], i: { x: [0.4], y: [1] }, o: { x: [0.6], y: [0] } },
    { t: dur, s: [deg] },
  ]};
}

// One-way position (no bounce back)
export function aPosOneWay(x1: number, y1: number, x2: number, y2: number, dur = 150) {
  return { a: 1, k: [
    { t: 0, s: [x1, y1, 0], i: { x: 0.4, y: 1 }, o: { x: 0.6, y: 0 } },
    { t: dur, s: [x2, y2, 0] },
  ]};
}
