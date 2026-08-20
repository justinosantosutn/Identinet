import { Wind } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/brand-icons";
import { Button } from "@/components/ui/button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { whatsappUrl } from "@/lib/site";
import { useContent } from "@/lib/content-store";

export const Drone = () => {
  const { drone: droneContent } = useContent();
  const { beneficios, servicios, cotizacion, packsEdicion, herramientas, creditoInstagram } = droneContent;
  return (
    <section id="drone" className="bg-background px-6 md:px-10 py-14 md:py-28">
      <div className="max-w-5xl mx-auto">
        <Reveal className="text-center mb-9 md:mb-14">
          <span className="inline-block bg-primary text-white rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wide mb-6">
            Servicio de drone
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-primary mb-4">
            Creación de contenido con drone
          </h2>
          <p className="text-on-surface-muted max-w-2xl mx-auto leading-relaxed">
            Destacar es clave. Las tomas aéreas con drone aportan una perspectiva única, moderna y
            profesional, que eleva la calidad del contenido y la percepción de tu marca.
          </p>
        </Reveal>

        <Reveal className="bg-accent text-white rounded-[2rem] p-8 md:p-10 mb-10">
          <div className="flex items-center gap-3 mb-6">
            <Wind className="w-6 h-6" />
            <h3 className="font-display text-2xl">Beneficios principales</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {beneficios.map((b) => (
              <div key={b} className="flex items-start gap-2 text-sm font-semibold leading-snug">
                <span className="w-1.5 h-1.5 rounded-full bg-white/80 flex-shrink-0 mt-1.5" />
                {b}
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <h3 className="font-display text-2xl text-primary mb-6">Servicios</h3>
        </Reveal>
        <RevealGroup className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {servicios.map((s) => (
            <RevealItem key={s.title} className="bg-surface-alt border border-border rounded-[1.75rem] p-6">
              <h4 className="font-bold text-on-surface mb-2 leading-snug">{s.title}</h4>
              <p className="text-sm text-on-surface-muted leading-relaxed">{s.desc}</p>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal>
          <h3 className="font-display text-2xl text-primary mb-6">¿Cómo cotizamos tu proyecto?</h3>
        </Reveal>
        <Reveal className="overflow-x-auto mb-14 rounded-[1.75rem] border border-border">
          <table className="w-full text-sm bg-white">
            <thead>
              <tr className="bg-primary text-white text-left">
                <th className="px-5 py-4 font-bold">Modalidad</th>
                <th className="px-5 py-4 font-bold">Criterio</th>
              </tr>
            </thead>
            <tbody>
              {cotizacion.map((row, i) => (
                <tr key={row.modalidad} className={i % 2 === 0 ? "bg-white" : "bg-surface-alt"}>
                  <td className="px-5 py-4 font-bold text-on-surface whitespace-nowrap align-top">
                    {row.modalidad}
                  </td>
                  <td className="px-5 py-4 text-on-surface-muted leading-relaxed">{row.criterio}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        <Reveal>
          <h3 className="font-display text-2xl text-primary mb-6">Packs de edición</h3>
        </Reveal>
        <RevealGroup className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
          {packsEdicion.map((p) => (
            <RevealItem key={p.name} className="bg-quaternary text-white rounded-[1.75rem] p-6">
              <h4 className="font-display text-xl mb-2">{p.name}</h4>
              <p className="text-sm leading-relaxed opacity-90">{p.desc}</p>
            </RevealItem>
          ))}
        </RevealGroup>
        <p className="text-center text-on-surface-muted text-sm mb-14">
          Presupuesto: hora de grabación + adicional del pack.
        </p>

        <Reveal className="flex flex-col md:flex-row items-center justify-between gap-8 bg-surface-alt border border-border rounded-[2rem] p-8 md:p-10">
          <div>
            <h3 className="font-display text-2xl text-primary mb-3">Herramientas de producción</h3>
            <ul className="space-y-2">
              {herramientas.map((h) => (
                <li key={h} className="flex items-start gap-2 text-sm font-semibold text-on-surface">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                  {h}
                </li>
              ))}
            </ul>
            <p className="text-xs text-on-surface-muted mt-4">
              Proyecto de la mano de{" "}
              <a
                href={`https://instagram.com/${creditoInstagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-bold underline underline-offset-2"
              >
                @{creditoInstagram}
              </a>
              .
            </p>
          </div>
          <Button variant="primary" size="lg" className="flex-shrink-0" asChild>
            <a
              href={whatsappUrl("Hola! Quiero consultar por el servicio de drone.")}
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
