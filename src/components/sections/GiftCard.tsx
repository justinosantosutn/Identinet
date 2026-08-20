import { Gift, Palette, ListChecks, PenLine, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { SwirlCorner } from "@/components/ui/swirl-corner";
import { WhatsAppIcon } from "@/components/ui/brand-icons";
import { whatsappUrl } from "@/lib/site";
import giftCardContent from "@/content/giftCard.json";

const icons: LucideIcon[] = [Palette, ListChecks, PenLine];
const pasos = giftCardContent.pasos.map((text, i) => ({ text, icon: icons[i % icons.length] }));
const { importante } = giftCardContent;

export const GiftCard = () => {
  return (
    <section id="gift-card" className="relative bg-background-soft px-6 md:px-10 py-20 md:py-28 overflow-hidden">
      <SwirlCorner
        variant="candy"
        className="absolute -top-16 -right-16 w-56 h-56 md:w-72 md:h-72 opacity-40 z-0"
      />
      <div className="max-w-5xl mx-auto relative z-10">
        <Reveal className="text-center mb-14">
          <span className="inline-block bg-primary text-white rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wide mb-6">
            Gift Card IdentiNet
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-primary mb-4">
            Para tu emprendedor favorito
          </h2>
          <p className="text-on-surface-muted max-w-2xl mx-auto leading-relaxed">
            En IdentiNet nos encanta ver cómo los emprendimientos y negocios con presencia digital
            comunican sus productos, servicios e ideas. Por eso creamos la Gift Card IdentiNet: una
            forma simple y práctica de regalar presencia digital a un amigo, un familiar o alguien
            que quieras mucho. Un detalle que impulsa sus proyectos, motiva su emprendimiento y
            ayuda a que sus ideas se hagan visibles en redes. Y sobre todo, buscamos sacar sonrisas.
          </p>
        </Reveal>

        <RevealGroup className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <RevealItem className="bg-accent text-white rounded-[2rem] p-8">
            <div className="flex items-center gap-3 mb-6">
              <Gift className="w-6 h-6" />
              <h3 className="font-display text-2xl">¿Cómo funciona?</h3>
            </div>
            <ol className="space-y-4">
              {pasos.map(({ icon: Icon, text }, i) => (
                <li key={text} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-semibold leading-snug pt-1">
                    {i + 1}. {text}
                  </span>
                </li>
              ))}
            </ol>
          </RevealItem>

          <RevealItem className="bg-white border border-border rounded-[2rem] p-8">
            <h3 className="font-display text-2xl text-primary mb-4">Servicios incluibles</h3>
            <p className="text-sm text-on-surface-muted leading-relaxed mb-4">
              Podés regalar cualquiera de nuestros servicios. Si no sabés qué regalar, podés
              cargarle el monto que desees y será válido para cualquier servicio.
            </p>
            <h4 className="font-bold text-on-surface mb-3">Importante</h4>
            <ul className="space-y-2.5">
              {importante.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm font-semibold text-on-surface leading-snug">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                  {item}
                </li>
              ))}
            </ul>
          </RevealItem>
        </RevealGroup>

        <Reveal className="text-center">
          <Button variant="primary" size="lg" asChild>
            <a
              href={whatsappUrl("Hola! Quiero pedir una Gift Card IdentiNet.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <WhatsAppIcon className="w-5 h-5" />
              Pedir mi Gift Card
            </a>
          </Button>
        </Reveal>
      </div>
    </section>
  );
};
