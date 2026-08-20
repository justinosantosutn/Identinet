import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight, Play, Quote } from "lucide-react";
import { clients as testimonials, type Accent } from "@/data/clients";

const accentClasses: Record<Accent, { bg: string; text: string }> = {
  primary: { bg: "bg-primary", text: "text-primary" },
  accent: { bg: "bg-accent", text: "text-accent" },
  quaternary: { bg: "bg-quaternary", text: "text-quaternary" },
};

const AUTOPLAY_MS = 9000;

const TestimonialCarousel = () => {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const current = testimonials[index];
  const colors = accentClasses[current.accent];

  const go = (dir: 1 | -1) => {
    setPlaying(false);
    setIndex((i) => (i + dir + testimonials.length) % testimonials.length);
  };

  const goTo = (i: number) => {
    setPlaying(false);
    setIndex(i);
  };

  const handlePlay = () => {
    setPlaying(true);
    requestAnimationFrame(() => videoRef.current?.play());
  };

  useEffect(() => {
    if (playing || paused) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [playing, paused, index]);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="bg-white border border-border rounded-[2.5rem] px-6 py-12 md:px-14 md:py-16 shadow-[8px_8px_0px_rgba(36,27,34,0.08)]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
        {/* Stacked video card */}
        <div className="relative w-full max-w-xs sm:max-w-sm mx-auto aspect-[4/4.6]">
          <motion.div
            animate={{ rotate: 8 }}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
            className={`absolute inset-0 rounded-[2rem] ${colors.bg} opacity-25 translate-x-3`}
          />
          <motion.div
            animate={{ rotate: -6 }}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
            className={`absolute inset-0 rounded-[2rem] ${colors.bg} opacity-50 -translate-x-3`}
          />

          <div className="group absolute inset-0 rounded-[2rem] overflow-hidden bg-surface-alt border-4 border-white shadow-xl hover:-rotate-1 transition-transform duration-300">
            <AnimatePresence mode="wait">
              <motion.video
                key={current.video}
                ref={videoRef}
                src={current.video}
                controls={playing}
                playsInline
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35 }}
                className="w-full h-full object-cover"
                onEnded={() => setPlaying(false)}
              />
            </AnimatePresence>

            {!playing && (
              <button
                onClick={handlePlay}
                aria-label={`Reproducir testimonio de ${current.name}`}
                className="absolute inset-0 flex items-center justify-center bg-on-surface/10 group-hover:bg-on-surface/20 transition-colors"
              >
                <span
                  className={`w-16 h-16 rounded-full ${colors.bg} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}
                >
                  <Play className="w-6 h-6 ml-1" fill="currentColor" />
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Text + nav */}
        <div className="relative">
          <Quote
            className={`w-14 h-14 ${colors.text} opacity-15 absolute -top-4 -left-1 -z-0`}
            fill="currentColor"
          />

          <span
            className={`relative inline-block ${colors.bg} text-white rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-wide mb-5`}
          >
            Testimonio en video
          </span>

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="relative"
            >
              <h3 className="font-display text-2xl md:text-3xl text-on-surface mb-1">
                {current.name}
              </h3>
              <p className="text-on-surface-muted text-sm font-semibold mb-6">{current.role}</p>
              <p className="text-on-surface text-base md:text-lg leading-relaxed mb-4">
                “{current.quote}”
              </p>
              <Link
                to={`/clientes/${current.slug}`}
                className={`inline-flex items-center gap-1.5 text-sm font-bold ${colors.text} hover:underline underline-offset-4 mb-8`}
              >
                Ver caso completo
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between gap-6 mt-2">
            <div className="flex items-center gap-2">
              {testimonials.map((t, i) => (
                <button
                  key={t.name}
                  onClick={() => goTo(i)}
                  aria-label={`Ver testimonio de ${t.name}`}
                  className={`h-2.5 rounded-full transition-all ${
                    i === index
                      ? `w-8 ${accentClasses[t.accent].bg}`
                      : "w-2.5 bg-border hover:bg-on-surface/20"
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => go(-1)}
                aria-label="Testimonio anterior"
                className="w-11 h-11 rounded-full border-2 border-primary/25 text-primary flex items-center justify-center hover:border-primary hover:bg-primary hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => go(1)}
                aria-label="Siguiente testimonio"
                className="w-11 h-11 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-dark transition-colors"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Clients = () => {
  return (
    <section id="clientes" className="bg-background px-6 md:px-10 py-14 md:py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <span className="inline-block bg-primary text-white rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wide mb-6">
            Clientes↴
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-primary">
            Marcas que confiaron en nosotros
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-10 md:mb-16">
          {testimonials.map((c) => (
            <Link
              key={c.slug}
              to={`/clientes/${c.slug}`}
              className="bg-white border border-border text-on-surface font-display text-lg md:text-xl px-6 py-3 rounded-full hover:border-primary hover:text-primary transition-colors"
            >
              {c.brand}
            </Link>
          ))}
        </div>

        <TestimonialCarousel />
      </div>
    </section>
  );
};
