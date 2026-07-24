import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(path, import.meta.url), "utf8");

test("AI consulting page defines a four-stage maturity framework", async () => {
  const framework = await read("../app/ai-consulting/maturity-framework.tsx");

  for (const stage of [
    "Individuals use AI",
    "Teams use AI",
    "AI runs automations",
    "Business runs on AI",
  ]) {
    assert.match(framework, new RegExp(stage));
  }

  assert.equal((framework.match(/number:/g) ?? []).length, 4);
  assert.match(framework, /AI runs automations that help people/);
  assert.match(framework, /adapts in real time/);
});

test("AI consulting page presents one flagship offer and a contact path", async () => {
  const page = await read("../app/ai-consulting/page.tsx");

  assert.match(page, /AI Consulting for Practical Digital Transformation/);
  assert.match(page, /Turn one expensive workflow into a measurable AI system/);
  assert.match(page, /Workflow Pilot/);
  assert.doesNotMatch(page, /AI Opportunity Map/);
  assert.doesNotMatch(page, /AI Operating System/);
  assert.match(page, /Book a 20-minute workflow triage/);
  assert.match(page, /mailto:chathamworks@gmail\.com/);
});

test("maturity framework lets visitors inspect each stage", async () => {
  const framework = await read("../app/ai-consulting/maturity-framework.tsx");
  const page = await read("../app/ai-consulting/page.tsx");

  assert.match(framework, /"use client"/);
  assert.doesNotMatch(framework, /<fieldset/);
  assert.match(framework, /<button/);
  assert.match(framework, /aria-pressed/);
  assert.match(framework, /setSelectedStage/);
  assert.match(framework, /What work looks like/);
  assert.match(framework, /What blocks growth/);
  assert.match(framework, /Next move/);
  assert.match(page, /Find your stage/);
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
