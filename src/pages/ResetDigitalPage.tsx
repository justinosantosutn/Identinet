import { PageShell } from "@/components/ui/page-shell";
import { ResetDigital } from "@/components/sections/ResetDigital";
import { RelatedLinks } from "@/components/sections/RelatedLinks";

const ResetDigitalPage = () => (
  <PageShell backTo="/#explora">
    <ResetDigital />
    <RelatedLinks exclude="/reset-digital" />
  </PageShell>
);

export default ResetDigitalPage;
