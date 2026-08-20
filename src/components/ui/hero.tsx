import { useRef } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/brand-icons";
import { useContent } from "@/lib/content-store";
import { useIsMobile } from "@/lib/use-is-mobile";

export type FloatingItemId = "card-0" | "card-1" | "cta";

export interface CardPosition {
  top: number;
  left: number;
}

export const DEFAULT_CARD_POSITIONS: [
  { mobile: CardPosition; desktop: CardPosition },
  { mobile: CardPosition; desktop: CardPosition },
] = [
  { mobile: { top: 8, left: 78 }, desktop: { top: 12, left: 2 } },
  { mobile: { top: 68, left: 2 }, desktop: { top: 2, left: 80 } },
];

export const DEFAULT_BADGE_POSITION: { mobile: CardPosition; desktop: CardPosition } = {
  mobile: { top: 82, left: 68 },
  desktop: { top: 68, left: 88 },
};

const navLinks = [
  { label: "Packs", href: "#packs" },
  { label: "Adicionales", to: "/adicionales" },
  { label: "Diseño", to: "/diseno" },
  { label: "Nosotras", href: "#nosotros" },
  { label: "FAQ", href: "#faq" },
];

// --- Hand-drawn accent arrows, reskinned in IdentiNet ink tones ---

const ArrowAccentLeft = () => (
  <svg
    viewBox="0 0 100 100"
    className="w-full h-full text-accent stroke-current overflow-visible"
    fill="none"
    strokeWidth="6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10,90 C 10,40 40,20 60,50 C 70,65 80,75 95,70" />
    <path d="M80,55 L95,70 L85,85" />
  </svg>
);

const ArrowAccentRight = () => (
  <svg
    viewBox="0 0 100 100"
    className="w-full h-full text-accent stroke-current overflow-visible"
    fill="none"
    strokeWidth="6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M90,10 C 80,60 60,80 40,60 C 20,40 40,20 60,30 C 80,40 70,70 50,80" />
    <path d="M65,75 L50,80 L55,65" />
  </svg>
);

const CircularBadge = ({ badgeText, draggable = false }: { badgeText: string; draggable?: boolean }) => (
  <div
    className={`relative w-28 h-28 md:w-36 md:h-36 bg-accent rounded-full flex items-center justify-center shadow-xl rotate-12 transition-transform border-[3px] border-white ${
      draggable ? "ring-4 ring-primary/50" : "hover:scale-105 cursor-pointer"
    }`}
  >
    <div className="absolute inset-1 animate-[spin_12s_linear_infinite]">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <path
          id="circlePath"
          d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
          fill="none"
        />
        <text
          className="text-[10px] font-bold tracking-[0.16em] uppercase"
          fill="white"
          fontFamily="Quicksand, sans-serif"
        >
          <textPath href="#circlePath" startOffset="0%">
            {badgeText}{" "}
          </textPath>
        </text>
      </svg>
    </div>
    <div className="absolute inset-0 flex items-center justify-center">
      <ArrowUpRight className="w-9 h-9 text-white" strokeWidth={2.5} />
    </div>
  </div>
);

interface FloatingCardProps {
  handle: string;
  metric: string;
  photo?: string;
  position: CardPosition;
  rotate: number;
  delay?: number;
  draggable?: boolean;
  onPointerDown?: (e: React.PointerEvent) => void;
}

const FloatingCard = ({
  handle,
  metric,
  photo,
  position,
  rotate,
  delay = 0,
  draggable = false,
  onPointerDown,
}: FloatingCardProps) => (
  <motion.div
    animate={{ y: draggable ? 0 : [0, -16, 0] }}
    transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay }}
    onPointerDown={onPointerDown}
    className={`absolute z-30 pointer-events-auto ${draggable ? "cursor-grab active:cursor-grabbing touch-none" : ""}`}
    style={{ top: `${position.top}%`, left: `${position.left}%` }}
  >
    <div
      className={`w-28 sm:w-32 md:w-40 lg:w-52 aspect-[3/3.5] bg-white/70 backdrop-blur-md border border-white rounded-[1.25rem] md:rounded-[2rem] p-3 sm:p-3.5 md:p-5 flex flex-col items-center justify-center shadow-2xl transition-transform duration-500 ${
        draggable ? "ring-4 ring-primary/50" : "hover:rotate-0"
      }`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <div className="w-11 h-11 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-24 lg:h-24 bg-white rounded-full flex items-center justify-center mb-2 sm:mb-2.5 md:mb-4 shadow-inner border-2 md:border-[3px] border-primary-light overflow-hidden">
        <img
          src={photo || `https://api.dicebear.com/7.x/notionists/svg?seed=${handle}&backgroundColor=ffffff`}
          alt={handle}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="text-center mt-1">
        <p className="font-bold text-[11px] sm:text-xs md:text-base lg:text-lg text-primary leading-tight">{handle}</p>
        <p className="text-[9px] sm:text-[9px] md:text-xs text-on-surface-muted mt-0.5 md:mt-1 leading-tight">{metric}</p>
      </div>
    </div>
  </motion.div>
);

interface HeroProps {
  /** Admin-only: lets the two floating cards and the CTA badge be dragged
   * directly in place, instead of only through a separate schematic
   * preview that never quite matched the real layout. */
  editablePositions?: boolean;
  onPositionChange?: (id: FloatingItemId, breakpoint: "mobile" | "desktop", position: CardPosition) => void;
}

export const Hero = ({ editablePositions = false, onPositionChange }: HeroProps = {}) => {
  const { hero: heroContent } = useContent();
  const isMobile = useIsMobile();
  const breakpoint = isMobile ? "mobile" : "desktop";
  const floatingAreaRef = useRef<HTMLDivElement>(null);
  const dragId = useRef<FloatingItemId | null>(null);
  // Where within the element you grabbed it, so it follows your cursor
  // instead of snapping its top-left corner to wherever you clicked.
  const dragOffset = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const updateFromPointer = (clientX: number, clientY: number) => {
    const id = dragId.current;
    const area = floatingAreaRef.current;
    if (!id || !area || !onPositionChange) return;
    const rect = area.getBoundingClientRect();
    const x = clientX - dragOffset.current.x;
    const y = clientY - dragOffset.current.y;
    // No clamp — fully free placement, including overlapping the navbar
    // above or spilling past the edge of the hero.
    const left = ((x - rect.left) / rect.width) * 100;
    const top = ((y - rect.top) / rect.height) * 100;
    onPositionChange(id, breakpoint, { top: Math.round(top), left: Math.round(left) });
  };

  const startDrag = (id: FloatingItemId) => (e: React.PointerEvent) => {
    if (!editablePositions) return;
    e.preventDefault();
    dragId.current = id;
    const targetRect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    dragOffset.current = { x: e.clientX - targetRect.left, y: e.clientY - targetRect.top };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    updateFromPointer(e.clientX, e.clientY);
  };

  const handleAreaPointerMove = (e: React.PointerEvent) => {
    if (dragId.current) updateFromPointer(e.clientX, e.clientY);
  };

  const handleAreaPointerUp = () => {
    dragId.current = null;
  };
  const cardPosition = (index: 0 | 1): CardPosition =>
    heroContent.floatingCards[index]?.position?.[breakpoint] ?? DEFAULT_CARD_POSITIONS[index][breakpoint];
  const badgePosition: CardPosition =
    heroContent.badgePosition?.[breakpoint] ?? DEFAULT_BADGE_POSITION[breakpoint];
  return (
    <div className="md:min-h-screen bg-background flex flex-col font-body selection:bg-accent selection:text-white relative overflow-hidden w-full">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#24572e0d_1px,transparent_1px),linear-gradient(to_bottom,#24572e0d_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0" />

      {/* Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-20 flex items-center justify-between px-6 py-6 md:px-10 md:py-8 max-w-[1440px] mx-auto w-full">
        <a href="#top">
          <img src="/logo-identinet.png" alt="IdentiNet Studio" className="h-8 md:h-10 w-auto" />
        </a>

        <div className="hidden lg:flex items-center space-x-2">
          {navLinks.map((link) =>
            link.to ? (
              <Link
                key={link.label}
                to={link.to}
                className="px-4 py-1.5 rounded-full border border-primary/30 text-on-surface text-xs font-bold hover:bg-white transition-colors"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-1.5 rounded-full border border-primary/30 text-on-surface text-xs font-bold hover:bg-white transition-colors"
              >
                {link.label}
              </a>
            )
          )}
        </div>

        <Button variant="primary" size="sm" asChild>
          <a href="#contacto" className="flex items-center gap-1.5">
            <WhatsAppIcon className="w-3.5 h-3.5" />
            Escribinos
          </a>
        </Button>
      </motion.nav>

      {/* Hero content */}
      <main className="flex-1 relative z-10 pt-4 pb-8 md:pt-12 md:pb-28 px-4 flex flex-col items-center justify-center w-full max-w-[1440px] mx-auto">
        <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center justify-center text-center z-10 mt-2 mb-10 md:mt-4 md:mb-16">
          <motion.div
            className="w-full flex flex-col items-center relative z-10 space-y-2 md:space-y-4"
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } }}
          >
            <motion.div
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } }}
              className="w-full flex justify-start pl-[8%] md:pl-[22%] relative z-30"
            >
              <h1 className="text-[clamp(3rem,9vw,120px)] font-display leading-[0.85] tracking-tight text-accent m-0 p-0 uppercase">
                {heroContent.line1}
              </h1>
            </motion.div>
            <motion.div
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } }}
              className="w-full flex justify-center relative z-20"
            >
              <h1 className="text-[clamp(4.5rem,14vw,200px)] font-display leading-[0.85] tracking-tight text-primary m-0 p-0 uppercase">
                {heroContent.line2}
              </h1>
            </motion.div>
            <motion.div
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } }}
              className="w-full flex justify-end pr-[6%] md:pr-[20%] relative z-10"
            >
              <h1 className="text-[clamp(3rem,9vw,120px)] font-display leading-[0.85] tracking-tight text-primary m-0 p-0 uppercase">
                {heroContent.line3}
              </h1>
            </motion.div>
          </motion.div>

          {/* Floating testimonial cards — diagonal + bobbing on every breakpoint, just
              repositioned/resized smaller on mobile so they clear the headline text. */}
          <div
            ref={floatingAreaRef}
            onPointerMove={editablePositions ? handleAreaPointerMove : undefined}
            onPointerUp={editablePositions ? handleAreaPointerUp : undefined}
            className="absolute inset-0 w-full h-full pointer-events-none"
          >
            {heroContent.floatingCards[0] && (
              <FloatingCard
                handle={heroContent.floatingCards[0].handle}
                metric={heroContent.floatingCards[0].metric}
                photo={heroContent.floatingCards[0].photo}
                position={cardPosition(0)}
                rotate={-12}
                draggable={editablePositions}
                onPointerDown={startDrag("card-0")}
              />
            )}
            {heroContent.floatingCards[1] && (
              <FloatingCard
                handle={heroContent.floatingCards[1].handle}
                metric={heroContent.floatingCards[1].metric}
                photo={heroContent.floatingCards[1].photo}
                position={cardPosition(1)}
                rotate={12}
                delay={1}
                draggable={editablePositions}
                onPointerDown={startDrag("card-1")}
              />
            )}

            <div className="hidden md:block absolute bottom-[6%] left-[30%] w-16 h-16 md:w-20 md:h-20 z-20">
              <ArrowAccentLeft />
            </div>
            <div className="hidden md:block absolute top-[8%] right-[30%] w-16 h-16 md:w-20 md:h-20 z-20">
              <ArrowAccentRight />
            </div>

            {/* "Book a call" badge — lives inside the hero only, positioned
                the same way as the floating cards; it never follows scroll. */}
            <a
              href="#contacto"
              aria-label="Ir a contacto"
              onPointerDown={startDrag("cta")}
              onClick={(e) => editablePositions && e.preventDefault()}
              className={`absolute z-30 pointer-events-auto ${
                editablePositions ? "cursor-grab active:cursor-grabbing touch-none" : ""
              }`}
              style={{ top: `${badgePosition.top}%`, left: `${badgePosition.left}%` }}
            >
              <CircularBadge badgeText={heroContent.badgeText} draggable={editablePositions} />
            </a>
          </div>

        </div>
      </main>
    </div>
  );
};
