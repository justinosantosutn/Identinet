import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Check, Sparkles } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/brand-icons";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/ui/page-shell";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { whatsappUrl } from "@/lib/site";
import { packs } from "@/data/packs";
import { useContent } from "@/lib/content-store";

interface Addon {
  key: string;
  group: string;
  label: string;
}

const droneAddon: Addon = {
  key: "drone",
  group: "Producción",
  label: "Servicio de drone",
};

const resetDigitalAddon: Addon = {
  key: "reset-digital",
  group: "Asesoría",
  label: "Reset Digital",
};

const PackBuilder = () => {
  const { extras: extrasContent, design: designContent } = useContent();
  const [packSlug, setPackSlug] = useState<string | null>(null);
  const [selectedAddons, setSelectedAddons] = useState<Set<string>>(new Set());

  const selectedPack = packs.find((p) => p.slug === packSlug) ?? null;

  const toggleAddon = (key: string) => {
    setSelectedAddons((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const extraAddons: Addon[] = useMemo(
    () =>
      extrasContent.flatMap((cat) =>
        cat.bullets.map((b, i) => ({ key: `extra-${cat.title}-${i}`, group: cat.title, label: b })),
      ),
    [extrasContent],
  );

  const designAddons: Addon[] = useMemo(
    () =>
      designContent.flatMap((cat) =>
        cat.bullets.map((b, i) => ({ key: `design-${cat.title}-${i}`, group: cat.title, label: b })),
      ),
    [designContent],
  );

  const addonGroups: { title: string; items: Addon[] }[] = useMemo(
    () => [
      { title: "Adicionales", items: extraAddons },
      { title: "Diseño", items: designAddons },
      { title: "Producción y asesoría", items: [droneAddon, resetDigitalAddon] },
    ],
    [extraAddons, designAddons],
  );

  const allAddons = useMemo(
    () => [...extraAddons, ...designAddons, droneAddon, resetDigitalAddon],
    [extraAddons, designAddons]
  );

  const chosenAddons = allAddons.filter((a) => selectedAddons.has(a.key));

  const summary = useMemo(() => {
    const lines: string[] = ["Hola! Quiero armar mi pack a medida con esto:"];
    lines.push(selectedPack ? `• Pack ${selectedPack.name} (${selectedPack.tagline})` : "• Sin pack base, solo adicionales/servicios sueltos");
    if (chosenAddons.length) {
      lines.push("• Sumar:");
      chosenAddons.forEach((a) => lines.push(`   - ${a.label}`));
    }
    lines.push("¿Me pasás valores y disponibilidad?");
    return lines.join("\n");
  }, [selectedPack, chosenAddons]);

  const hasSelection = selectedPack || chosenAddons.length > 0;

  return (
    <PageShell backTo="/">
      <Reveal className="px-6 md:px-10 pt-6 pb-14 md:pb-20">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block bg-accent text-white rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wide mb-6">
            A tu medida
          </span>
          <h1 className="font-display text-4xl md:text-6xl text-primary leading-[1.05] mb-4">
            Armá tu pack
          </h1>
          <p className="text-on-surface-muted text-base md:text-lg max-w-xl mx-auto">
            Elegí un pack base (o no) y sumá los adicionales que necesites. Al final armamos el
            resumen y te lo mandamos directo por WhatsApp.
          </p>
        </div>
      </Reveal>

      {/* Step 1: pack */}
      <section className="px-6 md:px-10 pb-16">
        <div className="max-w-5xl mx-auto">
          <Reveal className="flex items-center gap-3 mb-6">
            <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-display text-sm flex-shrink-0">
              1
            </span>
            <h2 className="font-display text-2xl text-primary">Elegí un pack base</h2>
          </Reveal>

          <RevealGroup className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <RevealItem>
              <button
                onClick={() => setPackSlug(null)}
                className={`w-full h-full text-left rounded-[1.5rem] p-6 border-2 transition-all ${
                  packSlug === null
                    ? "bg-on-surface text-white border-on-surface"
                    : "bg-surface-alt border-border hover:border-on-surface/30"
                }`}
              >
                <p className="font-display text-lg mb-1">Sin pack</p>
                <p className={`text-xs ${packSlug === null ? "text-white/70" : "text-on-surface-muted"}`}>
                  Solo adicionales o servicios sueltos
                </p>
              </button>
            </RevealItem>
            {packs.map((pack) => {
              const active = packSlug === pack.slug;
              return (
                <RevealItem key={pack.slug}>
                  <button
                    onClick={() => setPackSlug(pack.slug)}
                    className={`w-full h-full text-left rounded-[1.5rem] p-6 border-2 transition-all ${
                      active
                        ? "bg-primary text-white border-primary"
                        : "bg-surface-alt border-border hover:border-primary/40"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-display text-lg">Pack {pack.name}</p>
                      {active && <Check className="w-5 h-5 flex-shrink-0" strokeWidth={3} />}
                    </div>
                    <p className={`text-xs ${active ? "text-white/80" : "text-on-surface-muted"}`}>
                      {pack.tagline}
                    </p>
                  </button>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* Step 2: addons */}
      <section className="px-6 md:px-10 pb-16">
        <div className="max-w-5xl mx-auto">
          <Reveal className="flex items-center gap-3 mb-6">
            <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-display text-sm flex-shrink-0">
              2
            </span>
            <h2 className="font-display text-2xl text-primary">Sumá adicionales</h2>
          </Reveal>

          <div className="space-y-8">
            {addonGroups.map((group) => (
              <Reveal key={group.title}>
                <h3 className="text-xs font-bold uppercase tracking-wide text-on-surface-muted mb-3">
                  {group.title}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {group.items.map((item) => {
                    const active = selectedAddons.has(item.key);
                    return (
                      <button
                        key={item.key}
                        onClick={() => toggleAddon(item.key)}
                        className={`flex items-start gap-3 text-left rounded-2xl border-2 p-4 transition-all ${
                          active
                            ? "bg-accent text-white border-accent"
                            : "bg-surface-alt border-border hover:border-accent/40"
                        }`}
                      >
                        <span
                          className={`w-5 h-5 rounded-md flex-shrink-0 flex items-center justify-center border-2 mt-0.5 ${
                            active ? "bg-white border-white" : "border-on-surface-muted"
                          }`}
                        >
                          {active && <Check className="w-3.5 h-3.5 text-accent" strokeWidth={3} />}
                        </span>
                        <span className="text-sm font-semibold leading-snug">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Step 3: summary */}
      <section className="px-6 md:px-10 pb-24">
        <div className="max-w-3xl mx-auto">
          <Reveal className="flex items-center gap-3 mb-6">
            <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-display text-sm flex-shrink-0">
              3
            </span>
            <h2 className="font-display text-2xl text-primary">Tu resumen</h2>
          </Reveal>

          <Reveal className="bg-white border border-border rounded-[2rem] p-8">
            {!hasSelection ? (
              <div className="text-center py-6">
                <Sparkles className="w-8 h-8 text-on-surface-muted mx-auto mb-3" />
                <p className="text-on-surface-muted text-sm">
                  Elegí un pack o algún adicional para armar tu resumen.
                </p>
              </div>
            ) : (
              <>
                <ul className="space-y-2 mb-6">
                  <li className="font-bold text-on-surface">
                    {selectedPack ? `Pack ${selectedPack.name}` : "Sin pack base"}
                  </li>
                  {chosenAddons.map((a) => (
                    <li key={a.key} className="flex items-start gap-2 text-sm text-on-surface-muted">
                      <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" strokeWidth={3} />
                      {a.label}
                    </li>
                  ))}
                </ul>
                <Button variant="primary" size="lg" className="w-full" asChild>
                  <a
                    href={whatsappUrl(summary)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    <WhatsAppIcon className="w-5 h-5" />
                    Mandar resumen por WhatsApp
                  </a>
                </Button>
              </>
            )}
          </Reveal>

          <p className="text-center text-on-surface-muted text-sm mt-6">
            ¿Preferís ver los packs cerrados primero?{" "}
            <Link to="/#packs" className="text-primary font-bold underline underline-offset-2">
              Ver packs
            </Link>
          </p>
        </div>
      </section>
    </PageShell>
  );
};

export default PackBuilder;
