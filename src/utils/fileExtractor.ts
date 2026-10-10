import * as pdfjsLib from 'pdfjs-dist';

// Configure worker for pdfjs-dist
if (typeof window !== 'undefined') {
  try {
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
  } catch (e) {
    console.warn('PDF worker setup:', e);
  }
}

/**
 * Robustly extracts plain text from PDF ArrayBuffer
 */
async function extractTextFromPdf(buffer: ArrayBuffer): Promise<string> {
  try {
    const loadingTask = pdfjsLib.getDocument({
      data: new Uint8Array(buffer),
      useSystemFonts: true
    });

    const pdf = await loadingTask.promise;
    const fullTextParts: string[] = [];

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();

      let lastY: number | null = null;
      let pageText = '';

      for (const item of textContent.items as any[]) {
        if ('str' in item) {
          // If vertical position changed substantially, add newline
          if (lastY !== null && Math.abs(item.transform[5] - lastY) > 5) {
            pageText += '\n';
          } else if (pageText.length > 0 && !pageText.endsWith('\n') && !pageText.endsWith(' ')) {
            pageText += ' ';
          }
          pageText += item.str;
          lastY = item.transform[5];
        }
      }

      if (pageText.trim()) {
        fullTextParts.push(pageText.trim());
      }
    }

    const result = fullTextParts.join('\n\n').trim();
    if (result.length > 50) {
      return result;
    }
  } catch (err) {
    console.warn('PDF.js standard parsing encountered issue, attempting fallback text scan:', err);
  }

  // Fallback: Binary scan for uncompressed text streams in PDF
  return fallbackPdfTextScan(buffer);
}

/**
 * Fallback scanner that extracts ASCII & UTF-8 readable text blocks from PDF binary
 */
function fallbackPdfTextScan(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binaryString = '';
  const len = bytes.length;
  for (let i = 0; i < len; i++) {
    const b = bytes[i];
    // Printable ASCII or newline/tab
    if ((b >= 32 && b <= 126) || b === 10 || b === 13 || b === 9) {
      binaryString += String.fromCharCode(b);
    } else {
      binaryString += ' ';
    }
  }

  // Find strings in PDF text operators ( ... ) Tj or [ ... ] TJ
  const tjMatches = binaryString.match(/\(([^()]{2,150})\)\s*Tj/g);
  if (tjMatches && tjMatches.length > 5) {
    const extracted = tjMatches
      .map((m) => m.replace(/^\(/, '').replace(/\)\s*Tj$/, '').trim())
      .filter((s) => s.length > 1 && !/^[0-9.]*$/.test(s))
      .join(' ');
    if (extracted.length > 100) {
      return cleanExtractedText(extracted);
    }
  }

  // Filter sequences of alphanumeric characters and words
  const words = binaryString
    .replace(/[^\w\s.,;:()/@-]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2 && !/^(obj|endobj|stream|endstream|xref|trailer|startxref)$/i.test(w));

  return cleanExtractedText(words.join(' '));
}

/**
 * Simple DOCX extractor (reads text chunks inside XML tags)
 */
function extractDocxText(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let str = '';
  for (let i = 0; i < bytes.length; i++) {
    const b = bytes[i];
    if (b >= 32 && b <= 126) {
      str += String.fromCharCode(b);
    }
  }
  // Match content inside <w:t>...</w:t> tags
  const matches = str.match(/<w:t[^>]*>([^<]+)<\/w:t>/g);
  if (matches) {
    return matches.map((m) => m.replace(/<[^>]+>/g, '')).join(' ');
  }
  return '';
}

function cleanExtractedText(text: string): string {
  return text
    .replace(/[ \t]+/g, ' ')
    .replace(/\n\s*\n\s*\n+/g, '\n\n')
    .trim();
}

/**
 * Universal text extractor for uploaded files
 */
export async function extractTextFromFile(file: File): Promise<string> {
  const ext = file.name.split('.').pop()?.toLowerCase() || '';

  if (ext === 'txt' || ext === 'md' || file.type === 'text/plain') {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve((e.target?.result as string) || '');
      reader.onerror = reject;
      reader.readAsText(file);
    });
  }

  if (ext === 'pdf' || file.type === 'application/pdf') {
    const buffer = await file.arrayBuffer();
    const text = await extractTextFromPdf(buffer);
    if (text && text.trim().length > 30) {
      return text;
    }
  }

  if (ext === 'docx' || ext === 'doc') {
    try {
      const buffer = await file.arrayBuffer();
      const text = extractDocxText(buffer);
      if (text && text.trim().length > 30) {
        return text;
      }
    } catch (e) {
      console.warn('DOCX extraction issue:', e);
    }
  }

  // Fallback text read
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = (e.target?.result as string) || '';
      // Strip control chars
      const clean = content.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, ' ');
      resolve(clean.trim());
    };
    reader.readAsText(file);
  });
}
