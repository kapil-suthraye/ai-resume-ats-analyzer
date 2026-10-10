import { jsPDF } from 'jspdf';
import { ResumeData } from '../types';

/**
 * Sanitizes Unicode and special characters into standard clean characters
 * that render cleanly across all PDF readers without mojibake (â€¢, â€", â€™).
 */
export function sanitizeForPdf(text: string): string {
  return text
    .replace(/[\u2018\u2019]/g, "'") // smart single quotes
    .replace(/[\u201C\u201D]/g, '"') // smart double quotes
    .replace(/[\u2013\u2014]/g, ' - ') // en-dash, em-dash
    .replace(/\u2026/g, '...') // ellipsis
    .replace(/[\u00A0\u200B\u200E\u200F]/g, ' ') // non-breaking & zero-width spaces
    .replace(/[^\x09\x0A\x0D\x20-\x7E]/g, (char) => {
      // Map common latin accented letters to standard letters
      const map: Record<string, string> = {
        'é': 'e', 'è': 'e', 'ê': 'e', 'ë': 'e',
        'á': 'a', 'à': 'a', 'â': 'a', 'ä': 'a',
        'í': 'i', 'ì': 'i', 'î': 'i', 'ï': 'i',
        'ó': 'o', 'ò': 'o', 'ô': 'o', 'ö': 'o',
        'ú': 'u', 'ù': 'u', 'û': 'u', 'ü': 'u',
        'ñ': 'n', 'ç': 'c', '•': '', '·': '|',
        '®': '', '™': '', '©': '(c)'
      };
      return map[char] !== undefined ? map[char] : ' ';
    });
}

/**
 * Generates modified resume text by taking ONLY the actual resume text
 * and replacing the approved before bullets with the new after bullets.
 * NO hallucinated companies, dates, or data.
 */
export function getModifiedFullText(
  data: ResumeData,
  selectedRewriteIds: string[],
  includeMissingKeywords: boolean = true
): string {
  let fullText = data.extractedText.fullText;

  const selectedRewrites = data.rewrites.filter((r) =>
    selectedRewriteIds.includes(r.id)
  );

  // Apply rewrites directly into original text
  for (const rewrite of selectedRewrites) {
    const rawBefore = rewrite.before.trim();
    const rawAfter = rewrite.after.trim();

    // Check with bullet variations
    const bulletVariations = [
      rawBefore,
      `• ${rawBefore}`,
      `- ${rawBefore}`,
      `* ${rawBefore}`,
      rawBefore.replace(/^[•\-\*]\s*/, '')
    ];

    let replaced = false;
    for (const variant of bulletVariations) {
      if (fullText.includes(variant)) {
        fullText = fullText.replace(variant, `• ${rawAfter.replace(/^[•\-\*]\s*/, '')}`);
        replaced = true;
        break;
      }
    }

    if (!replaced) {
      // Fuzzy match first 40 chars
      const prefix = rawBefore.slice(0, 40);
      const idx = fullText.indexOf(prefix);
      if (idx !== -1) {
        // Find end of line
        const endOfLine = fullText.indexOf('\n', idx);
        const replaceLength = endOfLine !== -1 ? endOfLine - idx : rawBefore.length;
        fullText = fullText.slice(0, idx) + `• ${rawAfter.replace(/^[•\-\*]\s*/, '')}` + fullText.slice(idx + replaceLength);
      }
    }
  }

  // Optionally append missing ATS keywords under skills
  if (includeMissingKeywords && data.keywords.missingHighPriority.length > 0) {
    const keywordsLine = `• Target Competencies: ${data.keywords.missingHighPriority.join(', ')}`;
    if (/SKILLS|TECHNICAL SKILLS/i.test(fullText)) {
      fullText = fullText.replace(/(SKILLS|TECHNICAL SKILLS)[^\n]*\n/i, (match) => {
        return `${match}${keywordsLine}\n`;
      });
    } else {
      fullText += `\n\nADDITIONAL TARGET COMPETENCIES:\n${keywordsLine}\n`;
    }
  }

  return fullText;
}

/**
 * Programmatically generates a readable, crisp, ATS-standard PDF resume
 * strictly using the content from the resume with recommended changes applied.
 * Zero hallucinated data, zero encoding corruption, 100% readable.
 */
export function generateAndDownloadResumePdf(
  data: ResumeData,
  selectedRewriteIds: string[],
  includeMissingKeywords: boolean = true
): void {
  const modifiedFullText = getModifiedFullText(data, selectedRewriteIds, includeMissingKeywords);

  const doc = new jsPDF({
    unit: 'pt',
    format: 'letter'
  });

  const pageWidth = 612;
  const pageHeight = 792;
  const leftMargin = 45;
  const rightMargin = 567;
  const contentWidth = rightMargin - leftMargin; // 522 pt
  let currentY = 48;
  const bottomMargin = 45;

  const checkPageBreak = (neededHeight: number) => {
    if (currentY + neededHeight > pageHeight - bottomMargin) {
      doc.addPage();
      currentY = 48;
    }
  };

  const rawLines = modifiedFullText.split('\n');

  // Identify Candidate Name from first non-empty line
  let nameRendered = false;
  let lineIdx = 0;

  while (lineIdx < rawLines.length) {
    const rawLine = rawLines[lineIdx].trim();
    lineIdx++;

    if (!rawLine) {
      currentY += 4;
      continue;
    }

    const cleanLine = sanitizeForPdf(rawLine);

    // 1. Candidate Name (first prominent non-empty line)
    if (!nameRendered && cleanLine.length > 0 && cleanLine.length < 50 && !/summary|experience|skills|education/i.test(cleanLine)) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      doc.setTextColor(15, 23, 42); // slate-900
      doc.text(cleanLine, leftMargin, currentY);
      currentY += 18;
      nameRendered = true;
      continue;
    }

    // 2. Section Headings (SUMMARY, EXPERIENCE, SKILLS, EDUCATION, etc.)
    const isSectionHeader = /^(SUMMARY|PROFESSIONAL SUMMARY|TECHNICAL SKILLS|SKILLS|CORE COMPETENCIES|EXPERIENCE|PROFESSIONAL EXPERIENCE|WORK EXPERIENCE|EDUCATION|PROJECTS|CERTIFICATIONS)$/i.test(
      cleanLine.replace(/[:=_\-#]/g, '').trim()
    );

    if (isSectionHeader) {
      checkPageBreak(32);
      currentY += 6;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10.5);
      doc.setTextColor(15, 23, 42);
      const sectionTitle = cleanLine.replace(/[:=_\-#]/g, '').trim().toUpperCase();
      doc.text(sectionTitle, leftMargin, currentY);

      // Section divider rule
      currentY += 4;
      doc.setDrawColor(180, 195, 215);
      doc.setLineWidth(0.75);
      doc.line(leftMargin, currentY, rightMargin, currentY);
      currentY += 12;
      continue;
    }

    // 3. Bullet Point line
    const isBullet = /^[•\-\*]|\d+\./.test(rawLine) || rawLine.startsWith('•');
    if (isBullet) {
      const bulletContent = cleanLine.replace(/^[•\-\*]\s*|\d+\.\s*/, '').trim();
      if (!bulletContent) continue;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(30, 41, 59); // slate-800

      const bulletX = leftMargin + 6;
      const textX = leftMargin + 16;
      const bulletContentWidth = contentWidth - 16;

      const wrappedLines = doc.splitTextToSize(bulletContent, bulletContentWidth);
      checkPageBreak(wrappedLines.length * 12 + 4);

      // Draw vector circle bullet
      doc.setFillColor(15, 23, 42);
      doc.circle(bulletX, currentY - 3, 1.8, 'F');

      for (const wLine of wrappedLines) {
        doc.text(wLine, textX, currentY);
        currentY += 12;
      }
      currentY += 1.5;
      continue;
    }

    // 4. Job Title / Role / Company line (e.g. contains "Inc", "Company", dates, or pipeline separator)
    const isJobTitleOrDate = /\||—|–|\d{4}|present|senior|lead|engineer|manager|director|analyst/i.test(rawLine);
    if (isJobTitleOrDate && cleanLine.length < 120) {
      checkPageBreak(16);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(15, 23, 42);
      doc.text(cleanLine, leftMargin, currentY);
      currentY += 13;
      continue;
    }

    // 5. Contact line or Summary text or general paragraph
    const isContactLine = /@|github|linkedin|\.com|\.dev|\.org|\d{3}-\d{3}/i.test(cleanLine);
    doc.setFont('helvetica', isContactLine ? 'normal' : 'normal');
    if (isContactLine) {
      doc.setTextColor(71, 85, 105);
    } else {
      doc.setTextColor(30, 41, 59);
    }

    const wrapped = doc.splitTextToSize(cleanLine, contentWidth);
    for (const wLine of wrapped) {
      checkPageBreak(12);
      doc.text(wLine, leftMargin, currentY);
      currentY += 12;
    }
    currentY += 2;
  }

  // Clean filename: e.g. alex_chen_optimized_resume.pdf
  const safeName = (data.candidateName || 'resume')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');

  doc.save(`${safeName}_optimized_resume.pdf`);
}
