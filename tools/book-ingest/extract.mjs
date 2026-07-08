import { writeFile, mkdir } from 'fs/promises';
import { createWorker } from 'tesseract.js';
import { resolve } from 'path';

let ocrWorker = null;

async function getOcrWorker() {
  if (!ocrWorker) {
    console.log('  Initializing Tesseract OCR (eng+ara)...');
    ocrWorker = await createWorker('eng+ara', 1, {
      logger: msg => {
        if (msg.status === 'loading language traineddata') process.stdout.write(`  Loading ${msg.lang} traineddata...\n`);
      },
    });
  }
  return ocrWorker;
}

/**
 * Extract text from a PDF buffer using pdf-parse (born-digital PDFs).
 * Returns array of { page, text } or null if extraction fails.
 */
async function extractWithPdfParse(pdfBuffer) {
  try {
    const pdfParse = (await import('pdf-parse')).default;
    const data = await pdfParse(pdfBuffer);
    if (!data || !data.text || data.text.trim().length < 20) return null;
    const rawText = data.text;
    // Split by form feed to get per-page text
    const segments = rawText.split('\f').filter(s => s.trim().length > 0);
    if (segments.length > 1) {
      return segments.map((s, i) => ({ page: i + 1, text: cleanText(s) }));
    }
    // Single chunk — return as one page
    return [{ page: 1, text: cleanText(rawText) }];
  } catch {
    return null;
  }
}

/**
 * OCR an entire PDF buffer using Tesseract.
 * Tesseract accepts image buffers natively — we re-send the PDF buffer
 * and it will process whatever it can render internally (first page typically).
 * 
 * For true multi-page OCR, we'd need pdfjs-dist to render each page to image.
 * That's a Phase 2 enhancement with `canvas` native dependency.
 * 
 * Returns: { text, confidence } or null on failure.
 */
async function extractWithTesseract(pdfBuffer) {
  try {
    const worker = await getOcrWorker();
    const { data } = await worker.recognize(pdfBuffer);
    if (!data || !data.text || data.text.trim().length < 5) return null;
    return {
      text: cleanText(data.text),
      confidence: data.confidence || 0,
    };
  } catch {
    return null;
  }
}

/**
 * Full pipeline for a single PDF buffer:
 * 1. Try pdf-parse (works on born-digital PDFs)
 * 2. If that fails, try tesseract.js (works on scanned PDFs)
 * 3. If confidence is low, flag for manual transcription
 *
 * pdfsDir is used to save page images for flagged pages (requires pdfjs-dist, Phase 2).
 * For now, flagged means "whole book needs manual review".
 *
 * Returns: {
 *   pages: [{ page, text, method, confidence?, needs_manual_transcription? }],
 *   stats: { digital, ocr, flagged, total }
 * }
 */
export async function extractPages(pdfBuffer, pdfsDir, bookSlug) {
  const stats = { digital: 0, ocr: 0, flagged: 0, total: 0 };

  // Step 1: Try pdf-parse
  const pdfPages = await extractWithPdfParse(pdfBuffer);

  if (pdfPages) {
    stats.digital = pdfPages.length;
    stats.total = pdfPages.length;
    return {
      pages: pdfPages.map(p => ({ ...p, method: 'digital' })),
      stats,
    };
  }

  // Step 2: Try Tesseract OCR
  console.log('  pdf-parse returned no text — trying OCR...');
  const ocrResult = await extractWithTesseract(pdfBuffer);

  if (ocrResult && ocrResult.confidence >= 40) {
    stats.ocr = 1;
    stats.total = 1;
    return {
      pages: [{ page: 1, text: ocrResult.text, method: 'ocr', confidence: Math.round(ocrResult.confidence) }],
      stats,
    };
  }

  if (ocrResult) {
    // Low confidence — flag
    stats.flagged = 1;
    stats.total = 1;
    return {
      pages: [{
        page: 1,
        text: ocrResult.text || '',
        method: 'flagged',
        confidence: Math.round(ocrResult.confidence),
        needs_manual_transcription: true,
        note: 'Low OCR confidence — please verify and correct manually',
      }],
      stats,
    };
  }

  // Step 3: Complete failure — flag
  stats.flagged = 1;
  stats.total = 1;
  return {
    pages: [{
      page: 1,
      text: '',
      method: 'flagged',
      needs_manual_transcription: true,
      note: 'Could not extract text via pdf-parse or OCR',
    }],
    stats,
  };
}

export async function destroyOcrWorker() {
  if (ocrWorker) {
    await ocrWorker.terminate();
    ocrWorker = null;
  }
}

function cleanText(raw) {
  if (!raw) return '';
  return raw
    .replace(/\r\n/g, '\n').replace(/\r/g, '\n')
    .replace(/\n{4,}/g, '\n\n\n')
    .replace(/\f/g, '')
    .split('\n')
    .map(l => l.trimEnd())
    .filter(l => {
      const t = l.trim();
      if (/^_{3,}$/.test(t)) return false;
      if (/^\d+$/.test(t) && t.length <= 4) return false;
      return true;
    })
    .join('\n')
    .trim();
}
