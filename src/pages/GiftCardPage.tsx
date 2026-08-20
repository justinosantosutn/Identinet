import { PageShell } from "@/components/ui/page-shell";
import { GiftCard } from "@/components/sections/GiftCard";
import { RelatedLinks } from "@/components/sections/RelatedLinks";

const GiftCardPage = () => (
  <PageShell backTo="/#explora">
    <GiftCard />
    <RelatedLinks exclude="/gift-card" />
  </PageShell>
);

export default GiftCardPage;
