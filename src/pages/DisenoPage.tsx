import { PageShell } from "@/components/ui/page-shell";
import { DesignCatalog } from "@/components/sections/DesignCatalog";
import { RelatedLinks } from "@/components/sections/RelatedLinks";

const DisenoPage = () => (
  <PageShell backTo="/#explora">
    <DesignCatalog />
    <RelatedLinks exclude="/diseno" />
  </PageShell>
);

export default DisenoPage;
