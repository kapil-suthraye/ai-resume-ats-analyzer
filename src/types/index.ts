export interface RadarAxis {
  label: string;
  key: string;
  score: number;
  benchmark: number;
  description: string;
}

export interface CriterionItem {
  id: string;
  name: string;
  score: number;
  maxScore: number;
  status: 'pass' | 'review' | 'gap';
  summary: string;
  details: string[];
}

export interface BulletRewrite {
  id: string;
  section: string;
  role: string;
  before: string;
  after: string;
  improvementDelta: number;
  rationale: string;
}

export interface KeywordAnalysis {
  matched: string[];
  missingHighPriority: string[];
  missingRecommended: string[];
}

export interface ParserAudit {
  system: string;
  compatibility: number;
  status: 'passed' | 'warning' | 'failed';
  notes: string;
}

export interface ResumeData {
  id: string;
  candidateName: string;
  initials: string;
  targetRole: string;
  fileName: string;
  fileSize: string;
  wordCount: number;
  sectionsCount: number;
  overallScore: number;
  percentileText: string;
  alignmentText: string;
  synthesisText: string;
  parsingErrorsCount: number;
  missingMetricsCount: number;
  keywordMatchPct: number;
  jobDescription: string;
  extractedText: {
    summary: string;
    experience: string;
    skills: string;
    education: string;
    fullText: string;
  };
  radarAxes: RadarAxis[];
  criteria: CriterionItem[];
  rewrites: BulletRewrite[];
  keywords: KeywordAnalysis;
  parsers: ParserAudit[];
}
