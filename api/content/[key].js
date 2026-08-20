import { put, list } from "@vercel/blob";
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

const findBlob = async (key) => {
  const { blobs } = await list({ prefix: `content/${key}.json` });
  return blobs.find((b) => b.pathname === `content/${key}.json`) ?? null;
};

// Vercel Blob's own upload timestamp doubles as a free version token — no
// extra bookkeeping needed. "0" means "no saved version yet" (still on the
// bundled default).
const versionOf = (blob) => (blob ? String(new Date(blob.uploadedAt).getTime()) : "0");

export default async function handler(req, res) {
  const { key } = req.query;
  if (!ALLOWED_KEYS.has(key)) {
    return res.status(404).json({ error: "Unknown content key" });
  }

  if (req.method === "GET") {
    try {
      const blob = await findBlob(key);
      res.setHeader("X-Content-Version", versionOf(blob));
      if (blob) {
        const upstream = await fetch(blob.url, { cache: "no-store" });
        const json = await upstream.json();
        return res.status(200).json(json);
      }
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
      // Two admins editing the same section: whoever saves second would
      // otherwise silently overwrite the first's changes with no warning.
      // Re-check the version right before writing and refuse if it moved.
      const clientVersion = req.headers["x-content-version"];
      if (clientVersion) {
        const current = await findBlob(key);
        if (versionOf(current) !== clientVersion) {
          return res.status(409).json({
            error: "conflict",
            message: "Alguien más guardó cambios en esta sección mientras la editabas.",
          });
        }
      }
      await put(`content/${key}.json`, JSON.stringify(req.body, null, 2), {
        access: "public",
        contentType: "application/json",
        addRandomSuffix: false,
        allowOverwrite: true,
      });
      const saved = await findBlob(key);
      res.setHeader("X-Content-Version", versionOf(saved));
      return res.status(200).json({ ok: true });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Could not save content", detail: String(err) });
    }
  }

  res.setHeader("Allow", "GET, PUT");
  return res.status(405).end();
}
