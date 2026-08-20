import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { CarouselEdgeFade, CarouselSwipeHint } from "@/components/ui/carousel-hint";
import { destinations } from "@/data/destinations";

export const Explore = () => {
  return (
    <section id="explora" className="bg-background-soft px-6 md:px-10 py-20 md:py-28">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-14">
          <span className="inline-block bg-tertiary text-on-tertiary rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wide mb-6">
            Explorá cada servicio
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-primary">
            Más formas de trabajar con nosotras
          </h2>
        </Reveal>

        <CarouselSwipeHint />
        <div className="relative">
          <CarouselEdgeFade />
          <RevealGroup
            disableOnMobile
            className="flex gap-5 overflow-x-auto overflow-y-visible snap-x snap-proximity pt-4 pb-2 -mx-6 px-6 no-scrollbar md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 md:overflow-visible"
          >
            {destinations.map(({ icon: Icon, title, desc, to, bg, fg }) => (
              <RevealItem disableOnMobile key={to} className="flex-shrink-0 w-[78%] sm:w-[55%] md:w-auto snap-center">
                <Link
                  to={to}
                  className={`group block h-full ${bg} ${fg} rounded-[2rem] p-8 shadow-[6px_6px_0px_rgba(36,27,34,0.15)] hover:-translate-y-1 transition-transform`}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                      <Icon className="w-7 h-7" strokeWidth={2} />
                    </div>
                    <ArrowUpRight className="w-5 h-5 opacity-90 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  <h3 className="font-display text-2xl mb-2">{title}</h3>
                  <p className="text-sm opacity-90 leading-relaxed">{desc}</p>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
};
