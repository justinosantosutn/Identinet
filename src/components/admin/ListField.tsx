import { Plus } from "lucide-react";
import { ConfirmDeleteButton } from "./ConfirmDeleteButton";

interface ListFieldProps {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
}

export const ListField = ({ label, value, onChange }: ListFieldProps) => {
  const items = value ?? [];

  const update = (i: number, text: string) => {
    const next = [...items];
    next[i] = text;
    onChange(next);
  };

  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i));
  const add = () => onChange([...items, ""]);

  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-wide text-on-surface-muted mb-2">
        {label}
      </label>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              type="text"
              value={item}
              onChange={(e) => update(i, e.target.value)}
              className="flex-1 rounded-lg border border-border px-3 py-2 text-sm"
            />
            <ConfirmDeleteButton onConfirm={() => remove(i)} />
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={add}
        className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
      >
        <Plus className="w-3.5 h-3.5" />
        Agregar
      </button>
    </div>
  );
};
