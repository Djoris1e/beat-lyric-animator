import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import { Check, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { genOriginalBackgrounds } from "@/lib/lottie/originalGenerators";
import { genNewBackgrounds } from "@/lib/lottie/newGenerators";

export interface LottieOption {
  id: string;
  name: string;
  category?: string;
}

export const LOTTIE_BACKGROUNDS: LottieOption[] = [
  { id: "none", name: "No Background", category: "Basic" },
  // Original
  { id: "particles-1", name: "Floating Particles", category: "Particles" },
  { id: "wave-1", name: "Sound Wave", category: "Audio" },
  { id: "gradient-1", name: "Gradient Blob", category: "Abstract" },
  { id: "stars-1", name: "Starfield", category: "Space" },
  { id: "circles-1", name: "Pulsing Circles", category: "Shapes" },
  { id: "smoke-1", name: "Smoke Effect", category: "Nature" },
  { id: "confetti-1", name: "Confetti", category: "Celebration" },
  { id: "geometric-1", name: "Geometric Shapes", category: "Shapes" },
  { id: "equalizer-1", name: "Equalizer Bars", category: "Audio" },
  { id: "fireworks-1", name: "Fireworks", category: "Celebration" },
  { id: "lightning-1", name: "Lightning", category: "Nature" },
  { id: "rain-1", name: "Rain Drops", category: "Nature" },
  { id: "spiral-1", name: "Spiral Motion", category: "Abstract" },
  { id: "bubbles-1", name: "Bubbles", category: "Nature" },
  { id: "galaxy-1", name: "Galaxy Swirl", category: "Space" },
  { id: "pulse-1", name: "Heartbeat Pulse", category: "Audio" },
  { id: "aurora-1", name: "Aurora Borealis", category: "Nature" },
  { id: "matrix-1", name: "Matrix Rain", category: "Tech" },
  { id: "dots-1", name: "Dancing Dots", category: "Particles" },
  { id: "rings-1", name: "Expanding Rings", category: "Shapes" },
  { id: "noise-1", name: "Noise Grain", category: "Abstract" },
  { id: "glitch-bg-1", name: "Glitch Lines", category: "Tech" },
  { id: "snow-1", name: "Snowfall", category: "Nature" },
  { id: "fire-1", name: "Fire Embers", category: "Nature" },
  { id: "music-1", name: "Music Notes", category: "Audio" },
  { id: "neon-1", name: "Neon Glow", category: "Tech" },
  { id: "hexagon-1", name: "Hexagon Grid", category: "Shapes" },
  { id: "wave-lines-1", name: "Wave Lines", category: "Abstract" },
  { id: "bokeh-1", name: "Bokeh Lights", category: "Particles" },
  // NEW — Dynamic / Video-like
  { id: "rockets-1", name: "🚀 Flying Rockets", category: "Dynamic" },
  { id: "counter-1", name: "🔢 Counter Blocks", category: "Dynamic" },
  { id: "arrows-1", name: "⬆ Rising Arrows", category: "Dynamic" },
  { id: "diamonds-1", name: "💎 Spinning Diamonds", category: "Dynamic" },
  { id: "dna-1", name: "🧬 DNA Helix", category: "Dynamic" },
  { id: "meteor-1", name: "☄️ Meteor Shower", category: "Space" },
  { id: "heartbeat-1", name: "💓 Heart Monitor", category: "Dynamic" },
  { id: "bounce-1", name: "🏀 Bouncing Balls", category: "Dynamic" },
  { id: "tornado-1", name: "🌪 Tornado Spin", category: "Nature" },
  { id: "clock-1", name: "⏰ Clock Hands", category: "Dynamic" },
  { id: "scanlines-1", name: "📺 Retro Scanlines", category: "Tech" },
  { id: "crosshair-1", name: "🎯 Target Lock", category: "Dynamic" },
  { id: "warp-1", name: "🌀 Warp Speed", category: "Space" },
  { id: "radar-1", name: "📡 Radar Sweep", category: "Tech" },
  { id: "explosion-1", name: "💥 Explosion", category: "Dynamic" },
  { id: "energy-1", name: "⚡ Energy Field", category: "Dynamic" },
  { id: "vinyl-1", name: "💿 Vinyl Spin", category: "Audio" },
  { id: "rain-heavy-1", name: "🌧 Heavy Rain", category: "Nature" },
  { id: "grid-pulse-1", name: "📊 Grid Pulse", category: "Tech" },
  { id: "orbit-1", name: "🪐 Orbital", category: "Space" },
  { id: "flames-1", name: "🔥 Flame Wall", category: "Nature" },
  { id: "laser-1", name: "✨ Laser Beams", category: "Dynamic" },
];

// Cache generated data
const lottieCache = new Map<string, object>();

const allGenerators: Record<string, () => object> = {};

// Lazy-init generators
function initGenerators() {
  if (Object.keys(allGenerators).length > 0) return;
  const orig = genOriginalBackgrounds();
  const news = genNewBackgrounds();
  Object.assign(allGenerators, orig, news);
}

function getLottieData(id: string): object | null {
  if (id === "none") return null;
  if (lottieCache.has(id)) return lottieCache.get(id)!;
  initGenerators();
  const gen = allGenerators[id];
  if (gen) {
    const data = gen();
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
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
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
