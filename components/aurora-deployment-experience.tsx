"use client";

import { useEffect, useRef, useState, type TouchEvent } from "react";

type Evidence = "Confirmed public fact" | "Supported inference" | "Not publicly established";

type Stage = {
  number: string;
  phase: string;
  shortTitle: string;
  title: string;
  evidence: Evidence;
  summary: string;
  physical: string;
  record: string;
  boundary: string;
  image: string;
  imageAlt: string;
  sources: { label: string; href: string }[];
  acronyms: { term: string; meaning: string }[];
};

const sources = {
  doeCx: {
    label: "DOE categorical exclusion",
    href: "https://www.energy.gov/sites/default/files/2026-06/CX-271013.pdf",
  },
  inl: {
    label: "INL FY2025 research impacts",
    href: "https://inl.gov/content/uploads/2025/11/nst-research-impacts-fy25.pdf",
  },
  a3f: {
    label: "INL A3F technical paper",
    href: "https://inldigitallibrary.inl.gov/sites/STI/STI/Sort_171492.pdf",
  },
  nrc: {
    label: "NRC Aurora pre-application record",
    href: "https://www.nrc.gov/reactors/new-reactors/advanced/who-were-working-with/pre-application-activities/okla-aurora-powerhouse",
  },
  pdsa: {
    label: "Oklo PDSA announcement, company source",
    href: "https://oklo.com/newsroom/news-details/2026/U-S--Department-of-Energy-Approves-Preliminary-Documented-Safety-Analysis-for-Aurora-Powerhouse-at-Idaho-National-Laboratory/default.aspx",
  },
  groundbreaking: {
    label: "Oklo groundbreaking announcement, company source",
    href: "https://oklo.com/newsroom/news-details/2025/Oklo-Breaks-Ground-on-First-Aurora-Powerhouse/default.aspx",
  },
};

const stages: Stage[] = [
  {
    number: "01",
    phase: "Site basis",
    shortTitle: "Site",
    title: "Establish the Aurora-INL site basis",
    evidence: "Confirmed public fact",
    summary: "INL places Aurora south of the Materials and Fuels Complex and reports site-characterization and geotechnical work.",
    physical: "Define the disturbance area and characterize the conditions that later work must respect.",
    record: "Keep site assumptions, environmental boundaries, and interface responsibilities traceable.",
    boundary: "A location and early site basis are public. Detailed site-design outputs are not.",
    image: "/images/side-quests/aurora-inl/stage-01.webp",
    imageAlt: "Conceptual aerial view of a surveyed advanced-reactor project site.",
    sources: [sources.inl, sources.doeCx],
    acronyms: [
      { term: "INL", meaning: "Idaho National Laboratory" },
      { term: "MFC", meaning: "Materials and Fuels Complex" },
    ],
  },
  {
    number: "02",
    phase: "Scope boundary",
    shortTitle: "DOE scope",
    title: "Bound the DOE early-work authorization",
    evidence: "Confirmed public fact",
    summary: "DOE's categorical exclusion defines a bounded early-work package and explicitly excludes reactor-component construction or installation under that permit.",
    physical: "Keep work within the stated civil and support scope.",
    record: "Read the authorization boundary literally and document exclusions alongside inclusions.",
    boundary: "The CX is not a nuclear-island construction authorization.",
    image: "/images/side-quests/aurora-inl/stage-02.webp",
    imageAlt: "Conceptual construction site showing a clearly bounded work area.",
    sources: [sources.doeCx],
    acronyms: [
      { term: "CX", meaning: "Categorical exclusion, a DOE National Environmental Policy Act determination for a bounded action" },
      { term: "DOE", meaning: "United States Department of Energy" },
    ],
  },
  {
    number: "03",
    phase: "Early works",
    shortTitle: "Early work",
    title: "Mobilize the bounded early-work site",
    evidence: "Confirmed public fact",
    summary: "The public record supports clearing, grading, access, drainage, temporary facilities, and other defined site preparation activities.",
    physical: "Prepare the site and temporary support conditions within the published boundary.",
    record: "Maintain environmental, access, and interface controls as the civil package advances.",
    boundary: "Groundbreaking and early civil work do not establish reactor installation.",
    image: "/images/side-quests/aurora-inl/stage-03.webp",
    imageAlt: "Conceptual early civil work at an advanced-reactor project site.",
    sources: [sources.doeCx, sources.groundbreaking],
    acronyms: [
      { term: "NEPA", meaning: "National Environmental Policy Act" },
      { term: "SSC", meaning: "Structures, systems, and components" },
    ],
  },
  {
    number: "04",
    phase: "Support interfaces",
    shortTitle: "Support civil",
    title: "Construct the public support-infrastructure scope",
    evidence: "Confirmed public fact",
    summary: "The CX identifies support items including air-cooled-condenser foundations or structures, switchyard, power distribution, and support buildings with stated limits.",
    physical: "Build published support interfaces while preserving the difference between support work and safety-significant plant work.",
    record: "Control interface assumptions so early infrastructure is not presented as a final plant configuration.",
    boundary: "The record does not disclose a final turbine cycle, I&C architecture, or nuclear-island configuration.",
    image: "/images/side-quests/aurora-inl/stage-04.webp",
    imageAlt: "Conceptual support infrastructure under construction at an energy site.",
    sources: [sources.doeCx],
    acronyms: [
      { term: "ACC", meaning: "Air-cooled condenser" },
      { term: "PDC", meaning: "Power distribution center" },
      { term: "I&C", meaning: "Instrumentation and control" },
    ],
  },
  {
    number: "05",
    phase: "Footprints",
    shortTitle: "Excavate",
    title: "Excavate identified building footprints",
    evidence: "Confirmed public fact",
    summary: "DOE's scope includes excavation for reactor and administrative building footprints, but it does not authorize reactor-component work under the CX.",
    physical: "Excavate the public footprints and control civil interfaces.",
    record: "Keep excavation scope, acceptance records, and later design assumptions distinct.",
    boundary: "Excavation is not evidence of an installed reactor system.",
    image: "/images/side-quests/aurora-inl/stage-05.webp",
    imageAlt: "Conceptual excavated building footprint at a nuclear-energy project site.",
    sources: [sources.doeCx],
    acronyms: [
      { term: "SSC", meaning: "Structures, systems, and components" },
      { term: "QA", meaning: "Quality assurance" },
    ],
  },
  {
    number: "06",
    phase: "Safety basis",
    shortTitle: "Safety basis",
    title: "Advance the DOE safety basis without merging it with NRC licensing",
    evidence: "Confirmed public fact",
    summary: "Oklo reports DOE approval of a preliminary documented safety analysis. NRC records separate pre-application activity for a prospective commercial path.",
    physical: "Coordinate work against the applicable DOE project controls.",
    record: "Maintain safety-basis commitments and keep DOE and NRC evidence streams separate.",
    boundary: "A company-reported DOE PDSA milestone is not an NRC operating or construction license.",
    image: "/images/side-quests/aurora-inl/stage-06.webp",
    imageAlt: "Conceptual technical review workspace with controlled project evidence.",
    sources: [sources.pdsa, sources.nrc],
    acronyms: [
      { term: "PDSA", meaning: "Preliminary Documented Safety Analysis, a DOE safety-basis document" },
      { term: "NRC", meaning: "United States Nuclear Regulatory Commission" },
    ],
  },
  {
    number: "07",
    phase: "Design evidence",
    shortTitle: "Design",
    title: "Mature design and supply evidence in parallel",
    evidence: "Supported inference",
    summary: "INL publicly describes a 75 MWe liquid-sodium, metallic-fuel fast reactor. Detailed supplier packages and installation sequencing remain non-public.",
    physical: "Coordinate design release, procurement, supplier readiness, logistics, and field interfaces at the appropriate quality level.",
    record: "Control design commitments, supplier records, configuration interfaces, and qualification evidence.",
    boundary: "Technology class and contractor support are public. Component status and heavy-lift sequencing are not.",
    image: "/images/side-quests/aurora-inl/stage-07.webp",
    imageAlt: "Conceptual advanced-reactor equipment logistics and engineering coordination.",
    sources: [sources.inl, sources.groundbreaking],
    acronyms: [
      { term: "HALEU", meaning: "High-assay low-enriched uranium" },
      { term: "NDE", meaning: "Nondestructive examination" },
    ],
  },
  {
    number: "08",
    phase: "Fuel pathway",
    shortTitle: "A3F fuel",
    title: "Build the A3F fuel pathway in parallel",
    evidence: "Confirmed public fact",
    summary: "INL's A3F documentation describes an MFC-798 retrofit and intended full-core HALEU, uranium-zirconium fuel capability. It does not establish completed fuel or delivery readiness.",
    physical: "Advance facility and material-control capability as a parallel plant-development workstream.",
    record: "Establish facility readiness, material, and quality evidence without claiming a completed core.",
    boundary: "No public record here establishes fabrication completion, transport, core loading, or plant handling details.",
    image: "/images/side-quests/aurora-inl/stage-08.webp",
    imageAlt: "Conceptual fuel-facility work in a controlled industrial setting.",
    sources: [sources.a3f, sources.inl],
    acronyms: [
      { term: "A3F", meaning: "Aurora Fuel Fabrication Facility" },
      { term: "U-Zr", meaning: "Uranium-zirconium metallic fuel alloy" },
    ],
  },
  {
    number: "09",
    phase: "Nuclear island",
    shortTitle: "Nuclear island",
    title: "Preserve the public-record boundary around sodium systems",
    evidence: "Not publicly established",
    summary: "Aurora's liquid-sodium, metal-fueled fast-reactor context is public. Sodium-system assembly, configuration, and installation sequencing are not.",
    physical: "Do not infer a system arrangement, handling method, or construction sequence from public technology context.",
    record: "Identify the missing project-specific records that would be needed before asserting readiness.",
    boundary: "The blank space is intentional. Generic LWR milestones and EBR-II analogies cannot fill it.",
    image: "/images/side-quests/aurora-inl/stage-09.webp",
    imageAlt: "Conceptual protected equipment area at an advanced-reactor project.",
    sources: [sources.inl, sources.groundbreaking],
    acronyms: [
      { term: "LWR", meaning: "Light-water reactor" },
      { term: "EBR-II", meaning: "Experimental Breeder Reactor II, a historical fast-reactor reference" },
    ],
  },
  {
    number: "10",
    phase: "Plant interfaces",
    shortTitle: "Interfaces",
    title: "Integrate balance-of-plant interfaces without inventing the layout",
    evidence: "Supported inference",
    summary: "Later interface management is normal project logic, but the public record does not disclose the final plant layout or integration sequence.",
    physical: "Coordinate interfaces only when supported by controlled project records.",
    record: "Treat later turnover logic as an analytical model, not a disclosed Aurora-INL execution plan.",
    boundary: "No public source here establishes a final configuration or schedule.",
    image: "/images/side-quests/aurora-inl/stage-10.webp",
    imageAlt: "Conceptual balance-of-plant interface work at an energy facility.",
    sources: [sources.doeCx, sources.nrc],
    acronyms: [
      { term: "BOP", meaning: "Balance of plant, the supporting systems outside the reactor system" },
      { term: "SSC", meaning: "Structures, systems, and components" },
    ],
  },
  {
    number: "11",
    phase: "Readiness",
    shortTitle: "Readiness",
    title: "Close construction and readiness evidence before fuel movement",
    evidence: "Not publicly established",
    summary: "System completion, turnover, and fuel-movement conditions require path-specific evidence. The public sources do not disclose Aurora-INL's later readiness package.",
    physical: "Do not narrate detailed completion or fuel-movement activities as public project facts.",
    record: "Ask for scoped readiness, configuration, and authorization records before making claims about this stage.",
    boundary: "Generic acceptance logic is not a public Aurora-INL procedure.",
    image: "/images/side-quests/aurora-inl/stage-11.webp",
    imageAlt: "Conceptual completed industrial facility awaiting evidence review.",
    sources: [sources.nrc, sources.pdsa],
    acronyms: [
      { term: "ITAAC", meaning: "Inspections, tests, analyses, and acceptance criteria, an NRC Part 52 framework" },
      { term: "DOE", meaning: "United States Department of Energy" },
    ],
  },
  {
    number: "12",
    phase: "Authorization",
    shortTitle: "Startup",
    title: "Authorize fuel, startup, and operation on the applicable path",
    evidence: "Not publicly established",
    summary: "Fuel loading, criticality, power ascension, and routine operation require project-specific authorization. Current public records do not establish an Aurora-INL operating authorization.",
    physical: "Do not infer a startup sequence or operating date.",
    record: "Track the pathway-specific documents needed to support any later operational claim.",
    boundary: "DOE CX work and NRC pre-application activity are not operating authorization.",
    image: "/images/side-quests/aurora-inl/stage-12.webp",
    imageAlt: "Conceptual advanced-reactor facility ready for a future authorization decision.",
    sources: [sources.nrc, sources.doeCx],
    acronyms: [
      { term: "COL", meaning: "Combined license, an NRC Part 52 license type" },
      { term: "PDSA", meaning: "Preliminary Documented Safety Analysis" },
    ],
  },
];

const deckUrl = "https://docs.google.com/presentation/d/1hhIpVdlBl8QxthosrzojB8Abbb0R9znmUxWxpAD5FGk/edit";
const deckPdfUrl = "https://docs.google.com/presentation/d/1hhIpVdlBl8QxthosrzojB8Abbb0R9znmUxWxpAD5FGk/export/pdf";

export function AuroraDeploymentExperience() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isReelVisible, setIsReelVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const reelViewportRef = useRef<HTMLDivElement>(null);
  const reelHasBeenVisible = useRef(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const stage = stages[activeIndex];
  const isPlaying = !isPaused && !prefersReducedMotion && isReelVisible;
  const playbackState = prefersReducedMotion
    ? "Evidence reel / motion reduced"
    : isPlaying
      ? "Evidence reel / playing"
      : isReelVisible
        ? "Evidence reel / paused"
        : "Evidence reel / paused while offscreen";

  useEffect(() => {
    const syncFromHash = () => {
      const requested = window.location.hash.match(/stage-(\d{2})/)?.[1];
      const nextIndex = stages.findIndex((candidate) => candidate.number === requested);
      if (nextIndex >= 0) setActiveIndex(nextIndex);
    };

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotionPreference = () => setPrefersReducedMotion(mediaQuery.matches);

    syncMotionPreference();
    mediaQuery.addEventListener("change", syncMotionPreference);
    return () => mediaQuery.removeEventListener("change", syncMotionPreference);
  }, []);

  useEffect(() => {
    const target = reelViewportRef.current;

    if (!target || !("IntersectionObserver" in window)) {
      setIsReelVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting && entry.intersectionRatio >= 0.5;
        setIsReelVisible(isVisible);

        if (isVisible) {
          reelHasBeenVisible.current = true;
        } else if (reelHasBeenVisible.current) {
          setIsPaused(true);
        }
      },
      { threshold: [0, 0.5, 1] },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % stages.length);
    }, 7000);

    return () => window.clearInterval(interval);
  }, [isPlaying]);

  function selectStage(index: number) {
    const nextIndex = Math.max(0, Math.min(index, stages.length - 1));
    setIsPaused(true);
    setActiveIndex(nextIndex);
    window.history.replaceState(null, "", `#stage-${stages[nextIndex].number}`);
  }

  function pauseOnCurrentFrame() {
    setIsPaused(true);
  }

  function moveStage(direction: -1 | 1) {
    const nextIndex = (activeIndex + direction + stages.length) % stages.length;
    selectStage(nextIndex);
  }

  function togglePlayback() {
    if (prefersReducedMotion) return;
    setIsPaused((paused) => !paused);
  }

  function recordTouchStart(event: TouchEvent<HTMLButtonElement>) {
    const touch = event.touches[0];
    if (touch) touchStart.current = { x: touch.clientX, y: touch.clientY };
  }

  function moveOnSwipe(event: TouchEvent<HTMLButtonElement>) {
    const start = touchStart.current;
    const touch = event.changedTouches[0];
    touchStart.current = null;

    if (!start || !touch) return;

    const horizontalDistance = touch.clientX - start.x;
    const verticalDistance = touch.clientY - start.y;

    if (Math.abs(horizontalDistance) < 44 || Math.abs(horizontalDistance) <= Math.abs(verticalDistance)) return;

    if (horizontalDistance < 0) moveStage(1);
    else moveStage(-1);
  }

  return (
    <article className="aurora-page">
      <header className="aurora-intro">
        <p className="aurora-kicker">Side quest 01 / Nuclear energy</p>
        <h1>Aurora-INL deployment evidence</h1>
        <p className="aurora-lede">
          A public-source model of a reactor built twice: once on site, once in evidence.
        </p>
        <p className="aurora-disclaimer">
          Reviewed 14 July 2026. This is an independent analytical model, not an Oklo schedule, authorization statement, or proprietary design disclosure.
        </p>
      </header>

      <section className="aurora-stage" aria-labelledby="aurora-stage-title">
        <div ref={reelViewportRef} className="aurora-stage-media">
          <button
            type="button"
            className="aurora-image-wrap aurora-image-reel"
            onClick={pauseOnCurrentFrame}
            onTouchStart={recordTouchStart}
            onTouchEnd={moveOnSwipe}
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft") {
                event.preventDefault();
                moveStage(-1);
              }
              if (event.key === "ArrowRight") {
                event.preventDefault();
                moveStage(1);
              }
            }}
            aria-label={isPlaying
              ? `Reel playing frame ${stage.number}: ${stage.title}. Tap to pause, or swipe to change frames.`
              : `Reel paused on frame ${stage.number}: ${stage.title}. Tap to keep this frame selected, or swipe to change frames.`}
          >
            <img key={stage.number} src={stage.image} alt={stage.imageAlt} width="1200" height="760" />
            <div className="aurora-image-scrim" aria-hidden="true" />
            <p className="aurora-image-hint" aria-hidden="true">
              {prefersReducedMotion ? "Motion reduced" : isPlaying ? "Tap to pause · swipe frames" : "Paused · swipe frames"}
            </p>
          </button>

          <div key={stage.number} className="aurora-caption-rail">
            <div className="aurora-caption-meta">
              <p className={`aurora-caption-status ${stage.evidence === "Confirmed public fact" ? "fact" : stage.evidence === "Supported inference" ? "inference" : "unknown"}`}>
                {stage.evidence}
              </p>
              <p className="aurora-caption-frame">Frame {stage.number} / {stages.length}</p>
            </div>
            <p className="aurora-stage-phase">{stage.phase}</p>
            <h2 id="aurora-stage-title">{stage.title}</h2>
            <p className="aurora-caption-summary">{stage.summary}</p>
          </div>
        </div>

        <div className="aurora-stage-controls">
          <div className="aurora-stage-navigation" aria-label="Evidence-reel navigation">
            <button type="button" onClick={() => moveStage(-1)} aria-label="Previous evidence-reel frame">Previous</button>
            <p aria-live="polite"><span>Frame</span><strong>{stage.number} / {stages.length}</strong></p>
            <button type="button" onClick={() => moveStage(1)} aria-label="Next evidence-reel frame">Next</button>
          </div>

          <div className="aurora-progress" aria-hidden="true">
            {stages.map((candidate, index) => (
              <span className={index === activeIndex ? "is-current" : index < activeIndex ? "is-complete" : undefined} key={candidate.number} />
            ))}
          </div>

          <div className="aurora-controls-head">
            <p>{playbackState}</p>
            <button
              type="button"
              onClick={togglePlayback}
              disabled={prefersReducedMotion}
              aria-pressed={isPaused}
            >
              {isPlaying ? "Pause" : "Play"}
            </button>
          </div>

          <details className="aurora-frame-picker">
            <summary>Browse all frames</summary>
            <ol className="aurora-stage-list" aria-label="Select an Aurora-INL evidence-reel frame">
              {stages.map((candidate, index) => (
                <li key={candidate.number}>
                  <button
                    type="button"
                    onClick={() => selectStage(index)}
                    aria-current={index === activeIndex ? "step" : undefined}
                    aria-label={`Frame ${candidate.number}: ${candidate.title}. Selecting a frame pauses the reel.`}
                  >
                    <span>{candidate.number}</span>{candidate.shortTitle}
                  </button>
                </li>
              ))}
            </ol>
          </details>
        </div>
      </section>

      <section className="aurora-brief" aria-label={`Expert brief for stage ${stage.number}`}>
        <header>
          <p>Expert brief / {stage.number}</p>
          <span className={stage.evidence === "Confirmed public fact" ? "aurora-status fact" : stage.evidence === "Supported inference" ? "aurora-status inference" : "aurora-status unknown"}>{stage.evidence}</span>
        </header>
        <dl>
          <div>
            <dt>Physical work</dt>
            <dd>{stage.physical}</dd>
          </div>
          <div>
            <dt>Evidence work</dt>
            <dd>{stage.record}</dd>
          </div>
        </dl>
        <div className="aurora-boundary">
          <p>Public-record boundary</p>
          <strong>{stage.boundary}</strong>
        </div>

        <section className="aurora-vocabulary" aria-label="Working vocabulary">
          <p>Working vocabulary</p>
          {stage.acronyms.map((acronym) => (
            <details key={acronym.term}>
              <summary><span>{acronym.term}</span>{acronym.meaning}</summary>
            </details>
          ))}
        </section>

        <section className="aurora-sources" aria-label="Primary references">
          <p>Primary references</p>
          <ul>
            {stage.sources.map((source) => (
              <li key={source.href}><a href={source.href} target="_blank" rel="noreferrer">{source.label}<span aria-hidden="true"> ↗</span></a></li>
            ))}
          </ul>
        </section>

        <div className="aurora-deck-links">
          <a href={deckUrl} target="_blank" rel="noreferrer">Open technical deck <span aria-hidden="true">↗</span></a>
          <a href={deckPdfUrl} target="_blank" rel="noreferrer">Open current deck PDF <span aria-hidden="true">↗</span></a>
        </div>
      </section>

      <section className="aurora-method" aria-labelledby="aurora-method-title">
        <p>Method and limits</p>
        <h2 id="aurora-method-title">Public evidence is not a construction schedule.</h2>
        <p>
          The first five stages are bounded by public early-work records. DOE safety-basis work, NRC pre-application activity, and the A3F fuel pathway progress on different evidence streams. Later details are deliberately marked as inference or unknown.
        </p>
      </section>
    </article>
  );
}
