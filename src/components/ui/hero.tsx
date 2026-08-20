import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/brand-icons";
import { useContent } from "@/lib/content-store";

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

const CircularBadge = ({ badgeText }: { badgeText: string }) => (
  <div className="relative w-28 h-28 md:w-36 md:h-36 bg-accent rounded-full flex items-center justify-center shadow-xl rotate-12 hover:scale-105 transition-transform cursor-pointer border-[3px] border-white">
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
  avatarSeed: string;
  className?: string;
  rotate: number;
  delay?: number;
}

const FloatingCard = ({
  handle,
  metric,
  avatarSeed,
  className,
  rotate,
  delay = 0,
}: FloatingCardProps) => (
  <motion.div
    animate={{ y: [0, -16, 0] }}
    transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay }}
    className={`absolute z-30 pointer-events-auto ${className}`}
  >
    <div
      className="w-24 sm:w-32 md:w-40 lg:w-52 aspect-[3/3.5] bg-white/70 backdrop-blur-md border border-white rounded-[1.25rem] md:rounded-[2rem] p-2.5 sm:p-3.5 md:p-5 flex flex-col items-center justify-center shadow-2xl hover:rotate-0 transition-transform duration-500"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <div className="w-9 h-9 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-24 lg:h-24 bg-white rounded-full flex items-center justify-center mb-1.5 sm:mb-2.5 md:mb-4 shadow-inner border-2 md:border-[3px] border-primary-light overflow-hidden">
        <img
          src={`https://api.dicebear.com/7.x/notionists/svg?seed=${avatarSeed}&backgroundColor=ffffff`}
          alt={handle}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="text-center mt-1">
        <p className="font-bold text-[10px] sm:text-xs md:text-base lg:text-lg text-primary leading-tight">{handle}</p>
        <p className="text-[8px] sm:text-[9px] md:text-xs text-on-surface-muted mt-0.5 md:mt-1 leading-tight">{metric}</p>
      </div>
    </div>
  </motion.div>
);

export const Hero = () => {
  const { hero: heroContent } = useContent();
  return (
    <div className="min-h-screen bg-background flex flex-col font-body selection:bg-accent selection:text-white relative overflow-hidden w-full">
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
      <main className="flex-1 relative z-10 pt-8 pb-16 md:pt-12 md:pb-28 px-4 flex flex-col items-center justify-center w-full max-w-[1440px] mx-auto">
        <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center justify-center text-center z-10 mt-4 mb-16">
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
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            {heroContent.floatingCards[0] && (
              <FloatingCard
                handle={heroContent.floatingCards[0].handle}
                metric={heroContent.floatingCards[0].metric}
                avatarSeed={heroContent.floatingCards[0].avatarSeed}
                className="top-[-20%] -right-4 md:top-auto md:right-auto md:left-[2%]"
                rotate={-12}
              />
            )}
            {heroContent.floatingCards[1] && (
              <FloatingCard
                handle={heroContent.floatingCards[1].handle}
                metric={heroContent.floatingCards[1].metric}
                avatarSeed={heroContent.floatingCards[1].avatarSeed}
                className="bottom-[-12%] -left-4 md:bottom-auto md:left-auto md:top-[-10%] md:right-[2%]"
                rotate={12}
                delay={1}
              />
            )}

            <div className="hidden md:block absolute bottom-[6%] left-[30%] w-16 h-16 md:w-20 md:h-20 z-20">
              <ArrowAccentLeft />
            </div>
            <div className="hidden md:block absolute top-[8%] right-[30%] w-16 h-16 md:w-20 md:h-20 z-20">
              <ArrowAccentRight />
            </div>

            <div className="hidden md:block absolute bottom-[-14%] right-[0%] z-40 pointer-events-auto">
              <CircularBadge badgeText={heroContent.badgeText} />
            </div>
          </div>

        </div>
      </main>

      {/* Mobile floating CTA — stays pinned to the bottom of the screen while
          scrolling instead of only appearing once, inline, in the hero. */}
      <div className="md:hidden fixed bottom-5 inset-x-0 z-40 flex justify-center pointer-events-none">
        <a
          href="#contacto"
          className="pointer-events-auto inline-flex items-center gap-2 bg-accent text-white font-bold text-sm px-6 py-3 rounded-full shadow-[0_10px_30px_-8px_rgba(0,0,0,0.4)]"
        >
          {heroContent.mobileCta}
          <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
        </a>
      </div>
    </div>
  );
};
