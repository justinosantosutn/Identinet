import { ChevronRight } from "lucide-react";

/** Mobile-only "there's more to the right" affordance for horizontal-scroll
 * card rows: an edge fade + a small swipe hint under the section title.
 * `fadeFrom` must match the section's own background (bg-background-soft, bg-background, etc). */
export const CarouselEdgeFade = ({ fadeFrom = "from-background-soft" }: { fadeFrom?: string }) => (
  <div
    aria-hidden="true"
    className={`md:hidden pointer-events-none absolute top-0 right-0 bottom-0 w-10 bg-gradient-to-l ${fadeFrom} to-transparent z-10`}
  />
);

export const CarouselSwipeHint = () => (
  <p className="md:hidden flex items-center justify-center gap-1 text-on-surface-muted text-xs font-semibold mb-4">
    Deslizá para ver más
    <ChevronRight className="w-3.5 h-3.5" />
  </p>
);
