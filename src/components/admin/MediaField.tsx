import { useRef, useState } from "react";
import { Upload } from "lucide-react";
import { upload } from "@vercel/blob/client";
import { getAdminPasscode } from "@/lib/admin-auth";

interface MediaFieldProps {
  label: string;
  value: string;
  accept: "image" | "video";
  onChange: (url: string) => void;
}

const formatSize = (bytes: number) => {
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export const MediaField = ({ label, value, accept, onChange }: MediaFieldProps) => {
  const [progress, setProgress] = useState<number | null>(null);
  const [fileInfo, setFileInfo] = useState<{ name: string; size: number } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setFileInfo({ name: file.name, size: file.size });
    setProgress(0);

    try {
      const blob = await upload(`${accept}s/${Date.now()}-${file.name}`, file, {
        access: "public",
        handleUploadUrl: "/api/upload",
        clientPayload: JSON.stringify({ passcode: getAdminPasscode() }),
        onUploadProgress: ({ percentage }) => setProgress(Math.round(percentage)),
      });
      setProgress(null);
      onChange(blob.url);
    } catch (err) {
      setProgress(null);
      alert(`No se pudo subir el archivo: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  const uploading = progress !== null;

  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-wide text-on-surface-muted mb-2">
        {label}
      </label>
      <div className="flex items-center gap-4">
        <div className="w-24 h-24 rounded-xl bg-surface-alt border border-border overflow-hidden flex items-center justify-center flex-shrink-0">
          {value ? (
            accept === "image" ? (
              <img src={value} alt={label} className="w-full h-full object-cover" />
            ) : (
              <video src={value} className="w-full h-full object-cover" muted />
            )
          ) : (
            <span className="text-[10px] text-on-surface-muted text-center px-2">Sin archivo</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="/videos/archivo.mp4"
            className="w-full mb-2 rounded-lg border border-border px-3 py-2 text-sm"
          />

          {uploading ? (
            <div>
              <div className="flex items-center justify-between text-[11px] text-on-surface-muted mb-1">
                <span className="truncate max-w-[140px]">{fileInfo?.name}</span>
                <span className="flex-shrink-0">
                  {fileInfo && formatSize(fileInfo.size)} · {progress}%
                </span>
              </div>
              <div className="w-full h-1.5 bg-surface-alt rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
            >
              <Upload className="w-3.5 h-3.5" />
              Subir {accept === "image" ? "imagen" : "video"}
            </button>
          )}

          <input
            ref={inputRef}
            type="file"
            accept={accept === "image" ? "image/*" : "video/*"}
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
              e.target.value = "";
            }}
          />
        </div>
      </div>
    </div>
  );
};
