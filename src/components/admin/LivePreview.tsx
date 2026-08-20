import { useEffect, useLayoutEffect, useRef, useState, type ComponentType } from "react";
import { Monitor, Smartphone } from "lucide-react";
import type { FloatingItemId, CardPosition } from "@/components/ui/hero";

interface LivePreviewProps {
  sectionKey: string;
  data: unknown;
  PreviewComponent: ComponentType;
  onHeroPositionChange?: (id: FloatingItemId, breakpoint: "mobile" | "desktop", position: CardPosition) => void;
}

const WIDTH: Record<"mobile" | "desktop", number> = { mobile: 375, desktop: 1280 };
const ORIGIN = window.location.origin;

/** Both modes render inside a real <iframe> — a genuine independent
 * browsing context at the real target width, so `vw` units, Tailwind's
 * `md:` classes, and the useIsMobile hook all compute exactly like they
 * would on an actual device. An in-document div scaled with CSS transform
 * was tried first and never matched: `vw`-based type sizing (the hero
 * headline) resolves against the *real* browser window, not the div's
 * shrunk visual size, so proportions were always off. Desktop is wrapped
 * in its own CSS scale (on the iframe box, not its content) purely to fit
 * the sidebar column — the content inside still renders at true 1280px. */
export const LivePreview = ({ sectionKey, data, PreviewComponent: _unused, onHeroPositionChange }: LivePreviewProps) => {
  void _unused;
  const [mode, setMode] = useState<"desktop" | "mobile">("desktop");
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [iframeReady, setIframeReady] = useState(false);
  const [iframeHeight, setIframeHeight] = useState(500);
  const [scale, setScale] = useState(1);

  const targetWidth = WIDTH[mode];

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.origin !== ORIGIN) return;
      if (e.data?.type === "identinet-preview-ready") setIframeReady(true);
      if (e.data?.type === "identinet-preview-height") setIframeHeight(e.data.height);
      if (e.data?.type === "identinet-preview-position-change") {
        onHeroPositionChange?.(e.data.id, e.data.breakpoint, e.data.position);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onHeroPositionChange]);

  useEffect(() => {
    if (!iframeReady) return;
    iframeRef.current?.contentWindow?.postMessage({ type: "identinet-preview-data", data }, ORIGIN);
  }, [iframeReady, data]);

  // Scale just the iframe box to fit the available column width — the
  // content inside always renders at the real targetWidth.
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const measure = () => {
      const available = container.parentElement?.clientWidth ?? targetWidth;
      setScale(Math.min(1, available / targetWidth));
    };
    const ro = new ResizeObserver(measure);
    if (container.parentElement) ro.observe(container.parentElement);
    measure();
    return () => ro.disconnect();
  }, [targetWidth]);

  const tabClass = (active: boolean) =>
    `flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
      active ? "bg-primary text-white" : "text-on-surface-muted"
    }`;

  const switchMode = (next: "desktop" | "mobile") => {
    if (next === mode) return;
    setIframeReady(false);
    setMode(next);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-bold uppercase tracking-wide text-on-surface-muted">
          {sectionKey === "hero" ? "Preview — arrastrá para reposicionar" : "Preview — así quedaría"}
        </p>
        <div className="flex-shrink-0 flex bg-surface-alt rounded-full p-1">
          <button type="button" onClick={() => switchMode("desktop")} className={tabClass(mode === "desktop")}>
            <Monitor className="w-3.5 h-3.5" />
            Desktop
          </button>
          <button type="button" onClick={() => switchMode("mobile")} className={tabClass(mode === "mobile")}>
            <Smartphone className="w-3.5 h-3.5" />
            Mobile
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        className="rounded-2xl border border-border overflow-hidden bg-background mx-auto max-w-full"
        style={{ width: targetWidth * scale, height: iframeHeight * scale }}
      >
        <iframe
          key={`${sectionKey}-${mode}`}
          ref={iframeRef}
          src={`/admin/frame/${sectionKey}`}
          title={`Preview ${mode}`}
          style={{
            width: targetWidth,
            height: iframeHeight,
            border: 0,
            display: "block",
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
          onLoad={() => {
            // In case the ready handshake fired before this listener existed.
            iframeRef.current?.contentWindow?.postMessage({ type: "identinet-preview-data", data }, ORIGIN);
          }}
        />
      </div>
    </div>
  );
};
