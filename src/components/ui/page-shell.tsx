import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/sections/Contact";

interface PageShellProps {
  children: ReactNode;
  backTo?: string;
  backLabel?: string;
}

export const PageShell = ({ children, backTo = "/", backLabel = "Volver" }: PageShellProps) => {
  return (
    <div className="w-full bg-background min-h-screen">
      <nav className="flex items-center justify-between px-6 py-6 md:px-10 md:py-8 max-w-[1440px] mx-auto w-full">
        <Link to="/">
          <img src="/logo-identinet.png" alt="IdentiNet Studio" className="h-8 md:h-10 w-auto" />
        </Link>

        <Link
          to={backTo}
          className="flex items-center gap-2 text-sm font-bold text-on-surface hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {backLabel}
        </Link>
      </nav>

      {children}

      <Footer />
    </div>
  );
};
