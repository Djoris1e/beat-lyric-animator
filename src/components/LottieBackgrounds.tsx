import { useState, useEffect, useMemo } from "react";
import Lottie from "lottie-react";
import { Check, X, Search } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { genOriginalBackgrounds } from "@/lib/lottie/originalGenerators";
import { genNewBackgrounds } from "@/lib/lottie/newGenerators";
import { genMoreBackgrounds } from "@/lib/lottie/moreGenerators";

export interface LottieOption {
  id: string;
  name: string;
  category?: string;
}

export const LOTTIE_BACKGROUNDS: LottieOption[] = [
  { id: "none", name: "No Background", category: "All" },
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
  // Dynamic
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
  // Illustrations & Creative
  { id: "balloons-1", name: "🎈 Balloons Rising", category: "Illustration" },
  { id: "gears-1", name: "⚙️ Gears Turning", category: "Illustration" },
  { id: "blossoms-1", name: "🌸 Cherry Blossoms", category: "Nature" },
  { id: "butterflies-1", name: "🦋 Butterflies", category: "Illustration" },
  { id: "paint-splatter-1", name: "🎨 Paint Splatter", category: "Effects" },
  { id: "film-strip-1", name: "🎬 Film Strip", category: "Illustration" },
  { id: "pendulum-1", name: "🎪 Pendulum", category: "Dynamic" },
  { id: "spinner-1", name: "📱 Loading Spinner", category: "Tech" },
  { id: "shooting-stars-1", name: "⭐ Shooting Stars", category: "Space" },
  { id: "ocean-waves-1", name: "🌊 Ocean Waves", category: "Nature" },
  { id: "rainbow-1", name: "🌈 Rainbow Arc", category: "Effects" },
  { id: "bass-drop-1", name: "🔊 Bass Drop", category: "Audio" },
  { id: "dice-1", name: "🎲 Rolling Dice", category: "Illustration" },
  { id: "sparkle-trail-1", name: "💫 Sparkle Trail", category: "Effects" },
  { id: "building-blocks-1", name: "🏗️ Building Blocks", category: "Illustration" },
  { id: "countdown-1", name: "⏱️ Countdown Timer", category: "Dynamic" },
  { id: "crystal-ball-1", name: "🔮 Crystal Ball", category: "Illustration" },
  { id: "moon-phases-1", name: "🌙 Moon Phases", category: "Space" },
  { id: "theater-masks-1", name: "🎭 Theater Masks", category: "Illustration" },
  { id: "hourglass-1", name: "⏳ Hourglass", category: "Illustration" },
  { id: "piano-keys-1", name: "🎹 Piano Keys", category: "Audio" },
  { id: "circuit-board-1", name: "🔌 Circuit Board", category: "Tech" },
  { id: "pixel-rain-1", name: "👾 Pixel Rain", category: "Effects" },
  { id: "electric-waves-1", name: "⚡ Electric Waves", category: "Effects" },
];

const ALL_CATEGORIES = [
  "All", "Dynamic", "Illustration", "Effects", "Audio", "Nature",
  "Space", "Tech", "Shapes", "Particles", "Abstract", "Celebration",
];

// Cache generated data
const lottieCache = new Map<string, object>();

const allGenerators: Record<string, () => object> = {};

function initGenerators() {
  if (Object.keys(allGenerators).length > 0) return;
  const orig = genOriginalBackgrounds();
  const news = genNewBackgrounds();
  const more = genMoreBackgrounds();
  Object.assign(allGenerators, orig, news, more);
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
      style={{ backgroundColor: "hsl(0, 0%, 8%)" }}
    >
      {option.id === "none" ? (
        <X className="w-5 h-5 text-muted-foreground" />
      ) : animData ? (
        <Lottie animationData={animData} loop autoplay style={{ width: "100%", height: "100%", opacity: 1 }} />
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
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBackgrounds = useMemo(() => {
    return LOTTIE_BACKGROUNDS.filter((opt) => {
      const matchesCategory = activeCategory === "All" || opt.category === activeCategory || opt.id === "none";
      const matchesSearch = !searchQuery || opt.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="space-y-3">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search animations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-8 pr-3 py-1.5 text-sm bg-muted/50 border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Category chips */}
      <div className="flex flex-wrap gap-1.5">
        {ALL_CATEGORIES.map((cat) => {
          const count = cat === "All"
            ? LOTTIE_BACKGROUNDS.length
            : LOTTIE_BACKGROUNDS.filter((b) => b.category === cat).length;
          if (count === 0 && cat !== "All") return null;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-2.5 py-1 text-xs rounded-full transition-colors ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {cat} <span className="opacity-60">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <ScrollArea className="h-[350px] pr-2">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2">
          {filteredBackgrounds.map((opt) => (
            <LottieThumb
              key={opt.id}
              option={opt}
              isSelected={selectedId === opt.id}
              onSelect={() => onSelect(opt.id)}
            />
          ))}
        </div>
        {filteredBackgrounds.length === 0 && (
          <p className="text-center text-sm text-muted-foreground py-8">No animations found</p>
        )}
      </ScrollArea>
    </div>
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
