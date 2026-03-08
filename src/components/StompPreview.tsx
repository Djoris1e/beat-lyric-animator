import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { Beat } from "@/lib/beatDetection";
import { ColorPalette } from "@/components/StyleControls";
import { Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import { TextEffect } from "@/components/StyleControls";

// Inline Lottie animation data - abstract particles/waves
const particlesLottie = {
  v: "5.5.7", fr: 30, ip: 0, op: 120, w: 800, h: 600,
  assets: [],
  layers: [
    ...Array.from({ length: 12 }, (_, i) => ({
      ddd: 0, ind: i, ty: 4, nm: `particle_${i}`,
      sr: 1, ks: {
        o: { a: 1, k: [
          { t: 0, s: [0], i: { x: [0.4], y: [1] }, o: { x: [0.6], y: [0] } },
          { t: 30, s: [40 + Math.random() * 30], i: { x: [0.4], y: [1] }, o: { x: [0.6], y: [0] } },
          { t: 90, s: [40 + Math.random() * 30], i: { x: [0.4], y: [1] }, o: { x: [0.6], y: [0] } },
          { t: 120, s: [0] }
        ] },
        r: { a: 1, k: [
          { t: 0, s: [0], i: { x: [0.4], y: [1] }, o: { x: [0.6], y: [0] } },
          { t: 120, s: [360 * (Math.random() > 0.5 ? 1 : -1)] }
        ] },
        p: { a: 1, k: [
          { t: 0, s: [100 + Math.random() * 600, 100 + Math.random() * 400, 0], i: { x: 0.4, y: 1 }, o: { x: 0.6, y: 0 } },
          { t: 120, s: [100 + Math.random() * 600, 100 + Math.random() * 400, 0] }
        ] },
        s: { a: 1, k: [
          { t: 0, s: [0, 0, 100], i: { x: [0.4, 0.4, 0.4], y: [1, 1, 1] }, o: { x: [0.6, 0.6, 0.6], y: [0, 0, 0] } },
          { t: 30, s: [100, 100, 100], i: { x: [0.4, 0.4, 0.4], y: [1, 1, 1] }, o: { x: [0.6, 0.6, 0.6], y: [0, 0, 0] } },
          { t: 90, s: [100, 100, 100], i: { x: [0.4, 0.4, 0.4], y: [1, 1, 1] }, o: { x: [0.6, 0.6, 0.6], y: [0, 0, 0] } },
          { t: 120, s: [0, 0, 100] }
        ] }
      },
      ao: 0, shapes: [{
        ty: "gr", it: [
          { ty: "el", d: 1, s: { a: 0, k: [8 + Math.random() * 16, 8 + Math.random() * 16] }, p: { a: 0, k: [0, 0] } },
          { ty: "fl", c: { a: 0, k: [1, 1, 1, 1] }, o: { a: 0, k: 20 + Math.random() * 30 } },
          { ty: "tr", p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } }
        ]
      }],
      ip: 0, op: 120, st: Math.random() * -60
    }))
  ]
};

interface ActiveWord {
  text: string;
  birth: number;
  duration: number;
  effect: TextEffect;
}

const textVariants: Record<TextEffect, {
  initial: object;
  animate: object;
  exit: object;
}> = {
  float: {
    initial: { opacity: 0, scale: 0.5, y: 30 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.8, y: -30 },
  },
  stomp: {
    initial: { opacity: 0, scale: 3, rotate: -10 },
    animate: { opacity: 1, scale: 1, rotate: 0 },
    exit: { opacity: 0, scale: 0.5 },
  },
  glitch: {
    initial: { opacity: 0, x: -40, skewX: 20 },
    animate: { opacity: 1, x: 0, skewX: 0 },
    exit: { opacity: 0, x: 40, skewX: -20 },
  },
  typewriter: {
    initial: { opacity: 0, width: 0 },
    animate: { opacity: 1, width: "auto" },
    exit: { opacity: 0, width: 0 },
  },
  elastic: {
    initial: { opacity: 0, scaleX: 0, scaleY: 2 },
    animate: { opacity: 1, scaleX: 1, scaleY: 1 },
    exit: { opacity: 0, scaleY: 0, scaleX: 2 },
  },
  flip: {
    initial: { opacity: 0, rotateX: 90 },
    animate: { opacity: 1, rotateX: 0 },
    exit: { opacity: 0, rotateX: -90 },
  },
  blur: {
    initial: { opacity: 0, filter: "blur(20px)", scale: 1.2 },
    animate: { opacity: 1, filter: "blur(0px)", scale: 1 },
    exit: { opacity: 0, filter: "blur(20px)", scale: 0.8 },
  },
  wave: {
    initial: { opacity: 0, y: 60, rotate: -5 },
    animate: { opacity: 1, y: 0, rotate: 0 },
    exit: { opacity: 0, y: -60, rotate: 5 },
  },
};

interface StompPreviewProps {
  audioBuffer: AudioBuffer | null;
  beats: Beat[];
  words: string[];
  palette: ColorPalette;
  intensity: number;
  textEffect: TextEffect;
}

export function StompPreview({
  audioBuffer,
  beats,
  words,
  intensity,
  textEffect,
}: StompPreviewProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [activeWord, setActiveWord] = useState<ActiveWord | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const startTimeRef = useRef(0);
  const rafRef = useRef<number>(0);
  const lastBeatIndexRef = useRef(-1);

  const tick = useCallback(() => {
    if (!audioCtxRef.current || !isPlaying) return;
    const elapsed = audioCtxRef.current.currentTime - startTimeRef.current;
    setCurrentTime(elapsed);

    for (let i = lastBeatIndexRef.current + 1; i < beats.length; i++) {
      if (beats[i].time <= elapsed) {
        const wordIndex = i % (words.length || 1);
        const word = words[wordIndex] || "STOMP";
        const nextBeatTime = i + 1 < beats.length ? beats[i + 1].time : beats[i].time + 1;
        const duration = nextBeatTime - beats[i].time;
        setActiveWord({ text: word, birth: elapsed, duration, effect: textEffect });
        lastBeatIndexRef.current = i;
      } else {
        break;
      }
    }

    setActiveWord((prev) => {
      if (prev && elapsed - prev.birth > prev.duration) return null;
      return prev;
    });

    rafRef.current = requestAnimationFrame(tick);
  }, [isPlaying, beats, words, textEffect]);

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
    setActiveWord(null);
    setIsPlaying(true);
    source.onended = () => setIsPlaying(false);
  }, [audioBuffer]);

  const stop = useCallback(() => {
    sourceRef.current?.stop();
    setIsPlaying(false);
    cancelAnimationFrame(rafRef.current);
  }, []);

  const reset = useCallback(() => {
    stop();
    setActiveWord(null);
    setCurrentTime(0);
    lastBeatIndexRef.current = -1;
  }, [stop]);

  useEffect(() => {
    if (isPlaying) {
      rafRef.current = requestAnimationFrame(tick);
    }
    return () => cancelAnimationFrame(rafRef.current);
  }, [isPlaying, tick]);

  useEffect(() => {
    return () => {
      sourceRef.current?.stop();
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const duration = audioBuffer?.duration || 0;
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const fontSize = 48 + 48 * intensity;

  const currentVariant = activeWord ? textVariants[activeWord.effect] : textVariants[textEffect];

  return (
    <div className="flex flex-col h-full">
      <div
        className="relative flex-1 rounded-lg overflow-hidden min-h-[400px] flex items-center justify-center"
        style={{ backgroundColor: "hsl(0, 0%, 2%)", perspective: "800px" }}
      >
        {/* Lottie background */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <Lottie
            animationData={particlesLottie}
            loop
            autoplay={isPlaying}
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        {/* Beat pulse ring */}
        <AnimatePresence>
          {activeWord && (
            <motion.div
              key={`ring-${activeWord.birth}`}
              className="absolute rounded-full border border-primary/30"
              initial={{ width: 0, height: 0, opacity: 0.6 }}
              animate={{ width: 500, height: 500, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: activeWord.duration * 0.8, ease: "easeOut" }}
              style={{ borderColor: "hsl(var(--primary) / 0.3)" }}
            />
          )}
        </AnimatePresence>

        {/* Word display */}
        <AnimatePresence mode="wait">
          {activeWord && (
            <motion.div
              key={`${activeWord.text}-${activeWord.birth}`}
              className="font-display select-none pointer-events-none text-center z-10"
              initial={currentVariant.initial}
              animate={currentVariant.animate}
              exit={currentVariant.exit}
              transition={{
                duration: activeWord.duration * 0.3,
                ease: [0.16, 1, 0.3, 1],
                exit: { duration: activeWord.duration * 0.2 },
              }}
              style={{
                color: "white",
                fontSize: `${fontSize}px`,
                lineHeight: 1,
                letterSpacing: "0.05em",
                textShadow: "0 0 40px hsl(var(--primary) / 0.4)",
              }}
            >
              {activeWord.text}
            </motion.div>
          )}
        </AnimatePresence>

        {!audioBuffer && (
          <p className="text-muted-foreground text-lg z-10">Upload a track to get started</p>
        )}

        {audioBuffer && !isPlaying && !activeWord && (
          <button
            onClick={play}
            className="w-20 h-20 rounded-full bg-primary/20 hover:bg-primary/30 border-2 border-primary flex items-center justify-center transition-all hover:scale-110 z-10"
          >
            <Play className="w-8 h-8 text-primary ml-1" />
          </button>
        )}
      </div>

      <div className="flex items-center gap-3 pt-3">
        <Button variant="ghost" size="icon" onClick={isPlaying ? stop : play} disabled={!audioBuffer} className="text-foreground">
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </Button>
        <Button variant="ghost" size="icon" onClick={reset} disabled={!audioBuffer} className="text-foreground">
          <RotateCcw className="w-4 h-4" />
        </Button>
        <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-[width] duration-100" style={{ width: `${progress}%` }} />
        </div>
        <span className="text-xs text-muted-foreground tabular-nums min-w-[70px] text-right">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
      </div>

      {beats.length > 0 && (
        <p className="text-xs text-muted-foreground mt-1">{beats.length} beats detected</p>
      )}
    </div>
  );
}

function formatTime(s: number): string {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}
