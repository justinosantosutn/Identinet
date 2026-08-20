import { useMemo } from "react";
import { Users, PenTool, Palette, type LucideIcon } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { CarouselEdgeFade, CarouselSwipeHint } from "@/components/ui/carousel-hint";
import { useContent } from "@/lib/content-store";

interface ServiceContent {
  title: string;
  description: string;
  bullets: string[];
}

const icons: LucideIcon[] = [Users, PenTool, Palette];
const colors: { bg: string; fg: string }[] = [
  { bg: "bg-primary", fg: "text-white" },
  { bg: "bg-accent", fg: "text-white" },
  { bg: "bg-quaternary", fg: "text-white" },
];

export const Services = () => {
  const { services: servicesContent } = useContent();
  const services = useMemo(
    () =>
      (servicesContent as ServiceContent[]).map((s, i) => ({
        ...s,
        icon: icons[i % icons.length],
        ...colors[i % colors.length],
      })),
    [servicesContent],
  );
  return (
    <section id="servicios" className="bg-background-soft px-6 md:px-10 py-20 md:py-28">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-14">
          <span className="inline-block bg-tertiary text-on-tertiary rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wide mb-6">
            Distintas áreas y especialidades del equipo
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-primary">
            Servicios individuales
          </h2>
        </Reveal>

        <CarouselSwipeHint />
        <div className="relative">
          <CarouselEdgeFade />
          <RevealGroup
            disableOnMobile
            className="flex gap-5 overflow-x-auto overflow-y-visible snap-x snap-proximity pt-4 pb-2 -mx-6 px-6 no-scrollbar md:mx-0 md:px-0 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible"
          >
            {services.map(({ icon: Icon, title, description, bullets, bg, fg }) => (
              <RevealItem
                disableOnMobile
                key={title}
                className={`${bg} ${fg} flex-shrink-0 w-[78%] sm:w-[55%] snap-center md:w-auto rounded-[2rem] p-8 shadow-[6px_6px_0px_rgba(36,27,34,0.15)] hover:-translate-y-1 transition-transform`}
              >
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7" strokeWidth={2} />
                </div>
                <h3 className="font-display text-2xl mb-3">{title}</h3>
                <p className="text-sm opacity-90 mb-6 leading-relaxed">{description}</p>
                <ul className="space-y-2">
                  {bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/80 flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <p className="text-center text-on-surface-muted text-sm mt-10">
          Aclaración: estos servicios se encuentran dentro de nuestros packs.
        </p>
      </div>
    </section>
  );
};
