import styles from "./page.module.css";

const maturityStages = [
  {
    number: "01",
    name: "Experimenting",
    shorthand: "Some of us use ChatGPT sometimes.",
    signal:
      "Individuals choose their own tools and methods. Useful work happens, but leadership cannot see the value or risk.",
    nextMove: "Choose one repeated workflow and measure how it works today.",
  },
  {
    number: "02",
    name: "Standardizing",
    shorthand: "Teams have approved tools and shared habits.",
    signal:
      "People use AI regularly with basic guidance. Results still depend on who knows the best prompts and workarounds.",
    nextMove: "Document one owned workflow with inputs, review steps, and a target.",
  },
  {
    number: "03",
    name: "Operationalizing",
    shorthand: "AI runs inside owned, measurable workflows.",
    signal:
      "AI connects to company knowledge and tools. Owners track speed, quality, cost, and exceptions against a baseline.",
    nextMove: "Connect proven workflows and manage them as an operating portfolio.",
  },
  {
    number: "04",
    name: "Transforming",
    shorthand: "AI changes how the business operates and competes.",
    signal:
      "Products, roles, and decisions are redesigned around AI. Company data and feedback loops create a durable advantage.",
    nextMove: "Keep evaluation close to customers and protect the learning loop.",
  },
];

export function MaturityFramework() {
  return (
    <div
      className={styles.framework}
      aria-label="Four-stage Digital and AI Maturity Framework"
    >
      <div className={styles.frameworkScale} aria-hidden="true">
        <span>Individual use</span>
        <i />
        <span>Business advantage</span>
      </div>
      <ol className={styles.frameworkStages}>
        {maturityStages.map((stage) => (
          <li key={stage.name}>
            <article>
              <div className={styles.stageMarker}>
                <span>{stage.number}</span>
                <i aria-hidden="true" />
              </div>
              <p className={styles.stageStatus}>Stage {stage.number}</p>
              <h3>{stage.name}</h3>
              <blockquote>“{stage.shorthand}”</blockquote>
              <div className={styles.stageSignal}>
                <span>You are here if</span>
                <p>{stage.signal}</p>
              </div>
              <div className={styles.stageNextMove}>
                <span>Next move</span>
                <p>{stage.nextMove}</p>
              </div>
            </article>
          </li>
        ))}
      </ol>
    </div>
  );
}

