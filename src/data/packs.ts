import defaultPacksContent from "@/content/packs.json";

export type Accent = "primary" | "accent" | "quaternary";

export interface Pack {
  slug: string;
  name: string;
  tagline: string;
  includes: string;
  features: string[];
  note: string;
  accent: Accent;
  highlight?: boolean;
}

export interface ComparisonRow {
  label: string;
  conectar: string;
  crear: string;
  impulsar: string;
}

export const packs: Pack[] = [...(defaultPacksContent.packs as Pack[])];
export const comparison: ComparisonRow[] = [...defaultPacksContent.comparison];

export const hydratePacks = (data: { packs: Pack[]; comparison: ComparisonRow[] }) => {
  packs.length = 0;
  packs.push(...data.packs);
  comparison.length = 0;
  comparison.push(...data.comparison);
};
