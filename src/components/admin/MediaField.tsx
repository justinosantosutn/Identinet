import { useRef, useState } from "react";
import { Upload } from "lucide-react";

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

  const handleFile = (file: File) => {
    setFileInfo({ name: file.name, size: file.size });
    setProgress(0);

    const form = new FormData();
    form.append("file", file);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", `/api/upload?type=${accept}`);

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) setProgress(Math.round((e.loaded / e.total) * 100));
    };

    xhr.onload = () => {
      setProgress(null);
      if (xhr.status >= 200 && xhr.status < 300) {
        const data = JSON.parse(xhr.responseText);
        onChange(data.url);
      } else {
        alert("No se pudo subir el archivo. ¿Está corriendo el servidor local (npm run dev)?");
      }
    };

    xhr.onerror = () => {
      setProgress(null);
      alert("No se pudo subir el archivo. ¿Está corriendo el servidor local (npm run dev)?");
    };

    xhr.send(form);
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
