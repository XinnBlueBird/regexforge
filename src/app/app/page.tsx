"use client";

import { useState, useRef } from "react";
import { ArrowUp, Copy, Check, Loader2, RotateCcw, TestTube2, Eye, BarChart3, AlertTriangle } from "lucide-react";
import Link from "next/link";

interface TestCase {
  input: string;
  match: boolean;
  explanation: string;
}

interface RegexResult {
  pattern: string;
  flags: string;
  explanation: { part: string; meaning: string }[];
  testCases: TestCase[];
  complexity: string;
  warnings?: string[];
}

export default function AppPage() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RegexResult | null>(null);
  const [error, setError] = useState("");
  const [copiedPattern, setCopiedPattern] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const generate = async () => {
    if (!prompt.trim() || loading) return;
    setLoading(true);
    setResult(null);
    setError("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Generation failed");
      setResult(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const copyPattern = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.pattern);
    setCopiedPattern(true);
    setTimeout(() => setCopiedPattern(false), 2000);
  };

  const copyCode = () => {
    if (!result) return;
    const code = `const regex = /${result.pattern}/${result.flags};`;
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); generate(); }
  };

  const reset = () => { setPrompt(""); setResult(null); setError(""); textareaRef.current?.focus(); };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar */}
      <header className="border-b border-border bg-surface-1/80 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-10 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-accent text-xs">~</span>
            <span className="text-foreground-muted text-xs">$</span>
            <span className="text-foreground-bright text-xs font-semibold">regexforge</span>
          </Link>
          {result && (
            <button onClick={reset} className="text-xs text-foreground-muted hover:text-accent transition-colors flex items-center gap-1">
              <RotateCcw className="w-3 h-3" /> new pattern
            </button>
          )}
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 flex flex-col max-w-3xl mx-auto w-full px-4 py-6">
        {/* Empty state */}
        {!result && !loading && !error && (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <div className="w-14 h-14 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center mb-5">
              <TestTube2 className="w-7 h-7 text-accent" />
            </div>
            <h2 className="text-sm text-foreground-bright mb-1 font-semibold">Describe your pattern</h2>
            <p className="text-xs text-foreground-muted max-w-md mb-6">
              Tell RegexForge what you want to match. Be specific — the more context, the better the pattern.
            </p>
            <div className="flex flex-wrap gap-2 justify-center max-w-lg">
              {["Match valid email addresses", "Extract URLs from text", "Find phone numbers in US format", "Validate strong passwords (8+ chars, mixed case, numbers, symbols)", "Match ISO 8601 dates"].map((ex) => (
                <button
                  key={ex}
                  onClick={() => setPrompt(ex)}
                  className="text-xs text-foreground-muted bg-surface-2 border border-border rounded px-3 py-1.5 hover:border-accent/30 hover:text-accent transition-colors"
                >
                  {ex}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <Loader2 className="w-6 h-6 text-accent animate-spin mx-auto mb-2" />
              <p className="text-xs text-foreground-muted">Forging pattern...</p>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-5 text-center max-w-md">
              <AlertTriangle className="w-6 h-6 text-red-400 mx-auto mb-2" />
              <p className="text-xs text-red-400 mb-3">{error}</p>
              <button onClick={reset} className="text-xs text-foreground-muted hover:text-foreground transition-colors">retry</button>
            </div>
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="space-y-4">
            {/* Pattern output */}
            <div className="bg-surface-1 border border-border rounded-lg">
              <div className="flex items-center justify-between px-4 py-2 border-b border-border">
                <div className="flex items-center gap-2">
                  <span className="text-accent text-xs">$</span>
                  <span className="text-xs text-foreground-muted">pattern</span>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={copyCode} className="text-xs text-foreground-muted hover:text-accent transition-colors flex items-center gap-1 bg-surface-3 px-2 py-0.5 rounded">
                    {copiedCode ? <Check className="w-3 h-3 text-accent" /> : <Copy className="w-3 h-3" />}
                    {copiedCode ? "copied" : "code"}
                  </button>
                  <button onClick={copyPattern} className="text-xs text-foreground-muted hover:text-accent transition-colors flex items-center gap-1 bg-surface-3 px-2 py-0.5 rounded">
                    {copiedPattern ? <Check className="w-3 h-3 text-accent" /> : <Copy className="w-3 h-3" />}
                    {copiedPattern ? "copied" : "copy"}
                  </button>
                </div>
              </div>
              <div className="p-4">
                <pre className="text-accent text-sm break-all whitespace-pre-wrap">/{result.pattern}/{result.flags}</pre>
              </div>
            </div>

            {/* Explanation — terminal style */}
            <div className="bg-surface-1 border border-border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Eye className="w-3.5 h-3.5 text-accent" />
                <span className="text-xs font-semibold text-foreground-bright">Breakdown</span>
              </div>
              <div className="space-y-1.5">
                {result.explanation.map((e, i) => (
                  <div key={i} className="flex items-start gap-3 text-xs">
                    <code className="text-accent bg-accent/10 px-1.5 py-0.5 rounded flex-shrink-0 min-w-[80px] text-center">{e.part}</code>
                    <span className="text-foreground-muted">{e.meaning}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Test cases — match/no-match terminal style */}
            <div className="bg-surface-1 border border-border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <TestTube2 className="w-3.5 h-3.5 text-accent" />
                <span className="text-xs font-semibold text-foreground-bright">Test Cases</span>
              </div>
              <div className="space-y-1.5">
                {result.testCases.map((tc, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs">
                    <span className={tc.match ? "text-green-400 flex-shrink-0" : "text-red-400 flex-shrink-0"}>
                      {tc.match ? "✓" : "✗"}
                    </span>
                    <code className={tc.match ? "match-hl" : "nomatch-hl"}>{tc.input}</code>
                    <span className="text-foreground-muted ml-1">— {tc.explanation}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Complexity + Warnings */}
            <div className="bg-surface-1 border border-border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="w-3.5 h-3.5 text-accent" />
                <span className="text-xs font-semibold text-foreground-bright">Complexity</span>
              </div>
              <p className="text-xs text-foreground-muted">{result.complexity}</p>
              {result.warnings && result.warnings.length > 0 && (
                <div className="mt-2 space-y-1">
                  {result.warnings.map((w, i) => (
                    <p key={i} className="text-xs text-yellow-400 flex items-start gap-1.5">
                      <AlertTriangle className="w-3 h-3 flex-shrink-0 mt-0.5" /> {w}
                    </p>
                  ))}
                </div>
              )}
            </div>

            {/* New pattern button */}
            <button onClick={reset} className="w-full bg-surface-2 hover:bg-surface-3 border border-border rounded-lg py-2.5 text-xs text-foreground-muted hover:text-foreground transition-colors flex items-center justify-center gap-1.5">
              <RotateCcw className="w-3.5 h-3.5" /> forge new pattern
            </button>
          </div>
        )}
      </div>

      {/* Input bar */}
      <div className="sticky bottom-0 bg-surface-0/90 border-t border-border">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 bg-surface-1 border border-border rounded-lg px-3 py-2.5 focus-within:border-accent/40 transition-colors">
            <span className="text-accent text-xs flex-shrink-0">$</span>
            <textarea
              ref={textareaRef}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder='describe "match email addresses"'
              rows={1}
              className="flex-1 bg-transparent text-xs text-foreground placeholder:text-foreground-muted/40 outline-none resize-none max-h-24"
              style={{ fieldSizing: "content" } as React.CSSProperties}
            />
            <button
              onClick={generate}
              disabled={!prompt.trim() || loading}
              className="flex-shrink-0 w-7 h-7 rounded bg-accent hover:bg-accent-dim disabled:bg-surface-3 disabled:text-foreground-muted flex items-center justify-center transition-colors"
            >
              {loading ? <Loader2 className="w-3.5 h-3.5 text-surface-0 animate-spin" /> : <ArrowUp className="w-3.5 h-3.5 text-surface-0" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
