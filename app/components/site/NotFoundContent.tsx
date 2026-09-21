import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Container from "../ui/Container";
import Eyebrow from "../ui/Eyebrow";
import SectionHeading from "../ui/SectionHeading";
import Button from "../ui/Button";

export default function NotFoundContent() {
  return (
    <main className="relative flex min-h-[calc(100vh-200px)] items-center overflow-hidden py-[clamp(96px,14vw,180px)]">
      <Container>
        <Eyebrow tone="primary" className="mb-6">
          Regenis Life — page not found
        </Eyebrow>
        <div className="mb-4 font-display text-[clamp(96px,18vw,200px)] font-light leading-[0.8] tracking-[-0.06em] text-ink/10">
          404
        </div>
        <SectionHeading as="h1" size="lg" className="max-w-[680px]">
          This page isn&apos;t in the catalogue.
        </SectionHeading>
        <p className="mt-7 max-w-[520px] text-[15px] font-light leading-[1.75] text-ink-muted">
          The address may have changed, or the equipment page you are looking for may no
          longer be available.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Button href="/equipment">
            <ArrowLeft size={15} />
            Back to equipment
          </Button>
          <Button href="/equipment/all" variant="quiet">
            View full catalog
            <ArrowUpRight size={14} />
          </Button>
        </div>
      </Container>
    </main>
  );
}
