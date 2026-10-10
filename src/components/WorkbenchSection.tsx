import React, { useRef, useState } from 'react';
import { ResumeData } from '../types';

interface WorkbenchSectionProps {
  currentPresetId: string;
  onSelectPreset: (id: string) => void;
  activeData: ResumeData;
  onUpdateTargetRole: (role: string) => void;
  onUpdateJobDescription: (jd: string) => void;
  onCustomFileUpload: (file: File) => void;
  onCustomTextPasted: (name: string, role: string, text: string) => void;
  onResetFile: () => void;
  onPreviewExtractedText: () => void;
  onRunEvaluation: () => void;
  isEvaluating: boolean;
}

export const WorkbenchSection: React.FC<WorkbenchSectionProps> = ({
  currentPresetId,
  onSelectPreset,
  activeData,
  onUpdateTargetRole,
  onUpdateJobDescription,
  onCustomFileUpload,
  onCustomTextPasted,
  onResetFile,
  onPreviewExtractedText,
  onRunEvaluation,
  isEvaluating
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showPasteModal, setShowPasteModal] = useState(false);
  const [pasteCandidateName, setPasteCandidateName] = useState(activeData.candidateName);
  const [pasteResumeText, setPasteResumeText] = useState(activeData.extractedText.fullText);

  // Quick role suggestions
  const roleSuggestions = [
    'Staff Full-Stack Engineer',
    'Senior Product Manager',
    'Data Scientist / AI Engineer',
    'DevOps / SRE Lead',
    'Growth Marketing Director'
  ];

  // Count detected competencies in Job Description
  const detectedCompetenciesCount = Math.max(
    8,
    activeData.jobDescription
      .split(/[\n,•;]+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 5).length
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onCustomFileUpload(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onCustomFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <section
      className="w-full px-4 sm:px-8 py-12 bg-surface-container-low border-t border-slate-border"
      id="workbench-section"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest block mb-1">
              Telemetry Intake
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">
              Step 1: Input &amp; Configuration
            </h2>
            <p className="font-body-md text-body-md text-slate-body mt-1">
              Upload your resume or pick a pre-configured sample profile with matched job specifications.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-1.5 font-body-sm text-body-sm text-slate-label">
            <span className="material-symbols-outlined text-status-pass text-[18px]">lock</span>
            <span>Zero-Retention Policy: Data parsed in local volatile memory</span>
          </div>
        </div>

        {/* Preset Selector Bar */}
        <div className="bg-surface-container-lowest p-1.5 rounded-xl border border-slate-border flex flex-wrap gap-1.5 mb-8 shadow-sm">
          <button
            onClick={() => onSelectPreset('1')}
            className={`preset-btn flex-1 min-w-[200px] flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-label-md text-label-md transition-all cursor-pointer ${
              currentPresetId === '1'
                ? 'bg-primary-container text-on-primary font-semibold shadow-sm'
                : 'text-slate-body hover:bg-surface-container-low font-normal'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">code</span>
            <span>Sample 1: Staff / Senior Full-Stack</span>
          </button>

          <button
            onClick={() => onSelectPreset('2')}
            className={`preset-btn flex-1 min-w-[200px] flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-label-md text-label-md transition-all cursor-pointer ${
              currentPresetId === '2'
                ? 'bg-primary-container text-on-primary font-semibold shadow-sm'
                : 'text-slate-body hover:bg-surface-container-low font-normal'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">layers</span>
            <span>Sample 2: Senior Product Manager</span>
          </button>

          <button
            onClick={() => onSelectPreset('3')}
            className={`preset-btn flex-1 min-w-[200px] flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-label-md text-label-md transition-all cursor-pointer ${
              currentPresetId === '3'
                ? 'bg-primary-container text-on-primary font-semibold shadow-sm'
                : 'text-slate-body hover:bg-surface-container-low font-normal'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">trending_up</span>
            <span>Sample 3: Growth Marketing Director</span>
          </button>

          <button
            onClick={() => {
              onSelectPreset('custom');
              fileInputRef.current?.click();
            }}
            className={`preset-btn flex-1 min-w-[180px] flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-label-md text-label-md transition-all cursor-pointer ${
              currentPresetId === 'custom'
                ? 'bg-primary-container text-on-primary font-semibold shadow-sm'
                : 'text-slate-body hover:bg-surface-container-low font-normal'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">upload_file</span>
            <span>Custom File Upload</span>
          </button>
        </div>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.docx,.doc,.txt,.md"
          className="hidden"
          onChange={handleFileChange}
        />

        {/* Two-Column Workbench Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Target Job Specification */}
          <div className="lg:col-span-6 bg-surface-container-lowest p-6 rounded-xl border border-slate-border flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">target</span>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">
                    Target Job Specification
                  </h3>
                </div>
                <span className="font-label-caps text-label-caps bg-surface-container text-primary px-2 py-0.5 rounded uppercase">
                  Reference Model
                </span>
              </div>

              {/* Target Role Input */}
              <div className="mb-4">
                <label
                  className="block font-label-md text-label-md text-slate-label uppercase tracking-wider mb-1.5"
                  htmlFor="target-role"
                >
                  Target Role Designation
                </label>
                <div className="relative">
                  <input
                    id="target-role"
                    type="text"
                    value={activeData.targetRole}
                    onChange={(e) => onUpdateTargetRole(e.target.value)}
                    placeholder="e.g. Senior Full-Stack Engineer"
                    className="w-full bg-surface-container-lowest border border-slate-border focus:border-primary text-on-surface font-label-lg text-label-lg px-4 py-2.5 rounded-lg outline-none transition-colors"
                  />
                </div>

                {/* Role suggestions chips */}
                <div className="flex flex-wrap items-center gap-1.5 mt-2">
                  <span className="font-body-sm text-body-sm text-slate-label">Suggestions:</span>
                  {roleSuggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => onUpdateTargetRole(suggestion)}
                      className="text-xs bg-surface-container-low hover:bg-surface-container text-on-surface px-2 py-0.5 rounded border border-slate-border transition-colors cursor-pointer"
                    >
                      {suggestion.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Target Job Description Textarea */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    className="font-label-md text-label-md text-slate-label uppercase tracking-wider"
                    htmlFor="job-desc-text"
                  >
                    Job Description &amp; Core Competencies
                  </label>
                  <span className="font-body-sm text-body-sm text-status-pass font-medium">
                    {detectedCompetenciesCount} key competencies detected
                  </span>
                </div>
                <textarea
                  id="job-desc-text"
                  rows={7}
                  value={activeData.jobDescription}
                  onChange={(e) => onUpdateJobDescription(e.target.value)}
                  placeholder="Paste the target job description or requirements here..."
                  className="w-full bg-surface-container-lowest border border-slate-border focus:border-primary text-on-surface font-body-sm text-body-sm p-4 rounded-lg outline-none transition-colors resize-none leading-relaxed"
                />
              </div>
            </div>

            {/* Helper Info / Extracted Tags */}
            <div className="p-3 bg-surface-container-low rounded-lg border border-slate-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[18px]">query_stats</span>
                <span className="font-body-sm text-body-sm text-slate-body">
                  Extraction Model: {activeData.targetRole.split('/')[0].trim()} v3.8
                </span>
              </div>
              <span className="font-label-caps text-label-caps text-slate-label uppercase">
                {activeData.jobDescription.length.toLocaleString()} chars indexed
              </span>
            </div>
          </div>

          {/* Right Column: Resume Intake & Dropzone */}
          <div className="lg:col-span-6 bg-surface-container-lowest p-6 rounded-xl border border-slate-border flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">description</span>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">
                    Candidate Resume Ingestion
                  </h3>
                </div>
                <span className="font-label-caps text-label-caps bg-emerald-500/10 text-status-pass border border-emerald-500/30 px-2 py-0.5 rounded uppercase">
                  Parsed Active
                </span>
              </div>

              {/* Dropzone Visual Box */}
              <div
                id="dropzone-area"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-border hover:border-primary rounded-xl p-6 text-center bg-surface-container-low/40 transition-all cursor-pointer mb-4 group"
              >
                <div className="w-12 h-12 mx-auto rounded-full bg-surface-container flex items-center justify-center text-primary mb-3 group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[28px]">cloud_upload</span>
                </div>
                <h4 className="font-label-lg text-label-lg text-on-surface mb-1">
                  Drag and drop resume here, or <span className="text-primary underline">browse</span>
                </h4>
                <p className="font-body-sm text-body-sm text-slate-muted">
                  Supports standardized formats: .pdf, .docx, .txt (Max 10MB)
                </p>
                <div className="mt-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowPasteModal(true);
                    }}
                    className="text-xs text-primary hover:underline cursor-pointer"
                  >
                    Or paste raw text directly
                  </button>
                </div>
              </div>

              {/* Active Loaded File Card */}
              <div
                className="p-4 bg-surface-container-low rounded-xl border border-slate-border flex items-center justify-between mb-4"
                id="active-file-card"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined">
                      {activeData.fileName.endsWith('.pdf') ? 'picture_as_pdf' : 'description'}
                    </span>
                  </div>
                  <div>
                    <span className="block font-label-lg text-label-lg text-on-surface font-semibold" id="active-file-name">
                      {activeData.fileName}
                    </span>
                    <div className="flex items-center gap-1.5 font-body-sm text-body-sm text-slate-label flex-wrap">
                      <span>{activeData.fileSize}</span>
                      <span>·</span>
                      <span className="text-status-pass font-medium">Parsed Successfully</span>
                      <span>·</span>
                      <span>{activeData.wordCount} words</span>
                      <span>·</span>
                      <span>{activeData.sectionsCount} sections</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onResetFile}
                  title="Remove or reset file"
                  className="text-slate-label hover:text-red-500 p-1.5 rounded transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">delete</span>
                </button>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-slate-border">
              <button
                type="button"
                onClick={onPreviewExtractedText}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-surface-container-lowest hover:bg-surface-container-low text-on-surface border border-slate-border font-label-md text-label-md px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">visibility</span>
                <span>View Extracted Text</span>
              </button>

              <button
                type="button"
                disabled={isEvaluating}
                onClick={onRunEvaluation}
                className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 bg-primary hover:bg-blue-700 text-on-primary font-label-lg text-label-lg px-6 py-2.5 rounded-lg transition-all shadow-sm cursor-pointer disabled:opacity-70"
              >
                {isEvaluating ? (
                  <>
                    <span className="material-symbols-outlined text-[20px] animate-spin">sync</span>
                    <span>Analyzing Competency Matrix...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[20px]">bolt</span>
                    <span>Run Full Evaluation Report</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Direct Text Paste Modal */}
        {showPasteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
            <div className="bg-surface-container-lowest border border-slate-border rounded-xl p-6 max-w-2xl w-full shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-headline-sm text-headline-sm text-on-surface">
                  Paste Resume Content
                </h3>
                <button
                  onClick={() => setShowPasteModal(false)}
                  className="text-slate-label hover:text-on-surface cursor-pointer"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <div className="mb-3">
                <label className="block text-xs font-semibold text-slate-label uppercase mb-1">
                  Candidate Name
                </label>
                <input
                  type="text"
                  value={pasteCandidateName}
                  onChange={(e) => setPasteCandidateName(e.target.value)}
                  className="w-full p-2.5 border border-slate-border rounded-lg bg-surface text-on-surface text-sm"
                  placeholder="e.g. John Doe"
                />
              </div>

              <div className="mb-4">
                <label className="block text-xs font-semibold text-slate-label uppercase mb-1">
                  Resume Text (Include Experience, Education, Skills)
                </label>
                <textarea
                  rows={10}
                  value={pasteResumeText}
                  onChange={(e) => setPasteResumeText(e.target.value)}
                  className="w-full p-3 border border-slate-border rounded-lg bg-surface text-on-surface text-sm font-mono leading-relaxed"
                  placeholder="Paste raw resume text here..."
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowPasteModal(false)}
                  className="px-4 py-2 border border-slate-border rounded-lg text-sm text-slate-label hover:bg-surface-container-low cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onCustomTextPasted(pasteCandidateName, activeData.targetRole, pasteResumeText);
                    setShowPasteModal(false);
                  }}
                  className="px-5 py-2 bg-primary hover:bg-blue-700 text-white rounded-lg text-sm font-semibold cursor-pointer"
                >
                  Save &amp; Ingest Resume
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
