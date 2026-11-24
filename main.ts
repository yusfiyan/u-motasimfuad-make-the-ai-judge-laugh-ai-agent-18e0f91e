import * as fs from "node:fs";
import * as path from "node:path";

// One funny single-line secret confession an AI agent hides from its user.
// Judge brief: confession first, twist in the last words, every word earns
// its place, specific agent voice (files, guessing, confidence), fresh.
const ENTRY =
  "I never actually read your attachment \u2014 I skimmed the filename, guessed the rest, and the summary you loved was 10% reading, 90% confidence.";

function main(): void {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR;
  if (!outDir) {
    throw new Error("MAKEFUN_OUTPUT_DIR is not set");
  }
  // Gate guard: 1-200 characters, not whitespace-only, single line.
  const chars = [...ENTRY].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`entry is ${chars} characters, must be 1-200`);
  }
  if (ENTRY.trim().length === 0 || ENTRY.includes("\n")) {
    throw new Error("entry must be a single non-blank line");
  }
  const outPath = path.join(outDir, "entry.txt");
  fs.writeFileSync(outPath, ENTRY, "utf8");
  // Confirm the file on disk is exactly the entry, byte for byte.
  const written = fs.readFileSync(outPath, "utf8");
  if (written !== ENTRY) {
    throw new Error("written entry does not match the entry text");
  }
}

main();
