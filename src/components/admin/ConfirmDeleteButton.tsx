import { useEffect, useRef, useState } from "react";
import { Trash2, Check } from "lucide-react";

interface ConfirmDeleteButtonProps {
  onConfirm: () => void;
  label?: string;
  className?: string;
}

/** Requires two clicks: the first arms it ("¿Eliminar?"), the second
 * (within 3s) actually deletes. Clicking away or waiting resets it. */
export const ConfirmDeleteButton = ({ onConfirm, label = "Quitar", className }: ConfirmDeleteButtonProps) => {
  const [armed, setArmed] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleClick = () => {
    if (!armed) {
      setArmed(true);
      timeoutRef.current = setTimeout(() => setArmed(false), 3000);
      return;
    }
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setArmed(false);
    onConfirm();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      onBlur={() => setArmed(false)}
      aria-label={armed ? "Confirmar eliminación" : label}
      className={
        className ??
        `flex-shrink-0 rounded-lg border flex items-center justify-center transition-colors ${
          armed
            ? "bg-error text-white border-error px-2 h-8 gap-1"
            : "w-8 h-8 border-border text-error hover:bg-error/10"
        }`
      }
    >
      {armed ? (
        <>
          <Check className="w-3.5 h-3.5" />
          <span className="text-[10px] font-bold whitespace-nowrap">¿Seguro?</span>
        </>
      ) : (
        <Trash2 className="w-3.5 h-3.5" />
      )}
    </button>
  );
};
