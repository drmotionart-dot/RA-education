# Book Ingestion CLI

Standalone tool to extract text from medical PDFs, map content to branches in the
RA Education taxonomy (150 branches), and commit approved lessons to the seed database.

## Doctor's Workflow

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐     ┌──────────────┐
│  1. Fill    │ ──→ │  2. Run      │ ──→ │  3. Review   │ ──→ │  4. Commit   │
│  manifest   │     │  extract     │     │  JSON in     │     │  approved    │
│  CSV        │     │              │     │  text editor │     │  entries     │
└─────────────┘     └──────────────┘     └─────────────┘     └──────────────┘
                                                                     │
                                                                     ▼
                                                              ┌──────────────┐
                                                              │  5. npm run   │
                                                              │  seed         │
                                                              └──────────────┘
```

## Setup

```bash
cd tools/book-ingest
npm install
```

## Step 1: Prepare the Manifest CSV

Create a CSV with exactly 3 columns (no header — or skip header row):

```
filename,specialty,branch
schwartz-surgery.pdf,General Surgery,Colorectal Surgery
ahmed-icu.pdf,ICU / Critical Care Nursing,Adult ICU
...
```

- `filename`: must match the PDF file name in your folder (case-sensitive)
- `specialty`: must match a specialty name in `backend/seed/specialties.js`
- `branch`: must match a branch name under that specialty

Validate the CSV before processing:

```bash
node index.mjs validate --manifest path/to/manifest.csv
```

## Step 2: Extract Text and Generate Review

```bash
node index.mjs extract --folder path/to/pdfs/ --manifest path/to/manifest.csv --out reviews/
```

- Extracts text from each PDF using `pdf-parse` (for born-digital PDFs)
- Falls back to `tesseract.js` (eng+ara) for scanned pages
- Generates `reviews/review_TIMESTAMP.json` with proposed lesson titles

Output: one JSON file per batch. Each entry has `approved: null`.

## Step 3: Human Review

Open the generated `review_TIMESTAMP.json` in a text editor (VS Code, Notepad++).

For each entry:

1. Set `approved: true` (accept) or `false` (discard)
2. Edit proposed lesson titles/descriptions as needed
3. Add `"written_lesson": "Full text from book..."` to any lesson where you want the extracted book content stored directly
4. For entries with `needs_manual_transcription: true`, manually transcribe the flagged pages (the raw OCR output is in `text`, use it as a starting point)

## Step 4: Commit to Database

```bash
# See what would change:
node index.mjs commit --review reviews/review_TIMESTAMP.json --dry-run

# Actually commit:
node index.mjs commit --review reviews/review_TIMESTAMP.json
```

This appends to `backend/seed/lessons.js`. No duplicates by title+branch.

## Step 5: Seed

```bash
cd backend
npm run seed
```

## Architecture

```
tools/book-ingest/
├── index.mjs       — CLI entry point
├── taxonomy.mjs    — 150-branch taxonomy parser (reads specialties.js)
├── extract.mjs     — PDF text extraction (pdf-parse → tesseract.js fallback)
├── proposer.mjs    — Chapter→lesson mapping and title proposal
├── output.mjs      — Review JSON writer/parser
├── commit.mjs      — Append approved entries to lessons.js
├── package.json    — Dependencies: pdf-parse, tesseract.js
├── pages/          — Page images saved here when OCR confidence is low
├── reviews/        — Generated review files
└── README.md
```

### Key Decisions

- **Zero API costs**: `pdf-parse` + `tesseract.js` are 100% free, offline after initial model download
- **No schema changes to existing models** except one field: `written_lesson: String` on the Lesson model
- **Dedup by branch_name + title**: prevents duplicate lessons across multiple runs
- **Human-in-the-loop**: review JSON is plain text, edited in any editor, then committed
- **Standalone tool**: own `package.json`, no changes to backend/frontend runtime

### Per-Page Image Extraction (Phase 2)

The current `extract.mjs` handles whole-PDF extraction. For per-page image rendering
and OCR, a future enhancement could add `pdfjs-dist` + `canvas` to render each page
as an image and run per-page OCR, saving failing pages to `pages/` for manual review.
