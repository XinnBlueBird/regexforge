<div align="center">

# RegexForge

**Describe it. Forge it.**

Describe patterns in plain English. Get production-ready regex with
explanations, test cases, and complexity analysis.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square&logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

</div>

---

## What is RegexForge?

RegexForge is a developer tool that turns plain-English descriptions into
production-ready regular expressions. Instead of memorizing character classes,
quantifiers, and lookahead syntax, describe what you want to match and let
the AI handle the construction.

Every generated pattern comes with a **step-by-step breakdown** explaining
each token, **test cases** covering matches and edge cases, **complexity
analysis** for performance awareness, and **backtracking warnings** when
applicable.

## Why RegexForge?

Regex is powerful but notoriously hard to write and debug. Existing tools
either require you to already know regex syntax (regex101) or generate
patterns without explanation (AI chat). RegexForge combines generation,
explanation, testing, and analysis in a single focused interface designed
for developers who want to learn while they build.

## Features

### Plain English to Regex
Describe your pattern in natural language. Handle complex requirements like
"match email addresses but exclude .test domains" or "find ISO dates
optionally followed by a timezone offset."

### Step-by-Step Breakdown
Every part of the generated regex is annotated — character classes, anchors,
quantifiers, groups, lookaheads, and lookbehinds are all explained in human
language. You learn regex while using it.

### Built-in Test Cases
Each pattern includes 4-6 test inputs with expected match/no-match results.
Covers normal cases, edge cases, empty strings, and unicode inputs.

### Complexity Analysis
Know the time complexity before deploying. RegexForge flags potential
catastrophic backtracking risks and suggests safer alternatives.

### Copy-Ready Code
One click copies the pattern as a JavaScript regex literal or the raw pattern
string. Flags are included.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (`@theme inline`) |
| Icons | Lucide React |
| AI Model | Server-side via `/api/generate` |
| Deployment | Vercel |

## Getting Started

### Prerequisites
- Node.js 18+

### Installation

```bash
git clone https://github.com/XinnBlueBird/regexforge.git
cd regexforge
npm install
cp .env.example .env.local
# Edit .env.local with your API key
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `MIMO_API_KEY` | Yes | AI model API key |

## Project Structure

```
regexforge/
├── src/
│   ├── app/
│   │   ├── globals.css          # Tailwind v4 terminal theme (green-on-black)
│   │   ├── layout.tsx           # Root layout (JetBrains Mono primary)
│   │   ├── page.tsx             # Landing — terminal IDE aesthetic, command prompt hero
│   │   ├── api/
│   │   │   └── generate/
│   │   │       └── route.ts     # Server-side regex generation endpoint
│   │   └── app/
│   │       └── page.tsx         # Tool — pattern output, breakdown, test cases
├── .env.example
├── README.md
└── package.json
```

## How It Works

```
User describes pattern (English)
        │
        ▼
POST /api/generate ────────────────────────────┐
│  1. Read API key from process.env            │
│  2. Build system prompt requesting JSON      │
│  3. Send to AI model (temperature 0.2)       │
│  4. Parse into RegexResult:                  │
│     pattern, flags, explanation[],            │
│     testCases[], complexity, warnings[]       │
│  5. Return typed JSON to client              │
└──────────────────────────────────────────────┘
        │
        ▼
Client renders:
  - Pattern in code block with copy buttons
  - Token-by-token breakdown table
  - Test cases with match/no-match indicators
  - Complexity analysis with warnings
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT — see [LICENSE](LICENSE) for details.

---

<div align="center">

Built for developers who refuse to memorize regex syntax

</div>
