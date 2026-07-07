// Auto-generated expanded Nurse Path Survey Graph
// Source: survey-path-nurse.js
// Generated on: 2026-07-07T20:06:06.713Z

export const nurse_path_graph = {
  type: 'path',
  role: 'nurse',
  root_node_id: 'ROOT',
  axes: [
  "willingness_relocate",
  "language_learning",
  "exam_tolerance",
  "time_investment",
  "cost_tolerance",
  "income_expectation",
  "gulf_preference",
  "western_preference",
  "egypt_stability",
  "clinical_vs_admin",
  "humanitarian_orientation",
  "research_academic_orientation"
],
  nodes: [
  {
    "node_id": "ROOT",
    "order": 1,
    "is_universal": false,
    "question_text": "What's driving your next career move as a nurse?",
    "options": [
      {
        "option_text": "I want to work abroad — better pay and global experience",
        "next_node_id": "ABROAD_PATH",
        "axis_deltas": {
          "willingness_relocate": 3,
          "income_expectation": 2,
          "egypt_stability": -2
        }
      },
      {
        "option_text": "I want to build my career in Egypt",
        "next_node_id": "EGYPT_PATH",
        "axis_deltas": {
          "egypt_stability": 3,
          "willingness_relocate": -2
        }
      },
      {
        "option_text": "I am interested in non-bedside, global health, or research",
        "next_node_id": "NON_CLINICAL_PATH",
        "axis_deltas": {
          "clinical_vs_admin": -2,
          "humanitarian_orientation": 2,
          "research_academic_orientation": 1
        }
      }
    ]
  },
  {
    "node_id": "ABROAD_PATH",
    "order": 2,
    "is_universal": false,
    "question_text": "Which region are you most interested in?",
    "options": [
      {
        "option_text": "Gulf / Arab world — good pay, close to home, large Egyptian community",
        "next_node_id": "GULF_FOCUS",
        "axis_deltas": {
          "gulf_preference": 3,
          "willingness_relocate": 1
        }
      },
      {
        "option_text": "Europe — better work-life balance, growing recruitment",
        "next_node_id": "EUROPE_FOCUS",
        "axis_deltas": {
          "western_preference": 2,
          "language_learning": 1
        }
      },
      {
        "option_text": "North America — highest pay, strong nursing profession",
        "next_node_id": "NA_FOCUS",
        "axis_deltas": {
          "western_preference": 3,
          "income_expectation": 2
        }
      },
      {
        "option_text": "Oceania — outdoors lifestyle, growing demand for nurses",
        "next_node_id": "OCEANIA_FOCUS",
        "axis_deltas": {
          "western_preference": 2,
          "language_learning": 0
        }
      }
    ]
  },
  {
    "node_id": "GULF_FOCUS",
    "order": 3,
    "is_universal": false,
    "question_text": "Gulf — what matters most to you?",
    "options": [
      {
        "option_text": "Saudi Arabia — largest market, structured recruitment",
        "next_node_id": "GULF_PREP",
        "axis_deltas": {
          "gulf_preference": 2,
          "exam_tolerance": 1,
          "income_expectation": 2
        }
      },
      {
        "option_text": "UAE — Dubai or Abu Dhabi, more lifestyle options",
        "next_node_id": "GULF_PREP",
        "axis_deltas": {
          "gulf_preference": 2,
          "income_expectation": 2,
          "time_investment": 1
        }
      }
    ]
  },
  {
    "node_id": "EUROPE_FOCUS",
    "order": 3,
    "is_universal": false,
    "question_text": "Europe — how important is English vs learning a language?",
    "options": [
      {
        "option_text": "English only — UK (NHS) with structured recruitment",
        "next_node_id": "EUR_LANGUAGE",
        "axis_deltas": {
          "western_preference": 2,
          "language_learning": 0,
          "exam_tolerance": 2
        }
      },
      {
        "option_text": "English-friendly small market — Ireland or Malta",
        "next_node_id": "EUR_LANGUAGE",
        "axis_deltas": {
          "western_preference": 1,
          "language_learning": 0,
          "time_investment": -1
        }
      },
      {
        "option_text": "I am willing to learn German — better long-term prospects",
        "next_node_id": "EUR_LANGUAGE",
        "axis_deltas": {
          "language_learning": 3,
          "time_investment": 2,
          "income_expectation": 1
        }
      }
    ]
  },
  {
    "node_id": "NA_FOCUS",
    "order": 3,
    "is_universal": false,
    "question_text": "North America — Canada or the USA?",
    "options": [
      {
        "option_text": "USA — highest pay, most opportunities, NCLEX-RN pathway",
        "next_node_id": "NA_EXAMS",
        "axis_deltas": {
          "western_preference": 3,
          "exam_tolerance": 2,
          "cost_tolerance": 2,
          "income_expectation": 3,
          "time_investment": 2
        }
      },
      {
        "option_text": "Canada — excellent work-life balance, strong nursing unions, IMG-friendly",
        "next_node_id": "NA_EXAMS",
        "axis_deltas": {
          "western_preference": 3,
          "exam_tolerance": 2,
          "cost_tolerance": 2,
          "income_expectation": 2,
          "time_investment": 2
        }
      }
    ]
  },
  {
    "node_id": "OCEANIA_FOCUS",
    "order": 3,
    "is_universal": false,
    "question_text": "Oceania — which appeals?",
    "options": [
      {
        "option_text": "Australia — strong nursing demand, skilled migration pathway",
        "next_node_id": "OCEANIA_VISA",
        "axis_deltas": {
          "western_preference": 2,
          "exam_tolerance": 2,
          "time_investment": 2,
          "income_expectation": 2
        }
      },
      {
        "option_text": "New Zealand — smaller, quieter, streamlined process",
        "next_node_id": "OCEANIA_VISA",
        "axis_deltas": {
          "western_preference": 2,
          "exam_tolerance": 1,
          "time_investment": 1,
          "income_expectation": 1
        }
      }
    ]
  },
  {
    "node_id": "EGYPT_PATH",
    "order": 2,
    "is_universal": false,
    "question_text": "Staying in Egypt — what setting suits you?",
    "options": [
      {
        "option_text": "MOH government hospital — stability, pension, structured career",
        "next_node_id": "EGYPT_MOTIVE",
        "axis_deltas": {
          "egypt_stability": 3,
          "income_expectation": -1
        }
      },
      {
        "option_text": "University teaching hospital — education and career growth",
        "next_node_id": "EGYPT_MOTIVE",
        "axis_deltas": {
          "egypt_stability": 2,
          "research_academic_orientation": 2
        }
      },
      {
        "option_text": "Private hospital — higher pay, more autonomy",
        "next_node_id": "EGYPT_MOTIVE",
        "axis_deltas": {
          "egypt_stability": 1,
          "income_expectation": 2
        }
      },
      {
        "option_text": "Military/Police nursing — distinct benefits and service track",
        "next_node_id": "EGYPT_MOTIVE",
        "axis_deltas": {
          "egypt_stability": 2,
          "income_expectation": 1
        }
      },
      {
        "option_text": "Pursue a postgraduate nursing degree first",
        "next_node_id": "EGYPT_MOTIVE",
        "axis_deltas": {
          "egypt_stability": 1,
          "research_academic_orientation": 2,
          "time_investment": 2
        }
      },
      {
        "option_text": "Work with international NGOs operating in Egypt",
        "next_node_id": "EGYPT_MOTIVE",
        "axis_deltas": {
          "egypt_stability": 1,
          "humanitarian_orientation": 3
        }
      }
    ]
  },
  {
    "node_id": "NON_CLINICAL_PATH",
    "order": 2,
    "is_universal": false,
    "question_text": "Non-bedside nursing — what kind of impact?",
    "options": [
      {
        "option_text": "Global health with WHO, UNICEF — policy and programs",
        "next_node_id": "NONCLIN_SKILLS",
        "axis_deltas": {
          "humanitarian_orientation": 3,
          "clinical_vs_admin": -2,
          "research_academic_orientation": 1
        }
      },
      {
        "option_text": "Humanitarian field nursing — MSF, Red Cross, crisis response",
        "next_node_id": "NONCLIN_SKILLS",
        "axis_deltas": {
          "humanitarian_orientation": 3,
          "willingness_relocate": 2
        }
      },
      {
        "option_text": "Global health research — trials, epidemiology, publications",
        "next_node_id": "NONCLIN_SKILLS",
        "axis_deltas": {
          "research_academic_orientation": 3,
          "clinical_vs_admin": -1
        }
      },
      {
        "option_text": "Health-tech / nursing informatics — EHR, telehealth, innovation",
        "next_node_id": "NONCLIN_SKILLS",
        "axis_deltas": {
          "clinical_vs_admin": -2,
          "income_expectation": 2
        }
      },
      {
        "option_text": "Pharmaceutical research nursing — clinical trials, pharmacovigilance",
        "next_node_id": "NONCLIN_SKILLS",
        "axis_deltas": {
          "clinical_vs_admin": -2,
          "income_expectation": 3,
          "research_academic_orientation": 2
        }
      }
    ]
  },
  {
    "node_id": "CALIB_EXAMS",
    "order": 5,
    "is_universal": true,
    "question_text": "How many exams are you willing to sit for your career move?",
    "options": [
      {
        "option_text": "0 — I want minimal or no exams",
        "next_node_id": "CALIB_COST",
        "axis_deltas": {
          "exam_tolerance": 0
        }
      },
      {
        "option_text": "1-2 exams — manageable",
        "next_node_id": "CALIB_COST",
        "axis_deltas": {
          "exam_tolerance": 2
        }
      },
      {
        "option_text": "3+ exams — I will do whatever it takes",
        "next_node_id": "CALIB_COST",
        "axis_deltas": {
          "exam_tolerance": 4
        }
      }
    ]
  },
  {
    "node_id": "CALIB_COST",
    "order": 6,
    "is_universal": true,
    "question_text": "How much are you willing to invest financially? (1 = as little as possible, 5 = whatever it costs)",
    "options": [
      {
        "option_text": "1 — As little as possible",
        "next_node_id": "CALIB_TIME",
        "axis_deltas": {
          "cost_tolerance": 0
        }
      },
      {
        "option_text": "2 — Up to $1,000",
        "next_node_id": "CALIB_TIME",
        "axis_deltas": {
          "cost_tolerance": 1
        }
      },
      {
        "option_text": "3 — Up to $3,000",
        "next_node_id": "CALIB_TIME",
        "axis_deltas": {
          "cost_tolerance": 2
        }
      },
      {
        "option_text": "4 — Up to $5,000",
        "next_node_id": "CALIB_TIME",
        "axis_deltas": {
          "cost_tolerance": 3
        }
      },
      {
        "option_text": "5 — Whatever it costs",
        "next_node_id": "CALIB_TIME",
        "axis_deltas": {
          "cost_tolerance": 4
        }
      }
    ]
  },
  {
    "node_id": "CALIB_TIME",
    "order": 7,
    "is_universal": true,
    "question_text": "How much time are you willing to invest in this pathway?",
    "options": [
      {
        "option_text": "6-12 months — I want to move quickly",
        "next_node_id": null,
        "axis_deltas": {
          "time_investment": 1
        }
      },
      {
        "option_text": "1-2 years — reasonable timeframe",
        "next_node_id": null,
        "axis_deltas": {
          "time_investment": 2
        }
      },
      {
        "option_text": "2-4 years — I am in it for the long haul",
        "next_node_id": null,
        "axis_deltas": {
          "time_investment": 3
        }
      }
    ]
  },
  {
    "node_id": "GULF_PREP",
    "order": 4,
    "is_universal": false,
    "question_text": "How prepared are you for the Gulf licensing process (Prometric, dataflow, etc.)?",
    "options": [
      {
        "option_text": "I have done extensive research and know the steps",
        "next_node_id": "GULF_ACCLIMATE",
        "axis_deltas": {
          "exam_tolerance": 1,
          "gulf_preference": 1
        }
      },
      {
        "option_text": "I know the basics but need guidance",
        "next_node_id": "GULF_ACCLIMATE",
        "axis_deltas": {
          "time_investment": 1
        }
      },
      {
        "option_text": "I am starting from scratch",
        "next_node_id": "GULF_ACCLIMATE",
        "axis_deltas": {
          "time_investment": 2
        }
      }
    ]
  },
  {
    "node_id": "GULF_ACCLIMATE",
    "order": 5,
    "is_universal": false,
    "question_text": "How important is the social and cultural environment in your Gulf destination choice?",
    "options": [
      {
        "option_text": "Very — I want a familiar Arab cultural setting",
        "next_node_id": "GULF_FAMILY",
        "axis_deltas": {
          "gulf_preference": 1
        }
      },
      {
        "option_text": "Moderately — work conditions matter more",
        "next_node_id": "GULF_FAMILY",
        "axis_deltas": {
          "income_expectation": 1
        }
      },
      {
        "option_text": "Not a concern — I adapt easily",
        "next_node_id": "GULF_FAMILY",
        "axis_deltas": {
          "willingness_relocate": 1
        }
      }
    ]
  },
  {
    "node_id": "GULF_FAMILY",
    "order": 6,
    "is_universal": false,
    "question_text": "Would you plan to bring your family to the Gulf or work there while they remain in Egypt?",
    "options": [
      {
        "option_text": "Bring them — we would relocate together",
        "next_node_id": "DEEP1",
        "axis_deltas": {
          "gulf_preference": 1,
          "willingness_relocate": 1
        }
      },
      {
        "option_text": "Commute and send remittances — family stays in Egypt",
        "next_node_id": "DEEP1",
        "axis_deltas": {
          "income_expectation": 2,
          "egypt_stability": 1
        }
      },
      {
        "option_text": "Not applicable — single or no dependents",
        "next_node_id": "DEEP1",
        "axis_deltas": {
          "willingness_relocate": 1
        }
      }
    ]
  },
  {
    "node_id": "EUR_LANGUAGE",
    "order": 4,
    "is_universal": false,
    "question_text": "How committed are you to learning a new language for your European move?",
    "options": [
      {
        "option_text": "Fully committed — I enjoy learning languages",
        "next_node_id": "EUR_SPECIALTY",
        "axis_deltas": {
          "language_learning": 3,
          "time_investment": 2
        }
      },
      {
        "option_text": "I am willing but it is a significant hurdle",
        "next_node_id": "EUR_SPECIALTY",
        "axis_deltas": {
          "language_learning": 2
        }
      },
      {
        "option_text": "I prefer English-only destinations",
        "next_node_id": "EUR_SPECIALTY",
        "axis_deltas": {
          "language_learning": 0,
          "western_preference": 1
        }
      }
    ]
  },
  {
    "node_id": "EUR_SPECIALTY",
    "order": 5,
    "is_universal": false,
    "question_text": "Would you consider a European country where your specialty is in high demand?",
    "options": [
      {
        "option_text": "Yes — demand matters most to me",
        "next_node_id": "EUR_LIFESTYLE",
        "axis_deltas": {
          "western_preference": 1,
          "income_expectation": 1
        }
      },
      {
        "option_text": "Somewhat — I also care about the country itself",
        "next_node_id": "EUR_LIFESTYLE",
        "axis_deltas": {
          "western_preference": 1
        }
      },
      {
        "option_text": "No — I have a specific country in mind",
        "next_node_id": "EUR_LIFESTYLE",
        "axis_deltas": {
          "western_preference": 2
        }
      }
    ]
  },
  {
    "node_id": "EUR_LIFESTYLE",
    "order": 6,
    "is_universal": false,
    "question_text": "How important is work-life balance in your European destination?",
    "options": [
      {
        "option_text": "Critical — that is why I am considering Europe",
        "next_node_id": "DEEP1",
        "axis_deltas": {
          "western_preference": 1,
          "income_expectation": -1
        }
      },
      {
        "option_text": "Important but income matters too",
        "next_node_id": "DEEP1",
        "axis_deltas": {
          "income_expectation": 1
        }
      },
      {
        "option_text": "Secondary — career growth is my focus",
        "next_node_id": "DEEP1",
        "axis_deltas": {
          "research_academic_orientation": 1
        }
      }
    ]
  },
  {
    "node_id": "NA_EXAMS",
    "order": 4,
    "is_universal": false,
    "question_text": "How prepared are you for the rigorous exam process (USMLE/MCCQE)?",
    "options": [
      {
        "option_text": "Very — I have started or completed preparation",
        "next_node_id": "NA_MATCH",
        "axis_deltas": {
          "exam_tolerance": 2,
          "time_investment": 1
        }
      },
      {
        "option_text": "Somewhat — I know what is required",
        "next_node_id": "NA_MATCH",
        "axis_deltas": {
          "exam_tolerance": 1
        }
      },
      {
        "option_text": "Not at all — it is overwhelming to consider",
        "next_node_id": "NA_MATCH",
        "axis_deltas": {
          "exam_tolerance": -1,
          "cost_tolerance": 1
        }
      }
    ]
  },
  {
    "node_id": "NA_MATCH",
    "order": 5,
    "is_universal": false,
    "question_text": "Are you willing to go through the Match/residency process again in North America?",
    "options": [
      {
        "option_text": "Yes — I am prepared to redo residency",
        "next_node_id": "NA_COST",
        "axis_deltas": {
          "time_investment": 3,
          "exam_tolerance": 1
        }
      },
      {
        "option_text": "Only if I can get credit for my training",
        "next_node_id": "NA_COST",
        "axis_deltas": {
          "time_investment": 1
        }
      },
      {
        "option_text": "No — I want direct practice or observership pathways",
        "next_node_id": "NA_COST",
        "axis_deltas": {
          "time_investment": -1
        }
      }
    ]
  },
  {
    "node_id": "NA_COST",
    "order": 6,
    "is_universal": false,
    "question_text": "How do you plan to fund the North America process (exams, applications, travel)?",
    "options": [
      {
        "option_text": "Self-fund — I have savings",
        "next_node_id": "DEEP1",
        "axis_deltas": {
          "cost_tolerance": 2,
          "income_expectation": 2
        }
      },
      {
        "option_text": "Loans or family support",
        "next_node_id": "DEEP1",
        "axis_deltas": {
          "cost_tolerance": 1
        }
      },
      {
        "option_text": "I need scholarships or sponsored programs",
        "next_node_id": "DEEP1",
        "axis_deltas": {
          "cost_tolerance": -1
        }
      }
    ]
  },
  {
    "node_id": "OCEANIA_VISA",
    "order": 4,
    "is_universal": false,
    "question_text": "How important is the ease of the visa and registration process for your destination?",
    "options": [
      {
        "option_text": "Very — I want a straightforward pathway",
        "next_node_id": "OCEANIA_SPECIALTY",
        "axis_deltas": {
          "exam_tolerance": 1,
          "time_investment": -1
        }
      },
      {
        "option_text": "Moderately — I am willing to navigate complexity",
        "next_node_id": "OCEANIA_SPECIALTY",
        "axis_deltas": {
          "time_investment": 1
        }
      },
      {
        "option_text": "Not a concern — process is process",
        "next_node_id": "OCEANIA_SPECIALTY",
        "axis_deltas": {
          "willingness_relocate": 1
        }
      }
    ]
  },
  {
    "node_id": "OCEANIA_SPECIALTY",
    "order": 5,
    "is_universal": false,
    "question_text": "Would you consider working rurally or in underserved areas in Australia/New Zealand for faster registration?",
    "options": [
      {
        "option_text": "Yes — I am open to rural practice",
        "next_node_id": "DEEP1",
        "axis_deltas": {
          "humanitarian_orientation": 1,
          "willingness_relocate": 1
        }
      },
      {
        "option_text": "Only metropolitan areas",
        "next_node_id": "DEEP1",
        "axis_deltas": {
          "western_preference": 1,
          "income_expectation": 1
        }
      },
      {
        "option_text": "I need to learn more about the options first",
        "next_node_id": "DEEP1",
        "axis_deltas": {
          "time_investment": 1
        }
      }
    ]
  },
  {
    "node_id": "EGYPT_MOTIVE",
    "order": 4,
    "is_universal": false,
    "question_text": "What is your main reason for staying in Egypt?",
    "options": [
      {
        "option_text": "Family and personal roots",
        "next_node_id": "EGYPT_SECTOR",
        "axis_deltas": {
          "egypt_stability": 2
        }
      },
      {
        "option_text": "I believe in building up the Egyptian healthcare system",
        "next_node_id": "EGYPT_SECTOR",
        "axis_deltas": {
          "egypt_stability": 1,
          "humanitarian_orientation": 1
        }
      },
      {
        "option_text": "I prefer not to leave — familiarity and comfort",
        "next_node_id": "EGYPT_SECTOR",
        "axis_deltas": {
          "egypt_stability": 2,
          "willingness_relocate": -1
        }
      },
      {
        "option_text": "Financial constraints make moving abroad difficult",
        "next_node_id": "EGYPT_SECTOR",
        "axis_deltas": {
          "cost_tolerance": -1
        }
      }
    ]
  },
  {
    "node_id": "EGYPT_SECTOR",
    "order": 5,
    "is_universal": false,
    "question_text": "How do you view the differences between government, private, and academic sectors in Egypt?",
    "options": [
      {
        "option_text": "I prefer the stability and pension of government work",
        "next_node_id": "EGYPT_GROWTH",
        "axis_deltas": {
          "egypt_stability": 1,
          "income_expectation": -1
        }
      },
      {
        "option_text": "Private sector — better income and autonomy",
        "next_node_id": "EGYPT_GROWTH",
        "axis_deltas": {
          "income_expectation": 2
        }
      },
      {
        "option_text": "Academic — I want teaching and research",
        "next_node_id": "EGYPT_GROWTH",
        "axis_deltas": {
          "research_academic_orientation": 2
        }
      }
    ]
  },
  {
    "node_id": "EGYPT_GROWTH",
    "order": 6,
    "is_universal": false,
    "question_text": "Do you see yourself staying in Egypt long-term or eventually moving abroad?",
    "options": [
      {
        "option_text": "Long-term — Egypt is where I want to be",
        "next_node_id": "DEEP1",
        "axis_deltas": {
          "egypt_stability": 2
        }
      },
      {
        "option_text": "Build experience here first, then consider abroad",
        "next_node_id": "DEEP1",
        "axis_deltas": {
          "egypt_stability": 1,
          "willingness_relocate": 1
        }
      },
      {
        "option_text": "Use Egypt as a base while pursuing international opportunities",
        "next_node_id": "DEEP1",
        "axis_deltas": {
          "egypt_stability": 1,
          "gulf_preference": 1
        }
      }
    ]
  },
  {
    "node_id": "NONCLIN_SKILLS",
    "order": 4,
    "is_universal": false,
    "question_text": "What non-clinical skills do you already have?",
    "options": [
      {
        "option_text": "Research and academic writing",
        "next_node_id": "NONCLIN_EDUCATION",
        "axis_deltas": {
          "research_academic_orientation": 2
        }
      },
      {
        "option_text": "Administration, management, or leadership",
        "next_node_id": "NONCLIN_EDUCATION",
        "axis_deltas": {
          "clinical_vs_admin": -2
        }
      },
      {
        "option_text": "Technology, data, or informatics",
        "next_node_id": "NONCLIN_EDUCATION",
        "axis_deltas": {
          "clinical_vs_admin": -1
        }
      },
      {
        "option_text": "Public health, policy, or advocacy",
        "next_node_id": "NONCLIN_EDUCATION",
        "axis_deltas": {
          "humanitarian_orientation": 2
        }
      }
    ]
  },
  {
    "node_id": "NONCLIN_EDUCATION",
    "order": 5,
    "is_universal": false,
    "question_text": "Would you pursue additional education (MPH, MBA, MS) to strengthen your non-clinical profile?",
    "options": [
      {
        "option_text": "Yes — already planning to or currently doing so",
        "next_node_id": "NONCLIN_EARNINGS",
        "axis_deltas": {
          "time_investment": 2,
          "research_academic_orientation": 1
        }
      },
      {
        "option_text": "Maybe — depends on the program length and cost",
        "next_node_id": "NONCLIN_EARNINGS",
        "axis_deltas": {
          "time_investment": 1
        }
      },
      {
        "option_text": "No — I want to transition without more school",
        "next_node_id": "NONCLIN_EARNINGS",
        "axis_deltas": {
          "time_investment": -1
        }
      }
    ]
  },
  {
    "node_id": "NONCLIN_EARNINGS",
    "order": 6,
    "is_universal": false,
    "question_text": "What are your income expectations for a non-clinical role?",
    "options": [
      {
        "option_text": "Comparable to clinical practice or higher",
        "next_node_id": "DEEP1",
        "axis_deltas": {
          "income_expectation": 2,
          "clinical_vs_admin": -1
        }
      },
      {
        "option_text": "Slightly less than clinical — I accept the tradeoff",
        "next_node_id": "DEEP1",
        "axis_deltas": {
          "income_expectation": 0
        }
      },
      {
        "option_text": "I am flexible — impact matters more than income",
        "next_node_id": "DEEP1",
        "axis_deltas": {
          "humanitarian_orientation": 1,
          "research_academic_orientation": 1
        }
      }
    ]
  },
  {
    "node_id": "DEEP1",
    "order": 10,
    "is_universal": false,
    "question_text": "How important is mentorship and guidance in your career move?",
    "options": [
      {
        "option_text": "Critical — I need structured programs",
        "next_node_id": "DEEP2",
        "axis_deltas": {
          "time_investment": 1
        }
      },
      {
        "option_text": "Nice-to-have but not essential",
        "next_node_id": "DEEP2",
        "axis_deltas": {
          "willingness_relocate": 1
        }
      },
      {
        "option_text": "I prefer to figure things out independently",
        "next_node_id": "DEEP2",
        "axis_deltas": {
          "exam_tolerance": 1
        }
      }
    ]
  },
  {
    "node_id": "DEEP2",
    "order": 11,
    "is_universal": false,
    "question_text": "How do you feel about bureaucratic processes and paperwork?",
    "options": [
      {
        "option_text": "I can tolerate them for the right opportunity",
        "next_node_id": "DEEP3",
        "axis_deltas": {
          "exam_tolerance": 1
        }
      },
      {
        "option_text": "They frustrate me but I manage",
        "next_node_id": "DEEP3",
        "axis_deltas": {
          "time_investment": -1
        }
      },
      {
        "option_text": "I want to minimize them as much as possible",
        "next_node_id": "DEEP3",
        "axis_deltas": {
          "cost_tolerance": -1
        }
      }
    ]
  },
  {
    "node_id": "DEEP3",
    "order": 12,
    "is_universal": false,
    "question_text": "Would you consider a pathway that requires you to repeat residency or training?",
    "options": [
      {
        "option_text": "Yes, if it leads to a better outcome",
        "next_node_id": "DEEP4",
        "axis_deltas": {
          "time_investment": 2
        }
      },
      {
        "option_text": "Only if I can shorten it significantly",
        "next_node_id": "DEEP4",
        "axis_deltas": {
          "time_investment": 1,
          "western_preference": 1
        }
      },
      {
        "option_text": "No — I want to practice as soon as possible",
        "next_node_id": "DEEP4",
        "axis_deltas": {
          "time_investment": -2,
          "egypt_stability": 1
        }
      }
    ]
  },
  {
    "node_id": "DEEP4",
    "order": 13,
    "is_universal": false,
    "question_text": "How important is being near family and your support network?",
    "options": [
      {
        "option_text": "Extremely important — I cannot leave them",
        "next_node_id": "DEEP5",
        "axis_deltas": {
          "egypt_stability": 2,
          "willingness_relocate": -2
        }
      },
      {
        "option_text": "Important but I would travel for the right opportunity",
        "next_node_id": "DEEP5",
        "axis_deltas": {
          "willingness_relocate": 1
        }
      },
      {
        "option_text": "Not a factor — I am ready to start fresh anywhere",
        "next_node_id": "DEEP5",
        "axis_deltas": {
          "willingness_relocate": 3
        }
      }
    ]
  },
  {
    "node_id": "DEEP5",
    "order": 14,
    "is_universal": false,
    "question_text": "How confident are you in your English proficiency for exams and practice?",
    "options": [
      {
        "option_text": "Fluent — no concerns",
        "next_node_id": "DEEP6",
        "axis_deltas": {
          "language_learning": 0,
          "western_preference": 1
        }
      },
      {
        "option_text": "Good but would benefit from preparation",
        "next_node_id": "DEEP6",
        "axis_deltas": {
          "language_learning": 1
        }
      },
      {
        "option_text": "Limited — I would need significant improvement",
        "next_node_id": "DEEP6",
        "axis_deltas": {
          "language_learning": 2,
          "gulf_preference": 1
        }
      }
    ]
  },
  {
    "node_id": "DEEP6",
    "order": 15,
    "is_universal": false,
    "question_text": "How do you feel about taking computer-based standardized exams?",
    "options": [
      {
        "option_text": "Comfortable — I test well",
        "next_node_id": "DEEP7",
        "axis_deltas": {
          "exam_tolerance": 2
        }
      },
      {
        "option_text": "Nervous but I prepare and pass",
        "next_node_id": "DEEP7",
        "axis_deltas": {
          "exam_tolerance": 1
        }
      },
      {
        "option_text": "I really struggle with standardized tests",
        "next_node_id": "DEEP7",
        "axis_deltas": {
          "exam_tolerance": -1
        }
      }
    ]
  },
  {
    "node_id": "DEEP7",
    "order": 16,
    "is_universal": false,
    "question_text": "How long are you willing to live abroad before deciding whether to stay permanently?",
    "options": [
      {
        "option_text": "1-2 years — I want the option to return",
        "next_node_id": "DEEP8",
        "axis_deltas": {
          "willingness_relocate": 0,
          "egypt_stability": 0
        }
      },
      {
        "option_text": "3-5 years — enough time to establish myself",
        "next_node_id": "DEEP8",
        "axis_deltas": {
          "willingness_relocate": 1,
          "western_preference": 1
        }
      },
      {
        "option_text": "Indefinitely — I plan to settle abroad",
        "next_node_id": "DEEP8",
        "axis_deltas": {
          "willingness_relocate": 2,
          "western_preference": 2
        }
      }
    ]
  },
  {
    "node_id": "DEEP8",
    "order": 17,
    "is_universal": false,
    "question_text": "How important is it that your spouse or partner can also work in the destination country?",
    "options": [
      {
        "option_text": "Critical — we need dual income",
        "next_node_id": "DEEP9",
        "axis_deltas": {
          "western_preference": 1,
          "income_expectation": 1
        }
      },
      {
        "option_text": "Important but not a dealbreaker",
        "next_node_id": "DEEP9",
        "axis_deltas": {
          "willingness_relocate": 1
        }
      },
      {
        "option_text": "Not applicable — I am single",
        "next_node_id": "DEEP9",
        "axis_deltas": {}
      }
    ]
  },
  {
    "node_id": "DEEP9",
    "order": 18,
    "is_universal": false,
    "question_text": "Would you accept a lower-tier position or location to get your foot in the door?",
    "options": [
      {
        "option_text": "Yes — any opportunity to start",
        "next_node_id": "DEEP10",
        "axis_deltas": {
          "willingness_relocate": 1,
          "income_expectation": -1
        }
      },
      {
        "option_text": "Only if it is still in my desired region",
        "next_node_id": "DEEP10",
        "axis_deltas": {
          "western_preference": 0
        }
      },
      {
        "option_text": "No — I will wait for the right opportunity",
        "next_node_id": "DEEP10",
        "axis_deltas": {
          "income_expectation": 1,
          "time_investment": 1
        }
      }
    ]
  },
  {
    "node_id": "DEEP10",
    "order": 19,
    "is_universal": false,
    "question_text": "How much research have you already done on your preferred pathway?",
    "options": [
      {
        "option_text": "Extensive — I know the steps and costs",
        "next_node_id": "DEEP11",
        "axis_deltas": {
          "exam_tolerance": 1,
          "cost_tolerance": 0
        }
      },
      {
        "option_text": "Some — I have a general idea",
        "next_node_id": "DEEP11",
        "axis_deltas": {
          "time_investment": 1
        }
      },
      {
        "option_text": "Very little — that is why I am here",
        "next_node_id": "DEEP11",
        "axis_deltas": {
          "time_investment": 2
        }
      }
    ]
  },
  {
    "node_id": "DEEP11",
    "order": 20,
    "is_universal": false,
    "question_text": "How would you describe your financial situation for funding a career move?",
    "options": [
      {
        "option_text": "Comfortable — I can self-fund",
        "next_node_id": "DEEP12",
        "axis_deltas": {
          "cost_tolerance": 2,
          "income_expectation": 1
        }
      },
      {
        "option_text": "Limited but manageable with loans or support",
        "next_node_id": "DEEP12",
        "axis_deltas": {
          "cost_tolerance": 1
        }
      },
      {
        "option_text": "Tight — cost is the biggest factor for me",
        "next_node_id": "DEEP12",
        "axis_deltas": {
          "cost_tolerance": -1,
          "income_expectation": 2
        }
      }
    ]
  },
  {
    "node_id": "DEEP12",
    "order": 21,
    "is_universal": false,
    "question_text": "Do you have colleagues or friends who have already made the move you are considering?",
    "options": [
      {
        "option_text": "Yes — several, and they have shared their experience",
        "next_node_id": "VAL1",
        "axis_deltas": {
          "western_preference": 1,
          "gulf_preference": 1
        }
      },
      {
        "option_text": "One or two — enough to have some insight",
        "next_node_id": "VAL1",
        "axis_deltas": {
          "willingness_relocate": 1
        }
      },
      {
        "option_text": "No — I would be paving the way myself",
        "next_node_id": "VAL1",
        "axis_deltas": {
          "exam_tolerance": 1,
          "time_investment": 1
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
          "income_expectation": 1,
          "time_investment": 1
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
          "income_expectation": -1
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
          "clinical_vs_admin": 1
        }
      },
      {
        "option_text": "Specialist — I want to master one area",
        "next_node_id": "VAL3",
        "axis_deltas": {
          "research_academic_orientation": 1
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
          "willingness_relocate": 2,
          "western_preference": 1
        }
      },
      {
        "option_text": "Nice-to-have but I can commit to one place",
        "next_node_id": "VAL4",
        "axis_deltas": {
          "willingness_relocate": 0
        }
      },
      {
        "option_text": "Not important — I want to put down roots",
        "next_node_id": "VAL4",
        "axis_deltas": {
          "willingness_relocate": -1,
          "egypt_stability": 1
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
          "willingness_relocate": 1,
          "exam_tolerance": 1
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
          "egypt_stability": 1
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
        "next_node_id": "CALIB_EXAMS",
        "axis_deltas": {
          "clinical_vs_admin": -1
        }
      },
      {
        "option_text": "40-50 hours — a standard medical work week",
        "next_node_id": "CALIB_EXAMS",
        "axis_deltas": {}
      },
      {
        "option_text": "50+ hours — I am fully committed to my career",
        "next_node_id": "CALIB_EXAMS",
        "axis_deltas": {
          "clinical_vs_admin": 1
        }
      }
    ]
  }
],
  target_vectors: [
  {
    "specialty_name": "Stay-Egypt (MOH Government Nursing Track)",
    "axes": {
      "willingness_relocate": 0.1,
      "language_learning": 0.1,
      "exam_tolerance": 0.2,
      "time_investment": 0.3,
      "cost_tolerance": 0.2,
      "income_expectation": 0.3,
      "gulf_preference": 0.2,
      "western_preference": 0.2,
      "egypt_stability": 0.95,
      "clinical_vs_admin": 0.5,
      "humanitarian_orientation": 0.3,
      "research_academic_orientation": 0.3
    }
  },
  {
    "specialty_name": "Stay-Egypt (University/Teaching Hospital Nursing Track)",
    "axes": {
      "willingness_relocate": 0.1,
      "language_learning": 0.1,
      "exam_tolerance": 0.2,
      "time_investment": 0.4,
      "cost_tolerance": 0.2,
      "income_expectation": 0.3,
      "gulf_preference": 0.2,
      "western_preference": 0.3,
      "egypt_stability": 0.9,
      "clinical_vs_admin": 0.5,
      "humanitarian_orientation": 0.3,
      "research_academic_orientation": 0.85
    }
  },
  {
    "specialty_name": "Stay-Egypt (Private Sector Nursing)",
    "axes": {
      "willingness_relocate": 0.1,
      "language_learning": 0.1,
      "exam_tolerance": 0.2,
      "time_investment": 0.2,
      "cost_tolerance": 0.3,
      "income_expectation": 0.75,
      "gulf_preference": 0.2,
      "western_preference": 0.2,
      "egypt_stability": 0.8,
      "clinical_vs_admin": 0.5,
      "humanitarian_orientation": 0.2,
      "research_academic_orientation": 0.2
    }
  },
  {
    "specialty_name": "Stay-Egypt (Military/Police Nursing Services)",
    "axes": {
      "willingness_relocate": 0.1,
      "language_learning": 0.1,
      "exam_tolerance": 0.3,
      "time_investment": 0.3,
      "cost_tolerance": 0.2,
      "income_expectation": 0.4,
      "gulf_preference": 0.2,
      "western_preference": 0.2,
      "egypt_stability": 0.9,
      "clinical_vs_admin": 0.5,
      "humanitarian_orientation": 0.2,
      "research_academic_orientation": 0.2
    }
  },
  {
    "specialty_name": "Stay-Egypt (Postgraduate Nursing Track)",
    "axes": {
      "willingness_relocate": 0.2,
      "language_learning": 0.2,
      "exam_tolerance": 0.4,
      "time_investment": 0.6,
      "cost_tolerance": 0.3,
      "income_expectation": 0.3,
      "gulf_preference": 0.2,
      "western_preference": 0.3,
      "egypt_stability": 0.7,
      "clinical_vs_admin": 0.5,
      "humanitarian_orientation": 0.3,
      "research_academic_orientation": 0.9
    }
  },
  {
    "specialty_name": "Stay-Egypt (NGO/International Health Nursing)",
    "axes": {
      "willingness_relocate": 0.2,
      "language_learning": 0.3,
      "exam_tolerance": 0.2,
      "time_investment": 0.3,
      "cost_tolerance": 0.2,
      "income_expectation": 0.4,
      "gulf_preference": 0.2,
      "western_preference": 0.3,
      "egypt_stability": 0.6,
      "clinical_vs_admin": 0.3,
      "humanitarian_orientation": 0.9,
      "research_academic_orientation": 0.4
    }
  },
  {
    "specialty_name": "Saudi Arabia — Saudi Nursing License (SCFHS)",
    "axes": {
      "willingness_relocate": 0.8,
      "language_learning": 0.2,
      "exam_tolerance": 0.6,
      "time_investment": 0.4,
      "cost_tolerance": 0.5,
      "income_expectation": 0.8,
      "gulf_preference": 0.95,
      "western_preference": 0.2,
      "egypt_stability": 0.2,
      "clinical_vs_admin": 0.5,
      "humanitarian_orientation": 0.2,
      "research_academic_orientation": 0.3
    }
  },
  {
    "specialty_name": "UAE — Nursing License (DHA/DoH)",
    "axes": {
      "willingness_relocate": 0.8,
      "language_learning": 0.2,
      "exam_tolerance": 0.5,
      "time_investment": 0.4,
      "cost_tolerance": 0.5,
      "income_expectation": 0.85,
      "gulf_preference": 0.85,
      "western_preference": 0.35,
      "egypt_stability": 0.2,
      "clinical_vs_admin": 0.5,
      "humanitarian_orientation": 0.2,
      "research_academic_orientation": 0.3
    }
  },
  {
    "specialty_name": "UK — NMC OSCE",
    "axes": {
      "willingness_relocate": 0.85,
      "language_learning": 0.1,
      "exam_tolerance": 0.7,
      "time_investment": 0.5,
      "cost_tolerance": 0.6,
      "income_expectation": 0.6,
      "gulf_preference": 0.2,
      "western_preference": 0.9,
      "egypt_stability": 0.15,
      "clinical_vs_admin": 0.5,
      "humanitarian_orientation": 0.3,
      "research_academic_orientation": 0.3
    }
  },
  {
    "specialty_name": "Ireland — NMBI Registration",
    "axes": {
      "willingness_relocate": 0.8,
      "language_learning": 0.1,
      "exam_tolerance": 0.5,
      "time_investment": 0.4,
      "cost_tolerance": 0.6,
      "income_expectation": 0.55,
      "gulf_preference": 0.2,
      "western_preference": 0.85,
      "egypt_stability": 0.2,
      "clinical_vs_admin": 0.55,
      "humanitarian_orientation": 0.25,
      "research_academic_orientation": 0.3
    }
  },
  {
    "specialty_name": "Germany — Nursing Approbation",
    "axes": {
      "willingness_relocate": 0.85,
      "language_learning": 0.95,
      "exam_tolerance": 0.6,
      "time_investment": 0.6,
      "cost_tolerance": 0.5,
      "income_expectation": 0.7,
      "gulf_preference": 0.15,
      "western_preference": 0.9,
      "egypt_stability": 0.1,
      "clinical_vs_admin": 0.5,
      "humanitarian_orientation": 0.3,
      "research_academic_orientation": 0.3
    }
  },
  {
    "specialty_name": "Malta — Nursing Council Registration",
    "axes": {
      "willingness_relocate": 0.7,
      "language_learning": 0.1,
      "exam_tolerance": 0.3,
      "time_investment": 0.3,
      "cost_tolerance": 0.4,
      "income_expectation": 0.5,
      "gulf_preference": 0.2,
      "western_preference": 0.7,
      "egypt_stability": 0.25,
      "clinical_vs_admin": 0.5,
      "humanitarian_orientation": 0.3,
      "research_academic_orientation": 0.3
    }
  },
  {
    "specialty_name": "Canada — NCLEX-RN",
    "axes": {
      "willingness_relocate": 0.85,
      "language_learning": 0.1,
      "exam_tolerance": 0.75,
      "time_investment": 0.6,
      "cost_tolerance": 0.75,
      "income_expectation": 0.65,
      "gulf_preference": 0.1,
      "western_preference": 0.9,
      "egypt_stability": 0.15,
      "clinical_vs_admin": 0.55,
      "humanitarian_orientation": 0.3,
      "research_academic_orientation": 0.4
    }
  },
  {
    "specialty_name": "USA — NCLEX-RN",
    "axes": {
      "willingness_relocate": 0.9,
      "language_learning": 0.1,
      "exam_tolerance": 0.8,
      "time_investment": 0.7,
      "cost_tolerance": 0.8,
      "income_expectation": 0.95,
      "gulf_preference": 0.1,
      "western_preference": 0.95,
      "egypt_stability": 0.1,
      "clinical_vs_admin": 0.5,
      "humanitarian_orientation": 0.2,
      "research_academic_orientation": 0.3
    }
  },
  {
    "specialty_name": "Australia — AHPRA/ANMAC Nursing",
    "axes": {
      "willingness_relocate": 0.85,
      "language_learning": 0.1,
      "exam_tolerance": 0.55,
      "time_investment": 0.6,
      "cost_tolerance": 0.5,
      "income_expectation": 0.8,
      "gulf_preference": 0.1,
      "western_preference": 0.8,
      "egypt_stability": 0.15,
      "clinical_vs_admin": 0.45,
      "humanitarian_orientation": 0.3,
      "research_academic_orientation": 0.3
    }
  },
  {
    "specialty_name": "New Zealand — Nursing Council Registration",
    "axes": {
      "willingness_relocate": 0.75,
      "language_learning": 0.1,
      "exam_tolerance": 0.5,
      "time_investment": 0.4,
      "cost_tolerance": 0.4,
      "income_expectation": 0.55,
      "gulf_preference": 0.1,
      "western_preference": 0.85,
      "egypt_stability": 0.2,
      "clinical_vs_admin": 0.4,
      "humanitarian_orientation": 0.45,
      "research_academic_orientation": 0.3
    }
  },
  {
    "specialty_name": "International Organization Nursing (WHO/UN)",
    "axes": {
      "willingness_relocate": 0.6,
      "language_learning": 0.4,
      "exam_tolerance": 0.2,
      "time_investment": 0.4,
      "cost_tolerance": 0.3,
      "income_expectation": 0.5,
      "gulf_preference": 0.2,
      "western_preference": 0.4,
      "egypt_stability": 0.3,
      "clinical_vs_admin": 0.15,
      "humanitarian_orientation": 0.95,
      "research_academic_orientation": 0.5
    }
  },
  {
    "specialty_name": "Humanitarian Nursing (MSF, IRC, Red Cross)",
    "axes": {
      "willingness_relocate": 0.9,
      "language_learning": 0.5,
      "exam_tolerance": 0.2,
      "time_investment": 0.3,
      "cost_tolerance": 0.2,
      "income_expectation": 0.3,
      "gulf_preference": 0.3,
      "western_preference": 0.3,
      "egypt_stability": 0.2,
      "clinical_vs_admin": 0.3,
      "humanitarian_orientation": 0.95,
      "research_academic_orientation": 0.3
    }
  },
  {
    "specialty_name": "Global Health Research Nursing",
    "axes": {
      "willingness_relocate": 0.5,
      "language_learning": 0.4,
      "exam_tolerance": 0.3,
      "time_investment": 0.6,
      "cost_tolerance": 0.3,
      "income_expectation": 0.4,
      "gulf_preference": 0.15,
      "western_preference": 0.5,
      "egypt_stability": 0.3,
      "clinical_vs_admin": 0.15,
      "humanitarian_orientation": 0.6,
      "research_academic_orientation": 0.95
    }
  },
  {
    "specialty_name": "Health-Tech Nursing / Nursing Informatics",
    "axes": {
      "willingness_relocate": 0.4,
      "language_learning": 0.2,
      "exam_tolerance": 0.2,
      "time_investment": 0.3,
      "cost_tolerance": 0.3,
      "income_expectation": 0.75,
      "gulf_preference": 0.2,
      "western_preference": 0.5,
      "egypt_stability": 0.4,
      "clinical_vs_admin": 0.1,
      "humanitarian_orientation": 0.3,
      "research_academic_orientation": 0.4
    }
  },
  {
    "specialty_name": "Pharmaceutical/Clinical Research Nursing",
    "axes": {
      "willingness_relocate": 0.4,
      "language_learning": 0.3,
      "exam_tolerance": 0.3,
      "time_investment": 0.3,
      "cost_tolerance": 0.3,
      "income_expectation": 0.8,
      "gulf_preference": 0.3,
      "western_preference": 0.4,
      "egypt_stability": 0.4,
      "clinical_vs_admin": 0.15,
      "humanitarian_orientation": 0.3,
      "research_academic_orientation": 0.7
    }
  }
],
};
