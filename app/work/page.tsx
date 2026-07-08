import { ManifestPage, RowsSection, projectToRow } from "@/components/manifest";
import { getPosts } from "@/lib/content";
import { SITE_URL } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work",
  description: "Portfolio work from Lucas Chatham.",
  alternates: {
    canonical: `${SITE_URL}/work`,
  },
};

export default function WorkPage() {
  const work = getPosts("work");
  const rows = work.map((project) => projectToRow(project, "work"));

  return (
    <ManifestPage active="work">
      <RowsSection heading="work" kicker="PORTFOLIO" rows={rows} />
    </ManifestPage>
  );
}
