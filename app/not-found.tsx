import Link from "next/link";
import { ManifestPage } from "@/components/manifest";

export default function NotFound() {
  return (
    <ManifestPage active="home">
      <section className="content-shell flex flex-col items-center justify-center py-20">
        <h1 className="text-4xl font-semibold tracking-tight mb-4">404</h1>
        <p className="text-[var(--mute)] mb-6">This page does not exist.</p>
        <Link
          href="/"
          className="flex min-h-11 items-center text-sm text-[var(--mute)] underline underline-offset-2 hover:text-[var(--cream)]"
        >
          Go home
        </Link>
      </section>
    </ManifestPage>
  );
}
