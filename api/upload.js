import { handleUpload } from "@vercel/blob/client";

const DEFAULT_PASSCODE = "identinet2026";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end();
  }

  try {
    const jsonResponse = await handleUpload({
      body: req.body,
      request: req,
      onBeforeGenerateToken: async (_pathname, clientPayload) => {
        const expected = process.env.ADMIN_PASSCODE || DEFAULT_PASSCODE;
        let passcode = "";
        try {
          passcode = JSON.parse(clientPayload || "{}").passcode ?? "";
        } catch {
          passcode = "";
        }
        if (passcode !== expected) {
          throw new Error("No autorizado");
        }
        return {
          allowedContentTypes: ["image/*", "video/*"],
          addRandomSuffix: true,
          maximumSizeInBytes: 200 * 1024 * 1024,
        };
      },
    });
    return res.status(200).json(jsonResponse);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: err instanceof Error ? err.message : String(err) });
  }
}
