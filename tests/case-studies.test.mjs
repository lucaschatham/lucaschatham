import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import test from "node:test";

// Every case study under content/work/ tells the same story in the same order.
// iMerit drifted from 5 sections to 9 over roughly a dozen commits before anyone
// noticed, which is what these tests exist to catch.
const REQUIRED_SECTIONS = [
  "What Was Built",
  "My Role",
  "How We Measured Success",
  "Why It Mattered",
  "What This Proves",
];

const REQUIRED_FRONT_MATTER = [
  "title",
  "hero",
  "description",
  "date",
  "year",
  "published",
];

const workDir = fileURLToPath(new URL("../content/work", import.meta.url));

const caseStudies = readdirSync(workDir)
  .filter((name) => name.endsWith(".mdx"))
  .map((name) => ({
    name,
    source: readFileSync(`${workDir}/${name}`, "utf8"),
  }));

function splitFrontMatter(source) {
  const match = source.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  assert.ok(match, "expected YAML front matter delimited by ---");
  return { frontMatter: match[1], body: match[2] };
}

// Headings inside fenced code blocks are content, not structure.
function sectionHeadings(body) {
  const headings = [];
  let inFence = false;

  for (const line of body.split("\n")) {
    if (line.startsWith("```")) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    if (line.startsWith("## ")) headings.push(line.slice(3).trim());
  }

  return headings;
}

test("case studies exist to check", () => {
  assert.ok(caseStudies.length > 0, "no .mdx files found in content/work");
});

for (const { name, source } of caseStudies) {
  test(`${name} uses the canonical section template`, () => {
    const { body } = splitFrontMatter(source);
    assert.deepEqual(
      sectionHeadings(body),
      REQUIRED_SECTIONS,
      "case study sections must match the template exactly, in order, with no extras"
    );
  });

  test(`${name} has complete front matter`, () => {
    const { frontMatter } = splitFrontMatter(source);
    for (const field of REQUIRED_FRONT_MATTER) {
      assert.match(
        frontMatter,
        new RegExp(`^${field}:\\s*\\S`, "m"),
        `missing or empty front matter field: ${field}`
      );
    }
  });

  test(`${name} has content under every section`, () => {
    const { body } = splitFrontMatter(source);
    const sections = body.split(/^## .*$/m).slice(1);

    sections.forEach((section, index) => {
      assert.ok(
        section.trim().length > 0,
        `section "${REQUIRED_SECTIONS[index]}" is empty`
      );
    });
  });
}
