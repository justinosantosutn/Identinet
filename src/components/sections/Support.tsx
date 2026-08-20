import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { WhatsAppIcon } from "@/components/ui/brand-icons";
import { Button } from "@/components/ui/button";
import { whatsappUrl } from "@/lib/site";
import { useContent } from "@/lib/content-store";

export const Support = () => {
  const { faq: faqs } = useContent();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-background-soft px-6 md:px-10 py-14 md:py-28">
      <div className="max-w-3xl mx-auto">
        <Reveal className="text-center mb-8 md:mb-12">
          <span className="inline-block bg-tertiary text-on-tertiary rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wide mb-6">
            Soporte
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-primary">
            Preguntas frecuentes
          </h2>
        </Reveal>

        <RevealGroup className="space-y-4">
          {faqs.map((faq, i) => (
            <RevealItem
              key={faq.q}
              className="bg-white rounded-[1.5rem] border border-border overflow-hidden hover:border-primary/40 transition-colors"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left font-bold text-on-surface"
              >
                {faq.q}
                <motion.span
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="w-5 h-5 text-primary" />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-on-surface-muted text-sm leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="text-center mt-6 md:mt-10">
          <p className="text-on-surface-muted text-sm mb-4">¿No encontraste tu respuesta?</p>
          <Button variant="secondary" size="default" asChild>
            <a
              href={whatsappUrl("Hola! Tengo una consulta que no encontré en las preguntas frecuentes.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <WhatsAppIcon className="w-4 h-4" />
              Escribinos por WhatsApp
            </a>
          </Button>
        </Reveal>
      </div>
    </section>
  );
};
