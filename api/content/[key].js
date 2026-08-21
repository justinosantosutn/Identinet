import { createClient } from "@supabase/supabase-js";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contentDir = path.join(__dirname, "..", "..", "src", "content");

const ALLOWED_KEYS = new Set([
  "site",
  "hero",
  "services",
  "packs",
  "extras",
  "design",
  "resetDigital",
  "drone",
  "giftCard",
  "tools",
  "faq",
  "clients",
  "team",
]);

const DEFAULT_PASSCODE = "identinet2026";

const readBundledDefault = (key) => {
  const filePath = path.join(contentDir, `${key}.json`);
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
};

let supabase = null;
const getSupabase = () => {
  if (supabase) return supabase;
  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return null;
  supabase = createClient(url, serviceKey, {
    auth: { persistSession: false },
  });
  return supabase;
};

export default async function handler(req, res) {
  const { key } = req.query;
  if (!ALLOWED_KEYS.has(key)) {
    return res.status(404).json({ error: "Unknown content key" });
  }

  const db = getSupabase();

  if (req.method === "GET") {
    if (db) {
      try {
        const { data, error } = await db.from("content").select("data").eq("key", key).maybeSingle();
        if (error) throw error;
        if (data) return res.status(200).json(data.data);
      } catch (err) {
        console.error(`Falling back to bundled default for "${key}":`, err);
      }
    }
    try {
      return res.status(200).json(readBundledDefault(key));
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Could not read content", detail: String(err) });
    }
  }

  if (req.method === "PUT") {
    const passcode = req.headers["x-admin-passcode"];
    const expected = process.env.ADMIN_PASSCODE || DEFAULT_PASSCODE;
    if (passcode !== expected) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    if (!db) {
      return res.status(500).json({
        error: "Could not save content",
        detail: "Supabase is not configured (missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY).",
      });
    }
    try {
      const { error } = await db.from("content").upsert({ key, data: req.body });
      if (error) throw error;
      return res.status(200).json({ ok: true });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Could not save content", detail: String(err) });
    }
  }

  res.setHeader("Allow", "GET, PUT");
  return res.status(405).end();
}
