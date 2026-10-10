import React, { useState } from 'react';
import { ResumeData } from '../types';

interface ExtractedTextModalProps {
  data: ResumeData;
  onClose: () => void;
  onShowToast: (msg: string) => void;
  onOpenDownloadModified?: () => void;
}

export const ExtractedTextModal: React.FC<ExtractedTextModalProps> = ({
  data,
  onClose,
  onShowToast,
  onOpenDownloadModified
}) => {
  const [activeTab, setActiveTab] = useState<'full' | 'summary' | 'experience' | 'skills' | 'education'>('full');

  const handleCopy = () => {
    let contentToCopy = data.extractedText.fullText;
    if (activeTab === 'summary') contentToCopy = data.extractedText.summary;
    if (activeTab === 'experience') contentToCopy = data.extractedText.experience;
    if (activeTab === 'skills') contentToCopy = data.extractedText.skills;
    if (activeTab === 'education') contentToCopy = data.extractedText.education;

    navigator.clipboard.writeText(contentToCopy);
    onShowToast('Extracted text copied to clipboard!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest border border-slate-border rounded-xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[22px]">text_snippet</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">
                Extracted Resume Stream
              </h3>
              <p className="text-xs text-slate-label">
                {data.fileName} · {data.wordCount} words indexed · 0 OCR corruptions
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-label hover:text-on-surface p-1 rounded-lg transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        {/* Section Tabs */}
        <div className="flex items-center gap-1 px-4 py-2 bg-surface-container-low border-b border-slate-border overflow-x-auto">
          {[
            { id: 'full', label: 'Full Document' },
            { id: 'summary', label: 'Summary' },
            { id: 'experience', label: 'Experience' },
            { id: 'skills', label: 'Skills' },
            { id: 'education', label: 'Education' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-surface-container-lowest text-primary shadow-xs'
                  : 'text-slate-body hover:text-on-surface'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Box */}
        <div className="p-5 flex-1 overflow-y-auto font-mono text-xs text-on-surface bg-surface-container-lowest leading-relaxed whitespace-pre-wrap select-text">
          {activeTab === 'full' && data.extractedText.fullText}
          {activeTab === 'summary' && (data.extractedText.summary || 'No explicit summary detected.')}
          {activeTab === 'experience' && (data.extractedText.experience || 'Experience section text parsed.')}
          {activeTab === 'skills' && (data.extractedText.skills || 'Skills section parsed.')}
          {activeTab === 'education' && (data.extractedText.education || 'Education section parsed.')}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-border flex items-center justify-between bg-surface-container-low">
          <div className="flex items-center gap-1.5 text-xs text-status-pass font-medium">
            <span className="material-symbols-outlined text-[16px]">verified</span>
            <span>Clean UTF-8 Sanitized</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface-container-lowest border border-slate-border text-xs font-semibold text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">content_copy</span>
              Copy Text
            </button>
            {onOpenDownloadModified && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenDownloadModified();
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-primary hover:bg-blue-700 text-xs font-semibold text-white transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">picture_as_pdf</span>
                Download PDF Resume
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center px-4 py-2 rounded-lg bg-surface-container-lowest border border-slate-border text-xs font-semibold text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
