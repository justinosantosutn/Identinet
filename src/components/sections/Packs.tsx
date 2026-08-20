import { Link } from "react-router-dom";
import { ArrowUpRight, Check } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { CarouselSwipeHint } from "@/components/ui/carousel-hint";
import { packs, comparison } from "@/data/packs";

export const Packs = () => {
  return (
    <section id="packs" className="bg-background px-6 md:px-10 py-14 md:py-28">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-9 md:mb-14">
          <span className="inline-block bg-accent text-white rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wide mb-6">
            Packs IdentiNet
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-primary mb-4">
            Elegí el ritmo de tu marca
          </h2>
          <p className="text-on-surface-muted max-w-xl mx-auto">
            Adaptamos la cantidad y calidad del contenido a la necesidad y
            estrategia de tu marca. Ningún pack incluye contestar mensajes y
            comentarios.
          </p>
        </Reveal>

        <CarouselSwipeHint />
        <div className="relative">
          <RevealGroup
            disableOnMobile
            className="flex gap-5 overflow-x-auto overflow-y-visible snap-x snap-proximity pt-6 pb-2 -mx-6 px-6 no-scrollbar md:mx-0 md:px-0 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:pt-0"
          >
          {packs.map((pack) => (
            <RevealItem
              disableOnMobile
              key={pack.slug}
              className={`relative flex-shrink-0 w-[82%] sm:w-[60%] snap-center md:w-auto rounded-[2rem] p-8 flex flex-col border-2 hover:-translate-y-1 transition-transform ${
                pack.highlight
                  ? "bg-primary text-white border-primary shadow-[8px_8px_0px_rgba(242,130,78,0.6)]"
                  : "bg-surface-alt text-on-surface border-border shadow-[6px_6px_0px_rgba(36,27,34,0.08)]"
              }`}
            >
              {pack.highlight && (
                <span className="absolute -top-3.5 right-6 bg-accent text-white text-[11px] font-bold uppercase tracking-wide px-4 py-1.5 rounded-full shadow-md rotate-3">
                  ★ Más elegido
                </span>
              )}
              <h3 className="font-display text-3xl mb-1">Pack {pack.name}</h3>
              <p
                className={`text-xs font-bold uppercase tracking-wide mb-4 ${
                  pack.highlight ? "text-white/80" : "text-primary"
                }`}
              >
                {pack.tagline}
              </p>
              <p
                className={`text-sm mb-6 ${
                  pack.highlight ? "text-white/90" : "text-on-surface-muted"
                }`}
              >
                {pack.includes}
              </p>

              <ul className="space-y-3 mb-6 flex-1">
                {pack.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm font-semibold">
                    <Check
                      className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                        pack.highlight ? "text-accent" : "text-tertiary-dark"
                      }`}
                      strokeWidth={3}
                    />
                    {f}
                  </li>
                ))}
              </ul>

              <p
                className={`text-xs mb-6 ${
                  pack.highlight ? "text-white/70" : "text-on-surface-muted"
                }`}
              >
                {pack.note}
              </p>

              <Link
                to={`/packs/${pack.slug}`}
                className={`w-full inline-flex items-center justify-center gap-1.5 font-body font-bold text-sm px-8 py-4 rounded-full transition-colors ${
                  pack.highlight
                    ? "bg-accent text-white hover:bg-accent-dark"
                    : "bg-primary text-white hover:bg-primary-dark"
                }`}
              >
                Ver pack completo
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </RevealItem>
          ))}
          </RevealGroup>
        </div>

        <p className="text-center text-on-surface-muted text-sm mt-10">
          ¿Ninguno se ajusta del todo?{" "}
          <Link to="/armar-pack" className="text-primary font-bold underline underline-offset-2">
            Armá tu propio pack
          </Link>{" "}
          combinando servicios individuales + adicionales.
        </p>

        <Reveal className="mt-20">
          <h3 className="text-center font-display text-3xl md:text-4xl text-primary mb-10">
            Comparativa de packs
          </h3>

          {/* Desktop / tablet: table */}
          <div className="hidden md:block overflow-x-auto rounded-[1.75rem] border border-border">
            <table className="w-full text-sm bg-white">
              <thead>
                <tr className="bg-primary text-white text-left">
                  <th className="px-5 py-4 font-bold">&nbsp;</th>
                  <th className="px-5 py-4 font-bold">Conectar</th>
                  <th className="px-5 py-4 font-bold">Crear</th>
                  <th className="px-5 py-4 font-bold">Impulsar</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr key={row.label} className={i % 2 === 0 ? "bg-white" : "bg-surface-alt"}>
                    <td className="px-5 py-4 font-bold text-on-surface">{row.label}</td>
                    <td className="px-5 py-4 text-on-surface-muted">{row.conectar}</td>
                    <td className="px-5 py-4 text-on-surface-muted">{row.crear}</td>
                    <td className="px-5 py-4 text-on-surface-muted">{row.impulsar}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile: one card per pack */}
          <div className="md:hidden space-y-4">
            {(["conectar", "crear", "impulsar"] as const).map((key) => (
              <div key={key} className="bg-white border border-border rounded-[1.75rem] p-6">
                <h4 className="font-display text-xl text-primary mb-4 capitalize">Pack {key}</h4>
                <ul className="space-y-2.5">
                  {comparison.map((row) => (
                    <li key={row.label} className="flex items-start justify-between gap-3 text-sm">
                      <span className="font-semibold text-on-surface">{row.label}</span>
                      <span className="text-on-surface-muted text-right flex-shrink-0">
                        {row[key]}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-surface-alt border border-border rounded-[1.5rem] p-6 max-w-3xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-wide text-primary mb-3">
              Aclaraciones
            </p>
            <ul className="space-y-2 text-sm text-on-surface-muted">
              <li>
                <span className="font-bold text-on-surface">¿No tenés material fotográfico o audiovisual?</span>{" "}
                Lo podés sumar como{" "}
                <Link to="/adicionales" className="text-primary font-bold underline underline-offset-2">
                  adicional de producción audiovisual
                </Link>{" "}
                o con el{" "}
                <Link to="/drone" className="text-primary font-bold underline underline-offset-2">
                  servicio de drone
                </Link>
                .
              </li>
              <li>
                <span className="font-bold text-on-surface">¿Te falta diseño o publicación diaria?</span>{" "}
                Se resuelve eligiendo el pack correcto (Crear o Impulsar) — o armando tu propia
                combinación en{" "}
                <Link to="/armar-pack" className="text-primary font-bold underline underline-offset-2">
                  Armá tu pack
                </Link>
                .
              </li>
              <li>
                <span className="font-bold text-on-surface">Respuesta de mensajes y comentarios</span>{" "}
                no está incluida en ningún pack ni se ofrece como adicional.
              </li>
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
