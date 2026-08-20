import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { InstagramIcon, TikTokIcon, WhatsAppIcon } from "@/components/ui/brand-icons";
import { SwirlCorner } from "@/components/ui/swirl-corner";
import { siteConfig, whatsappUrl, instagramUrl, tiktokUrl } from "@/lib/site";

export const Contact = () => {
  return (
    <section id="contacto" className="bg-primary px-6 md:px-10 py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff14_1px,transparent_1px),linear-gradient(to_bottom,#ffffff14_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      <SwirlCorner
        variant="mono"
        className="absolute -bottom-16 -left-16 w-64 h-64 md:w-80 md:h-80 opacity-60 z-0"
      />

      <Reveal className="max-w-3xl mx-auto text-center relative z-10">
        <span className="inline-block bg-accent text-white rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wide mb-6">
          ¡Gracias!
        </span>
        <h2 className="font-display text-4xl md:text-6xl text-white leading-[1.05] mb-6">
          Hablemos de tu marca
        </h2>
        <p className="text-white/85 text-base md:text-lg mb-10 max-w-xl mx-auto">
          Por cualquier duda nos encontramos a disposición. Consultanos el
          valor de tu pack o servicio por WhatsApp.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button variant="accent" size="lg" asChild>
            <a
              href={whatsappUrl("Hola! Quiero consultar por sus servicios.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <WhatsAppIcon className="w-5 h-5" />
              Escribinos por WhatsApp
            </a>
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className="text-white border-white/50 hover:bg-white hover:text-primary"
            asChild
          >
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <InstagramIcon className="w-5 h-5" />@{siteConfig.instagram}
            </a>
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className="text-white border-white/50 hover:bg-white hover:text-primary"
            asChild
          >
            <a
              href={tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <TikTokIcon className="w-5 h-5" />@{siteConfig.tiktok}
            </a>
          </Button>
        </div>
      </Reveal>
    </section>
  );
};

export const Footer = () => {
  return (
    <footer className="bg-background px-6 md:px-10 py-10 border-t border-border">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <img src="/logo-identinet.png" alt="IdentiNet Studio" className="h-7 w-auto" />

        <p className="text-on-surface-muted text-sm">
          © {new Date().getFullYear()} IdentiNet Studio. Todos los derechos reservados.
        </p>

        <div className="flex items-center gap-4">
          <a
            href={whatsappUrl("Hola! Quiero consultar por sus servicios.")}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="text-on-surface hover:text-primary transition-colors"
          >
            <WhatsAppIcon className="w-5 h-5" />
          </a>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-on-surface hover:text-primary transition-colors"
          >
            <InstagramIcon className="w-5 h-5" />
          </a>
          <a
            href={tiktokUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            className="text-on-surface hover:text-primary transition-colors"
          >
            <TikTokIcon className="w-5 h-5" />
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            aria-label="Email"
            className="flex items-center gap-2 text-on-surface font-semibold text-sm hover:text-primary transition-colors"
          >
            <Mail className="w-4 h-4" />
            {siteConfig.email}
          </a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-6 pt-6 border-t border-border/60 text-center">
        <a
          href="https://justinosantos.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-on-surface-muted text-xs font-semibold hover:text-primary transition-colors"
        >
          Desarrollado por Justino Santos
        </a>
      </div>
    </footer>
  );
};
