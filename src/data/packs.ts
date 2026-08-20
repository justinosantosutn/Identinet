import packsContent from "@/content/packs.json";

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

export const packs: Pack[] = packsContent.packs as Pack[];
export const comparison: ComparisonRow[] = packsContent.comparison;
