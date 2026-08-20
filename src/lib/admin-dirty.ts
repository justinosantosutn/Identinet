// Tracks whether the currently-open admin section has unsaved changes, so
// navigation elsewhere in the panel (sidebar, section dropdown, closing the
// tab) can confirm before discarding them. Plain module state is enough
// here — it only needs to be read synchronously at click/unload time, not
// drive re-renders.
let dirty = false;

export const setAdminDirty = (value: boolean) => {
  dirty = value;
};

export const confirmLeaveIfDirty = () => {
  if (!dirty) return true;
  return window.confirm("Tenés cambios sin guardar. ¿Salir de todas formas?");
};
