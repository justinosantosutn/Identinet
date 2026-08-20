import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Check, ExternalLink, Loader2, RotateCcw, Save } from "lucide-react";
import { ObjectFields } from "@/components/admin/ObjectFields";
import { getAdminPasscode } from "@/lib/admin-auth";
import { getSection } from "./schemas";

type Status = "loading" | "ready" | "saving" | "saved" | "error";

const isDigitsOnly = (v: string) => /^\d+$/.test(v);

const ContentEditor = () => {
  const { key } = useParams();
  const section = key ? getSection(key) : undefined;
  const [data, setData] = useState<unknown>(null);
  const [savedData, setSavedData] = useState<unknown>(null);
  const [status, setStatus] = useState<Status>("loading");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!section) return;
    let ignore = false;
    setStatus("loading");
    setData(null);
    setSavedData(null);
    setError(null);
    fetch(`/api/content/${section.key}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => {
        if (ignore) return;
        setData(json);
        setSavedData(json);
        setStatus("ready");
      })
      .catch((err) => {
        if (ignore) return;
        setError(String(err));
        setStatus("error");
      });
    return () => {
      ignore = true;
    };
  }, [section]);

  const whatsappError = useMemo(() => {
    if (section?.key !== "site" || !data) return null;
    const value = (data as { whatsapp?: string }).whatsapp ?? "";
    if (!value) return "Falta el número de WhatsApp — los botones del sitio dejarían de funcionar.";
    if (!isDigitsOnly(value)) {
      return "El WhatsApp debe tener solo números (código de país + número, sin espacios, guiones ni +).";
    }
    return null;
  }, [section, data]);

  if (!section) {
    return <p className="text-on-surface-muted">Sección no encontrada.</p>;
  }

  const hasChanges = JSON.stringify(data) !== JSON.stringify(savedData);

  const discard = () => setData(savedData);

  const save = async () => {
    if (whatsappError) return;
    setStatus("saving");
    try {
      const res = await fetch(`/api/content/${section.key}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-passcode": getAdminPasscode(),
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setSavedData(data);
      setStatus("saved");
      // Content is rendered from data fetched once at app boot, so a hard
      // reload is the simplest way to guarantee every page reflects the save.
      setTimeout(() => window.location.reload(), 900);
    } catch (err) {
      setError(String(err));
      setStatus("error");
    }
  };

  return (
    <div>
      <div className="flex items-start justify-between gap-4 mb-2">
        <div>
          <h1 className="font-display text-3xl text-primary mb-1">{section.title}</h1>
          <p className="text-on-surface-muted text-sm">{section.description}</p>
        </div>
        <div className="flex-shrink-0 flex items-center gap-2">
          {hasChanges && (
            <button
              onClick={discard}
              disabled={status === "saving"}
              className="inline-flex items-center gap-1.5 text-on-surface-muted hover:text-error text-xs font-bold px-3 py-2.5 rounded-full border border-border disabled:opacity-50"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Descartar
            </button>
          )}
          <button
            onClick={save}
            disabled={status === "loading" || status === "saving" || !!whatsappError}
            className="inline-flex items-center gap-2 bg-primary text-white font-bold text-sm px-5 py-2.5 rounded-full disabled:opacity-50"
          >
            {status === "saving" ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : status === "saved" ? (
              <Check className="w-4 h-4" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {status === "saved" ? "Guardado" : "Guardar cambios"}
          </button>
        </div>
      </div>

      <a
        href={section.previewPath}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline mb-8"
      >
        Ver en el sitio
        <ExternalLink className="w-3 h-3" />
      </a>

      {status === "loading" && <p className="text-on-surface-muted text-sm">Cargando…</p>}

      {status === "error" && (
        <p className="text-error text-sm">Hubo un error: {error}.</p>
      )}

      {whatsappError && (
        <p className="text-error text-xs font-semibold mb-4 -mt-4">{whatsappError}</p>
      )}

      {data !== null && status !== "loading" && (
        <div className="bg-white border border-border rounded-2xl p-6">
          {section.schema.kind === "array" ? (
            <ObjectFields
              fields={[{ key: "__root", label: section.title, kind: "array", itemLabel: section.schema.itemLabel, fields: section.schema.fields }]}
              value={{ __root: data }}
              onChange={(v) => setData(v.__root)}
            />
          ) : (
            <ObjectFields
              fields={section.schema.fields}
              value={data as Record<string, unknown>}
              onChange={setData}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ContentEditor;
