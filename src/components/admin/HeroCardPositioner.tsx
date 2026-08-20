import { useRef, useState } from "react";
import { Monitor, Smartphone } from "lucide-react";
import type { CardPosition } from "@/components/ui/hero";

export interface PositionerItem {
  id: string;
  label: string;
  sublabel?: string;
  position?: { mobile?: CardPosition; desktop?: CardPosition };
  defaultPosition: { mobile: CardPosition; desktop: CardPosition };
  accent?: string;
}

interface HeroCardPositionerProps {
  items: PositionerItem[];
  onChange: (id: string, breakpoint: "mobile" | "desktop", position: CardPosition) => void;
}

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

export const HeroCardPositioner = ({ items, onChange }: HeroCardPositionerProps) => {
  const [breakpoint, setBreakpoint] = useState<"mobile" | "desktop">("desktop");
  const areaRef = useRef<HTMLDivElement>(null);
  const dragId = useRef<string | null>(null);

  const positionFor = (item: PositionerItem): CardPosition =>
    item.position?.[breakpoint] ?? item.defaultPosition[breakpoint];

  const updateFromPointer = (clientX: number, clientY: number) => {
    const id = dragId.current;
    const area = areaRef.current;
    if (!id || !area) return;
    const rect = area.getBoundingClientRect();
    const left = clamp(((clientX - rect.left) / rect.width) * 100, 0, 92);
    const top = clamp(((clientY - rect.top) / rect.height) * 100, 0, 88);
    onChange(id, breakpoint, { top: Math.round(top), left: Math.round(left) });
  };

  const handlePointerDown = (id: string) => (e: React.PointerEvent) => {
    e.preventDefault();
    dragId.current = id;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updateFromPointer(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragId.current) return;
    updateFromPointer(e.clientX, e.clientY);
  };

  const handlePointerUp = () => {
    dragId.current = null;
  };

  return (
    <div className="bg-white border border-border rounded-2xl p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-on-surface-muted mb-1">
            Posición de los elementos flotantes
          </p>
          <p className="text-xs text-on-surface-muted">Arrastralos donde quieras — mobile y desktop se guardan por separado.</p>
        </div>
        <div className="flex-shrink-0 flex bg-surface-alt rounded-full p-1">
          <button
            type="button"
            onClick={() => setBreakpoint("mobile")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
              breakpoint === "mobile" ? "bg-primary text-white" : "text-on-surface-muted"
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            Mobile
          </button>
          <button
            type="button"
            onClick={() => setBreakpoint("desktop")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
              breakpoint === "desktop" ? "bg-primary text-white" : "text-on-surface-muted"
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            Desktop
          </button>
        </div>
      </div>

      <div
        ref={areaRef}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className={`relative w-full bg-background rounded-xl border border-border overflow-hidden select-none touch-none ${
          breakpoint === "mobile" ? "max-w-[280px] aspect-[9/16] mx-auto" : "aspect-[16/9]"
        }`}
      >
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <p className="font-display text-primary/25 text-2xl uppercase text-center px-6">Tu marca conecta en redes</p>
        </div>

        {items.map((item) => {
          const pos = positionFor(item);
          return (
            <div
              key={item.id}
              onPointerDown={handlePointerDown(item.id)}
              style={{ top: `${pos.top}%`, left: `${pos.left}%` }}
              className={`absolute w-20 cursor-grab active:cursor-grabbing shadow-lg rounded-xl p-2 text-center ${
                item.accent ?? "bg-white/90 border border-white"
              }`}
            >
              <p className="text-[9px] font-bold leading-tight truncate">{item.label}</p>
              {item.sublabel && <p className="text-[8px] opacity-80 leading-tight truncate">{item.sublabel}</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
};
