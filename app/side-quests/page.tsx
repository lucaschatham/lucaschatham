import { ManifestPage, RowsSection, projectToRow } from "@/components/manifest";
import { getPosts } from "@/lib/content";
import { SITE_URL } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Side Quests",
  description: "Fun side projects, built for curiosity and the joy of making.",
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
        heading="Side Quests"
        headingLevel={1}
        kicker=""
        description="Fun side projects, built for curiosity and the joy of making."
        rows={rows}
      />
    </ManifestPage>
  );
}
