import React from 'react';

interface HeaderProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onScrollToWorkbench: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  isDarkMode,
  onToggleDarkMode,
  onScrollToWorkbench
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-xl border-b border-slate-border">
      <div className="h-16 max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between gap-4">
        {/* Left: Logo & ATS Engine Badge */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => onSelectTab('overview')}
            className="flex items-center gap-2.5 text-left focus:outline-none group cursor-pointer"
          >
            <img
              alt="Resume Scorer Logo"
              className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida/AEtjO1Vc9PPrt8-hXcekvH-hT-_6YdubadM--XqqZX2gtmE4qlhhwQaycIZlgAzbMZY72Kr7pwxcAn1ht4X1bpbXUAgt8xTD5kU8nreSA2spGMk-bPwJMA71AeQU6IaRSUZzmmF9Yt9e6iXE5uGlMDb08ZYW0WzYO137iJ7omXSEKEqw6wlSz6MM3rTnR2nMsT9x9frzFxN8XoB4A7cYBd073nz9bed_koXGGNvpGMID-pnMFCxpYHBk7zw5Nso"
            />
            <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight hidden sm:inline-block">
              Resume Scorer
            </span>
          </button>

          <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-slate-border bg-surface-container-lowest">
            <span className="w-2 h-2 rounded-full bg-status-pass animate-pulse"></span>
            <span className="font-label-caps text-label-caps text-slate-label uppercase">
              ATS Engine v3.8 Active
            </span>
          </div>
        </div>

        {/* Center: Navigation */}
        <nav className="hidden lg:flex items-center gap-6" aria-label="Main Navigation">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'workbench', label: 'Workbench' },
            { id: 'scorecard', label: 'Scorecard Breakdown' },
            { id: 'methodology', label: 'Methodology' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`transition-colors text-sm font-medium cursor-pointer relative py-1 ${
                currentTab === item.id
                  ? 'text-primary font-semibold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {item.label}
              {currentTab === item.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Right: Theme Toggle & Actions */}
        <div className="flex items-center gap-3">
          {/* Light/Dark Mode Switcher */}
          <button
            onClick={onToggleDarkMode}
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            className="p-2 rounded-lg border border-slate-border bg-surface-container-lowest hover:bg-surface-container-low text-on-surface transition-colors cursor-pointer flex items-center justify-center"
            aria-label="Toggle dark/light mode"
          >
            <span className="material-symbols-outlined text-[19px]">
              {isDarkMode ? 'light_mode' : 'dark_mode'}
            </span>
          </button>

          {/* Primary CTA */}
          <button
            onClick={onScrollToWorkbench}
            className="inline-flex items-center justify-center bg-primary-container hover:bg-primary text-on-primary font-label-lg text-label-lg px-4 py-2 rounded-xl transition-all shadow-[0_1px_8px_rgba(0,0,0,0.06)] cursor-pointer hover:shadow-md"
          >
            Score Your Resume
          </button>

          {/* User Profile Avatar */}
          <div
            className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0 text-white cursor-pointer hover:opacity-90 transition-opacity"
            title="User Profile: kapilsuthraye01@gmail.com"
          >
            <span className="material-symbols-outlined text-white text-[18px]">person</span>
          </div>
        </div>
      </div>
    </header>
  );
};
