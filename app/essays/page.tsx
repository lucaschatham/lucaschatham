import { ManifestPage, RowsSection, postToRow } from "@/components/manifest";
import { getPosts } from "@/lib/content";
import { SITE_URL } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Essays",
  description: "Thoughts on technology, health, and building things.",
  alternates: {
    canonical: `${SITE_URL}/essays`,
  },
};

export default function EssaysPage() {
  const posts = getPosts("blog");
  const rows = posts.map((post) => postToRow(post, "blog"));

  return (
    <ManifestPage active="essays">
      <RowsSection
        heading="essays"
        headingLevel={1}
        kicker="ALL"
        rows={rows}
        emptyLabel="No essays published yet."
      />
    </ManifestPage>
  );
}
