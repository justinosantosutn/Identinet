import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { hydrateSite, type SiteConfig } from "@/lib/site";
import { hydratePacks, type Pack, type ComparisonRow } from "@/data/packs";
import { hydrateClients, type ClientCase } from "@/data/clients";

import defaultSite from "@/content/site.json";
import defaultHero from "@/content/hero.json";
import defaultServices from "@/content/services.json";
import defaultPacks from "@/content/packs.json";
import defaultExtras from "@/content/extras.json";
import defaultDesign from "@/content/design.json";
import defaultResetDigital from "@/content/resetDigital.json";
import defaultDrone from "@/content/drone.json";
import defaultGiftCard from "@/content/giftCard.json";
import defaultTools from "@/content/tools.json";
import defaultFaq from "@/content/faq.json";
import defaultClients from "@/content/clients.json";
import defaultTeam from "@/content/team.json";

export const CONTENT_KEYS = [
  "site",
  "hero",
  "services",
  "packs",
  "extras",
  "design",
  "resetDigital",
  "drone",
  "giftCard",
  "tools",
  "faq",
  "clients",
  "team",
] as const;

export type ContentKey = (typeof CONTENT_KEYS)[number];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ContentBundle {
  site: SiteConfig;
  hero: typeof defaultHero;
  services: typeof defaultServices;
  packs: { packs: Pack[]; comparison: ComparisonRow[] };
  extras: typeof defaultExtras;
  design: typeof defaultDesign;
  resetDigital: typeof defaultResetDigital;
  drone: typeof defaultDrone;
  giftCard: typeof defaultGiftCard;
  tools: typeof defaultTools;
  faq: typeof defaultFaq;
  clients: ClientCase[];
  team: typeof defaultTeam;
}

const defaults: ContentBundle = {
  site: defaultSite,
  hero: defaultHero,
  services: defaultServices,
  packs: defaultPacks as unknown as { packs: Pack[]; comparison: ComparisonRow[] },
  extras: defaultExtras,
  design: defaultDesign,
  resetDigital: defaultResetDigital,
  drone: defaultDrone,
  giftCard: defaultGiftCard,
  tools: defaultTools,
  faq: defaultFaq,
  clients: defaultClients as ClientCase[],
  team: defaultTeam,
};

const ContentContext = createContext<ContentBundle | null>(null);

const fetchKey = async (key: ContentKey) => {
  const res = await fetch(`/api/content/${key}`);
  if (!res.ok) throw new Error(`No se pudo cargar "${key}" (HTTP ${res.status})`);
  return res.json();
};

export const ContentProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<ContentBundle | null>(null);
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const entries = await Promise.all(
          CONTENT_KEYS.map(async (key) => [key, await fetchKey(key)] as const),
        );
        if (cancelled) return;
        const bundle = Object.fromEntries(entries) as unknown as ContentBundle;
        hydrateSite(bundle.site);
        hydratePacks(bundle.packs);
        hydrateClients(bundle.clients);
        setContent(bundle);
      } catch (err) {
        if (cancelled) return;
        console.error("No se pudo cargar el contenido en vivo, uso el contenido de fábrica.", err);
        hydrateSite(defaults.site);
        hydratePacks(defaults.packs);
        hydrateClients(defaults.clients);
        setOffline(true);
        setContent(defaults);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!content) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
      </div>
    );
  }

  return (
    <ContentContext.Provider value={content}>
      {offline && (
        <div className="bg-accent text-white text-xs text-center py-2 px-4 font-semibold">
          No se pudo conectar con el contenido en vivo — mostrando la última versión de fábrica.
        </div>
      )}
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = (): ContentBundle => {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent debe usarse dentro de <ContentProvider>");
  return ctx;
};
