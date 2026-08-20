import { Route, Routes } from "react-router-dom";
import Home from "@/pages/Home";
import ClientCase from "@/pages/ClientCase";
import PackDetail from "@/pages/PackDetail";
import PackBuilder from "@/pages/PackBuilder";
import AdicionalesPage from "@/pages/AdicionalesPage";
import DisenoPage from "@/pages/DisenoPage";
import ResetDigitalPage from "@/pages/ResetDigitalPage";
import DronePage from "@/pages/DronePage";
import GiftCardPage from "@/pages/GiftCardPage";
import TeamPage from "@/pages/TeamPage";
import NotFound from "@/pages/NotFound";
import AdminLayout from "@/pages/admin/AdminLayout";
import AdminHome from "@/pages/admin/AdminHome";
import ContentEditor from "@/pages/admin/ContentEditor";
import PreviewFrameRoute from "@/pages/admin/PreviewFrameRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/clientes/:slug" element={<ClientCase />} />
      <Route path="/packs/:slug" element={<PackDetail />} />
      <Route path="/armar-pack" element={<PackBuilder />} />
      <Route path="/adicionales" element={<AdicionalesPage />} />
      <Route path="/diseno" element={<DisenoPage />} />
      <Route path="/reset-digital" element={<ResetDigitalPage />} />
      <Route path="/drone" element={<DronePage />} />
      <Route path="/gift-card" element={<GiftCardPage />} />
      <Route path="/equipo" element={<TeamPage />} />
      <Route path="/admin/frame/:key" element={<PreviewFrameRoute />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminHome />} />
        <Route path=":key" element={<ContentEditor />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
