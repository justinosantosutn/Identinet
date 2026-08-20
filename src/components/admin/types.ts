export type FieldSchema =
  | { key: string; label: string; kind: "text" }
  | { key: string; label: string; kind: "textarea" }
  | { key: string; label: string; kind: "boolean" }
  | { key: string; label: string; kind: "select"; options: string[] }
  | { key: string; label: string; kind: "list" }
  | { key: string; label: string; kind: "media"; accept: "image" | "video" }
  | { key: string; label: string; kind: "array"; itemLabel: string; fields: FieldSchema[] };

export type RootSchema =
  | { kind: "object"; fields: FieldSchema[] }
  | { kind: "array"; itemLabel: string; fields: FieldSchema[] };

export interface SectionConfig {
  key: string;
  title: string;
  description: string;
  /** Public route where this content actually renders, for the "Ver en el sitio" link. */
  previewPath: string;
  schema: RootSchema;
}
