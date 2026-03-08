import { useState, useCallback } from "react";
import { AudioUpload } from "@/components/AudioUpload";
import { WordEditor } from "@/components/WordEditor";
import { StyleControls, ColorPalette, TextEffect } from "@/components/StyleControls";
import { StompPreview } from "@/components/StompPreview";
import { LottieBackgroundPicker, useLottieBackground } from "@/components/LottieBackgrounds";
import { detectBeats, decodeAudioFile, Beat } from "@/lib/beatDetection";
import { Zap } from "lucide-react";

const Index = () => {
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [beats, setBeats] = useState<Beat[]>([]);
  const [words, setWords] = useState<string[]>(["STOMP", "THE", "BEAT", "DROP", "IT", "NOW", "FEEL", "THE", "RHYTHM"]);
  const [palette, setPalette] = useState<ColorPalette>("neon");
  const [sensitivity, setSensitivity] = useState(0.5);
  const [intensity, setIntensity] = useState(0.7);
  const [textEffect, setTextEffect] = useState<TextEffect>("stomp");
  const [lottieId, setLottieId] = useState("none");

  const lottieData = useLottieBackground(lottieId);

  const handleFileSelected = useCallback(
    async (file: File) => {
      setFileName(file.name);
      setIsProcessing(true);
      try {
        const buffer = await decodeAudioFile(file);
        setAudioBuffer(buffer);
        const detected = await detectBeats(buffer, sensitivity);
        setBeats(detected);
      } catch (err) {
        console.error("Failed to process audio:", err);
      } finally {
        setIsProcessing(false);
      }
    },
    [sensitivity]
  );

  const handleSensitivityChange = useCallback(
    async (value: number) => {
      setSensitivity(value);
      if (audioBuffer) {
        const detected = await detectBeats(audioBuffer, value);
        setBeats(detected);
      }
    },
    [audioBuffer]
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 p-5 pb-3 bg-card border-b border-border">
        <Zap className="w-5 h-5 text-primary" />
        <h1 className="font-display text-2xl tracking-wide text-foreground">
          KINETIC STOMP
        </h1>
      </div>

      {/* Upload + Controls row */}
      <div className="bg-card border-b border-border px-5 py-3 flex flex-col lg:flex-row gap-4">
        <div className="lg:w-72 shrink-0">
          <AudioUpload
            onFileSelected={handleFileSelected}
            fileName={fileName}
            isProcessing={isProcessing}
          />
        </div>
        <div className="flex-1 flex flex-col lg:flex-row gap-4 overflow-x-auto">
          <WordEditor words={words} onChange={setWords} />
          <StyleControls
            palette={palette}
            onPaletteChange={setPalette}
            sensitivity={sensitivity}
            onSensitivityChange={handleSensitivityChange}
            intensity={intensity}
            onIntensityChange={setIntensity}
            textEffect={textEffect}
            onTextEffectChange={setTextEffect}
          />
        </div>
      </div>

      {/* Preview */}
      <main className="flex-1 p-4 lg:p-6 flex flex-col min-h-[40vh]">
        <StompPreview
          audioBuffer={audioBuffer}
          beats={beats}
          words={words}
          palette={palette}
          intensity={intensity}
          textEffect={textEffect}
          lottieData={lottieData}
        />
      </main>

      {/* Backgrounds grid below preview */}
      <div className="bg-card border-t border-border px-5 py-4">
        <h2 className="text-sm font-medium text-muted-foreground mb-3">Backgrounds</h2>
        <LottieBackgroundPicker
          selectedId={lottieId}
          onSelect={setLottieId}
        />
      </div>
    </div>
  );
};

export default Index;
