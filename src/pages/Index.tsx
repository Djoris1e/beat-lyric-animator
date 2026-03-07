import { useState, useCallback } from "react";
import { AudioUpload } from "@/components/AudioUpload";
import { WordEditor } from "@/components/WordEditor";
import { StyleControls, ColorPalette } from "@/components/StyleControls";
import { StompPreview } from "@/components/StompPreview";
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
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="w-full lg:w-80 xl:w-96 bg-card border-b lg:border-b-0 lg:border-r border-border p-5 flex flex-col gap-6 overflow-y-auto lg:max-h-screen">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary" />
          <h1 className="font-display text-2xl tracking-wide text-foreground">
            KINETIC STOMP
          </h1>
        </div>

        <AudioUpload
          onFileSelected={handleFileSelected}
          fileName={fileName}
          isProcessing={isProcessing}
        />

        <WordEditor words={words} onChange={setWords} />

        <StyleControls
          palette={palette}
          onPaletteChange={setPalette}
          sensitivity={sensitivity}
          onSensitivityChange={handleSensitivityChange}
          intensity={intensity}
          onIntensityChange={setIntensity}
        />
      </aside>

      {/* Main preview */}
      <main className="flex-1 p-4 lg:p-6 flex flex-col min-h-[60vh] lg:min-h-screen">
        <StompPreview
          audioBuffer={audioBuffer}
          beats={beats}
          words={words}
          palette={palette}
          intensity={intensity}
        />
      </main>
    </div>
  );
};

export default Index;
