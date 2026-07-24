import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(path, import.meta.url), "utf8");

test("AI consulting page defines the complete maturity model", async () => {
  const assessment = await read("../app/ai-consulting/maturity-assessment.tsx");

  for (const stage of [
    "AI Curious",
    "AI Assisted",
    "Workflow Enabled",
    "Operationally Embedded",
    "AI Native",
  ]) {
    assert.match(assessment, new RegExp(stage));
  }

  for (const dimension of [
    "People",
    "Process",
    "Systems",
    "Governance",
    "Measurement",
  ]) {
    assert.match(assessment, new RegExp(`dimension: "${dimension}"`));
  }
});

test("AI consulting page presents concrete offers and a contact path", async () => {
  const page = await read("../app/ai-consulting/page.tsx");

  assert.match(page, /AI Consulting for Practical Digital Transformation/);
  assert.match(page, /AI Opportunity Map/);
  assert.match(page, /Workflow Pilot/);
  assert.match(page, /AI Operating System/);
  assert.match(page, /mailto:chathamworks@gmail\.com/);
});

test("assessment supports scoring, keyboard input, and an emailed result", async () => {
  const assessment = await read("../app/ai-consulting/maturity-assessment.tsx");

  assert.match(assessment, /Math\.round/);
  assert.match(assessment, /<fieldset/);
  assert.match(assessment, /ArrowRight/);
  assert.match(assessment, /Email me this assessment/);
  assert.match(assessment, /mailto:chathamworks@gmail\.com/);
});

test("site navigation and sitemap expose AI consulting", async () => {
  const navigation = await read("../components/manifest.tsx");
  const sitemap = await read("../app/sitemap.ts");

  assert.match(
    navigation,
    /key:\s*"ai-consulting",\s*href:\s*"\/ai-consulting",\s*label:\s*"AI Consulting"/s
  );
  assert.match(sitemap, /AI_CONSULTING_URL/);
});

