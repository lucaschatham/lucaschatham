import type { Metadata } from "next";
import Link from "next/link";
import { ManifestPage } from "@/components/manifest";
import { SITE_URL } from "@/lib/constants";
import { MaturityFramework } from "./maturity-framework";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "AI Consulting for Practical Digital Transformation",
  description:
    "Turn one expensive workflow into a measurable AI system in four to six weeks.",
  alternates: {
    canonical: `${SITE_URL}/ai-consulting`,
  },
};

const contactHref =
  "mailto:chathamworks@gmail.com?subject=AI%20workflow%20triage&body=The%20workflow%20I%20want%20to%20improve%3A%0A%0AWho%20owns%20it%3A%0A%0AWhat%20it%20costs%20us%20today%3A";

const pilotOutputs = [
  {
    number: "01",
    name: "Baseline",
    description:
      "Define the workflow, choose the metric, and capture a clear before picture.",
  },
  {
    number: "02",
    name: "Working system",
    description:
      "Build the AI workflow with your tools, data, and operating constraints.",
  },
  {
    number: "03",
    name: "Controls",
    description:
      "Add human review, failure paths, access rules, and quality standards.",
  },
  {
    number: "04",
    name: "Trained owner",
    description:
      "Train one owner to run the workflow, inspect results, and improve the system.",
  },
  {
    number: "05",
    name: "Measured result",
    description:
      "Compare the result against the baseline and choose the next investment.",
  },
];

const proof = [
  {
    metric: "6,000+ annotators",
    detail: "20+ tools · 5 time zones",
    description:
      "Built and operated AI data workflows across industries.",
    href: "/projects/imerit",
  },
  {
    metric: "209% YoY growth",
    detail: "11+ coaches trained",
    description:
      "Turned expert work into products, training, and operating systems.",
    href: "/projects/gymnazo",
  },
  {
    metric: "3 city pilots → 2 countries",
    detail: "Computer vision operations",
    description:
      "Scaled data ingestion and mapping from field pilot to production.",
    href: "/projects/blue-vision-labs-lyft",
  },
];

const process = [
  {
    number: "01",
    name: "Discover and scope",
    timing: "Week 1",
    description:
      "Study the workflow, validate the pain, choose the owner, and set the success metric.",
  },
  {
    number: "02",
    name: "Build and integrate",
    timing: "Weeks 2 to 3",
    description:
      "Build the AI system inside your stack and connect it to the work.",
  },
  {
    number: "03",
    name: "Control and train",
    timing: "Week 4",
    description:
      "Add controls, set operating rules, and train the workflow owner.",
  },
  {
    number: "04",
    name: "Measure and decide",
    timing: "Weeks 5 to 6",
    description:
      "Compare the result against the baseline, report the outcome, and choose what comes next.",
  },
];

const questions = [
  {
    question: "We tried AI and it did not stick.",
    answer:
      "A pilot fails when no one owns the workflow, no baseline exists, or no review step catches errors. I build all three into the pilot.",
  },
  {
    question: "Do we need clean data?",
    answer:
      "No. I work with the data and tools you have. We choose a workflow your data can support.",
  },
  {
    question: "Do we need engineers?",
    answer:
      "No for many first workflows. I use tools your team can own. If the work needs code, I define the build and work with your developer.",
  },
  {
    question: "Will this replace our team?",
    answer:
      "No. The system removes busywork. Your team owns decisions, exceptions, and customer judgment.",
  },
  {
    question: "How much time will our team spend?",
    answer:
      "One owner gives two to three hours per week. Team members join working sessions when their process knowledge matters.",
  },
];

export default function AIConsultingPage() {
  return (
    <ManifestPage active="ai-consulting">
      <div className={styles.consulting}>
        <section className={styles.hero}>
          <p className={styles.eyebrow}>AI that works like your best operator</p>
          <h1>
            Turn one expensive workflow into a measurable AI system in six
            weeks.
          </h1>
          <p className={styles.heroCopy}>
            I help business owners replace slow, fragile work with an AI
            workflow their team can run, measure, and improve.
          </p>

          <div className={styles.heroActions}>
            <a className={styles.primaryButton} href={contactHref}>
              Book a 20-minute workflow triage
              <span aria-hidden="true">→</span>
            </a>
            <a className={styles.textLink} href="#maturity">
              Find your stage <span aria-hidden="true">↓</span>
            </a>
          </div>

          <div className={styles.guarantee}>
            <span className={styles.guaranteeMark} aria-hidden="true">
              ✓
            </span>
            <p>
              We agree on the baseline before we start. If the pilot does not
              beat the metric, I waive the final invoice.
            </p>
          </div>
        </section>

        <section className={styles.maturity} id="maturity">
          <div className={styles.sectionHeading}>
            <p className={styles.sectionLabel}>The measurable path / 01</p>
            <div>
              <h2>Find your stage. See your next move.</h2>
              <p>
                Choose the statement that matches how work gets done. Tap a
                stage to see what must change next.
              </p>
            </div>
          </div>
          <MaturityFramework />
        </section>

        <section className={styles.offer} id="workflow-pilot">
          <div className={styles.offerIntro}>
            <p className={styles.sectionLabel}>The offer / 02</p>
            <h2>AI Workflow Pilot</h2>
            <p className={styles.offerMeta}>
              4 to 6 weeks <span>·</span> One workflow <span>·</span> One
              internal owner
            </p>
            <p className={styles.offerCopy}>
              We choose one workflow with clear pain and a measurable outcome. I
              set the baseline, build the AI system, add controls, train your
              owner, and measure the result.
            </p>
            <a className={styles.textLink} href={contactHref}>
              Bring me a workflow <span aria-hidden="true">→</span>
            </a>
          </div>

          <ol className={styles.outputList}>
            {pilotOutputs.map((output) => (
              <li key={output.name}>
                <span>{output.number}</span>
                <div>
                  <h3>{output.name}</h3>
                  <p>{output.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.proofSection}>
          <div className={styles.proofHeading}>
            <p className={styles.sectionLabel}>
              Operating history, not client testimonials / 03
            </p>
            <p>
              I built these systems in operating roles. The project pages show
              the work.
            </p>
          </div>
          <div className={styles.proofGrid}>
            {proof.map((item) => (
              <Link className={styles.proofCard} href={item.href} key={item.metric}>
                <strong>{item.metric}</strong>
                <span>{item.detail}</span>
                <p>{item.description}</p>
                <small>Read the operating history ↗</small>
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.processSection}>
          <div className={styles.sectionHeading}>
            <p className={styles.sectionLabel}>How the work runs / 04</p>
            <div>
              <h2>Four steps. One measured result.</h2>
              <p>
                Your team sees the work, owns the decisions, and keeps the
                system when the pilot ends.
              </p>
            </div>
          </div>

          <ol className={styles.process}>
            {process.map((step) => (
              <li key={step.name}>
                <div className={styles.processMarker}>
                  <span>{step.number}</span>
                  <i aria-hidden="true" />
                </div>
                <h3>{step.name}</h3>
                <p>{step.description}</p>
                <small>{step.timing}</small>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.faqSection}>
          <div className={styles.sectionHeading}>
            <p className={styles.sectionLabel}>Common objections / 05</p>
            <div>
              <h2>Straight answers.</h2>
              <p>
                The first workflow should reduce risk and prove value. It should
                not create another program to manage.
              </p>
            </div>
          </div>
          <div className={styles.faq}>
            {questions.map((item, index) => (
              <details key={item.question}>
                <summary>
                  <span>0{index + 1}</span>
                  {item.question}
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className={styles.cta} id="contact">
          <div>
            <p className={styles.eyebrow}>One useful conversation</p>
            <h2>Turn one workflow into a measurable AI system.</h2>
            <p>
              Bring the workflow, its owner, and the result you want. I will
              tell you if a six-week pilot fits.
            </p>
          </div>
          <div className={styles.ctaAction}>
            <a className={styles.primaryButton} href={contactHref}>
              Book a 20-minute workflow triage
              <span aria-hidden="true">→</span>
            </a>
            <p>
              We set the baseline first. If the pilot does not beat the metric,
              I waive the final invoice.
            </p>
          </div>
        </section>
      </div>
    </ManifestPage>
  );
}
