import type { Metadata } from "next";
import LegalPage from "../components/legal/LegalPage";
import { SchemaScript } from "../components/SchemaScript";
import { BUSINESS_EMAIL, BUSINESS_NAME, BUSINESS_URL } from "@/lib/business-config";
import { generateBreadcrumbSchema, generateWebPageSchema } from "@/lib/schema";

const PAGE_URL = `${BUSINESS_URL}/terms`;
const LAST_UPDATED = "2026-09-30T00:00:00+05:30";
const LAST_UPDATED_LABEL = "September 30, 2026";
const PAGE_DESCRIPTION =
  "Review the terms governing use of the Regenis Life website, equipment information, enquiries, intellectual property, and third-party resources.";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/terms" },
  openGraph: {
    title: "Terms of Use | Regenis Life",
    description: PAGE_DESCRIPTION,
    url: "/terms",
    type: "website",
    images: [{ url: "/Regenis.png", alt: "Regenis Life" }],
  },
};

export default function TermsPage() {
  const webPageSchema = generateWebPageSchema({
    name: "Regenis Life Terms of Use",
    url: PAGE_URL,
    description: PAGE_DESCRIPTION,
    pageType: "WebPage",
    isPartOf: { name: BUSINESS_NAME, url: BUSINESS_URL },
    dateModified: LAST_UPDATED,
    about: { "@id": `${BUSINESS_URL}/#organization` },
  });
  const breadcrumbSchema = generateBreadcrumbSchema([
    { label: "Home", url: BUSINESS_URL },
    { label: "Terms of Use", url: PAGE_URL },
  ]);

  return (
    <>
      <SchemaScript id="terms-schema" schema={[webPageSchema, breadcrumbSchema]} />
      <LegalPage
        title="Terms of Use"
        description={PAGE_DESCRIPTION}
        updatedLabel={LAST_UPDATED_LABEL}
        currentPath="/terms"
      >
        <p>
          These Terms of Use govern access to and use of regenis.life. By using this website,
          you agree to these terms. If you do not agree, please discontinue use of the site.
        </p>

        <h2>Purpose of this website</h2>
        <p>
          The website presents information about {BUSINESS_NAME}, equipment manufacturers,
          product categories, and services such as sourcing, installation coordination, and
          training support. Website content is provided for general business and product
          evaluation purposes.
        </p>

        <h2>No online sale or binding quotation</h2>
        <p>
          A product listing, enquiry submission, email, or telephone discussion does not by
          itself create a sale, reservation, agency relationship, or binding quotation.
          Pricing, taxes, delivery, installation, warranties, training, service levels, and
          payment terms must be confirmed in a separate written agreement or accepted
          quotation issued by the appropriate contracting party.
        </p>

        <h2>Product information and availability</h2>
        <p>
          We aim to keep product descriptions and specifications useful and current, but
          manufacturers may change features, accessories, documentation, availability, or
          regulatory status. Images may be illustrative. Before procurement or clinical use,
          confirm the current model, intended use, licence or registration status,
          installation requirements, and manufacturer documentation with our team.
        </p>

        <h2>Professional and regulated use</h2>
        <p>
          Some listed products may be medical devices, while others may be wellness,
          aesthetic, performance, research, or innovation systems. Products must be selected,
          installed, operated, maintained, and used only by appropriately qualified persons
          and in accordance with applicable law, approved intended use, manufacturer
          instructions, training requirements, and facility protocols.
        </p>

        <h2>Enquiries and submitted information</h2>
        <p>
          You are responsible for ensuring that information submitted through an enquiry is
          accurate and that you are authorised to provide it. Do not submit confidential
          patient information or sensitive medical records through the general contact form.
          Personal information is handled as described in our{" "}
          <a href="/privacy">Privacy Policy</a>.
        </p>

        <h2>Acceptable use</h2>
        <p>You must not use the website to:</p>
        <ul>
          <li>Break applicable law or infringe the rights of another person or organisation.</li>
          <li>Introduce malware, probe security, disrupt service, or attempt unauthorised access.</li>
          <li>Scrape, copy, republish, or commercially exploit substantial website content without permission.</li>
          <li>Misrepresent your identity, authority, affiliation, or intended use of a product.</li>
        </ul>

        <h2>Intellectual property</h2>
        <p>
          Unless otherwise stated, the website design, original text, graphics, and Regenis
          Life brand assets are owned by or licensed to {BUSINESS_NAME}. Manufacturer names,
          product names, trademarks, images, and technical materials remain the property of
          their respective owners. No licence is granted except the limited right to view and
          use the website for legitimate evaluation and enquiry purposes.
        </p>

        <h2>Third-party content and links</h2>
        <p>
          The website may contain manufacturer material and links to third-party websites.
          We do not control third-party sites and are not responsible for their availability,
          security, policies, or content. A link or product reference does not imply an
          endorsement beyond the relationship expressly described on the website.
        </p>

        <h2>Website availability and warranties</h2>
        <p>
          We may update, suspend, or remove website content without notice. To the extent
          permitted by law, the website is provided on an “as available” basis without a
          guarantee that it will be uninterrupted, error-free, or suitable for a particular
          procurement or clinical decision. Nothing in these terms excludes rights that
          cannot lawfully be excluded.
        </p>

        <h2>Limitation of responsibility</h2>
        <p>
          To the extent permitted by applicable law, {BUSINESS_NAME} is not responsible for
          losses arising solely from reliance on general website content, unauthorised use,
          third-party websites, or interruptions outside our reasonable control. Product
          purchase, installation, warranty, and service responsibilities are governed by the
          applicable written agreement.
        </p>

        <h2>Governing law, changes, and contact</h2>
        <p>
          These terms are governed by the laws of India. Disputes are subject to the
          jurisdiction determined under applicable law and any separate written agreement.
          We may revise these terms by publishing an updated version on this page. Questions
          may be sent to <a href={`mailto:${BUSINESS_EMAIL[0]}`}>{BUSINESS_EMAIL[0]}</a>.
        </p>
      </LegalPage>
    </>
  );
}
