import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Check, ChevronDown, ExternalLink, Loader2, RotateCcw, Save } from "lucide-react";
import { ObjectFields } from "@/components/admin/ObjectFields";
import { getAdminPasscode } from "@/lib/admin-auth";
import { setAdminDirty, confirmLeaveIfDirty } from "@/lib/admin-dirty";
import { ContentOverride } from "@/lib/content-store";
import { hydrateSite, type SiteConfig } from "@/lib/site";
import { hydratePacks, type Pack, type ComparisonRow } from "@/data/packs";
import { hydrateClients, type ClientCase } from "@/data/clients";
import { PreviewFrame } from "@/components/admin/PreviewFrame";
import { PreviewBoundary } from "@/components/admin/PreviewBoundary";
import { HeroCardPositioner } from "@/components/admin/HeroCardPositioner";
import type { CardPosition } from "@/components/ui/hero";
import { previewComponents } from "./previewComponents";
import { getSection, sections } from "./schemas";

interface FloatingCardDraft {
  handle: string;
  metric: string;
  avatarSeed: string;
  position?: { mobile?: CardPosition; desktop?: CardPosition };
}

type Status = "loading" | "ready" | "saving" | "saved" | "error";

const isDigitsOnly = (v: string) => /^\d+$/.test(v);

/** Section keys whose live components read from the mutable singleton
 * modules (lib/site, data/packs, data/clients) instead of useContent() —
 * the preview has to hydrate those in sync with the draft, not just
 * override context, or it would keep showing the last-saved values. */
const syncSingleton = (key: string, value: unknown) => {
  if (key === "site") hydrateSite(value as SiteConfig);
  if (key === "packs") hydratePacks(value as { packs: Pack[]; comparison: ComparisonRow[] });
  if (key === "clients") hydrateClients(value as ClientCase[]);
};

// Forces a full remount when the section changes, instead of reusing the
// same instance — otherwise there's a render frame where `section` already
// points at the new key but `data` state still holds the old section's
// shape, which can crash a preview component (e.g. an array handed to a
// component expecting an object) and take down the whole app.
const ContentEditor = () => {
  const { key } = useParams();
  return <ContentEditorInner key={key} />;
};

const ContentEditorInner = () => {
  const { key } = useParams();
  const navigate = useNavigate();
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

  // Keep the singleton-backed preview components (site/packs/clients) in
  // sync with the draft while this editor is open, and put back whatever
  // was actually last saved when leaving — so navigating elsewhere in the
  // admin never leaves the rest of the app showing unsaved draft data.
  useEffect(() => {
    if (!section || data === null) return;
    syncSingleton(section.key, data);
  }, [section, data]);

  useEffect(() => {
    if (!section) return;
    return () => {
      if (savedData !== null) syncSingleton(section.key, savedData);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const hasChanges = JSON.stringify(data) !== JSON.stringify(savedData);

  useEffect(() => {
    setAdminDirty(hasChanges);
    return () => setAdminDirty(false);
  }, [hasChanges]);

  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (!hasChanges) return;
      e.preventDefault();
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [hasChanges]);

  if (!section) {
    return <p className="text-on-surface-muted">Sección no encontrada.</p>;
  }

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
      if (res.status === 401) {
        throw new Error(
          "Tu sesión de admin venció o quedó incompleta. Recargá esta página y volvé a ingresar el código.",
        );
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setSavedData(data);
      setStatus("saved");
      // Content is rendered from data fetched once at app boot, so a hard
      // reload is the simplest way to guarantee every page reflects the save.
      setTimeout(() => window.location.reload(), 900);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
      setStatus("error");
      // A save failure is easy to miss as small red text below a busy form —
      // make it impossible to not notice.
      alert(`No se guardaron los cambios: ${message}`);
    }
  };

  const PreviewComponent = previewComponents[section.key];

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-4 mb-2">
        <div className="min-w-0">
          <div className="relative inline-block mb-1">
            <select
              value={section.key}
              onChange={(e) => {
                if (!confirmLeaveIfDirty()) return;
                navigate(`/admin/${e.target.value}`);
              }}
              className="appearance-none font-display text-2xl md:text-3xl text-primary bg-transparent pr-8 cursor-pointer focus:outline-none max-w-full"
            >
              {sections.map((s) => (
                <option key={s.key} value={s.key}>
                  {s.title}
                </option>
              ))}
            </select>
            <ChevronDown className="w-5 h-5 text-primary pointer-events-none absolute right-0 top-1/2 -translate-y-1/2" />
          </div>
          <p className="text-on-surface-muted text-sm">{section.description}</p>
        </div>
        <div className="flex-shrink-0 flex flex-wrap items-center gap-2">
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
        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_440px] gap-6 items-start">
          <div>
            {section.key === "hero" && (
              <HeroCardPositioner
                cards={(data as { floatingCards: FloatingCardDraft[] }).floatingCards ?? []}
                onChange={(index, breakpoint, position) => {
                  setData((prev: unknown) => {
                    const draft = structuredClone(prev) as { floatingCards: FloatingCardDraft[] };
                    const card = draft.floatingCards[index];
                    if (!card) return prev;
                    card.position = { ...card.position, [breakpoint]: position };
                    return draft;
                  });
                }}
              />
            )}
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
          </div>

          {PreviewComponent && (
            <div className="xl:sticky xl:top-6">
              <p className="text-xs font-bold uppercase tracking-wide text-on-surface-muted mb-3">
                Preview — así quedaría
              </p>
              <PreviewBoundary key={JSON.stringify(data)}>
                <PreviewFrame>
                  <ContentOverride overrides={{ [section.key]: data } as never}>
                    <PreviewComponent />
                  </ContentOverride>
                </PreviewFrame>
              </PreviewBoundary>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ContentEditor;
