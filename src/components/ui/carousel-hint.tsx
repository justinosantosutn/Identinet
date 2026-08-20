import { ChevronRight } from "lucide-react";

/** Mobile-only "swipe for more" hint above a horizontal-scroll card row. */
export const CarouselSwipeHint = () => (
  <p className="md:hidden flex items-center justify-center gap-1 text-on-surface-muted text-xs font-semibold mb-4">
    Deslizá para ver más
    <ChevronRight className="w-3.5 h-3.5" />
  </p>
);
