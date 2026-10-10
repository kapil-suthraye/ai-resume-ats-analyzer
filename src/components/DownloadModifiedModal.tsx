import React, { useState, useMemo } from 'react';
import { ResumeData } from '../types';
import {
  generateModifiedResumeText,
  generateModifiedMarkdown,
  downloadResumeFile
} from '../utils/resumeGenerator';
import { generateAndDownloadResumePdf } from '../utils/pdfGenerator';

interface DownloadModifiedModalProps {
  data: ResumeData;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const DownloadModifiedModal: React.FC<DownloadModifiedModalProps> = ({
  data,
  onClose,
  onShowToast
}) => {
  // By default, select all suggested rewrites
  const [selectedRewriteIds, setSelectedRewriteIds] = useState<string[]>(() =>
    data.rewrites.map((r) => r.id)
  );
  const [includeMissingKeywords, setIncludeMissingKeywords] = useState<boolean>(true);
  const [activePreviewTab, setActivePreviewTab] = useState<'formatted' | 'text' | 'diff'>('formatted');

  const toggleRewrite = (id: string) => {
    setSelectedRewriteIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectAllRewrites = () => {
    setSelectedRewriteIds(data.rewrites.map((r) => r.id));
  };

  const deselectAllRewrites = () => {
    setSelectedRewriteIds([]);
  };

  // Calculate projected score lift
  const totalLift = useMemo(() => {
    const selected = data.rewrites.filter((r) => selectedRewriteIds.includes(r.id));
    const rawLift = selected.reduce((sum, r) => sum + Math.round(r.improvementDelta * 0.4), 0);
    const keywordLift = includeMissingKeywords ? 4 : 0;
    return Math.min(100 - data.overallScore, rawLift + keywordLift);
  }, [data, selectedRewriteIds, includeMissingKeywords]);

  const projectedScore = Math.min(99, data.overallScore + totalLift);

  // Generate modified texts strictly from user resume
  const modifiedText = useMemo(() => {
    return generateModifiedResumeText(data, selectedRewriteIds, includeMissingKeywords);
  }, [data, selectedRewriteIds, includeMissingKeywords]);

  const modifiedMarkdown = useMemo(() => {
    return generateModifiedMarkdown(data, selectedRewriteIds, includeMissingKeywords);
  }, [data, selectedRewriteIds, includeMissingKeywords]);

  const baseFileName = `${(data.candidateName || 'resume')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')}_optimized_resume`;

  // PRIMARY: Real PDF download
  const handleDownloadPdf = () => {
    try {
      generateAndDownloadResumePdf(data, selectedRewriteIds, includeMissingKeywords);
      onShowToast(`Downloaded ${baseFileName}.pdf with all recommended changes!`);
    } catch (err) {
      console.error('PDF generation error:', err);
      onShowToast('Error generating PDF file.');
    }
  };

  const handleDownloadTxt = () => {
    downloadResumeFile(`${baseFileName}.txt`, modifiedText, 'text/plain;charset=utf-8');
    onShowToast(`Downloaded ${baseFileName}.txt (ATS Plain Text)`);
  };

  const handleDownloadMd = () => {
    downloadResumeFile(`${baseFileName}.md`, modifiedMarkdown, 'text/markdown;charset=utf-8');
    onShowToast(`Downloaded ${baseFileName}.md`);
  };

  const handleDownloadDoc = () => {
    const docHtml = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>${data.candidateName} - Resume</title>
<style>
  body { font-family: Calibri, Arial, sans-serif; font-size: 11pt; line-height: 1.45; color: #1e293b; max-width: 800px; margin: 24px auto; }
  h1 { font-size: 20pt; margin-bottom: 2pt; color: #0f172a; text-transform: uppercase; }
  h2 { font-size: 11pt; margin-top: 14pt; margin-bottom: 4pt; border-bottom: 1pt solid #94a3b8; color: #0f172a; text-transform: uppercase; letter-spacing: 0.05em; }
  p { margin: 4pt 0; }
  ul { margin: 3pt 0 8pt 18pt; padding: 0; }
  li { margin-bottom: 4pt; }
</style>
</head>
<body>
${modifiedMarkdown
  .replace(/^# (.*$)/gim, '<h1>$1</h1>')
  .replace(/^## (.*$)/gim, '<h2>$1</h2>')
  .replace(/^- (.*$)/gim, '<li>$1</li>')
  .replace(/\n\n/g, '<p></p>')}
</body>
</html>`;

    downloadResumeFile(`${baseFileName}.doc`, docHtml, 'application/msword;charset=utf-8');
    onShowToast(`Downloaded ${baseFileName}.doc (Microsoft Word)`);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(modifiedText);
    onShowToast('Modified resume copied to clipboard!');
  };

  // Parse lines for Formatted Document Preview
  const previewLines = useMemo(() => {
    return modifiedText.split('\n');
  }, [modifiedText]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-5 animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest border border-slate-border rounded-xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-border flex items-center justify-between bg-surface-container-low">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary-container text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">picture_as_pdf</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-headline-sm text-headline-sm text-on-surface">
                  Download Modified Resume (.PDF)
                </h3>
                <span className="font-label-caps text-label-caps bg-emerald-500/10 text-status-pass border border-emerald-500/30 px-2 py-0.5 rounded font-bold uppercase">
                  ATS Verified
                </span>
              </div>
              <p className="text-xs text-slate-label">
                Real resume content with applied rewrites and zero hallucinated data.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleDownloadPdf}
              className="hidden sm:inline-flex items-center gap-1.5 bg-primary hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-all shadow-sm cursor-pointer hover:shadow-md"
            >
              <span className="material-symbols-outlined text-[16px]">picture_as_pdf</span>
              <span>Download PDF (.pdf)</span>
            </button>
            <button
              onClick={onClose}
              className="text-slate-label hover:text-on-surface p-1 rounded-lg transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[22px]">close</span>
            </button>
          </div>
        </div>

        {/* Projected Lift Banner */}
        <div className="px-5 py-3 bg-blue-50/80 dark:bg-blue-950/40 border-b border-blue-200 dark:border-blue-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-primary text-[20px]">trending_up</span>
            <div className="text-xs text-on-surface">
              <span>Projected ATS Match Score: </span>
              <strong className="text-slate-500 line-through mr-1">{data.overallScore}</strong>
              <strong className="text-status-pass text-sm font-bold">{projectedScore} / 100</strong>
              <span className="text-status-pass font-semibold ml-1.5">(+{totalLift} pts lift)</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-label">Applied:</span>
            <span className="px-2 py-0.5 rounded bg-surface-container font-semibold text-primary">
              {selectedRewriteIds.length} of {data.rewrites.length} Bullets
            </span>
          </div>
        </div>

        {/* Main Grid: Left Controls, Right Preview */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden divide-y lg:divide-y-0 lg:divide-x divide-slate-border">
          {/* Left Column: Revision Checkboxes & Keyword Settings (5 Cols) */}
          <div className="lg:col-span-5 p-4 sm:p-5 overflow-y-auto bg-surface space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-label-md text-slate-label uppercase tracking-wider">
                Select Revisions to Apply
              </span>
              <div className="flex items-center gap-2 text-xs">
                <button
                  type="button"
                  onClick={selectAllRewrites}
                  className="text-primary hover:underline cursor-pointer"
                >
                  Select All
                </button>
                <span>·</span>
                <button
                  type="button"
                  onClick={deselectAllRewrites}
                  className="text-slate-label hover:underline cursor-pointer"
                >
                  Clear
                </button>
              </div>
            </div>

            {/* Revision List */}
            <div className="space-y-3">
              {data.rewrites.map((rewrite, idx) => {
                const isChecked = selectedRewriteIds.includes(rewrite.id);
                return (
                  <div
                    key={rewrite.id}
                    onClick={() => toggleRewrite(rewrite.id)}
                    className={`p-3 rounded-lg border transition-all cursor-pointer ${
                      isChecked
                        ? 'bg-surface-container-lowest border-primary/60 shadow-xs'
                        : 'bg-surface-container-low/60 border-slate-border opacity-70'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}} // Handled by container
                        className="mt-1 h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary cursor-pointer shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-on-surface">
                            Bullet #{idx + 1} ({rewrite.section})
                          </span>
                          <span className="text-[10px] font-bold text-status-pass bg-emerald-500/10 px-1.5 py-0.5 rounded">
                            +{rewrite.improvementDelta} pts
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-label line-through truncate mb-1">
                          "{rewrite.before}"
                        </p>
                        <p className="text-xs text-status-pass dark:text-emerald-400 font-semibold leading-snug">
                          &rarr; "{rewrite.after}"
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Keyword Injection Toggle */}
            <div className="pt-3 border-t border-slate-border">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeMissingKeywords}
                  onChange={(e) => setIncludeMissingKeywords(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary cursor-pointer shrink-0"
                />
                <div>
                  <span className="text-xs font-semibold text-on-surface block">
                    Append Missing Target ATS Keywords
                  </span>
                  <span className="text-[11px] text-slate-label leading-tight block mt-0.5">
                    Automatically injects: {data.keywords.missingHighPriority.join(', ') || 'High-relevance keywords'}
                  </span>
                </div>
              </label>
            </div>
          </div>

          {/* Right Column: Live Output Preview (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col bg-surface-container-lowest overflow-hidden">
            {/* Tab Bar */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-slate-border bg-surface-container-low">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setActivePreviewTab('formatted')}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    activePreviewTab === 'formatted'
                      ? 'bg-surface-container-lowest text-primary shadow-xs'
                      : 'text-slate-label hover:text-on-surface'
                  }`}
                >
                  Formatted Document
                </button>
                <button
                  type="button"
                  onClick={() => setActivePreviewTab('text')}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    activePreviewTab === 'text'
                      ? 'bg-surface-container-lowest text-primary shadow-xs'
                      : 'text-slate-label hover:text-on-surface'
                  }`}
                >
                  Plain Text (ATS Pure)
                </button>
                <button
                  type="button"
                  onClick={() => setActivePreviewTab('diff')}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    activePreviewTab === 'diff'
                      ? 'bg-surface-container-lowest text-primary shadow-xs'
                      : 'text-slate-label hover:text-on-surface'
                  }`}
                >
                  Revisions Applied
                </button>
              </div>

              <span className="text-[11px] text-slate-label hidden sm:inline-block">
                Letter Size · ATS Single-Column Standard
              </span>
            </div>

            {/* Preview Body */}
            <div className="flex-1 p-5 overflow-y-auto leading-relaxed select-text bg-surface-container-lowest">
              {activePreviewTab === 'formatted' && (
                <div className="font-sans max-w-2xl mx-auto p-6 bg-surface rounded-xl border border-slate-border text-on-surface text-xs shadow-xs space-y-3">
                  {previewLines.map((line, idx) => {
                    const trimmed = line.trim();
                    if (!trimmed) {
                      return <div key={idx} className="h-1.5" />;
                    }

                    // First prominent line: Candidate Name
                    if (idx === 0) {
                      return (
                        <div key={idx} className="border-b border-slate-border pb-2 mb-2">
                          <h1 className="text-xl font-bold uppercase tracking-tight text-on-surface">
                            {trimmed}
                          </h1>
                          <div className="text-xs font-semibold text-primary mt-0.5">
                            {data.targetRole}
                          </div>
                        </div>
                      );
                    }

                    // Section headings
                    const isHeading = /^(SUMMARY|PROFESSIONAL SUMMARY|TECHNICAL SKILLS|SKILLS|CORE COMPETENCIES|EXPERIENCE|PROFESSIONAL EXPERIENCE|WORK EXPERIENCE|EDUCATION|PROJECTS|CERTIFICATIONS)$/i.test(
                      trimmed.replace(/[:=_\-#]/g, '').trim()
                    );
                    if (isHeading) {
                      return (
                        <div key={idx} className="pt-2">
                          <h2 className="text-[11px] font-bold uppercase tracking-wider text-on-surface border-b border-slate-border pb-1">
                            {trimmed.replace(/[:=_\-#]/g, '').trim()}
                          </h2>
                        </div>
                      );
                    }

                    // Bullet points
                    const isBullet = /^[•\-\*]|\d+\./.test(trimmed);
                    if (isBullet) {
                      const cleanBullet = trimmed.replace(/^[•\-\*]\s*|\d+\.\s*/, '');
                      const isRewritten = data.rewrites.some(
                        (r) => selectedRewriteIds.includes(r.id) && cleanBullet.includes(r.after.slice(0, 30))
                      );

                      return (
                        <div key={idx} className="flex items-start gap-2 text-xs pl-2">
                          <span className="text-primary font-bold mt-0.5">•</span>
                          <span
                            className={
                              isRewritten
                                ? 'text-status-pass dark:text-emerald-400 font-semibold'
                                : 'text-slate-body'
                            }
                          >
                            {cleanBullet}
                            {isRewritten && (
                              <span className="ml-1.5 text-[9px] bg-emerald-500/15 text-status-pass border border-emerald-500/30 px-1 py-0.5 rounded font-bold uppercase inline-block">
                                Optimized
                              </span>
                            )}
                          </span>
                        </div>
                      );
                    }

                    // Subheadings (Job titles, companies, dates)
                    const isSubhead = /\||—|–|\d{4}|present/i.test(trimmed);
                    if (isSubhead && trimmed.length < 100) {
                      return (
                        <div key={idx} className="font-bold text-xs text-on-surface mt-2">
                          {trimmed}
                        </div>
                      );
                    }

                    // Standard text / contact
                    return (
                      <p key={idx} className="text-xs text-slate-body leading-relaxed">
                        {trimmed}
                      </p>
                    );
                  })}
                </div>
              )}

              {activePreviewTab === 'text' && (
                <pre className="whitespace-pre-wrap font-mono text-xs text-on-surface">
                  {modifiedText}
                </pre>
              )}

              {activePreviewTab === 'diff' && (
                <div className="font-sans space-y-4">
                  <h4 className="text-xs font-bold uppercase text-slate-label tracking-wider">
                    Summary of Applied Bullet Rewrites
                  </h4>
                  {data.rewrites
                    .filter((r) => selectedRewriteIds.includes(r.id))
                    .map((r, i) => (
                      <div key={r.id} className="p-3.5 rounded-lg border border-slate-border bg-surface text-xs space-y-2">
                        <span className="font-semibold text-primary block">
                          Change #{i + 1} ({r.section})
                        </span>
                        <div className="p-2 rounded bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300 line-through">
                          - {r.before}
                        </div>
                        <div className="p-2 rounded bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 font-medium">
                          + {r.after}
                        </div>
                      </div>
                    ))}

                  {includeMissingKeywords && (
                    <div className="p-3 rounded-lg border border-slate-border bg-surface text-xs space-y-1">
                      <span className="font-semibold text-primary block">
                        Added Target Competencies
                      </span>
                      <p className="text-slate-body">
                        + {data.keywords.missingHighPriority.join(', ')}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer with PRIMARY PDF Download Button */}
        <div className="p-4 sm:p-5 border-t border-slate-border bg-surface-container-low flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface-container-lowest border border-slate-border text-xs font-semibold text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">content_copy</span>
              <span>Copy Text</span>
            </button>
            <button
              type="button"
              onClick={handleDownloadDoc}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface-container-lowest border border-slate-border text-xs font-semibold text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px] text-blue-600">article</span>
              <span>Word (.doc)</span>
            </button>
            <button
              type="button"
              onClick={handleDownloadMd}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface-container-lowest border border-slate-border text-xs font-semibold text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px] text-purple-600">code</span>
              <span>Markdown (.md)</span>
            </button>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={handleDownloadTxt}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface-container-lowest border border-slate-border text-xs font-semibold text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">text_snippet</span>
              <span>Text (.txt)</span>
            </button>

            {/* THE PRIMARY DOWNLOAD BUTTON: Real PDF Download */}
            <button
              type="button"
              onClick={handleDownloadPdf}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary hover:bg-blue-700 text-xs font-bold text-white shadow-md transition-all cursor-pointer hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
              <span>Download PDF Resume (.pdf)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
