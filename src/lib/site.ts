import site from "@/content/site.json";

export const siteConfig = site;

export const whatsappUrl = (message?: string) => {
  const base = `https://wa.me/${site.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
};

export const instagramUrl = `https://www.instagram.com/${site.instagram}/`;
export const tiktokUrl = `https://www.tiktok.com/@${site.tiktok}`;
