import { useEffect, useState, type FormEvent } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { Lock, TriangleAlert } from "lucide-react";
import site from "@/content/site.json";
import { sections } from "./schemas";

const GATE_KEY = "identinet-admin-unlocked";

const AdminGate = ({ children }: { children: React.ReactNode }) => {
  const [unlocked, setUnlocked] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    setUnlocked(sessionStorage.getItem(GATE_KEY) === "1");
  }, []);

  if (unlocked) return <>{children}</>;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const expected = (site as { adminPasscode?: string }).adminPasscode ?? "";
    if (passcode === expected) {
      sessionStorage.setItem(GATE_KEY, "1");
      setUnlocked(true);
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <form onSubmit={handleSubmit} className="bg-white border border-border rounded-2xl p-8 max-w-sm w-full">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <Lock className="w-5 h-5 text-primary" />
        </div>
        <h1 className="font-display text-2xl text-primary mb-2">Panel de admin</h1>
        <p className="text-on-surface-muted text-sm mb-5">Ingresá el código para editar el sitio.</p>
        <div className="flex items-start gap-2 bg-accent/10 border border-accent/30 rounded-xl p-3 mb-5">
          <TriangleAlert className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
          <p className="text-[11px] text-on-surface-muted leading-relaxed">
            Este código no es seguridad real — solo evita que alguien entre por accidente. El
            panel solo funciona con el servidor local corriendo (<code>npm run dev</code>) y no
            debería quedar accesible en un sitio publicado sin backend propio.
          </p>
        </div>
        <input
          type="password"
          value={passcode}
          onChange={(e) => {
            setPasscode(e.target.value);
            setError(false);
          }}
          autoFocus
          className="w-full rounded-lg border border-border px-3 py-2.5 text-sm mb-2"
          placeholder="Código"
        />
        {error && <p className="text-error text-xs mb-3">Código incorrecto.</p>}
        <button type="submit" className="w-full bg-primary text-white font-bold text-sm py-2.5 rounded-full mt-2">
          Entrar
        </button>
        <Link to="/" className="block text-center text-xs text-on-surface-muted mt-4 hover:text-primary">
          ← Volver al sitio
        </Link>
      </form>
    </div>
  );
};

const AdminLayout = () => {
  return (
    <AdminGate>
      <div className="min-h-screen bg-background flex flex-col md:flex-row">
        <aside className="md:w-64 flex-shrink-0 border-b md:border-b-0 md:border-r border-border bg-white">
          <div className="p-6">
            <Link to="/admin" className="block mb-6">
              <img src="/logo-identinet.png" alt="IdentiNet Studio" className="h-7 w-auto" />
            </Link>
            <nav className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible no-scrollbar">
              <NavLink
                to="/admin"
                end
                className={({ isActive }) =>
                  `flex-shrink-0 px-3 py-2 rounded-lg text-sm font-semibold whitespace-nowrap ${
                    isActive ? "bg-primary text-white" : "text-on-surface hover:bg-surface-alt"
                  }`
                }
              >
                Inicio
              </NavLink>
              {sections.map((s) => (
                <NavLink
                  key={s.key}
                  to={`/admin/${s.key}`}
                  className={({ isActive }) =>
                    `flex-shrink-0 px-3 py-2 rounded-lg text-sm font-semibold whitespace-nowrap ${
                      isActive ? "bg-primary text-white" : "text-on-surface hover:bg-surface-alt"
                    }`
                  }
                >
                  {s.title}
                </NavLink>
              ))}
            </nav>
            <Link
              to="/"
              className="block mt-6 text-xs font-semibold text-on-surface-muted hover:text-primary"
            >
              ← Ver el sitio
            </Link>
          </div>
        </aside>

        <main className="flex-1 p-6 md:p-10 max-w-4xl">
          <Outlet />
        </main>
      </div>
    </AdminGate>
  );
};

export default AdminLayout;
