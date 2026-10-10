import React from 'react';

interface HeroSectionProps {
  onGoToWorkbench: () => void;
  onGoToScorecard: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onGoToWorkbench,
  onGoToScorecard
}) => {
  return (
    <section className="relative w-full px-4 sm:px-8 py-10 sm:py-16 overflow-hidden bg-surface">
      {/* Ambient subtle background glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[340px] bg-gradient-to-b from-blue-500/15 via-blue-400/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Precision Model Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-surface-container border border-slate-border mb-6 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-status-pass animate-pulse"></span>
          <span className="font-label-caps text-label-caps text-on-surface uppercase tracking-wider">
            AI-Powered ATS Diagnostic Engine · v3.8 Precision Model
          </span>
        </div>

        {/* Hero Headline & Value Proposition */}
        <h1 className="font-display-hero text-on-surface max-w-4xl tracking-tight leading-tight mb-4">
          Benchmark Your Resume Against Any Job in Seconds
        </h1>

        <p className="font-body-lg text-slate-body max-w-3xl leading-relaxed mb-8">
          Transform unstructured resume text into quantified competency metrics, ATS compatibility scores, and prioritized bullet-by-bullet revisions aligned to elite corporate benchmarks.
        </p>

        {/* Primary Action Row */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
          <button
            onClick={onGoToWorkbench}
            className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-blue-700 text-on-primary font-label-lg text-label-lg px-6 py-3 rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer transform hover:-translate-y-0.5"
          >
            <span className="material-symbols-outlined text-[20px]">rocket_launch</span>
            <span>Launch Workbench &amp; Score Resume</span>
          </button>

          <button
            onClick={onGoToScorecard}
            className="inline-flex items-center justify-center gap-2 bg-surface-container-lowest hover:bg-surface-container-low text-on-surface border border-slate-border font-label-lg text-label-lg px-6 py-3 rounded-xl transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px] text-primary">analytics</span>
            <span>Explore Sample Scorecard</span>
          </button>
        </div>

        {/* Telemetry Strip */}
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-border">
          <div className="flex items-center justify-center gap-3 p-3 rounded-lg bg-surface-container-lowest border border-slate-border">
            <span className="material-symbols-outlined text-status-pass text-[24px]">verified</span>
            <div className="text-left">
              <span className="block font-headline-sm text-headline-sm text-on-surface">94.2%</span>
              <span className="block font-body-sm text-body-sm text-slate-body">
                ATS Pass Rate Post-Optimization
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 p-3 rounded-lg bg-surface-container-lowest border border-slate-border">
            <span className="material-symbols-outlined text-primary text-[24px]">radar</span>
            <div className="text-left">
              <span className="block font-headline-sm text-headline-sm text-on-surface">5-Axis</span>
              <span className="block font-body-sm text-body-sm text-slate-body">
                Holistic Competency Radar
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 p-3 rounded-lg bg-surface-container-lowest border border-slate-border">
            <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-[24px]">speed</span>
            <div className="text-left">
              <span className="block font-headline-sm text-headline-sm text-on-surface">&lt; 3.2s</span>
              <span className="block font-body-sm text-body-sm text-slate-body">
                Semantic Evaluation Latency
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Capabilities Showcase Bento Grid */}
      <div className="max-w-7xl mx-auto mt-14 pt-6">
        <div className="text-center mb-8">
          <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest block mb-1">
            Architectural Capabilities
          </span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">
            Precision Diagnostic Infrastructure
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Bento 1 */}
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-slate-border hover:border-slate-muted transition-all flex flex-col justify-between shadow-sm">
            <div>
              <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary mb-4">
                <span className="material-symbols-outlined">table_view</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">
                ATS Format &amp; Parsing Audit
              </h3>
              <p className="font-body-sm text-body-sm text-slate-body mb-4">
                Simulates parsing algorithms from Workday, Greenhouse, Taleo, and Lever.
              </p>
            </div>
            <ul className="space-y-1.5 font-body-sm text-body-sm text-slate-label">
              <li className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-status-pass">check_circle</span>
                Multi-column parsing safe
              </li>
              <li className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-status-pass">check_circle</span>
                Tabular formatting check
              </li>
              <li className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-status-pass">check_circle</span>
                Glyph &amp; font safety tests
              </li>
            </ul>
          </div>

          {/* Bento 2 */}
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-slate-border hover:border-slate-muted transition-all flex flex-col justify-between shadow-sm">
            <div>
              <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary mb-4">
                <span className="material-symbols-outlined">hub</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">
                Competency Mapping
              </h3>
              <p className="font-body-sm text-body-sm text-slate-body mb-4">
                Dynamic semantic alignment against live market job descriptions.
              </p>
            </div>
            <ul className="space-y-1.5 font-body-sm text-body-sm text-slate-label">
              <li className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-status-pass">check_circle</span>
                Senior Full-Stack profiles
              </li>
              <li className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-status-pass">check_circle</span>
                Product Management (B2B)
              </li>
              <li className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-status-pass">check_circle</span>
                AI / Data Science tracks
              </li>
            </ul>
          </div>

          {/* Bento 3 */}
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-slate-border hover:border-slate-muted transition-all flex flex-col justify-between shadow-sm">
            <div>
              <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary mb-4">
                <span className="material-symbols-outlined">trending_up</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">
                Impact &amp; STAR Density
              </h3>
              <p className="font-body-sm text-body-sm text-slate-body mb-4">
                Measures percentage of achievements supported by hard statistical proofs.
              </p>
            </div>
            <ul className="space-y-1.5 font-body-sm text-body-sm text-slate-label">
              <li className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-status-pass">check_circle</span>
                Revenue &amp; ARR validation
              </li>
              <li className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-status-pass">check_circle</span>
                Latency &amp; SLA quantification
              </li>
              <li className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-status-pass">check_circle</span>
                Headcount leadership scope
              </li>
            </ul>
          </div>

          {/* Bento 4 */}
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-slate-border hover:border-slate-muted transition-all flex flex-col justify-between shadow-sm">
            <div>
              <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary mb-4">
                <span className="material-symbols-outlined">edit_note</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">
                Actionable Rewrites
              </h3>
              <p className="font-body-sm text-body-sm text-slate-body mb-4">
                Instant side-by-side Before/After recommendations calibrated to senior rubrics.
              </p>
            </div>
            <ul className="space-y-1.5 font-body-sm text-body-sm text-slate-label">
              <li className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-status-pass">check_circle</span>
                Executive verb enhancement
              </li>
              <li className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-status-pass">check_circle</span>
                Contextual metric insertion
              </li>
              <li className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-status-pass">check_circle</span>
                One-click clipboard export
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
