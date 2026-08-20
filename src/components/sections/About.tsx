import { ArrowUpRight, Heart, MapPin } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Reveal } from "@/components/ui/reveal";

export const About = () => {
  return (
    <section id="nosotros" className="bg-background px-6 md:px-10 py-20 md:py-28">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <Reveal>
          <span className="inline-block bg-quaternary text-on-quaternary rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wide mb-6">
            Quiénes somos
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-primary leading-[1.05] mb-6">
            Nosotras, creando marcas
          </h2>
          <p className="text-on-surface-muted text-base md:text-lg leading-relaxed mb-4">
            Somos IdentiNet Studio: una agencia de comunicación en redes que
            ayuda a marcas y emprendimientos a comunicar sus productos,
            servicios e ideas. Creemos que las redes son una herramienta
            poderosa para crecer, conectar y construir marcas auténticas —
            pero dar el primer paso no siempre es fácil.
          </p>
          <p className="text-on-surface-muted text-base md:text-lg leading-relaxed mb-6">
            Por eso combinamos estrategia, diseño y producción audiovisual en
            un mismo lugar, adaptando la cantidad y calidad del contenido a
            la necesidad real de cada marca.
          </p>
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <div className="flex items-center gap-2 text-primary font-bold">
              <Heart className="w-5 h-5 fill-primary" />
              <span>Buscamos sacar sonrisas.</span>
            </div>
            <div className="flex items-center gap-2 text-on-surface-muted font-semibold text-sm">
              <MapPin className="w-4 h-4" />
              <span>Roldán · Rosario, Santa Fe</span>
            </div>
          </div>

          <Link
            to="/equipo"
            className="inline-flex items-center gap-1.5 text-primary font-bold text-sm underline underline-offset-4 hover:text-primary-dark"
          >
            Conocenos a cada una
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </Reveal>

        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="absolute -top-6 -left-6 w-full h-full bg-accent rounded-[2.5rem] -z-10" />
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=900&auto=format&fit=crop"
            alt="Equipo de IdentiNet Studio trabajando en contenido para redes"
            className="w-full h-[420px] object-cover rounded-[2.5rem] border-4 border-white shadow-xl"
          />
        </motion.div>
      </div>
    </section>
  );
};
