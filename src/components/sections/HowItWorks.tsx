import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { CarouselEdgeFade, CarouselSwipeHint } from "@/components/ui/carousel-hint";

const preguntas = [
  {
    n: 1,
    q: "¿Quién publica?",
    a: "Si no querés publicar vos, necesitás Community Manager → Pack Conectar o Impulsar.",
    bg: "bg-primary",
  },
  {
    n: 2,
    q: "¿Quién diseña?",
    a: "Si no tenés piezas gráficas, necesitás Creative Design → Pack Crear o Impulsar.",
    bg: "bg-accent",
  },
  {
    n: 3,
    q: "¿Quién genera el material fotográfico y audiovisual?",
    a: "Ningún pack lo incluye. Se suma como adicional (producción de contenido, cobertura de eventos o servicio de drone) o lo aportás vos, ya editado.",
    bg: "bg-quaternary",
  },
];

export const HowItWorks = () => {
  return (
    <section id="como-funciona" className="bg-background-soft px-6 md:px-10 py-20 md:py-28">
      <div className="max-w-5xl mx-auto">
        <Reveal className="text-center mb-12">
          <span className="inline-block bg-primary text-white rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wide mb-6">
            El modelo
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-primary mb-6">
            ¿Cómo funciona?
          </h2>
          <p className="text-on-surface-muted max-w-2xl mx-auto leading-relaxed">
            Nuestro modelo es modular. Hay dos caminos de entrada y ambos se combinan con
            adicionales. Podés crear tu propio pack, adaptado a los objetivos y necesidades de tu
            marca.
          </p>
        </Reveal>

        <RevealGroup className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <RevealItem className="bg-white border-2 border-primary rounded-[1.75rem] p-7">
            <p className="text-xs font-bold uppercase tracking-wide text-primary mb-2">Camino A</p>
            <p className="font-bold text-on-surface leading-snug">
              Pack (Conectar · Crear · Impulsar) <span className="text-accent">+</span> Adicionales
            </p>
          </RevealItem>
          <RevealItem className="bg-white border-2 border-accent rounded-[1.75rem] p-7">
            <p className="text-xs font-bold uppercase tracking-wide text-accent mb-2">Camino B</p>
            <p className="font-bold text-on-surface leading-snug">
              Servicios individuales por separado <span className="text-primary">+</span> Adicionales
            </p>
          </RevealItem>
        </RevealGroup>

        <Reveal>
          <h3 className="text-center font-display text-2xl md:text-3xl text-primary mb-10">
            Tres preguntas para definir tu configuración
          </h3>
        </Reveal>

        <CarouselSwipeHint />
        <div className="relative">
          <CarouselEdgeFade />
          <RevealGroup className="flex gap-5 overflow-x-auto overflow-y-visible snap-x snap-mandatory pt-4 pb-2 -mx-6 px-6 no-scrollbar md:mx-0 md:px-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible">
            {preguntas.map((p) => (
              <RevealItem
                key={p.n}
                className={`${p.bg} text-white flex-shrink-0 w-[78%] sm:w-[55%] snap-center md:w-auto rounded-[1.75rem] p-7 shadow-[6px_6px_0px_rgba(36,27,34,0.1)] hover:-translate-y-1 transition-transform`}
              >
                <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center font-display text-xl text-primary mb-4">
                  {p.n}
                </div>
                <h4 className="font-bold text-lg mb-2 leading-snug">{p.q}</h4>
                <p className="text-sm opacity-90 leading-relaxed">{p.a}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
};
