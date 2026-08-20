import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const anchorTabs = [
  { label: "Cómo funciona", href: "#como-funciona" },
  { label: "Servicios", href: "#servicios" },
  { label: "Packs", href: "#packs" },
];

const routeTabs = [{ label: "Armá tu pack", to: "/armar-pack" }];

const trailingAnchorTabs = [
  { label: "Nosotras", href: "#nosotros" },
  { label: "FAQ", href: "#faq" },
];

export const QuickNav = () => {
  const anchors = [...anchorTabs, ...trailingAnchorTabs];
  const [active, setActive] = useState(anchors[0].href);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const sections = anchors
      .map((t) => document.querySelector(t.href))
      .filter((el): el is Element => !!el);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const pillClass = (isActive: boolean) =>
    `flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap border-2 transition-colors ${
      isActive
        ? "bg-primary text-white border-primary shadow-sm"
        : "bg-primary/5 text-primary border-transparent hover:bg-primary/10 hover:border-primary/20"
    }`;

  const drawerLinkClass = (isActive: boolean) =>
    `block w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-colors ${
      isActive ? "bg-primary text-white" : "text-on-surface hover:bg-primary/5"
    }`;

  return (
    <div className="sticky top-0 z-40 bg-background-soft/95 backdrop-blur border-b-2 border-primary/10">
      <div className="max-w-6xl mx-auto px-4 md:px-10">
        {/* Desktop / tablet: horizontal pills */}
        <div className="hidden md:flex items-center gap-2 overflow-x-auto py-3 no-scrollbar">
          {anchorTabs.map((tab) => (
            <a key={tab.href} href={tab.href} className={pillClass(active === tab.href)}>
              {tab.label}
            </a>
          ))}
          {routeTabs.map((tab) => (
            <Link
              key={tab.to}
              to={tab.to}
              className="flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap border-2 border-accent bg-accent text-white shadow-sm hover:bg-accent-dark transition-colors"
            >
              {tab.label}
            </Link>
          ))}
          {trailingAnchorTabs.map((tab) => (
            <a key={tab.href} href={tab.href} className={pillClass(active === tab.href)}>
              {tab.label}
            </a>
          ))}
        </div>

        {/* Mobile: hamburger trigger */}
        <div className="flex md:hidden items-center justify-end py-3">
          <button
            onClick={() => setDrawerOpen(true)}
            aria-label="Abrir menú"
            className="flex items-center gap-2 pl-3 pr-1.5 h-9 rounded-full bg-primary text-white"
          >
            <span className="text-xs font-bold uppercase tracking-wide">Menú</span>
            <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
              <Menu className="w-3.5 h-3.5" />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile: side drawer — portaled to <body> so ancestors with backdrop-blur/
          transform (which create a new containing block) can't break its `fixed` positioning.
          Always mounted, toggled via CSS transitions (plain and reliable through a portal). */}
      {createPortal(
        <>
          <div
            onClick={() => setDrawerOpen(false)}
            aria-hidden="true"
            className={`fixed inset-0 bg-on-surface/40 z-50 md:hidden transition-opacity duration-300 ${
              drawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
          />
          <div
            className={`fixed top-0 right-0 bottom-0 w-[78%] max-w-xs bg-white z-50 md:hidden shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
              drawerOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex items-center justify-between px-5 py-5 border-b border-border">
              <span className="font-display text-lg text-primary">Menú</span>
              <button
                onClick={() => setDrawerOpen(false)}
                aria-label="Cerrar menú"
                className="w-9 h-9 rounded-full bg-surface-alt flex items-center justify-center"
              >
                <X className="w-4 h-4 text-on-surface" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto p-4 space-y-1">
              {anchorTabs.map((tab) => (
                <a
                  key={tab.href}
                  href={tab.href}
                  onClick={() => setDrawerOpen(false)}
                  className={drawerLinkClass(active === tab.href)}
                >
                  {tab.label}
                </a>
              ))}
              {routeTabs.map((tab) => (
                <Link
                  key={tab.to}
                  to={tab.to}
                  onClick={() => setDrawerOpen(false)}
                  className="block w-full text-left px-4 py-3 rounded-xl text-sm font-bold bg-accent text-white"
                >
                  {tab.label}
                </Link>
              ))}
              {trailingAnchorTabs.map((tab) => (
                <a
                  key={tab.href}
                  href={tab.href}
                  onClick={() => setDrawerOpen(false)}
                  className={drawerLinkClass(active === tab.href)}
                >
                  {tab.label}
                </a>
              ))}
            </nav>
          </div>
        </>,
        document.body
      )}
    </div>
  );
};
