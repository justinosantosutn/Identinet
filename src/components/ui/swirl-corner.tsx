const variants = {
  sunset: ["stroke-accent", "stroke-primary", "stroke-quaternary"],
  candy: ["stroke-primary", "stroke-accent", "stroke-tertiary-dark"],
  fresh: ["stroke-tertiary-dark", "stroke-quaternary", "stroke-accent"],
  mono: ["stroke-white/70", "stroke-white/50", "stroke-white/30"],
} as const;

interface SwirlCornerProps {
  variant?: keyof typeof variants;
  className?: string;
  flip?: boolean;
}

/** Decorative nested-arc corner accent, like a paisley/rainbow swoosh. Purely
 * decorative — keep it pointer-events-none and behind content (z-0). */
export const SwirlCorner = ({ variant = "sunset", className = "", flip = false }: SwirlCornerProps) => {
  const [c1, c2, c3] = variants[variant];
  return (
    <svg
      viewBox="0 0 300 300"
      aria-hidden="true"
      className={`pointer-events-none ${flip ? "-scale-x-100" : ""} ${className}`}
    >
      <circle cx="300" cy="300" r="255" fill="none" strokeWidth="34" className={c1} opacity="0.9" />
      <circle cx="300" cy="300" r="185" fill="none" strokeWidth="34" className={c2} opacity="0.9" />
      <circle cx="300" cy="300" r="115" fill="none" strokeWidth="34" className={c3} opacity="0.9" />
    </svg>
  );
};
