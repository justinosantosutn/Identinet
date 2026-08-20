import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { useContent } from "@/lib/content-store";

export const Tools = () => {
  const { tools } = useContent();
  return (
    <section id="herramientas" className="bg-background px-6 md:px-10 py-14 md:py-28">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-8 md:mb-12">
          <span className="inline-block bg-quaternary text-on-quaternary rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wide mb-6">
            Con qué trabajamos
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-primary">
            Herramientas que utilizamos
          </h2>
        </Reveal>

        <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((t) => (
            <RevealItem
              key={t.fn}
              className="bg-surface-alt border border-border rounded-2xl px-6 py-5 hover:-translate-y-0.5 hover:border-primary/40 transition-all"
            >
              <p className="text-xs font-bold uppercase tracking-wide text-primary mb-1.5">
                {t.fn}
              </p>
              <p className="text-sm font-semibold text-on-surface">{t.tool}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
};
