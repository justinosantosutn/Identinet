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
const STATUS_BAR_H = 44;
const HOME_INDICATOR_H = 24;
const BROWSER_BAR_H = 40;
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
  const chromeHeight = mode === "mobile" ? STATUS_BAR_H + HOME_INDICATOR_H : BROWSER_BAR_H;
  const frameHeight = iframeHeight + chromeHeight;

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

  const iframeEl = (
    <iframe
      key={`${sectionKey}-${mode}`}
      ref={iframeRef}
      src={`/admin/frame/${sectionKey}`}
      title={`Preview ${mode}`}
      style={{ width: targetWidth, height: iframeHeight, border: 0, display: "block" }}
      onLoad={() => {
        // In case the ready handshake fired before this listener existed.
        iframeRef.current?.contentWindow?.postMessage({ type: "identinet-preview-data", data }, ORIGIN);
      }}
    />
  );

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
        className="mx-auto max-w-full"
        style={{ width: targetWidth * scale, height: frameHeight * scale }}
      >
        <div style={{ width: targetWidth, transform: `scale(${scale})`, transformOrigin: "top left" }}>
          {mode === "mobile" ? (
            <div className="bg-black rounded-[2.5rem] p-2.5 shadow-2xl">
              <div className="rounded-[2rem] overflow-hidden bg-white relative">
                {/* Safari full-screen status bar — no address bar, matching
                    how Safari looks once the page has scrolled/settled. */}
                <div
                  className="flex items-end justify-between px-7 pb-1.5 text-black font-semibold text-[13px] relative z-10"
                  style={{ height: STATUS_BAR_H }}
                >
                  <span>9:41</span>
                  <div className="absolute left-1/2 top-1.5 -translate-x-1/2 w-[100px] h-[26px] bg-black rounded-full" />
                  <span className="flex items-center gap-1">
                    <span>📶</span>
                    <span>🔋</span>
                  </span>
                </div>
                {iframeEl}
                {/* Home indicator */}
                <div className="flex items-center justify-center" style={{ height: HOME_INDICATOR_H }}>
                  <div className="w-32 h-1.5 bg-black rounded-full" />
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-xl overflow-hidden shadow-2xl ring-1 ring-black/10 bg-white">
              {/* Browser-window chrome — makes the preview read as "a real
                  browser window" instead of a bare rectangle, so the edges
                  of the page are unambiguous. */}
              <div
                className="flex items-center gap-4 px-4 bg-surface-alt border-b border-border"
                style={{ height: BROWSER_BAR_H }}
              >
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#e8949e]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#efcf8f]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#a9d4b0]" />
                </div>
                <div className="flex-1 max-w-xs mx-auto bg-white border border-border rounded-full px-3 py-1 text-center">
                  <span className="text-[11px] font-mono text-on-surface-muted truncate">
                    identinetstudio.com
                  </span>
                </div>
              </div>
              {iframeEl}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
