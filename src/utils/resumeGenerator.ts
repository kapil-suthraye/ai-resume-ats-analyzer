import { ResumeData } from '../types';
import { getModifiedFullText } from './pdfGenerator';

export function generateModifiedResumeText(
  data: ResumeData,
  selectedRewriteIds: string[],
  includeMissingKeywords: boolean = true
): string {
  return getModifiedFullText(data, selectedRewriteIds, includeMissingKeywords);
}

export function generateModifiedMarkdown(
  data: ResumeData,
  selectedRewriteIds: string[],
  includeMissingKeywords: boolean = true
): string {
  const plainText = getModifiedFullText(data, selectedRewriteIds, includeMissingKeywords);
  const lines = plainText.split('\n');

  let md = '';
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (i === 0 && line.length > 0) {
      md += `# ${line}\n\n`;
      continue;
    }
    if (/^(SUMMARY|PROFESSIONAL SUMMARY|TECHNICAL SKILLS|SKILLS|CORE COMPETENCIES|EXPERIENCE|PROFESSIONAL EXPERIENCE|WORK EXPERIENCE|EDUCATION|PROJECTS|CERTIFICATIONS)$/i.test(line)) {
      md += `\n## ${line}\n\n`;
      continue;
    }
    if (/^[•\-\*]/.test(line)) {
      md += `- ${line.replace(/^[•\-\*]\s*/, '')}\n`;
      continue;
    }
    if (line.length > 0) {
      md += `${line}\n\n`;
    }
  }

  return md.trim();
}

export function downloadResumeFile(
  filename: string,
  content: string,
  mimeType: string
) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
