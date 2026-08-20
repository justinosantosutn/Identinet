import { PageShell } from "@/components/ui/page-shell";
import { Extras } from "@/components/sections/Extras";
import { RelatedLinks } from "@/components/sections/RelatedLinks";

const AdicionalesPage = () => (
  <PageShell backTo="/#explora">
    <Extras />
    <RelatedLinks exclude="/adicionales" />
  </PageShell>
);

export default AdicionalesPage;
