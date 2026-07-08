import { ManifestPage, RowsSection, projectToRow } from "@/components/manifest";
import { getPosts } from "@/lib/content";
import { SITE_URL } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Side Quests",
  description: "Personal builds, experiments, and self-directed tools.",
  alternates: {
    canonical: `${SITE_URL}/side-quests`,
  },
};

export default function SideQuestsPage() {
  const quests = getPosts("side-quests");
  const rows = quests.map((project) => projectToRow(project, "side-quests"));

  return (
    <ManifestPage active="side-quests">
      <RowsSection heading="side quests" kicker="LABS" rows={rows} />
    </ManifestPage>
  );
}
