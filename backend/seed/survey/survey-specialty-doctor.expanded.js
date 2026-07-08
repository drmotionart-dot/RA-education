// Auto-generated expanded Doctor Specialty Survey Graph
// Source: survey-specialty-doctor.js
// Generated on: 2026-07-08T15:22:31.702Z

export const doctor_specialty_graph = {
  type: 'specialty',
  role: 'doctor',
  root_node_id: 'ROOT',
  axes: [
  "procedural_affinity",
  "surgical_tolerance",
  "acute_vs_longitudinal",
  "diagnostic_puzzle_affinity",
  "pediatric_affinity",
  "ob_gyn_affinity",
  "psych_affinity",
  "lab_imaging_affinity",
  "emergency_tolerance",
  "lifestyle_priority",
  "income_priority",
  "research_academic_affinity",
  "admin_systems_affinity",
  "public_health_affinity"
],
  nodes: [
  {
    "node_id": "ROOT",
    "order": 1,
    "is_universal": false,
    "question_text": "A patient's condition is unstable and changing fast. What's your instinct?",
    "options": [
      {
        "option_text": "Act immediately, with my hands",
        "next_node_id": "Q2_PROCEDURAL",
        "axis_deltas": {
          "surgical_tolerance": 2,
          "procedural_affinity": 2,
          "acute_vs_longitudinal": 2
        }
      },
      {
        "option_text": "Step back and think through what is happening",
        "next_node_id": "Q2_COGNITIVE",
        "axis_deltas": {
          "diagnostic_puzzle_affinity": 2,
          "acute_vs_longitudinal": -1
        }
      },
      {
        "option_text": "Depends entirely on the patient in front of me",
        "next_node_id": "Q2_NEUTRAL",
        "axis_deltas": {}
      }
    ]
  },
  {
    "node_id": "Q2_PROCEDURAL",
    "order": 2,
    "is_universal": false,
    "question_text": "Open surgery with full control, or a smaller/minimally-invasive approach?",
    "options": [
      {
        "option_text": "Open surgery",
        "next_node_id": "Q3_SURGICAL_FIELD",
        "axis_deltas": {
          "surgical_tolerance": 2
        }
      },
      {
        "option_text": "Minimally invasive / catheter / scope",
        "next_node_id": "Q3_INTERVENTIONAL",
        "axis_deltas": {
          "procedural_affinity": 1
        }
      }
    ]
  },
  {
    "node_id": "Q3_SURGICAL_FIELD",
    "order": 3,
    "is_universal": false,
    "question_text": "Which appeals more?",
    "options": [
      {
        "option_text": "Bones and joints",
        "next_node_id": "SURG_ORTHO",
        "axis_deltas": {}
      },
      {
        "option_text": "Abdomen / general operations",
        "next_node_id": "SURG_ORTHO",
        "axis_deltas": {}
      },
      {
        "option_text": "Brain and nervous system",
        "next_node_id": "SURG_ORTHO",
        "axis_deltas": {}
      },
      {
        "option_text": "Heart and chest",
        "next_node_id": "SURG_ORTHO",
        "axis_deltas": {}
      }
    ]
  },
  {
    "node_id": "Q3_INTERVENTIONAL",
    "order": 3,
    "is_universal": false,
    "question_text": "Which interventional field draws you?",
    "options": [
      {
        "option_text": "Catheter-based heart procedures",
        "next_node_id": "INT_CATH",
        "axis_deltas": {
          "procedural_affinity": 1
        }
      },
      {
        "option_text": "Image-guided minimally invasive procedures",
        "next_node_id": "INT_CATH",
        "axis_deltas": {
          "lab_imaging_affinity": 1
        }
      }
    ]
  },
  {
    "node_id": "Q2_COGNITIVE",
    "order": 2,
    "is_universal": false,
    "question_text": "When solving a hard case, what excites you more?",
    "options": [
      {
        "option_text": "Piecing together a rare diagnosis",
        "next_node_id": "Q3_DX_FIELD",
        "axis_deltas": {
          "diagnostic_puzzle_affinity": 2
        }
      },
      {
        "option_text": "Understanding a chronic condition over years with a patient",
        "next_node_id": "Q3_LONGITUDINAL_FIELD",
        "axis_deltas": {
          "acute_vs_longitudinal": -2
        }
      }
    ]
  },
  {
    "node_id": "Q3_DX_FIELD",
    "order": 3,
    "is_universal": false,
    "question_text": "What area of diagnostic challenge?",
    "options": [
      {
        "option_text": "Internal medicine mysteries",
        "next_node_id": "DX_INTERNAL",
        "axis_deltas": {}
      },
      {
        "option_text": "Neurological puzzles",
        "next_node_id": "DX_INTERNAL",
        "axis_deltas": {
          "diagnostic_puzzle_affinity": 1
        }
      },
      {
        "option_text": "Infectious disease detective work",
        "next_node_id": "DX_INTERNAL",
        "axis_deltas": {
          "public_health_affinity": 1
        }
      }
    ]
  },
  {
    "node_id": "Q3_LONGITUDINAL_FIELD",
    "order": 3,
    "is_universal": false,
    "question_text": "Which long-term care setting?",
    "options": [
      {
        "option_text": "Chronic disease management",
        "next_node_id": "LONG_CHRONIC",
        "axis_deltas": {}
      },
      {
        "option_text": "Geriatric care",
        "next_node_id": "LONG_CHRONIC",
        "axis_deltas": {}
      }
    ]
  },
  {
    "node_id": "Q2_NEUTRAL",
    "order": 2,
    "is_universal": false,
    "question_text": "Which pulls at you most?",
    "options": [
      {
        "option_text": "Children",
        "next_node_id": "Q3_PEDS_FIELD",
        "axis_deltas": {
          "pediatric_affinity": 2
        }
      },
      {
        "option_text": "Women's health / pregnancy",
        "next_node_id": "OBGYN_CLINICAL",
        "axis_deltas": {
          "ob_gyn_affinity": 2
        }
      },
      {
        "option_text": "Mental health / behavior",
        "next_node_id": "Q3_PSYCH_FIELD",
        "axis_deltas": {
          "psych_affinity": 2
        }
      },
      {
        "option_text": "Systems, policy, and how care is delivered — not hands-on patient care",
        "next_node_id": "Q3_ADMIN_FIELD",
        "axis_deltas": {
          "admin_systems_affinity": 3,
          "procedural_affinity": -2
        }
      },
      {
        "option_text": "None of these — ask me something else",
        "next_node_id": "Q3_GENERAL_FORCING",
        "axis_deltas": {}
      }
    ]
  },
  {
    "node_id": "Q3_PEDS_FIELD",
    "order": 3,
    "is_universal": false,
    "question_text": "Which pediatric area?",
    "options": [
      {
        "option_text": "General pediatrics",
        "next_node_id": "PEDS_GENERAL",
        "axis_deltas": {}
      },
      {
        "option_text": "Pediatric cardiology",
        "next_node_id": "PEDS_GENERAL",
        "axis_deltas": {
          "diagnostic_puzzle_affinity": 1
        }
      }
    ]
  },
  {
    "node_id": "Q3_PSYCH_FIELD",
    "order": 3,
    "is_universal": false,
    "question_text": "Which mental health area?",
    "options": [
      {
        "option_text": "General psychiatry",
        "next_node_id": "PSYCH_GENERAL",
        "axis_deltas": {}
      },
      {
        "option_text": "Child and adolescent",
        "next_node_id": "PSYCH_GENERAL",
        "axis_deltas": {
          "pediatric_affinity": 1
        }
      }
    ]
  },
  {
    "node_id": "Q3_ADMIN_FIELD",
    "order": 3,
    "is_universal": false,
    "question_text": "What kind of impact do you want to have?",
    "options": [
      {
        "option_text": "Making hospitals safer and processes better",
        "next_node_id": "ADMIN_QUALITY",
        "axis_deltas": {
          "admin_systems_affinity": 2
        }
      },
      {
        "option_text": "Advancing medical knowledge through research",
        "next_node_id": "ADMIN_QUALITY",
        "axis_deltas": {
          "research_academic_affinity": 3
        }
      },
      {
        "option_text": "Population-level health, not individual patients",
        "next_node_id": "ADMIN_QUALITY",
        "axis_deltas": {
          "public_health_affinity": 3
        }
      },
      {
        "option_text": "Technology and data in medicine",
        "next_node_id": "ADMIN_QUALITY",
        "axis_deltas": {
          "admin_systems_affinity": 2,
          "lab_imaging_affinity": 1
        }
      }
    ]
  },
  {
    "node_id": "Q3_GENERAL_FORCING",
    "order": 3,
    "is_universal": false,
    "question_text": "Last chance — which aspect of medicine draws you?",
    "options": [
      {
        "option_text": "The science of diagnosis",
        "next_node_id": "GEN_SCIENCE",
        "axis_deltas": {
          "diagnostic_puzzle_affinity": 1
        }
      },
      {
        "option_text": "The art of patient relationships",
        "next_node_id": "GEN_SCIENCE",
        "axis_deltas": {
          "acute_vs_longitudinal": -1
        }
      },
      {
        "option_text": "The team and leadership side",
        "next_node_id": "GEN_SCIENCE",
        "axis_deltas": {
          "admin_systems_affinity": 1
        }
      }
    ]
  },
  {
    "node_id": "CALIB_LIFESTYLE",
    "order": 4,
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
    "order": 5,
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
    "order": 6,
    "is_universal": true,
    "question_text": "Do you see yourself pursuing research or teaching alongside clinical practice?",
    "options": [
      {
        "option_text": "Yes — that is my primary interest",
        "next_node_id": null,
        "axis_deltas": {
          "research_academic_affinity": 3
        }
      },
      {
        "option_text": "Somewhat — I would like to be involved",
        "next_node_id": null,
        "axis_deltas": {
          "research_academic_affinity": 1.5
        }
      },
      {
        "option_text": "No — I want pure clinical practice",
        "next_node_id": null,
        "axis_deltas": {
          "research_academic_affinity": 0
        }
      }
    ]
  },
  {
    "node_id": "SURG_ORTHO",
    "order": 4,
    "is_universal": false,
    "question_text": "In orthopedic surgery, what interests you most?",
    "options": [
      {
        "option_text": "Sports medicine and joint preservation",
        "next_node_id": "SURG_SPINE",
        "axis_deltas": {
          "procedural_affinity": 1
        }
      },
      {
        "option_text": "Spine surgery — complex anatomy and precision",
        "next_node_id": "SURG_SPINE",
        "axis_deltas": {
          "surgical_tolerance": 1,
          "diagnostic_puzzle_affinity": 1
        }
      },
      {
        "option_text": "Reconstructive and trauma surgery",
        "next_node_id": "SURG_SPINE",
        "axis_deltas": {
          "emergency_tolerance": 1
        }
      },
      {
        "option_text": "Pediatric orthopedics",
        "next_node_id": "SURG_SPINE",
        "axis_deltas": {
          "pediatric_affinity": 1
        }
      }
    ]
  },
  {
    "node_id": "SURG_SPINE",
    "order": 5,
    "is_universal": false,
    "question_text": "How do you feel about long, meticulous surgeries lasting 6+ hours?",
    "options": [
      {
        "option_text": "I am drawn to the focus and precision required",
        "next_node_id": "SURG_GENERAL",
        "axis_deltas": {
          "surgical_tolerance": 2
        }
      },
      {
        "option_text": "I can handle them but prefer efficient cases",
        "next_node_id": "SURG_GENERAL",
        "axis_deltas": {
          "surgical_tolerance": 1
        }
      },
      {
        "option_text": "I prefer shorter, higher-volume procedures",
        "next_node_id": "SURG_GENERAL",
        "axis_deltas": {
          "procedural_affinity": 1
        }
      }
    ]
  },
  {
    "node_id": "SURG_GENERAL",
    "order": 6,
    "is_universal": false,
    "question_text": "Would you rather operate on a wide variety of cases or specialize in one type of surgery?",
    "options": [
      {
        "option_text": "Variety — general surgery approach",
        "next_node_id": "SURG_ROBOTICS",
        "axis_deltas": {
          "procedural_affinity": 1
        }
      },
      {
        "option_text": "Specialize — master one type of procedure",
        "next_node_id": "SURG_ROBOTICS",
        "axis_deltas": {
          "surgical_tolerance": 1
        }
      }
    ]
  },
  {
    "node_id": "SURG_ROBOTICS",
    "order": 7,
    "is_universal": false,
    "question_text": "How excited are you about robotic and AI-assisted surgery?",
    "options": [
      {
        "option_text": "Very — I want to be at the forefront",
        "next_node_id": "DEEP1",
        "axis_deltas": {
          "lab_imaging_affinity": 1,
          "procedural_affinity": 1
        }
      },
      {
        "option_text": "Interested but I value traditional techniques too",
        "next_node_id": "DEEP1",
        "axis_deltas": {
          "surgical_tolerance": 0
        }
      },
      {
        "option_text": "I prefer direct hands-on surgery",
        "next_node_id": "DEEP1",
        "axis_deltas": {
          "surgical_tolerance": 1
        }
      }
    ]
  },
  {
    "node_id": "INT_CATH",
    "order": 4,
    "is_universal": false,
    "question_text": "Which interventional area draws you most?",
    "options": [
      {
        "option_text": "Cardiac catheterization — coronary interventions",
        "next_node_id": "INT_IMAGING",
        "axis_deltas": {
          "procedural_affinity": 2,
          "acute_vs_longitudinal": 1
        }
      },
      {
        "option_text": "Interventional radiology — image-guided procedures",
        "next_node_id": "INT_IMAGING",
        "axis_deltas": {
          "lab_imaging_affinity": 2,
          "procedural_affinity": 1
        }
      },
      {
        "option_text": "Endoscopy / gastroenterology procedures",
        "next_node_id": "INT_IMAGING",
        "axis_deltas": {
          "procedural_affinity": 1,
          "diagnostic_puzzle_affinity": 1
        }
      }
    ]
  },
  {
    "node_id": "INT_IMAGING",
    "order": 5,
    "is_universal": false,
    "question_text": "How comfortable are you interpreting complex imaging during procedures?",
    "options": [
      {
        "option_text": "Very — real-time imaging is fascinating",
        "next_node_id": "INT_ACUITY",
        "axis_deltas": {
          "lab_imaging_affinity": 2,
          "diagnostic_puzzle_affinity": 1
        }
      },
      {
        "option_text": "Adequate — I can read what I need",
        "next_node_id": "INT_ACUITY",
        "axis_deltas": {
          "lab_imaging_affinity": 1
        }
      },
      {
        "option_text": "I prefer direct visualization over imaging guidance",
        "next_node_id": "INT_ACUITY",
        "axis_deltas": {
          "procedural_affinity": 1
        }
      }
    ]
  },
  {
    "node_id": "INT_ACUITY",
    "order": 6,
    "is_universal": false,
    "question_text": "Are you comfortable with the acuity of interventional complications?",
    "options": [
      {
        "option_text": "Yes — managing complications is part of the excitement",
        "next_node_id": "DEEP1",
        "axis_deltas": {
          "emergency_tolerance": 2,
          "surgical_tolerance": 1
        }
      },
      {
        "option_text": "I accept it as part of the job",
        "next_node_id": "DEEP1",
        "axis_deltas": {
          "emergency_tolerance": 1
        }
      },
      {
        "option_text": "It makes me anxious — I prefer low-risk procedures",
        "next_node_id": "DEEP1",
        "axis_deltas": {
          "emergency_tolerance": -1
        }
      }
    ]
  },
  {
    "node_id": "DX_INTERNAL",
    "order": 4,
    "is_universal": false,
    "question_text": "What diagnostic area fascinates you most?",
    "options": [
      {
        "option_text": "Complex internal medicine — multisystem mysteries",
        "next_node_id": "DX_INFECTIOUS",
        "axis_deltas": {
          "diagnostic_puzzle_affinity": 2
        }
      },
      {
        "option_text": "Neurological localization — finding the lesion",
        "next_node_id": "DX_INFECTIOUS",
        "axis_deltas": {
          "diagnostic_puzzle_affinity": 1,
          "lab_imaging_affinity": 1
        }
      },
      {
        "option_text": "Infectious disease — identifying the pathogen",
        "next_node_id": "DX_INFECTIOUS",
        "axis_deltas": {
          "diagnostic_puzzle_affinity": 1,
          "public_health_affinity": 1
        }
      }
    ]
  },
  {
    "node_id": "DX_INFECTIOUS",
    "order": 5,
    "is_universal": false,
    "question_text": "How do you feel about managing chronic, complex patients with multiple comorbidities?",
    "options": [
      {
        "option_text": "I enjoy the challenge of coordinating their care",
        "next_node_id": "DX_RARE",
        "axis_deltas": {
          "acute_vs_longitudinal": -1,
          "diagnostic_puzzle_affinity": 1
        }
      },
      {
        "option_text": "It can be rewarding but also draining",
        "next_node_id": "DX_RARE",
        "axis_deltas": {
          "acute_vs_longitudinal": 0
        }
      },
      {
        "option_text": "I prefer acute diagnostic challenges, not long-term management",
        "next_node_id": "DX_RARE",
        "axis_deltas": {
          "acute_vs_longitudinal": 2
        }
      }
    ]
  },
  {
    "node_id": "DX_RARE",
    "order": 6,
    "is_universal": false,
    "question_text": "How interested are you in rare diseases and unusual presentations?",
    "options": [
      {
        "option_text": "Extremely — zebras are what excite me about medicine",
        "next_node_id": "DX_LITIGATION",
        "axis_deltas": {
          "diagnostic_puzzle_affinity": 2,
          "research_academic_affinity": 1
        }
      },
      {
        "option_text": "Moderately — interesting but I see mostly common cases",
        "next_node_id": "DX_LITIGATION",
        "axis_deltas": {
          "diagnostic_puzzle_affinity": 1
        }
      },
      {
        "option_text": "Less interested — I want practical, common medicine",
        "next_node_id": "DX_LITIGATION",
        "axis_deltas": {
          "diagnostic_puzzle_affinity": -1
        }
      }
    ]
  },
  {
    "node_id": "DX_LITIGATION",
    "order": 7,
    "is_universal": false,
    "question_text": "How does the risk of diagnostic errors and litigation affect your decision?",
    "options": [
      {
        "option_text": "I accept it — it comes with the territory in diagnosis",
        "next_node_id": "DEEP1",
        "axis_deltas": {
          "emergency_tolerance": 1
        }
      },
      {
        "option_text": "It worries me but I will practice carefully",
        "next_node_id": "DEEP1",
        "axis_deltas": {
          "lifestyle_priority": 1
        }
      },
      {
        "option_text": "It is a significant concern that makes me lean toward lower-risk fields",
        "next_node_id": "DEEP1",
        "axis_deltas": {
          "lifestyle_priority": 2,
          "emergency_tolerance": -1
        }
      }
    ]
  },
  {
    "node_id": "LONG_CHRONIC",
    "order": 4,
    "is_universal": false,
    "question_text": "What aspect of long-term patient care appeals most?",
    "options": [
      {
        "option_text": "Managing chronic diseases over decades",
        "next_node_id": "LONG_GERIATRIC",
        "axis_deltas": {
          "acute_vs_longitudinal": -2,
          "diagnostic_puzzle_affinity": 1
        }
      },
      {
        "option_text": "Building deep therapeutic relationships",
        "next_node_id": "LONG_GERIATRIC",
        "axis_deltas": {
          "acute_vs_longitudinal": -2,
          "psych_affinity": 1
        }
      },
      {
        "option_text": "Coordinating care across multiple specialties",
        "next_node_id": "LONG_GERIATRIC",
        "axis_deltas": {
          "admin_systems_affinity": 1
        }
      }
    ]
  },
  {
    "node_id": "LONG_GERIATRIC",
    "order": 5,
    "is_universal": false,
    "question_text": "How do you feel about caring for elderly patients with complex social and medical needs?",
    "options": [
      {
        "option_text": "I find it deeply rewarding",
        "next_node_id": "LONG_PALLIATIVE",
        "axis_deltas": {
          "public_health_affinity": 1
        }
      },
      {
        "option_text": "I can do it but it is not my passion",
        "next_node_id": "LONG_PALLIATIVE",
        "axis_deltas": {}
      },
      {
        "option_text": "I prefer a patient population with more acute challenges",
        "next_node_id": "LONG_PALLIATIVE",
        "axis_deltas": {
          "acute_vs_longitudinal": 1
        }
      }
    ]
  },
  {
    "node_id": "LONG_PALLIATIVE",
    "order": 6,
    "is_universal": false,
    "question_text": "How do you feel about palliative and end-of-life care conversations?",
    "options": [
      {
        "option_text": "I consider them a privilege and core to medicine",
        "next_node_id": "DEEP1",
        "axis_deltas": {
          "acute_vs_longitudinal": -1,
          "psych_affinity": 1
        }
      },
      {
        "option_text": "They are important but emotionally taxing",
        "next_node_id": "DEEP1",
        "axis_deltas": {
          "psych_affinity": 1
        }
      },
      {
        "option_text": "I prefer to focus on curative treatment",
        "next_node_id": "DEEP1",
        "axis_deltas": {
          "acute_vs_longitudinal": 1
        }
      }
    ]
  },
  {
    "node_id": "OBGYN_CLINICAL",
    "order": 4,
    "is_universal": false,
    "question_text": "What aspect of women's health draws you most?",
    "options": [
      {
        "option_text": "Obstetrics — pregnancy, delivery, and childbirth",
        "next_node_id": "OBGYN_SURGERY",
        "axis_deltas": {
          "ob_gyn_affinity": 2,
          "procedural_affinity": 1
        }
      },
      {
        "option_text": "Gynecology — surgical and medical care of the female reproductive system",
        "next_node_id": "OBGYN_SURGERY",
        "axis_deltas": {
          "ob_gyn_affinity": 2,
          "surgical_tolerance": 1
        }
      },
      {
        "option_text": "Reproductive endocrinology and infertility",
        "next_node_id": "OBGYN_SURGERY",
        "axis_deltas": {
          "ob_gyn_affinity": 1,
          "research_academic_affinity": 1
        }
      }
    ]
  },
  {
    "node_id": "OBGYN_SURGERY",
    "order": 5,
    "is_universal": false,
    "question_text": "How do you feel about the surgical component of OB/GYN?",
    "options": [
      {
        "option_text": "I love it — surgery is a big draw for me",
        "next_node_id": "OBGYN_LIFESTYLE",
        "axis_deltas": {
          "surgical_tolerance": 1,
          "procedural_affinity": 1
        }
      },
      {
        "option_text": "I can do it but it is not my favorite part",
        "next_node_id": "OBGYN_LIFESTYLE",
        "axis_deltas": {
          "surgical_tolerance": 0
        }
      },
      {
        "option_text": "I prefer the medical management aspects",
        "next_node_id": "OBGYN_LIFESTYLE",
        "axis_deltas": {
          "diagnostic_puzzle_affinity": 1
        }
      }
    ]
  },
  {
    "node_id": "OBGYN_LIFESTYLE",
    "order": 6,
    "is_universal": false,
    "question_text": "How do you feel about the on-call demands and unpredictability of obstetrics?",
    "options": [
      {
        "option_text": "I accept it — babies arrive on their own schedule",
        "next_node_id": "DEEP1",
        "axis_deltas": {
          "emergency_tolerance": 1
        }
      },
      {
        "option_text": "It is a concern but manageable",
        "next_node_id": "DEEP1",
        "axis_deltas": {
          "lifestyle_priority": 1
        }
      },
      {
        "option_text": "It is a significant drawback for me",
        "next_node_id": "DEEP1",
        "axis_deltas": {
          "lifestyle_priority": 2
        }
      }
    ]
  },
  {
    "node_id": "PEDS_GENERAL",
    "order": 4,
    "is_universal": false,
    "question_text": "What draws you to pediatrics?",
    "options": [
      {
        "option_text": "Caring for children and their families holistically",
        "next_node_id": "PEDS_NEONATAL",
        "axis_deltas": {
          "pediatric_affinity": 2
        }
      },
      {
        "option_text": "The diagnostic challenge of pediatric presentations",
        "next_node_id": "PEDS_NEONATAL",
        "axis_deltas": {
          "pediatric_affinity": 1,
          "diagnostic_puzzle_affinity": 1
        }
      },
      {
        "option_text": "I want to sub-specialize in a pediatric organ system",
        "next_node_id": "PEDS_NEONATAL",
        "axis_deltas": {
          "pediatric_affinity": 1
        }
      }
    ]
  },
  {
    "node_id": "PEDS_NEONATAL",
    "order": 5,
    "is_universal": false,
    "question_text": "How do you feel about the emotional weight of caring for seriously ill children?",
    "options": [
      {
        "option_text": "I am prepared for it — it comes with the calling",
        "next_node_id": "PEDS_ACUTE",
        "axis_deltas": {
          "pediatric_affinity": 1,
          "emergency_tolerance": 1
        }
      },
      {
        "option_text": "It is difficult but meaningful",
        "next_node_id": "PEDS_ACUTE",
        "axis_deltas": {
          "pediatric_affinity": 1
        }
      },
      {
        "option_text": "It worries me — I prefer less emotionally intense settings",
        "next_node_id": "PEDS_ACUTE",
        "axis_deltas": {
          "lifestyle_priority": 1
        }
      }
    ]
  },
  {
    "node_id": "PEDS_ACUTE",
    "order": 6,
    "is_universal": false,
    "question_text": "Would you prefer general pediatrics with variety or a pediatric sub-specialty?",
    "options": [
      {
        "option_text": "General pediatrics — I like the variety",
        "next_node_id": "DEEP1",
        "axis_deltas": {
          "pediatric_affinity": 1
        }
      },
      {
        "option_text": "Pediatric sub-specialty — deeper expertise in one area",
        "next_node_id": "DEEP1",
        "axis_deltas": {
          "diagnostic_puzzle_affinity": 1
        }
      },
      {
        "option_text": "Neonatology or pediatric ICU — acute and technical",
        "next_node_id": "DEEP1",
        "axis_deltas": {
          "emergency_tolerance": 1,
          "procedural_affinity": 1
        }
      }
    ]
  },
  {
    "node_id": "PSYCH_GENERAL",
    "order": 4,
    "is_universal": false,
    "question_text": "What aspect of mental health appeals to you most?",
    "options": [
      {
        "option_text": "Understanding the human mind and behavior",
        "next_node_id": "PSYCH_ACUTE",
        "axis_deltas": {
          "psych_affinity": 2,
          "diagnostic_puzzle_affinity": 1
        }
      },
      {
        "option_text": "Helping people through talk therapy and connection",
        "next_node_id": "PSYCH_ACUTE",
        "axis_deltas": {
          "psych_affinity": 2,
          "acute_vs_longitudinal": -1
        }
      },
      {
        "option_text": "The neurobiology and pharmacology of psychiatric conditions",
        "next_node_id": "PSYCH_ACUTE",
        "axis_deltas": {
          "psych_affinity": 1,
          "research_academic_affinity": 1
        }
      }
    ]
  },
  {
    "node_id": "PSYCH_ACUTE",
    "order": 5,
    "is_universal": false,
    "question_text": "How comfortable are you with managing acute psychiatric crises and involuntary care?",
    "options": [
      {
        "option_text": "Comfortable — crisis management is part of psychiatry",
        "next_node_id": "PSYCH_CHILD",
        "axis_deltas": {
          "emergency_tolerance": 1,
          "psych_affinity": 1
        }
      },
      {
        "option_text": "I prefer outpatient, non-crisis settings",
        "next_node_id": "PSYCH_CHILD",
        "axis_deltas": {
          "lifestyle_priority": 1
        }
      },
      {
        "option_text": "I would focus on psychotherapy rather than crisis care",
        "next_node_id": "PSYCH_CHILD",
        "axis_deltas": {
          "psych_affinity": 1,
          "acute_vs_longitudinal": -1
        }
      }
    ]
  },
  {
    "node_id": "PSYCH_CHILD",
    "order": 6,
    "is_universal": false,
    "question_text": "Would you work with children and adolescents, adults, or both?",
    "options": [
      {
        "option_text": "Child and adolescent — early intervention is powerful",
        "next_node_id": "PSYCH_LIFESTYLE",
        "axis_deltas": {
          "pediatric_affinity": 1,
          "psych_affinity": 1
        }
      },
      {
        "option_text": "Adults — more experience with complex comorbidities",
        "next_node_id": "PSYCH_LIFESTYLE",
        "axis_deltas": {
          "psych_affinity": 1
        }
      },
      {
        "option_text": "Both — I want flexibility",
        "next_node_id": "PSYCH_LIFESTYLE",
        "axis_deltas": {
          "psych_affinity": 1
        }
      }
    ]
  },
  {
    "node_id": "PSYCH_LIFESTYLE",
    "order": 7,
    "is_universal": false,
    "question_text": "How important is lifestyle flexibility (private practice, telehealth) in psychiatry?",
    "options": [
      {
        "option_text": "Very — the lifestyle is a major draw for me",
        "next_node_id": "DEEP1",
        "axis_deltas": {
          "lifestyle_priority": 2
        }
      },
      {
        "option_text": "Somewhat — I value the flexibility but it is not primary",
        "next_node_id": "DEEP1",
        "axis_deltas": {
          "lifestyle_priority": 1
        }
      },
      {
        "option_text": "Not a factor — I will work wherever I am needed",
        "next_node_id": "DEEP1",
        "axis_deltas": {
          "public_health_affinity": 1
        }
      }
    ]
  },
  {
    "node_id": "ADMIN_QUALITY",
    "order": 4,
    "is_universal": false,
    "question_text": "What kind of systems impact appeals to you most?",
    "options": [
      {
        "option_text": "Quality improvement and patient safety",
        "next_node_id": "ADMIN_INFORMATICS",
        "axis_deltas": {
          "admin_systems_affinity": 2
        }
      },
      {
        "option_text": "Health policy and population health",
        "next_node_id": "ADMIN_INFORMATICS",
        "axis_deltas": {
          "public_health_affinity": 2,
          "admin_systems_affinity": 1
        }
      },
      {
        "option_text": "Medical education and training the next generation",
        "next_node_id": "ADMIN_INFORMATICS",
        "axis_deltas": {
          "research_academic_affinity": 2
        }
      }
    ]
  },
  {
    "node_id": "ADMIN_INFORMATICS",
    "order": 5,
    "is_universal": false,
    "question_text": "How comfortable are you with health IT, data analytics, and informatics?",
    "options": [
      {
        "option_text": "Very — I see data as the future of medicine",
        "next_node_id": "ADMIN_IMPACT",
        "axis_deltas": {
          "admin_systems_affinity": 1,
          "lab_imaging_affinity": 1
        }
      },
      {
        "option_text": "Moderately — I can work with basic systems",
        "next_node_id": "ADMIN_IMPACT",
        "axis_deltas": {}
      },
      {
        "option_text": "Not interested — I prefer clinical work",
        "next_node_id": "ADMIN_IMPACT",
        "axis_deltas": {
          "procedural_affinity": -1
        }
      }
    ]
  },
  {
    "node_id": "ADMIN_IMPACT",
    "order": 6,
    "is_universal": false,
    "question_text": "Would you be satisfied with an entirely non-clinical role?",
    "options": [
      {
        "option_text": "Yes — my impact would be on systems, not individuals",
        "next_node_id": "DEEP1",
        "axis_deltas": {
          "admin_systems_affinity": 1,
          "procedural_affinity": -1
        }
      },
      {
        "option_text": "I want a hybrid — some clinical, some administrative",
        "next_node_id": "DEEP1",
        "axis_deltas": {
          "admin_systems_affinity": 1
        }
      },
      {
        "option_text": "No — I need direct patient care to feel fulfilled",
        "next_node_id": "DEEP1",
        "axis_deltas": {
          "procedural_affinity": 1,
          "acute_vs_longitudinal": -1
        }
      }
    ]
  },
  {
    "node_id": "GEN_SCIENCE",
    "order": 4,
    "is_universal": false,
    "question_text": "If you had to pick one aspect of medicine as your primary focus, what would it be?",
    "options": [
      {
        "option_text": "The science — understanding disease mechanisms",
        "next_node_id": "GEN_ART",
        "axis_deltas": {
          "diagnostic_puzzle_affinity": 1,
          "research_academic_affinity": 1
        }
      },
      {
        "option_text": "The art — connecting with patients and their stories",
        "next_node_id": "GEN_ART",
        "axis_deltas": {
          "acute_vs_longitudinal": -1,
          "psych_affinity": 1
        }
      },
      {
        "option_text": "The craft — procedures and technical skills",
        "next_node_id": "GEN_ART",
        "axis_deltas": {
          "procedural_affinity": 1
        }
      }
    ]
  },
  {
    "node_id": "GEN_ART",
    "order": 5,
    "is_universal": false,
    "question_text": "Would you rather work in a community setting or an academic medical center?",
    "options": [
      {
        "option_text": "Community — I want to serve a local population",
        "next_node_id": "GEN_EMERGENCY",
        "axis_deltas": {
          "public_health_affinity": 1
        }
      },
      {
        "option_text": "Academic — I want research and teaching",
        "next_node_id": "GEN_EMERGENCY",
        "axis_deltas": {
          "research_academic_affinity": 2
        }
      },
      {
        "option_text": "Either — I am flexible",
        "next_node_id": "GEN_EMERGENCY",
        "axis_deltas": {}
      }
    ]
  },
  {
    "node_id": "GEN_EMERGENCY",
    "order": 6,
    "is_universal": false,
    "question_text": "How important is it to have predictable hours vs. shift-based work?",
    "options": [
      {
        "option_text": "Predictable hours — I need routine",
        "next_node_id": "DEEP1",
        "axis_deltas": {
          "lifestyle_priority": 2,
          "emergency_tolerance": -1
        }
      },
      {
        "option_text": "Shift-based is fine — I like variety",
        "next_node_id": "DEEP1",
        "axis_deltas": {
          "emergency_tolerance": 1
        }
      },
      {
        "option_text": "A mix of both works best for me",
        "next_node_id": "DEEP1",
        "axis_deltas": {}
      }
    ]
  },
  {
    "node_id": "DEEP1",
    "order": 10,
    "is_universal": false,
    "question_text": "How important is it to have a clear, predictable schedule in your specialty?",
    "options": [
      {
        "option_text": "Extremely — I want control over my time",
        "next_node_id": "DEEP2",
        "axis_deltas": {
          "lifestyle_priority": 3
        }
      },
      {
        "option_text": "Moderately — some flexibility is fine",
        "next_node_id": "DEEP2",
        "axis_deltas": {
          "lifestyle_priority": 1
        }
      },
      {
        "option_text": "Not important — I am available when needed",
        "next_node_id": "DEEP2",
        "axis_deltas": {
          "lifestyle_priority": 0,
          "emergency_tolerance": 1
        }
      }
    ]
  },
  {
    "node_id": "DEEP2",
    "order": 11,
    "is_universal": false,
    "question_text": "How do you feel about working in a high-pressure, fast-paced environment daily?",
    "options": [
      {
        "option_text": "I thrive on it — the faster the better",
        "next_node_id": "DEEP3",
        "axis_deltas": {
          "emergency_tolerance": 2,
          "acute_vs_longitudinal": 2
        }
      },
      {
        "option_text": "I can handle it in bursts but not every day",
        "next_node_id": "DEEP3",
        "axis_deltas": {
          "emergency_tolerance": 0
        }
      },
      {
        "option_text": "I prefer a calm, controlled environment",
        "next_node_id": "DEEP3",
        "axis_deltas": {
          "emergency_tolerance": -1,
          "acute_vs_longitudinal": -1
        }
      }
    ]
  },
  {
    "node_id": "DEEP3",
    "order": 12,
    "is_universal": false,
    "question_text": "How important is having a strong evidence base and research behind your daily decisions?",
    "options": [
      {
        "option_text": "Essential — I want to practice evidence-based medicine rigorously",
        "next_node_id": "DEEP4",
        "axis_deltas": {
          "research_academic_affinity": 2,
          "diagnostic_puzzle_affinity": 1
        }
      },
      {
        "option_text": "Important but I also rely on clinical judgment",
        "next_node_id": "DEEP4",
        "axis_deltas": {
          "research_academic_affinity": 1
        }
      },
      {
        "option_text": "I trust practical experience more than studies",
        "next_node_id": "DEEP4",
        "axis_deltas": {
          "research_academic_affinity": -1
        }
      }
    ]
  },
  {
    "node_id": "DEEP4",
    "order": 13,
    "is_universal": false,
    "question_text": "Do you enjoy teaching and mentoring junior colleagues or students?",
    "options": [
      {
        "option_text": "Yes — teaching is one of the most rewarding parts of medicine",
        "next_node_id": "DEEP5",
        "axis_deltas": {
          "research_academic_affinity": 2
        }
      },
      {
        "option_text": "Somewhat — I enjoy it occasionally",
        "next_node_id": "DEEP5",
        "axis_deltas": {
          "research_academic_affinity": 1
        }
      },
      {
        "option_text": "Not really — I prefer focusing on my own patients",
        "next_node_id": "DEEP5",
        "axis_deltas": {
          "research_academic_affinity": -1
        }
      }
    ]
  },
  {
    "node_id": "DEEP5",
    "order": 14,
    "is_universal": false,
    "question_text": "How important is income and financial growth potential in your specialty choice?",
    "options": [
      {
        "option_text": "A top priority — medicine is my career and investment",
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
        "option_text": "Secondary — fulfilling work matters more",
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
    "question_text": "How comfortable are you with ambiguity and uncertainty in diagnosis?",
    "options": [
      {
        "option_text": "I enjoy the challenge of ambiguous cases",
        "next_node_id": "DEEP7",
        "axis_deltas": {
          "diagnostic_puzzle_affinity": 2
        }
      },
      {
        "option_text": "I tolerate it but prefer some clarity",
        "next_node_id": "DEEP7",
        "axis_deltas": {
          "diagnostic_puzzle_affinity": 1
        }
      },
      {
        "option_text": "I find it stressful — I like clear answers",
        "next_node_id": "DEEP7",
        "axis_deltas": {
          "diagnostic_puzzle_affinity": -1
        }
      }
    ]
  },
  {
    "node_id": "DEEP7",
    "order": 16,
    "is_universal": false,
    "question_text": "How much hands-on procedural work do you want in your daily practice?",
    "options": [
      {
        "option_text": "As much as possible — I want to use my hands",
        "next_node_id": "DEEP8",
        "axis_deltas": {
          "procedural_affinity": 2,
          "surgical_tolerance": 1
        }
      },
      {
        "option_text": "A moderate amount — some procedures, some clinic",
        "next_node_id": "DEEP8",
        "axis_deltas": {
          "procedural_affinity": 1
        }
      },
      {
        "option_text": "Minimal — I prefer cognitive and diagnostic work",
        "next_node_id": "DEEP8",
        "axis_deltas": {
          "procedural_affinity": -1
        }
      }
    ]
  },
  {
    "node_id": "DEEP8",
    "order": 17,
    "is_universal": false,
    "question_text": "How do you feel about longitudinal relationships with patients over years?",
    "options": [
      {
        "option_text": "That is what drew me to medicine — lasting connections",
        "next_node_id": "DEEP9",
        "axis_deltas": {
          "acute_vs_longitudinal": -2
        }
      },
      {
        "option_text": "I appreciate them but they are not essential",
        "next_node_id": "DEEP9",
        "axis_deltas": {
          "acute_vs_longitudinal": 0
        }
      },
      {
        "option_text": "I prefer episodic care — treat and move on",
        "next_node_id": "DEEP9",
        "axis_deltas": {
          "acute_vs_longitudinal": 2
        }
      }
    ]
  },
  {
    "node_id": "DEEP9",
    "order": 18,
    "is_universal": false,
    "question_text": "How interested are you in the business and administrative side of healthcare?",
    "options": [
      {
        "option_text": "Very — I can see myself leading departments or hospitals",
        "next_node_id": "DEEP10",
        "axis_deltas": {
          "admin_systems_affinity": 3
        }
      },
      {
        "option_text": "Somewhat — I want to understand it but not lead it",
        "next_node_id": "DEEP10",
        "axis_deltas": {
          "admin_systems_affinity": 1
        }
      },
      {
        "option_text": "Not at all — I just want to practice medicine",
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
    "question_text": "How comfortable are you with using technology and data in your practice?",
    "options": [
      {
        "option_text": "Very comfortable — I embrace digital health",
        "next_node_id": "DEEP11",
        "axis_deltas": {
          "lab_imaging_affinity": 1,
          "admin_systems_affinity": 1
        }
      },
      {
        "option_text": "Comfortable with basic tools",
        "next_node_id": "DEEP11",
        "axis_deltas": {}
      },
      {
        "option_text": "I prefer traditional clinical methods",
        "next_node_id": "DEEP11",
        "axis_deltas": {
          "lab_imaging_affinity": -1
        }
      }
    ]
  },
  {
    "node_id": "DEEP11",
    "order": 20,
    "is_universal": false,
    "question_text": "How would you feel about a specialty where most of your interaction is with data, slides, or images rather than patients?",
    "options": [
      {
        "option_text": "That sounds ideal — I love the diagnostic detective work",
        "next_node_id": "DEEP12",
        "axis_deltas": {
          "lab_imaging_affinity": 2,
          "diagnostic_puzzle_affinity": 1
        }
      },
      {
        "option_text": "I could do it but I would miss patient contact",
        "next_node_id": "DEEP12",
        "axis_deltas": {
          "lab_imaging_affinity": 1
        }
      },
      {
        "option_text": "Not for me — patient interaction is why I chose medicine",
        "next_node_id": "DEEP12",
        "axis_deltas": {
          "lab_imaging_affinity": -1,
          "acute_vs_longitudinal": -1
        }
      }
    ]
  },
  {
    "node_id": "DEEP12",
    "order": 21,
    "is_universal": false,
    "question_text": "How important is work-life balance compared to professional achievement?",
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
        "option_text": "Achievement comes first — I will sacrifice balance early on",
        "next_node_id": "VAL1",
        "axis_deltas": {
          "income_priority": 1,
          "research_academic_affinity": 1
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
          "research_academic_affinity": 1
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
          "procedural_affinity": -1,
          "diagnostic_puzzle_affinity": 0
        }
      },
      {
        "option_text": "Specialist — I want to master one area",
        "next_node_id": "VAL3",
        "axis_deltas": {
          "surgical_tolerance": 1,
          "diagnostic_puzzle_affinity": 1
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
          "surgical_tolerance": 1
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
          "research_academic_affinity": 1
        }
      }
    ]
  }
],
  target_vectors: [
  {
    "specialty_name": "General Surgery",
    "axes": {
      "procedural_affinity": 0.9,
      "surgical_tolerance": 0.9,
      "emergency_tolerance": 0.6,
      "diagnostic_puzzle_affinity": 0.5,
      "acute_vs_longitudinal": 0.6,
      "pediatric_affinity": 0.5,
      "ob_gyn_affinity": 0.5,
      "psych_affinity": 0.5,
      "lab_imaging_affinity": 0.4,
      "lifestyle_priority": 0.3,
      "income_priority": 0.5,
      "research_academic_affinity": 0.4,
      "admin_systems_affinity": 0.3,
      "public_health_affinity": 0.3
    }
  },
  {
    "specialty_name": "Orthopedic Surgery",
    "axes": {
      "procedural_affinity": 0.9,
      "surgical_tolerance": 0.85,
      "emergency_tolerance": 0.5,
      "diagnostic_puzzle_affinity": 0.4,
      "acute_vs_longitudinal": 0.6,
      "pediatric_affinity": 0.5,
      "ob_gyn_affinity": 0.5,
      "psych_affinity": 0.5,
      "lab_imaging_affinity": 0.6,
      "lifestyle_priority": 0.6,
      "income_priority": 0.6,
      "research_academic_affinity": 0.3,
      "admin_systems_affinity": 0.3,
      "public_health_affinity": 0.3
    }
  },
  {
    "specialty_name": "Neurosurgery",
    "axes": {
      "procedural_affinity": 0.95,
      "surgical_tolerance": 0.95,
      "emergency_tolerance": 0.5,
      "diagnostic_puzzle_affinity": 0.7,
      "acute_vs_longitudinal": 0.5,
      "pediatric_affinity": 0.5,
      "ob_gyn_affinity": 0.5,
      "psych_affinity": 0.5,
      "lab_imaging_affinity": 0.7,
      "lifestyle_priority": 0.2,
      "income_priority": 0.7,
      "research_academic_affinity": 0.5,
      "admin_systems_affinity": 0.3,
      "public_health_affinity": 0.3
    }
  },
  {
    "specialty_name": "Cardiothoracic Surgery",
    "axes": {
      "procedural_affinity": 0.95,
      "surgical_tolerance": 0.95,
      "emergency_tolerance": 0.7,
      "diagnostic_puzzle_affinity": 0.5,
      "acute_vs_longitudinal": 0.7,
      "pediatric_affinity": 0.5,
      "ob_gyn_affinity": 0.5,
      "psych_affinity": 0.5,
      "lab_imaging_affinity": 0.5,
      "lifestyle_priority": 0.3,
      "income_priority": 0.7,
      "research_academic_affinity": 0.4,
      "admin_systems_affinity": 0.3,
      "public_health_affinity": 0.3
    }
  },
  {
    "specialty_name": "Vascular Surgery",
    "axes": {
      "procedural_affinity": 0.85,
      "surgical_tolerance": 0.85,
      "emergency_tolerance": 0.6,
      "diagnostic_puzzle_affinity": 0.5,
      "acute_vs_longitudinal": 0.6,
      "pediatric_affinity": 0.5,
      "ob_gyn_affinity": 0.5,
      "psych_affinity": 0.5,
      "lab_imaging_affinity": 0.6,
      "lifestyle_priority": 0.4,
      "income_priority": 0.6,
      "research_academic_affinity": 0.3,
      "admin_systems_affinity": 0.3,
      "public_health_affinity": 0.3
    }
  },
  {
    "specialty_name": "Plastic & Reconstructive Surgery",
    "axes": {
      "procedural_affinity": 0.9,
      "surgical_tolerance": 0.8,
      "emergency_tolerance": 0.3,
      "diagnostic_puzzle_affinity": 0.3,
      "acute_vs_longitudinal": 0.4,
      "pediatric_affinity": 0.5,
      "ob_gyn_affinity": 0.5,
      "psych_affinity": 0.5,
      "lab_imaging_affinity": 0.4,
      "lifestyle_priority": 0.5,
      "income_priority": 0.7,
      "research_academic_affinity": 0.3,
      "admin_systems_affinity": 0.3,
      "public_health_affinity": 0.3
    }
  },
  {
    "specialty_name": "Pediatric Surgery",
    "axes": {
      "procedural_affinity": 0.85,
      "surgical_tolerance": 0.85,
      "emergency_tolerance": 0.5,
      "diagnostic_puzzle_affinity": 0.5,
      "acute_vs_longitudinal": 0.5,
      "pediatric_affinity": 0.95,
      "ob_gyn_affinity": 0.5,
      "psych_affinity": 0.5,
      "lab_imaging_affinity": 0.4,
      "lifestyle_priority": 0.4,
      "income_priority": 0.5,
      "research_academic_affinity": 0.3,
      "admin_systems_affinity": 0.3,
      "public_health_affinity": 0.3
    }
  },
  {
    "specialty_name": "ENT (Otolaryngology)",
    "axes": {
      "procedural_affinity": 0.75,
      "surgical_tolerance": 0.65,
      "emergency_tolerance": 0.4,
      "diagnostic_puzzle_affinity": 0.5,
      "acute_vs_longitudinal": 0.5,
      "pediatric_affinity": 0.5,
      "ob_gyn_affinity": 0.5,
      "psych_affinity": 0.5,
      "lab_imaging_affinity": 0.5,
      "lifestyle_priority": 0.7,
      "income_priority": 0.4,
      "research_academic_affinity": 0.3,
      "admin_systems_affinity": 0.3,
      "public_health_affinity": 0.3
    }
  },
  {
    "specialty_name": "Urology",
    "axes": {
      "procedural_affinity": 0.75,
      "surgical_tolerance": 0.7,
      "emergency_tolerance": 0.4,
      "diagnostic_puzzle_affinity": 0.5,
      "acute_vs_longitudinal": 0.5,
      "pediatric_affinity": 0.5,
      "ob_gyn_affinity": 0.5,
      "psych_affinity": 0.5,
      "lab_imaging_affinity": 0.5,
      "lifestyle_priority": 0.4,
      "income_priority": 0.7,
      "research_academic_affinity": 0.3,
      "admin_systems_affinity": 0.3,
      "public_health_affinity": 0.3
    }
  },
  {
    "specialty_name": "Ophthalmology",
    "axes": {
      "procedural_affinity": 0.8,
      "surgical_tolerance": 0.5,
      "emergency_tolerance": 0.3,
      "diagnostic_puzzle_affinity": 0.5,
      "acute_vs_longitudinal": 0.4,
      "pediatric_affinity": 0.5,
      "ob_gyn_affinity": 0.5,
      "psych_affinity": 0.5,
      "lab_imaging_affinity": 0.6,
      "lifestyle_priority": 0.75,
      "income_priority": 0.7,
      "research_academic_affinity": 0.3,
      "admin_systems_affinity": 0.3,
      "public_health_affinity": 0.3
    }
  },
  {
    "specialty_name": "Internal Medicine (General)",
    "axes": {
      "procedural_affinity": 0.3,
      "surgical_tolerance": 0.2,
      "emergency_tolerance": 0.4,
      "diagnostic_puzzle_affinity": 0.75,
      "acute_vs_longitudinal": 0.4,
      "pediatric_affinity": 0.5,
      "ob_gyn_affinity": 0.5,
      "psych_affinity": 0.5,
      "lab_imaging_affinity": 0.4,
      "lifestyle_priority": 0.5,
      "income_priority": 0.4,
      "research_academic_affinity": 0.4,
      "admin_systems_affinity": 0.3,
      "public_health_affinity": 0.3
    }
  },
  {
    "specialty_name": "Cardiology",
    "axes": {
      "procedural_affinity": 0.6,
      "surgical_tolerance": 0.4,
      "emergency_tolerance": 0.5,
      "diagnostic_puzzle_affinity": 0.7,
      "acute_vs_longitudinal": 0.55,
      "pediatric_affinity": 0.5,
      "ob_gyn_affinity": 0.5,
      "psych_affinity": 0.5,
      "lab_imaging_affinity": 0.6,
      "lifestyle_priority": 0.4,
      "income_priority": 0.6,
      "research_academic_affinity": 0.4,
      "admin_systems_affinity": 0.3,
      "public_health_affinity": 0.3
    }
  },
  {
    "specialty_name": "Interventional Cardiology",
    "axes": {
      "procedural_affinity": 0.85,
      "surgical_tolerance": 0.6,
      "emergency_tolerance": 0.6,
      "diagnostic_puzzle_affinity": 0.6,
      "acute_vs_longitudinal": 0.6,
      "pediatric_affinity": 0.5,
      "ob_gyn_affinity": 0.5,
      "psych_affinity": 0.5,
      "lab_imaging_affinity": 0.7,
      "lifestyle_priority": 0.3,
      "income_priority": 0.7,
      "research_academic_affinity": 0.3,
      "admin_systems_affinity": 0.3,
      "public_health_affinity": 0.3
    }
  },
  {
    "specialty_name": "Gastroenterology",
    "axes": {
      "procedural_affinity": 0.65,
      "surgical_tolerance": 0.4,
      "emergency_tolerance": 0.4,
      "diagnostic_puzzle_affinity": 0.65,
      "acute_vs_longitudinal": 0.5,
      "pediatric_affinity": 0.5,
      "ob_gyn_affinity": 0.5,
      "psych_affinity": 0.5,
      "lab_imaging_affinity": 0.5,
      "lifestyle_priority": 0.5,
      "income_priority": 0.55,
      "research_academic_affinity": 0.3,
      "admin_systems_affinity": 0.3,
      "public_health_affinity": 0.3
    }
  },
  {
    "specialty_name": "Nephrology",
    "axes": {
      "procedural_affinity": 0.4,
      "surgical_tolerance": 0.3,
      "emergency_tolerance": 0.4,
      "diagnostic_puzzle_affinity": 0.75,
      "acute_vs_longitudinal": 0.3,
      "pediatric_affinity": 0.5,
      "ob_gyn_affinity": 0.5,
      "psych_affinity": 0.5,
      "lab_imaging_affinity": 0.5,
      "lifestyle_priority": 0.5,
      "income_priority": 0.4,
      "research_academic_affinity": 0.4,
      "admin_systems_affinity": 0.3,
      "public_health_affinity": 0.4
    }
  },
  {
    "specialty_name": "Pulmonology",
    "axes": {
      "procedural_affinity": 0.5,
      "surgical_tolerance": 0.3,
      "emergency_tolerance": 0.55,
      "diagnostic_puzzle_affinity": 0.65,
      "acute_vs_longitudinal": 0.55,
      "pediatric_affinity": 0.5,
      "ob_gyn_affinity": 0.5,
      "psych_affinity": 0.5,
      "lab_imaging_affinity": 0.6,
      "lifestyle_priority": 0.4,
      "income_priority": 0.45,
      "research_academic_affinity": 0.3,
      "admin_systems_affinity": 0.3,
      "public_health_affinity": 0.4
    }
  },
  {
    "specialty_name": "Endocrinology",
    "axes": {
      "procedural_affinity": 0.3,
      "surgical_tolerance": 0.2,
      "emergency_tolerance": 0.3,
      "diagnostic_puzzle_affinity": 0.55,
      "acute_vs_longitudinal": 0.25,
      "pediatric_affinity": 0.5,
      "ob_gyn_affinity": 0.5,
      "psych_affinity": 0.5,
      "lab_imaging_affinity": 0.5,
      "lifestyle_priority": 0.75,
      "income_priority": 0.5,
      "research_academic_affinity": 0.4,
      "admin_systems_affinity": 0.3,
      "public_health_affinity": 0.3
    }
  },
  {
    "specialty_name": "Rheumatology",
    "axes": {
      "procedural_affinity": 0.3,
      "surgical_tolerance": 0.2,
      "emergency_tolerance": 0.15,
      "diagnostic_puzzle_affinity": 0.8,
      "acute_vs_longitudinal": 0.25,
      "pediatric_affinity": 0.5,
      "ob_gyn_affinity": 0.5,
      "psych_affinity": 0.5,
      "lab_imaging_affinity": 0.5,
      "lifestyle_priority": 0.5,
      "income_priority": 0.3,
      "research_academic_affinity": 0.4,
      "admin_systems_affinity": 0.3,
      "public_health_affinity": 0.3
    }
  },
  {
    "specialty_name": "Infectious Disease",
    "axes": {
      "procedural_affinity": 0.3,
      "surgical_tolerance": 0.2,
      "emergency_tolerance": 0.4,
      "diagnostic_puzzle_affinity": 0.8,
      "acute_vs_longitudinal": 0.4,
      "pediatric_affinity": 0.5,
      "ob_gyn_affinity": 0.5,
      "psych_affinity": 0.5,
      "lab_imaging_affinity": 0.5,
      "lifestyle_priority": 0.5,
      "income_priority": 0.35,
      "research_academic_affinity": 0.5,
      "admin_systems_affinity": 0.3,
      "public_health_affinity": 0.55
    }
  },
  {
    "specialty_name": "Hematology/Oncology",
    "axes": {
      "procedural_affinity": 0.3,
      "surgical_tolerance": 0.2,
      "emergency_tolerance": 0.3,
      "diagnostic_puzzle_affinity": 0.7,
      "acute_vs_longitudinal": 0.3,
      "pediatric_affinity": 0.5,
      "ob_gyn_affinity": 0.5,
      "psych_affinity": 0.5,
      "lab_imaging_affinity": 0.6,
      "lifestyle_priority": 0.4,
      "income_priority": 0.5,
      "research_academic_affinity": 0.6,
      "admin_systems_affinity": 0.3,
      "public_health_affinity": 0.3
    }
  },
  {
    "specialty_name": "Geriatric Medicine",
    "axes": {
      "procedural_affinity": 0.2,
      "surgical_tolerance": 0.2,
      "emergency_tolerance": 0.3,
      "diagnostic_puzzle_affinity": 0.5,
      "acute_vs_longitudinal": 0.2,
      "pediatric_affinity": 0.5,
      "ob_gyn_affinity": 0.5,
      "psych_affinity": 0.5,
      "lab_imaging_affinity": 0.3,
      "lifestyle_priority": 0.6,
      "income_priority": 0.35,
      "research_academic_affinity": 0.3,
      "admin_systems_affinity": 0.3,
      "public_health_affinity": 0.3
    }
  },
  {
    "specialty_name": "Emergency Medicine",
    "axes": {
      "procedural_affinity": 0.6,
      "surgical_tolerance": 0.4,
      "emergency_tolerance": 0.95,
      "diagnostic_puzzle_affinity": 0.5,
      "acute_vs_longitudinal": 0.9,
      "pediatric_affinity": 0.5,
      "ob_gyn_affinity": 0.5,
      "psych_affinity": 0.5,
      "lab_imaging_affinity": 0.4,
      "lifestyle_priority": 0.65,
      "income_priority": 0.5,
      "research_academic_affinity": 0.3,
      "admin_systems_affinity": 0.3,
      "public_health_affinity": 0.3
    }
  },
  {
    "specialty_name": "Anesthesiology",
    "axes": {
      "procedural_affinity": 0.8,
      "surgical_tolerance": 0.4,
      "emergency_tolerance": 0.7,
      "diagnostic_puzzle_affinity": 0.4,
      "acute_vs_longitudinal": 0.5,
      "pediatric_affinity": 0.5,
      "ob_gyn_affinity": 0.5,
      "psych_affinity": 0.5,
      "lab_imaging_affinity": 0.4,
      "lifestyle_priority": 0.65,
      "income_priority": 0.7,
      "research_academic_affinity": 0.3,
      "admin_systems_affinity": 0.3,
      "public_health_affinity": 0.3
    }
  },
  {
    "specialty_name": "Critical Care / Intensivist",
    "axes": {
      "procedural_affinity": 0.5,
      "surgical_tolerance": 0.4,
      "emergency_tolerance": 0.85,
      "diagnostic_puzzle_affinity": 0.6,
      "acute_vs_longitudinal": 0.85,
      "pediatric_affinity": 0.5,
      "ob_gyn_affinity": 0.5,
      "psych_affinity": 0.5,
      "lab_imaging_affinity": 0.5,
      "lifestyle_priority": 0.4,
      "income_priority": 0.5,
      "research_academic_affinity": 0.3,
      "admin_systems_affinity": 0.3,
      "public_health_affinity": 0.3
    }
  },
  {
    "specialty_name": "Obstetrics & Gynecology",
    "axes": {
      "procedural_affinity": 0.7,
      "surgical_tolerance": 0.5,
      "emergency_tolerance": 0.5,
      "diagnostic_puzzle_affinity": 0.5,
      "acute_vs_longitudinal": 0.5,
      "pediatric_affinity": 0.5,
      "ob_gyn_affinity": 0.95,
      "psych_affinity": 0.4,
      "lab_imaging_affinity": 0.5,
      "lifestyle_priority": 0.4,
      "income_priority": 0.5,
      "research_academic_affinity": 0.3,
      "admin_systems_affinity": 0.3,
      "public_health_affinity": 0.3
    }
  },
  {
    "specialty_name": "Pediatrics (General)",
    "axes": {
      "procedural_affinity": 0.3,
      "surgical_tolerance": 0.2,
      "emergency_tolerance": 0.4,
      "diagnostic_puzzle_affinity": 0.5,
      "acute_vs_longitudinal": 0.5,
      "pediatric_affinity": 0.9,
      "ob_gyn_affinity": 0.5,
      "psych_affinity": 0.4,
      "lab_imaging_affinity": 0.3,
      "lifestyle_priority": 0.5,
      "income_priority": 0.35,
      "research_academic_affinity": 0.3,
      "admin_systems_affinity": 0.3,
      "public_health_affinity": 0.3
    }
  },
  {
    "specialty_name": "Neonatology",
    "axes": {
      "procedural_affinity": 0.6,
      "surgical_tolerance": 0.4,
      "emergency_tolerance": 0.7,
      "diagnostic_puzzle_affinity": 0.5,
      "acute_vs_longitudinal": 0.7,
      "pediatric_affinity": 0.95,
      "ob_gyn_affinity": 0.5,
      "psych_affinity": 0.4,
      "lab_imaging_affinity": 0.4,
      "lifestyle_priority": 0.3,
      "income_priority": 0.5,
      "research_academic_affinity": 0.3,
      "admin_systems_affinity": 0.3,
      "public_health_affinity": 0.3
    }
  },
  {
    "specialty_name": "Pediatric Cardiology",
    "axes": {
      "procedural_affinity": 0.5,
      "surgical_tolerance": 0.3,
      "emergency_tolerance": 0.5,
      "diagnostic_puzzle_affinity": 0.65,
      "acute_vs_longitudinal": 0.5,
      "pediatric_affinity": 0.9,
      "ob_gyn_affinity": 0.5,
      "psych_affinity": 0.4,
      "lab_imaging_affinity": 0.6,
      "lifestyle_priority": 0.4,
      "income_priority": 0.5,
      "research_academic_affinity": 0.4,
      "admin_systems_affinity": 0.3,
      "public_health_affinity": 0.3
    }
  },
  {
    "specialty_name": "Psychiatry",
    "axes": {
      "procedural_affinity": 0.1,
      "surgical_tolerance": 0.1,
      "emergency_tolerance": 0.3,
      "diagnostic_puzzle_affinity": 0.5,
      "acute_vs_longitudinal": 0.35,
      "pediatric_affinity": 0.3,
      "ob_gyn_affinity": 0.5,
      "psych_affinity": 0.9,
      "lab_imaging_affinity": 0.2,
      "lifestyle_priority": 0.6,
      "income_priority": 0.5,
      "research_academic_affinity": 0.4,
      "admin_systems_affinity": 0.3,
      "public_health_affinity": 0.4
    }
  },
  {
    "specialty_name": "Child & Adolescent Psychiatry",
    "axes": {
      "procedural_affinity": 0.1,
      "surgical_tolerance": 0.1,
      "emergency_tolerance": 0.3,
      "diagnostic_puzzle_affinity": 0.5,
      "acute_vs_longitudinal": 0.35,
      "pediatric_affinity": 0.85,
      "ob_gyn_affinity": 0.5,
      "psych_affinity": 0.95,
      "lab_imaging_affinity": 0.2,
      "lifestyle_priority": 0.5,
      "income_priority": 0.5,
      "research_academic_affinity": 0.4,
      "admin_systems_affinity": 0.3,
      "public_health_affinity": 0.4
    }
  },
  {
    "specialty_name": "Neurology",
    "axes": {
      "procedural_affinity": 0.3,
      "surgical_tolerance": 0.2,
      "emergency_tolerance": 0.4,
      "diagnostic_puzzle_affinity": 0.85,
      "acute_vs_longitudinal": 0.3,
      "pediatric_affinity": 0.5,
      "ob_gyn_affinity": 0.5,
      "psych_affinity": 0.5,
      "lab_imaging_affinity": 0.7,
      "lifestyle_priority": 0.4,
      "income_priority": 0.5,
      "research_academic_affinity": 0.5,
      "admin_systems_affinity": 0.3,
      "public_health_affinity": 0.3
    }
  },
  {
    "specialty_name": "Radiology",
    "axes": {
      "procedural_affinity": 0.3,
      "surgical_tolerance": 0.2,
      "emergency_tolerance": 0.3,
      "diagnostic_puzzle_affinity": 0.7,
      "acute_vs_longitudinal": 0.4,
      "pediatric_affinity": 0.5,
      "ob_gyn_affinity": 0.5,
      "psych_affinity": 0.5,
      "lab_imaging_affinity": 0.95,
      "lifestyle_priority": 0.7,
      "income_priority": 0.75,
      "research_academic_affinity": 0.4,
      "admin_systems_affinity": 0.3,
      "public_health_affinity": 0.3
    }
  },
  {
    "specialty_name": "Pathology",
    "axes": {
      "procedural_affinity": 0.2,
      "surgical_tolerance": 0.2,
      "emergency_tolerance": 0.2,
      "diagnostic_puzzle_affinity": 0.65,
      "acute_vs_longitudinal": 0.3,
      "pediatric_affinity": 0.5,
      "ob_gyn_affinity": 0.5,
      "psych_affinity": 0.5,
      "lab_imaging_affinity": 0.9,
      "lifestyle_priority": 0.75,
      "income_priority": 0.55,
      "research_academic_affinity": 0.4,
      "admin_systems_affinity": 0.3,
      "public_health_affinity": 0.3
    }
  },
  {
    "specialty_name": "Clinical Laboratory Medicine",
    "axes": {
      "procedural_affinity": 0.1,
      "surgical_tolerance": 0.1,
      "emergency_tolerance": 0.2,
      "diagnostic_puzzle_affinity": 0.5,
      "acute_vs_longitudinal": 0.3,
      "pediatric_affinity": 0.5,
      "ob_gyn_affinity": 0.5,
      "psych_affinity": 0.5,
      "lab_imaging_affinity": 0.9,
      "lifestyle_priority": 0.7,
      "income_priority": 0.5,
      "research_academic_affinity": 0.5,
      "admin_systems_affinity": 0.3,
      "public_health_affinity": 0.3
    }
  },
  {
    "specialty_name": "Family Medicine",
    "axes": {
      "procedural_affinity": 0.3,
      "surgical_tolerance": 0.2,
      "emergency_tolerance": 0.4,
      "diagnostic_puzzle_affinity": 0.5,
      "acute_vs_longitudinal": 0.15,
      "pediatric_affinity": 0.6,
      "ob_gyn_affinity": 0.5,
      "psych_affinity": 0.5,
      "lab_imaging_affinity": 0.3,
      "lifestyle_priority": 0.6,
      "income_priority": 0.4,
      "research_academic_affinity": 0.3,
      "admin_systems_affinity": 0.3,
      "public_health_affinity": 0.4
    }
  },
  {
    "specialty_name": "Community/Public Health Medicine",
    "axes": {
      "procedural_affinity": 0.1,
      "surgical_tolerance": 0.1,
      "emergency_tolerance": 0.3,
      "diagnostic_puzzle_affinity": 0.4,
      "acute_vs_longitudinal": 0.2,
      "pediatric_affinity": 0.5,
      "ob_gyn_affinity": 0.5,
      "psych_affinity": 0.5,
      "lab_imaging_affinity": 0.3,
      "lifestyle_priority": 0.6,
      "income_priority": 0.35,
      "research_academic_affinity": 0.5,
      "admin_systems_affinity": 0.55,
      "public_health_affinity": 0.9
    }
  },
  {
    "specialty_name": "Occupational Medicine",
    "axes": {
      "procedural_affinity": 0.2,
      "surgical_tolerance": 0.2,
      "emergency_tolerance": 0.3,
      "diagnostic_puzzle_affinity": 0.4,
      "acute_vs_longitudinal": 0.3,
      "pediatric_affinity": 0.5,
      "ob_gyn_affinity": 0.5,
      "psych_affinity": 0.5,
      "lab_imaging_affinity": 0.3,
      "lifestyle_priority": 0.75,
      "income_priority": 0.5,
      "research_academic_affinity": 0.3,
      "admin_systems_affinity": 0.3,
      "public_health_affinity": 0.6
    }
  },
  {
    "specialty_name": "Dermatology",
    "axes": {
      "procedural_affinity": 0.4,
      "surgical_tolerance": 0.3,
      "emergency_tolerance": 0.2,
      "diagnostic_puzzle_affinity": 0.4,
      "acute_vs_longitudinal": 0.3,
      "pediatric_affinity": 0.5,
      "ob_gyn_affinity": 0.5,
      "psych_affinity": 0.5,
      "lab_imaging_affinity": 0.5,
      "lifestyle_priority": 0.85,
      "income_priority": 0.75,
      "research_academic_affinity": 0.3,
      "admin_systems_affinity": 0.3,
      "public_health_affinity": 0.3
    }
  },
  {
    "specialty_name": "Physical Medicine & Rehabilitation",
    "axes": {
      "procedural_affinity": 0.3,
      "surgical_tolerance": 0.2,
      "emergency_tolerance": 0.2,
      "diagnostic_puzzle_affinity": 0.4,
      "acute_vs_longitudinal": 0.3,
      "pediatric_affinity": 0.5,
      "ob_gyn_affinity": 0.5,
      "psych_affinity": 0.5,
      "lab_imaging_affinity": 0.4,
      "lifestyle_priority": 0.75,
      "income_priority": 0.45,
      "research_academic_affinity": 0.3,
      "admin_systems_affinity": 0.3,
      "public_health_affinity": 0.3
    }
  },
  {
    "specialty_name": "Allergy & Immunology",
    "axes": {
      "procedural_affinity": 0.2,
      "surgical_tolerance": 0.2,
      "emergency_tolerance": 0.3,
      "diagnostic_puzzle_affinity": 0.6,
      "acute_vs_longitudinal": 0.3,
      "pediatric_affinity": 0.5,
      "ob_gyn_affinity": 0.5,
      "psych_affinity": 0.5,
      "lab_imaging_affinity": 0.5,
      "lifestyle_priority": 0.7,
      "income_priority": 0.45,
      "research_academic_affinity": 0.4,
      "admin_systems_affinity": 0.3,
      "public_health_affinity": 0.3
    }
  },
  {
    "specialty_name": "Quality Management & Patient Safety",
    "axes": {
      "procedural_affinity": 0.1,
      "surgical_tolerance": 0.1,
      "emergency_tolerance": 0.3,
      "diagnostic_puzzle_affinity": 0.3,
      "acute_vs_longitudinal": 0.3,
      "pediatric_affinity": 0.5,
      "ob_gyn_affinity": 0.5,
      "psych_affinity": 0.5,
      "lab_imaging_affinity": 0.3,
      "lifestyle_priority": 0.7,
      "income_priority": 0.5,
      "research_academic_affinity": 0.3,
      "admin_systems_affinity": 0.95,
      "public_health_affinity": 0.5
    }
  },
  {
    "specialty_name": "Infection Control & Hospital Epidemiology",
    "axes": {
      "procedural_affinity": 0.1,
      "surgical_tolerance": 0.1,
      "emergency_tolerance": 0.3,
      "diagnostic_puzzle_affinity": 0.5,
      "acute_vs_longitudinal": 0.3,
      "pediatric_affinity": 0.5,
      "ob_gyn_affinity": 0.5,
      "psych_affinity": 0.5,
      "lab_imaging_affinity": 0.4,
      "lifestyle_priority": 0.6,
      "income_priority": 0.5,
      "research_academic_affinity": 0.4,
      "admin_systems_affinity": 0.85,
      "public_health_affinity": 0.8
    }
  },
  {
    "specialty_name": "Health Informatics / Medical Informatics",
    "axes": {
      "procedural_affinity": 0.1,
      "surgical_tolerance": 0.1,
      "emergency_tolerance": 0.2,
      "diagnostic_puzzle_affinity": 0.4,
      "acute_vs_longitudinal": 0.3,
      "pediatric_affinity": 0.5,
      "ob_gyn_affinity": 0.5,
      "psych_affinity": 0.5,
      "lab_imaging_affinity": 0.4,
      "lifestyle_priority": 0.6,
      "income_priority": 0.55,
      "research_academic_affinity": 0.6,
      "admin_systems_affinity": 0.85,
      "public_health_affinity": 0.3
    }
  },
  {
    "specialty_name": "Medical Education / Academic Faculty",
    "axes": {
      "procedural_affinity": 0.1,
      "surgical_tolerance": 0.1,
      "emergency_tolerance": 0.2,
      "diagnostic_puzzle_affinity": 0.4,
      "acute_vs_longitudinal": 0.3,
      "pediatric_affinity": 0.5,
      "ob_gyn_affinity": 0.5,
      "psych_affinity": 0.5,
      "lab_imaging_affinity": 0.3,
      "lifestyle_priority": 0.7,
      "income_priority": 0.35,
      "research_academic_affinity": 0.95,
      "admin_systems_affinity": 0.6,
      "public_health_affinity": 0.3
    }
  },
  {
    "specialty_name": "Hospital Administration / Medical Directorship",
    "axes": {
      "procedural_affinity": 0.1,
      "surgical_tolerance": 0.1,
      "emergency_tolerance": 0.3,
      "diagnostic_puzzle_affinity": 0.3,
      "acute_vs_longitudinal": 0.3,
      "pediatric_affinity": 0.5,
      "ob_gyn_affinity": 0.5,
      "psych_affinity": 0.5,
      "lab_imaging_affinity": 0.2,
      "lifestyle_priority": 0.5,
      "income_priority": 0.6,
      "research_academic_affinity": 0.3,
      "admin_systems_affinity": 0.95,
      "public_health_affinity": 0.4
    }
  },
  {
    "specialty_name": "Public Health / Epidemiology (non-clinical)",
    "axes": {
      "procedural_affinity": 0.1,
      "surgical_tolerance": 0.1,
      "emergency_tolerance": 0.3,
      "diagnostic_puzzle_affinity": 0.5,
      "acute_vs_longitudinal": 0.2,
      "pediatric_affinity": 0.5,
      "ob_gyn_affinity": 0.5,
      "psych_affinity": 0.5,
      "lab_imaging_affinity": 0.3,
      "lifestyle_priority": 0.6,
      "income_priority": 0.4,
      "research_academic_affinity": 0.7,
      "admin_systems_affinity": 0.5,
      "public_health_affinity": 0.95
    }
  },
  {
    "specialty_name": "Health Insurance / Medical Underwriting",
    "axes": {
      "procedural_affinity": 0.1,
      "surgical_tolerance": 0.1,
      "emergency_tolerance": 0.2,
      "diagnostic_puzzle_affinity": 0.3,
      "acute_vs_longitudinal": 0.3,
      "pediatric_affinity": 0.5,
      "ob_gyn_affinity": 0.5,
      "psych_affinity": 0.5,
      "lab_imaging_affinity": 0.2,
      "lifestyle_priority": 0.75,
      "income_priority": 0.65,
      "research_academic_affinity": 0.2,
      "admin_systems_affinity": 0.8,
      "public_health_affinity": 0.3
    }
  },
  {
    "specialty_name": "Pharmaceutical / Clinical Research Medicine",
    "axes": {
      "procedural_affinity": 0.1,
      "surgical_tolerance": 0.1,
      "emergency_tolerance": 0.2,
      "diagnostic_puzzle_affinity": 0.4,
      "acute_vs_longitudinal": 0.3,
      "pediatric_affinity": 0.5,
      "ob_gyn_affinity": 0.5,
      "psych_affinity": 0.5,
      "lab_imaging_affinity": 0.3,
      "lifestyle_priority": 0.4,
      "income_priority": 0.75,
      "research_academic_affinity": 0.85,
      "admin_systems_affinity": 0.4,
      "public_health_affinity": 0.3
    }
  },
  {
    "specialty_name": "Forensic Medicine",
    "axes": {
      "procedural_affinity": 0.2,
      "surgical_tolerance": 0.3,
      "emergency_tolerance": 0.3,
      "diagnostic_puzzle_affinity": 0.7,
      "acute_vs_longitudinal": 0.3,
      "pediatric_affinity": 0.5,
      "ob_gyn_affinity": 0.5,
      "psych_affinity": 0.5,
      "lab_imaging_affinity": 0.5,
      "lifestyle_priority": 0.6,
      "income_priority": 0.45,
      "research_academic_affinity": 0.4,
      "admin_systems_affinity": 0.5,
      "public_health_affinity": 0.4
    }
  }
],
};
