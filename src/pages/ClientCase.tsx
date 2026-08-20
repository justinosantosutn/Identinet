import { useRef, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Play, Quote, Sparkles } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/brand-icons";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/ui/page-shell";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { whatsappUrl } from "@/lib/site";
import { clients, type Accent } from "@/data/clients";

const accentClasses: Record<Accent, { bg: string; text: string; badgeText: string }> = {
  primary: { bg: "bg-primary", text: "text-primary", badgeText: "text-white" },
  accent: { bg: "bg-accent", text: "text-accent", badgeText: "text-white" },
  quaternary: { bg: "bg-quaternary", text: "text-quaternary", badgeText: "text-white" },
};

const ClientCase = () => {
  const { slug } = useParams();
  const client = clients.find((c) => c.slug === slug);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [openHighlight, setOpenHighlight] = useState<number | null>(0);

  if (!client) {
    return <Navigate to="/" replace />;
  }

  const colors = accentClasses[client.accent];

  const handlePlay = () => {
    setPlaying(true);
    requestAnimationFrame(() => videoRef.current?.play());
  };

  return (
    <PageShell backTo="/#clientes">
      {/* Header */}
      <Reveal className="px-6 md:px-10 pt-6 pb-14 md:pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <span
            className={`inline-block ${colors.bg} ${colors.badgeText} rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wide mb-6`}
          >
            {client.pack}
          </span>
          <h1 className="font-display text-4xl md:text-6xl text-primary leading-[1.05] mb-4">
            {client.brand}
          </h1>
          <p className="text-on-surface-muted text-base md:text-lg">
            {client.name} — {client.role}
          </p>
        </div>
      </Reveal>

      {/* Video + quote */}
      <section className="px-6 md:px-10 pb-16 md:pb-24">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
          <Reveal className="relative w-full max-w-sm mx-auto aspect-[4/5]">
            <div className={`absolute inset-0 rounded-[2rem] ${colors.bg} opacity-25 rotate-[6deg] translate-x-3`} />
            <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-surface-alt border-4 border-white shadow-xl">
              <video
                ref={videoRef}
                src={client.video}
                controls={playing}
                playsInline
                className="w-full h-full object-cover"
                onEnded={() => setPlaying(false)}
              />
              {!playing && (
                <button
                  onClick={handlePlay}
                  aria-label={`Reproducir testimonio de ${client.name}`}
                  className="absolute inset-0 flex items-center justify-center bg-on-surface/10 hover:bg-on-surface/20 transition-colors"
                >
                  <span
                    className={`w-16 h-16 rounded-full ${colors.bg} text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform`}
                  >
                    <Play className="w-6 h-6 ml-1" fill="currentColor" />
                  </span>
                </button>
              )}
            </div>
          </Reveal>

          <Reveal className="relative" delay={0.1}>
            <Quote className={`w-14 h-14 ${colors.text} opacity-15 absolute -top-4 -left-1`} fill="currentColor" />
            <p className="relative text-on-surface text-xl md:text-2xl font-bold leading-snug mb-8">
              “{client.quote}”
            </p>
            <p className="text-on-surface-muted text-base leading-relaxed">{client.summary}</p>
          </Reveal>
        </div>
      </section>

      {/* Highlights */}
      <section className="px-6 md:px-10 pb-20 md:pb-28">
        <div className="max-w-5xl mx-auto">
          <Reveal className="flex items-center gap-3 justify-center mb-10">
            <Sparkles className={`w-5 h-5 ${colors.text}`} />
            <h2 className="font-display text-2xl md:text-3xl text-primary">Resultados del proyecto</h2>
          </Reveal>

          <RevealGroup className="space-y-4 max-w-2xl mx-auto">
            {client.highlights.map((h, i) => {
              const isOpen = openHighlight === i;
              return (
                <RevealItem
                  key={h.title}
                  className="bg-white border border-border rounded-[1.75rem] overflow-hidden shadow-[6px_6px_0px_rgba(36,27,34,0.06)]"
                >
                  <button
                    onClick={() => setOpenHighlight(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="font-bold text-on-surface leading-snug">{h.title}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="flex-shrink-0"
                    >
                      <ChevronDown className={`w-5 h-5 ${colors.text}`} />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (h.description || h.image) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6">
                          {h.image && (
                            <img
                              src={h.image}
                              alt={h.title}
                              className="w-full max-h-80 object-cover rounded-xl mb-4"
                            />
                          )}
                          {h.description && (
                            <p className="text-sm text-on-surface-muted leading-relaxed">
                              {h.description}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary px-6 md:px-10 py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff14_1px,transparent_1px),linear-gradient(to_bottom,#ffffff14_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
        <Reveal className="max-w-2xl mx-auto text-center relative z-10">
          <h2 className="font-display text-3xl md:text-5xl text-white leading-[1.05] mb-6">
            ¿Querés resultados así para tu marca?
          </h2>
          <Button variant="accent" size="lg" asChild>
            <a
              href={whatsappUrl(`Hola! Vi el caso de ${client.brand} y quiero resultados así para mi marca.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 w-fit mx-auto"
            >
              <WhatsAppIcon className="w-5 h-5" />
              Escribinos por WhatsApp
            </a>
          </Button>
        </Reveal>
      </section>
    </PageShell>
  );
};

export default ClientCase;
