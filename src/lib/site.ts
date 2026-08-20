import defaultSite from "@/content/site.json";

export interface SiteConfig {
  whatsapp: string;
  instagram: string;
  tiktok: string;
  email: string;
  adminPasscode?: string;
  [key: string]: unknown;
}

export const siteConfig: SiteConfig = { ...defaultSite };

export const hydrateSite = (data: SiteConfig) => {
  Object.keys(siteConfig).forEach((k) => delete siteConfig[k]);
  Object.assign(siteConfig, data);
};

export const whatsappUrl = (message?: string) => {
  const base = `https://wa.me/${siteConfig.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
};

export const instagramUrl = () => `https://www.instagram.com/${siteConfig.instagram}/`;
export const tiktokUrl = () => `https://www.tiktok.com/@${siteConfig.tiktok}`;
