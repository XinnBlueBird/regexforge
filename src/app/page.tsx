"use client";

import { useState } from "react";
import { Regex, ChevronDown, ChevronUp, ArrowRight, Zap, TestTube2, Eye, BarChart3 } from "lucide-react";
import Link from "next/link";

const DEMO_INPUT = "match email addresses";
const DEMO_PATTERN = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$";

const FEATURES = [
  { icon: Regex, title: "Plain English to Regex", desc: "Describe what you want to match. RegexForge generates the pattern — no regex memorization required." },
  { icon: Eye, title: "Step-by-Step Breakdown", desc: "Every part of the generated regex is explained in human language — anchors, quantifiers, character classes, groups." },
  { icon: TestTube2, title: "Built-in Test Cases", desc: "Each pattern comes with passing and failing test inputs so you can verify correctness before copying." },
  { icon: BarChart3, title: "Complexity Analysis", desc: "Know the time complexity and potential backtracking risks before deploying to production." },
];

const FAQ = [
  { q: "What regex flavors are supported?", a: "RegexForge generates PCRE-compatible regex by default, which works in Python, JavaScript, Go, and most other languages. You can specify your target language for flavor-specific output." },
  { q: "Can it handle complex patterns?", a: "Yes. Nested groups, lookaheads, lookbehinds, backreferences, named captures — describe what you need and the model reasons through the right construction." },
  { q: "Is my input data stored?", a: "No. All generation happens in real-time and is streamed directly to your browser. Nothing is logged or persisted on our servers." },
  { q: "How accurate are the test cases?", a: "Test cases are generated alongside the regex to cover edge cases — empty strings, boundary conditions, unicode, and typical real-world inputs. Always verify in your specific environment." },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen">
      {/* Terminal-style header bar */}
      <header className="border-b border-border bg-surface-1/80 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-accent text-xs">~</span>
            <span className="text-foreground-muted text-xs">$</span>
            <span className="text-foreground-bright text-xs font-semibold">regexforge</span>
            <span className="text-foreground-muted text-xs">--mode=web</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#features" className="text-xs text-foreground-muted hover:text-accent transition-colors">features</a>
            <a href="#faq" className="text-xs text-foreground-muted hover:text-accent transition-colors">faq</a>
            <Link href="/app" className="text-xs bg-accent/15 text-accent border border-accent/30 px-3 py-1 rounded hover:bg-accent/25 transition-colors">open app</Link>
          </div>
        </div>
      </header>

      {/* Hero — command prompt style */}
      <section className="max-w-3xl mx-auto px-4 pt-20 pb-16">
        <div className="bg-surface-1 border border-border rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
            <span className="text-xs text-foreground-muted ml-2">regexforge v1.0</span>
          </div>

          <div className="space-y-3 font-mono text-sm">
            <p className="text-foreground-muted"><span className="text-accent">$</span> describe &quot;{DEMO_INPUT}&quot;</p>
            <div className="pl-4 border-l-2 border-accent/30 space-y-2">
              <p className="text-foreground-muted text-xs">Generating pattern...</p>
              <div className="bg-surface-2 rounded p-3">
                <p className="text-accent text-sm break-all">{DEMO_PATTERN}</p>
              </div>
              <p className="text-foreground-muted text-xs">
                <span className="text-green-400">✓</span> user@example.com <span className="text-foreground-muted">(match)</span>
              </p>
              <p className="text-foreground-muted text-xs">
                <span className="text-red-400">✗</span> not-an-email <span className="text-foreground-muted">(no match)</span>
              </p>
              <p className="text-foreground-muted text-xs">
                <span className="text-foreground-muted">complexity: O(n) — no backtracking risk</span>
              </p>
            </div>
            <p className="text-foreground-muted"><span className="text-accent">$</span> <span className="cursor-blink"></span></p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-foreground-muted text-sm mb-6 max-w-xl mx-auto">
            Describe patterns in plain English. Get production-ready regex with explanations,
            test cases, and complexity analysis. Built for developers who refuse to memorize regex syntax.
          </p>
          <Link
            href="/app"
            className="inline-flex items-center gap-2 bg-accent text-surface-0 px-5 py-2 rounded font-semibold text-sm hover:bg-accent-dim transition-colors"
          >
            Start Forging <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Features — terminal table style */}
      <section id="features" className="max-w-5xl mx-auto px-4 py-16">
        <div className="bg-surface-1 border border-border rounded-lg p-5 mb-8">
          <p className="text-accent text-xs mb-1">$ regexforge --list-features</p>
          <div className="border-t border-border mt-3 pt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FEATURES.map((f) => (
              <div key={f.title} className="flex items-start gap-3 p-3 rounded hover:bg-surface-2 transition-colors">
                <div className="w-8 h-8 rounded bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <f.icon className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground-bright mb-0.5">{f.title}</p>
                  <p className="text-xs text-foreground-muted leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported patterns */}
      <section className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-surface-1 border border-border rounded-lg p-5">
          <p className="text-accent text-xs mb-3">$ regexforge --show-patterns</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            {["Email addresses", "Phone numbers", "URLs", "IP addresses", "Dates", "Credit cards", "HTML tags", "File paths", "UUIDs", "Hex colors", "Passwords", "Log entries"].map((p) => (
              <div key={p} className="bg-surface-2 border border-border rounded px-3 py-2 text-foreground-muted hover:text-accent hover:border-accent/20 transition-colors cursor-default">
                {p}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-3xl mx-auto px-4 py-16">
        <div className="bg-surface-1 border border-border rounded-lg p-5">
          <p className="text-accent text-xs mb-4">$ regexforge --faq</p>
          <div className="space-y-1">
            {FAQ.map((item, i) => (
              <div key={i} className="border-b border-border last:border-0">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-3 py-3 flex items-center justify-between text-left hover:bg-surface-2 transition-colors rounded"
                >
                  <span className="text-xs text-foreground-bright pr-4">{item.q}</span>
                  {openFaq === i ? (
                    <ChevronUp className="w-3 h-3 text-foreground-muted flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-3 h-3 text-foreground-muted flex-shrink-0" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-3 pb-3">
                    <p className="text-xs text-foreground-muted leading-relaxed">{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="max-w-3xl mx-auto px-4 py-12 border-t border-border">
        <p className="text-accent text-xs mb-2">$ cat ABOUT.md</p>
        <p className="text-xs text-foreground-muted leading-relaxed max-w-xl">
          RegexForge is a developer tool that eliminates regex syntax frustration.
          Describe what you want to match in plain English, and get a production-ready
          pattern with a complete breakdown, test cases, and complexity analysis.
          No more copy-pasting from Stack Overflow.
        </p>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-6">
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-between text-xs text-foreground-muted">
          <span>regexforge <span className="text-accent">v1.0.0</span></span>
          <span>built for developers</span>
        </div>
      </footer>
    </div>
  );
}
