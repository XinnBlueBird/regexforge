import { NextRequest, NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";

export const runtime = "nodejs";

function getApiKey(): string {
  if (process.env.MIMO_API_KEY) return process.env.MIMO_API_KEY;
  try {
    const raw = readFileSync(join(process.env.HOME || "/root", ".agent/credentials/mimo.env"), "utf-8").trim();
    const match = raw.match(/MIMO_API_KEY=(.+)/);
    return match ? match[1] : raw;
  } catch {
    throw new Error("API key not configured");
  }
}

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Description is required" }, { status: 400 });
    }

    const apiKey = getApiKey();

    const systemPrompt = "You are RegexForge, an expert regex pattern generator. Given a plain-English description of a pattern to match, generate a production-ready regular expression.\n\n" +
      "Respond with valid JSON:\n" +
      "{\n" +
      '  "pattern": "the regex pattern (without delimiters or flags)",\n' +
      '  "flags": "g, gm, gi, etc.",\n' +
      '  "explanation": [{"part": "first regex token", "meaning": "human explanation"}],\n' +
      '  "testCases": [{"input": "test string", "match": true/false, "explanation": "why"}],\n' +
      '  "complexity": "O(n) description",\n' +
      '  "warnings": ["any backtracking or edge case warnings"]\n' +
      "}\n\n" +
      "Rules:\n" +
      "- Generate the most accurate regex possible\n" +
      "- Provide 4-6 test cases covering match, no-match, and edge cases\n" +
      "- Break down EVERY part of the regex in explanation (character classes, quantifiers, anchors, groups)\n" +
      "- Flag any potential backtracking risks or catastrophic complexity\n" +
      "- Use PCRE-compatible syntax\n" +
      "- Keep the regex as simple as possible while being correct";

    const response = await fetch("https://token-plan-sgp.xiaomimimo.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "api-key": apiKey },
      body: JSON.stringify({
        model: "mimo-v2.5-pro",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: prompt },
        ],
        temperature: 0.2,
        max_tokens: 1500,
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Generation service error" }, { status: 502 });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";

    try {
      return NextResponse.json(JSON.parse(content));
    } catch {
      // Fallback: return raw
      return NextResponse.json({
        pattern: content.match(/`([^`]+)`/)?.[1] || content.split("\n")[0],
        flags: "gm",
        explanation: [{ part: "raw", meaning: content }],
        testCases: [],
        complexity: "Unknown",
        warnings: ["Could not parse structured response. Review pattern manually."],
      });
    }
  } catch (err) {
    console.error("Generate error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
