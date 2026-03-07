import { useEffect, useRef, useState, useCallback } from "react";
import { Beat } from "@/lib/beatDetection";
import { ColorPalette } from "@/components/StyleControls";
import { Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ActiveWord {
  text: string;
  birth: number;
  duration: number;
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
  intensity,
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
        setActiveWord({ text: word, birth: elapsed, duration });
        lastBeatIndexRef.current = i;
      } else {
        break;
      }
    }

    // Clear word after its duration
    setActiveWord((prev) => {
      if (prev && elapsed - prev.birth > prev.duration) return null;
      return prev;
    });

    rafRef.current = requestAnimationFrame(tick);
  }, [isPlaying, beats, words]);

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

  // Calculate animation phase for the active word
  const wordProgress = activeWord
    ? Math.min((currentTime - activeWord.birth) / activeWord.duration, 1)
    : 0;

  const fontSize = 48 + 48 * intensity;

  return (
    <div className="flex flex-col h-full">
      <div className="relative flex-1 bg-background rounded-lg overflow-hidden min-h-[400px] flex items-center justify-center"
        style={{ backgroundColor: "hsl(0, 0%, 2%)" }}
      >
        {activeWord && (
          <div
            key={`${activeWord.text}-${activeWord.birth}`}
            className="font-display select-none pointer-events-none text-center"
            style={{
              color: "white",
              fontSize: `${fontSize}px`,
              lineHeight: 1,
              letterSpacing: "0.05em",
              animation: `stomp-float ${activeWord.duration}s ease-in-out forwards`,
            }}
          >
            {activeWord.text}
          </div>
        )}

        {!audioBuffer && (
          <p className="text-muted-foreground text-lg">Upload a track to get started</p>
        )}

        {audioBuffer && !isPlaying && !activeWord && (
          <button
            onClick={play}
            className="w-20 h-20 rounded-full bg-primary/20 hover:bg-primary/30 border-2 border-primary flex items-center justify-center transition-all hover:scale-110"
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
