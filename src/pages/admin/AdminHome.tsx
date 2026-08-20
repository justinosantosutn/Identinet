import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { sections } from "./schemas";

const AdminHome = () => (
  <div>
    <h1 className="font-display text-3xl text-primary mb-2">Panel de admin</h1>
    <p className="text-on-surface-muted text-sm mb-8">
      Elegí qué sección del sitio querés editar. Los cambios se guardan al instante en el
      proyecto — para que el público los vea hay que publicar (build/deploy) como con cualquier
      cambio de código.
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {sections.map((s) => (
        <Link
          key={s.key}
          to={`/admin/${s.key}`}
          className="group bg-white border border-border rounded-2xl p-5 hover:border-primary/40 hover:-translate-y-0.5 transition-all"
        >
          <div className="flex items-center justify-between mb-1">
            <h2 className="font-bold text-on-surface">{s.title}</h2>
            <ArrowUpRight className="w-4 h-4 text-on-surface-muted group-hover:text-primary transition-colors" />
          </div>
          <p className="text-xs text-on-surface-muted">{s.description}</p>
        </Link>
      ))}
    </div>
  </div>
);

export default AdminHome;
