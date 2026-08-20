import clientsContent from "@/content/clients.json";

export type Accent = "primary" | "accent" | "quaternary";

export interface Highlight {
  title: string;
  description: string;
  image: string;
}

export interface ClientCase {
  slug: string;
  name: string;
  role: string;
  brand: string;
  quote: string;
  video: string;
  accent: Accent;
  summary: string;
  pack: string;
  highlights: Highlight[];
}

export const clients: ClientCase[] = clientsContent as ClientCase[];
