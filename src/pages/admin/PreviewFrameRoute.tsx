import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ContentProvider, ContentOverride } from "@/lib/content-store";
import { previewComponents } from "./previewComponents";

const MESSAGE_ORIGIN = window.location.origin;

/** Standalone page loaded inside an <iframe> by the admin preview so a
 * section can be shown at a genuine mobile viewport width — Tailwind's
 * `md:` classes (and the useIsMobile hook) respond to the real browser
 * viewport, not the size of a scaled-down div, so this is the only way to
 * actually see the mobile layout while editing from a desktop window. */
const PreviewFrameInner = () => {
  const { key } = useParams();
  const [draft, setDraft] = useState<unknown>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.origin !== MESSAGE_ORIGIN) return;
      if (e.data?.type !== "identinet-preview-data") return;
      setDraft(e.data.data);
      setReady(true);
    };
    window.addEventListener("message", handleMessage);
    window.parent.postMessage({ type: "identinet-preview-ready" }, MESSAGE_ORIGIN);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  useEffect(() => {
    const reportHeight = () => {
      window.parent.postMessage(
        { type: "identinet-preview-height", height: document.documentElement.scrollHeight },
        MESSAGE_ORIGIN,
      );
    };
    const ro = new ResizeObserver(reportHeight);
    ro.observe(document.body);
    reportHeight();
    return () => ro.disconnect();
  }, [draft]);

  const Component = key ? previewComponents[key] : undefined;
  if (!Component || !ready) return null;

  return (
    <ContentOverride overrides={{ [key as string]: draft } as never}>
      <Component />
    </ContentOverride>
  );
};

const PreviewFrameRoute = () => (
  <ContentProvider>
    <PreviewFrameInner />
  </ContentProvider>
);

export default PreviewFrameRoute;
