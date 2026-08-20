import { useRef, useState } from "react";
import { Monitor, Smartphone } from "lucide-react";
import { DEFAULT_CARD_POSITIONS, type CardPosition } from "@/components/ui/hero";

interface FloatingCardDraft {
  handle: string;
  metric: string;
  avatarSeed: string;
  position?: { mobile?: CardPosition; desktop?: CardPosition };
}

interface HeroCardPositionerProps {
  cards: FloatingCardDraft[];
  onChange: (index: number, breakpoint: "mobile" | "desktop", position: CardPosition) => void;
}

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

export const HeroCardPositioner = ({ cards, onChange }: HeroCardPositionerProps) => {
  const [breakpoint, setBreakpoint] = useState<"mobile" | "desktop">("desktop");
  const areaRef = useRef<HTMLDivElement>(null);
  const dragIndex = useRef<number | null>(null);

  const positionFor = (index: number): CardPosition =>
    cards[index]?.position?.[breakpoint] ?? DEFAULT_CARD_POSITIONS[index as 0 | 1][breakpoint];

  const updateFromPointer = (clientX: number, clientY: number) => {
    const index = dragIndex.current;
    const area = areaRef.current;
    if (index === null || !area) return;
    const rect = area.getBoundingClientRect();
    const left = clamp(((clientX - rect.left) / rect.width) * 100, 0, 92);
    const top = clamp(((clientY - rect.top) / rect.height) * 100, 0, 88);
    onChange(index, breakpoint, { top: Math.round(top), left: Math.round(left) });
  };

  const handlePointerDown = (index: number) => (e: React.PointerEvent) => {
    e.preventDefault();
    dragIndex.current = index;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updateFromPointer(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (dragIndex.current === null) return;
    updateFromPointer(e.clientX, e.clientY);
  };

  const handlePointerUp = () => {
    dragIndex.current = null;
  };

  return (
    <div className="bg-white border border-border rounded-2xl p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-on-surface-muted mb-1">
            Posición de las tarjetas flotantes
          </p>
          <p className="text-xs text-on-surface-muted">Arrastralas donde quieras — mobile y desktop se guardan por separado.</p>
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

        {cards.map((card, i) => {
          const pos = positionFor(i);
          return (
            <div
              key={i}
              onPointerDown={handlePointerDown(i)}
              style={{ top: `${pos.top}%`, left: `${pos.left}%` }}
              className="absolute w-20 cursor-grab active:cursor-grabbing bg-white/90 border border-white shadow-lg rounded-xl p-2 text-center"
            >
              <p className="text-[9px] font-bold text-primary leading-tight truncate">{card.handle || `Tarjeta ${i + 1}`}</p>
              <p className="text-[8px] text-on-surface-muted leading-tight truncate">{card.metric}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
