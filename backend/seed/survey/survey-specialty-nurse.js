// Nurse Specialty Survey — branching tree covering all 25 nurse specialties
// 12 axes: critical_care_acuity, procedural_technical, acute_vs_chronic,
//   pediatric_affinity, ob_maternal_affinity, psych_affinity,
//   patient_education_affinity, community_outreach,
//   lifestyle_priority, income_priority, management_leadership,
//   admin_systems_affinity
// Target vectors map to all 25 nurse specialties from §6

export const nurseSpecialtyGraph = {
  type: 'specialty',
  role: 'nurse',
  root_node_id: 'ROOT',
  axes: [
    'critical_care_acuity', 'procedural_technical', 'acute_vs_chronic',
    'pediatric_affinity', 'ob_maternal_affinity', 'psych_affinity',
    'patient_education_affinity', 'community_outreach',
    'lifestyle_priority', 'income_priority', 'management_leadership',
    'admin_systems_affinity',
  ],
  nodes: [
    {
      node_id: 'ROOT', order: 1, is_universal: false,
      question_text: "A patient's condition suddenly deteriorates. What's your first instinct?",
      options: [
        { option_text: 'Jump in — I thrive on action and urgency', next_node_id: 'HIGH_ACUITY',
          axis_deltas: { critical_care_acuity: 2, acute_vs_chronic: 2 } },
        { option_text: 'Step back and assess the whole picture', next_node_id: 'COGNITIVE_PATH',
          axis_deltas: { patient_education_affinity: 1, community_outreach: 1 } },
        { option_text: 'Focus on the person and what they need right now', next_node_id: 'RELATIONAL_PATH',
          axis_deltas: { psych_affinity: 1, management_leadership: -1 } },
      ],
    },
    {
      node_id: 'HIGH_ACUITY', order: 2, is_universal: false,
      question_text: 'Which high-acuity environment draws you most?',
      options: [
        { option_text: 'Emergency department — fast, varied, unpredictable', next_node_id: 'ER_FOCUS',
          axis_deltas: { acute_vs_chronic: 2, critical_care_acuity: 1 } },
        { option_text: 'Intensive care unit — deep focus on one or two critical patients', next_node_id: 'ICU_FOCUS',
          axis_deltas: { critical_care_acuity: 2, procedural_technical: 1 } },
        { option_text: 'Operating room — precise, structured, behind the scenes', next_node_id: 'OR_FOCUS',
          axis_deltas: { procedural_technical: 2, acute_vs_chronic: 1 } },
      ],
    },
    {
      node_id: 'ER_FOCUS', order: 3, is_universal: false,
      question_text: 'In the emergency department, which role fits you best?',
      options: [
        { option_text: 'Trauma bay — major resuscitation, bleeding control, coding patients', next_node_id: null,
          axis_deltas: { critical_care_acuity: 2, procedural_technical: 1 } },
        { option_text: 'Fast track triage — rapid assessment, prioritizing, patient flow', next_node_id: null,
          axis_deltas: { acute_vs_chronic: 1, patient_education_affinity: 1 } },
        { option_text: 'Pediatric emergencies — sick kids need special care', next_node_id: null,
          axis_deltas: { pediatric_affinity: 2, critical_care_acuity: 1 } },
      ],
    },
    {
      node_id: 'ICU_FOCUS', order: 3, is_universal: false,
      question_text: 'Which intensive care population pulls at you?',
      options: [
        { option_text: 'Adult critical care — ventilators, CRRT, multi-organ support', next_node_id: 'ADULT_CRITICAL',
          axis_deltas: { critical_care_acuity: 2, procedural_technical: 2 } },
        { option_text: 'Neonatal ICU — tiny patients, intense family bonds', next_node_id: 'NICU_FOCUS',
          axis_deltas: { pediatric_affinity: 3, critical_care_acuity: 1 } },
        { option_text: 'Cardiac ICU — hearts, telemetry, post-arrest care', next_node_id: null,
          axis_deltas: { critical_care_acuity: 1, procedural_technical: 2 } },
      ],
    },
    {
      node_id: 'ADULT_CRITICAL', order: 4, is_universal: false,
      question_text: 'What kind of critical care appeals more?',
      options: [
        { option_text: 'Bedside ICU — managing complex drips, vents, and family conversations', next_node_id: null,
          axis_deltas: { critical_care_acuity: 2, patient_education_affinity: 1 } },
        { option_text: 'Critical care transport — moving patients by helicopter or fixed-wing', next_node_id: null,
          axis_deltas: { acute_vs_chronic: 2, procedural_technical: 1, lifestyle_priority: -1 } },
      ],
    },
    {
      node_id: 'NICU_FOCUS', order: 4, is_universal: false,
      question_text: 'NICU — what draws your focus?',
      options: [
        { option_text: 'Extreme prematurity — micro-preemies, developmental care', next_node_id: null,
          axis_deltas: { pediatric_affinity: 2, critical_care_acuity: 1 } },
        { option_text: 'Neonatal surgical — post-op care for congenital anomaly repairs', next_node_id: null,
          axis_deltas: { procedural_technical: 1, pediatric_affinity: 2 } },
      ],
    },
    {
      node_id: 'OR_FOCUS', order: 3, is_universal: false,
      question_text: 'Which surgical nursing role appeals?',
      options: [
        { option_text: 'Scrub nurse — sterile field, instruments, anticipation', next_node_id: null,
          axis_deltas: { procedural_technical: 2, acute_vs_chronic: 1 } },
        { option_text: 'Circulating nurse — coordination, patient positioning, documentation', next_node_id: null,
          axis_deltas: { management_leadership: 1, procedural_technical: 1 } },
        { option_text: 'PACU — one-on-one recovery after anesthesia', next_node_id: null,
          axis_deltas: { acute_vs_chronic: 1, critical_care_acuity: 1 } },
      ],
    },
    {
      node_id: 'COGNITIVE_PATH', order: 2, is_universal: false,
      question_text: "You're analytical. What draws your curiosity?",
      options: [
        { option_text: 'Patterns and systems — how to make care better', next_node_id: 'SYSTEMS_FOCUS',
          axis_deltas: { admin_systems_affinity: 2, patient_education_affinity: 1 } },
        { option_text: 'Teaching and developing others', next_node_id: 'TEACHING_FOCUS',
          axis_deltas: { patient_education_affinity: 2, community_outreach: 1 } },
        { option_text: 'Deep clinical knowledge in one area', next_node_id: 'CLINICAL_EXPERT_FOCUS',
          axis_deltas: { patient_education_affinity: 1, lifestyle_priority: 1 } },
      ],
    },
    {
      node_id: 'SYSTEMS_FOCUS', order: 3, is_universal: false,
      question_text: 'Systems-level impact — what area?',
      options: [
        { option_text: 'Preventing infections and managing outbreaks', next_node_id: null,
          axis_deltas: { admin_systems_affinity: 2, community_outreach: 1 } },
        { option_text: 'Quality metrics, patient safety, and clinical standards', next_node_id: null,
          axis_deltas: { admin_systems_affinity: 3, management_leadership: 1 } },
        { option_text: 'Health data, EHR optimization, and informatics', next_node_id: null,
          axis_deltas: { admin_systems_affinity: 3, lifestyle_priority: 1 } },
      ],
    },
    {
      node_id: 'TEACHING_FOCUS', order: 3, is_universal: false,
      question_text: 'Teaching — who do you want to reach?',
      options: [
        { option_text: 'Nursing students and new graduates', next_node_id: null,
          axis_deltas: { patient_education_affinity: 2, management_leadership: 1 } },
        { option_text: 'Patients and families in the community', next_node_id: null,
          axis_deltas: { community_outreach: 3, patient_education_affinity: 1 } },
        { option_text: 'Employee health and workplace wellness', next_node_id: null,
          axis_deltas: { community_outreach: 1, lifestyle_priority: 2, income_priority: 1 } },
      ],
    },
    {
      node_id: 'CLINICAL_EXPERT_FOCUS', order: 3, is_universal: false,
      question_text: 'Deep clinical expertise in which area?',
      options: [
        { option_text: 'Chronic disease management at home — independent, autonomous', next_node_id: null,
          axis_deltas: { community_outreach: 2, patient_education_affinity: 2, lifestyle_priority: 1 } },
        { option_text: 'Cancer treatment — chemotherapy, symptom management, survivorship', next_node_id: null,
          axis_deltas: { patient_education_affinity: 2, income_priority: 1, acute_vs_chronic: -1 } },
        { option_text: 'Kidney disease and dialysis — long-term patient relationships', next_node_id: null,
          axis_deltas: { procedural_technical: 1, patient_education_affinity: 1, lifestyle_priority: 1 } },
        { option_text: 'Rehabilitation — helping patients regain function after stroke or injury', next_node_id: null,
          axis_deltas: { patient_education_affinity: 2, community_outreach: 1 } },
      ],
    },
    {
      node_id: 'RELATIONAL_PATH', order: 2, is_universal: false,
      question_text: 'You connect through relationships. Who do you most want to care for?',
      options: [
        { option_text: 'Children and their families', next_node_id: 'PEDS_FOCUS',
          axis_deltas: { pediatric_affinity: 3 } },
        { option_text: 'Women — pregnancy, childbirth, and reproductive health', next_node_id: 'WOMEN_FOCUS',
          axis_deltas: { ob_maternal_affinity: 3 } },
        { option_text: 'People with mental health challenges', next_node_id: 'MENTAL_FOCUS',
          axis_deltas: { psych_affinity: 3 } },
        { option_text: 'The elderly — life stories and holistic care', next_node_id: null,
          axis_deltas: { lifestyle_priority: 1, acute_vs_chronic: -1 } },
        { option_text: 'I want to lead, coordinate, and organize care', next_node_id: 'MANAGEMENT_FOCUS',
          axis_deltas: { management_leadership: 3, admin_systems_affinity: 1 } },
      ],
    },
    {
      node_id: 'PEDS_FOCUS', order: 3, is_universal: false,
      question_text: 'Which pediatric nursing area?',
      options: [
        { option_text: 'General pediatric ward — varied, family-centered, developmental', next_node_id: null,
          axis_deltas: { pediatric_affinity: 2, patient_education_affinity: 1 } },
        { option_text: 'Pediatric oncology — long-term bonds, complex care, hard losses', next_node_id: null,
          axis_deltas: { pediatric_affinity: 2, patient_education_affinity: 1, income_priority: 1 } },
      ],
    },
    {
      node_id: 'WOMEN_FOCUS', order: 3, is_universal: false,
      question_text: 'Which aspect of women\'s health?',
      options: [
        { option_text: 'Labor and delivery — active, dynamic, unpredictable', next_node_id: null,
          axis_deltas: { ob_maternal_affinity: 2, acute_vs_chronic: 2 } },
        { option_text: 'Postpartum and newborn care — teaching, bonding, early discharge', next_node_id: null,
          axis_deltas: { ob_maternal_affinity: 2, patient_education_affinity: 2 } },
        { option_text: 'Full-scope midwifery — autonomous, holistic, community-based', next_node_id: null,
          axis_deltas: { ob_maternal_affinity: 3, community_outreach: 1, lifestyle_priority: 1 } },
      ],
    },
    {
      node_id: 'MENTAL_FOCUS', order: 3, is_universal: false,
      question_text: 'Mental health — which setting?',
      options: [
        { option_text: 'Acute inpatient psychiatry — crisis stabilization, safety, structure', next_node_id: null,
          axis_deltas: { psych_affinity: 2, acute_vs_chronic: 2 } },
        { option_text: 'Community mental health — outreach, recovery, long-term support', next_node_id: null,
          axis_deltas: { psych_affinity: 2, community_outreach: 2 } },
      ],
    },
    {
      node_id: 'MANAGEMENT_FOCUS', order: 3, is_universal: false,
      question_text: 'What kind of leadership role?',
      options: [
        { option_text: 'Unit manager — staffing, budgeting, team culture', next_node_id: null,
          axis_deltas: { management_leadership: 3, admin_systems_affinity: 1 } },
        { option_text: 'Case management — discharge planning, care coordination, advocacy', next_node_id: null,
          axis_deltas: { management_leadership: 1, admin_systems_affinity: 2, patient_education_affinity: 1 } },
      ],
    },
    // Universal calibration questions
    {
      node_id: 'CALIB_LIFESTYLE', order: 5, is_universal: true,
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
      node_id: 'CALIB_INCOME', order: 6, is_universal: true,
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
      node_id: 'CALIB_ACADEMIC', order: 7, is_universal: true,
      question_text: 'Do you see yourself moving into education, management, or advanced practice?',
      options: [
        { option_text: 'Yes — leadership or education is my long-term goal', next_node_id: null, axis_deltas: { management_leadership: 3 } },
        { option_text: 'Somewhat — I am open to it later', next_node_id: null, axis_deltas: { management_leadership: 1.5 } },
        { option_text: 'No — I want to stay at the bedside', next_node_id: null, axis_deltas: { management_leadership: 0 } },
      ],
    },
  ],
  target_vectors: [
  {
    "specialty_name": "ICU / Critical Care Nursing",
    "axes": {
      "critical_care_acuity": 0.9,
      "procedural_technical": 0.7,
      "acute_vs_chronic": 0.8,
      "pediatric_affinity": 0.5,
      "ob_maternal_affinity": 0.5,
      "psych_affinity": 0.5,
      "patient_education_affinity": 0.5,
      "community_outreach": 0.3,
      "lifestyle_priority": 0.4,
      "income_priority": 0.5,
      "management_leadership": 0.5,
      "admin_systems_affinity": 0.3
    }
  },
  {
    "specialty_name": "Emergency Room Nursing",
    "axes": {
      "critical_care_acuity": 0.85,
      "procedural_technical": 0.6,
      "acute_vs_chronic": 0.95,
      "pediatric_affinity": 0.5,
      "ob_maternal_affinity": 0.5,
      "psych_affinity": 0.5,
      "patient_education_affinity": 0.4,
      "community_outreach": 0.3,
      "lifestyle_priority": 0.5,
      "income_priority": 0.5,
      "management_leadership": 0.4,
      "admin_systems_affinity": 0.3
    }
  },
  {
    "specialty_name": "Neonatal ICU Nursing",
    "axes": {
      "critical_care_acuity": 0.7,
      "procedural_technical": 0.6,
      "acute_vs_chronic": 0.6,
      "pediatric_affinity": 0.95,
      "ob_maternal_affinity": 0.5,
      "psych_affinity": 0.5,
      "patient_education_affinity": 0.6,
      "community_outreach": 0.3,
      "lifestyle_priority": 0.4,
      "income_priority": 0.5,
      "management_leadership": 0.4,
      "admin_systems_affinity": 0.3
    }
  },
  {
    "specialty_name": "Cardiac Care Nursing",
    "axes": {
      "critical_care_acuity": 0.7,
      "procedural_technical": 0.6,
      "acute_vs_chronic": 0.7,
      "pediatric_affinity": 0.5,
      "ob_maternal_affinity": 0.5,
      "psych_affinity": 0.5,
      "patient_education_affinity": 0.5,
      "community_outreach": 0.3,
      "lifestyle_priority": 0.4,
      "income_priority": 0.5,
      "management_leadership": 0.4,
      "admin_systems_affinity": 0.3
    }
  },
  {
    "specialty_name": "Flight/Transport Nursing",
    "axes": {
      "critical_care_acuity": 0.85,
      "procedural_technical": 0.7,
      "acute_vs_chronic": 0.9,
      "pediatric_affinity": 0.5,
      "ob_maternal_affinity": 0.5,
      "psych_affinity": 0.5,
      "patient_education_affinity": 0.4,
      "community_outreach": 0.3,
      "lifestyle_priority": 0.3,
      "income_priority": 0.6,
      "management_leadership": 0.5,
      "admin_systems_affinity": 0.3
    }
  },
  {
    "specialty_name": "OR / Surgical (Perioperative) Nursing",
    "axes": {
      "critical_care_acuity": 0.4,
      "procedural_technical": 0.9,
      "acute_vs_chronic": 0.6,
      "pediatric_affinity": 0.5,
      "ob_maternal_affinity": 0.5,
      "psych_affinity": 0.5,
      "patient_education_affinity": 0.3,
      "community_outreach": 0.2,
      "lifestyle_priority": 0.5,
      "income_priority": 0.5,
      "management_leadership": 0.4,
      "admin_systems_affinity": 0.3
    }
  },
  {
    "specialty_name": "Post-Anesthesia Care (PACU) Nursing",
    "axes": {
      "critical_care_acuity": 0.5,
      "procedural_technical": 0.6,
      "acute_vs_chronic": 0.6,
      "pediatric_affinity": 0.5,
      "ob_maternal_affinity": 0.5,
      "psych_affinity": 0.5,
      "patient_education_affinity": 0.4,
      "community_outreach": 0.3,
      "lifestyle_priority": 0.5,
      "income_priority": 0.5,
      "management_leadership": 0.4,
      "admin_systems_affinity": 0.3
    }
  },
  {
    "specialty_name": "Pediatric Nursing",
    "axes": {
      "critical_care_acuity": 0.3,
      "procedural_technical": 0.3,
      "acute_vs_chronic": 0.4,
      "pediatric_affinity": 0.9,
      "ob_maternal_affinity": 0.5,
      "psych_affinity": 0.4,
      "patient_education_affinity": 0.6,
      "community_outreach": 0.3,
      "lifestyle_priority": 0.5,
      "income_priority": 0.4,
      "management_leadership": 0.3,
      "admin_systems_affinity": 0.3
    }
  },
  {
    "specialty_name": "Pediatric Oncology Nursing",
    "axes": {
      "critical_care_acuity": 0.4,
      "procedural_technical": 0.5,
      "acute_vs_chronic": 0.3,
      "pediatric_affinity": 0.85,
      "ob_maternal_affinity": 0.5,
      "psych_affinity": 0.4,
      "patient_education_affinity": 0.7,
      "community_outreach": 0.3,
      "lifestyle_priority": 0.4,
      "income_priority": 0.5,
      "management_leadership": 0.4,
      "admin_systems_affinity": 0.3
    }
  },
  {
    "specialty_name": "Labor & Delivery / Obstetric Nursing",
    "axes": {
      "critical_care_acuity": 0.5,
      "procedural_technical": 0.5,
      "acute_vs_chronic": 0.7,
      "pediatric_affinity": 0.5,
      "ob_maternal_affinity": 0.95,
      "psych_affinity": 0.4,
      "patient_education_affinity": 0.5,
      "community_outreach": 0.3,
      "lifestyle_priority": 0.4,
      "income_priority": 0.5,
      "management_leadership": 0.4,
      "admin_systems_affinity": 0.3
    }
  },
  {
    "specialty_name": "Midwifery-track Nursing",
    "axes": {
      "critical_care_acuity": 0.3,
      "procedural_technical": 0.4,
      "acute_vs_chronic": 0.4,
      "pediatric_affinity": 0.5,
      "ob_maternal_affinity": 0.95,
      "psych_affinity": 0.4,
      "patient_education_affinity": 0.6,
      "community_outreach": 0.5,
      "lifestyle_priority": 0.5,
      "income_priority": 0.5,
      "management_leadership": 0.5,
      "admin_systems_affinity": 0.3
    }
  },
  {
    "specialty_name": "Psychiatric/Mental Health Nursing",
    "axes": {
      "critical_care_acuity": 0.2,
      "procedural_technical": 0.1,
      "acute_vs_chronic": 0.5,
      "pediatric_affinity": 0.5,
      "ob_maternal_affinity": 0.5,
      "psych_affinity": 0.95,
      "patient_education_affinity": 0.5,
      "community_outreach": 0.4,
      "lifestyle_priority": 0.5,
      "income_priority": 0.4,
      "management_leadership": 0.4,
      "admin_systems_affinity": 0.3
    }
  },
  {
    "specialty_name": "Community/Public Health Nursing",
    "axes": {
      "critical_care_acuity": 0.2,
      "procedural_technical": 0.2,
      "acute_vs_chronic": 0.2,
      "pediatric_affinity": 0.5,
      "ob_maternal_affinity": 0.5,
      "psych_affinity": 0.5,
      "patient_education_affinity": 0.8,
      "community_outreach": 0.95,
      "lifestyle_priority": 0.6,
      "income_priority": 0.4,
      "management_leadership": 0.4,
      "admin_systems_affinity": 0.4
    }
  },
  {
    "specialty_name": "Home Health Nursing",
    "axes": {
      "critical_care_acuity": 0.2,
      "procedural_technical": 0.3,
      "acute_vs_chronic": 0.15,
      "pediatric_affinity": 0.5,
      "ob_maternal_affinity": 0.5,
      "psych_affinity": 0.5,
      "patient_education_affinity": 0.7,
      "community_outreach": 0.85,
      "lifestyle_priority": 0.7,
      "income_priority": 0.4,
      "management_leadership": 0.4,
      "admin_systems_affinity": 0.3
    }
  },
  {
    "specialty_name": "Geriatric/Long-Term Care Nursing",
    "axes": {
      "critical_care_acuity": 0.2,
      "procedural_technical": 0.3,
      "acute_vs_chronic": 0.1,
      "pediatric_affinity": 0.5,
      "ob_maternal_affinity": 0.5,
      "psych_affinity": 0.5,
      "patient_education_affinity": 0.5,
      "community_outreach": 0.4,
      "lifestyle_priority": 0.75,
      "income_priority": 0.3,
      "management_leadership": 0.45,
      "admin_systems_affinity": 0.4
    }
  },
  {
    "specialty_name": "Rehabilitation Nursing",
    "axes": {
      "critical_care_acuity": 0.2,
      "procedural_technical": 0.3,
      "acute_vs_chronic": 0.2,
      "pediatric_affinity": 0.5,
      "ob_maternal_affinity": 0.5,
      "psych_affinity": 0.5,
      "patient_education_affinity": 0.8,
      "community_outreach": 0.5,
      "lifestyle_priority": 0.55,
      "income_priority": 0.45,
      "management_leadership": 0.25,
      "admin_systems_affinity": 0.3
    }
  },
  {
    "specialty_name": "Oncology Nursing (adult)",
    "axes": {
      "critical_care_acuity": 0.3,
      "procedural_technical": 0.5,
      "acute_vs_chronic": 0.25,
      "pediatric_affinity": 0.5,
      "ob_maternal_affinity": 0.5,
      "psych_affinity": 0.5,
      "patient_education_affinity": 0.7,
      "community_outreach": 0.3,
      "lifestyle_priority": 0.5,
      "income_priority": 0.5,
      "management_leadership": 0.4,
      "admin_systems_affinity": 0.3
    }
  },
  {
    "specialty_name": "Dialysis/Nephrology Nursing",
    "axes": {
      "critical_care_acuity": 0.3,
      "procedural_technical": 0.6,
      "acute_vs_chronic": 0.2,
      "pediatric_affinity": 0.5,
      "ob_maternal_affinity": 0.5,
      "psych_affinity": 0.5,
      "patient_education_affinity": 0.6,
      "community_outreach": 0.3,
      "lifestyle_priority": 0.6,
      "income_priority": 0.4,
      "management_leadership": 0.3,
      "admin_systems_affinity": 0.3
    }
  },
  {
    "specialty_name": "Nurse Management / Charge Nurse",
    "axes": {
      "critical_care_acuity": 0.3,
      "procedural_technical": 0.3,
      "acute_vs_chronic": 0.4,
      "pediatric_affinity": 0.5,
      "ob_maternal_affinity": 0.5,
      "psych_affinity": 0.5,
      "patient_education_affinity": 0.4,
      "community_outreach": 0.3,
      "lifestyle_priority": 0.5,
      "income_priority": 0.6,
      "management_leadership": 0.95,
      "admin_systems_affinity": 0.7
    }
  },
  {
    "specialty_name": "Nurse Education / Clinical Instructor",
    "axes": {
      "critical_care_acuity": 0.2,
      "procedural_technical": 0.3,
      "acute_vs_chronic": 0.3,
      "pediatric_affinity": 0.5,
      "ob_maternal_affinity": 0.5,
      "psych_affinity": 0.5,
      "patient_education_affinity": 0.9,
      "community_outreach": 0.4,
      "lifestyle_priority": 0.7,
      "income_priority": 0.4,
      "management_leadership": 0.5,
      "admin_systems_affinity": 0.4
    }
  },
  {
    "specialty_name": "Case Management / Care Coordination",
    "axes": {
      "critical_care_acuity": 0.1,
      "procedural_technical": 0.2,
      "acute_vs_chronic": 0.3,
      "pediatric_affinity": 0.5,
      "ob_maternal_affinity": 0.5,
      "psych_affinity": 0.5,
      "patient_education_affinity": 0.5,
      "community_outreach": 0.4,
      "lifestyle_priority": 0.7,
      "income_priority": 0.5,
      "management_leadership": 0.6,
      "admin_systems_affinity": 0.85
    }
  },
  {
    "specialty_name": "Infection Control Nursing",
    "axes": {
      "critical_care_acuity": 0.2,
      "procedural_technical": 0.3,
      "acute_vs_chronic": 0.3,
      "pediatric_affinity": 0.5,
      "ob_maternal_affinity": 0.5,
      "psych_affinity": 0.5,
      "patient_education_affinity": 0.5,
      "community_outreach": 0.5,
      "lifestyle_priority": 0.7,
      "income_priority": 0.5,
      "management_leadership": 0.5,
      "admin_systems_affinity": 0.9
    }
  },
  {
    "specialty_name": "Quality Management / Patient Safety Nursing",
    "axes": {
      "critical_care_acuity": 0.1,
      "procedural_technical": 0.2,
      "acute_vs_chronic": 0.3,
      "pediatric_affinity": 0.5,
      "ob_maternal_affinity": 0.5,
      "psych_affinity": 0.5,
      "patient_education_affinity": 0.35,
      "community_outreach": 0.35,
      "lifestyle_priority": 0.65,
      "income_priority": 0.45,
      "management_leadership": 0.7,
      "admin_systems_affinity": 0.95
    }
  },
  {
    "specialty_name": "Nursing Informatics",
    "axes": {
      "critical_care_acuity": 0.1,
      "procedural_technical": 0.3,
      "acute_vs_chronic": 0.3,
      "pediatric_affinity": 0.5,
      "ob_maternal_affinity": 0.5,
      "psych_affinity": 0.5,
      "patient_education_affinity": 0.3,
      "community_outreach": 0.3,
      "lifestyle_priority": 0.75,
      "income_priority": 0.6,
      "management_leadership": 0.3,
      "admin_systems_affinity": 0.75
    }
  },
  {
    "specialty_name": "Occupational Health Nursing",
    "axes": {
      "critical_care_acuity": 0.1,
      "procedural_technical": 0.2,
      "acute_vs_chronic": 0.3,
      "pediatric_affinity": 0.5,
      "ob_maternal_affinity": 0.5,
      "psych_affinity": 0.5,
      "patient_education_affinity": 0.6,
      "community_outreach": 0.6,
      "lifestyle_priority": 0.85,
      "income_priority": 0.5,
      "management_leadership": 0.4,
      "admin_systems_affinity": 0.5
    }
  }
],
};
