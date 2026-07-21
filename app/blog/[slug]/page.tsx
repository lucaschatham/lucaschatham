import { permanentRedirect } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  permanentRedirect(`/essays/${slug}`);
}
