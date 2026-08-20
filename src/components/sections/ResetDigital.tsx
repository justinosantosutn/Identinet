import { ClipboardList } from "lucide-react";
import { TikTokIcon, WhatsAppIcon } from "@/components/ui/brand-icons";
import { Button } from "@/components/ui/button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { whatsappUrl } from "@/lib/site";
import { useContent } from "@/lib/content-store";

export const ResetDigital = () => {
  const { resetDigital: resetDigitalContent } = useContent();
  const { incluye, beneficios, pasos } = resetDigitalContent;
  return (
    <section id="reset-digital" className="bg-background-soft px-6 md:px-10 py-14 md:py-28">
      <div className="max-w-5xl mx-auto">
        <Reveal className="text-center mb-9 md:mb-14">
          <span className="inline-block bg-quaternary text-on-quaternary rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wide mb-6">
            Ideal para emprendedores
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-primary mb-4">Reset Digital</h2>
          <p className="font-display text-xl md:text-2xl text-accent mb-6">
            Tu asesoría para crecer en redes
          </p>
          <p className="text-on-surface-muted max-w-2xl mx-auto leading-relaxed">
            Ideal para quienes tienen el tiempo y las ganas de crecer en redes y potenciar su
            comunicación digital, pero necesitan una mano. Analizamos tu negocio y te compartimos
            tips, herramientas y estrategias aplicables. Armamos una guía personalizada para que
            tu marca crezca de manera inteligente.
          </p>
        </Reveal>

        <RevealGroup className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
          <RevealItem className="bg-surface-alt border border-border rounded-[2rem] p-8">
            <h3 className="font-display text-2xl text-primary mb-5">¿Qué incluye?</h3>
            <ul className="space-y-3">
              {incluye.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm font-semibold text-on-surface leading-snug">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                  {item}
                </li>
              ))}
            </ul>
          </RevealItem>

          <RevealItem className="bg-primary text-white rounded-[2rem] p-8">
            <h3 className="font-display text-2xl mb-5">Beneficios</h3>
            <ul className="space-y-3">
              {beneficios.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm font-semibold leading-snug">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/80 flex-shrink-0 mt-1.5" />
                  {item}
                </li>
              ))}
            </ul>
          </RevealItem>
        </RevealGroup>

        <Reveal className="bg-white border border-border rounded-[2rem] p-8 md:p-10 mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 bg-accent/15 rounded-2xl flex items-center justify-center flex-shrink-0">
              <ClipboardList className="w-5 h-5 text-accent" />
            </div>
            <h3 className="font-display text-2xl text-primary">¿Cómo funciona?</h3>
          </div>
          <ol className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {pasos.map((paso, i) => (
              <li key={paso} className="bg-surface-alt border border-border rounded-2xl p-5">
                <span className="font-display text-2xl text-accent">{i + 1}</span>
                <p className="text-sm font-semibold text-on-surface mt-2 leading-snug">{paso}</p>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal className="text-center mb-10 md:mb-16">
          <Button variant="primary" size="lg" asChild>
            <a
              href={whatsappUrl("Hola! Quiero consultar el valor de Reset Digital.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <WhatsAppIcon className="w-5 h-5" />
              Consultá el valor por WhatsApp
            </a>
          </Button>
        </Reveal>

        <Reveal className="bg-quaternary text-white rounded-[2rem] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-2xl md:text-3xl mb-2 flex items-center gap-2">
              <TikTokIcon className="w-6 h-6" />
              Gestión para TikTok
            </h3>
            <p className="text-white/90 text-sm md:text-base max-w-xl">
              Consultá por ideas, objetivo y manejo de la red social para definir estrategia y
              presupuesto.
            </p>
          </div>
          <Button variant="accent" size="lg" className="flex-shrink-0" asChild>
            <a
              href={whatsappUrl("Hola! Quiero consultar por la gestión de TikTok.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <WhatsAppIcon className="w-5 h-5" />
              Consultar por WhatsApp
            </a>
          </Button>
        </Reveal>
      </div>
    </section>
  );
};
