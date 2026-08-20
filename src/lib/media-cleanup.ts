import { getAdminPasscode } from "@/lib/admin-auth";

const isBlobUrl = (url: string) => /^https:\/\/[a-z0-9-]+\.public\.blob\.vercel-storage\.com\//.test(url);

/** Best-effort delete of an uploaded file from Blob storage — called
 * whenever an image/video stops being referenced (replaced, cleared, or
 * its whole array item removed), so orphaned uploads don't pile up.
 * Never blocks or throws into the caller: losing a stray blob is much
 * cheaper than losing the user's edit because cleanup failed. */
export const deleteBlobIfOwned = (url: string | undefined | null) => {
  if (!url || !isBlobUrl(url)) return;
  fetch("/api/upload", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "x-admin-passcode": getAdminPasscode(),
    },
    body: JSON.stringify({ url }),
  }).catch(() => {});
};

/** Walks an arbitrary content value (e.g. a removed array item) and
 * deletes every Blob-hosted URL found inside it. */
export const deleteBlobsDeep = (value: unknown) => {
  if (typeof value === "string") {
    deleteBlobIfOwned(value);
    return;
  }
  if (Array.isArray(value)) {
    value.forEach(deleteBlobsDeep);
    return;
  }
  if (value && typeof value === "object") {
    Object.values(value).forEach(deleteBlobsDeep);
  }
};
