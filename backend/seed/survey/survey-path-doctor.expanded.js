// Auto-generated expanded Doctor Path Survey Graph
// Source: survey-path-doctor.js
// Generated on: 2026-07-07T20:06:06.708Z

export const doctor_path_graph = {
  type: 'path',
  role: 'doctor',
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
    "question_text": "What's your primary motivation for your next career step?",
    "options": [
      {
        "option_text": "Build my career abroad — higher income and global experience",
        "next_node_id": "ABROAD_PATH",
        "axis_deltas": {
          "willingness_relocate": 3,
          "income_expectation": 2,
          "egypt_stability": -2
        }
      },
      {
        "option_text": "Establish myself in Egypt first — stability and roots",
        "next_node_id": "EGYPT_PATH",
        "axis_deltas": {
          "egypt_stability": 3,
          "willingness_relocate": -2
        }
      },
      {
        "option_text": "Explore non-clinical, global health, or humanitarian work",
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
    "question_text": "Which region most attracts you for practice?",
    "options": [
      {
        "option_text": "Gulf / Arab world — close to home, culturally familiar",
        "next_node_id": "GULF_FOCUS",
        "axis_deltas": {
          "gulf_preference": 3,
          "willingness_relocate": 1
        }
      },
      {
        "option_text": "Europe — history, travel, and balanced lifestyle",
        "next_node_id": "EUROPE_FOCUS",
        "axis_deltas": {
          "western_preference": 2,
          "language_learning": 1
        }
      },
      {
        "option_text": "North America — highest income and cutting-edge medicine",
        "next_node_id": "NA_FOCUS",
        "axis_deltas": {
          "western_preference": 3,
          "income_expectation": 2
        }
      },
      {
        "option_text": "Oceania — sunshine, outdoors, and growing healthcare system",
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
    "question_text": "Gulf pathway — what is your top priority?",
    "options": [
      {
        "option_text": "Fastest and most straightforward process — Saudi Prometric",
        "next_node_id": "CALIB_EXAMS",
        "axis_deltas": {
          "gulf_preference": 2,
          "exam_tolerance": 1,
          "time_investment": -1
        }
      },
      {
        "option_text": "Highest earning potential and prestige — Qatar or UAE",
        "next_node_id": "CALIB_EXAMS",
        "axis_deltas": {
          "income_expectation": 2,
          "gulf_preference": 2
        }
      },
      {
        "option_text": "Better lifestyle and stability — UAE, Bahrain, or Oman",
        "next_node_id": "CALIB_EXAMS",
        "axis_deltas": {
          "gulf_preference": 1,
          "time_investment": 1
        }
      },
      {
        "option_text": "I have specific connections or family — Kuwait",
        "next_node_id": "CALIB_EXAMS",
        "axis_deltas": {
          "gulf_preference": 2,
          "egypt_stability": -1
        }
      }
    ]
  },
  {
    "node_id": "EUROPE_FOCUS",
    "order": 3,
    "is_universal": false,
    "question_text": "Europe — how do you feel about language requirements?",
    "options": [
      {
        "option_text": "I only speak English — UK or Ireland are my options",
        "next_node_id": "CALIB_EXAMS",
        "axis_deltas": {
          "western_preference": 2,
          "language_learning": 0,
          "exam_tolerance": 2
        }
      },
      {
        "option_text": "I am willing to learn a language — Germany is worth the effort",
        "next_node_id": "CALIB_EXAMS",
        "axis_deltas": {
          "language_learning": 3,
          "time_investment": 2,
          "income_expectation": 1
        }
      },
      {
        "option_text": "English-friendly with faster process — Malta",
        "next_node_id": "CALIB_EXAMS",
        "axis_deltas": {
          "western_preference": 1,
          "language_learning": 0,
          "time_investment": -1
        }
      }
    ]
  },
  {
    "node_id": "NA_FOCUS",
    "order": 3,
    "is_universal": false,
    "question_text": "North America — which destination?",
    "options": [
      {
        "option_text": "USA — highest stakes, highest reward, most opportunities",
        "next_node_id": "CALIB_EXAMS",
        "axis_deltas": {
          "western_preference": 3,
          "exam_tolerance": 3,
          "cost_tolerance": 3,
          "income_expectation": 3,
          "time_investment": 3
        }
      },
      {
        "option_text": "Canada — good income, better work-life balance, IMG-friendly provinces",
        "next_node_id": "CALIB_EXAMS",
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
        "option_text": "Australia — larger market, specialist pathway, beach lifestyle",
        "next_node_id": "CALIB_EXAMS",
        "axis_deltas": {
          "western_preference": 2,
          "exam_tolerance": 2,
          "time_investment": 2,
          "income_expectation": 2
        }
      },
      {
        "option_text": "New Zealand — smaller, quieter, streamlined process",
        "next_node_id": "CALIB_EXAMS",
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
    "question_text": "Staying in Egypt — what is your preferred setting?",
    "options": [
      {
        "option_text": "Government MOH hospital — job security, pension, structured career",
        "next_node_id": "CALIB_EXAMS",
        "axis_deltas": {
          "egypt_stability": 3,
          "income_expectation": -1,
          "clinical_vs_admin": 1
        }
      },
      {
        "option_text": "University hospital — academic career, research, teaching",
        "next_node_id": "CALIB_EXAMS",
        "axis_deltas": {
          "egypt_stability": 2,
          "research_academic_orientation": 3,
          "income_expectation": -1
        }
      },
      {
        "option_text": "Private sector — higher income, more autonomy, less security",
        "next_node_id": "CALIB_EXAMS",
        "axis_deltas": {
          "egypt_stability": 1,
          "income_expectation": 2,
          "clinical_vs_admin": 1
        }
      },
      {
        "option_text": "Military or Police medical services — distinct benefits and track",
        "next_node_id": "CALIB_EXAMS",
        "axis_deltas": {
          "egypt_stability": 2,
          "income_expectation": 1
        }
      },
      {
        "option_text": "Pursue a postgraduate degree (Masters/MD) first",
        "next_node_id": "CALIB_EXAMS",
        "axis_deltas": {
          "egypt_stability": 1,
          "research_academic_orientation": 2,
          "time_investment": 2
        }
      },
      {
        "option_text": "Work with international NGOs operating in Egypt",
        "next_node_id": "CALIB_EXAMS",
        "axis_deltas": {
          "egypt_stability": 1,
          "humanitarian_orientation": 3,
          "clinical_vs_admin": -1
        }
      }
    ]
  },
  {
    "node_id": "NON_CLINICAL_PATH",
    "order": 2,
    "is_universal": false,
    "question_text": "Non-clinical path — what kind of impact do you want?",
    "options": [
      {
        "option_text": "Global health policy and programs — WHO, UN agencies",
        "next_node_id": "CALIB_EXAMS",
        "axis_deltas": {
          "humanitarian_orientation": 3,
          "clinical_vs_admin": -2,
          "research_academic_orientation": 1
        }
      },
      {
        "option_text": "Humanitarian field work — MSF, Red Cross, crisis response",
        "next_node_id": "CALIB_EXAMS",
        "axis_deltas": {
          "humanitarian_orientation": 3,
          "clinical_vs_admin": 0,
          "willingness_relocate": 2
        }
      },
      {
        "option_text": "Global health research — publications, academia, think tanks",
        "next_node_id": "CALIB_EXAMS",
        "axis_deltas": {
          "research_academic_orientation": 3,
          "clinical_vs_admin": -1,
          "language_learning": 1
        }
      },
      {
        "option_text": "Health-tech and digital health — innovation and product roles",
        "next_node_id": "CALIB_EXAMS",
        "axis_deltas": {
          "clinical_vs_admin": -2,
          "income_expectation": 2,
          "research_academic_orientation": 1
        }
      },
      {
        "option_text": "Pharmaceutical industry — clinical development, medical affairs",
        "next_node_id": "CALIB_EXAMS",
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
    "question_text": "How many standardized exams are you willing to sit for your career move?",
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
        "option_text": "3 — Up to $4,000",
        "next_node_id": "CALIB_TIME",
        "axis_deltas": {
          "cost_tolerance": 2
        }
      },
      {
        "option_text": "4 — Up to $8,000",
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
    "specialty_name": "Stay-Egypt (MOH Government Track)",
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
    "specialty_name": "Stay-Egypt (University Hospital Track)",
    "axes": {
      "willingness_relocate": 0.1,
      "language_learning": 0.1,
      "exam_tolerance": 0.2,
      "time_investment": 0.5,
      "cost_tolerance": 0.2,
      "income_expectation": 0.3,
      "gulf_preference": 0.2,
      "western_preference": 0.3,
      "egypt_stability": 0.9,
      "clinical_vs_admin": 0.5,
      "humanitarian_orientation": 0.3,
      "research_academic_orientation": 0.9
    }
  },
  {
    "specialty_name": "Stay-Egypt (Private Sector Practice)",
    "axes": {
      "willingness_relocate": 0.1,
      "language_learning": 0.1,
      "exam_tolerance": 0.2,
      "time_investment": 0.2,
      "cost_tolerance": 0.3,
      "income_expectation": 0.8,
      "gulf_preference": 0.2,
      "western_preference": 0.2,
      "egypt_stability": 0.8,
      "clinical_vs_admin": 0.5,
      "humanitarian_orientation": 0.2,
      "research_academic_orientation": 0.2
    }
  },
  {
    "specialty_name": "Stay-Egypt (Military/Police Medical Services)",
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
    "specialty_name": "Stay-Egypt (Postgraduate Degree Track)",
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
    "specialty_name": "Stay-Egypt (NGO/International Health In-Country)",
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
    "specialty_name": "Saudi Arabia — Prometric/SCFHS",
    "axes": {
      "willingness_relocate": 0.8,
      "language_learning": 0.2,
      "exam_tolerance": 0.65,
      "time_investment": 0.4,
      "cost_tolerance": 0.4,
      "income_expectation": 0.85,
      "gulf_preference": 0.95,
      "western_preference": 0.15,
      "egypt_stability": 0.2,
      "clinical_vs_admin": 0.5,
      "humanitarian_orientation": 0.2,
      "research_academic_orientation": 0.3
    }
  },
  {
    "specialty_name": "UAE — DHA (Dubai)",
    "axes": {
      "willingness_relocate": 0.8,
      "language_learning": 0.2,
      "exam_tolerance": 0.5,
      "time_investment": 0.4,
      "cost_tolerance": 0.5,
      "income_expectation": 0.9,
      "gulf_preference": 0.8,
      "western_preference": 0.5,
      "egypt_stability": 0.2,
      "clinical_vs_admin": 0.5,
      "humanitarian_orientation": 0.2,
      "research_academic_orientation": 0.3
    }
  },
  {
    "specialty_name": "UAE — MOH/Haad (Abu Dhabi)",
    "axes": {
      "willingness_relocate": 0.8,
      "language_learning": 0.2,
      "exam_tolerance": 0.55,
      "time_investment": 0.45,
      "cost_tolerance": 0.45,
      "income_expectation": 0.65,
      "gulf_preference": 0.8,
      "western_preference": 0.3,
      "egypt_stability": 0.2,
      "clinical_vs_admin": 0.5,
      "humanitarian_orientation": 0.2,
      "research_academic_orientation": 0.3
    }
  },
  {
    "specialty_name": "Qatar — QCHP",
    "axes": {
      "willingness_relocate": 0.8,
      "language_learning": 0.2,
      "exam_tolerance": 0.45,
      "time_investment": 0.35,
      "cost_tolerance": 0.65,
      "income_expectation": 0.6,
      "gulf_preference": 0.95,
      "western_preference": 0.25,
      "egypt_stability": 0.2,
      "clinical_vs_admin": 0.5,
      "humanitarian_orientation": 0.2,
      "research_academic_orientation": 0.3
    }
  },
  {
    "specialty_name": "Kuwait — MOH Licensing",
    "axes": {
      "willingness_relocate": 0.75,
      "language_learning": 0.2,
      "exam_tolerance": 0.45,
      "time_investment": 0.4,
      "cost_tolerance": 0.4,
      "income_expectation": 0.8,
      "gulf_preference": 0.9,
      "western_preference": 0.2,
      "egypt_stability": 0.3,
      "clinical_vs_admin": 0.5,
      "humanitarian_orientation": 0.2,
      "research_academic_orientation": 0.3
    }
  },
  {
    "specialty_name": "Bahrain — NHRA",
    "axes": {
      "willingness_relocate": 0.7,
      "language_learning": 0.2,
      "exam_tolerance": 0.5,
      "time_investment": 0.35,
      "cost_tolerance": 0.5,
      "income_expectation": 0.8,
      "gulf_preference": 0.75,
      "western_preference": 0.4,
      "egypt_stability": 0.25,
      "clinical_vs_admin": 0.5,
      "humanitarian_orientation": 0.2,
      "research_academic_orientation": 0.3
    }
  },
  {
    "specialty_name": "Oman — MOH Licensing",
    "axes": {
      "willingness_relocate": 0.7,
      "language_learning": 0.2,
      "exam_tolerance": 0.35,
      "time_investment": 0.25,
      "cost_tolerance": 0.35,
      "income_expectation": 0.55,
      "gulf_preference": 0.85,
      "western_preference": 0.2,
      "egypt_stability": 0.25,
      "clinical_vs_admin": 0.5,
      "humanitarian_orientation": 0.2,
      "research_academic_orientation": 0.3
    }
  },
  {
    "specialty_name": "UK — PLAB",
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
      "research_academic_orientation": 0.4
    }
  },
  {
    "specialty_name": "Ireland — IMC Registration",
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
      "research_academic_orientation": 0.4
    }
  },
  {
    "specialty_name": "Germany — Approbation",
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
      "research_academic_orientation": 0.4
    }
  },
  {
    "specialty_name": "Malta — Medical Council Registration",
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
    "specialty_name": "USA — USMLE",
    "axes": {
      "willingness_relocate": 0.9,
      "language_learning": 0.1,
      "exam_tolerance": 0.95,
      "time_investment": 0.9,
      "cost_tolerance": 0.95,
      "income_expectation": 0.95,
      "gulf_preference": 0.1,
      "western_preference": 0.95,
      "egypt_stability": 0.1,
      "clinical_vs_admin": 0.5,
      "humanitarian_orientation": 0.2,
      "research_academic_orientation": 0.5
    }
  },
  {
    "specialty_name": "Canada — NAC/MCCQE",
    "axes": {
      "willingness_relocate": 0.85,
      "language_learning": 0.1,
      "exam_tolerance": 0.75,
      "time_investment": 0.6,
      "cost_tolerance": 0.65,
      "income_expectation": 0.65,
      "gulf_preference": 0.1,
      "western_preference": 0.9,
      "egypt_stability": 0.15,
      "clinical_vs_admin": 0.55,
      "humanitarian_orientation": 0.3,
      "research_academic_orientation": 0.5
    }
  },
  {
    "specialty_name": "Australia — AMC",
    "axes": {
      "willingness_relocate": 0.85,
      "language_learning": 0.1,
      "exam_tolerance": 0.55,
      "time_investment": 0.6,
      "cost_tolerance": 0.55,
      "income_expectation": 0.8,
      "gulf_preference": 0.1,
      "western_preference": 0.8,
      "egypt_stability": 0.15,
      "clinical_vs_admin": 0.45,
      "humanitarian_orientation": 0.3,
      "research_academic_orientation": 0.35
    }
  },
  {
    "specialty_name": "New Zealand — NZREX",
    "axes": {
      "willingness_relocate": 0.75,
      "language_learning": 0.1,
      "exam_tolerance": 0.5,
      "time_investment": 0.4,
      "cost_tolerance": 0.45,
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
    "specialty_name": "International Organization Track (WHO/UN)",
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
    "specialty_name": "Humanitarian Field Track (MSF, IRC, Red Cross)",
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
    "specialty_name": "Global Health Research Track",
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
    "specialty_name": "Health-Tech / Digital Health Industry Track",
    "axes": {
      "willingness_relocate": 0.4,
      "language_learning": 0.2,
      "exam_tolerance": 0.2,
      "time_investment": 0.3,
      "cost_tolerance": 0.3,
      "income_expectation": 0.8,
      "gulf_preference": 0.2,
      "western_preference": 0.5,
      "egypt_stability": 0.4,
      "clinical_vs_admin": 0.1,
      "humanitarian_orientation": 0.3,
      "research_academic_orientation": 0.5
    }
  },
  {
    "specialty_name": "Pharmaceutical / Clinical Research Industry Track",
    "axes": {
      "willingness_relocate": 0.4,
      "language_learning": 0.3,
      "exam_tolerance": 0.3,
      "time_investment": 0.3,
      "cost_tolerance": 0.3,
      "income_expectation": 0.85,
      "gulf_preference": 0.3,
      "western_preference": 0.4,
      "egypt_stability": 0.4,
      "clinical_vs_admin": 0.15,
      "humanitarian_orientation": 0.3,
      "research_academic_orientation": 0.7
    }
  },
  {
    "specialty_name": "UK — MRCP (Internal Medicine)",
    "axes": {
      "willingness_relocate": 0.75,
      "language_learning": 0.85,
      "exam_tolerance": 0.9,
      "time_investment": 0.85,
      "cost_tolerance": 0.5,
      "income_expectation": 0.45,
      "gulf_preference": 0.15,
      "western_preference": 0.9,
      "egypt_stability": 0.1,
      "clinical_vs_admin": 0.75,
      "humanitarian_orientation": 0.25,
      "research_academic_orientation": 0.7
    }
  },
  {
    "specialty_name": "UK — MRCS (Surgery)",
    "axes": {
      "willingness_relocate": 0.75,
      "language_learning": 0.85,
      "exam_tolerance": 0.85,
      "time_investment": 0.9,
      "cost_tolerance": 0.5,
      "income_expectation": 0.65,
      "gulf_preference": 0.15,
      "western_preference": 0.9,
      "egypt_stability": 0.1,
      "clinical_vs_admin": 0.95,
      "humanitarian_orientation": 0.1,
      "research_academic_orientation": 0.3
    }
  },
  {
    "specialty_name": "UK — MRCPCH (Paediatrics)",
    "axes": {
      "willingness_relocate": 0.7,
      "language_learning": 0.85,
      "exam_tolerance": 0.85,
      "time_investment": 0.9,
      "cost_tolerance": 0.5,
      "income_expectation": 0.35,
      "gulf_preference": 0.15,
      "western_preference": 0.9,
      "egypt_stability": 0.1,
      "clinical_vs_admin": 0.5,
      "humanitarian_orientation": 0.6,
      "research_academic_orientation": 0.3
    }
  },
  {
    "specialty_name": "UK — MRCGP (General Practice)",
    "axes": {
      "willingness_relocate": 0.7,
      "language_learning": 0.85,
      "exam_tolerance": 0.75,
      "time_investment": 0.6,
      "cost_tolerance": 0.5,
      "income_expectation": 0.5,
      "gulf_preference": 0.15,
      "western_preference": 0.9,
      "egypt_stability": 0.1,
      "clinical_vs_admin": 0.6,
      "humanitarian_orientation": 0.4,
      "research_academic_orientation": 0.2
    }
  },
  {
    "specialty_name": "UK — MRCPath (Pathology)",
    "axes": {
      "willingness_relocate": 0.7,
      "language_learning": 0.85,
      "exam_tolerance": 0.8,
      "time_investment": 0.85,
      "cost_tolerance": 0.5,
      "income_expectation": 0.5,
      "gulf_preference": 0.15,
      "western_preference": 0.9,
      "egypt_stability": 0.1,
      "clinical_vs_admin": 0.3,
      "humanitarian_orientation": 0.2,
      "research_academic_orientation": 0.7
    }
  },
  {
    "specialty_name": "UK — FRCR (Radiology)",
    "axes": {
      "willingness_relocate": 0.75,
      "language_learning": 0.85,
      "exam_tolerance": 0.85,
      "time_investment": 0.9,
      "cost_tolerance": 0.55,
      "income_expectation": 0.6,
      "gulf_preference": 0.15,
      "western_preference": 0.9,
      "egypt_stability": 0.1,
      "clinical_vs_admin": 0.5,
      "humanitarian_orientation": 0.2,
      "research_academic_orientation": 0.4
    }
  },
  {
    "specialty_name": "UK — FRCA (Anaesthetics)",
    "axes": {
      "willingness_relocate": 0.75,
      "language_learning": 0.85,
      "exam_tolerance": 0.95,
      "time_investment": 0.9,
      "cost_tolerance": 0.5,
      "income_expectation": 0.5,
      "gulf_preference": 0.15,
      "western_preference": 0.9,
      "egypt_stability": 0.1,
      "clinical_vs_admin": 0.8,
      "humanitarian_orientation": 0.2,
      "research_academic_orientation": 0.3
    }
  },
  {
    "specialty_name": "UK — MRCOG (Obstetrics & Gynaecology)",
    "axes": {
      "willingness_relocate": 0.7,
      "language_learning": 0.85,
      "exam_tolerance": 0.8,
      "time_investment": 0.9,
      "cost_tolerance": 0.5,
      "income_expectation": 0.65,
      "gulf_preference": 0.15,
      "western_preference": 0.9,
      "egypt_stability": 0.1,
      "clinical_vs_admin": 0.65,
      "humanitarian_orientation": 0.4,
      "research_academic_orientation": 0.3
    }
  },
  {
    "specialty_name": "UK — MFPH (Public Health)",
    "axes": {
      "willingness_relocate": 0.65,
      "language_learning": 0.8,
      "exam_tolerance": 0.7,
      "time_investment": 0.65,
      "cost_tolerance": 0.4,
      "income_expectation": 0.45,
      "gulf_preference": 0.15,
      "western_preference": 0.85,
      "egypt_stability": 0.1,
      "clinical_vs_admin": 0.2,
      "humanitarian_orientation": 0.6,
      "research_academic_orientation": 0.8
    }
  },
  {
    "specialty_name": "UK — MRCPsych (Psychiatry)",
    "axes": {
      "willingness_relocate": 0.7,
      "language_learning": 0.85,
      "exam_tolerance": 0.8,
      "time_investment": 0.85,
      "cost_tolerance": 0.5,
      "income_expectation": 0.5,
      "gulf_preference": 0.15,
      "western_preference": 0.9,
      "egypt_stability": 0.1,
      "clinical_vs_admin": 0.65,
      "humanitarian_orientation": 0.5,
      "research_academic_orientation": 0.4
    }
  }
],
};
