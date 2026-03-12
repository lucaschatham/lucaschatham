import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About Lucas Chatham.",
};

export default function AboutPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight mb-8">About</h1>
      <div className="prose">
        <p>
          Hey, I'm Lucas. I build things at the intersection of health,
          technology, and design.
        </p>
        <p>
          I'm passionate about using technology to help people live healthier,
          more intentional lives. When I'm not coding, you can find me reading,
          working out, or exploring new ideas.
        </p>
        <p>
          This site is where I share what I'm learning and working on. Feel free
          to reach out if you want to connect.
        </p>
      </div>
    </div>
  );
}
