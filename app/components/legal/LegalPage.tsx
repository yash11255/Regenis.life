import Link from "next/link";
import Container from "../ui/Container";
import Prose from "../ui/Prose";
import Section from "../ui/Section";
import SectionHeading from "../ui/SectionHeading";

const LEGAL_LINKS = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Use" },
  { href: "/disclaimer", label: "Medical Disclaimer" },
];

interface LegalPageProps {
  title: string;
  description: string;
  updatedLabel: string;
  currentPath: string;
  children: React.ReactNode;
}

export default function LegalPage({
  title,
  description,
  updatedLabel,
  currentPath,
  children,
}: LegalPageProps) {
  return (
    <main>
      <Section
        contained={false}
        className="pb-[clamp(52px,7vw,88px)] pt-[clamp(150px,16vw,210px)]"
      >
        <Container>
          <p className="mb-5 text-[12px] font-semibold uppercase tracking-[0.12em] text-primary">
            Legal and trust
          </p>
          <SectionHeading as="h1" size="lg" className="max-w-[880px]">
            {title}
          </SectionHeading>
          <p className="mt-6 max-w-[720px] text-[16px] font-light leading-[1.8] text-ink-muted">
            {description}
          </p>
          <p className="mt-5 text-[12px] font-medium text-ink-faint">
            Last updated: {updatedLabel}
          </p>
        </Container>
      </Section>

      <Section divide space="lg">
        <div className="grid gap-12 lg:grid-cols-[220px_minmax(0,760px)] lg:gap-20">
          <aside aria-label="Legal pages" className="lg:sticky lg:top-36 lg:self-start">
            <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.1em] text-ink-faint">
              Legal pages
            </p>
            <nav className="flex flex-col border-t border-line">
              {LEGAL_LINKS.map((link) => {
                const active = link.href === currentPath;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`border-b border-line py-3 text-[14px] font-medium transition-colors ${
                      active ? "text-primary" : "text-ink-muted hover:text-ink"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </aside>

          <article>
            <Prose className="max-w-none">{children}</Prose>
          </article>
        </div>
      </Section>
    </main>
  );
}
