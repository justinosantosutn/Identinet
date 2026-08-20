import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

interface PreviewFrameProps {
  width?: number;
  maxScale?: number;
  children: ReactNode;
}

/** Renders children at their natural (desktop) width, then scales the whole
 * thing down to fit whatever width is actually available — so the preview
 * uses the exact same components/styles as the live site instead of a
 * hand-built mockup, and never overflows a narrow admin viewport. */
export const PreviewFrame = ({ width = 1040, maxScale = 0.42, children }: PreviewFrameProps) => {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [scale, setScale] = useState(maxScale);

  // useLayoutEffect (not useEffect) so the scale is correct before the
  // browser paints — avoids a flash at the wrong size, and more importantly
  // avoids a stale `scale` being used by anything (like a drag handler) that
  // reads the DOM on the very next frame.
  useLayoutEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;
    const measure = () => {
      const available = outer.parentElement?.clientWidth ?? width * maxScale;
      setScale(Math.min(maxScale, available / width));
    };
    const ro = new ResizeObserver(measure);
    if (outer.parentElement) ro.observe(outer.parentElement);
    measure();
    return () => ro.disconnect();
  }, [width, maxScale]);

  useLayoutEffect(() => {
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
      ref={outerRef}
      className="rounded-2xl border border-border overflow-hidden bg-background max-w-full"
      style={{ width: width * scale, height: height * scale || undefined }}
    >
      <div ref={innerRef} style={{ width, transform: `scale(${scale})`, transformOrigin: "top left" }}>
        {children}
      </div>
    </div>
  );
};
