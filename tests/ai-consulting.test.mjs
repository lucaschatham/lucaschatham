import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(path, import.meta.url), "utf8");

test("AI consulting page defines a four-stage maturity framework", async () => {
  const framework = await read("../app/ai-consulting/maturity-framework.tsx");

  for (const stage of [
    "Experimenting",
    "Standardizing",
    "Operationalizing",
    "Transforming",
  ]) {
    assert.match(framework, new RegExp(stage));
  }

  assert.equal((framework.match(/number:/g) ?? []).length, 4);
  assert.match(framework, /Some of us use ChatGPT sometimes/);
  assert.match(framework, /AI changes how the business operates and competes/);
});

test("AI consulting page presents concrete offers and a contact path", async () => {
  const page = await read("../app/ai-consulting/page.tsx");

  assert.match(page, /AI Consulting for Practical Digital Transformation/);
  assert.match(page, /AI Opportunity Map/);
  assert.match(page, /Workflow Pilot/);
  assert.match(page, /AI Operating System/);
  assert.match(page, /mailto:chathamworks@gmail\.com/);
});

test("maturity framework is an immediately visible static visual", async () => {
  const framework = await read("../app/ai-consulting/maturity-framework.tsx");
  const page = await read("../app/ai-consulting/page.tsx");

  assert.doesNotMatch(framework, /"use client"/);
  assert.doesNotMatch(framework, /<fieldset/);
  assert.doesNotMatch(framework, /<button/);
  assert.match(framework, /You are here if/);
  assert.match(framework, /Next move/);
  assert.match(page, /See where you are/);
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
