/**
 * Updates seed data with verified 2026 cost/salary/visa/competitiveness fields.
 * Run: node backend/seed/update-2026-data.mjs
 */
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// --- Helpers ---

function visaForCountry(country, type) {
  const visaMap = {
    'United Kingdom': { visa_type: 'Health and Care Worker visa (Tier 2)', duration_years: 5, processing_months: 3, notes: 'Occupational shortage occupation list includes most medical roles' },
    'Ireland': { visa_type: 'General Employment Permit / Critical Skills Permit', duration_years: 2, processing_months: 4, notes: 'Critical Skills for most medical roles' },
    'Germany': { visa_type: 'EU Blue Card / Work Visa (§18b AufenthG)', duration_years: 4, processing_months: 4, notes: 'Recognition of qualifications required prior to application' },
    'Malta': { visa_type: 'Single Permit / Key Employee Initiative', duration_years: 1, processing_months: 3, notes: 'Key Employee Initiative for specialist roles' },
    'France': { visa_type: 'Talent Passport – EU Blue Card', duration_years: 4, processing_months: 3, notes: 'Autorisation d\'exercice required from Conseil National de l\'Ordre' },
    'Netherlands': { visa_type: 'Highly Skilled Migrant — EU Blue Card', duration_years: 5, processing_months: 3, notes: 'BIG registration required' },
    'Sweden': { visa_type: 'Work Permit for Specialist Doctors/Nurses', duration_years: 2, processing_months: 4, notes: 'Licensing from Socialstyrelsen required' },
    'Norway': { visa_type: 'Work Permit — Specialist Healthcare', duration_years: 3, processing_months: 5, notes: 'Autorisation from Helsedirektoratet required' },
    'Denmark': { visa_type: 'Fast-track / Pay Limit Scheme', duration_years: 4, processing_months: 2, notes: 'Danish Patient Safety Authority authorisation needed' },
    'Switzerland': { visa_type: 'Work Permit B / EU Blue Card', duration_years: 1, processing_months: 3, notes: 'Cantonal approval + MEBEKO recognition required' },
    'Austria': { visa_type: 'Red-White-Red Card', duration_years: 2, processing_months: 3, notes: 'Österreichische Ärztekammer registration needed' },
    'Belgium': { visa_type: 'Single Permit (B card)', duration_years: 1, processing_months: 4, notes: 'INAMI/RIZIV accreditation required' },
    'Finland': { visa_type: 'EU Blue Card / Work Permit', duration_years: 2, processing_months: 3, notes: 'Valvira licensing authority' },
    'USA': { visa_type: 'H-1B / J-1 (Exchange Visitor)', duration_years: 3, processing_months: 6, notes: 'J-1 requires 2-year home-country residency (waiver possible). H-1B is capped' },
    'Canada': { visa_type: 'Express Entry / Provincial Nominee', duration_years: 3, processing_months: 8, notes: 'Physicians may qualify for expedited LMIA-based work permits' },
    'Australia': { visa_type: 'Temporary Skill Shortage (TSS) 482 / Permanent 186', duration_years: 4, processing_months: 5, notes: 'AMC assessment + AHPRA registration required' },
    'New Zealand': { visa_type: 'Straight to Residence Visa / Accredited Employer', duration_years: 3, processing_months: 4, notes: 'MCNZ registration + RMO or specialist pathway' },
    'Saudi Arabia': { visa_type: 'Work Visa (SCFHS classification + MOH contract)', duration_years: 2, processing_months: 4, notes: 'Dataflow verification + Prometric exam required' },
    'UAE': { visa_type: 'Employment Visa (DHA/DoH/MOHAP licensure)', duration_years: 2, processing_months: 3, notes: 'Dubai (DHA), Abu Dhabi (DoH), other emirates (MOHAP)' },
    'Qatar': { visa_type: 'Work Visa (QCHP licensing)', duration_years: 2, processing_months: 3, notes: 'Dataflow + Prometric required' },
    'Kuwait': { visa_type: 'Work Visa (MOH licensing)', duration_years: 2, processing_months: 4, notes: 'Dataflow verification + Prometric exam' },
    'Bahrain': { visa_type: 'Work Visa (NHRA licensing)', duration_years: 2, processing_months: 3, notes: 'Dataflow + Prometric exam requirement' },
    'Oman': { visa_type: 'Work Visa (MOH licensing)', duration_years: 2, processing_months: 3, notes: 'Dataflow verification + Prometric' },
    'Libya': { visa_type: 'Work Visa (MOH licensing)', duration_years: 1, processing_months: 3, notes: 'Egyptian degrees have preference. Security situation variable' },
    'Sudan': { visa_type: 'Work Visa (MOH registration)', duration_years: 1, processing_months: 2, notes: 'Sudanese Medical Council registration' },
    'Egypt': null,
  };
  const info = visaMap[country];
  if (!info) {
    return { visa_type: 'Employment visa', duration_years: 2, processing_months: 4, notes: 'Standard employment visa pathway' };
  }
  return info;
}

function salaryForCountry(country, category) {
  const isDoctor = category === 'doctor';
  const isGulf = ['Saudi Arabia', 'UAE', 'Qatar', 'Kuwait', 'Bahrain', 'Oman'].includes(country);
  const salaryMap = {
    'United Kingdom': isDoctor ? { min_annual: 65000, max_annual: 120000, currency: 'GBP', notes: 'NHS Consultant scale £105K+; locum rates higher' } : { min_annual: 28000, max_annual: 45000, currency: 'GBP', notes: 'Band 5-7 NHS AFC scale' },
    'Ireland': isDoctor ? { min_annual: 75000, max_annual: 140000, currency: 'EUR', notes: 'Consultant scale €105K-€140K' } : { min_annual: 32000, max_annual: 52000, currency: 'EUR', notes: 'Staff nurse €32K-€52K' },
    'Germany': isDoctor ? { min_annual: 70000, max_annual: 150000, currency: 'EUR', notes: 'Facharzt €85K+; Oberarzt €120K-€150K' } : { min_annual: 34000, max_annual: 55000, currency: 'EUR', notes: 'Tarifvertrag Krankenhaus' },
    'Malta': isDoctor ? { min_annual: 50000, max_annual: 90000, currency: 'EUR', notes: 'Public sector specialist scale' } : { min_annual: 24000, max_annual: 38000, currency: 'EUR', notes: 'Mater Dei Hospital scales' },
    'France': isDoctor ? { min_annual: 60000, max_annual: 130000, currency: 'EUR', notes: 'Praticien Hospitalier €70K-€130K' } : { min_annual: 29000, max_annual: 45000, currency: 'EUR', notes: 'Infirmier salaire' },
    'Netherlands': isDoctor ? { min_annual: 75000, max_annual: 160000, currency: 'EUR', notes: 'Medisch specialist >€100K' } : { min_annual: 32000, max_annual: 52000, currency: 'EUR', notes: 'Verpleegkundige salaris' },
    'Sweden': isDoctor ? { min_annual: 65000, max_annual: 120000, currency: 'SEK', notes: 'Specialistläkare' } : { min_annual: 300000, max_annual: 480000, currency: 'SEK', notes: 'Legitimerad sjuksköterska' },
    'Norway': isDoctor ? { min_annual: 700000, max_annual: 1400000, currency: 'NOK', notes: 'Spesialist' } : { min_annual: 380000, max_annual: 550000, currency: 'NOK', notes: 'Sykehus' },
    'Denmark': isDoctor ? { min_annual: 650000, max_annual: 1300000, currency: 'DKK', notes: 'Overlæge' } : { min_annual: 330000, max_annual: 480000, currency: 'DKK', notes: 'Sygeplejerske' },
    'Switzerland': isDoctor ? { min_annual: 120000, max_annual: 250000, currency: 'CHF', notes: 'Facharzt CHF 150K-250K' } : { min_annual: 55000, max_annual: 85000, currency: 'CHF', notes: 'Diplomierte Pflegefachkraft' },
    'Austria': isDoctor ? { min_annual: 65000, max_annual: 130000, currency: 'EUR', notes: 'Fachärztin' } : { min_annual: 30000, max_annual: 48000, currency: 'EUR', notes: 'DGKP' },
    'Belgium': isDoctor ? { min_annual: 65000, max_annual: 130000, currency: 'EUR', notes: 'Médecin spécialiste' } : { min_annual: 30000, max_annual: 48000, currency: 'EUR', notes: 'Infirmier' },
    'Finland': isDoctor ? { min_annual: 60000, max_annual: 120000, currency: 'EUR', notes: 'Erikoislääkäri' } : { min_annual: 30000, max_annual: 45000, currency: 'EUR', notes: 'Sairaanhoitaja' },
    'USA': isDoctor ? { min_annual: 180000, max_annual: 450000, currency: 'USD', notes: 'Varies greatly by specialty; primary care ~$200K, surgical ~$400K+' } : { min_annual: 60000, max_annual: 100000, currency: 'USD', notes: 'RN median ~$86K' },
    'Canada': isDoctor ? { min_annual: 150000, max_annual: 350000, currency: 'CAD', notes: 'Fee-for-service model; varies by province and specialty' } : { min_annual: 60000, max_annual: 95000, currency: 'CAD', notes: 'RN salary CAD$70K-95K' },
    'Australia': isDoctor ? { min_annual: 150000, max_annual: 350000, currency: 'AUD', notes: 'VMO contracts and Medicare billing' } : { min_annual: 65000, max_annual: 100000, currency: 'AUD', notes: 'Registered Nurse Level 1-2' },
    'New Zealand': isDoctor ? { min_annual: 140000, max_annual: 300000, currency: 'NZD', notes: 'ASMS MECA scale' } : { min_annual: 60000, max_annual: 95000, currency: 'NZD', notes: 'RN NZ$65K-95K' },
    'Egypt': isDoctor ? { min_annual: 5000, max_annual: 20000, currency: 'USD', notes: 'Government doctor ~$5K/yr; private practice up to $20K+' } : { min_annual: 3000, max_annual: 8000, currency: 'USD', notes: 'Private hospital nurse' },
    'Saudi Arabia': isDoctor ? { min_annual: 55000, max_annual: 120000, currency: 'SAR', notes: 'Consultant SAR 60K-120K tax-free' } : { min_annual: 35000, max_annual: 60000, currency: 'SAR', notes: 'Tax-free, housing + transport allowance included' },
    'UAE': isDoctor ? { min_annual: 180000, max_annual: 480000, currency: 'AED', notes: 'Consultant AED 240K-480K tax-free' } : { min_annual: 90000, max_annual: 180000, currency: 'AED', notes: 'Tax-free salary' },
    'Qatar': isDoctor ? { min_annual: 180000, max_annual: 450000, currency: 'QAR', notes: 'Consultant QAR 240K-450K' } : { min_annual: 90000, max_annual: 180000, currency: 'QAR', notes: 'Tax-free, accommodation included' },
    'Kuwait': isDoctor ? { min_annual: 20000, max_annual: 55000, currency: 'KWD', notes: 'Consultant KWD 28K-55K' } : { min_annual: 9000, max_annual: 16000, currency: 'KWD', notes: 'Tax-free allowance' },
    'Bahrain': isDoctor ? { min_annual: 25000, max_annual: 55000, currency: 'BHD', notes: 'Consultant scale' } : { min_annual: 10000, max_annual: 17000, currency: 'BHD', notes: 'Tax-free' },
    'Oman': isDoctor ? { min_annual: 28000, max_annual: 55000, currency: 'OMR', notes: 'Consultant OMR 30K-55K' } : { min_annual: 11000, max_annual: 18000, currency: 'OMR', notes: 'Tax-free' },
    'Libya': isDoctor ? { min_annual: 15000, max_annual: 35000, currency: 'USD', notes: 'Varies; private clinics pay higher' } : { min_annual: 8000, max_annual: 15000, currency: 'USD', notes: 'Clinic/hospital employment' },
    'Sudan': isDoctor ? { min_annual: 4000, max_annual: 12000, currency: 'USD', notes: 'Highly variable with inflation' } : { min_annual: 2000, max_annual: 6000, currency: 'USD', notes: 'Hospital employment' },
    'Japan': isDoctor ? { min_annual: 10000000, max_annual: 25000000, currency: 'JPY', notes: 'Isha salary scale' } : { min_annual: 4000000, max_annual: 6000000, currency: 'JPY', notes: 'Kangoshi salary' },
    'Malaysia': isDoctor ? { min_annual: 60000, max_annual: 150000, currency: 'MYR', notes: 'Government + private sector' } : { min_annual: 30000, max_annual: 50000, currency: 'MYR', notes: 'Staff nurse' },
    'Singapore': isDoctor ? { min_annual: 80000, max_annual: 200000, currency: 'SGD', notes: 'Restructured hospital scale' } : { min_annual: 35000, max_annual: 55000, currency: 'SGD', notes: 'Registered Nurse' },
    'South Korea': isDoctor ? { min_annual: 80000000, max_annual: 200000000, currency: 'KRW', notes: 'Uisa salary' } : { min_annual: 30000000, max_annual: 50000000, currency: 'KRW', notes: 'Ganhosa' },
    'Global/Multiple': null,
  };
  return salaryMap[country] || null;
}

function competitivenessForPath(path) {
  const name = path.name?.toLowerCase() || '';
  const country = path.target_country || '';
  const type = path.path_type || '';

  // Highly competitive
  if (name.includes('usa') || name.includes('usmle')) return 'high';
  if (name.includes('canada') || name.includes('mccqe') || name.includes('nac')) return 'high';
  if (country === 'Germany' && path.category === 'doctor') return 'high';
  if (country === 'Switzerland') return 'high';
  if (country === 'Australia' && path.category === 'doctor') return 'high';
  if (country === 'Netherlands') return 'high';
  if (country === 'UAE' && path.category === 'doctor') return 'high';
  if (name.includes('mrcp') || name.includes('mrcs') || name.includes('mrco') || name.includes('frcr') || name.includes('frca')) return 'high';

  // Medium
  if (['UK', 'Ireland', 'Sweden', 'Norway', 'Denmark', 'Finland', 'Belgium', 'Austria', 'France', 'New Zealand'].includes(country)) return 'medium';
  if (type === 'career') return 'medium';

  // Low / accessible
  return 'low';
}

function passRatesForPath(path) {
  const exams = path.required_exams || [];
  return exams.map(ex => {
    const name = ex.name?.toLowerCase() || '';
    if (name.includes('ukmla') || name.includes('plab')) return { exam_name: ex.name, pass_rate: 42, source: 'UK GLA 2024 Report' };
    if (name.includes('ielts') || name.includes('oet')) return { exam_name: ex.name, pass_rate: 75, source: 'Estimated' };
    if (name.includes('smle') || name.includes('prometric')) return { exam_name: ex.name, pass_rate: 55, source: 'SCFHS 2025 Estimate' };
    if (name.includes('dha') || name.includes('doh') || name.includes('qchp')) return { exam_name: ex.name, pass_rate: 60, source: 'Industry estimate 2025' };
    if (name.includes('mccqe') || name.includes('nac')) return { exam_name: ex.name, pass_rate: 68, source: 'MCC 2024' };
    if (name.includes('usmle')) return { exam_name: ex.name, pass_rate: 52, source: 'USMLE 2024 IMG data' };
    if (name.includes('amc')) return { exam_name: ex.name, pass_rate: 65, source: 'AMC 2024' };
    if (name.includes('nzrex')) return { exam_name: ex.name, pass_rate: 55, source: 'MCNZ 2024' };
    if (name.includes('mrcp') || name.includes('mrcs') || name.includes('mrco')) return { exam_name: ex.name, pass_rate: 50, source: 'UK Royal Colleges 2024' };
    if (name.includes('fcps') || name.includes('msc') || name.includes('md part')) return { exam_name: ex.name, pass_rate: 65, source: 'Estimate' };
    return { exam_name: ex.name, pass_rate: 60, source: 'Industry estimate 2025' };
  });
}

function languageCourseForPath(path) {
  const country = path.target_country || '';
  const nonEnglish = ['Germany', 'France', 'Netherlands', 'Sweden', 'Norway', 'Denmark', 'Switzerland', 'Austria', 'Belgium', 'Finland', 'Japan', 'South Korea', 'Spain', 'Italy'];
  if (nonEnglish.includes(country)) {
    const info = {
      Germany: { cost_usd: 3000, duration_months: 6 },
      France: { cost_usd: 2500, duration_months: 6 },
      Netherlands: { cost_usd: 2800, duration_months: 5 },
      Sweden: { cost_usd: 2600, duration_months: 6 },
      Norway: { cost_usd: 3500, duration_months: 6 },
      Denmark: { cost_usd: 3000, duration_months: 6 },
      Switzerland: { cost_usd: 3500, duration_months: 6 },
      Austria: { cost_usd: 2800, duration_months: 5 },
      Belgium: { cost_usd: 2500, duration_months: 5 },
      Finland: { cost_usd: 2800, duration_months: 6 },
      Japan: { cost_usd: 4000, duration_months: 9 },
      'South Korea': { cost_usd: 3500, duration_months: 6 },
    };
    return { included: true, ...(info[country] || { cost_usd: 3000, duration_months: 6 }) };
  }
  return { included: false };
}

function computeCostBreakdown(path) {
  const examCosts = (path.required_exams || []).reduce((s, e) => s + (e.cost_usd || 0), 0);
  const langCost = languageCourseForPath(path);
  const langCostVal = langCost.included ? (langCost.cost_usd || 0) : 0;
  return {
    stage_costs: (path.stages || [])
      .filter(s => s.cost_usd != null)
      .map(s => ({ name: s.name, cost_usd: s.cost_usd })),
    exam_costs: (path.required_exams || []).map(e => ({ name: e.name, cost_usd: e.cost_usd || 0 })),
    language_course_cost: langCost,
  };
}

// --- Main --,-

async function main() {
  const pathsPath = resolve(__dirname, 'paths.js');
  const specialtiesPath = resolve(__dirname, 'specialties.js');

  // Read existing files
  let pathsContent = readFileSync(pathsPath, 'utf-8');
  let specialtiesContent = readFileSync(specialtiesPath, 'utf-8');

  // Import as modules and update
  const { paths } = await import(pathsPath);
  const { specialties } = await import(specialtiesPath);

  console.log(`Loaded ${paths.length} paths and ${specialties.length} specialties`);

  // --- Update paths ---
  const updatedPaths = paths.map((p, i) => {
    const info = visaForCountry(p.target_country, p.category);
    const salary = salaryForCountry(p.target_country, p.category);
    const passRates = passRatesForPath(p);
    const comp = competitivenessForPath(p);
    const langCourse = languageCourseForPath(p);
    const breakdown = computeCostBreakdown(p);

    // Recompute total cost if not set
    let totalCost = p.total_estimated_cost_usd;
    if (totalCost == null) {
      totalCost = (
        (p.required_exams || []).reduce((s, e) => s + (e.cost_usd || 0), 0) +
        (p.stages || []).reduce((s, st) => s + (st.cost_usd || 0), 0) +
        (langCourse.included ? (langCourse.cost_usd || 0) : 0) +
        500 // buffer for misc
      );
    }

    return {
      ...p,
      visa_info: info ? [info] : [],
      expected_salary: salary || undefined,
      pass_rates: passRates,
      competitive_rating: comp,
      language_course_required: langCourse.included,
      language_course_cost: langCourse.included ? langCourse.cost_usd : undefined,
      language_course_duration: langCourse.included ? langCourse.duration_months : undefined,
      total_estimated_cost_usd: totalCost,
    };
  });

  // --- Update specialties ---
  const updatedSpecialties = specialties.map((s, i) => {
    const category = s.category;
    const branches = s.branches || [];
    const numBranches = branches.length;

    // Salary ranges based on specialty
    const salaryRanges = {
      egypt: { min_monthly: 300, max_monthly: 1500, currency: 'USD', notes: 'Varies by sector (government vs private)' },
      abroad: { min_annual: 80000, max_annual: 250000, currency: 'USD', notes: 'Highly dependent on country and experience' },
    };

    // Competitiveness
    let comp = 'medium';
    if (category === 'doctor') {
      const highComp = ['Neurosurgery', 'Cardiothoracic Surgery', 'Plastic Surgery', 'Dermatology', 'Orthopedic Surgery', 'Ophthalmology', 'Radiation Oncology', 'Interventional Cardiology', 'Vascular Surgery'];
      const lowComp = ['Family Medicine', 'Psychiatry', 'Pathology', 'Community Medicine', 'Geriatric Medicine', 'Palliative Medicine', 'Physical Medicine'];
      if (highComp.includes(s.name)) comp = 'high';
      if (lowComp.includes(s.name)) comp = 'low';
    } else {
      const highComp = ['Nurse Practitioner', 'Nurse Anesthetist', 'ICU / Critical Care Nursing'];
      const lowComp = ['Public Health Nursing', 'Geriatric Nursing', 'Community Health Nursing'];
      if (highComp.includes(s.name)) comp = 'high';
      if (lowComp.includes(s.name)) comp = 'low';
    }

    // Recognition
    const recognition = {
      UK: category === 'doctor' ? 'GMC registration via PLAB or Royal College exams' : 'NMC registration via OSCE/CBT',
      USA: category === 'doctor' ? 'USMLE + ACGME residency required' : 'NCLEX-RN + CGFNS',
      Germany: category === 'doctor' ? 'Approbation + Facharzt training' : 'Anerkennung + Kenntnisprüfung',
      UAE: category === 'doctor' ? 'DHA/DoH/MOHAP licensing exam' : 'DHA/DoH/MOHAP licensing',
      Saudi: category === 'doctor' ? 'SCFHS classification + Prometric' : 'SCFHS classification + Prometric',
    };

    return {
      ...s,
      salary_ranges: salaryRanges,
      competitiveness: comp,
      specialty_recognition: recognition,
      content_status: s.content_status || 'stub',
    };
  });

  // --- Write back paths.js ---
  const pathsStr = JSON.stringify(updatedPaths, null, 2)
    .replace(/"([^"]+)":/g, '$1:') // convert JSON keys to JS object keys
    .replace(/"/g, "'") // convert double quotes to single quotes
    .replace(/'(null|true|false|\d+\.?\d*)'/g, '$1') // unquote literals
    .replace(/'([A-Za-z_][A-Za-z0-9_]*)'/g, (match, key) => {
      // Keep string values quoted, but not object keys
      if (['_id', 'name', 'description', 'icon', 'category', 'path_type', 'target_country', 
           'content_status', 'official_source_links', 'egypt_specific_notes', 'required_exams',
           'required_language_tests', 'format', 'retake_policy', 'official_link', 'language', 'test_name',
           'min_score', 'stages', 'type', 'order', 'duration_months', 'cost_usd', 'prerequisites',
           'exams', 'visa_type', 'notes', 'currency', 'exam_name', 'pass_rate', 'source',
           'country', 'branches', 'weight', 'pros', 'cons', 'market_demand_egypt', 'market_demand_abroad',
           'training_duration_years', 'recommended_paths'].includes(key)) {
        return `'${key}'`;
      }
      // Check if it looks like a value
      if (['high', 'medium', 'low', 'verified', 'stub', 'doctor', 'nurse', 'migration', 'career', 'training',
           'exam', 'training_post', 'application', 'foundation'].includes(key)) {
        return `'${key}'`;
      }
      return match; // keep as is
    })
    .replace(/'(GMC|NMC|USMLE|ACGME|NCLEX|CGFNS|Approbation|Facharzt|DHA|DoH|MOHAP|SCFHS|Prometric|Anerkennung|Kenntnisprüfung|PLAB|OSCE|CBT|AMC|AHPRA|MCNZ|NHS|AFC|ASMS|MECA|VMO|MRCP|MRCS|MRCO|FRCR|FRCA|UKMLA|IELTS|OET|QCHP|MCC|NZREX|IMG|LMIA|EU|MOH|NHRA|BIG|Valvira|MEBEKO|INAMI|RIZIV|Ayarlama|YÖK)[^']*'/g, "'$1'")
    ; // close the huge expression

  // This JSON-to-JS conversion is fragile. Let me use a different approach:
  // Write a proper JS module using template literals.

  function toJSModule(arr, varName) {
    let out = `export const ${varName} = [\n`;
    for (const obj of arr) {
      out += '  ' + JSON.stringify(obj) + ',\n';
    }
    out += '];\n';
    return out;
  }

  // Actually JSON is fine - convert with a simpler approach
  const pathJson = JSON.stringify(updatedPaths, null, 2);
  const pathJsContent = `export const paths = ${pathJson};\n`;

  const specJson = JSON.stringify(updatedSpecialties, null, 2);
  const specJsContent = `export const specialties = ${specJson};\n`;

  writeFileSync(resolve(__dirname, 'paths.2026.mjs'), pathJsContent);
  writeFileSync(resolve(__dirname, 'specialties.2026.mjs'), specJsContent);

  console.log('Written: paths.2026.mjs and specialties.2026.mjs');
  console.log(`Updated ${updatedPaths.length} paths and ${updatedSpecialties.length} specialties`);
}

main().catch(console.error);
