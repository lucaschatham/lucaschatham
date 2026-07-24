"use client";

import { useState } from "react";
import styles from "./page.module.css";

const maturityStages = [
  {
    number: "01",
    name: "Individuals use AI",
    summary:
      "People use ChatGPT or Claude on their own. The business cannot see the value, quality, or risk.",
    work:
      "People draft, research, summarize, and solve problems with tools they choose.",
    block:
      "Each person uses a different method. Results vary, knowledge stays private, and leaders cannot measure the work.",
    nextMove:
      "Choose one repeated workflow. Record its time, cost, quality, and owner.",
  },
  {
    number: "02",
    name: "Teams use AI",
    summary:
      "Teams share tools, prompts, and rules. Results still depend on who runs the work.",
    work:
      "Teams use approved tools, reuse prompts, and share examples that work.",
    block:
      "Knowledge lives in people and documents. Handoffs break, and strong results rely on a few skilled users.",
    nextMove:
      "Define one owned workflow with inputs, review points, and a success metric.",
  },
  {
    number: "03",
    name: "AI runs automations",
    summary:
      "AI runs automations that help people complete owned, measurable work.",
    work:
      "AI moves work across tools. People review exceptions, make decisions, and own the result.",
    block:
      "Separate automations do not share context. Owners manage cost, quality, and failures one system at a time.",
    nextMove:
      "Connect proven automations. Track speed, cost, quality, and exceptions as one portfolio.",
  },
  {
    number: "04",
    name: "Business runs on AI",
    summary:
      "AI shapes how the business operates, learns, and adapts in real time.",
    work:
      "Products, decisions, and operations use live data. Customer feedback changes the system.",
    block:
      "Growth depends on the quality of the data, controls, and feedback loop.",
    nextMove:
      "Protect the feedback loop. Keep evaluation close to customers and business results.",
  },
];

export function MaturityFramework() {
  const [selectedStage, setSelectedStage] = useState(0);
  const selected = maturityStages[selectedStage];

  return (
    <div
      className={styles.framework}
      aria-label="Four-stage Digital and AI Maturity Framework"
    >
      <div className={styles.frameworkScale} aria-hidden="true">
        <span>Individual use</span>
        <i />
        <span>AI-native business</span>
      </div>

      <ol className={styles.frameworkStages}>
        {maturityStages.map((stage, index) => {
          const isSelected = selectedStage === index;

          return (
            <li key={stage.name}>
              <button
                aria-controls="maturity-stage-detail"
                aria-pressed={isSelected}
                className={isSelected ? styles.stageSelected : undefined}
                onClick={() => setSelectedStage(index)}
                type="button"
              >
                <span className={styles.stageMarker}>
                  <b>{stage.number}</b>
                  <i aria-hidden="true" />
                </span>
                <span className={styles.stageStatus}>Stage {stage.number}</span>
                <strong>{stage.name}</strong>
                <small>{stage.summary}</small>
                <span className={styles.stageAction}>
                  {isSelected ? "Viewing stage" : "View stage"}
                  <b aria-hidden="true">{isSelected ? "↓" : "+"}</b>
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <section
        aria-live="polite"
        className={styles.stagePanel}
        id="maturity-stage-detail"
        tabIndex={0}
      >
        <div className={styles.stagePanelIntro}>
          <p className={styles.stageStatus}>Stage {selected.number}</p>
          <h3>{selected.name}</h3>
          <p>{selected.summary}</p>
        </div>
        <dl>
          <div>
            <dt>What work looks like</dt>
            <dd>{selected.work}</dd>
          </div>
          <div>
            <dt>What blocks growth</dt>
            <dd>{selected.block}</dd>
          </div>
          <div className={styles.stageNextMove}>
            <dt>Next move</dt>
            <dd>{selected.nextMove}</dd>
          </div>
        </dl>
      </section>
    </div>
  );
}
