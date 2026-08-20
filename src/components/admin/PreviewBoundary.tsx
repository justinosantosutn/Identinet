import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

/** Isolates a crash inside a preview component (e.g. from a draft shape the
 * real component doesn't expect yet) so it can't take down the whole admin
 * panel — shows an inline message instead. Give it a `key` tied to the
 * draft data so it remounts (and gets a fresh try) whenever that changes,
 * instead of being stuck showing the error forever. */
export class PreviewBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div className="rounded-2xl border border-error/30 bg-error/5 p-6 text-sm text-error">
          No se pudo mostrar la preview con estos cambios.
        </div>
      );
    }
    return this.props.children;
  }
}
