import { ChevronDown, ChevronUp, Plus } from "lucide-react";
import type { FieldSchema } from "./types";
import { ListField } from "./ListField";
import { MediaField } from "./MediaField";
import { ConfirmDeleteButton } from "./ConfirmDeleteButton";

interface ObjectFieldsProps {
  fields: FieldSchema[];
  value: Record<string, unknown>;
  onChange: (value: Record<string, unknown>) => void;
}

const emptyForField = (field: FieldSchema): unknown => {
  switch (field.kind) {
    case "list":
      return [];
    case "boolean":
      return false;
    case "array":
      return [];
    default:
      return "";
  }
};

export const ObjectFields = ({ fields, value, onChange }: ObjectFieldsProps) => {
  const set = (key: string, v: unknown) => onChange({ ...value, [key]: v });

  return (
    <div className="space-y-6">
      {fields.map((field) => {
        const current = value?.[field.key];

        if (field.kind === "text") {
          return (
            <div key={field.key}>
              <label className="block text-xs font-bold uppercase tracking-wide text-on-surface-muted mb-2">
                {field.label}
              </label>
              <input
                type="text"
                value={(current as string) ?? ""}
                onChange={(e) => set(field.key, e.target.value)}
                className="w-full rounded-lg border border-border px-3 py-2 text-sm"
              />
            </div>
          );
        }

        if (field.kind === "textarea") {
          return (
            <div key={field.key}>
              <label className="block text-xs font-bold uppercase tracking-wide text-on-surface-muted mb-2">
                {field.label}
              </label>
              <textarea
                value={(current as string) ?? ""}
                onChange={(e) => set(field.key, e.target.value)}
                rows={3}
                className="w-full rounded-lg border border-border px-3 py-2 text-sm resize-y"
              />
            </div>
          );
        }

        if (field.kind === "boolean") {
          return (
            <label key={field.key} className="flex items-center gap-2 text-sm font-semibold">
              <input
                type="checkbox"
                checked={Boolean(current)}
                onChange={(e) => set(field.key, e.target.checked)}
                className="w-4 h-4"
              />
              {field.label}
            </label>
          );
        }

        if (field.kind === "select") {
          return (
            <div key={field.key}>
              <label className="block text-xs font-bold uppercase tracking-wide text-on-surface-muted mb-2">
                {field.label}
              </label>
              <select
                value={(current as string) ?? field.options[0]}
                onChange={(e) => set(field.key, e.target.value)}
                className="w-full rounded-lg border border-border px-3 py-2 text-sm bg-white"
              >
                {field.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          );
        }

        if (field.kind === "list") {
          return (
            <ListField
              key={field.key}
              label={field.label}
              value={(current as string[]) ?? []}
              onChange={(v) => set(field.key, v)}
            />
          );
        }

        if (field.kind === "media") {
          return (
            <MediaField
              key={field.key}
              label={field.label}
              value={(current as string) ?? ""}
              accept={field.accept}
              onChange={(v) => set(field.key, v)}
            />
          );
        }

        if (field.kind === "array") {
          const items = (current as Record<string, unknown>[]) ?? [];
          const move = (i: number, dir: -1 | 1) => {
            const j = i + dir;
            if (j < 0 || j >= items.length) return;
            const next = [...items];
            [next[i], next[j]] = [next[j], next[i]];
            set(field.key, next);
          };
          return (
            <div key={field.key}>
              <label className="block text-xs font-bold uppercase tracking-wide text-on-surface-muted mb-3">
                {field.label}
              </label>
              <div className="space-y-4">
                {items.map((item, i) => (
                  <div key={i} className="border border-border rounded-xl p-4 bg-surface-alt">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-on-surface-muted">
                        {field.itemLabel} {i + 1}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => move(i, -1)}
                          disabled={i === 0}
                          aria-label={`Subir ${field.itemLabel.toLowerCase()}`}
                          className="w-7 h-7 rounded-lg border border-border text-on-surface-muted hover:text-primary hover:border-primary/40 flex items-center justify-center disabled:opacity-30 disabled:pointer-events-none"
                        >
                          <ChevronUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => move(i, 1)}
                          disabled={i === items.length - 1}
                          aria-label={`Bajar ${field.itemLabel.toLowerCase()}`}
                          className="w-7 h-7 rounded-lg border border-border text-on-surface-muted hover:text-primary hover:border-primary/40 flex items-center justify-center disabled:opacity-30 disabled:pointer-events-none"
                        >
                          <ChevronDown className="w-3.5 h-3.5" />
                        </button>
                        <ConfirmDeleteButton
                          onConfirm={() => set(field.key, items.filter((_, idx) => idx !== i))}
                        />
                      </div>
                    </div>
                    <ObjectFields
                      fields={field.fields}
                      value={item}
                      onChange={(v) => {
                        const next = [...items];
                        next[i] = v;
                        set(field.key, next);
                      }}
                    />
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => {
                  const blank: Record<string, unknown> = {};
                  field.fields.forEach((f) => (blank[f.key] = emptyForField(f)));
                  set(field.key, [...items, blank]);
                }}
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
              >
                <Plus className="w-3.5 h-3.5" />
                Agregar {field.itemLabel.toLowerCase()}
              </button>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
};
