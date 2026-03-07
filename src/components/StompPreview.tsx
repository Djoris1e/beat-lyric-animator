import { useEffect, useRef, useState, useCallback } from "react";
import { Beat } from "@/lib/beatDetection";
import { PALETTES, ColorPalette } from "@/components/StyleControls";
import { Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StompWord {
  text: string;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  color: string;
  fontSize: number;
  opacity: number;
  birth: number;
}

interface StompPreviewProps {
  audioBuffer: AudioBuffer | null;
  beats: Beat[];
  words: string[];
  palette: ColorPalette;
  intensity: number;
}

export function StompPreview({
  audioBuffer,
  beats,
  words,
  palette,
  intensity,
}: StompPreviewProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [activeWords, setActiveWords] = useState<StompWord[]>([]);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const startTimeRef = useRef(0);
  const rafRef = useRef<number>(0);
  const lastBeatIndexRef = useRef(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  const colors = PALETTES[palette];

  const spawnWord = useCallback(
    (text: string, time: number) => {
      const maxRot = 25 * intensity;
      const baseSize = 48 + Math.random() * 48 * intensity;
      setActiveWords((prev) => [
        ...prev,
        {
          text,
          x: 10 + Math.random() * 75,
          y: 10 + Math.random() * 70,
          rotation: (Math.random() - 0.5) * 2 * maxRot,
          scale: 0.5 + Math.random() * 1.5 * intensity,
          color: colors[Math.floor(Math.random() * colors.length)],
          fontSize: baseSize,
          opacity: 1,
          birth: time,
        },
      ]);
    },
    [colors, intensity]
  );

  const tick = useCallback(() => {
    if (!audioCtxRef.current || !isPlaying) return;
    const elapsed = audioCtxRef.current.currentTime - startTimeRef.current;
    setCurrentTime(elapsed);

    // Check for beats
    for (let i = lastBeatIndexRef.current + 1; i < beats.length; i++) {
      if (beats[i].time <= elapsed) {
        const wordIndex = i % (words.length || 1);
        const word = words[wordIndex] || "STOMP";
        spawnWord(word, elapsed);
        lastBeatIndexRef.current = i;
      } else {
        break;
      }
    }

    // Fade out old words
    setActiveWords((prev) =>
      prev
        .map((w) => ({
          ...w,
          opacity: Math.max(0, 1 - (elapsed - w.birth) / 4),
        }))
        .filter((w) => w.opacity > 0)
    );

    rafRef.current = requestAnimationFrame(tick);
  }, [isPlaying, beats, words, spawnWord]);

  const play = useCallback(() => {
    if (!audioBuffer) return;
    const ctx = new AudioContext();
    audioCtxRef.current = ctx;
    const source = ctx.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(ctx.destination);
    source.start(0);
    sourceRef.current = source;
    startTimeRef.current = ctx.currentTime;
    lastBeatIndexRef.current = -1;
    setActiveWords([]);
    setIsPlaying(true);

    source.onended = () => {
      setIsPlaying(false);
    };
  }, [audioBuffer]);

  const stop = useCallback(() => {
    sourceRef.current?.stop();
    setIsPlaying(false);
    cancelAnimationFrame(rafRef.current);
  }, []);

  const reset = useCallback(() => {
    stop();
    setActiveWords([]);
    setCurrentTime(0);
    lastBeatIndexRef.current = -1;
  }, [stop]);

  useEffect(() => {
    if (isPlaying) {
      rafRef.current = requestAnimationFrame(tick);
    }
    return () => cancelAnimationFrame(rafRef.current);
  }, [isPlaying, tick]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      sourceRef.current?.stop();
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const duration = audioBuffer?.duration || 0;
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="flex flex-col h-full">
      {/* Preview area */}
      <div
        ref={containerRef}
        className="relative flex-1 bg-background rounded-lg overflow-hidden min-h-[400px]"
        style={{ backgroundColor: "hsl(0, 0%, 2%)" }}
      >
        {activeWords.map((w, i) => (
          <div
            key={`${i}-${w.birth}`}
            className="absolute font-display select-none pointer-events-none"
            style={{
              left: `${w.x}%`,
              top: `${w.y}%`,
              transform: `rotate(${w.rotation}deg) scale(${w.scale})`,
              color: w.color,
              fontSize: `${w.fontSize}px`,
              opacity: w.opacity,
              textShadow: `0 0 ${20 * intensity}px ${w.color}`,
              transition: "opacity 0.5s ease-out",
              animation: "stomp-in 0.15s cubic-bezier(0.22, 1, 0.36, 1)",
              lineHeight: 1,
              letterSpacing: "0.05em",
            }}
          >
            {w.text}
          </div>
        ))}

        {!audioBuffer && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-muted-foreground text-lg">
              Upload a track to get started
            </p>
          </div>
        )}

        {audioBuffer && !isPlaying && activeWords.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={play}
              className="w-20 h-20 rounded-full bg-primary/20 hover:bg-primary/30 border-2 border-primary flex items-center justify-center transition-all hover:scale-110"
            >
              <Play className="w-8 h-8 text-primary ml-1" />
            </button>
          </div>
        )}
      </div>

      {/* Transport bar */}
      <div className="flex items-center gap-3 pt-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={isPlaying ? stop : play}
          disabled={!audioBuffer}
          className="text-foreground"
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={reset}
          disabled={!audioBuffer}
          className="text-foreground"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>

        {/* Progress bar */}
        <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-[width] duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>

        <span className="text-xs text-muted-foreground tabular-nums min-w-[70px] text-right">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
      </div>

      {/* Beat count */}
      {beats.length > 0 && (
        <p className="text-xs text-muted-foreground mt-1">
          {beats.length} beats detected
        </p>
      )}
    </div>
  );
}

function formatTime(s: number): string {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}
