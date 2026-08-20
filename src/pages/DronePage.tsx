import { PageShell } from "@/components/ui/page-shell";
import { Drone } from "@/components/sections/Drone";
import { RelatedLinks } from "@/components/sections/RelatedLinks";

const DronePage = () => (
  <PageShell backTo="/#explora">
    <Drone />
    <RelatedLinks exclude="/drone" />
  </PageShell>
);

export default DronePage;
