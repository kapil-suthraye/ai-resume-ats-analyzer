import React, { useEffect, useState } from 'react';
import { PRESET_PROFILES } from './data/presets';
import { ResumeData } from './types';
import { evaluateResume } from './utils/scoringEngine';
import { extractTextFromFile } from './utils/fileExtractor';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { WorkbenchSection } from './components/WorkbenchSection';
import { ScorecardSection } from './components/ScorecardSection';
import { MethodologySection } from './components/MethodologySection';
import { ExtractedTextModal } from './components/ExtractedTextModal';
import { DownloadModifiedModal } from './components/DownloadModifiedModal';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';

export default function App() {
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('resume_scorer_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Active Profile / Preset
  const [currentPresetId, setCurrentPresetId] = useState<string>('1');
  const [activeData, setActiveData] = useState<ResumeData>(PRESET_PROFILES['1']);

  // UI Navigation & Modals
  const [currentTab, setCurrentTab] = useState<string>('overview');
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [showExtractedModal, setShowExtractedModal] = useState<boolean>(false);
  const [showDownloadModifiedModal, setShowDownloadModifiedModal] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync dark mode class on <html>
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('resume_scorer_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('resume_scorer_theme', 'light');
    }
  }, [isDarkMode]);

  // Toast Auto-Dismiss
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const handleToggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
    setToastMessage(isDarkMode ? 'Switched to Light mode' : 'Switched to Dark mode');
  };

  const handleSelectPreset = (id: string) => {
    setCurrentPresetId(id);
    if (id !== 'custom' && PRESET_PROFILES[id]) {
      setActiveData(PRESET_PROFILES[id]);
      setToastMessage(`Switched to ${PRESET_PROFILES[id].candidateName} profile`);
    }
  };

  const handleUpdateTargetRole = (role: string) => {
    setActiveData((prev) => ({
      ...prev,
      targetRole: role
    }));
  };

  const handleUpdateJobDescription = (jd: string) => {
    setActiveData((prev) => ({
      ...prev,
      jobDescription: jd
    }));
  };

  const handleCustomFileUpload = async (file: File) => {
    const fileSizeFormatted =
      file.size > 1024 * 1024
        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
        : `${Math.round(file.size / 1024)} KB`;

    try {
      const extractedText = await extractTextFromFile(file);

      if (!extractedText || extractedText.trim().length < 25) {
        setToastMessage(`Could not parse text from ${file.name}. Please paste resume text directly.`);
        return;
      }

      // Extract candidate name from first non-empty line
      const lines = extractedText.split('\n').map((l) => l.trim()).filter(Boolean);
      const firstLine = lines.find((l) => l.length > 2 && l.length < 50 && !/summary|experience|skills|education/i.test(l));
      const candidateName = firstLine || file.name.replace(/\.[^/.]+$/, '').replace(/[_.-]+/g, ' ');

      const evaluated = evaluateResume(
        candidateName,
        activeData.targetRole,
        file.name,
        fileSizeFormatted,
        extractedText.trim(),
        activeData.jobDescription
      );

      setActiveData(evaluated);
      setCurrentPresetId('custom');
      setToastMessage(`Successfully ingested ${file.name} (${evaluated.wordCount} words)`);
    } catch (err) {
      console.error('File parsing error:', err);
      setToastMessage(`Failed to parse ${file.name}. Please paste resume text directly.`);
    }
  };

  const handleCustomTextPasted = (name: string, role: string, text: string) => {
    const evaluated = evaluateResume(
      name || 'Custom Candidate',
      role || activeData.targetRole,
      `${(name || 'custom').toLowerCase().replace(/\s+/g, '_')}_resume.txt`,
      `${Math.max(12, Math.round(text.length / 1024))} KB`,
      text,
      activeData.jobDescription
    );

    setActiveData(evaluated);
    setCurrentPresetId('custom');
    setToastMessage('Resume parsed and evaluated successfully!');
  };

  const handleResetFile = () => {
    handleSelectPreset('1');
    setToastMessage('Reset to baseline profile');
  };

  const handleRunEvaluation = () => {
    setIsEvaluating(true);
    setTimeout(() => {
      // Re-evaluate with current inputs
      const evaluated = evaluateResume(
        activeData.candidateName,
        activeData.targetRole,
        activeData.fileName,
        activeData.fileSize,
        activeData.extractedText.fullText,
        activeData.jobDescription
      );
      setActiveData(evaluated);
      setIsEvaluating(false);
      setToastMessage('Evaluation report updated!');

      // Smooth scroll to scorecard
      const scorecardEl = document.getElementById('scorecard-section');
      if (scorecardEl) {
        scorecardEl.scrollIntoView({ behavior: 'smooth' });
        setCurrentTab('scorecard');
      }
    }, 700);
  };

  const handleSelectTab = (tab: string) => {
    setCurrentTab(tab);
    if (tab === 'overview') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (tab === 'workbench') {
      document.getElementById('workbench-section')?.scrollIntoView({ behavior: 'smooth' });
    } else if (tab === 'scorecard') {
      document.getElementById('scorecard-section')?.scrollIntoView({ behavior: 'smooth' });
    } else if (tab === 'methodology') {
      document.getElementById('methodology-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col selection:bg-primary-container selection:text-white">
      {/* Sticky Header with Navigation and Light/Dark Switch */}
      <Header
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
        onScrollToWorkbench={() => handleSelectTab('workbench')}
      />

      {/* Main Content Area */}
      <main className="flex-1 pt-16">
        {/* Stage 1: Hero & Architectural Capabilities Overview */}
        <HeroSection
          onGoToWorkbench={() => handleSelectTab('workbench')}
          onGoToScorecard={() => handleSelectTab('scorecard')}
        />

        {/* Stage 2: Interactive Analysis Workbench */}
        <WorkbenchSection
          currentPresetId={currentPresetId}
          onSelectPreset={handleSelectPreset}
          activeData={activeData}
          onUpdateTargetRole={handleUpdateTargetRole}
          onUpdateJobDescription={handleUpdateJobDescription}
          onCustomFileUpload={handleCustomFileUpload}
          onCustomTextPasted={handleCustomTextPasted}
          onResetFile={handleResetFile}
          onPreviewExtractedText={() => setShowExtractedModal(true)}
          onRunEvaluation={handleRunEvaluation}
          isEvaluating={isEvaluating}
        />

        {/* Stage 3: Interactive Scorecard & Advisory Report */}
        <ScorecardSection
          data={activeData}
          onShowToast={(msg) => setToastMessage(msg)}
          onOpenDownloadModified={() => setShowDownloadModifiedModal(true)}
        />

        {/* Stage 4: Scoring Methodology & Algorithmic Transparency */}
        <MethodologySection />
      </main>

      {/* Footer */}
      <Footer onSelectTab={handleSelectTab} />

      {/* Extracted Text Modal */}
      {showExtractedModal && (
        <ExtractedTextModal
          data={activeData}
          onClose={() => setShowExtractedModal(false)}
          onShowToast={(msg) => setToastMessage(msg)}
          onOpenDownloadModified={() => setShowDownloadModifiedModal(true)}
        />
      )}

      {/* Download Modified Resume Modal */}
      {showDownloadModifiedModal && (
        <DownloadModifiedModal
          data={activeData}
          onClose={() => setShowDownloadModifiedModal(false)}
          onShowToast={(msg) => setToastMessage(msg)}
        />
      )}

      {/* Toast Notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}
