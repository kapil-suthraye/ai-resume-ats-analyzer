import React from 'react';

export const MethodologySection: React.FC = () => {
  return (
    <section className="w-full px-4 sm:px-8 py-12 bg-surface-container-low border-t border-slate-border" id="methodology-section">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest block mb-1">
            Algorithmic Transparency
          </span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-3">
            How Resume Scorer Audits &amp; Evaluates Resumes
          </h2>
          <p className="font-body-md text-body-md text-slate-body">
            Our multi-stage diagnostic engine combines natural language processing, HRIS parsing emulation, and empirical hiring rubrics from Fortune 500 tech companies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {/* Axis 1 */}
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-slate-border shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary mb-3">
                <span className="material-symbols-outlined">data_object</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">
                1. Technical Match (30% Weight)
              </h3>
              <p className="font-body-sm text-body-sm text-slate-body mb-3">
                Uses contextual entity recognition to separate core technologies from fleeting mentions.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-border text-xs text-slate-label">
              Identifies frameworks, languages, cloud providers, and architectural patterns.
            </div>
          </div>

          {/* Axis 2 */}
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-slate-border shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary mb-3">
                <span className="material-symbols-outlined">history</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">
                2. Domain Experience (20% Weight)
              </h3>
              <p className="font-body-sm text-body-sm text-slate-body mb-3">
                Analyzes tenure trajectory, career progression velocity, and vertical alignment.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-border text-xs text-slate-label">
              Flags role progression from Junior &rarr; Mid &rarr; Senior &rarr; Staff.
            </div>
          </div>

          {/* Axis 3 */}
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-slate-border shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary mb-3">
                <span className="material-symbols-outlined">groups</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">
                3. Leadership &amp; Soft Skills (15% Weight)
              </h3>
              <p className="font-body-sm text-body-sm text-slate-body mb-3">
                Evaluates cross-squad influence, mentorship count, hiring panels, and executive buy-in.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-border text-xs text-slate-label">
              Measures organizational multiplier impact beyond solitary coding.
            </div>
          </div>

          {/* Axis 4 */}
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-slate-border shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary mb-3">
                <span className="material-symbols-outlined">insights</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">
                4. Quantified Impact (20% Weight)
              </h3>
              <p className="font-body-sm text-body-sm text-slate-body mb-3">
                The Google XYZ Formula: "Accomplished [X] as measured by [Y] by doing [Z]".
              </p>
            </div>
            <div className="pt-3 border-t border-slate-border text-xs text-slate-label">
              Requires hard metrics (%, $, milliseconds, user count) in &ge; 70% of bullets.
            </div>
          </div>

          {/* Axis 5 */}
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-slate-border shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary mb-3">
                <span className="material-symbols-outlined">view_column</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">
                5. ATS Format &amp; Readability (15% Weight)
              </h3>
              <p className="font-body-sm text-body-sm text-slate-body mb-3">
                Reconstructs how Workday, Lever, Taleo, and Greenhouse parse text tokens.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-border text-xs text-slate-label">
              Checks for table nesting bugs, multi-column reading order, and symbol integrity.
            </div>
          </div>

          {/* Benchmark Baseline */}
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-slate-border shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary mb-3">
                <span className="material-symbols-outlined">tune</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">
                The 75-Point Baseline
              </h3>
              <p className="font-body-sm text-body-sm text-slate-body mb-3">
                The dashed radar benchmark represents the 75th percentile of successfully hired candidates.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-border text-xs text-slate-label">
              Any axis scoring below 75 creates friction in automated screening stages.
            </div>
          </div>
        </div>

        {/* Privacy & Zero-Retention Banner */}
        <div className="p-6 rounded-xl bg-surface-container-lowest border border-slate-border flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-status-pass shrink-0">
              <span className="material-symbols-outlined text-[24px]">security</span>
            </div>
            <div>
              <h4 className="font-headline-sm text-headline-sm text-on-surface">
                Zero-Retention Privacy Architecture
              </h4>
              <p className="font-body-sm text-body-sm text-slate-body">
                Uploaded resumes are processed in memory and never indexed, persisted to databases, or utilized for generative model training.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="font-label-caps text-label-caps bg-emerald-500/10 text-status-pass border border-emerald-500/30 px-3 py-1 rounded-full uppercase font-bold">
              ISO 27001 Compliant
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
