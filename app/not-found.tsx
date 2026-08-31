import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import PageShell from "./components/PageShell";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The requested Regenis Life page could not be found.",
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "Page Not Found | Regenis Life",
    description: "The requested Regenis Life page could not be found.",
    url: "/404",
    type: "website",
    images: [{ url: "/Regenis.png", alt: "Regenis Life" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Page Not Found | Regenis Life",
    description: "The requested Regenis Life page could not be found.",
    images: ["/Regenis.png"],
  },
};

export default function NotFound() {
  return (
    <PageShell headerVariant="solid">
      <main className="relative flex min-h-[calc(100vh-180px)] items-center overflow-hidden bg-transparent px-[clamp(24px,6vw,96px)] py-[clamp(96px,12vw,160px)] text-[#eef5ff]">
        <div className="pointer-events-none absolute -right-24 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-[#1c69d4]/10 blur-[100px]" />
        <div className="relative z-10 max-w-[760px]">
          <div className="mb-6 text-[11px] font-normal uppercase tracking-[0.2em] text-[#3d8cff]">
            Regenis Life — Page Not Found
          </div>

          <div className="mb-4 font-light text-[clamp(96px,18vw,220px)] leading-[0.78] tracking-[-0.08em] text-white/[0.12]">
            404
          </div>

          <h1 className="max-w-[680px] font-light text-[clamp(34px,5vw,72px)] uppercase leading-[1.08] tracking-[-0.02em]">
            This page isn&apos;t in the catalogue.
          </h1>
          <p className="mt-7 max-w-[520px] text-[15px] font-light leading-[1.75] text-[#a8b8ca]">
            The address may have changed, or the equipment page you are looking for may no longer be available.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link href="/equipment" className="site-action-primary">
              <ArrowLeft size={15} />
              Back to Equipment
            </Link>
            <Link href="/equipment/all" className="site-action-secondary">
              View Full Catalog
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 right-[clamp(24px,6vw,96px)] hidden text-right text-[10px] uppercase tracking-[0.18em] text-[#8fa6bd] md:block">
          <div>Clinical precision</div>
          <div className="mt-1 text-[#1c69d4]">Engineered for excellence</div>
        </div>
      </main>
    </PageShell>
  );
}
