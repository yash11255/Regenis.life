import type { Metadata } from "next";
import NotFoundContent from "./components/site/NotFoundContent";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Page Not Found",
  description: "The requested Regenis Life page could not be found.",
  robots: { index: false, follow: true },
});

export default function NotFound() {
  return <NotFoundContent />;
}
