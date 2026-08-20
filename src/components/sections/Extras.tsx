import { useMemo } from "react";
import { Video, TrendingUp, Route, type LucideIcon } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { useContent } from "@/lib/content-store";

interface ExtraContent {
  title: string;
  bullets: string[];
}

const icons: LucideIcon[] = [Video, TrendingUp, Route];
const colors: { bg: string; fg: string }[] = [
  { bg: "bg-primary", fg: "text-white" },
  { bg: "bg-accent", fg: "text-white" },
  { bg: "bg-quaternary", fg: "text-white" },
];

export const Extras = () => {
  const { extras: extrasContent } = useContent();
  const extras = useMemo(
    () =>
      (extrasContent as ExtraContent[]).map((e, i) => ({
        ...e,
        icon: icons[i % icons.length],
        ...colors[i % colors.length],
      })),
    [extrasContent],
  );
  return (
    <section id="adicionales" className="bg-background-soft px-6 md:px-10 py-20 md:py-28">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-14">
          <span className="inline-block bg-tertiary text-on-tertiary rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wide mb-6">
            Sumá a cualquier pack
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-primary">Adicionales</h2>
        </Reveal>

        <RevealGroup className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {extras.map(({ icon: Icon, title, bullets, bg, fg }) => (
            <RevealItem
              key={title}
              className={`${bg} ${fg} rounded-[2rem] p-8 shadow-[6px_6px_0px_rgba(36,27,34,0.15)] hover:-translate-y-1 transition-transform`}
            >
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                <Icon className="w-7 h-7" strokeWidth={2} />
              </div>
              <h3 className="font-display text-2xl mb-4">{title}</h3>
              <ul className="space-y-2.5">
                {bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm font-semibold leading-snug">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/80 flex-shrink-0 mt-1.5" />
                    {b}
                  </li>
                ))}
              </ul>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
};
