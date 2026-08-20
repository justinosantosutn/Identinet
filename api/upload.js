import { del } from "@vercel/blob";
import { handleUpload } from "@vercel/blob/client";

const DEFAULT_PASSCODE = "identinet2026";

const isAuthorized = (passcode) => passcode === (process.env.ADMIN_PASSCODE || DEFAULT_PASSCODE);

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
        let passcode = "";
        try {
          passcode = JSON.parse(clientPayload || "{}").passcode ?? "";
        } catch {
          passcode = "";
        }
        if (!isAuthorized(passcode)) {
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

// Called whenever the admin replaces, clears, or removes something that
// referenced an uploaded file — keeps Blob storage from accumulating
// orphaned uploads that nothing in the content points to anymore.
export async function DELETE(request) {
  if (!isAuthorized(request.headers.get("x-admin-passcode"))) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { url } = await request.json();
    if (!url || typeof url !== "string") {
      return Response.json({ error: "Missing url" }, { status: 400 });
    }
    await del(url);
    return Response.json({ ok: true });
  } catch (err) {
    console.error(err);
    return Response.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 400 },
    );
  }
}
