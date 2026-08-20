import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { destinations } from "@/data/destinations";

interface RelatedLinksProps {
  /** Route path of the current page, so it isn't listed as "related to itself". */
  exclude: string;
}

export const RelatedLinks = ({ exclude }: RelatedLinksProps) => {
  const others = destinations.filter((d) => d.to !== exclude).slice(0, 3);

  return (
    <section className="bg-background px-6 md:px-10 py-16 md:py-20 border-t border-border">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-center font-display text-2xl md:text-3xl text-primary mb-10">
          También te puede interesar
        </h2>
        <RevealGroup className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {others.map(({ icon: Icon, title, desc, to, bg, fg }) => (
            <RevealItem key={to}>
              <Link
                to={to}
                className={`group block h-full ${bg} ${fg} rounded-[1.75rem] p-6 shadow-[6px_6px_0px_rgba(36,27,34,0.1)] hover:-translate-y-1 transition-transform`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 bg-white/20 rounded-xl flex items-center justify-center">
                    <Icon className="w-5 h-5" strokeWidth={2} />
                  </div>
                  <ArrowUpRight className="w-4 h-4 opacity-90 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
                <h3 className="font-display text-lg mb-1">{title}</h3>
                <p className="text-xs opacity-90 leading-relaxed">{desc}</p>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
};
