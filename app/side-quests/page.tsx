import { ManifestPage, RowsSection, projectToRow } from "@/components/manifest";
import { getPosts } from "@/lib/content";
import { SITE_URL } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Independent Work",
  description: "Independent research, self-directed builds, and practical experiments.",
  alternates: {
    canonical: `${SITE_URL}/side-quests`,
  },
};

export default function SideQuestsPage() {
  const quests = getPosts("side-quests");
  const rows = quests.map((project) => projectToRow(project, "side-quests"));

  return (
    <ManifestPage active="side-quests">
      <RowsSection
        heading="independent work"
        headingLevel={1}
        kicker=""
        rows={rows}
      />
    </ManifestPage>
  );
}
