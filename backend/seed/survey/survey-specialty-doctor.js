// Doctor Specialty Survey — §4 sample branching tree
// 14 axes from §2
// Target vectors from §3 (full vectors, not just standout axes)
// Needs expansion to 30-35 questions per §9.1

export const doctorSpecialtyGraph = {
  type: 'specialty',
  role: 'doctor',
  root_node_id: 'ROOT',
  axes: [
    'procedural_affinity', 'surgical_tolerance', 'acute_vs_longitudinal',
    'diagnostic_puzzle_affinity', 'pediatric_affinity', 'ob_gyn_affinity',
    'psych_affinity', 'lab_imaging_affinity', 'emergency_tolerance',
    'lifestyle_priority', 'income_priority', 'research_academic_affinity',
    'admin_systems_affinity', 'public_health_affinity',
  ],
  nodes: [
    {
      node_id: 'ROOT', order: 1, is_universal: false,
      question_text: "A patient's condition is unstable and changing fast. What's your instinct?",
      options: [
        { option_text: 'Act immediately, with my hands', next_node_id: 'Q2_PROCEDURAL',
          axis_deltas: { surgical_tolerance: 2, procedural_affinity: 2, acute_vs_longitudinal: 2 } },
        { option_text: 'Step back and think through what is happening', next_node_id: 'Q2_COGNITIVE',
          axis_deltas: { diagnostic_puzzle_affinity: 2, acute_vs_longitudinal: -1 } },
        { option_text: 'Depends entirely on the patient in front of me', next_node_id: 'Q2_NEUTRAL',
          axis_deltas: {} },
      ],
    },
    {
      node_id: 'Q2_PROCEDURAL', order: 2, is_universal: false,
      question_text: 'Open surgery with full control, or a smaller/minimally-invasive approach?',
      options: [
        { option_text: 'Open surgery', next_node_id: 'Q3_SURGICAL_FIELD',
          axis_deltas: { surgical_tolerance: 2 } },
        { option_text: 'Minimally invasive / catheter / scope', next_node_id: 'Q3_INTERVENTIONAL',
          axis_deltas: { procedural_affinity: 1 } },
      ],
    },
    {
      node_id: 'Q3_SURGICAL_FIELD', order: 3, is_universal: false,
      question_text: 'Which appeals more?',
      options: [
        { option_text: 'Bones and joints', next_node_id: null, axis_deltas: {} },
        { option_text: 'Abdomen / general operations', next_node_id: null, axis_deltas: {} },
        { option_text: 'Brain and nervous system', next_node_id: null, axis_deltas: {} },
        { option_text: 'Heart and chest', next_node_id: null, axis_deltas: {} },
      ],
    },
    {
      node_id: 'Q3_INTERVENTIONAL', order: 3, is_universal: false,
      question_text: 'Which interventional field draws you?',
      options: [
        { option_text: 'Catheter-based heart procedures', next_node_id: null, axis_deltas: { procedural_affinity: 1 } },
        { option_text: 'Image-guided minimally invasive procedures', next_node_id: null, axis_deltas: { lab_imaging_affinity: 1 } },
      ],
    },
    {
      node_id: 'Q2_COGNITIVE', order: 2, is_universal: false,
      question_text: 'When solving a hard case, what excites you more?',
      options: [
        { option_text: 'Piecing together a rare diagnosis', next_node_id: 'Q3_DX_FIELD',
          axis_deltas: { diagnostic_puzzle_affinity: 2 } },
        { option_text: 'Understanding a chronic condition over years with a patient', next_node_id: 'Q3_LONGITUDINAL_FIELD',
          axis_deltas: { acute_vs_longitudinal: -2 } },
      ],
    },
    {
      node_id: 'Q3_DX_FIELD', order: 3, is_universal: false,
      question_text: 'What area of diagnostic challenge?',
      options: [
        { option_text: 'Internal medicine mysteries', next_node_id: null, axis_deltas: {} },
        { option_text: 'Neurological puzzles', next_node_id: null, axis_deltas: { diagnostic_puzzle_affinity: 1 } },
        { option_text: 'Infectious disease detective work', next_node_id: null, axis_deltas: { public_health_affinity: 1 } },
      ],
    },
    {
      node_id: 'Q3_LONGITUDINAL_FIELD', order: 3, is_universal: false,
      question_text: 'Which long-term care setting?',
      options: [
        { option_text: 'Chronic disease management', next_node_id: null, axis_deltas: {} },
        { option_text: 'Geriatric care', next_node_id: null, axis_deltas: {} },
      ],
    },
    {
      node_id: 'Q2_NEUTRAL', order: 2, is_universal: false,
      question_text: 'Which pulls at you most?',
      options: [
        { option_text: 'Children', next_node_id: 'Q3_PEDS_FIELD',
          axis_deltas: { pediatric_affinity: 2 } },
        { option_text: "Women's health / pregnancy", next_node_id: null,
          axis_deltas: { ob_gyn_affinity: 2 } },
        { option_text: 'Mental health / behavior', next_node_id: 'Q3_PSYCH_FIELD',
          axis_deltas: { psych_affinity: 2 } },
        { option_text: 'Systems, policy, and how care is delivered — not hands-on patient care', next_node_id: 'Q3_ADMIN_FIELD',
          axis_deltas: { admin_systems_affinity: 3, procedural_affinity: -2 } },
        { option_text: 'None of these — ask me something else', next_node_id: 'Q3_GENERAL_FORCING',
          axis_deltas: {} },
      ],
    },
    {
      node_id: 'Q3_PEDS_FIELD', order: 3, is_universal: false,
      question_text: 'Which pediatric area?',
      options: [
        { option_text: 'General pediatrics', next_node_id: null, axis_deltas: {} },
        { option_text: 'Pediatric cardiology', next_node_id: null, axis_deltas: { diagnostic_puzzle_affinity: 1 } },
      ],
    },
    {
      node_id: 'Q3_PSYCH_FIELD', order: 3, is_universal: false,
      question_text: 'Which mental health area?',
      options: [
        { option_text: 'General psychiatry', next_node_id: null, axis_deltas: {} },
        { option_text: 'Child and adolescent', next_node_id: null, axis_deltas: { pediatric_affinity: 1 } },
      ],
    },
    {
      node_id: 'Q3_ADMIN_FIELD', order: 3, is_universal: false,
      question_text: "What kind of impact do you want to have?",
      options: [
        { option_text: 'Making hospitals safer and processes better', next_node_id: null,
          axis_deltas: { admin_systems_affinity: 2 } },
        { option_text: 'Advancing medical knowledge through research', next_node_id: null,
          axis_deltas: { research_academic_affinity: 3 } },
        { option_text: 'Population-level health, not individual patients', next_node_id: null,
          axis_deltas: { public_health_affinity: 3 } },
        { option_text: 'Technology and data in medicine', next_node_id: null,
          axis_deltas: { admin_systems_affinity: 2, lab_imaging_affinity: 1 } },
      ],
    },
    {
      node_id: 'Q3_GENERAL_FORCING', order: 3, is_universal: false,
      question_text: 'Last chance — which aspect of medicine draws you?',
      options: [
        { option_text: 'The science of diagnosis', next_node_id: null,
          axis_deltas: { diagnostic_puzzle_affinity: 1 } },
        { option_text: 'The art of patient relationships', next_node_id: null,
          axis_deltas: { acute_vs_longitudinal: -1 } },
        { option_text: 'The team and leadership side', next_node_id: null,
          axis_deltas: { admin_systems_affinity: 1 } },
      ],
    },
    // Universal calibration questions (everyone answers these near end)
    {
      node_id: 'CALIB_LIFESTYLE', order: 4, is_universal: true,
      question_text: 'How much does having predictable, controllable hours matter to you? (1 = not at all, 5 = extremely)',
      options: [
        { option_text: '1 — Not at all', next_node_id: 'CALIB_INCOME', axis_deltas: { lifestyle_priority: 0 } },
        { option_text: '2', next_node_id: 'CALIB_INCOME', axis_deltas: { lifestyle_priority: 1 } },
        { option_text: '3 — Moderately', next_node_id: 'CALIB_INCOME', axis_deltas: { lifestyle_priority: 2 } },
        { option_text: '4', next_node_id: 'CALIB_INCOME', axis_deltas: { lifestyle_priority: 3 } },
        { option_text: '5 — Extremely', next_node_id: 'CALIB_INCOME', axis_deltas: { lifestyle_priority: 4 } },
      ],
    },
    {
      node_id: 'CALIB_INCOME', order: 5, is_universal: true,
      question_text: 'How much does earning potential factor into your decision? (1 = not at all, 5 = primary driver)',
      options: [
        { option_text: '1 — Not at all', next_node_id: 'CALIB_ACADEMIC', axis_deltas: { income_priority: 0 } },
        { option_text: '2', next_node_id: 'CALIB_ACADEMIC', axis_deltas: { income_priority: 1 } },
        { option_text: '3 — Moderately', next_node_id: 'CALIB_ACADEMIC', axis_deltas: { income_priority: 2 } },
        { option_text: '4', next_node_id: 'CALIB_ACADEMIC', axis_deltas: { income_priority: 3 } },
        { option_text: '5 — Primary driver', next_node_id: 'CALIB_ACADEMIC', axis_deltas: { income_priority: 4 } },
      ],
    },
    {
      node_id: 'CALIB_ACADEMIC', order: 6, is_universal: true,
      question_text: 'Do you see yourself pursuing research or teaching alongside clinical practice?',
      options: [
        { option_text: 'Yes — that is my primary interest', next_node_id: null, axis_deltas: { research_academic_affinity: 3 } },
        { option_text: 'Somewhat — I would like to be involved', next_node_id: null, axis_deltas: { research_academic_affinity: 1.5 } },
        { option_text: 'No — I want pure clinical practice', next_node_id: null, axis_deltas: { research_academic_affinity: 0 } },
      ],
    },
  ],
  target_vectors: [
    // Surgical
    { specialty_name: 'General Surgery', axes: { procedural_affinity: 0.9, surgical_tolerance: 0.9, emergency_tolerance: 0.6, diagnostic_puzzle_affinity: 0.5, acute_vs_longitudinal: 0.6, pediatric_affinity: 0.5, ob_gyn_affinity: 0.5, psych_affinity: 0.5, lab_imaging_affinity: 0.4, lifestyle_priority: 0.3, income_priority: 0.5, research_academic_affinity: 0.4, admin_systems_affinity: 0.3, public_health_affinity: 0.3 } },
    { specialty_name: 'Orthopedic Surgery', axes: { procedural_affinity: 0.9, surgical_tolerance: 0.85, emergency_tolerance: 0.5, diagnostic_puzzle_affinity: 0.4, acute_vs_longitudinal: 0.6, pediatric_affinity: 0.5, ob_gyn_affinity: 0.5, psych_affinity: 0.5, lab_imaging_affinity: 0.6, lifestyle_priority: 0.6, income_priority: 0.6, research_academic_affinity: 0.3, admin_systems_affinity: 0.3, public_health_affinity: 0.3 } },
    { specialty_name: 'Neurosurgery', axes: { procedural_affinity: 0.95, surgical_tolerance: 0.95, emergency_tolerance: 0.5, diagnostic_puzzle_affinity: 0.7, acute_vs_longitudinal: 0.5, pediatric_affinity: 0.5, ob_gyn_affinity: 0.5, psych_affinity: 0.5, lab_imaging_affinity: 0.7, lifestyle_priority: 0.2, income_priority: 0.7, research_academic_affinity: 0.5, admin_systems_affinity: 0.3, public_health_affinity: 0.3 } },
    { specialty_name: 'Cardiothoracic Surgery', axes: { procedural_affinity: 0.95, surgical_tolerance: 0.95, emergency_tolerance: 0.7, diagnostic_puzzle_affinity: 0.5, acute_vs_longitudinal: 0.7, pediatric_affinity: 0.5, ob_gyn_affinity: 0.5, psych_affinity: 0.5, lab_imaging_affinity: 0.5, lifestyle_priority: 0.3, income_priority: 0.7, research_academic_affinity: 0.4, admin_systems_affinity: 0.3, public_health_affinity: 0.3 } },
    { specialty_name: 'Vascular Surgery', axes: { procedural_affinity: 0.85, surgical_tolerance: 0.85, emergency_tolerance: 0.6, diagnostic_puzzle_affinity: 0.5, acute_vs_longitudinal: 0.6, pediatric_affinity: 0.5, ob_gyn_affinity: 0.5, psych_affinity: 0.5, lab_imaging_affinity: 0.6, lifestyle_priority: 0.4, income_priority: 0.6, research_academic_affinity: 0.3, admin_systems_affinity: 0.3, public_health_affinity: 0.3 } },
    { specialty_name: 'Plastic & Reconstructive Surgery', axes: { procedural_affinity: 0.9, surgical_tolerance: 0.8, emergency_tolerance: 0.3, diagnostic_puzzle_affinity: 0.3, acute_vs_longitudinal: 0.4, pediatric_affinity: 0.5, ob_gyn_affinity: 0.5, psych_affinity: 0.5, lab_imaging_affinity: 0.4, lifestyle_priority: 0.5, income_priority: 0.7, research_academic_affinity: 0.3, admin_systems_affinity: 0.3, public_health_affinity: 0.3 } },
    { specialty_name: 'Pediatric Surgery', axes: { procedural_affinity: 0.85, surgical_tolerance: 0.85, emergency_tolerance: 0.5, diagnostic_puzzle_affinity: 0.5, acute_vs_longitudinal: 0.5, pediatric_affinity: 0.95, ob_gyn_affinity: 0.5, psych_affinity: 0.5, lab_imaging_affinity: 0.4, lifestyle_priority: 0.4, income_priority: 0.5, research_academic_affinity: 0.3, admin_systems_affinity: 0.3, public_health_affinity: 0.3 } },
    { specialty_name: 'ENT (Otolaryngology)', axes: { procedural_affinity: 0.75, surgical_tolerance: 0.65, emergency_tolerance: 0.4, diagnostic_puzzle_affinity: 0.5, acute_vs_longitudinal: 0.5, pediatric_affinity: 0.5, ob_gyn_affinity: 0.5, psych_affinity: 0.5, lab_imaging_affinity: 0.5, lifestyle_priority: 0.6, income_priority: 0.5, research_academic_affinity: 0.3, admin_systems_affinity: 0.3, public_health_affinity: 0.3 } },
    { specialty_name: 'Urology', axes: { procedural_affinity: 0.75, surgical_tolerance: 0.7, emergency_tolerance: 0.4, diagnostic_puzzle_affinity: 0.5, acute_vs_longitudinal: 0.5, pediatric_affinity: 0.5, ob_gyn_affinity: 0.5, psych_affinity: 0.5, lab_imaging_affinity: 0.5, lifestyle_priority: 0.5, income_priority: 0.65, research_academic_affinity: 0.3, admin_systems_affinity: 0.3, public_health_affinity: 0.3 } },
    { specialty_name: 'Ophthalmology', axes: { procedural_affinity: 0.8, surgical_tolerance: 0.5, emergency_tolerance: 0.3, diagnostic_puzzle_affinity: 0.5, acute_vs_longitudinal: 0.4, pediatric_affinity: 0.5, ob_gyn_affinity: 0.5, psych_affinity: 0.5, lab_imaging_affinity: 0.6, lifestyle_priority: 0.75, income_priority: 0.7, research_academic_affinity: 0.3, admin_systems_affinity: 0.3, public_health_affinity: 0.3 } },
    // Internal Medicine
    { specialty_name: 'Internal Medicine (General)', axes: { procedural_affinity: 0.3, surgical_tolerance: 0.2, emergency_tolerance: 0.4, diagnostic_puzzle_affinity: 0.75, acute_vs_longitudinal: 0.4, pediatric_affinity: 0.5, ob_gyn_affinity: 0.5, psych_affinity: 0.5, lab_imaging_affinity: 0.4, lifestyle_priority: 0.5, income_priority: 0.4, research_academic_affinity: 0.4, admin_systems_affinity: 0.3, public_health_affinity: 0.3 } },
    { specialty_name: 'Cardiology', axes: { procedural_affinity: 0.6, surgical_tolerance: 0.4, emergency_tolerance: 0.5, diagnostic_puzzle_affinity: 0.7, acute_vs_longitudinal: 0.55, pediatric_affinity: 0.5, ob_gyn_affinity: 0.5, psych_affinity: 0.5, lab_imaging_affinity: 0.6, lifestyle_priority: 0.4, income_priority: 0.6, research_academic_affinity: 0.4, admin_systems_affinity: 0.3, public_health_affinity: 0.3 } },
    { specialty_name: 'Interventional Cardiology', axes: { procedural_affinity: 0.85, surgical_tolerance: 0.6, emergency_tolerance: 0.6, diagnostic_puzzle_affinity: 0.6, acute_vs_longitudinal: 0.6, pediatric_affinity: 0.5, ob_gyn_affinity: 0.5, psych_affinity: 0.5, lab_imaging_affinity: 0.7, lifestyle_priority: 0.3, income_priority: 0.7, research_academic_affinity: 0.3, admin_systems_affinity: 0.3, public_health_affinity: 0.3 } },
    { specialty_name: 'Gastroenterology', axes: { procedural_affinity: 0.65, surgical_tolerance: 0.4, emergency_tolerance: 0.4, diagnostic_puzzle_affinity: 0.65, acute_vs_longitudinal: 0.5, pediatric_affinity: 0.5, ob_gyn_affinity: 0.5, psych_affinity: 0.5, lab_imaging_affinity: 0.5, lifestyle_priority: 0.5, income_priority: 0.55, research_academic_affinity: 0.3, admin_systems_affinity: 0.3, public_health_affinity: 0.3 } },
    { specialty_name: 'Nephrology', axes: { procedural_affinity: 0.4, surgical_tolerance: 0.3, emergency_tolerance: 0.4, diagnostic_puzzle_affinity: 0.75, acute_vs_longitudinal: 0.3, pediatric_affinity: 0.5, ob_gyn_affinity: 0.5, psych_affinity: 0.5, lab_imaging_affinity: 0.5, lifestyle_priority: 0.5, income_priority: 0.4, research_academic_affinity: 0.4, admin_systems_affinity: 0.3, public_health_affinity: 0.4 } },
    { specialty_name: 'Pulmonology', axes: { procedural_affinity: 0.5, surgical_tolerance: 0.3, emergency_tolerance: 0.55, diagnostic_puzzle_affinity: 0.65, acute_vs_longitudinal: 0.55, pediatric_affinity: 0.5, ob_gyn_affinity: 0.5, psych_affinity: 0.5, lab_imaging_affinity: 0.6, lifestyle_priority: 0.4, income_priority: 0.45, research_academic_affinity: 0.3, admin_systems_affinity: 0.3, public_health_affinity: 0.4 } },
    { specialty_name: 'Endocrinology', axes: { procedural_affinity: 0.3, surgical_tolerance: 0.2, emergency_tolerance: 0.3, diagnostic_puzzle_affinity: 0.6, acute_vs_longitudinal: 0.25, pediatric_affinity: 0.5, ob_gyn_affinity: 0.5, psych_affinity: 0.5, lab_imaging_affinity: 0.5, lifestyle_priority: 0.6, income_priority: 0.4, research_academic_affinity: 0.4, admin_systems_affinity: 0.3, public_health_affinity: 0.3 } },
    { specialty_name: 'Rheumatology', axes: { procedural_affinity: 0.3, surgical_tolerance: 0.2, emergency_tolerance: 0.2, diagnostic_puzzle_affinity: 0.75, acute_vs_longitudinal: 0.25, pediatric_affinity: 0.5, ob_gyn_affinity: 0.5, psych_affinity: 0.5, lab_imaging_affinity: 0.5, lifestyle_priority: 0.6, income_priority: 0.35, research_academic_affinity: 0.4, admin_systems_affinity: 0.3, public_health_affinity: 0.3 } },
    { specialty_name: 'Infectious Disease', axes: { procedural_affinity: 0.3, surgical_tolerance: 0.2, emergency_tolerance: 0.4, diagnostic_puzzle_affinity: 0.8, acute_vs_longitudinal: 0.4, pediatric_affinity: 0.5, ob_gyn_affinity: 0.5, psych_affinity: 0.5, lab_imaging_affinity: 0.5, lifestyle_priority: 0.5, income_priority: 0.35, research_academic_affinity: 0.5, admin_systems_affinity: 0.3, public_health_affinity: 0.55 } },
    { specialty_name: 'Hematology/Oncology', axes: { procedural_affinity: 0.3, surgical_tolerance: 0.2, emergency_tolerance: 0.3, diagnostic_puzzle_affinity: 0.7, acute_vs_longitudinal: 0.3, pediatric_affinity: 0.5, ob_gyn_affinity: 0.5, psych_affinity: 0.5, lab_imaging_affinity: 0.6, lifestyle_priority: 0.4, income_priority: 0.5, research_academic_affinity: 0.6, admin_systems_affinity: 0.3, public_health_affinity: 0.3 } },
    { specialty_name: 'Geriatric Medicine', axes: { procedural_affinity: 0.2, surgical_tolerance: 0.2, emergency_tolerance: 0.3, diagnostic_puzzle_affinity: 0.5, acute_vs_longitudinal: 0.2, pediatric_affinity: 0.5, ob_gyn_affinity: 0.5, psych_affinity: 0.5, lab_imaging_affinity: 0.3, lifestyle_priority: 0.6, income_priority: 0.35, research_academic_affinity: 0.3, admin_systems_affinity: 0.3, public_health_affinity: 0.3 } },
    // Emergency, Anesthesia, Critical Care
    { specialty_name: 'Emergency Medicine', axes: { procedural_affinity: 0.6, surgical_tolerance: 0.4, emergency_tolerance: 0.95, diagnostic_puzzle_affinity: 0.5, acute_vs_longitudinal: 0.9, pediatric_affinity: 0.5, ob_gyn_affinity: 0.5, psych_affinity: 0.5, lab_imaging_affinity: 0.4, lifestyle_priority: 0.65, income_priority: 0.5, research_academic_affinity: 0.3, admin_systems_affinity: 0.3, public_health_affinity: 0.3 } },
    { specialty_name: 'Anesthesiology', axes: { procedural_affinity: 0.8, surgical_tolerance: 0.4, emergency_tolerance: 0.7, diagnostic_puzzle_affinity: 0.4, acute_vs_longitudinal: 0.5, pediatric_affinity: 0.5, ob_gyn_affinity: 0.5, psych_affinity: 0.5, lab_imaging_affinity: 0.4, lifestyle_priority: 0.65, income_priority: 0.7, research_academic_affinity: 0.3, admin_systems_affinity: 0.3, public_health_affinity: 0.3 } },
    { specialty_name: 'Critical Care / Intensivist', axes: { procedural_affinity: 0.5, surgical_tolerance: 0.4, emergency_tolerance: 0.85, diagnostic_puzzle_affinity: 0.6, acute_vs_longitudinal: 0.85, pediatric_affinity: 0.5, ob_gyn_affinity: 0.5, psych_affinity: 0.5, lab_imaging_affinity: 0.5, lifestyle_priority: 0.4, income_priority: 0.5, research_academic_affinity: 0.3, admin_systems_affinity: 0.3, public_health_affinity: 0.3 } },
    // Women's & Children's Health
    { specialty_name: 'Obstetrics & Gynecology', axes: { procedural_affinity: 0.7, surgical_tolerance: 0.5, emergency_tolerance: 0.5, diagnostic_puzzle_affinity: 0.5, acute_vs_longitudinal: 0.5, pediatric_affinity: 0.5, ob_gyn_affinity: 0.95, psych_affinity: 0.4, lab_imaging_affinity: 0.5, lifestyle_priority: 0.4, income_priority: 0.5, research_academic_affinity: 0.3, admin_systems_affinity: 0.3, public_health_affinity: 0.3 } },
    { specialty_name: 'Pediatrics (General)', axes: { procedural_affinity: 0.3, surgical_tolerance: 0.2, emergency_tolerance: 0.4, diagnostic_puzzle_affinity: 0.5, acute_vs_longitudinal: 0.5, pediatric_affinity: 0.9, ob_gyn_affinity: 0.5, psych_affinity: 0.4, lab_imaging_affinity: 0.3, lifestyle_priority: 0.5, income_priority: 0.35, research_academic_affinity: 0.3, admin_systems_affinity: 0.3, public_health_affinity: 0.3 } },
    { specialty_name: 'Neonatology', axes: { procedural_affinity: 0.6, surgical_tolerance: 0.4, emergency_tolerance: 0.7, diagnostic_puzzle_affinity: 0.5, acute_vs_longitudinal: 0.7, pediatric_affinity: 0.95, ob_gyn_affinity: 0.5, psych_affinity: 0.4, lab_imaging_affinity: 0.4, lifestyle_priority: 0.3, income_priority: 0.5, research_academic_affinity: 0.3, admin_systems_affinity: 0.3, public_health_affinity: 0.3 } },
    { specialty_name: 'Pediatric Cardiology', axes: { procedural_affinity: 0.5, surgical_tolerance: 0.3, emergency_tolerance: 0.5, diagnostic_puzzle_affinity: 0.65, acute_vs_longitudinal: 0.5, pediatric_affinity: 0.9, ob_gyn_affinity: 0.5, psych_affinity: 0.4, lab_imaging_affinity: 0.6, lifestyle_priority: 0.4, income_priority: 0.5, research_academic_affinity: 0.4, admin_systems_affinity: 0.3, public_health_affinity: 0.3 } },
    // Mental Health & Neuro
    { specialty_name: 'Psychiatry', axes: { procedural_affinity: 0.1, surgical_tolerance: 0.1, emergency_tolerance: 0.3, diagnostic_puzzle_affinity: 0.5, acute_vs_longitudinal: 0.35, pediatric_affinity: 0.5, ob_gyn_affinity: 0.5, psych_affinity: 0.95, lab_imaging_affinity: 0.2, lifestyle_priority: 0.6, income_priority: 0.5, research_academic_affinity: 0.4, admin_systems_affinity: 0.3, public_health_affinity: 0.4 } },
    { specialty_name: 'Child & Adolescent Psychiatry', axes: { procedural_affinity: 0.1, surgical_tolerance: 0.1, emergency_tolerance: 0.3, diagnostic_puzzle_affinity: 0.5, acute_vs_longitudinal: 0.35, pediatric_affinity: 0.6, ob_gyn_affinity: 0.5, psych_affinity: 0.9, lab_imaging_affinity: 0.2, lifestyle_priority: 0.5, income_priority: 0.5, research_academic_affinity: 0.4, admin_systems_affinity: 0.3, public_health_affinity: 0.4 } },
    { specialty_name: 'Neurology', axes: { procedural_affinity: 0.3, surgical_tolerance: 0.2, emergency_tolerance: 0.4, diagnostic_puzzle_affinity: 0.85, acute_vs_longitudinal: 0.3, pediatric_affinity: 0.5, ob_gyn_affinity: 0.5, psych_affinity: 0.5, lab_imaging_affinity: 0.7, lifestyle_priority: 0.4, income_priority: 0.5, research_academic_affinity: 0.5, admin_systems_affinity: 0.3, public_health_affinity: 0.3 } },
    // Diagnostic / Lab-Based
    { specialty_name: 'Radiology', axes: { procedural_affinity: 0.3, surgical_tolerance: 0.2, emergency_tolerance: 0.3, diagnostic_puzzle_affinity: 0.7, acute_vs_longitudinal: 0.4, pediatric_affinity: 0.5, ob_gyn_affinity: 0.5, psych_affinity: 0.5, lab_imaging_affinity: 0.95, lifestyle_priority: 0.7, income_priority: 0.75, research_academic_affinity: 0.4, admin_systems_affinity: 0.3, public_health_affinity: 0.3 } },
    { specialty_name: 'Pathology', axes: { procedural_affinity: 0.2, surgical_tolerance: 0.2, emergency_tolerance: 0.2, diagnostic_puzzle_affinity: 0.65, acute_vs_longitudinal: 0.3, pediatric_affinity: 0.5, ob_gyn_affinity: 0.5, psych_affinity: 0.5, lab_imaging_affinity: 0.9, lifestyle_priority: 0.75, income_priority: 0.55, research_academic_affinity: 0.4, admin_systems_affinity: 0.3, public_health_affinity: 0.3 } },
    { specialty_name: 'Clinical Laboratory Medicine', axes: { procedural_affinity: 0.1, surgical_tolerance: 0.1, emergency_tolerance: 0.2, diagnostic_puzzle_affinity: 0.5, acute_vs_longitudinal: 0.3, pediatric_affinity: 0.5, ob_gyn_affinity: 0.5, psych_affinity: 0.5, lab_imaging_affinity: 0.9, lifestyle_priority: 0.7, income_priority: 0.5, research_academic_affinity: 0.5, admin_systems_affinity: 0.3, public_health_affinity: 0.3 } },
    // Primary Care & Community
    { specialty_name: 'Family Medicine', axes: { procedural_affinity: 0.3, surgical_tolerance: 0.2, emergency_tolerance: 0.4, diagnostic_puzzle_affinity: 0.5, acute_vs_longitudinal: 0.15, pediatric_affinity: 0.6, ob_gyn_affinity: 0.5, psych_affinity: 0.5, lab_imaging_affinity: 0.3, lifestyle_priority: 0.6, income_priority: 0.4, research_academic_affinity: 0.3, admin_systems_affinity: 0.3, public_health_affinity: 0.4 } },
    { specialty_name: 'Community/Public Health Medicine', axes: { procedural_affinity: 0.1, surgical_tolerance: 0.1, emergency_tolerance: 0.3, diagnostic_puzzle_affinity: 0.4, acute_vs_longitudinal: 0.2, pediatric_affinity: 0.5, ob_gyn_affinity: 0.5, psych_affinity: 0.5, lab_imaging_affinity: 0.3, lifestyle_priority: 0.6, income_priority: 0.35, research_academic_affinity: 0.5, admin_systems_affinity: 0.55, public_health_affinity: 0.9 } },
    { specialty_name: 'Occupational Medicine', axes: { procedural_affinity: 0.2, surgical_tolerance: 0.2, emergency_tolerance: 0.3, diagnostic_puzzle_affinity: 0.4, acute_vs_longitudinal: 0.3, pediatric_affinity: 0.5, ob_gyn_affinity: 0.5, psych_affinity: 0.5, lab_imaging_affinity: 0.3, lifestyle_priority: 0.75, income_priority: 0.5, research_academic_affinity: 0.3, admin_systems_affinity: 0.3, public_health_affinity: 0.6 } },
    // Dermatology & Lifestyle
    { specialty_name: 'Dermatology', axes: { procedural_affinity: 0.4, surgical_tolerance: 0.3, emergency_tolerance: 0.2, diagnostic_puzzle_affinity: 0.4, acute_vs_longitudinal: 0.3, pediatric_affinity: 0.5, ob_gyn_affinity: 0.5, psych_affinity: 0.5, lab_imaging_affinity: 0.5, lifestyle_priority: 0.85, income_priority: 0.75, research_academic_affinity: 0.3, admin_systems_affinity: 0.3, public_health_affinity: 0.3 } },
    { specialty_name: 'Physical Medicine & Rehabilitation', axes: { procedural_affinity: 0.3, surgical_tolerance: 0.2, emergency_tolerance: 0.2, diagnostic_puzzle_affinity: 0.4, acute_vs_longitudinal: 0.3, pediatric_affinity: 0.5, ob_gyn_affinity: 0.5, psych_affinity: 0.5, lab_imaging_affinity: 0.4, lifestyle_priority: 0.75, income_priority: 0.45, research_academic_affinity: 0.3, admin_systems_affinity: 0.3, public_health_affinity: 0.3 } },
    { specialty_name: 'Allergy & Immunology', axes: { procedural_affinity: 0.2, surgical_tolerance: 0.2, emergency_tolerance: 0.3, diagnostic_puzzle_affinity: 0.6, acute_vs_longitudinal: 0.3, pediatric_affinity: 0.5, ob_gyn_affinity: 0.5, psych_affinity: 0.5, lab_imaging_affinity: 0.5, lifestyle_priority: 0.7, income_priority: 0.45, research_academic_affinity: 0.4, admin_systems_affinity: 0.3, public_health_affinity: 0.3 } },
    // Admin / Non-Clinical
    { specialty_name: 'Quality Management & Patient Safety', axes: { procedural_affinity: 0.1, surgical_tolerance: 0.1, emergency_tolerance: 0.3, diagnostic_puzzle_affinity: 0.3, acute_vs_longitudinal: 0.3, pediatric_affinity: 0.5, ob_gyn_affinity: 0.5, psych_affinity: 0.5, lab_imaging_affinity: 0.3, lifestyle_priority: 0.7, income_priority: 0.5, research_academic_affinity: 0.3, admin_systems_affinity: 0.95, public_health_affinity: 0.5 } },
    { specialty_name: 'Infection Control & Hospital Epidemiology', axes: { procedural_affinity: 0.1, surgical_tolerance: 0.1, emergency_tolerance: 0.3, diagnostic_puzzle_affinity: 0.5, acute_vs_longitudinal: 0.3, pediatric_affinity: 0.5, ob_gyn_affinity: 0.5, psych_affinity: 0.5, lab_imaging_affinity: 0.4, lifestyle_priority: 0.6, income_priority: 0.5, research_academic_affinity: 0.4, admin_systems_affinity: 0.85, public_health_affinity: 0.8 } },
    { specialty_name: 'Health Informatics / Medical Informatics', axes: { procedural_affinity: 0.1, surgical_tolerance: 0.1, emergency_tolerance: 0.2, diagnostic_puzzle_affinity: 0.4, acute_vs_longitudinal: 0.3, pediatric_affinity: 0.5, ob_gyn_affinity: 0.5, psych_affinity: 0.5, lab_imaging_affinity: 0.4, lifestyle_priority: 0.6, income_priority: 0.55, research_academic_affinity: 0.6, admin_systems_affinity: 0.85, public_health_affinity: 0.3 } },
    { specialty_name: 'Medical Education / Academic Faculty', axes: { procedural_affinity: 0.1, surgical_tolerance: 0.1, emergency_tolerance: 0.2, diagnostic_puzzle_affinity: 0.4, acute_vs_longitudinal: 0.3, pediatric_affinity: 0.5, ob_gyn_affinity: 0.5, psych_affinity: 0.5, lab_imaging_affinity: 0.3, lifestyle_priority: 0.6, income_priority: 0.45, research_academic_affinity: 0.9, admin_systems_affinity: 0.5, public_health_affinity: 0.3 } },
    { specialty_name: 'Hospital Administration / Medical Directorship', axes: { procedural_affinity: 0.1, surgical_tolerance: 0.1, emergency_tolerance: 0.3, diagnostic_puzzle_affinity: 0.3, acute_vs_longitudinal: 0.3, pediatric_affinity: 0.5, ob_gyn_affinity: 0.5, psych_affinity: 0.5, lab_imaging_affinity: 0.2, lifestyle_priority: 0.5, income_priority: 0.6, research_academic_affinity: 0.3, admin_systems_affinity: 0.95, public_health_affinity: 0.4 } },
    { specialty_name: 'Public Health / Epidemiology (non-clinical)', axes: { procedural_affinity: 0.1, surgical_tolerance: 0.1, emergency_tolerance: 0.3, diagnostic_puzzle_affinity: 0.5, acute_vs_longitudinal: 0.2, pediatric_affinity: 0.5, ob_gyn_affinity: 0.5, psych_affinity: 0.5, lab_imaging_affinity: 0.3, lifestyle_priority: 0.6, income_priority: 0.4, research_academic_affinity: 0.7, admin_systems_affinity: 0.5, public_health_affinity: 0.95 } },
    { specialty_name: 'Health Insurance / Medical Underwriting', axes: { procedural_affinity: 0.1, surgical_tolerance: 0.1, emergency_tolerance: 0.2, diagnostic_puzzle_affinity: 0.3, acute_vs_longitudinal: 0.3, pediatric_affinity: 0.5, ob_gyn_affinity: 0.5, psych_affinity: 0.5, lab_imaging_affinity: 0.2, lifestyle_priority: 0.75, income_priority: 0.65, research_academic_affinity: 0.2, admin_systems_affinity: 0.8, public_health_affinity: 0.3 } },
    { specialty_name: 'Pharmaceutical / Clinical Research Medicine', axes: { procedural_affinity: 0.1, surgical_tolerance: 0.1, emergency_tolerance: 0.2, diagnostic_puzzle_affinity: 0.4, acute_vs_longitudinal: 0.3, pediatric_affinity: 0.5, ob_gyn_affinity: 0.5, psych_affinity: 0.5, lab_imaging_affinity: 0.3, lifestyle_priority: 0.5, income_priority: 0.65, research_academic_affinity: 0.9, admin_systems_affinity: 0.5, public_health_affinity: 0.3 } },
    { specialty_name: 'Forensic Medicine', axes: { procedural_affinity: 0.2, surgical_tolerance: 0.3, emergency_tolerance: 0.3, diagnostic_puzzle_affinity: 0.7, acute_vs_longitudinal: 0.3, pediatric_affinity: 0.5, ob_gyn_affinity: 0.5, psych_affinity: 0.5, lab_imaging_affinity: 0.5, lifestyle_priority: 0.6, income_priority: 0.45, research_academic_affinity: 0.4, admin_systems_affinity: 0.5, public_health_affinity: 0.4 } },
  ],
};
