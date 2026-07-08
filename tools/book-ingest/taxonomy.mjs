import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const SPECIALTIES_PATH = resolve(__dirname, '../../backend/seed/specialties.js');

/** Branches that already have lesson content in lessons.js */
const BRANCHES_WITH_LESSONS = new Set([
  'Colorectal Surgery',
  'Hepatobiliary Surgery',
  'Interventional Cardiology',
  'Electrophysiology',
  'Heart Failure',
  'Adult ICU',
  'Neonatal ICU',
  'General Pediatrics',
  'Pediatric Oncology',
]);

/**
 * Load and parse specialties.js into a structured taxonomy.
 * Returns { doctor: { SpecialtyName: [BranchName, ...], ... }, nurse: { ... } }
 */
function loadTaxonomy() {
  const code = readFileSync(SPECIALTIES_PATH, 'utf-8');
  // Safe eval — specialties.js is a pure data file with no side effects
  const specialties = eval(code.replace('export const specialties = ', ''));
  const taxonomy = { doctor: {}, nurse: {} };
  for (const s of specialties) {
    const cat = s.category;
    if (!taxonomy[cat]) continue;
    taxonomy[cat][s.name] = (s.branches || []).map(b => b.name);
  }
  return taxonomy;
}

/**
 * Validate a (specialty, branch) pair against the taxonomy.
 * Returns { valid: boolean, category: string|null, error: string|null }
 */
function validateBranch(specialty, branch) {
  const tax = loadTaxonomy();
  for (const [cat, specs] of Object.entries(tax)) {
    const branches = specs[specialty];
    if (branches) {
      if (branches.includes(branch)) {
        return { valid: true, category: cat, error: null };
      }
      return { valid: false, category: null, error: `Branch "${branch}" not found in specialty "${specialty}". Valid branches: ${branches.join(', ')}` };
    }
  }
  return { valid: false, category: null, error: `Specialty "${specialty}" not found. Must be one of the ${Object.keys(tax.doctor).length + Object.keys(tax.nurse).length} known specialties.` };
}

// ── Medical Roots Dictionary ──

const MEDICAL_ROOTS = [
  { root: 'cardio', pattern: /cardio|cardiac|coronary|heart|myocard|pericard|endocard|angiograph/i },
  { root: 'neuro', pattern: /neuro|brain|cerebr|spine|spinal|epilepsy|stroke|cva|seizure|headache|migraine|dementia|alzheimer|parkinson|ms\smultiple/i },
  { root: 'pulmo', pattern: /pulmo|respir|lung|ventilat|oxygen|pneumo|pleur|pft|spiromet|bronch/i },
  { root: 'sleep', pattern: /sleep|apnea|insomnia|polysomnograph|cpap|bipap/i },
  { root: 'gastro', pattern: /gastro|intestinal|colon|colorect|diverticul|anorect|endoscop|stomach|esophag|duoden|ileum|cecum|appendix|hernia|bowel|fistula/i },
  { root: 'hepato', pattern: /hepato|liver|biliary|pancrea|whipple|cholecyst|jaundice|cirrhosis|portal|bilirubin/i },
  { root: 'neonat', pattern: /neonat|newborn|preterm|prematur|nrp|bilirubin|jaundice|surfactant|gestation|nascal/i },
  { root: 'pediatr', pattern: /pediatr|child|children|adolescent|immunization|vaccine|infant|toddler|school\sage/i },
  { root: 'ortho', pattern: /ortho|spine|joint|arthroplast|arthroscop|fracture|bone|musculoskelet|osteopor|ligament|tendon|cartilage/i },
  { root: 'rehab', pattern: /rehab|physiatr|spinal\scord\sinj|occupational\stherap|physical\stherap|functional|mobil/i },
  { root: 'sport', pattern: /sport|exercise|athlet|fitness|ergogenic|doping|concussion/i },
  { root: 'ophthal', pattern: /ophthal|eye|retina|cataract|vitreous|refractiv|cornea|glaucoma|iris|lens|fundus|optic/i },
  { root: 'derm', pattern: /derm|skin|rash|lesion|melanoma|psoriasis|eczema|acne|warts|biopsy\sskin/i },
  { root: 'onc', pattern: /oncolog|cancer|tumor|neoplasm|chemotherap|malignan|leukemia|lymphoma|sarcoma|blastoma|metasta|carcinom|radioth|immunother/i },
  { root: 'hemato', pattern: /hematolog|blood|anemia|coagulopath|transfusion|phlebotom|hemoglobin|platelet|leukocyt|erythrocyt|plasma|serum/i },
  { root: 'nephro', pattern: /nephro|renal|kidney|dialysis|glomerul|creatinine|uria|nephr|pyeloneph/i },
  { root: 'dialys', pattern: /dialys|hemodialys|peritoneal\sdialys|av\sfistula|access\srecirc|ultrafiltrat/i },
  { root: 'transplant', pattern: /transplant|rejection|immunosuppress|graft|donor|recipient|allograft/i },
  { root: 'endocrine', pattern: /endocrine|diabet|thyroid|pituitar|hormone|metabol|insulin|glucose|adrenal|parathyroid|gonad|menopaus/i },
  { root: 'psych', pattern: /psychiatr|mental|addiction|behavio|depression|anxiety|schizophrenia|bipolar|ocd|ptsd|psychos/i },
  { root: 'radi', pattern: /radiolog|radiograph|ct\sscan|mri|ultrasound|fluoroscop|mammograph|nuclear\smed|pet|spect|interventional\sradiolog/i },
  { root: 'patho', pattern: /patholog|histolog|biopsy|cytolog|autopsy|forens|stain|section|specimen|gross|microscop/i },
  { root: 'anesth', pattern: /anesth|anesthe|pain|analgesi|block|epidural|spinal\sanesth|sedation|neuromusc|paralytic|intubat/i },
  { root: 'critic', pattern: /critic|icu|intensiv|sepsis|septic|vasopressor|resuscit|multi-organ|sirs|mods|apache/i },
  { root: 'emerg', pattern: /emerg|trauma|resuscit|triage|fast\strack|code\sblue|advanced\scardiac\slife|acls|atls|disaster/i },
  { root: 'obstetr', pattern: /obstetr|pregnan|maternal|fetal|intrapartum|postpartum|labor|delivery|midwi|antenatal|prenatal|peripartum|perinatal/i },
  { root: 'gynec', pattern: /gynecolog|ovarian|uterus|cervi|endometr|vaginal|vulvar|pap\ssmear|colposcop|hysterectom|salping/i },
  { root: 'geriatr', pattern: /geriatr|elder|old\sage|long\sterm\scare|skilled\snurs|frail|fall\sprevent|polypharm/i },
  { root: 'urolog', pattern: /urolog|prostat|bladder|ureter|urethra|stone|endourolog|incontine|urinary|void|psa|turb/i },
  { root: 'rheum', pattern: /rheum|arthrit|autoimmun|connective\stissue|vasculitis|gout|sle|lupus|scleroderma|inflammatory\sjoint|sjogren/i },
  { root: 'immuno', pattern: /immun|allerg|asthma|rhinitis|immunodeficien|anaphylax|hives|angioedema|atop/i },
  { root: 'surg', pattern: /surg|operat|laparoscop|incision|resection|anastomos|excis|dissect|retract|cauter|wound\sclosure/i },
  { root: 'infect', pattern: /infect|antimicrob|outbreak|surveill|isolation|steril|hosp\sacquir|hand\shygiene|ppe|nosocomial|antibiot/i },
  { root: 'nurs', pattern: /nurs|care\splan|patient\sassess|clinical\sinstruct|simulation|skills\slab|charge\snurs|staff|bedside/i },
  { root: 'quality', pattern: /quality|accredit|patient\ssafety|risk\smanag|audit|indicator|benchmark|never\sevent|sentinel/i },
  { root: 'informatic', pattern: /informatic|data\sanalytic|clinical\sdecision|heatlh\sit|ehr|emr|electronic\shealth|interoperab/i },
  { root: 'admin', pattern: /admin|director|manag|leadership|operat|govern|strateg|budget|human\sresource|policymak|polic\sprocedur/i },
  { root: 'forens', pattern: /forens|medicolegal|autopsy|underwrit|claims|litigat|testimony|expert\switness|chain\sof\scustody/i },
  { root: 'occupat', pattern: /occupat|workplace|employee|environmental|hearing\sloss|ergonom|exposure|chemical|safety|hazmat|fit\sfor\swork/i },
  { root: 'public', pattern: /public\shealth|epidemiolog|disease\ssurveill|health\spromot|biostatist|populat|screening|prevent|health\spolic/i },
];

// ── Stopwords ──

const STOPWORDS = new Set([
  'this', 'that', 'with', 'from', 'have', 'been', 'into', 'over', 'your', 'which',
  'what', 'were', 'when', 'where', 'more', 'some', 'such', 'only', 'than', 'then',
  'also', 'very', 'just', 'about', 'should', 'could', 'would', 'after', 'before',
  'between', 'other', 'while', 'because', 'through', 'during', 'without', 'within',
  'across', 'around', 'among', 'along', 'there', 'these', 'those', 'each', 'every',
  'both', 'much', 'many', 'most', 'few', 'own', 'same', 'another', 'here', 'above',
  'below', 'down', 'up', 'out', 'off', 'over', 'under', 'again', 'further', 'once',
  'then', 'them', 'they', 'their', 'than', 'this', 'that', 'was', 'had', 'has',
  'can', 'may', 'will', 'shall', 'must', 'need', 'able', 'able', 'upon', 'onto',
  'into', 'see', 'fig', 'figure', 'page', 'table', 'data', 'show', 'shown',
  'using', 'used', 'based', 'case', 'study', 'result', 'method', 'patient',
  'clinical', 'treatment', 'may', 'also', 'review', 'report', 'include',
]);

// ── Branch Keyword Index ──

function keywordify(text) {
  return [...new Set(
    text.toLowerCase()
      .replace(/[^a-z\s]/g, '')
      .split(/\s+/)
      .filter(w => w.length > 3 && !STOPWORDS.has(w))
  )];
}

function buildBranchIndex() {
  const tax = loadTaxonomy();
  const index = new Map();
  for (const [cat, specs] of Object.entries(tax)) {
    for (const [specialty, branches] of Object.entries(specs)) {
      for (const branch of branches) {
        const corpus = `${branch} ${specialty} ${cat}`;
        const keywords = keywordify(corpus);
        // Store which MEDICAL_ROOTS patterns could match this branch
        const rootPatterns = []; // { root, pattern }
        for (const mr of MEDICAL_ROOTS) {
          if (mr.pattern.test(corpus)) {
            rootPatterns.push({ root: mr.root, pattern: mr.pattern });
          }
        }
        index.set(branch, { category: cat, specialty, keywords, rootPatterns });
      }
    }
  }
  return index;
}

const BRANCH_INDEX = buildBranchIndex();

/**
 * Classify a block of text against all 150 branches using keyword overlap + medical root matching.
 *
 * @param {string} text
 * @param {number} topN — Number of top results to return (default 3)
 * @returns {Array<{ branch: string, specialty: string, category: string, score: number, keyword_matches: string[], root_matches: string[] }>}
 */
function classifyText(text, topN = 3) {
  const tokens = keywordify(text);
  if (tokens.length < 3) return [];

  const textSet = new Set(tokens);
  const results = [];

  for (const [branchName, info] of BRANCH_INDEX) {
    const { keywords, rootPatterns, specialty, category } = info;

    // Keyword overlap (40% weight)
    const keywordHits = keywords.filter(k => textSet.has(k));
    const keywordScore = keywords.length > 0 ? keywordHits.length / keywords.length : 0;

    // Medical root match (60% weight) — use full regex patterns against the text
    let rootMatchCount = 0;
    const matchedRoots = [];
    for (const rp of rootPatterns) {
      if (rp.pattern.test(text)) {
        rootMatchCount++;
        matchedRoots.push(rp.root);
      }
    }
    const normalizedRootScore = Math.min(rootMatchCount / 3, 1);

    // Combined
    const score = keywordScore * 0.4 + normalizedRootScore * 0.6;

    if (keywordHits.length < 1 && matchedRoots.length < 1) continue;
    if (score < 0.05) continue;

    results.push({
      branch: branchName,
      specialty,
      category,
      score: Math.round(score * 100) / 100,
      keyword_matches: keywordHits.slice(0, 5),
      root_matches: matchedRoots.slice(0, 3),
    });
  }

  results.sort((a, b) => b.score - a.score);
  return results.slice(0, topN);
}

/**
 * Get all branch names across all specialties (flat list of 150).
 */
function getAllBranches() {
  const tax = loadTaxonomy();
  const all = [];
  for (const specs of Object.values(tax)) {
    for (const branches of Object.values(specs)) {
      all.push(...branches);
    }
  }
  return all;
}

/**
 * Check if a branch already has lesson content.
 */
function hasExistingContent(branchName) {
  return BRANCHES_WITH_LESSONS.has(branchName);
}

/**
 * Get all branches that need lesson titles (no content yet).
 */
function getEmptyBranches() {
  const tax = loadTaxonomy();
  const empty = [];
  for (const [cat, specs] of Object.entries(tax)) {
    for (const [specialty, branches] of Object.entries(specs)) {
      for (const branch of branches) {
        if (!BRANCHES_WITH_LESSONS.has(branch)) {
          empty.push({ category: cat, specialty, branch });
        }
      }
    }
  }
  return empty;
}

export {
  loadTaxonomy,
  validateBranch,
  getAllBranches,
  hasExistingContent,
  getEmptyBranches,
  BRANCHES_WITH_LESSONS,
  MEDICAL_ROOTS,
  classifyText,
};
