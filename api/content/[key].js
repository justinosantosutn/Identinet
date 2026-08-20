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

export default async function handler(req, res) {
  const { key } = req.query;
  if (!ALLOWED_KEYS.has(key)) {
    return res.status(404).json({ error: "Unknown content key" });
  }

  if (req.method === "GET") {
    try {
      const { blobs } = await list({ prefix: `content/${key}.json` });
      const blob = blobs.find((b) => b.pathname === `content/${key}.json`);
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
