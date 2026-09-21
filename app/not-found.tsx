import type { Metadata } from "next";
import NotFoundContent from "./components/site/NotFoundContent";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The requested Regenis Life page could not be found.",
  robots: { index: false, follow: true },
  openGraph: {
    title: "Page Not Found | Regenis Life",
    description: "The requested Regenis Life page could not be found.",
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
  return <NotFoundContent />;
}
