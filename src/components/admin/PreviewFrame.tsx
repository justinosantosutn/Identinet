import { useEffect, useRef, useState, type ReactNode } from "react";

interface PreviewFrameProps {
  width?: number;
  scale?: number;
  children: ReactNode;
}

/** Renders children at their natural (desktop) width, then scales the whole
 * thing down to fit a narrow sidebar — so the preview uses the exact same
 * components/styles as the live site instead of a hand-built mockup. */
export const PreviewFrame = ({ width = 1040, scale = 0.42, children }: PreviewFrameProps) => {
  const innerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    const measure = () => setHeight(el.offsetHeight);
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    measure();
    return () => ro.disconnect();
  });

  return (
    <div
      className="rounded-2xl border border-border overflow-hidden bg-background"
      style={{ width: width * scale, height: height * scale || undefined }}
    >
      <div ref={innerRef} style={{ width, transform: `scale(${scale})`, transformOrigin: "top left" }}>
        {children}
      </div>
    </div>
  );
};
