import React from 'react';

interface FooterProps {
  onSelectTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="w-full bg-surface-container-lowest border-t border-slate-border py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-4 font-body-sm text-body-sm text-on-surface-variant">
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-2 gap-y-1">
          <span className="font-label-lg text-label-lg text-on-surface font-semibold">Resume Scorer</span>
          <span>·</span>
          <span>Algorithmic Telemetry &amp; Diagnostics</span>
          <span>·</span>
          <span>ISO 27001 Data Sanitization</span>
        </div>
        <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-3 gap-y-1">
          <button
            onClick={() => onSelectTab('methodology')}
            className="hover:text-on-surface transition-colors underline cursor-pointer"
          >
            Scoring Methodology
          </button>
          <span>·</span>
          <span>Privacy Guarantee: Resumes Never Retained</span>
          <span>·</span>
          <span>© 2025 Resume Scorer Inc.</span>
        </div>
      </div>
    </footer>
  );
};
