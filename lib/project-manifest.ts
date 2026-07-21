export type ProjectSlug =
  | "imerit"
  | "blue-vision-labs-lyft"
  | "gymnazo"
  | "daybreaker-health"
  | "checkfit"
  | "monster-fitness";

export type ProjectFeatureTier = "featured" | "additional";
export type ProjectProofStatus = "verified-outcome" | "mechanism-only";
export type ProjectMediaStatus = "cleared" | "awaiting-clearance";

export type BrandUnit = {
  label: string;
  image: string;
  variant?: "square" | "wide";
};

export type ProjectBrand = {
  primary: BrandUnit;
  secondary?: BrandUnit;
};

export type ProjectSnapshotItem = {
  label: "Role" | "System" | "Outcome" | "Mechanism";
  value: string;
  detail: string;
};

export type ProjectProfile = {
  slug: ProjectSlug;
  featureTier: ProjectFeatureTier;
  heroStatement?: string;
  cardDescription: string;
  proofStatus: ProjectProofStatus;
  snapshot: [ProjectSnapshotItem, ProjectSnapshotItem, ProjectSnapshotItem];
  brand: ProjectBrand;
  media: {
    status: ProjectMediaStatus;
    image?: string;
    imageAlt?: string;
  };
  attribution: string;
  relatedSlug: ProjectSlug;
};

export const projectManifest: Record<ProjectSlug, ProjectProfile> = {
  imerit: {
    slug: "imerit",
    featureTier: "featured",
    heroStatement:
      "I created Ground Control, an enterprise AI operations platform that made quality, throughput, governance, and exceptions visible across 6,000+ annotators, 20+ tools, and five time zones.",
    cardDescription:
      "Built Ground Control, an enterprise AI operations platform that made quality, throughput, governance, and exceptions visible across 6,000+ annotators, 20+ tools, and five time zones.",
    proofStatus: "verified-outcome",
    snapshot: [
      {
        label: "Role",
        value: "Senior Product Manager",
        detail: "Owned product vision, requirements, roadmap, and stakeholder alignment.",
      },
      {
        label: "System",
        value: "Ground Control",
        detail: "Data analytics and governance for distributed enterprise AI operations.",
      },
      {
        label: "Outcome",
        value: "6,000+ annotators",
        detail: "Real-time visibility across tools, teams, time zones, and customers.",
      },
    ],
    brand: {
      primary: { label: "iMerit", image: "/images/brands/imerit-logo.jpg" },
    },
    media: {
      status: "cleared",
      image: "/images/work/imerit/ground-control-platform-architecture-v2.webp",
      imageAlt:
        "Ground Control architecture connecting operating data to dashboards, insights, governance, and customer outcomes.",
    },
    attribution:
      "I created and owned Ground Control as product owner at iMerit, in partnership with engineering, design, QA, delivery, and go-to-market teams. Customer and company outcomes were shared team results.",
    relatedSlug: "blue-vision-labs-lyft",
  },
  "blue-vision-labs-lyft": {
    slug: "blue-vision-labs-lyft",
    featureTier: "featured",
    cardDescription:
      "Scaled computer-vision data ingestion and mapping operations from 3 cities → 2 countries, helping produce a major public autonomous-vehicle street-mapping dataset before Lyft acquired the company.",
    proofStatus: "verified-outcome",
    snapshot: [
      {
        label: "Role",
        value: "Mapping operations",
        detail: "Tested, redesigned, deployed, and scaled field capture systems.",
      },
      {
        label: "System",
        value: "Camera-phone mapping",
        detail: "City-scale 3D maps from real-world fleet capture.",
      },
      {
        label: "Outcome",
        value: "3 cities → 2 countries",
        detail: "Helped produce a major public autonomous-vehicle street dataset.",
      },
    ],
    brand: {
      primary: {
        label: "Blue Vision Labs",
        image: "/images/brands/blue-vision-labs-logo.jpg",
      },
      secondary: { label: "Lyft", image: "/images/brands/lyft-logo.jpg" },
    },
    media: {
      status: "cleared",
      image:
        "/images/work/blue-vision-labs-lyft/visual-geometric-map-san-francisco.webp",
      imageAlt:
        "A geometric city map illustrating the Blue Vision Labs visual positioning system.",
    },
    attribution:
      "This case covers my mapping-operations contribution. It does not claim research-model ownership or sole responsibility for the acquisition or company outcomes.",
    relatedSlug: "imerit",
  },
  gymnazo: {
    slug: "gymnazo",
    featureTier: "featured",
    cardDescription:
      "Helped turn expert movement coaching into repeatable products, curriculum, and sales systems tied to 209% year-over-year growth, 3,500+ customers, and demand for a third location.",
    proofStatus: "verified-outcome",
    snapshot: [
      {
        label: "Role",
        value: "Operator",
        detail: "Converted expert movement coaching into products, curriculum, and sales systems.",
      },
      {
        label: "System",
        value: "Coach scaling",
        detail: "Made founder-level judgment reproducible across coaches and customers.",
      },
      {
        label: "Outcome",
        value: "3,500+ customers",
        detail: "Supported 209% year-over-year growth, a $2,000 certification, and a third location.",
      },
    ],
    brand: {
      primary: { label: "Gymnazo", image: "/images/brands/gymnazo-logo.jpg" },
    },
    media: { status: "cleared" },
    attribution:
      "The operating metrics describe company results during my tenure. I contributed product, curriculum, sales, and operating systems as part of the wider Gymnazo team.",
    relatedSlug: "monster-fitness",
  },
  "daybreaker-health": {
    slug: "daybreaker-health",
    featureTier: "additional",
    cardDescription:
      "Founded a diagnostics-driven longevity company that turns fragmented health data into protocols, coaching workflows, and measurable retesting loops.",
    proofStatus: "mechanism-only",
    snapshot: [
      {
        label: "Role",
        value: "Founder",
        detail: "Built the product logic, diagnostic workflow, and service model.",
      },
      {
        label: "System",
        value: "Clinical-adjacent",
        detail: "Bloodwork, genetics, lifestyle data, protocols, and coaching.",
      },
      {
        label: "Mechanism",
        value: "Retesting loops",
        detail: "Personalized protocols connect to structured review and follow-through.",
      },
    ],
    brand: {
      primary: {
        label: "Daybreaker Health",
        image: "/images/brands/daybreaker-health-logo.jpg",
      },
    },
    media: { status: "awaiting-clearance" },
    attribution:
      "I founded and built the company and operating system. This case describes the product mechanism and does not claim clinical outcomes.",
    relatedSlug: "checkfit",
  },
  checkfit: {
    slug: "checkfit",
    featureTier: "additional",
    cardDescription:
      "Founded an AI movement coach that turns goals, recovery, nutrition, pain, constraints, and schedule changes into adaptive training decisions.",
    proofStatus: "mechanism-only",
    snapshot: [
      {
        label: "Role",
        value: "Founder and builder",
        detail: "Turned 14+ years of coaching judgment into product logic and a beta app.",
      },
      {
        label: "System",
        value: "Adaptive plans",
        detail: "Translated recovery, schedule, nutrition, and pain signals into decisions.",
      },
      {
        label: "Mechanism",
        value: "Working beta",
        detail: "Generated and adjusted coaching plans from real user context.",
      },
    ],
    brand: {
      primary: { label: "CheckFit", image: "/images/brands/checkfit-logo.jpg" },
    },
    media: { status: "awaiting-clearance" },
    attribution:
      "I co-founded the product and built its first beta. Claims are limited to product functionality and the published beta scope.",
    relatedSlug: "daybreaker-health",
  },
  "monster-fitness": {
    slug: "monster-fitness",
    featureTier: "additional",
    cardDescription:
      "Scaled a six-agent sales team, wrote the playbook, and helped drive 3× annual revenue while NPS improved from 31 → 68.",
    proofStatus: "verified-outcome",
    snapshot: [
      {
        label: "Role",
        value: "Sales operator",
        detail: "Scaled the sales team while still in high school.",
      },
      {
        label: "System",
        value: "Sales playbook",
        detail: "Built repeatable sales, follow-up, retention, upsell, and account workflows.",
      },
      {
        label: "Outcome",
        value: "3× revenue",
        detail: "Coached six sales agents and helped lift NPS from 31 to 68.",
      },
    ],
    brand: {
      primary: {
        label: "Monster Fitness",
        image: "/images/brands/monster-fitness-logo.png",
        variant: "wide",
      },
    },
    media: { status: "cleared" },
    attribution:
      "The business results reflect the team and franchise during my tenure. My contribution centered on sales coaching, playbooks, partnerships, and account systems.",
    relatedSlug: "gymnazo",
  },
};

export const featuredProjectSlugs = (
  Object.values(projectManifest).filter(
    (project) => project.featureTier === "featured"
  )
).map((project) => project.slug);

export const additionalProjectSlugs = (
  Object.values(projectManifest).filter(
    (project) => project.featureTier === "additional"
  )
).map((project) => project.slug);

export function getProjectProfile(slug: string): ProjectProfile | undefined {
  return projectManifest[slug as ProjectSlug];
}
