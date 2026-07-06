// Nurse Career Path Survey — branching tree covering all 21 nurse paths
// Same 12 axes as doctor path graph: willingness_relocate, language_learning,
//   exam_tolerance, time_investment, cost_tolerance, income_expectation,
//   gulf_preference, western_preference, egypt_stability,
//   clinical_vs_admin, humanitarian_orientation,
//   research_academic_orientation
// Target vectors map to all 21 nurse career paths from §8.3

export const nursePathGraph = {
  type: 'path',
  role: 'nurse',
  root_node_id: 'ROOT',
  axes: [
    'willingness_relocate', 'language_learning', 'exam_tolerance',
    'time_investment', 'cost_tolerance', 'income_expectation',
    'gulf_preference', 'western_preference', 'egypt_stability',
    'clinical_vs_admin', 'humanitarian_orientation',
    'research_academic_orientation',
  ],
  nodes: [
    {
      node_id: 'ROOT', order: 1, is_universal: false,
      question_text: "What's driving your next career move as a nurse?",
      options: [
        { option_text: 'I want to work abroad — better pay and global experience', next_node_id: 'ABROAD_PATH',
          axis_deltas: { willingness_relocate: 3, income_expectation: 2, egypt_stability: -2 } },
        { option_text: 'I want to build my career in Egypt', next_node_id: 'EGYPT_PATH',
          axis_deltas: { egypt_stability: 3, willingness_relocate: -2 } },
        { option_text: 'I am interested in non-bedside, global health, or research', next_node_id: 'NON_CLINICAL_PATH',
          axis_deltas: { clinical_vs_admin: -2, humanitarian_orientation: 2, research_academic_orientation: 1 } },
      ],
    },
    {
      node_id: 'ABROAD_PATH', order: 2, is_universal: false,
      question_text: 'Which region are you most interested in?',
      options: [
        { option_text: 'Gulf / Arab world — good pay, close to home, large Egyptian community', next_node_id: 'GULF_FOCUS',
          axis_deltas: { gulf_preference: 3, willingness_relocate: 1 } },
        { option_text: 'Europe — better work-life balance, growing recruitment', next_node_id: 'EUROPE_FOCUS',
          axis_deltas: { western_preference: 2, language_learning: 1 } },
        { option_text: 'North America — highest pay, strong nursing profession', next_node_id: 'NA_FOCUS',
          axis_deltas: { western_preference: 3, income_expectation: 2 } },
        { option_text: 'Oceania — outdoors lifestyle, growing demand for nurses', next_node_id: 'OCEANIA_FOCUS',
          axis_deltas: { western_preference: 2, language_learning: 0 } },
      ],
    },
    {
      node_id: 'GULF_FOCUS', order: 3, is_universal: false,
      question_text: 'Gulf — what matters most to you?',
      options: [
        { option_text: 'Saudi Arabia — largest market, structured recruitment', next_node_id: null,
          axis_deltas: { gulf_preference: 2, exam_tolerance: 1, income_expectation: 2 } },
        { option_text: 'UAE — Dubai or Abu Dhabi, more lifestyle options', next_node_id: null,
          axis_deltas: { gulf_preference: 2, income_expectation: 2, time_investment: 1 } },
      ],
    },
    {
      node_id: 'EUROPE_FOCUS', order: 3, is_universal: false,
      question_text: 'Europe — how important is English vs learning a language?',
      options: [
        { option_text: 'English only — UK (NHS) with structured recruitment', next_node_id: null,
          axis_deltas: { western_preference: 2, language_learning: 0, exam_tolerance: 2 } },
        { option_text: 'English-friendly small market — Ireland or Malta', next_node_id: null,
          axis_deltas: { western_preference: 1, language_learning: 0, time_investment: -1 } },
        { option_text: 'I am willing to learn German — better long-term prospects', next_node_id: null,
          axis_deltas: { language_learning: 3, time_investment: 2, income_expectation: 1 } },
      ],
    },
    {
      node_id: 'NA_FOCUS', order: 3, is_universal: false,
      question_text: 'North America — Canada or the USA?',
      options: [
        { option_text: 'USA — highest pay, most opportunities, NCLEX-RN pathway', next_node_id: null,
          axis_deltas: { western_preference: 3, exam_tolerance: 2, cost_tolerance: 2, income_expectation: 3, time_investment: 2 } },
        { option_text: 'Canada — excellent work-life balance, strong nursing unions, IMG-friendly', next_node_id: null,
          axis_deltas: { western_preference: 3, exam_tolerance: 2, cost_tolerance: 2, income_expectation: 2, time_investment: 2 } },
      ],
    },
    {
      node_id: 'OCEANIA_FOCUS', order: 3, is_universal: false,
      question_text: 'Oceania — which appeals?',
      options: [
        { option_text: 'Australia — strong nursing demand, skilled migration pathway', next_node_id: null,
          axis_deltas: { western_preference: 2, exam_tolerance: 2, time_investment: 2, income_expectation: 2 } },
        { option_text: 'New Zealand — smaller, quieter, streamlined process', next_node_id: null,
          axis_deltas: { western_preference: 2, exam_tolerance: 1, time_investment: 1, income_expectation: 1 } },
      ],
    },
    {
      node_id: 'EGYPT_PATH', order: 2, is_universal: false,
      question_text: 'Staying in Egypt — what setting suits you?',
      options: [
        { option_text: 'MOH government hospital — stability, pension, structured career', next_node_id: null,
          axis_deltas: { egypt_stability: 3, income_expectation: -1 } },
        { option_text: 'University teaching hospital — education and career growth', next_node_id: null,
          axis_deltas: { egypt_stability: 2, research_academic_orientation: 2 } },
        { option_text: 'Private hospital — higher pay, more autonomy', next_node_id: null,
          axis_deltas: { egypt_stability: 1, income_expectation: 2 } },
        { option_text: 'Military/Police nursing — distinct benefits and service track', next_node_id: null,
          axis_deltas: { egypt_stability: 2, income_expectation: 1 } },
        { option_text: 'Pursue a postgraduate nursing degree first', next_node_id: null,
          axis_deltas: { egypt_stability: 1, research_academic_orientation: 2, time_investment: 2 } },
        { option_text: 'Work with international NGOs operating in Egypt', next_node_id: null,
          axis_deltas: { egypt_stability: 1, humanitarian_orientation: 3 } },
      ],
    },
    {
      node_id: 'NON_CLINICAL_PATH', order: 2, is_universal: false,
      question_text: 'Non-bedside nursing — what kind of impact?',
      options: [
        { option_text: 'Global health with WHO, UNICEF — policy and programs', next_node_id: null,
          axis_deltas: { humanitarian_orientation: 3, clinical_vs_admin: -2, research_academic_orientation: 1 } },
        { option_text: 'Humanitarian field nursing — MSF, Red Cross, crisis response', next_node_id: null,
          axis_deltas: { humanitarian_orientation: 3, willingness_relocate: 2 } },
        { option_text: 'Global health research — trials, epidemiology, publications', next_node_id: null,
          axis_deltas: { research_academic_orientation: 3, clinical_vs_admin: -1 } },
        { option_text: 'Health-tech / nursing informatics — EHR, telehealth, innovation', next_node_id: null,
          axis_deltas: { clinical_vs_admin: -2, income_expectation: 2 } },
        { option_text: 'Pharmaceutical research nursing — clinical trials, pharmacovigilance', next_node_id: null,
          axis_deltas: { clinical_vs_admin: -2, income_expectation: 3, research_academic_orientation: 2 } },
      ],
    },
    // Universal calibration questions
    {
      node_id: 'CALIB_EXAMS', order: 5, is_universal: true,
      question_text: 'How many exams are you willing to sit for your career move?',
      options: [
        { option_text: '0 — I want minimal or no exams', next_node_id: 'CALIB_COST', axis_deltas: { exam_tolerance: 0 } },
        { option_text: '1-2 exams — manageable', next_node_id: 'CALIB_COST', axis_deltas: { exam_tolerance: 2 } },
        { option_text: '3+ exams — I will do whatever it takes', next_node_id: 'CALIB_COST', axis_deltas: { exam_tolerance: 4 } },
      ],
    },
    {
      node_id: 'CALIB_COST', order: 6, is_universal: true,
      question_text: 'How much are you willing to invest financially? (1 = as little as possible, 5 = whatever it costs)',
      options: [
        { option_text: '1 — As little as possible', next_node_id: 'CALIB_TIME', axis_deltas: { cost_tolerance: 0 } },
        { option_text: '2 — Up to $1,000', next_node_id: 'CALIB_TIME', axis_deltas: { cost_tolerance: 1 } },
        { option_text: '3 — Up to $3,000', next_node_id: 'CALIB_TIME', axis_deltas: { cost_tolerance: 2 } },
        { option_text: '4 — Up to $5,000', next_node_id: 'CALIB_TIME', axis_deltas: { cost_tolerance: 3 } },
        { option_text: '5 — Whatever it costs', next_node_id: 'CALIB_TIME', axis_deltas: { cost_tolerance: 4 } },
      ],
    },
    {
      node_id: 'CALIB_TIME', order: 7, is_universal: true,
      question_text: 'How much time are you willing to invest in this pathway?',
      options: [
        { option_text: '6-12 months — I want to move quickly', next_node_id: null, axis_deltas: { time_investment: 1 } },
        { option_text: '1-2 years — reasonable timeframe', next_node_id: null, axis_deltas: { time_investment: 2 } },
        { option_text: '2-4 years — I am in it for the long haul', next_node_id: null, axis_deltas: { time_investment: 3 } },
      ],
    },
  ],
  target_vectors: [
    // Egypt National Tracks
    { specialty_name: 'Stay-Egypt (MOH Government Nursing Track)', axes: { willingness_relocate: 0.1, language_learning: 0.1, exam_tolerance: 0.2, time_investment: 0.3, cost_tolerance: 0.2, income_expectation: 0.3, gulf_preference: 0.2, western_preference: 0.2, egypt_stability: 0.95, clinical_vs_admin: 0.5, humanitarian_orientation: 0.3, research_academic_orientation: 0.3 } },
    { specialty_name: 'Stay-Egypt (University/Teaching Hospital Nursing Track)', axes: { willingness_relocate: 0.1, language_learning: 0.1, exam_tolerance: 0.2, time_investment: 0.4, cost_tolerance: 0.2, income_expectation: 0.3, gulf_preference: 0.2, western_preference: 0.3, egypt_stability: 0.9, clinical_vs_admin: 0.5, humanitarian_orientation: 0.3, research_academic_orientation: 0.85 } },
    { specialty_name: 'Stay-Egypt (Private Sector Nursing)', axes: { willingness_relocate: 0.1, language_learning: 0.1, exam_tolerance: 0.2, time_investment: 0.2, cost_tolerance: 0.3, income_expectation: 0.75, gulf_preference: 0.2, western_preference: 0.2, egypt_stability: 0.8, clinical_vs_admin: 0.5, humanitarian_orientation: 0.2, research_academic_orientation: 0.2 } },
    { specialty_name: 'Stay-Egypt (Military/Police Nursing Services)', axes: { willingness_relocate: 0.1, language_learning: 0.1, exam_tolerance: 0.3, time_investment: 0.3, cost_tolerance: 0.2, income_expectation: 0.4, gulf_preference: 0.2, western_preference: 0.2, egypt_stability: 0.9, clinical_vs_admin: 0.5, humanitarian_orientation: 0.2, research_academic_orientation: 0.2 } },
    { specialty_name: 'Stay-Egypt (Postgraduate Nursing Track)', axes: { willingness_relocate: 0.2, language_learning: 0.2, exam_tolerance: 0.4, time_investment: 0.6, cost_tolerance: 0.3, income_expectation: 0.3, gulf_preference: 0.2, western_preference: 0.3, egypt_stability: 0.7, clinical_vs_admin: 0.5, humanitarian_orientation: 0.3, research_academic_orientation: 0.9 } },
    { specialty_name: 'Stay-Egypt (NGO/International Health Nursing)', axes: { willingness_relocate: 0.2, language_learning: 0.3, exam_tolerance: 0.2, time_investment: 0.3, cost_tolerance: 0.2, income_expectation: 0.4, gulf_preference: 0.2, western_preference: 0.3, egypt_stability: 0.6, clinical_vs_admin: 0.3, humanitarian_orientation: 0.9, research_academic_orientation: 0.4 } },
    // Gulf
    { specialty_name: 'Saudi Arabia — Saudi Nursing License (SCFHS)', axes: { willingness_relocate: 0.8, language_learning: 0.2, exam_tolerance: 0.6, time_investment: 0.4, cost_tolerance: 0.5, income_expectation: 0.8, gulf_preference: 0.95, western_preference: 0.2, egypt_stability: 0.2, clinical_vs_admin: 0.5, humanitarian_orientation: 0.2, research_academic_orientation: 0.3 } },
    { specialty_name: 'UAE — Nursing License (DHA/DoH)', axes: { willingness_relocate: 0.8, language_learning: 0.2, exam_tolerance: 0.5, time_investment: 0.4, cost_tolerance: 0.5, income_expectation: 0.85, gulf_preference: 0.85, western_preference: 0.35, egypt_stability: 0.2, clinical_vs_admin: 0.5, humanitarian_orientation: 0.2, research_academic_orientation: 0.3 } },
    // Europe
    { specialty_name: 'UK — NMC OSCE', axes: { willingness_relocate: 0.85, language_learning: 0.1, exam_tolerance: 0.7, time_investment: 0.5, cost_tolerance: 0.6, income_expectation: 0.6, gulf_preference: 0.2, western_preference: 0.9, egypt_stability: 0.15, clinical_vs_admin: 0.5, humanitarian_orientation: 0.3, research_academic_orientation: 0.3 } },
    { specialty_name: 'Ireland — NMBI Registration', axes: { willingness_relocate: 0.8, language_learning: 0.1, exam_tolerance: 0.5, time_investment: 0.4, cost_tolerance: 0.5, income_expectation: 0.6, gulf_preference: 0.2, western_preference: 0.85, egypt_stability: 0.2, clinical_vs_admin: 0.5, humanitarian_orientation: 0.3, research_academic_orientation: 0.3 } },
    { specialty_name: 'Germany — Nursing Approbation', axes: { willingness_relocate: 0.85, language_learning: 0.95, exam_tolerance: 0.6, time_investment: 0.6, cost_tolerance: 0.5, income_expectation: 0.7, gulf_preference: 0.15, western_preference: 0.9, egypt_stability: 0.1, clinical_vs_admin: 0.5, humanitarian_orientation: 0.3, research_academic_orientation: 0.3 } },
    { specialty_name: 'Malta — Nursing Council Registration', axes: { willingness_relocate: 0.7, language_learning: 0.1, exam_tolerance: 0.3, time_investment: 0.3, cost_tolerance: 0.4, income_expectation: 0.5, gulf_preference: 0.2, western_preference: 0.7, egypt_stability: 0.25, clinical_vs_admin: 0.5, humanitarian_orientation: 0.3, research_academic_orientation: 0.3 } },
    // North America
    { specialty_name: 'Canada — NCLEX-RN', axes: { willingness_relocate: 0.85, language_learning: 0.1, exam_tolerance: 0.7, time_investment: 0.6, cost_tolerance: 0.7, income_expectation: 0.7, gulf_preference: 0.1, western_preference: 0.9, egypt_stability: 0.15, clinical_vs_admin: 0.5, humanitarian_orientation: 0.3, research_academic_orientation: 0.4 } },
    { specialty_name: 'USA — NCLEX-RN', axes: { willingness_relocate: 0.9, language_learning: 0.1, exam_tolerance: 0.8, time_investment: 0.7, cost_tolerance: 0.8, income_expectation: 0.95, gulf_preference: 0.1, western_preference: 0.95, egypt_stability: 0.1, clinical_vs_admin: 0.5, humanitarian_orientation: 0.2, research_academic_orientation: 0.3 } },
    // Oceania
    { specialty_name: 'Australia — AHPRA/ANMAC Nursing', axes: { willingness_relocate: 0.85, language_learning: 0.1, exam_tolerance: 0.6, time_investment: 0.6, cost_tolerance: 0.6, income_expectation: 0.75, gulf_preference: 0.1, western_preference: 0.85, egypt_stability: 0.15, clinical_vs_admin: 0.5, humanitarian_orientation: 0.3, research_academic_orientation: 0.3 } },
    { specialty_name: 'New Zealand — Nursing Council Registration', axes: { willingness_relocate: 0.8, language_learning: 0.1, exam_tolerance: 0.5, time_investment: 0.4, cost_tolerance: 0.5, income_expectation: 0.6, gulf_preference: 0.1, western_preference: 0.85, egypt_stability: 0.2, clinical_vs_admin: 0.5, humanitarian_orientation: 0.3, research_academic_orientation: 0.3 } },
    // Admin / Global Health
    { specialty_name: 'International Organization Nursing (WHO/UN)', axes: { willingness_relocate: 0.6, language_learning: 0.4, exam_tolerance: 0.2, time_investment: 0.4, cost_tolerance: 0.3, income_expectation: 0.5, gulf_preference: 0.2, western_preference: 0.4, egypt_stability: 0.3, clinical_vs_admin: 0.15, humanitarian_orientation: 0.95, research_academic_orientation: 0.5 } },
    { specialty_name: 'Humanitarian Nursing (MSF, IRC, Red Cross)', axes: { willingness_relocate: 0.9, language_learning: 0.5, exam_tolerance: 0.2, time_investment: 0.3, cost_tolerance: 0.2, income_expectation: 0.3, gulf_preference: 0.3, western_preference: 0.3, egypt_stability: 0.2, clinical_vs_admin: 0.3, humanitarian_orientation: 0.95, research_academic_orientation: 0.3 } },
    { specialty_name: 'Global Health Research Nursing', axes: { willingness_relocate: 0.5, language_learning: 0.4, exam_tolerance: 0.3, time_investment: 0.6, cost_tolerance: 0.3, income_expectation: 0.4, gulf_preference: 0.15, western_preference: 0.5, egypt_stability: 0.3, clinical_vs_admin: 0.15, humanitarian_orientation: 0.6, research_academic_orientation: 0.95 } },
    { specialty_name: 'Health-Tech Nursing / Nursing Informatics', axes: { willingness_relocate: 0.4, language_learning: 0.2, exam_tolerance: 0.2, time_investment: 0.3, cost_tolerance: 0.3, income_expectation: 0.75, gulf_preference: 0.2, western_preference: 0.5, egypt_stability: 0.4, clinical_vs_admin: 0.1, humanitarian_orientation: 0.3, research_academic_orientation: 0.4 } },
    { specialty_name: 'Pharmaceutical/Clinical Research Nursing', axes: { willingness_relocate: 0.4, language_learning: 0.3, exam_tolerance: 0.3, time_investment: 0.3, cost_tolerance: 0.3, income_expectation: 0.8, gulf_preference: 0.3, western_preference: 0.4, egypt_stability: 0.4, clinical_vs_admin: 0.15, humanitarian_orientation: 0.3, research_academic_orientation: 0.7 } },
  ],
};
