import { User } from "lucide-react";
import { PageShell } from "@/components/ui/page-shell";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { SwirlCorner } from "@/components/ui/swirl-corner";
import teamContent from "@/content/team.json";

const accents = ["bg-primary", "bg-accent", "bg-quaternary"];

interface TeamMember {
  slug: string;
  name: string;
  role: string;
  photo: string;
  bio: string;
  facts: { label: string; value: string }[];
}

const team = teamContent as TeamMember[];

const TeamPage = () => (
  <PageShell backTo="/#nosotros">
    <Reveal className="relative px-6 md:px-10 pt-6 pb-14 md:pb-20 overflow-hidden">
      <SwirlCorner
        variant="fresh"
        className="absolute -top-10 -left-16 w-56 h-56 md:w-72 md:h-72 opacity-30 z-0"
        flip
      />
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <span className="inline-block bg-quaternary text-white rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wide mb-6">
          El equipo
        </span>
        <h1 className="font-display text-4xl md:text-6xl text-primary leading-[1.05] mb-4">
          Conocé a cada una
        </h1>
        <p className="text-on-surface-muted text-base md:text-lg max-w-xl mx-auto">
          Somos tres, cada una con su rol, pero con el mismo objetivo: que tu marca se vea y se
          sienta como se merece.
        </p>
      </div>
    </Reveal>

    <section className="px-6 md:px-10 pb-24 md:pb-32">
      <RevealGroup className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {team.map((member, i) => (
          <RevealItem
            key={member.slug}
            className="bg-white border border-border rounded-[2rem] overflow-hidden shadow-[6px_6px_0px_rgba(36,27,34,0.06)]"
          >
            <div className={`${accents[i % accents.length]} h-40 flex items-center justify-center`}>
              {member.photo ? (
                <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
              ) : (
                <User className="w-14 h-14 text-white/70" strokeWidth={1.5} />
              )}
            </div>
            <div className="p-6">
              <h2 className="font-display text-2xl text-primary mb-1">{member.name}</h2>
              <p className="text-xs font-bold uppercase tracking-wide text-on-surface-muted mb-4">
                {member.role}
              </p>
              {member.bio && (
                <p className="text-sm text-on-surface-muted leading-relaxed mb-5">{member.bio}</p>
              )}
              {member.facts.filter((f) => f.value).length > 0 && (
                <ul className="space-y-2 border-t border-border pt-4">
                  {member.facts
                    .filter((f) => f.value)
                    .map((f) => (
                      <li key={f.label} className="flex items-center justify-between gap-3 text-sm">
                        <span className="font-bold text-on-surface">{f.label}</span>
                        <span className="text-on-surface-muted text-right">{f.value}</span>
                      </li>
                    ))}
                </ul>
              )}
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  </PageShell>
);

export default TeamPage;
