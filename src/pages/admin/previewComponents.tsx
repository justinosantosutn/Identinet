import type { ComponentType } from "react";
import { Hero } from "@/components/ui/hero";
import { Services } from "@/components/sections/Services";
import { Packs } from "@/components/sections/Packs";
import { Extras } from "@/components/sections/Extras";
import { DesignCatalog } from "@/components/sections/DesignCatalog";
import { ResetDigital } from "@/components/sections/ResetDigital";
import { Drone } from "@/components/sections/Drone";
import { GiftCard } from "@/components/sections/GiftCard";
import { Tools } from "@/components/sections/Tools";
import { Support } from "@/components/sections/Support";
import { Clients } from "@/components/sections/Clients";
import { Contact } from "@/components/sections/Contact";
import TeamPage from "@/pages/TeamPage";

/** Maps each admin section key to the exact component the live site renders
 * for it, so the preview is never a hand-built approximation. */
export const previewComponents: Record<string, ComponentType> = {
  site: Contact,
  hero: Hero,
  services: Services,
  packs: Packs,
  extras: Extras,
  design: DesignCatalog,
  resetDigital: ResetDigital,
  drone: Drone,
  giftCard: GiftCard,
  tools: Tools,
  faq: Support,
  clients: Clients,
  team: TeamPage,
};
