import { Link, Navigate, useParams } from "react-router-dom";
import { Check } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/brand-icons";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/ui/page-shell";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { whatsappUrl } from "@/lib/site";
import { packs, comparison, type Accent } from "@/data/packs";

const accentClasses: Record<Accent, { bg: string; text: string; badgeText: string }> = {
  primary: { bg: "bg-primary", text: "text-primary", badgeText: "text-white" },
  accent: { bg: "bg-accent", text: "text-accent", badgeText: "text-white" },
  quaternary: { bg: "bg-quaternary", text: "text-quaternary", badgeText: "text-white" },
};

const PackDetail = () => {
  const { slug } = useParams();
  const pack = packs.find((p) => p.slug === slug);

  if (!pack) {
    return <Navigate to="/#packs" replace />;
  }

  const colors = accentClasses[pack.accent];

  return (
    <PageShell backTo="/#packs">
      {/* Header */}
      <Reveal className="px-6 md:px-10 pt-6 pb-14 md:pb-20">
        <div className="max-w-3xl mx-auto text-center">
          {pack.highlight && (
            <span className="inline-block bg-accent text-white text-[11px] font-bold uppercase tracking-wide px-4 py-1.5 rounded-full shadow-md mb-3">
              ★ Más elegido
            </span>
          )}
          <br />
          <span
            className={`inline-block ${colors.bg} ${colors.badgeText} rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wide mb-6`}
          >
            {pack.tagline}
          </span>
          <h1 className="font-display text-5xl md:text-7xl text-primary leading-[1.05] mb-4">
            Pack {pack.name}
          </h1>
          <p className="text-on-surface-muted text-base md:text-lg max-w-xl mx-auto">
            {pack.includes}
          </p>
        </div>
      </Reveal>

      {/* Features + note */}
      <section className="px-6 md:px-10 pb-16 md:pb-24">
        <div className="max-w-3xl mx-auto">
          <Reveal className={`${colors.bg} text-white rounded-[2rem] p-8 md:p-10 mb-8`}>
            <h2 className="font-display text-2xl mb-6">Qué incluye</h2>
            <ul className="space-y-3 mb-0">
              {pack.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm md:text-base font-semibold">
                  <Check className="w-5 h-5 mt-0.5 flex-shrink-0" strokeWidth={3} />
                  {f}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="bg-surface-alt border border-border rounded-[1.75rem] p-6 mb-10">
            <p className="text-sm font-semibold text-on-surface leading-relaxed">
              <span className="font-bold text-primary">Aclaración: </span>
              {pack.note}
            </p>
          </Reveal>

          <Reveal className="text-center">
            <Button variant="primary" size="lg" asChild>
              <a
                href={whatsappUrl(`Hola! Quiero consultar por el Pack ${pack.name}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 w-fit mx-auto"
              >
                <WhatsAppIcon className="w-5 h-5" />
                Consultar valor
              </a>
            </Button>
          </Reveal>
        </div>
      </section>

      {/* Comparison */}
      <section className="px-6 md:px-10 pb-20 md:pb-28">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className="text-center font-display text-2xl md:text-3xl text-primary mb-2">
              Cómo se compara con los demás packs
            </h2>
            <p className="text-center text-on-surface-muted text-sm mb-10">
              La columna <span className={`font-bold ${colors.text}`}>{pack.name}</span> es la que estás viendo.
            </p>
          </Reveal>
          <Reveal className="overflow-x-auto rounded-[1.75rem] border border-border">
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
                    <td
                      className={`px-5 py-4 ${pack.slug === "conectar" ? `${colors.text} font-bold` : "text-on-surface-muted"}`}
                    >
                      {row.conectar}
                    </td>
                    <td
                      className={`px-5 py-4 ${pack.slug === "crear" ? `${colors.text} font-bold` : "text-on-surface-muted"}`}
                    >
                      {row.crear}
                    </td>
                    <td
                      className={`px-5 py-4 ${pack.slug === "impulsar" ? `${colors.text} font-bold` : "text-on-surface-muted"}`}
                    >
                      {row.impulsar}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

      {/* All packs — swap between them without any option disappearing */}
      <section className="px-6 md:px-10 pb-20 md:pb-28">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className="text-center font-display text-2xl md:text-3xl text-primary mb-10">
              Comparar con otro pack
            </h2>
          </Reveal>
          <RevealGroup className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packs.map((p) => {
              const isCurrent = p.slug === pack.slug;
              const pColors = accentClasses[p.accent];
              return (
                <RevealItem key={p.slug}>
                  {isCurrent ? (
                    <div
                      className={`block h-full ${pColors.bg} text-white rounded-[1.75rem] p-6 border-2 ${pColors.bg.replace("bg-", "border-")}`}
                    >
                      <p className="text-[10px] font-bold uppercase tracking-wide text-white/70 mb-2">
                        Estás viendo este
                      </p>
                      <h3 className="font-display text-xl mb-1">Pack {p.name}</h3>
                      <p className="text-xs font-bold uppercase tracking-wide text-white/80 mb-2">
                        {p.tagline}
                      </p>
                      <p className="text-sm text-white/90">{p.includes}</p>
                    </div>
                  ) : (
                    <Link
                      to={`/packs/${p.slug}`}
                      className="block h-full bg-surface-alt border-2 border-border rounded-[1.75rem] p-6 hover:-translate-y-1 hover:border-primary/40 transition-all"
                    >
                      <h3 className="font-display text-xl text-primary mb-1">Pack {p.name}</h3>
                      <p className="text-xs font-bold uppercase tracking-wide text-on-surface-muted mb-2">
                        {p.tagline}
                      </p>
                      <p className="text-sm text-on-surface-muted">{p.includes}</p>
                    </Link>
                  )}
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>
    </PageShell>
  );
};

export default PackDetail;
