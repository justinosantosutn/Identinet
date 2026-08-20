import { useEffect, useRef, useState, type ComponentType } from "react";
import { Monitor, Smartphone } from "lucide-react";
import { PreviewFrame } from "./PreviewFrame";
import { PreviewBoundary } from "./PreviewBoundary";
import { ContentOverride } from "@/lib/content-store";

interface LivePreviewProps {
  sectionKey: string;
  data: unknown;
  PreviewComponent: ComponentType;
}

const MOBILE_WIDTH = 375;
const ORIGIN = window.location.origin;

/** Desktop mode reuses the existing in-document scaled preview (proven,
 * cheap). Mobile mode needs a real iframe: Tailwind's `md:` classes and the
 * useIsMobile hook both key off the actual browser viewport, so a shrunk-down
 * div never actually shows the mobile layout — only a genuinely narrow
 * browsing context (an iframe) does. */
export const LivePreview = ({ sectionKey, data, PreviewComponent }: LivePreviewProps) => {
  const [mode, setMode] = useState<"desktop" | "mobile">("desktop");
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeReady, setIframeReady] = useState(false);
  const [iframeHeight, setIframeHeight] = useState(500);

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.origin !== ORIGIN) return;
      if (e.data?.type === "identinet-preview-ready") setIframeReady(true);
      if (e.data?.type === "identinet-preview-height") setIframeHeight(e.data.height);
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  useEffect(() => {
    if (mode !== "mobile" || !iframeReady) return;
    iframeRef.current?.contentWindow?.postMessage(
      { type: "identinet-preview-data", data },
      ORIGIN,
    );
  }, [mode, iframeReady, data]);

  const tabClass = (active: boolean) =>
    `flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
      active ? "bg-primary text-white" : "text-on-surface-muted"
    }`;

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-bold uppercase tracking-wide text-on-surface-muted">
          Preview — así quedaría
        </p>
        <div className="flex-shrink-0 flex bg-surface-alt rounded-full p-1">
          <button type="button" onClick={() => setMode("desktop")} className={tabClass(mode === "desktop")}>
            <Monitor className="w-3.5 h-3.5" />
            Desktop
          </button>
          <button
            type="button"
            onClick={() => {
              setIframeReady(false);
              setMode("mobile");
            }}
            className={tabClass(mode === "mobile")}
          >
            <Smartphone className="w-3.5 h-3.5" />
            Mobile
          </button>
        </div>
      </div>

      {mode === "desktop" ? (
        <PreviewBoundary key={JSON.stringify(data)}>
          <PreviewFrame>
            <ContentOverride overrides={{ [sectionKey]: data } as never}>
              <PreviewComponent />
            </ContentOverride>
          </PreviewFrame>
        </PreviewBoundary>
      ) : (
        <div
          className="rounded-2xl border border-border overflow-hidden bg-background mx-auto"
          style={{ width: MOBILE_WIDTH, maxWidth: "100%" }}
        >
          <iframe
            key={sectionKey}
            ref={iframeRef}
            src={`/admin/frame/${sectionKey}`}
            title="Preview mobile"
            style={{ width: MOBILE_WIDTH, maxWidth: "100%", height: iframeHeight, border: 0, display: "block" }}
            onLoad={() => {
              // In case the ready handshake fired before this listener existed.
              iframeRef.current?.contentWindow?.postMessage(
                { type: "identinet-preview-data", data },
                ORIGIN,
              );
            }}
          />
        </div>
      )}
    </div>
  );
};
