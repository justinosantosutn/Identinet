import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import { PageShell } from "@/components/ui/page-shell";
import { Button } from "@/components/ui/button";
import { whatsappUrl } from "@/lib/site";

const NotFound = () => (
  <PageShell>
    <section className="px-6 md:px-10 py-24 md:py-32">
      <div className="max-w-lg mx-auto text-center">
        <p className="font-display text-8xl text-primary/20 mb-4">404</p>
        <h1 className="font-display text-3xl md:text-4xl text-primary mb-4">
          Esta página no existe
        </h1>
        <p className="text-on-surface-muted mb-10">
          El link puede estar roto o la página se movió. Volvé al inicio o escribinos si buscabas
          algo puntual.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button variant="primary" size="default" asChild>
            <Link to="/">Volver al inicio</Link>
          </Button>
          <Button variant="secondary" size="default" asChild>
            <a
              href={whatsappUrl("Hola! Llegué a una página que no encontré en el sitio.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Escribinos
            </a>
          </Button>
        </div>
      </div>
    </section>
  </PageShell>
);

export default NotFound;
