import { put } from "@vercel/blob";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contentDir = path.join(__dirname, "..", "..", "src", "content");

// Vercel Blob read-write tokens are shaped `vercel_blob_rw_<storeId>_<secret>`,
// and public blobs are always served from `https://<storeId>.public.blob.vercel-storage.com/<pathname>`.
// Building that URL ourselves lets GETs fetch the blob directly instead of calling
// list() first — list() is billed as an "Advanced Operation" on Vercel Blob and
// doing one per content key on every page load was exhausting the plan's quota.
const blobUrlForKey = (key) => {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) return null;
  const storeId = token.split("_")[3];
  if (!storeId) return null;
  return `https://${storeId}.public.blob.vercel-storage.com/content/${key}.json`;
};

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

export default async function handler(req, res) {
  const { key } = req.query;
  if (!ALLOWED_KEYS.has(key)) {
    return res.status(404).json({ error: "Unknown content key" });
  }

  if (req.method === "GET") {
    const blobUrl = blobUrlForKey(key);
    if (blobUrl) {
      try {
        const upstream = await fetch(blobUrl, { cache: "no-store" });
        if (!upstream.ok) throw new Error(`Blob fetch failed with HTTP ${upstream.status}`);
        const json = await upstream.json();
        return res.status(200).json(json);
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
    try {
      await put(`content/${key}.json`, JSON.stringify(req.body, null, 2), {
        access: "public",
        contentType: "application/json",
        addRandomSuffix: false,
        allowOverwrite: true,
      });
      return res.status(200).json({ ok: true });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Could not save content", detail: String(err) });
    }
  }

  res.setHeader("Allow", "GET, PUT");
  return res.status(405).end();
}
