import express from "express";
import multer from "multer";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const contentDir = path.join(rootDir, "src", "content");
const publicDir = path.join(rootDir, "public");

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

const app = express();
app.use(express.json({ limit: "2mb" }));

app.get("/api/content", (_req, res) => {
  res.json({ keys: Array.from(ALLOWED_KEYS) });
});

app.get("/api/content/:key", (req, res) => {
  const { key } = req.params;
  if (!ALLOWED_KEYS.has(key)) {
    return res.status(404).json({ error: "Unknown content key" });
  }
  const filePath = path.join(contentDir, `${key}.json`);
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    res.type("application/json").send(raw);
  } catch (err) {
    res.status(500).json({ error: "Could not read content", detail: String(err) });
  }
});

app.put("/api/content/:key", (req, res) => {
  const { key } = req.params;
  if (!ALLOWED_KEYS.has(key)) {
    return res.status(404).json({ error: "Unknown content key" });
  }
  const filePath = path.join(contentDir, `${key}.json`);
  try {
    fs.writeFileSync(filePath, JSON.stringify(req.body, null, 2) + "\n", "utf-8");
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: "Could not save content", detail: String(err) });
  }
});

const storage = multer.diskStorage({
  destination: (req, _file, cb) => {
    const type = req.query.type === "video" ? "videos" : "images";
    const dir = path.join(publicDir, "uploads", type);
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (_req, file, cb) => {
    const safeName = file.originalname.replace(/[^a-zA-Z0-9_.-]/g, "-");
    cb(null, `${Date.now()}-${safeName}`);
  },
});
const upload = multer({ storage, limits: { fileSize: 200 * 1024 * 1024 } });

app.post("/api/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  const type = req.query.type === "video" ? "videos" : "images";
  res.json({ url: `/uploads/${type}/${req.file.filename}` });
});

const PORT = 4174;
app.listen(PORT, () => {
  console.log(`[admin-api] listening on http://localhost:${PORT}`);
});
