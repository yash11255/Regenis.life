import type { Metadata } from "next";
import LegalPage from "../components/legal/LegalPage";
import { SchemaScript } from "../components/SchemaScript";
import { BUSINESS_EMAIL, BUSINESS_NAME, BUSINESS_URL } from "@/lib/business-config";
import { generateBreadcrumbSchema, generateWebPageSchema } from "@/lib/schema";

const PAGE_URL = `${BUSINESS_URL}/disclaimer`;
const LAST_UPDATED = "2026-09-30T00:00:00+05:30";
const LAST_UPDATED_LABEL = "September 30, 2026";
const PAGE_DESCRIPTION =
  "Understand the limits of Regenis Life website content, product descriptions, clinical claims, regulatory information, and professional-use guidance.";

export const metadata: Metadata = {
  title: "Medical and Product Disclaimer",
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/disclaimer" },
  openGraph: {
    title: "Medical and Product Disclaimer | Regenis Life",
    description: PAGE_DESCRIPTION,
    url: "/disclaimer",
    type: "website",
    images: [{ url: "/Regenis.png", alt: "Regenis Life" }],
  },
};

export default function DisclaimerPage() {
  const webPageSchema = generateWebPageSchema({
    name: "Regenis Life Medical and Product Disclaimer",
    url: PAGE_URL,
    description: PAGE_DESCRIPTION,
    pageType: "WebPage",
    isPartOf: { name: BUSINESS_NAME, url: BUSINESS_URL },
    dateModified: LAST_UPDATED,
    about: { "@id": `${BUSINESS_URL}/#organization` },
  });
  const breadcrumbSchema = generateBreadcrumbSchema([
    { label: "Home", url: BUSINESS_URL },
    { label: "Medical and Product Disclaimer", url: PAGE_URL },
  ]);

  return (
    <>
      <SchemaScript id="disclaimer-schema" schema={[webPageSchema, breadcrumbSchema]} />
      <LegalPage
        title="Medical and Product Disclaimer"
        description={PAGE_DESCRIPTION}
        updatedLabel={LAST_UPDATED_LABEL}
        currentPath="/disclaimer"
      >
        <h2>General information only</h2>
        <p>
          Content on regenis.life is provided for general information and professional
          equipment evaluation. It is not medical advice, diagnosis, treatment, a clinical
          protocol, or a substitute for advice from an appropriately qualified healthcare
          professional.
        </p>

        <h2>No patient-care relationship</h2>
        <p>
          Visiting this website, submitting an enquiry, or communicating with {BUSINESS_NAME}
          does not create a doctor-patient relationship or provide emergency, diagnostic, or
          therapeutic care. Patients should consult their treating clinician about personal
          health concerns. For a medical emergency, contact local emergency services or the
          nearest appropriate medical facility.
        </p>

        <h2>Product classification and regulatory status</h2>
        <p>
          The Regenis Life portfolio includes medical devices as well as wellness, aesthetic,
          rehabilitation, performance, research, and innovation systems. Classification,
          approved intended use, licence or registration status, and availability can vary by
          product, model, configuration, and jurisdiction. A listing on this website does not
          by itself establish that a product is approved, licensed, or suitable for a
          particular use in every location.
        </p>

        <h2>Manufacturer information controls</h2>
        <p>
          Product descriptions, specifications, images, and performance information may be
          based on material supplied by manufacturers or authorised partners. Current
          manufacturer labelling, instructions for use, safety information, approved claims,
          and the applicable supply agreement take priority over general website content.
          Confirm all material details before procurement, installation, or use.
        </p>

        <h2>Professional selection and use</h2>
        <p>
          Equipment must be evaluated for the proposed facility, users, patient population,
          utilities, workflow, and regulatory environment. Installation, operation,
          maintenance, and clinical use should be performed only by appropriately qualified
          and trained personnel in accordance with applicable law, manufacturer instructions,
          contraindications, warnings, and facility protocols.
        </p>

        <h2>No guarantee of outcomes</h2>
        <p>
          References to capabilities, applications, studies, measurements, recovery,
          performance, aesthetics, or wellness do not guarantee a clinical, commercial, or
          operational result. Outcomes may vary with the product configuration, operator,
          protocol, patient or user characteristics, maintenance, and other factors.
        </p>

        <h2>Research and emerging technologies</h2>
        <p>
          Some technologies may be new, emerging, investigational, or intended for research,
          demonstration, wellness, or non-medical use in a particular market. These products
          must not be represented or used outside their lawful intended purpose. Independent
          professional and regulatory review may be necessary before procurement.
        </p>

        <h2>Third-party brands and resources</h2>
        <p>
          Manufacturer and product names, trademarks, images, videos, and technical materials
          belong to their respective owners. Links to external resources are provided for
          convenience and do not make {BUSINESS_NAME} responsible for third-party content or
          claims.
        </p>

        <h2>Report concerns and request current information</h2>
        <p>
          Safety concerns, adverse events, malfunctions, or suspected product issues should be
          handled promptly through the relevant manufacturer, supplier, qualified professional,
          and regulatory reporting pathway. To request current product documentation or clarify
          a website statement, contact{" "}
          <a href={`mailto:${BUSINESS_EMAIL[0]}`}>{BUSINESS_EMAIL[0]}</a> before relying on it.
        </p>
      </LegalPage>
    </>
  );
}
