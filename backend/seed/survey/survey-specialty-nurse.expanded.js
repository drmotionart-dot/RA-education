// Auto-generated expanded Nurse Specialty Survey Graph
// Source: survey-specialty-nurse.js
// Generated on: 2026-07-05T15:36:09.575Z

export const nurse_specialty_graph = {
  type: 'specialty',
  role: 'nurse',
  root_node_id: 'ROOT',
  axes: [
  "critical_care_acuity",
  "procedural_technical",
  "acute_vs_chronic",
  "pediatric_affinity",
  "ob_maternal_affinity",
  "psych_affinity",
  "patient_education_affinity",
  "community_outreach",
  "lifestyle_priority",
  "income_priority",
  "management_leadership",
  "admin_systems_affinity"
],
  nodes: [
  {
    "node_id": "ROOT",
    "order": 1,
    "is_universal": false,
    "question_text": "A patient's condition suddenly deteriorates. What's your first instinct?",
    "options": [
      {
        "option_text": "Jump in — I thrive on action and urgency",
        "next_node_id": "HIGH_ACUITY",
        "axis_deltas": {
          "critical_care_acuity": 2,
          "acute_vs_chronic": 2
        }
      },
      {
        "option_text": "Step back and assess the whole picture",
        "next_node_id": "COGNITIVE_PATH",
        "axis_deltas": {
          "patient_education_affinity": 1,
          "community_outreach": 1
        }
      },
      {
        "option_text": "Focus on the person and what they need right now",
        "next_node_id": "RELATIONAL_PATH",
        "axis_deltas": {
          "psych_affinity": 1,
          "management_leadership": -1
        }
      }
    ]
  },
  {
    "node_id": "HIGH_ACUITY",
    "order": 2,
    "is_universal": false,
    "question_text": "Which high-acuity environment draws you most?",
    "options": [
      {
        "option_text": "Emergency department — fast, varied, unpredictable",
        "next_node_id": "ER_FOCUS",
        "axis_deltas": {
          "acute_vs_chronic": 2,
          "critical_care_acuity": 1
        }
      },
      {
        "option_text": "Intensive care unit — deep focus on one or two critical patients",
        "next_node_id": "ICU_FOCUS",
        "axis_deltas": {
          "critical_care_acuity": 2,
          "procedural_technical": 1
        }
      },
      {
        "option_text": "Operating room — precise, structured, behind the scenes",
        "next_node_id": "OR_FOCUS",
        "axis_deltas": {
          "procedural_technical": 2,
          "acute_vs_chronic": 1
        }
      }
    ]
  },
  {
    "node_id": "ER_FOCUS",
    "order": 3,
    "is_universal": false,
    "question_text": "In the emergency department, which role fits you best?",
    "options": [
      {
        "option_text": "Trauma bay — major resuscitation, bleeding control, coding patients",
        "next_node_id": "ER_TRIAGE",
        "axis_deltas": {
          "critical_care_acuity": 2,
          "procedural_technical": 1
        }
      },
      {
        "option_text": "Fast track triage — rapid assessment, prioritizing, patient flow",
        "next_node_id": "ER_TRIAGE",
        "axis_deltas": {
          "acute_vs_chronic": 1,
          "patient_education_affinity": 1
        }
      },
      {
        "option_text": "Pediatric emergencies — sick kids need special care",
        "next_node_id": "ER_TRIAGE",
        "axis_deltas": {
          "pediatric_affinity": 2,
          "critical_care_acuity": 1
        }
      }
    ]
  },
  {
    "node_id": "ICU_FOCUS",
    "order": 3,
    "is_universal": false,
    "question_text": "Which intensive care population pulls at you?",
    "options": [
      {
        "option_text": "Adult critical care — ventilators, CRRT, multi-organ support",
        "next_node_id": "ADULT_CRITICAL",
        "axis_deltas": {
          "critical_care_acuity": 2,
          "procedural_technical": 2
        }
      },
      {
        "option_text": "Neonatal ICU — tiny patients, intense family bonds",
        "next_node_id": "NICU_FOCUS",
        "axis_deltas": {
          "pediatric_affinity": 3,
          "critical_care_acuity": 1
        }
      },
      {
        "option_text": "Cardiac ICU — hearts, telemetry, post-arrest care",
        "next_node_id": "ICU_RATIO",
        "axis_deltas": {
          "critical_care_acuity": 1,
          "procedural_technical": 2
        }
      }
    ]
  },
  {
    "node_id": "ADULT_CRITICAL",
    "order": 4,
    "is_universal": false,
    "question_text": "What kind of critical care appeals more?",
    "options": [
      {
        "option_text": "Bedside ICU — managing complex drips, vents, and family conversations",
        "next_node_id": "ADULT_CRIT_VENT",
        "axis_deltas": {
          "critical_care_acuity": 2,
          "patient_education_affinity": 1
        }
      },
      {
        "option_text": "Critical care transport — moving patients by helicopter or fixed-wing",
        "next_node_id": "ADULT_CRIT_VENT",
        "axis_deltas": {
          "acute_vs_chronic": 2,
          "procedural_technical": 1,
          "lifestyle_priority": -1
        }
      }
    ]
  },
  {
    "node_id": "NICU_FOCUS",
    "order": 4,
    "is_universal": false,
    "question_text": "NICU — what draws your focus?",
    "options": [
      {
        "option_text": "Extreme prematurity — micro-preemies, developmental care",
        "next_node_id": "NICU_TINY",
        "axis_deltas": {
          "pediatric_affinity": 2,
          "critical_care_acuity": 1
        }
      },
      {
        "option_text": "Neonatal surgical — post-op care for congenital anomaly repairs",
        "next_node_id": "NICU_TINY",
        "axis_deltas": {
          "procedural_technical": 1,
          "pediatric_affinity": 2
        }
      }
    ]
  },
  {
    "node_id": "OR_FOCUS",
    "order": 3,
    "is_universal": false,
    "question_text": "Which surgical nursing role appeals?",
    "options": [
      {
        "option_text": "Scrub nurse — sterile field, instruments, anticipation",
        "next_node_id": "OR_ROLE",
        "axis_deltas": {
          "procedural_technical": 2,
          "acute_vs_chronic": 1
        }
      },
      {
        "option_text": "Circulating nurse — coordination, patient positioning, documentation",
        "next_node_id": "OR_ROLE",
        "axis_deltas": {
          "management_leadership": 1,
          "procedural_technical": 1
        }
      },
      {
        "option_text": "PACU — one-on-one recovery after anesthesia",
        "next_node_id": "OR_ROLE",
        "axis_deltas": {
          "acute_vs_chronic": 1,
          "critical_care_acuity": 1
        }
      }
    ]
  },
  {
    "node_id": "COGNITIVE_PATH",
    "order": 2,
    "is_universal": false,
    "question_text": "You're analytical. What draws your curiosity?",
    "options": [
      {
        "option_text": "Patterns and systems — how to make care better",
        "next_node_id": "SYSTEMS_FOCUS",
        "axis_deltas": {
          "admin_systems_affinity": 2,
          "patient_education_affinity": 1
        }
      },
      {
        "option_text": "Teaching and developing others",
        "next_node_id": "TEACHING_FOCUS",
        "axis_deltas": {
          "patient_education_affinity": 2,
          "community_outreach": 1
        }
      },
      {
        "option_text": "Deep clinical knowledge in one area",
        "next_node_id": "CLINICAL_EXPERT_FOCUS",
        "axis_deltas": {
          "patient_education_affinity": 1,
          "lifestyle_priority": 1
        }
      }
    ]
  },
  {
    "node_id": "SYSTEMS_FOCUS",
    "order": 3,
    "is_universal": false,
    "question_text": "Systems-level impact — what area?",
    "options": [
      {
        "option_text": "Preventing infections and managing outbreaks",
        "next_node_id": "SYSTEMS_FOCUS_EXPLORE1",
        "axis_deltas": {
          "admin_systems_affinity": 2,
          "community_outreach": 1
        }
      },
      {
        "option_text": "Quality metrics, patient safety, and clinical standards",
        "next_node_id": "SYSTEMS_FOCUS_EXPLORE1",
        "axis_deltas": {
          "admin_systems_affinity": 3,
          "management_leadership": 1
        }
      },
      {
        "option_text": "Health data, EHR optimization, and informatics",
        "next_node_id": "SYSTEMS_FOCUS_EXPLORE1",
        "axis_deltas": {
          "admin_systems_affinity": 3,
          "lifestyle_priority": 1
        }
      }
    ]
  },
  {
    "node_id": "TEACHING_FOCUS",
    "order": 3,
    "is_universal": false,
    "question_text": "Teaching — who do you want to reach?",
    "options": [
      {
        "option_text": "Nursing students and new graduates",
        "next_node_id": "EDUC_SETTING",
        "axis_deltas": {
          "patient_education_affinity": 2,
          "management_leadership": 1
        }
      },
      {
        "option_text": "Patients and families in the community",
        "next_node_id": "EDUC_SETTING",
        "axis_deltas": {
          "community_outreach": 3,
          "patient_education_affinity": 1
        }
      },
      {
        "option_text": "Employee health and workplace wellness",
        "next_node_id": "EDUC_SETTING",
        "axis_deltas": {
          "community_outreach": 1,
          "lifestyle_priority": 2,
          "income_priority": 1
        }
      }
    ]
  },
  {
    "node_id": "CLINICAL_EXPERT_FOCUS",
    "order": 3,
    "is_universal": false,
    "question_text": "Deep clinical expertise in which area?",
    "options": [
      {
        "option_text": "Chronic disease management at home — independent, autonomous",
        "next_node_id": "CLINICAL_EXPERT_FOCUS_EXPLORE1",
        "axis_deltas": {
          "community_outreach": 2,
          "patient_education_affinity": 2,
          "lifestyle_priority": 1
        }
      },
      {
        "option_text": "Cancer treatment — chemotherapy, symptom management, survivorship",
        "next_node_id": "CLINICAL_EXPERT_FOCUS_EXPLORE1",
        "axis_deltas": {
          "patient_education_affinity": 2,
          "income_priority": 1,
          "acute_vs_chronic": -1
        }
      },
      {
        "option_text": "Kidney disease and dialysis — long-term patient relationships",
        "next_node_id": "CLINICAL_EXPERT_FOCUS_EXPLORE1",
        "axis_deltas": {
          "procedural_technical": 1,
          "patient_education_affinity": 1,
          "lifestyle_priority": 1
        }
      },
      {
        "option_text": "Rehabilitation — helping patients regain function after stroke or injury",
        "next_node_id": "CLINICAL_EXPERT_FOCUS_EXPLORE1",
        "axis_deltas": {
          "patient_education_affinity": 2,
          "community_outreach": 1
        }
      }
    ]
  },
  {
    "node_id": "RELATIONAL_PATH",
    "order": 2,
    "is_universal": false,
    "question_text": "You connect through relationships. Who do you most want to care for?",
    "options": [
      {
        "option_text": "Children and their families",
        "next_node_id": "PEDS_FOCUS",
        "axis_deltas": {
          "pediatric_affinity": 3
        }
      },
      {
        "option_text": "Women — pregnancy, childbirth, and reproductive health",
        "next_node_id": "WOMEN_FOCUS",
        "axis_deltas": {
          "ob_maternal_affinity": 3
        }
      },
      {
        "option_text": "People with mental health challenges",
        "next_node_id": "MENTAL_FOCUS",
        "axis_deltas": {
          "psych_affinity": 3
        }
      },
      {
        "option_text": "The elderly — life stories and holistic care",
        "next_node_id": "RELATIONAL_PATH_EXPLORE1",
        "axis_deltas": {
          "lifestyle_priority": 1,
          "acute_vs_chronic": -1
        }
      },
      {
        "option_text": "I want to lead, coordinate, and organize care",
        "next_node_id": "MANAGEMENT_FOCUS",
        "axis_deltas": {
          "management_leadership": 3,
          "admin_systems_affinity": 1
        }
      }
    ]
  },
  {
    "node_id": "PEDS_FOCUS",
    "order": 3,
    "is_universal": false,
    "question_text": "Which pediatric nursing area?",
    "options": [
      {
        "option_text": "General pediatric ward — varied, family-centered, developmental",
        "next_node_id": "PEDS_FOCUS_EXPLORE1",
        "axis_deltas": {
          "pediatric_affinity": 2,
          "patient_education_affinity": 1
        }
      },
      {
        "option_text": "Pediatric oncology — long-term bonds, complex care, hard losses",
        "next_node_id": "PEDS_FOCUS_EXPLORE1",
        "axis_deltas": {
          "pediatric_affinity": 2,
          "patient_education_affinity": 1,
          "income_priority": 1
        }
      }
    ]
  },
  {
    "node_id": "WOMEN_FOCUS",
    "order": 3,
    "is_universal": false,
    "question_text": "Which aspect of women's health?",
    "options": [
      {
        "option_text": "Labor and delivery — active, dynamic, unpredictable",
        "next_node_id": "WOMEN_FOCUS_EXPLORE1",
        "axis_deltas": {
          "ob_maternal_affinity": 2,
          "acute_vs_chronic": 2
        }
      },
      {
        "option_text": "Postpartum and newborn care — teaching, bonding, early discharge",
        "next_node_id": "WOMEN_FOCUS_EXPLORE1",
        "axis_deltas": {
          "ob_maternal_affinity": 2,
          "patient_education_affinity": 2
        }
      },
      {
        "option_text": "Full-scope midwifery — autonomous, holistic, community-based",
        "next_node_id": "WOMEN_FOCUS_EXPLORE1",
        "axis_deltas": {
          "ob_maternal_affinity": 3,
          "community_outreach": 1,
          "lifestyle_priority": 1
        }
      }
    ]
  },
  {
    "node_id": "MENTAL_FOCUS",
    "order": 3,
    "is_universal": false,
    "question_text": "Mental health — which setting?",
    "options": [
      {
        "option_text": "Acute inpatient psychiatry — crisis stabilization, safety, structure",
        "next_node_id": "MENTAL_FOCUS_EXPLORE1",
        "axis_deltas": {
          "psych_affinity": 2,
          "acute_vs_chronic": 2
        }
      },
      {
        "option_text": "Community mental health — outreach, recovery, long-term support",
        "next_node_id": "MENTAL_FOCUS_EXPLORE1",
        "axis_deltas": {
          "psych_affinity": 2,
          "community_outreach": 2
        }
      }
    ]
  },
  {
    "node_id": "MANAGEMENT_FOCUS",
    "order": 3,
    "is_universal": false,
    "question_text": "What kind of leadership role?",
    "options": [
      {
        "option_text": "Unit manager — staffing, budgeting, team culture",
        "next_node_id": "MGMT_STYLE",
        "axis_deltas": {
          "management_leadership": 3,
          "admin_systems_affinity": 1
        }
      },
      {
        "option_text": "Case management — discharge planning, care coordination, advocacy",
        "next_node_id": "MGMT_STYLE",
        "axis_deltas": {
          "management_leadership": 1,
          "admin_systems_affinity": 2,
          "patient_education_affinity": 1
        }
      }
    ]
  },
  {
    "node_id": "CALIB_LIFESTYLE",
    "order": 5,
    "is_universal": true,
    "question_text": "How much does having predictable, controllable hours matter to you? (1 = not at all, 5 = extremely)",
    "options": [
      {
        "option_text": "1 — Not at all",
        "next_node_id": "CALIB_INCOME",
        "axis_deltas": {
          "lifestyle_priority": 0
        }
      },
      {
        "option_text": "2",
        "next_node_id": "CALIB_INCOME",
        "axis_deltas": {
          "lifestyle_priority": 1
        }
      },
      {
        "option_text": "3 — Moderately",
        "next_node_id": "CALIB_INCOME",
        "axis_deltas": {
          "lifestyle_priority": 2
        }
      },
      {
        "option_text": "4",
        "next_node_id": "CALIB_INCOME",
        "axis_deltas": {
          "lifestyle_priority": 3
        }
      },
      {
        "option_text": "5 — Extremely",
        "next_node_id": "CALIB_INCOME",
        "axis_deltas": {
          "lifestyle_priority": 4
        }
      }
    ]
  },
  {
    "node_id": "CALIB_INCOME",
    "order": 6,
    "is_universal": true,
    "question_text": "How much does earning potential factor into your decision? (1 = not at all, 5 = primary driver)",
    "options": [
      {
        "option_text": "1 — Not at all",
        "next_node_id": "CALIB_ACADEMIC",
        "axis_deltas": {
          "income_priority": 0
        }
      },
      {
        "option_text": "2",
        "next_node_id": "CALIB_ACADEMIC",
        "axis_deltas": {
          "income_priority": 1
        }
      },
      {
        "option_text": "3 — Moderately",
        "next_node_id": "CALIB_ACADEMIC",
        "axis_deltas": {
          "income_priority": 2
        }
      },
      {
        "option_text": "4",
        "next_node_id": "CALIB_ACADEMIC",
        "axis_deltas": {
          "income_priority": 3
        }
      },
      {
        "option_text": "5 — Primary driver",
        "next_node_id": "CALIB_ACADEMIC",
        "axis_deltas": {
          "income_priority": 4
        }
      }
    ]
  },
  {
    "node_id": "CALIB_ACADEMIC",
    "order": 7,
    "is_universal": true,
    "question_text": "Do you see yourself moving into education, management, or advanced practice?",
    "options": [
      {
        "option_text": "Yes — leadership or education is my long-term goal",
        "next_node_id": null,
        "axis_deltas": {
          "management_leadership": 3
        }
      },
      {
        "option_text": "Somewhat — I am open to it later",
        "next_node_id": null,
        "axis_deltas": {
          "management_leadership": 1.5
        }
      },
      {
        "option_text": "No — I want to stay at the bedside",
        "next_node_id": null,
        "axis_deltas": {
          "management_leadership": 0
        }
      }
    ]
  },
  {
    "node_id": "ER_TRIAGE",
    "order": 4,
    "is_universal": false,
    "question_text": "In the emergency department, what role fits you best?",
    "options": [
      {
        "option_text": "Trauma bay — major resuscitation, bleeding control, coding patients",
        "next_node_id": "ER_ACUITY",
        "axis_deltas": {
          "critical_care_acuity": 2,
          "procedural_technical": 1
        }
      },
      {
        "option_text": "Triage — rapid assessment and patient flow",
        "next_node_id": "ER_ACUITY",
        "axis_deltas": {
          "acute_vs_chronic": 1,
          "patient_education_affinity": 1
        }
      },
      {
        "option_text": "Fast track — managing moderate acuity with efficiency",
        "next_node_id": "ER_ACUITY",
        "axis_deltas": {
          "acute_vs_chronic": 1,
          "lifestyle_priority": 1
        }
      }
    ]
  },
  {
    "node_id": "ER_ACUITY",
    "order": 5,
    "is_universal": false,
    "question_text": "How do you handle the constant flow and unpredictability of the ER?",
    "options": [
      {
        "option_text": "I thrive on it — the chaos keeps me sharp",
        "next_node_id": "ER_TEAM",
        "axis_deltas": {
          "critical_care_acuity": 2,
          "acute_vs_chronic": 1
        }
      },
      {
        "option_text": "I manage it well with good organizational skills",
        "next_node_id": "ER_TEAM",
        "axis_deltas": {
          "acute_vs_chronic": 1
        }
      },
      {
        "option_text": "It can be overwhelming — I need periods of calm",
        "next_node_id": "ER_TEAM",
        "axis_deltas": {
          "critical_care_acuity": -1,
          "lifestyle_priority": 1
        }
      }
    ]
  },
  {
    "node_id": "ER_TEAM",
    "order": 6,
    "is_universal": false,
    "question_text": "Multi-disciplinary teamwork in the ER — essential part of the job or a challenge?",
    "options": [
      {
        "option_text": "Essential — I love the collaboration",
        "next_node_id": "DEEP1",
        "axis_deltas": {
          "acute_vs_chronic": 1
        }
      },
      {
        "option_text": "A necessary part of the job",
        "next_node_id": "DEEP1",
        "axis_deltas": {}
      },
      {
        "option_text": "Often frustrating — too many competing priorities",
        "next_node_id": "DEEP1",
        "axis_deltas": {
          "management_leadership": 1
        }
      }
    ]
  },
  {
    "node_id": "ICU_RATIO",
    "order": 4,
    "is_universal": false,
    "question_text": "One-to-one or one-to-two critical care — which ratio suits you?",
    "options": [
      {
        "option_text": "One-to-one — deep focus on a single critically ill patient",
        "next_node_id": "ICU_TECH",
        "axis_deltas": {
          "critical_care_acuity": 2,
          "procedural_technical": 1
        }
      },
      {
        "option_text": "One-to-two — I like the variety and pace",
        "next_node_id": "ICU_TECH",
        "axis_deltas": {
          "critical_care_acuity": 1,
          "acute_vs_chronic": 1
        }
      },
      {
        "option_text": "I prefer progressive care / step-down over full ICU",
        "next_node_id": "ICU_TECH",
        "axis_deltas": {
          "critical_care_acuity": -1
        }
      }
    ]
  },
  {
    "node_id": "ICU_TECH",
    "order": 5,
    "is_universal": false,
    "question_text": "How comfortable are you with complex ICU technology — vents, CRRT, invasive lines?",
    "options": [
      {
        "option_text": "Very — the technology is exciting to me",
        "next_node_id": "ICU_FAMILY",
        "axis_deltas": {
          "procedural_technical": 2
        }
      },
      {
        "option_text": "Adequate — I can learn what I need to know",
        "next_node_id": "ICU_FAMILY",
        "axis_deltas": {
          "procedural_technical": 1
        }
      },
      {
        "option_text": "I prefer less technology-heavy nursing environments",
        "next_node_id": "ICU_FAMILY",
        "axis_deltas": {
          "procedural_technical": -1,
          "patient_education_affinity": 1
        }
      }
    ]
  },
  {
    "node_id": "ICU_FAMILY",
    "order": 6,
    "is_universal": false,
    "question_text": "Family communication in the ICU — how much does it affect you?",
    "options": [
      {
        "option_text": "It is a core part of the job I take seriously",
        "next_node_id": "DEEP1",
        "axis_deltas": {
          "patient_education_affinity": 1,
          "psych_affinity": 1
        }
      },
      {
        "option_text": "Important but I let the doctors handle the hard conversations",
        "next_node_id": "DEEP1",
        "axis_deltas": {
          "patient_education_affinity": 1
        }
      },
      {
        "option_text": "It drains me — I prefer fewer family interactions",
        "next_node_id": "DEEP1",
        "axis_deltas": {
          "psych_affinity": -1
        }
      }
    ]
  },
  {
    "node_id": "ADULT_CRIT_VENT",
    "order": 5,
    "is_universal": false,
    "question_text": "Managing ventilators, CRRT, and multi-organ support — does this excite you?",
    "options": [
      {
        "option_text": "Yes — complex critical care is my passion",
        "next_node_id": "ADULT_CRIT_DECISIONS",
        "axis_deltas": {
          "critical_care_acuity": 2,
          "procedural_technical": 2
        }
      },
      {
        "option_text": "I can do it competently",
        "next_node_id": "ADULT_CRIT_DECISIONS",
        "axis_deltas": {
          "critical_care_acuity": 1,
          "procedural_technical": 1
        }
      },
      {
        "option_text": "I prefer less invasive, more holistic care",
        "next_node_id": "ADULT_CRIT_DECISIONS",
        "axis_deltas": {
          "procedural_technical": -1
        }
      }
    ]
  },
  {
    "node_id": "ADULT_CRIT_DECISIONS",
    "order": 6,
    "is_universal": false,
    "question_text": "How do you handle goals-of-care conversations and end-of-life decisions with families?",
    "options": [
      {
        "option_text": "I find meaning in helping families through these moments",
        "next_node_id": "ADULT_CRIT_TRANSPORT",
        "axis_deltas": {
          "psych_affinity": 1,
          "patient_education_affinity": 1
        }
      },
      {
        "option_text": "I can participate but they stay with me",
        "next_node_id": "ADULT_CRIT_TRANSPORT",
        "axis_deltas": {
          "psych_affinity": 1
        }
      },
      {
        "option_text": "I find them very difficult — I prefer curative-focused settings",
        "next_node_id": "ADULT_CRIT_TRANSPORT",
        "axis_deltas": {
          "psych_affinity": -1,
          "acute_vs_chronic": 1
        }
      }
    ]
  },
  {
    "node_id": "ADULT_CRIT_TRANSPORT",
    "order": 7,
    "is_universal": false,
    "question_text": "Would you consider critical care transport (helicopter or ground)?",
    "options": [
      {
        "option_text": "Yes — that sounds exciting and challenging",
        "next_node_id": "DEEP1",
        "axis_deltas": {
          "critical_care_acuity": 1,
          "acute_vs_chronic": 1
        }
      },
      {
        "option_text": "Maybe — depends on the setting and patient population",
        "next_node_id": "DEEP1",
        "axis_deltas": {
          "lifestyle_priority": 1
        }
      },
      {
        "option_text": "No — I prefer a fixed-unit environment",
        "next_node_id": "DEEP1",
        "axis_deltas": {
          "lifestyle_priority": 1,
          "acute_vs_chronic": -1
        }
      }
    ]
  },
  {
    "node_id": "NICU_TINY",
    "order": 5,
    "is_universal": false,
    "question_text": "Caring for micro-preemies and extremely fragile neonates — rewarding or overwhelming?",
    "options": [
      {
        "option_text": "Deeply rewarding — these are the patients who need us most",
        "next_node_id": "NICU_PARENTS",
        "axis_deltas": {
          "pediatric_affinity": 2,
          "critical_care_acuity": 1
        }
      },
      {
        "option_text": "Rewarding but the emotional weight is significant",
        "next_node_id": "NICU_PARENTS",
        "axis_deltas": {
          "pediatric_affinity": 1,
          "psych_affinity": 1
        }
      },
      {
        "option_text": "Overwhelming — I prefer older, more stable patients",
        "next_node_id": "NICU_PARENTS",
        "axis_deltas": {
          "pediatric_affinity": -1
        }
      }
    ]
  },
  {
    "node_id": "NICU_PARENTS",
    "order": 6,
    "is_universal": false,
    "question_text": "Parent bonding and coaching in the NICU — is this part of your calling?",
    "options": [
      {
        "option_text": "Yes — supporting parents is as important as caring for the baby",
        "next_node_id": "NICU_OUTCOMES",
        "axis_deltas": {
          "patient_education_affinity": 2,
          "pediatric_affinity": 1
        }
      },
      {
        "option_text": "I support parents but focus mainly on the infant",
        "next_node_id": "NICU_OUTCOMES",
        "axis_deltas": {
          "pediatric_affinity": 1
        }
      },
      {
        "option_text": "I prefer the technical aspect — let social work handle family support",
        "next_node_id": "NICU_OUTCOMES",
        "axis_deltas": {
          "procedural_technical": 1
        }
      }
    ]
  },
  {
    "node_id": "NICU_OUTCOMES",
    "order": 7,
    "is_universal": false,
    "question_text": "How do you cope with the emotional toll of neonatal loss and adverse outcomes?",
    "options": [
      {
        "option_text": "I process it through team debriefing and peer support",
        "next_node_id": "DEEP1",
        "axis_deltas": {
          "psych_affinity": 1
        }
      },
      {
        "option_text": "It is hard but I compartmentalize",
        "next_node_id": "DEEP1",
        "axis_deltas": {
          "management_leadership": 1
        }
      },
      {
        "option_text": "It accumulates over time — it is my biggest concern about NICU",
        "next_node_id": "DEEP1",
        "axis_deltas": {
          "psych_affinity": -1,
          "lifestyle_priority": 1
        }
      }
    ]
  },
  {
    "node_id": "OR_ROLE",
    "order": 4,
    "is_universal": false,
    "question_text": "Which perioperative role appeals to you most?",
    "options": [
      {
        "option_text": "Scrub nurse — sterile field, instruments, anticipating the surgeon",
        "next_node_id": "OR_PRECISION",
        "axis_deltas": {
          "procedural_technical": 2,
          "acute_vs_chronic": 1
        }
      },
      {
        "option_text": "Circulating nurse — coordination, positioning, documentation",
        "next_node_id": "OR_PRECISION",
        "axis_deltas": {
          "management_leadership": 1,
          "procedural_technical": 1
        }
      },
      {
        "option_text": "PACU — one-on-one recovery after anesthesia",
        "next_node_id": "OR_PRECISION",
        "axis_deltas": {
          "critical_care_acuity": 1,
          "acute_vs_chronic": 1
        }
      }
    ]
  },
  {
    "node_id": "OR_PRECISION",
    "order": 5,
    "is_universal": false,
    "question_text": "How do you feel about the meticulous, repetitive nature of OR nursing?",
    "options": [
      {
        "option_text": "I thrive on precision and consistency",
        "next_node_id": "OR_SCHEDULE",
        "axis_deltas": {
          "procedural_technical": 1
        }
      },
      {
        "option_text": "I appreciate it but need variety sometimes",
        "next_node_id": "OR_SCHEDULE",
        "axis_deltas": {}
      },
      {
        "option_text": "I find it tedious — I prefer more dynamic environments",
        "next_node_id": "OR_SCHEDULE",
        "axis_deltas": {
          "acute_vs_chronic": 1,
          "critical_care_acuity": 1
        }
      }
    ]
  },
  {
    "node_id": "OR_SCHEDULE",
    "order": 6,
    "is_universal": false,
    "question_text": "On-call shifts, trauma cases, and weekend surgeries — dealbreaker or acceptable?",
    "options": [
      {
        "option_text": "Acceptable — I knew what I signed up for",
        "next_node_id": "DEEP1",
        "axis_deltas": {
          "acute_vs_chronic": 1,
          "lifestyle_priority": -1
        }
      },
      {
        "option_text": "Tolerable if the schedule is fair and predictable",
        "next_node_id": "DEEP1",
        "axis_deltas": {
          "lifestyle_priority": 1
        }
      },
      {
        "option_text": "A significant drawback — I want a predictable schedule",
        "next_node_id": "DEEP1",
        "axis_deltas": {
          "lifestyle_priority": 2
        }
      }
    ]
  },
  {
    "node_id": "SYSTEMS_FOCUS_EXPLORE1",
    "order": 4,
    "is_universal": false,
    "question_text": "What interests you most about this area of nursing?",
    "options": [
      {
        "option_text": "The clinical challenges and critical thinking",
        "next_node_id": "SYSTEMS_FOCUS_EXPLORE2",
        "axis_deltas": {
          "critical_care_acuity": 1
        }
      },
      {
        "option_text": "The patient relationships and connection",
        "next_node_id": "SYSTEMS_FOCUS_EXPLORE2",
        "axis_deltas": {
          "patient_education_affinity": 1
        }
      },
      {
        "option_text": "The hands-on procedures and skills",
        "next_node_id": "SYSTEMS_FOCUS_EXPLORE2",
        "axis_deltas": {
          "procedural_technical": 1
        }
      }
    ]
  },
  {
    "node_id": "SYSTEMS_FOCUS_EXPLORE2",
    "order": 5,
    "is_universal": false,
    "question_text": "Would you prefer a broad scope or a focused area in this field?",
    "options": [
      {
        "option_text": "Broad scope — I like variety",
        "next_node_id": "SYSTEMS_FOCUS_EXPLORE3",
        "axis_deltas": {}
      },
      {
        "option_text": "Focused expertise — deep knowledge in one niche",
        "next_node_id": "SYSTEMS_FOCUS_EXPLORE3",
        "axis_deltas": {
          "patient_education_affinity": 1
        }
      }
    ]
  },
  {
    "node_id": "SYSTEMS_FOCUS_EXPLORE3",
    "order": 6,
    "is_universal": false,
    "question_text": "How important is work-life balance in this area compared to income?",
    "options": [
      {
        "option_text": "Balance matters more",
        "next_node_id": "DEEP1",
        "axis_deltas": {
          "lifestyle_priority": 1,
          "income_priority": -1
        }
      },
      {
        "option_text": "Income matters more",
        "next_node_id": "DEEP1",
        "axis_deltas": {
          "income_priority": 1
        }
      },
      {
        "option_text": "Both are equally important",
        "next_node_id": "DEEP1",
        "axis_deltas": {}
      }
    ]
  },
  {
    "node_id": "EDUC_SETTING",
    "order": 4,
    "is_universal": false,
    "question_text": "What kind of nurse educator appeals to you?",
    "options": [
      {
        "option_text": "Academic — teaching in nursing schools and universities",
        "next_node_id": "EDUC_LEARNERS",
        "axis_deltas": {
          "patient_education_affinity": 2,
          "management_leadership": 1
        }
      },
      {
        "option_text": "Clinical precepting — one-on-one with new nurses at the bedside",
        "next_node_id": "EDUC_LEARNERS",
        "axis_deltas": {
          "patient_education_affinity": 2,
          "procedural_technical": 1
        }
      },
      {
        "option_text": "Community outreach — health education for populations",
        "next_node_id": "EDUC_LEARNERS",
        "axis_deltas": {
          "community_outreach": 2,
          "patient_education_affinity": 1
        }
      }
    ]
  },
  {
    "node_id": "EDUC_LEARNERS",
    "order": 5,
    "is_universal": false,
    "question_text": "Who do you most want to teach?",
    "options": [
      {
        "option_text": "Nursing students and new graduates — shaping the next generation",
        "next_node_id": "EDUC_GROWTH",
        "axis_deltas": {
          "patient_education_affinity": 1,
          "management_leadership": 1
        }
      },
      {
        "option_text": "Experienced nurses seeking specialization",
        "next_node_id": "EDUC_GROWTH",
        "axis_deltas": {
          "patient_education_affinity": 1
        }
      },
      {
        "option_text": "Patients and families in the community",
        "next_node_id": "EDUC_GROWTH",
        "axis_deltas": {
          "community_outreach": 2,
          "patient_education_affinity": 1
        }
      }
    ]
  },
  {
    "node_id": "EDUC_GROWTH",
    "order": 6,
    "is_universal": false,
    "question_text": "Would you pursue an advanced degree (MSN, DNP, PhD) for education?",
    "options": [
      {
        "option_text": "Yes — already planning to or currently pursuing",
        "next_node_id": "DEEP1",
        "axis_deltas": {
          "management_leadership": 2,
          "income_priority": 1
        }
      },
      {
        "option_text": "Maybe — depends on program length and cost",
        "next_node_id": "DEEP1",
        "axis_deltas": {
          "income_priority": 1
        }
      },
      {
        "option_text": "No — I want to teach from clinical experience, not academia",
        "next_node_id": "DEEP1",
        "axis_deltas": {
          "patient_education_affinity": 1
        }
      }
    ]
  },
  {
    "node_id": "CLINICAL_EXPERT_FOCUS_EXPLORE1",
    "order": 4,
    "is_universal": false,
    "question_text": "What interests you most about this area of nursing?",
    "options": [
      {
        "option_text": "The clinical challenges and critical thinking",
        "next_node_id": "CLINICAL_EXPERT_FOCUS_EXPLORE2",
        "axis_deltas": {
          "critical_care_acuity": 1
        }
      },
      {
        "option_text": "The patient relationships and connection",
        "next_node_id": "CLINICAL_EXPERT_FOCUS_EXPLORE2",
        "axis_deltas": {
          "patient_education_affinity": 1
        }
      },
      {
        "option_text": "The hands-on procedures and skills",
        "next_node_id": "CLINICAL_EXPERT_FOCUS_EXPLORE2",
        "axis_deltas": {
          "procedural_technical": 1
        }
      }
    ]
  },
  {
    "node_id": "CLINICAL_EXPERT_FOCUS_EXPLORE2",
    "order": 5,
    "is_universal": false,
    "question_text": "Would you prefer a broad scope or a focused area in this field?",
    "options": [
      {
        "option_text": "Broad scope — I like variety",
        "next_node_id": "CLINICAL_EXPERT_FOCUS_EXPLORE3",
        "axis_deltas": {}
      },
      {
        "option_text": "Focused expertise — deep knowledge in one niche",
        "next_node_id": "CLINICAL_EXPERT_FOCUS_EXPLORE3",
        "axis_deltas": {
          "patient_education_affinity": 1
        }
      }
    ]
  },
  {
    "node_id": "CLINICAL_EXPERT_FOCUS_EXPLORE3",
    "order": 6,
    "is_universal": false,
    "question_text": "How important is work-life balance in this area compared to income?",
    "options": [
      {
        "option_text": "Balance matters more",
        "next_node_id": "DEEP1",
        "axis_deltas": {
          "lifestyle_priority": 1,
          "income_priority": -1
        }
      },
      {
        "option_text": "Income matters more",
        "next_node_id": "DEEP1",
        "axis_deltas": {
          "income_priority": 1
        }
      },
      {
        "option_text": "Both are equally important",
        "next_node_id": "DEEP1",
        "axis_deltas": {}
      }
    ]
  },
  {
    "node_id": "RELATIONAL_PATH_EXPLORE1",
    "order": 4,
    "is_universal": false,
    "question_text": "What interests you most about this area of nursing?",
    "options": [
      {
        "option_text": "The clinical challenges and critical thinking",
        "next_node_id": "RELATIONAL_PATH_EXPLORE2",
        "axis_deltas": {
          "critical_care_acuity": 1
        }
      },
      {
        "option_text": "The patient relationships and connection",
        "next_node_id": "RELATIONAL_PATH_EXPLORE2",
        "axis_deltas": {
          "patient_education_affinity": 1
        }
      },
      {
        "option_text": "The hands-on procedures and skills",
        "next_node_id": "RELATIONAL_PATH_EXPLORE2",
        "axis_deltas": {
          "procedural_technical": 1
        }
      }
    ]
  },
  {
    "node_id": "RELATIONAL_PATH_EXPLORE2",
    "order": 5,
    "is_universal": false,
    "question_text": "Would you prefer a broad scope or a focused area in this field?",
    "options": [
      {
        "option_text": "Broad scope — I like variety",
        "next_node_id": "RELATIONAL_PATH_EXPLORE3",
        "axis_deltas": {}
      },
      {
        "option_text": "Focused expertise — deep knowledge in one niche",
        "next_node_id": "RELATIONAL_PATH_EXPLORE3",
        "axis_deltas": {
          "patient_education_affinity": 1
        }
      }
    ]
  },
  {
    "node_id": "RELATIONAL_PATH_EXPLORE3",
    "order": 6,
    "is_universal": false,
    "question_text": "How important is work-life balance in this area compared to income?",
    "options": [
      {
        "option_text": "Balance matters more",
        "next_node_id": "DEEP1",
        "axis_deltas": {
          "lifestyle_priority": 1,
          "income_priority": -1
        }
      },
      {
        "option_text": "Income matters more",
        "next_node_id": "DEEP1",
        "axis_deltas": {
          "income_priority": 1
        }
      },
      {
        "option_text": "Both are equally important",
        "next_node_id": "DEEP1",
        "axis_deltas": {}
      }
    ]
  },
  {
    "node_id": "PEDS_FOCUS_EXPLORE1",
    "order": 4,
    "is_universal": false,
    "question_text": "What interests you most about this area of nursing?",
    "options": [
      {
        "option_text": "The clinical challenges and critical thinking",
        "next_node_id": "PEDS_FOCUS_EXPLORE2",
        "axis_deltas": {
          "critical_care_acuity": 1
        }
      },
      {
        "option_text": "The patient relationships and connection",
        "next_node_id": "PEDS_FOCUS_EXPLORE2",
        "axis_deltas": {
          "patient_education_affinity": 1
        }
      },
      {
        "option_text": "The hands-on procedures and skills",
        "next_node_id": "PEDS_FOCUS_EXPLORE2",
        "axis_deltas": {
          "procedural_technical": 1
        }
      }
    ]
  },
  {
    "node_id": "PEDS_FOCUS_EXPLORE2",
    "order": 5,
    "is_universal": false,
    "question_text": "Would you prefer a broad scope or a focused area in this field?",
    "options": [
      {
        "option_text": "Broad scope — I like variety",
        "next_node_id": "PEDS_FOCUS_EXPLORE3",
        "axis_deltas": {}
      },
      {
        "option_text": "Focused expertise — deep knowledge in one niche",
        "next_node_id": "PEDS_FOCUS_EXPLORE3",
        "axis_deltas": {
          "patient_education_affinity": 1
        }
      }
    ]
  },
  {
    "node_id": "PEDS_FOCUS_EXPLORE3",
    "order": 6,
    "is_universal": false,
    "question_text": "How important is work-life balance in this area compared to income?",
    "options": [
      {
        "option_text": "Balance matters more",
        "next_node_id": "DEEP1",
        "axis_deltas": {
          "lifestyle_priority": 1,
          "income_priority": -1
        }
      },
      {
        "option_text": "Income matters more",
        "next_node_id": "DEEP1",
        "axis_deltas": {
          "income_priority": 1
        }
      },
      {
        "option_text": "Both are equally important",
        "next_node_id": "DEEP1",
        "axis_deltas": {}
      }
    ]
  },
  {
    "node_id": "WOMEN_FOCUS_EXPLORE1",
    "order": 4,
    "is_universal": false,
    "question_text": "What interests you most about this area of nursing?",
    "options": [
      {
        "option_text": "The clinical challenges and critical thinking",
        "next_node_id": "WOMEN_FOCUS_EXPLORE2",
        "axis_deltas": {
          "critical_care_acuity": 1
        }
      },
      {
        "option_text": "The patient relationships and connection",
        "next_node_id": "WOMEN_FOCUS_EXPLORE2",
        "axis_deltas": {
          "patient_education_affinity": 1
        }
      },
      {
        "option_text": "The hands-on procedures and skills",
        "next_node_id": "WOMEN_FOCUS_EXPLORE2",
        "axis_deltas": {
          "procedural_technical": 1
        }
      }
    ]
  },
  {
    "node_id": "WOMEN_FOCUS_EXPLORE2",
    "order": 5,
    "is_universal": false,
    "question_text": "Would you prefer a broad scope or a focused area in this field?",
    "options": [
      {
        "option_text": "Broad scope — I like variety",
        "next_node_id": "WOMEN_FOCUS_EXPLORE3",
        "axis_deltas": {}
      },
      {
        "option_text": "Focused expertise — deep knowledge in one niche",
        "next_node_id": "WOMEN_FOCUS_EXPLORE3",
        "axis_deltas": {
          "patient_education_affinity": 1
        }
      }
    ]
  },
  {
    "node_id": "WOMEN_FOCUS_EXPLORE3",
    "order": 6,
    "is_universal": false,
    "question_text": "How important is work-life balance in this area compared to income?",
    "options": [
      {
        "option_text": "Balance matters more",
        "next_node_id": "DEEP1",
        "axis_deltas": {
          "lifestyle_priority": 1,
          "income_priority": -1
        }
      },
      {
        "option_text": "Income matters more",
        "next_node_id": "DEEP1",
        "axis_deltas": {
          "income_priority": 1
        }
      },
      {
        "option_text": "Both are equally important",
        "next_node_id": "DEEP1",
        "axis_deltas": {}
      }
    ]
  },
  {
    "node_id": "MENTAL_FOCUS_EXPLORE1",
    "order": 4,
    "is_universal": false,
    "question_text": "What interests you most about this area of nursing?",
    "options": [
      {
        "option_text": "The clinical challenges and critical thinking",
        "next_node_id": "MENTAL_FOCUS_EXPLORE2",
        "axis_deltas": {
          "critical_care_acuity": 1
        }
      },
      {
        "option_text": "The patient relationships and connection",
        "next_node_id": "MENTAL_FOCUS_EXPLORE2",
        "axis_deltas": {
          "patient_education_affinity": 1
        }
      },
      {
        "option_text": "The hands-on procedures and skills",
        "next_node_id": "MENTAL_FOCUS_EXPLORE2",
        "axis_deltas": {
          "procedural_technical": 1
        }
      }
    ]
  },
  {
    "node_id": "MENTAL_FOCUS_EXPLORE2",
    "order": 5,
    "is_universal": false,
    "question_text": "Would you prefer a broad scope or a focused area in this field?",
    "options": [
      {
        "option_text": "Broad scope — I like variety",
        "next_node_id": "MENTAL_FOCUS_EXPLORE3",
        "axis_deltas": {}
      },
      {
        "option_text": "Focused expertise — deep knowledge in one niche",
        "next_node_id": "MENTAL_FOCUS_EXPLORE3",
        "axis_deltas": {
          "patient_education_affinity": 1
        }
      }
    ]
  },
  {
    "node_id": "MENTAL_FOCUS_EXPLORE3",
    "order": 6,
    "is_universal": false,
    "question_text": "How important is work-life balance in this area compared to income?",
    "options": [
      {
        "option_text": "Balance matters more",
        "next_node_id": "DEEP1",
        "axis_deltas": {
          "lifestyle_priority": 1,
          "income_priority": -1
        }
      },
      {
        "option_text": "Income matters more",
        "next_node_id": "DEEP1",
        "axis_deltas": {
          "income_priority": 1
        }
      },
      {
        "option_text": "Both are equally important",
        "next_node_id": "DEEP1",
        "axis_deltas": {}
      }
    ]
  },
  {
    "node_id": "MGMT_STYLE",
    "order": 4,
    "is_universal": false,
    "question_text": "What kind of nursing leader do you want to be?",
    "options": [
      {
        "option_text": "Hands-on unit manager — staffing, scheduling, mentoring daily",
        "next_node_id": "MGMT_CHALLENGES",
        "axis_deltas": {
          "management_leadership": 2,
          "admin_systems_affinity": 1
        }
      },
      {
        "option_text": "Strategic leader — quality improvement, policy, big picture",
        "next_node_id": "MGMT_CHALLENGES",
        "axis_deltas": {
          "admin_systems_affinity": 2,
          "management_leadership": 1
        }
      },
      {
        "option_text": "I want to lead through clinical expertise, not management",
        "next_node_id": "MGMT_CHALLENGES",
        "axis_deltas": {
          "patient_education_affinity": 1
        }
      }
    ]
  },
  {
    "node_id": "MGMT_CHALLENGES",
    "order": 5,
    "is_universal": false,
    "question_text": "Staffing shortages and budget constraints — how do you handle these?",
    "options": [
      {
        "option_text": "I find creative solutions and advocate for my team",
        "next_node_id": "MGMT_CLINICAL",
        "axis_deltas": {
          "management_leadership": 1,
          "admin_systems_affinity": 1
        }
      },
      {
        "option_text": "I manage within constraints but it frustrates me",
        "next_node_id": "MGMT_CLINICAL",
        "axis_deltas": {
          "management_leadership": 1
        }
      },
      {
        "option_text": "This is the part of management I dread most",
        "next_node_id": "MGMT_CLINICAL",
        "axis_deltas": {
          "admin_systems_affinity": -1
        }
      }
    ]
  },
  {
    "node_id": "MGMT_CLINICAL",
    "order": 6,
    "is_universal": false,
    "question_text": "Would you stay clinically active while managing, or go fully administrative?",
    "options": [
      {
        "option_text": "Stay clinically active — I need patient contact to stay grounded",
        "next_node_id": "DEEP1",
        "axis_deltas": {
          "management_leadership": 1,
          "acute_vs_chronic": 1
        }
      },
      {
        "option_text": "A mix — some clinical, some admin",
        "next_node_id": "DEEP1",
        "axis_deltas": {
          "management_leadership": 1
        }
      },
      {
        "option_text": "Fully administrative — my impact is on systems, not individuals",
        "next_node_id": "DEEP1",
        "axis_deltas": {
          "admin_systems_affinity": 1,
          "management_leadership": 1
        }
      }
    ]
  },
  {
    "node_id": "DEEP1",
    "order": 10,
    "is_universal": false,
    "question_text": "How important is having a predictable schedule and work-life balance in your nursing practice?",
    "options": [
      {
        "option_text": "Extremely — I want control over my shifts",
        "next_node_id": "DEEP2",
        "axis_deltas": {
          "lifestyle_priority": 3
        }
      },
      {
        "option_text": "Moderately — I can handle some unpredictability",
        "next_node_id": "DEEP2",
        "axis_deltas": {
          "lifestyle_priority": 1
        }
      },
      {
        "option_text": "Not important — I work whenever needed",
        "next_node_id": "DEEP2",
        "axis_deltas": {
          "lifestyle_priority": 0,
          "critical_care_acuity": 1
        }
      }
    ]
  },
  {
    "node_id": "DEEP2",
    "order": 11,
    "is_universal": false,
    "question_text": "How do you feel about high-acuity environments where patient status can change in seconds?",
    "options": [
      {
        "option_text": "I thrive on the intensity and pace",
        "next_node_id": "DEEP3",
        "axis_deltas": {
          "critical_care_acuity": 2,
          "acute_vs_chronic": 2
        }
      },
      {
        "option_text": "I can handle it in controlled doses",
        "next_node_id": "DEEP3",
        "axis_deltas": {
          "critical_care_acuity": 0
        }
      },
      {
        "option_text": "I prefer a more stable, predictable environment",
        "next_node_id": "DEEP3",
        "axis_deltas": {
          "critical_care_acuity": -1,
          "acute_vs_chronic": -1
        }
      }
    ]
  },
  {
    "node_id": "DEEP3",
    "order": 12,
    "is_universal": false,
    "question_text": "How important is patient and family education in your ideal nursing role?",
    "options": [
      {
        "option_text": "Essential — teaching is a core part of nursing to me",
        "next_node_id": "DEEP4",
        "axis_deltas": {
          "patient_education_affinity": 2,
          "community_outreach": 1
        }
      },
      {
        "option_text": "Important but not my primary focus",
        "next_node_id": "DEEP4",
        "axis_deltas": {
          "patient_education_affinity": 1
        }
      },
      {
        "option_text": "I prefer tasks over teaching — let the educators handle it",
        "next_node_id": "DEEP4",
        "axis_deltas": {
          "patient_education_affinity": -1
        }
      }
    ]
  },
  {
    "node_id": "DEEP4",
    "order": 13,
    "is_universal": false,
    "question_text": "Do you see yourself mentoring new nurses or leading a team?",
    "options": [
      {
        "option_text": "Yes — leadership and developing others is my path",
        "next_node_id": "DEEP5",
        "axis_deltas": {
          "management_leadership": 2
        }
      },
      {
        "option_text": "Somewhat — I enjoy helping when asked",
        "next_node_id": "DEEP5",
        "axis_deltas": {
          "management_leadership": 1
        }
      },
      {
        "option_text": "Not really — I prefer focusing on my own patients",
        "next_node_id": "DEEP5",
        "axis_deltas": {
          "management_leadership": -1
        }
      }
    ]
  },
  {
    "node_id": "DEEP5",
    "order": 14,
    "is_universal": false,
    "question_text": "How important is salary and benefits in your nursing career decisions?",
    "options": [
      {
        "option_text": "A top priority — nursing is my career and investment",
        "next_node_id": "DEEP6",
        "axis_deltas": {
          "income_priority": 3
        }
      },
      {
        "option_text": "Important but balanced with other factors",
        "next_node_id": "DEEP6",
        "axis_deltas": {
          "income_priority": 1
        }
      },
      {
        "option_text": "Secondary — fulfilling work matters more than pay",
        "next_node_id": "DEEP6",
        "axis_deltas": {
          "income_priority": -1
        }
      }
    ]
  },
  {
    "node_id": "DEEP6",
    "order": 15,
    "is_universal": false,
    "question_text": "How do you handle emotionally difficult situations with patients and families?",
    "options": [
      {
        "option_text": "I process them and grow — emotional resilience is part of nursing",
        "next_node_id": "DEEP7",
        "axis_deltas": {
          "psych_affinity": 2,
          "patient_education_affinity": 1
        }
      },
      {
        "option_text": "I cope but they stay with me",
        "next_node_id": "DEEP7",
        "axis_deltas": {
          "psych_affinity": 1
        }
      },
      {
        "option_text": "They drain me significantly — I prefer less emotionally intense settings",
        "next_node_id": "DEEP7",
        "axis_deltas": {
          "psych_affinity": -1
        }
      }
    ]
  },
  {
    "node_id": "DEEP7",
    "order": 16,
    "is_universal": false,
    "question_text": "How much do you enjoy hands-on technical skills — IVs, lines, wound care, equipment?",
    "options": [
      {
        "option_text": "Love it — the more technical the better",
        "next_node_id": "DEEP8",
        "axis_deltas": {
          "procedural_technical": 2
        }
      },
      {
        "option_text": "I enjoy them but they are not the main draw",
        "next_node_id": "DEEP8",
        "axis_deltas": {
          "procedural_technical": 1
        }
      },
      {
        "option_text": "I prefer assessment, communication, and coordination over procedures",
        "next_node_id": "DEEP8",
        "axis_deltas": {
          "procedural_technical": -1,
          "patient_education_affinity": 1
        }
      }
    ]
  },
  {
    "node_id": "DEEP8",
    "order": 17,
    "is_universal": false,
    "question_text": "Do you prefer the intensity of acute, short-term episodes or the depth of ongoing patient relationships?",
    "options": [
      {
        "option_text": "Acute episodes — treat, stabilize, move on",
        "next_node_id": "DEEP9",
        "axis_deltas": {
          "acute_vs_chronic": 2
        }
      },
      {
        "option_text": "A mix of both is ideal",
        "next_node_id": "DEEP9",
        "axis_deltas": {
          "acute_vs_chronic": 0
        }
      },
      {
        "option_text": "Ongoing relationships — I want to know my patients over time",
        "next_node_id": "DEEP9",
        "axis_deltas": {
          "acute_vs_chronic": -1,
          "patient_education_affinity": 1
        }
      }
    ]
  },
  {
    "node_id": "DEEP9",
    "order": 18,
    "is_universal": false,
    "question_text": "How interested are you in improving systems, policies, and workflows?",
    "options": [
      {
        "option_text": "Very — I can see myself leading quality initiatives",
        "next_node_id": "DEEP10",
        "axis_deltas": {
          "admin_systems_affinity": 3
        }
      },
      {
        "option_text": "Somewhat — I want to understand them but not lead them",
        "next_node_id": "DEEP10",
        "axis_deltas": {
          "admin_systems_affinity": 1
        }
      },
      {
        "option_text": "Not at all — I just want to provide direct patient care",
        "next_node_id": "DEEP10",
        "axis_deltas": {
          "admin_systems_affinity": -1
        }
      }
    ]
  },
  {
    "node_id": "DEEP10",
    "order": 19,
    "is_universal": false,
    "question_text": "How comfortable are you with nursing informatics, charting systems, and data?",
    "options": [
      {
        "option_text": "Very comfortable — I embrace health IT",
        "next_node_id": "DEEP11",
        "axis_deltas": {
          "admin_systems_affinity": 2
        }
      },
      {
        "option_text": "Comfortable with basic documentation",
        "next_node_id": "DEEP11",
        "axis_deltas": {}
      },
      {
        "option_text": "I prefer spending time with patients over charting",
        "next_node_id": "DEEP11",
        "axis_deltas": {
          "admin_systems_affinity": -1
        }
      }
    ]
  },
  {
    "node_id": "DEEP11",
    "order": 20,
    "is_universal": false,
    "question_text": "How do you feel about spending time talking and teaching vs. doing procedures and tasks?",
    "options": [
      {
        "option_text": "Teaching and talking is why I chose nursing",
        "next_node_id": "DEEP12",
        "axis_deltas": {
          "patient_education_affinity": 2,
          "community_outreach": 1
        }
      },
      {
        "option_text": "I like a balance of both",
        "next_node_id": "DEEP12",
        "axis_deltas": {}
      },
      {
        "option_text": "I prefer hands-on tasks — that is where I excel",
        "next_node_id": "DEEP12",
        "axis_deltas": {
          "procedural_technical": 1
        }
      }
    ]
  },
  {
    "node_id": "DEEP12",
    "order": 21,
    "is_universal": false,
    "question_text": "How important is work-life balance compared to career advancement?",
    "options": [
      {
        "option_text": "Balance is everything — I work to live",
        "next_node_id": "VAL1",
        "axis_deltas": {
          "lifestyle_priority": 2,
          "income_priority": -1
        }
      },
      {
        "option_text": "Both are important — I want a sustainable career",
        "next_node_id": "VAL1",
        "axis_deltas": {
          "lifestyle_priority": 1
        }
      },
      {
        "option_text": "Advancement comes first — I will sacrifice balance for growth",
        "next_node_id": "VAL1",
        "axis_deltas": {
          "income_priority": 1,
          "management_leadership": 1
        }
      }
    ]
  },
  {
    "node_id": "VAL1",
    "order": 22,
    "is_universal": false,
    "question_text": "How much does prestige and respect within the medical community matter to you?",
    "options": [
      {
        "option_text": "Very important — I want a respected specialty",
        "next_node_id": "VAL2",
        "axis_deltas": {
          "income_priority": 1,
          "management_leadership": 1
        }
      },
      {
        "option_text": "Somewhat — it matters but is not everything",
        "next_node_id": "VAL2",
        "axis_deltas": {}
      },
      {
        "option_text": "Not important — I care about the work itself",
        "next_node_id": "VAL2",
        "axis_deltas": {
          "income_priority": -1
        }
      }
    ]
  },
  {
    "node_id": "VAL2",
    "order": 23,
    "is_universal": false,
    "question_text": "Would you rather be a generalist with broad knowledge or a specialist with deep expertise?",
    "options": [
      {
        "option_text": "Generalist — I like variety and breadth",
        "next_node_id": "VAL3",
        "axis_deltas": {
          "procedural_technical": -1
        }
      },
      {
        "option_text": "Specialist — I want to master one area",
        "next_node_id": "VAL3",
        "axis_deltas": {
          "procedural_technical": 1,
          "patient_education_affinity": 1
        }
      },
      {
        "option_text": "In between — I want focus but not extreme narrowing",
        "next_node_id": "VAL3",
        "axis_deltas": {}
      }
    ]
  },
  {
    "node_id": "VAL3",
    "order": 24,
    "is_universal": false,
    "question_text": "How important is geographic flexibility — being able to practice in multiple locations?",
    "options": [
      {
        "option_text": "Very important — I want options to move",
        "next_node_id": "VAL4",
        "axis_deltas": {
          "lifestyle_priority": 1
        }
      },
      {
        "option_text": "Nice-to-have but I can commit to one place",
        "next_node_id": "VAL4",
        "axis_deltas": {}
      },
      {
        "option_text": "Not important — I want to put down roots",
        "next_node_id": "VAL4",
        "axis_deltas": {
          "income_priority": -1
        }
      }
    ]
  },
  {
    "node_id": "VAL4",
    "order": 25,
    "is_universal": false,
    "question_text": "How would you describe your risk tolerance for trying a new, less-established career path?",
    "options": [
      {
        "option_text": "High — I embrace calculated risks",
        "next_node_id": "VAL5",
        "axis_deltas": {
          "critical_care_acuity": 1
        }
      },
      {
        "option_text": "Moderate — I need some certainty",
        "next_node_id": "VAL5",
        "axis_deltas": {}
      },
      {
        "option_text": "Low — I prefer well-established, secure paths",
        "next_node_id": "VAL5",
        "axis_deltas": {
          "lifestyle_priority": 1
        }
      }
    ]
  },
  {
    "node_id": "VAL5",
    "order": 26,
    "is_universal": false,
    "question_text": "If you could design your perfect work week, how many hours would you work?",
    "options": [
      {
        "option_text": "30-40 hours — I value time outside medicine",
        "next_node_id": "CALIB_LIFESTYLE",
        "axis_deltas": {
          "lifestyle_priority": 2,
          "income_priority": -1
        }
      },
      {
        "option_text": "40-50 hours — a standard medical work week",
        "next_node_id": "CALIB_LIFESTYLE",
        "axis_deltas": {
          "lifestyle_priority": 0
        }
      },
      {
        "option_text": "50+ hours — I am fully committed to my career",
        "next_node_id": "CALIB_LIFESTYLE",
        "axis_deltas": {
          "income_priority": 1,
          "management_leadership": 1
        }
      }
    ]
  }
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
      "acute_vs_chronic": 0.15,
      "pediatric_affinity": 0.5,
      "ob_maternal_affinity": 0.5,
      "psych_affinity": 0.5,
      "patient_education_affinity": 0.6,
      "community_outreach": 0.4,
      "lifestyle_priority": 0.7,
      "income_priority": 0.35,
      "management_leadership": 0.4,
      "admin_systems_affinity": 0.3
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
      "patient_education_affinity": 0.7,
      "community_outreach": 0.4,
      "lifestyle_priority": 0.6,
      "income_priority": 0.4,
      "management_leadership": 0.3,
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
      "patient_education_affinity": 0.4,
      "community_outreach": 0.3,
      "lifestyle_priority": 0.7,
      "income_priority": 0.5,
      "management_leadership": 0.6,
      "admin_systems_affinity": 0.95
    }
  },
  {
    "specialty_name": "Nursing Informatics",
    "axes": {
      "critical_care_acuity": 0.1,
      "procedural_technical": 0.2,
      "acute_vs_chronic": 0.3,
      "pediatric_affinity": 0.5,
      "ob_maternal_affinity": 0.5,
      "psych_affinity": 0.5,
      "patient_education_affinity": 0.4,
      "community_outreach": 0.3,
      "lifestyle_priority": 0.7,
      "income_priority": 0.55,
      "management_leadership": 0.4,
      "admin_systems_affinity": 0.9
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
