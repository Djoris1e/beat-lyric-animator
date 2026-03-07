import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface WordEditorProps {
  words: string[];
  onChange: (words: string[]) => void;
}

export function WordEditor({ words, onChange }: WordEditorProps) {
  const handleChange = (value: string) => {
    const parsed = value
      .split(/[\n,]+/)
      .map((w) => w.trim())
      .filter(Boolean);
    onChange(parsed);
  };

  return (
    <div className="space-y-2">
      <Label className="text-xs uppercase tracking-wider text-muted-foreground">
        Words (one per line or comma-separated)
      </Label>
      <Textarea
        className="bg-secondary border-border text-foreground font-display text-lg tracking-wide resize-none min-h-[120px]"
        placeholder={"STOMP\nTHE\nBEAT\nDROP\nIT\nNOW"}
        value={words.join("\n")}
        onChange={(e) => handleChange(e.target.value)}
      />
      <p className="text-xs text-muted-foreground">
        {words.length} word{words.length !== 1 ? "s" : ""} — each mapped to a beat
      </p>
    </div>
  );
}
