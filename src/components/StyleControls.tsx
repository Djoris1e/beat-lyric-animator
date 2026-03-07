import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export type ColorPalette = "neon" | "monochrome" | "warm" | "cool";

export const PALETTES: Record<ColorPalette, string[]> = {
  neon: [
    "hsl(185, 100%, 50%)",
    "hsl(310, 100%, 60%)",
    "hsl(45, 100%, 55%)",
    "hsl(145, 80%, 50%)",
    "hsl(25, 100%, 55%)",
    "hsl(220, 100%, 60%)",
  ],
  monochrome: [
    "hsl(0, 0%, 100%)",
    "hsl(0, 0%, 80%)",
    "hsl(0, 0%, 60%)",
    "hsl(0, 0%, 90%)",
    "hsl(0, 0%, 70%)",
  ],
  warm: [
    "hsl(0, 85%, 55%)",
    "hsl(25, 100%, 55%)",
    "hsl(45, 100%, 55%)",
    "hsl(340, 82%, 52%)",
    "hsl(15, 90%, 60%)",
  ],
  cool: [
    "hsl(185, 100%, 50%)",
    "hsl(220, 100%, 60%)",
    "hsl(260, 80%, 60%)",
    "hsl(200, 90%, 50%)",
    "hsl(170, 70%, 45%)",
  ],
};

interface StyleControlsProps {
  palette: ColorPalette;
  onPaletteChange: (p: ColorPalette) => void;
  sensitivity: number;
  onSensitivityChange: (v: number) => void;
  intensity: number;
  onIntensityChange: (v: number) => void;
}

export function StyleControls({
  palette,
  onPaletteChange,
  sensitivity,
  onSensitivityChange,
  intensity,
  onIntensityChange,
}: StyleControlsProps) {
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Label className="text-xs uppercase tracking-wider text-muted-foreground">
          Color Palette
        </Label>
        <ToggleGroup
          type="single"
          value={palette}
          onValueChange={(v) => v && onPaletteChange(v as ColorPalette)}
          className="flex flex-wrap gap-1"
        >
          {(["neon", "monochrome", "warm", "cool"] as ColorPalette[]).map(
            (p) => (
              <ToggleGroupItem
                key={p}
                value={p}
                className="text-xs capitalize px-3 py-1 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
              >
                {p}
              </ToggleGroupItem>
            )
          )}
        </ToggleGroup>
        <div className="flex gap-1 mt-1">
          {PALETTES[palette].map((c, i) => (
            <div
              key={i}
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-xs uppercase tracking-wider text-muted-foreground">
          Beat Sensitivity — {Math.round(sensitivity * 100)}%
        </Label>
        <Slider
          value={[sensitivity]}
          onValueChange={([v]) => onSensitivityChange(v)}
          min={0.1}
          max={1}
          step={0.05}
        />
      </div>

      <div className="space-y-2">
        <Label className="text-xs uppercase tracking-wider text-muted-foreground">
          Animation Intensity — {Math.round(intensity * 100)}%
        </Label>
        <Slider
          value={[intensity]}
          onValueChange={([v]) => onIntensityChange(v)}
          min={0.2}
          max={1}
          step={0.05}
        />
      </div>
    </div>
  );
}
