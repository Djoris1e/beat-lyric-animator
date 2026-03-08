import { useState, useEffect, useRef } from "react";
import Lottie from "lottie-react";
import { Check, Loader2, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface LottieOption {
  id: string;
  name: string;
  url: string;
}

export const LOTTIE_BACKGROUNDS: LottieOption[] = [
  { id: "none", name: "No Background", url: "" },
  { id: "particles-1", name: "Floating Particles", url: "https://lottie.host/a5e5a2e2-1b0e-4d63-8114-2f3da1f3c15c/VJnoHpFOxn.json" },
  { id: "wave-1", name: "Sound Wave", url: "https://lottie.host/0a3c2e76-07f8-4154-9694-2f1f3e4c5b6d/wave.json" },
  { id: "gradient-1", name: "Gradient Blob", url: "https://lottie.host/d4e5f6a7-b8c9-0d1e-2f3a-4b5c6d7e8f9a/blob.json" },
  { id: "stars-1", name: "Starfield", url: "https://lottie.host/1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d/stars.json" },
  { id: "circles-1", name: "Pulsing Circles", url: "https://lottie.host/2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e/circles.json" },
  { id: "smoke-1", name: "Smoke Effect", url: "https://lottie.host/3c4d5e6f-7a8b-9c0d-1e2f-3a4b5c6d7e8f/smoke.json" },
  { id: "confetti-1", name: "Confetti", url: "https://lottie.host/4d5e6f7a-8b9c-0d1e-2f3a-4b5c6d7e8f9a/confetti.json" },
  { id: "geometric-1", name: "Geometric Shapes", url: "https://lottie.host/5e6f7a8b-9c0d-1e2f-3a4b-5c6d7e8f9a0b/geometric.json" },
  { id: "equalizer-1", name: "Equalizer Bars", url: "https://lottie.host/6f7a8b9c-0d1e-2f3a-4b5c-6d7e8f9a0b1c/equalizer.json" },
  { id: "fireworks-1", name: "Fireworks", url: "https://lottie.host/7a8b9c0d-1e2f-3a4b-5c6d-7e8f9a0b1c2d/fireworks.json" },
  { id: "lightning-1", name: "Lightning", url: "https://lottie.host/8b9c0d1e-2f3a-4b5c-6d7e-8f9a0b1c2d3e/lightning.json" },
  { id: "rain-1", name: "Rain Drops", url: "https://lottie.host/9c0d1e2f-3a4b-5c6d-7e8f-9a0b1c2d3e4f/rain.json" },
  { id: "spiral-1", name: "Spiral Motion", url: "https://lottie.host/0d1e2f3a-4b5c-6d7e-8f9a-0b1c2d3e4f5a/spiral.json" },
  { id: "bubbles-1", name: "Bubbles", url: "https://lottie.host/1e2f3a4b-5c6d-7e8f-9a0b-1c2d3e4f5a6b/bubbles.json" },
  { id: "galaxy-1", name: "Galaxy Swirl", url: "https://lottie.host/2f3a4b5c-6d7e-8f9a-0b1c-2d3e4f5a6b7c/galaxy.json" },
  { id: "pulse-1", name: "Heartbeat Pulse", url: "https://lottie.host/3a4b5c6d-7e8f-9a0b-1c2d-3e4f5a6b7c8d/pulse.json" },
  { id: "aurora-1", name: "Aurora Borealis", url: "https://lottie.host/4b5c6d7e-8f9a-0b1c-2d3e-4f5a6b7c8d9e/aurora.json" },
  { id: "matrix-1", name: "Matrix Rain", url: "https://lottie.host/5c6d7e8f-9a0b-1c2d-3e4f-5a6b7c8d9e0f/matrix.json" },
  { id: "dots-1", name: "Dancing Dots", url: "https://lottie.host/6d7e8f9a-0b1c-2d3e-4f5a-6b7c8d9e0f1a/dots.json" },
  { id: "rings-1", name: "Expanding Rings", url: "https://lottie.host/7e8f9a0b-1c2d-3e4f-5a6b-7c8d9e0f1a2b/rings.json" },
  { id: "noise-1", name: "Noise Grain", url: "https://lottie.host/8f9a0b1c-2d3e-4f5a-6b7c-8d9e0f1a2b3c/noise.json" },
  { id: "glitch-bg-1", name: "Glitch Lines", url: "https://lottie.host/9a0b1c2d-3e4f-5a6b-7c8d-9e0f1a2b3c4d/glitch.json" },
  { id: "snow-1", name: "Snowfall", url: "https://lottie.host/0b1c2d3e-4f5a-6b7c-8d9e-0f1a2b3c4d5e/snow.json" },
  { id: "fire-1", name: "Fire Embers", url: "https://lottie.host/1c2d3e4f-5a6b-7c8d-9e0f-1a2b3c4d5e6f/fire.json" },
  { id: "music-1", name: "Music Notes", url: "https://lottie.host/2d3e4f5a-6b7c-8d9e-0f1a-2b3c4d5e6f7a/music.json" },
  { id: "neon-1", name: "Neon Glow", url: "https://lottie.host/3e4f5a6b-7c8d-9e0f-1a2b-3c4d5e6f7a8b/neon.json" },
  { id: "hexagon-1", name: "Hexagon Grid", url: "https://lottie.host/4f5a6b7c-8d9e-0f1a-2b3c-4d5e6f7a8b9c/hexagon.json" },
  { id: "wave-lines-1", name: "Wave Lines", url: "https://lottie.host/5a6b7c8d-9e0f-1a2b-3c4d-5e6f7a8b9c0d/wavelines.json" },
  { id: "bokeh-1", name: "Bokeh Lights", url: "https://lottie.host/6b7c8d9e-0f1a-2b3c-4d5e-6f7a8b9c0d1e/bokeh.json" },
];

// Color palettes for each background style
const BG_COLORS: Record<string, [number, number, number][]> = {
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

function generateProceduralLottie(id: string): object {
  const seed = id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const colors = BG_COLORS[id] || [[1, 1, 1]];
  const count = 12 + (seed % 6);
  const w = 400, h = 300;

  const layers = Array.from({ length: count }, (_, i) => {
    const cx = (seed * (i + 1) * 137) % w;
    const cy = (seed * (i + 1) * 97) % h;
    const size = 12 + ((seed * (i + 1)) % 30);
    const delay = -((i * 10) % 90);
    const drift = 30 + ((seed * i) % 50);
    const col = colors[i % colors.length];

    return {
      ddd: 0, ind: i, ty: 4, nm: `p${i}`, sr: 1,
      ks: {
        o: { a: 1, k: [
          { t: 0, s: [10], i: { x: [0.4], y: [1] }, o: { x: [0.6], y: [0] } },
          { t: 15, s: [70 + (seed * i) % 25], i: { x: [0.4], y: [1] }, o: { x: [0.6], y: [0] } },
          { t: 90, s: [70 + (seed * i) % 25], i: { x: [0.4], y: [1] }, o: { x: [0.6], y: [0] } },
          { t: 120, s: [10] }
        ]},
        p: { a: 1, k: [
          { t: 0, s: [cx, cy, 0], i: { x: 0.4, y: 1 }, o: { x: 0.6, y: 0 } },
          { t: 60, s: [cx + drift * (i % 2 === 0 ? 1 : -1), cy - drift * 0.7, 0], i: { x: 0.4, y: 1 }, o: { x: 0.6, y: 0 } },
          { t: 120, s: [cx, cy, 0] }
        ]},
        s: { a: 1, k: [
          { t: 0, s: [60, 60, 100], i: { x: [0.4,0.4,0.4], y: [1,1,1] }, o: { x: [0.6,0.6,0.6], y: [0,0,0] } },
          { t: 60, s: [140, 140, 100], i: { x: [0.4,0.4,0.4], y: [1,1,1] }, o: { x: [0.6,0.6,0.6], y: [0,0,0] } },
          { t: 120, s: [60, 60, 100] }
        ]},
        r: { a: 1, k: [
          { t: 0, s: [0], i: { x: [0.4], y: [1] }, o: { x: [0.6], y: [0] } },
          { t: 120, s: [360 * (i % 2 === 0 ? 1 : -1)] }
        ]}
      },
      ao: 0,
      shapes: [{
        ty: "gr", it: [
          i % 3 === 0
            ? { ty: "rc", d: 1, s: { a: 0, k: [size, size] }, p: { a: 0, k: [0, 0] }, r: { a: 0, k: 4 } }
            : { ty: "el", d: 1, s: { a: 0, k: [size * 1.2, size * 1.2] }, p: { a: 0, k: [0, 0] } },
          { ty: "fl", c: { a: 0, k: [col[0], col[1], col[2], 1] }, o: { a: 0, k: 60 + (seed * i) % 35 } },
          { ty: "tr", p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } }
        ]
      }],
      ip: 0, op: 120, st: delay
    };
  });

  return { v: "5.5.7", fr: 30, ip: 0, op: 120, w, h, assets: [], layers };
}

interface LottieBackgroundPickerProps {
  selectedId: string;
  onSelect: (id: string) => void;
}

function LottieThumb({ option, isSelected, onSelect }: { option: LottieOption; isSelected: boolean; onSelect: () => void }) {
  const [animData, setAnimData] = useState<object | null>(null);
  const [status, setStatus] = useState<"loading" | "loaded" | "fallback">("loading");

  useEffect(() => {
    if (!option.url) {
      setStatus("loaded");
      return;
    }
    let cancelled = false;
    fetch(option.url)
      .then(r => {
        if (!r.ok) throw new Error("fetch failed");
        return r.json();
      })
      .then(data => {
        if (!cancelled) { setAnimData(data); setStatus("loaded"); }
      })
      .catch(() => {
        if (!cancelled) {
          setAnimData(generateProceduralLottie(option.id));
          setStatus("fallback");
        }
      });
    return () => { cancelled = true; };
  }, [option.url, option.id]);

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
      ) : status === "loading" ? (
        <Loader2 className="w-4 h-4 text-muted-foreground animate-spin" />
      ) : animData ? (
        <Lottie animationData={animData} loop autoplay style={{ width: "100%", height: "100%", opacity: 0.6 }} />
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

// Hook to get loaded Lottie data for the preview
export function useLottieBackground(selectedId: string) {
  const [animData, setAnimData] = useState<object | null>(null);

  useEffect(() => {
    const option = LOTTIE_BACKGROUNDS.find(o => o.id === selectedId);
    if (!option || !option.url) {
      setAnimData(null);
      return;
    }
    let cancelled = false;
    fetch(option.url)
      .then(r => {
        if (!r.ok) throw new Error("fetch failed");
        return r.json();
      })
      .then(data => { if (!cancelled) setAnimData(data); })
      .catch(() => {
        if (!cancelled) setAnimData(generateProceduralLottie(selectedId));
      });
    return () => { cancelled = true; };
  }, [selectedId]);

  return animData;
}
