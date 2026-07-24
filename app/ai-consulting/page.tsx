import type { Metadata } from "next";
import Link from "next/link";
import { ManifestPage } from "@/components/manifest";
import { SITE_URL } from "@/lib/constants";
import { MaturityFramework } from "./maturity-framework";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "AI Consulting for Practical Digital Transformation",
  description:
    "Find the workflow where AI pays, ship a measurable pilot, and build the capability to run it without consultant dependence.",
  alternates: {
    canonical: `${SITE_URL}/ai-consulting`,
  },
};

const contactHref =
  "mailto:chathamworks@gmail.com?subject=AI%20consulting%20inquiry&body=Where%20we%20are%20today%3A%0A%0AThe%20workflow%20I%20want%20to%20improve%3A%0A%0AWhat%20a%20good%20outcome%20would%20look%20like%3A";

const proof = [
  {
    metric: "6,000+ annotators · 20+ tools · 5 time zones",
    title: "iMerit Ground Control",
    description:
      "Built an enterprise AI operations platform governing quality, throughput, and exceptions.",
    href: "/projects/imerit",
  },
  {
    metric: "11+ coaches trained · 209% YoY growth",
    title: "Gymnazo",
    description:
      "Turned expert coaching into repeatable products, curriculum, and operating systems.",
    href: "/projects/gymnazo",
  },
  {
    metric: "3 city pilots → 2 countries",
    title: "Blue Vision Labs → Lyft",
    description:
      "Scaled computer vision data ingestion and mapping operations from pilot to production.",
    href: "/projects/blue-vision-labs-lyft",
  },
];

const engagements = [
  {
    number: "01",
    name: "AI Opportunity Map",
    timing: "Typical scope: 2 weeks",
    purpose: "Decide where AI should earn its place.",
    description:
      "Map the work, identify friction, and rank opportunities by value, feasibility, and risk. Leave with a 90-day roadmap your team can execute.",
    outputs: [
      "Current-state maturity assessment",
      "Prioritized workflow portfolio",
      "Risk and readiness baseline",
      "90-day action plan",
    ],
    commitment:
      "The Opportunity Map fee is credited toward a Pilot if we continue.",
  },
  {
    number: "02",
    name: "Workflow Pilot",
    timing: "Typical scope: 4 to 6 weeks",
    purpose: "Prove value in one real workflow.",
    description:
      "Design and ship one production-ready workflow with the people who will own it. Measure the result against how the work gets done today.",
    outputs: [
      "Working AI-enabled workflow",
      "Human review and quality controls",
      "Team playbook and training",
      "Before-and-after measurement",
    ],
    commitment:
      "We agree on the metric and baseline before work starts. If the pilot does not beat the baseline, the final invoice is waived.",
    featured: true,
  },
  {
    number: "03",
    name: "AI Operating System",
    timing: "Typical scope: 8 to 12 weeks",
    purpose: "Make successful AI use repeatable.",
    description:
      "Build the standards, ownership, data access, and portfolio rhythm that move AI from scattered projects into normal operations.",
    outputs: [
      "Governance and decision rights",
      "Reusable workflow architecture",
      "Adoption and enablement plan",
      "Value dashboard and review rhythm",
    ],
  },
];

const questions = [
  {
    question: "We ran a pilot and it fizzled. Why would this be different?",
    answer:
      "Pilots usually die from a missing owner, baseline, or review step. This engagement ships all three. Measurement is part of the deliverable.",
  },
  {
    question: "Our data is a mess.",
    answer:
      "Useful workflows exist at every level of data maturity. The Opportunity Map scores readiness so we do not choose work your data cannot support.",
  },
  {
    question: "Do we need engineers?",
    answer:
      "No. The first workflows use tools your team already has. If integration is needed, I specify the work clearly enough for a capable developer to build.",
  },
  {
    question: "What does it cost?",
    answer:
      "Each engagement is a scoped fixed fee after a conversation about the workflow. The Pilot guarantee puts the risk of a poor measured result with me.",
  },
  {
    question: "How much of our time does it take?",
    answer:
      "The workflow owner should expect a few hours a week. They participate so they can run and improve the system after I leave.",
  },
];

export default function AIConsultingPage() {
  return (
    <ManifestPage active="ai-consulting">
      <div className={styles.consulting}>
        <section className={styles.hero}>
          <p className={styles.eyebrow}>
            AI consulting / practical digital transformation
          </p>
          <h1>Your team already uses AI. The business cannot see it yet.</h1>
          <p className={styles.heroCopy}>
            I find the workflow where AI pays, ship the first working system
            with your team, and leave you able to run it without me.
          </p>
          <div className={styles.heroActions}>
            <a className={styles.primaryButton} href="#maturity">
              See where you are <span aria-hidden="true">↓</span>
            </a>
            <a className={styles.textLink} href={contactHref}>
              Bring me a workflow <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className={styles.operatingStrip}>
            <p className={styles.eyebrow}>Operating history</p>
            <div>
              <span><strong>6,000+</strong> people in AI data operations</span>
              <span><strong>209%</strong> year-over-year growth</span>
              <span><strong>3 → 2</strong> city pilots to countries</span>
            </div>
          </div>
        </section>

        <section className={styles.editorialIntro}>
          <p className={styles.sectionLabel}>The starting point / 01</p>
          <div>
            <h2>Do not start with a tool. Start with the work.</h2>
            <p>
              Buying another AI subscription will not transform your business.
              Choose a costly, slow, or inconsistent workflow. Improve it.
              Measure the result. Then build the muscle to do it again.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeading}>
            <p className={styles.sectionLabel}>Why me / 02</p>
            <div>
              <h2>Operating history, not borrowed credibility.</h2>
              <p>
                These are systems I built and scaled in operating roles. They
                are not testimonials from consulting clients.
              </p>
            </div>
          </div>
          <div className={styles.proofGrid}>
            {proof.map((item, index) => (
              <Link className={styles.proofCard} href={item.href} key={item.title}>
                <span>0{index + 1}</span>
                <p>{item.metric}</p>
                <h3>{item.title}</h3>
                <small>{item.description}</small>
                <b>Read the operating history ↗</b>
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.maturity} id="maturity">
          <div className={styles.sectionHeading}>
            <p className={styles.sectionLabel}>Digital + AI maturity / 03</p>
            <div>
              <h2>Place your company on the maturity framework.</h2>
              <p>
                Read left to right. Pick the stage that best describes how work
                gets done today, then use its next move as your starting point.
              </p>
            </div>
          </div>
          <MaturityFramework />
        </section>

        <section className={styles.section} id="engagements">
          <div className={styles.sectionHeading}>
            <p className={styles.sectionLabel}>Ways to work together / 04</p>
            <div>
              <h2>Move one stage forward.</h2>
              <p>
                Each engagement produces a decision, a working capability, or
                both. No transformation theater.
              </p>
            </div>
          </div>
          <div className={styles.engagements}>
            {engagements.map((engagement) => (
              <article
                className={
                  engagement.featured
                    ? `${styles.engagement} ${styles.featured}`
                    : styles.engagement
                }
                key={engagement.name}
              >
                <div className={styles.engagementMeta}>
                  <span>{engagement.number}</span>
                  <p>{engagement.timing}</p>
                  {engagement.featured ? <small>Most start here</small> : null}
                </div>
                <div>
                  <h3>{engagement.name}</h3>
                  <strong>{engagement.purpose}</strong>
                  <p>{engagement.description}</p>
                  {engagement.commitment ? (
                    <p className={styles.commitment}>
                      <span>Commitment</span>
                      {engagement.commitment}
                    </p>
                  ) : null}
                </div>
                <ul>
                  {engagement.outputs.map((output) => (
                    <li key={output}>{output}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.approach}>
          <div>
            <p className={styles.sectionLabel}>How the work runs / 05</p>
            <h2>Strategy that survives Monday morning.</h2>
          </div>
          <ol>
            {[
              ["Observe the real work", "Follow the handoffs, exceptions, data, and decisions that process diagrams miss."],
              ["Choose the valuable constraint", "Score opportunities against value, effort, data readiness, and risk."],
              ["Build with the owner", "Define where people decide, where AI assists, and how the team catches failure."],
              ["Prove and transfer", "Measure the result, document the system, and leave the team able to improve it."],
            ].map(([title, description], index) => (
              <li key={title}>
                <span>0{index + 1}</span>
                <div><h3>{title}</h3><p>{description}</p></div>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.fit}>
          <p className={styles.sectionLabel}>Good fit / 06</p>
          <div>
            <h2>Interest is real. The path is not.</h2>
            <p>
              You have roughly 10 to 500 people. Employees already experiment
              with ChatGPT, Claude, or copilots. Leadership sees the potential
              but lacks a prioritized use case, safe operating model, or path
              from demo to daily work.
            </p>
          </div>
          <div className={styles.fitList}>
            <p>Especially useful when:</p>
            <ul>
              <li>Pilots stall after the demo</li>
              <li>Teams use AI without shared standards</li>
              <li>Tool choices outrun workflow decisions</li>
              <li>Leaders cannot see measurable return</li>
            </ul>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeading}>
            <p className={styles.sectionLabel}>Common questions / 07</p>
            <div>
              <h2>The silent no&apos;s, answered.</h2>
              <p>
                The first workflow should reduce uncertainty, not create another
                program to manage.
              </p>
            </div>
          </div>
          <div className={styles.faq}>
            {questions.map((item, index) => (
              <details key={item.question}>
                <summary><span>0{index + 1}</span>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className={styles.cta} id="contact">
          <p className={styles.eyebrow}>One useful conversation</p>
          <h2>Bring me the workflow that wastes your team&apos;s time.</h2>
          <p>
            Describe where you are today, the workflow you want to improve, and
            what a good outcome would look like.
          </p>
          <small>
            I take on a small number of engagements. If capacity is full, you
            will get a date, not a waitlist.
          </small>
          <a className={styles.primaryButton} href={contactHref}>
            Start the conversation <span aria-hidden="true">↗</span>
          </a>
        </section>
      </div>
    </ManifestPage>
  );
}
