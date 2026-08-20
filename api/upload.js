import { handleUpload } from "@vercel/blob/client";

const DEFAULT_PASSCODE = "identinet2026";

// Web-standard Request/Response signature — @vercel/blob/client's
// handleUpload expects to call methods like request.headers.get(...),
// which a classic Node (req, res) object doesn't have. Vercel's Node.js
// functions support both conventions; this is the one their own docs use
// for client uploads.
export async function POST(request) {
  const body = await request.json();

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
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
    return Response.json(jsonResponse);
  } catch (err) {
    console.error(err);
    return Response.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 400 },
    );
  }
}
