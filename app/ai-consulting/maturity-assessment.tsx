"use client";

import {
  type CSSProperties,
  type KeyboardEvent,
  useMemo,
  useState,
} from "react";
import styles from "./page.module.css";

type Dimension = "People" | "Process" | "Systems" | "Governance" | "Measurement";

type Stage = {
  name: string;
  shorthand: string;
  summary: string;
  nextMove: string;
  dimensions: Record<Dimension, string>;
};

const stages: Stage[] = [
  {
    name: "AI Curious",
    shorthand: "“Some of us use ChatGPT sometimes.”",
    summary:
      "Individuals experiment on their own. Useful work happens, but it stays inconsistent, invisible, and disconnected from company priorities.",
    nextMove:
      "Choose three high-friction workflows, set a safe-use baseline, and measure time, quality, or revenue before changing the work.",
    dimensions: {
      People: "Individual explorers",
      Process: "Ad hoc tasks",
      Systems: "Public tools",
      Governance: "Unwritten rules",
      Measurement: "Anecdotal wins",
    },
  },
  {
    name: "AI Assisted",
    shorthand: "“Several teams use approved AI tools every week.”",
    summary:
      "AI helps people draft, research, analyze, and prepare. Adoption is real, but the value still depends on individual habits.",
    nextMove:
      "Turn one repeated task into an owned workflow with defined inputs, quality checks, and a measurable baseline.",
    dimensions: {
      People: "Active teams",
      Process: "Repeatable tasks",
      Systems: "Approved copilots",
      Governance: "Basic policy",
      Measurement: "Usage signals",
    },
  },
  {
    name: "Workflow Enabled",
    shorthand: "“AI runs inside repeatable, owned workflows.”",
    summary:
      "Teams use shared assistants, automations, and standards to complete defined work. The capability survives beyond the original enthusiast.",
    nextMove:
      "Connect successful workflows across functions, strengthen evaluation, and assign an accountable operating owner.",
    dimensions: {
      People: "Trained roles",
      Process: "Owned workflows",
      Systems: "Connected tools",
      Governance: "Review gates",
      Measurement: "Workflow return",
    },
  },
  {
    name: "Operationally Embedded",
    shorthand: "“AI is part of how core operations run.”",
    summary:
      "AI is integrated into systems, decisions, and customer operations. Teams manage it as an operating capability, not a side project.",
    nextMove:
      "Redesign products, roles, and operating models around capabilities that were previously too expensive or slow to deliver.",
    dimensions: {
      People: "Company capability",
      Process: "Core operations",
      Systems: "Integrated stack",
      Governance: "Active controls",
      Measurement: "Portfolio return",
    },
  },
  {
    name: "AI Native",
    shorthand: "“AI changes what our business can be.”",
    summary:
      "The organization continuously redesigns products and operations around AI. Proprietary context, evaluation, and learning create advantage.",
    nextMove:
      "Protect the learning loop. Keep evaluation close to customers, invest in proprietary context, and retire workflows that no longer fit.",
    dimensions: {
      People: "AI-shaped roles",
      Process: "Adaptive operations",
      Systems: "Proprietary platform",
      Governance: "Continuous assurance",
      Measurement: "Strategic advantage",
    },
  },
];

const questions: {
  dimension: Dimension;
  prompt: string;
  answers: string[];
}[] = [
  {
    dimension: "People",
    prompt: "Who uses AI in your organization today?",
    answers: [
      "A few people use AI on their own.",
      "Several teams use approved AI tools every week.",
      "People in defined roles are trained to use AI.",
      "AI capability is shared across the company.",
      "Roles are designed around what AI makes possible.",
    ],
  },
  {
    dimension: "Process",
    prompt: "How does AI show up in how work gets done?",
    answers: [
      "AI helps with occasional, ad hoc tasks.",
      "We repeat useful AI-assisted tasks, but people run them differently.",
      "AI runs inside documented workflows with clear owners.",
      "AI is part of our core operating processes.",
      "Our operations adapt continuously as the system learns.",
    ],
  },
  {
    dimension: "Systems",
    prompt: "What tools and data does AI touch?",
    answers: [
      "People use public chatbots and personal accounts.",
      "We use approved copilots, mostly as standalone tools.",
      "AI connects to selected company tools and knowledge.",
      "AI is integrated with governed data and core systems.",
      "We operate a proprietary AI platform and data loop.",
    ],
  },
  {
    dimension: "Governance",
    prompt: "What are the rules for AI use?",
    answers: [
      "The rules are unwritten.",
      "We have a basic acceptable-use policy.",
      "Important outputs pass defined human review gates.",
      "We monitor quality, risk, and accountability continuously.",
      "Continuous assurance is built into how the system operates.",
    ],
  },
  {
    dimension: "Measurement",
    prompt: "How do you know it is working?",
    answers: [
      "We have anecdotes, not a baseline.",
      "We measure adoption and usage.",
      "We compare workflow results against a baseline.",
      "We manage AI as a portfolio with return and risk metrics.",
      "AI creates strategic advantage we can measure and defend.",
    ],
  },
];

export function MaturityAssessment() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Array<number | undefined>>(
    Array(questions.length).fill(undefined)
  );
  const [showResult, setShowResult] = useState(false);
  const [browsedStage, setBrowsedStage] = useState(0);

  const question = questions[questionIndex];
  const selected = answers[questionIndex];
  const resultLevel = useMemo(() => {
    const total = answers.reduce<number>(
      (sum, answer) => sum + (answer ?? 1),
      0
    );
    return Math.round(total / questions.length);
  }, [answers]);
  const result = stages[resultLevel - 1];

  const resultEmail = useMemo(() => {
    const profile = questions
      .map((item, index) => {
        const level = answers[index] ?? 1;
        return `${item.dimension} (${level}/5): ${item.answers[level - 1]}`;
      })
      .join("\n");
    const subject = `AI maturity: Stage ${resultLevel}, ${result.name}`;
    const body = [
      `My result: Stage ${resultLevel}, ${result.name}`,
      "",
      profile,
      "",
      "The workflow I want to improve:",
      "",
      "What a good outcome would look like:",
    ].join("\n");

    return `mailto:chathamworks@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  }, [answers, result, resultLevel]);

  function choose(level: number) {
    setAnswers((current) =>
      current.map((answer, index) =>
        index === questionIndex ? level : answer
      )
    );
  }

  function handleAnswerKey(
    event: KeyboardEvent<HTMLInputElement>,
    level: number
  ) {
    const direction =
      event.key === "ArrowRight" || event.key === "ArrowDown"
        ? 1
        : event.key === "ArrowLeft" || event.key === "ArrowUp"
          ? -1
          : 0;
    if (!direction) return;

    event.preventDefault();
    const nextLevel = Math.min(5, Math.max(1, level + direction));
    choose(nextLevel);
    event.currentTarget
      .closest("fieldset")
      ?.querySelectorAll<HTMLInputElement>('input[type="radio"]')
      [nextLevel - 1]?.focus();
  }

  function continueAssessment() {
    if (selected === undefined) return;
    if (questionIndex === questions.length - 1) {
      setShowResult(true);
      return;
    }
    setQuestionIndex((current) => current + 1);
  }

  function restart() {
    setAnswers(Array(questions.length).fill(undefined));
    setQuestionIndex(0);
    setShowResult(false);
  }

  return (
    <div className={styles.assessmentShell}>
      {!showResult ? (
        <div className={styles.question} key={question.dimension}>
          <div className={styles.progressLabel}>
            <span>
              Question {questionIndex + 1} / {questions.length}
            </span>
            <span>{question.dimension}</span>
          </div>
          <div className={styles.progressTrack} aria-hidden="true">
            <span
              style={
                {
                  "--progress":
                    ((questionIndex + 1) / questions.length) * 100 + "%",
                } as CSSProperties
              }
            />
          </div>
          <fieldset>
            <legend>{question.prompt}</legend>
            <div className={styles.answerList}>
              {question.answers.map((answer, index) => {
                const level = index + 1;
                return (
                  <label
                    className={
                      selected === level
                        ? `${styles.answer} ${styles.answerSelected}`
                        : styles.answer
                    }
                    key={answer}
                  >
                    <input
                      checked={selected === level}
                      name={`maturity-${question.dimension}`}
                      onChange={() => choose(level)}
                      onKeyDown={(event) => handleAnswerKey(event, level)}
                      type="radio"
                      value={level}
                    />
                    <span>{String(level).padStart(2, "0")}</span>
                    <strong>{answer}</strong>
                  </label>
                );
              })}
            </div>
          </fieldset>
          <div className={styles.assessmentControls}>
            {questionIndex > 0 ? (
              <button
                className={styles.quietButton}
                onClick={() => setQuestionIndex((current) => current - 1)}
                type="button"
              >
                Back
              </button>
            ) : (
              <span />
            )}
            <button
              className={styles.primaryButton}
              disabled={selected === undefined}
              onClick={continueAssessment}
              type="button"
            >
              {questionIndex === questions.length - 1
                ? "See my stage"
                : "Continue"}
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      ) : (
        <section className={styles.result} aria-live="polite">
          <div className={styles.resultSummary}>
            <p className={styles.eyebrow}>Your result / Stage {resultLevel}</p>
            <h3>{result.name}</h3>
            <blockquote>{result.shorthand}</blockquote>
            <p>{result.summary}</p>
            <div className={styles.nextMove}>
              <span>Your next move</span>
              <p>{result.nextMove}</p>
            </div>
          </div>
          <div className={styles.profile}>
            <p className={styles.eyebrow}>Your capability profile</p>
            <dl>
              {questions.map((item, index) => {
                const level = answers[index] ?? 1;
                return (
                  <div key={item.dimension}>
                    <dt>{item.dimension}</dt>
                    <dd>
                      <span>{item.answers[level - 1]}</span>
                      <i
                        aria-label={`${item.dimension}: level ${level} of 5`}
                        aria-valuemax={5}
                        aria-valuemin={1}
                        aria-valuenow={level}
                        role="meter"
                        style={
                          { "--level": `${level}` } as CSSProperties
                        }
                      />
                    </dd>
                  </div>
                );
              })}
            </dl>
            <div className={styles.resultActions}>
              <a className={styles.primaryButton} href={resultEmail}>
                Email me this assessment <span aria-hidden="true">↗</span>
              </a>
              <button className={styles.quietButton} onClick={restart} type="button">
                Retake assessment
              </button>
            </div>
          </div>
        </section>
      )}

      <details className={styles.stageBrowser}>
        <summary>Browse all five maturity stages</summary>
        <div className={styles.stageTabs} role="tablist" aria-label="Maturity stages">
          {stages.map((stage, index) => (
            <button
              aria-selected={browsedStage === index}
              className={browsedStage === index ? styles.stageTabActive : undefined}
              key={stage.name}
              onClick={() => setBrowsedStage(index)}
              role="tab"
              type="button"
            >
              <span>0{index + 1}</span>
              {stage.name}
            </button>
          ))}
        </div>
        <div className={styles.stageDetail} role="tabpanel">
          <div>
            <p className={styles.eyebrow}>
              Stage {browsedStage + 1} / 5
            </p>
            <h3>{stages[browsedStage].name}</h3>
            <blockquote>{stages[browsedStage].shorthand}</blockquote>
            <p>{stages[browsedStage].summary}</p>
          </div>
          <dl>
            {Object.entries(stages[browsedStage].dimensions).map(
              ([dimension, value]) => (
                <div key={dimension}>
                  <dt>{dimension}</dt>
                  <dd>{value}</dd>
                </div>
              )
            )}
          </dl>
        </div>
      </details>
    </div>
  );
}
