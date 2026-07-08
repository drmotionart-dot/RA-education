/**
 * Split extracted book text into logical segments by detecting chapter/section headings.
 * Independent module — no dependency on extraction or taxonomy logic.
 */

const HEADING_PATTERNS = [
  // All-caps line of 4+ chars (may include digits)
  (t) => /^[A-Z\u0600-\u06FF0-9][A-Z\u0600-\u06FF0-9\s\-]{3,}$/.test(t),
  // "Chapter N", "Section N", "Part N", etc.
  (t) => /^(Chapter|CHAPTER|Section|SECTION|Module|MODULE|Part|PART)\s+\d+/i.test(t),
  // Numbered heading: "1. Title" or "1) Title"
  (t) => /^\d+[\.\)\-\s]\s+[A-Z\u0600-\u06FF]/.test(t),
  // Arabic numbered: "١. العنوان"
  (t) => /^[\u0660-\u0669]+[\.\)\-\s]\s+\S/.test(t),
];

function isHeading(line) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.length < 4) return false;
  for (const testFn of HEADING_PATTERNS) {
    if (testFn(trimmed)) return true;
  }
  return false;
}

/**
 * Split pages into segments by detected headings.
 *
 * @param {{ page: number, text: string }[]} pages
 * @returns {{ heading: string, text: string, start_page: number, end_page: number }[]}
 */
export function segmentByHeadings(pages) {
  if (!pages || pages.length === 0) return [];

  const segments = [];
  let currentHeading = 'Introduction';
  let currentText = '';
  let currentStartPage = pages[0]?.page || 1;
  let headingFound = false;

  for (const page of pages) {
    const lines = page.text.split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;

      if (isHeading(line)) {
        const hasAccumulatedContent = currentText.replace(/\n+/g, ' ').trim().length > 200;

        if (headingFound && hasAccumulatedContent) {
          segments.push({
            heading: currentHeading,
            text: currentText.trim(),
            start_page: currentStartPage,
            end_page: page.page,
          });
        }

        currentHeading = trimmed;
        currentText = '';
        currentStartPage = page.page;
        headingFound = true;
        continue;
      }

      currentText += line + '\n';
    }
  }

  // Flush final segment
  if (headingFound && currentText.trim().length >= 200) {
    segments.push({
      heading: currentHeading,
      text: currentText.trim(),
      start_page: currentStartPage,
      end_page: pages[pages.length - 1]?.page || currentStartPage,
    });
  } else if (!headingFound && currentText.trim().length >= 200) {
    segments.push({
      heading: 'Entire Book',
      text: currentText.trim(),
      start_page: pages[0]?.page || 1,
      end_page: pages[pages.length - 1]?.page || 1,
    });
  }

  return segments;
}
