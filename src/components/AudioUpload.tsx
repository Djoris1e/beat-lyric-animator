import { useCallback, useRef, useState } from "react";
import { Upload, Music } from "lucide-react";

interface AudioUploadProps {
  onFileSelected: (file: File) => void;
  fileName: string | null;
  isProcessing: boolean;
}

export function AudioUpload({ onFileSelected, fileName, isProcessing }: AudioUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("audio/")) {
        onFileSelected(file);
      }
    },
    [onFileSelected]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileSelected(file);
  };

  return (
    <div
      className={`relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-200 ${
        isDragging
          ? "border-primary bg-primary/10"
          : fileName
          ? "border-primary/40 bg-primary/5"
          : "border-border hover:border-muted-foreground"
      }`}
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept="audio/*"
        className="hidden"
        onChange={handleChange}
      />
      {isProcessing ? (
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground">Analyzing beats…</p>
        </div>
      ) : fileName ? (
        <div className="flex items-center gap-3 justify-center">
          <Music className="w-5 h-5 text-primary" />
          <span className="text-sm text-foreground truncate max-w-[200px]">{fileName}</span>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <Upload className="w-8 h-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Drop an audio file or <span className="text-primary">browse</span>
          </p>
        </div>
      )}
    </div>
  );
}
