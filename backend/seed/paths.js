export const paths = [
  {
    "name": "Stay-Egypt (MOH Government Track)",
    "category": "doctor",
    "path_type": "career",
    "target_country": "Egypt",
    "description": "Ministry of Health hospital placement — government salary scale, pension, and job security.",
    "required_exams": [
      {
        "name": "Egyptian Medical Licensing Exam",
        "official_link": "https://www.ems.org.eg",
        "format": "written",
        "cost_usd": 200,
        "retake_policy": "Unlimited attempts, 3-month waiting period"
      }
    ],
    "required_language_tests": [],
    "total_estimated_cost_usd": 500,
    "total_duration_months": 48,
    "content_status": "verified",
    "order": 1,
    "official_source_links": [
      "https://www.ems.org.eg"
    ],
    "egypt_specific_notes": "Requires MBBS from an Egyptian university or equivalency from the Supreme Council of Universities.",
    "visa_info": [],
    "expected_salary": {
      "min_annual": 5000,
      "max_annual": 20000,
      "currency": "USD",
      "notes": "Government ~$5K; private up to $20K"
    },
    "pass_rates": [
      {
        "exam_name": "Egyptian Medical Licensing Exam",
        "pass_rate": 60,
        "source": "Estimated 2025"
      }
    ],
    "competitiveness_rating": "medium",
    "language_course_required": false
  },
  {
    "name": "Stay-Egypt (University Hospital Track)",
    "category": "doctor",
    "path_type": "career",
    "target_country": "Egypt",
    "description": "Teaching hospital appointment with path toward Masters/MD/professorship — research-adjacent academic career.",
    "required_exams": [],
    "required_language_tests": [],
    "total_estimated_cost_usd": 500,
    "total_duration_months": null,
    "content_status": "stub",
    "order": 2,
    "official_source_links": [],
    "egypt_specific_notes": "Typically requires Master's degree pathway alongside clinical appointment.",
    "visa_info": [],
    "expected_salary": {
      "min_annual": 5000,
      "max_annual": 20000,
      "currency": "USD",
      "notes": "Government ~$5K; private up to $20K"
    },
    "pass_rates": [],
    "competitiveness_rating": "medium",
    "language_course_required": false
  },
  {
    "name": "Stay-Egypt (Private Sector Practice)",
    "category": "doctor",
    "path_type": "career",
    "target_country": "Egypt",
    "description": "Private hospital or own clinic — income-driven career with less job security than government positions.",
    "required_exams": [],
    "required_language_tests": [],
    "total_estimated_cost_usd": 500,
    "total_duration_months": null,
    "content_status": "stub",
    "order": 3,
    "official_source_links": [],
    "egypt_specific_notes": "Requires Egyptian Medical Syndicate registration. Income varies significantly by specialty and location.",
    "visa_info": [],
    "expected_salary": {
      "min_annual": 5000,
      "max_annual": 20000,
      "currency": "USD",
      "notes": "Government ~$5K; private up to $20K"
    },
    "pass_rates": [],
    "competitiveness_rating": "medium",
    "language_course_required": false
  },
  {
    "name": "Stay-Egypt (Military/Police Medical Services)",
    "category": "doctor",
    "path_type": "career",
    "target_country": "Egypt",
    "description": "Armed forces or police medical corps track — distinct entry process, service commitment, and benefits.",
    "required_exams": [],
    "required_language_tests": [],
    "total_estimated_cost_usd": 500,
    "total_duration_months": null,
    "content_status": "stub",
    "order": 4,
    "official_source_links": [],
    "egypt_specific_notes": "Requires completion of military medical training program. Service commitment varies.",
    "visa_info": [],
    "expected_salary": {
      "min_annual": 5000,
      "max_annual": 20000,
      "currency": "USD",
      "notes": "Government ~$5K; private up to $20K"
    },
    "pass_rates": [],
    "competitiveness_rating": "medium",
    "language_course_required": false
  },
  {
    "name": "Stay-Egypt (Egyptian Fellowship — MOH Board)",
    "category": "doctor",
    "path_type": "training",
    "target_country": "Egypt",
    "description": "Egyptian Ministry of Health and Population fellowship (الزمالة المصرية) — the national specialist board certification, required for consultant posts in government hospitals.",
    "required_exams": [
      {
        "name": "Egyptian Fellowship Part 1 (Written)",
        "official_link": "https://www.mohp.gov.eg",
        "format": "written",
        "cost_usd": 300,
        "retake_policy": "Max 3 attempts per year, 3-month waiting period"
      },
      {
        "name": "Egyptian Fellowship Part 2 (Written)",
        "official_link": "https://www.mohp.gov.eg",
        "format": "written",
        "cost_usd": 400,
        "retake_policy": "Max 3 attempts per year"
      },
      {
        "name": "Egyptian Fellowship Part 2 (Clinical/OSCE)",
        "official_link": "https://www.mohp.gov.eg",
        "format": "practical",
        "cost_usd": 500,
        "retake_policy": "Max 3 attempts per year"
      }
    ],
    "required_language_tests": [],
    "total_estimated_cost_usd": 3000,
    "total_duration_months": 60,
    "content_status": "verified",
    "order": 5,
    "stages": [
      {
        "name": "Initial Training Year",
        "type": "training_post",
        "order": 1,
        "duration_months": 12,
        "description": "Rotating internship-style year covering major specialties before board entry.",
        "prerequisites": [
          "MBBS",
          "Egyptian Medical Syndicate registration"
        ]
      },
      {
        "name": "Junior Fellowship Training (Years 1-2)",
        "type": "training_post",
        "order": 2,
        "duration_months": 24,
        "description": "Core specialty rotations in university and MOH hospitals with logbook requirements.",
        "prerequisites": [
          "Initial Training Year completion"
        ]
      },
      {
        "name": "Fellowship Part 1 Exam",
        "type": "exam",
        "order": 3,
        "duration_months": 6,
        "description": "Written MCQ exam covering basic sciences and fundamentals of the chosen specialty.",
        "cost_usd": 300,
        "exams": [
          {
            "name": "EF Part 1",
            "format": "written",
            "cost_usd": 300,
            "official_link": "https://www.mohp.gov.eg"
          }
        ]
      },
      {
        "name": "Senior Fellowship Training (Years 3-4+)",
        "type": "training_post",
        "order": 4,
        "duration_months": 24,
        "description": "Advanced specialty training with increasing independence in patient management and procedures.",
        "prerequisites": [
          "Part 1 pass"
        ]
      },
      {
        "name": "Fellowship Part 2 Written Exam",
        "type": "exam",
        "order": 5,
        "duration_months": 6,
        "description": "Specialty-specific written exam covering advanced clinical knowledge and evidence-based practice.",
        "cost_usd": 400,
        "exams": [
          {
            "name": "EF Part 2 Written",
            "format": "written",
            "cost_usd": 400,
            "official_link": "https://www.mohp.gov.eg"
          }
        ]
      },
      {
        "name": "Fellowship Part 2 Clinical/OSCE",
        "type": "exam",
        "order": 6,
        "duration_months": 6,
        "description": "Practical exam including OSCE stations, case presentations, and viva voce.",
        "cost_usd": 500,
        "exams": [
          {
            "name": "EF Part 2 Clinical",
            "format": "practical",
            "cost_usd": 500,
            "official_link": "https://www.mohp.gov.eg"
          }
        ]
      },
      {
        "name": "Egyptian Fellowship Certificate",
        "type": "application",
        "order": 7,
        "description": "Award of the Egyptian Fellowship title — enables specialist registration with the MOH and consultant-level appointments.",
        "prerequisites": [
          "Training completion",
          "Part 1 + Part 2 pass",
          "Thesis/research requirement"
        ]
      }
    ],
    "official_source_links": [
      "https://www.mohp.gov.eg",
      "https://www.ems.org.eg"
    ],
    "egypt_specific_notes": "The Egyptian Fellowship (الزمالة المصرية) replaced the earlier Egyptian Board. Training is offered in all major specialties at MOH-accredited hospitals. Thesis submission is required for final certification.",
    "visa_info": [],
    "expected_salary": {
      "min_annual": 5000,
      "max_annual": 20000,
      "currency": "USD",
      "notes": "Government ~$5K; private up to $20K"
    },
    "pass_rates": [
      {
        "exam_name": "Egyptian Fellowship Part 1 (Written)",
        "pass_rate": 60,
        "source": "Estimated 2025"
      },
      {
        "exam_name": "Egyptian Fellowship Part 2 (Written)",
        "pass_rate": 60,
        "source": "Estimated 2025"
      },
      {
        "exam_name": "Egyptian Fellowship Part 2 (Clinical/OSCE)",
        "pass_rate": 48,
        "source": "NMC 2024"
      }
    ],
    "competitiveness_rating": "low",
    "language_course_required": false
  },
  {
    "name": "Stay-Egypt (Masters/MD University Track)",
    "category": "doctor",
    "path_type": "career",
    "target_country": "Egypt",
    "description": "Egyptian university-based postgraduate degrees — Master's (MSc) and Doctorate (MD) in clinical specialties, typically combined with hospital appointments.",
    "required_exams": [
      {
        "name": "MSc/MD Part 1 (Written)",
        "official_link": "https://www.cu.edu.eg",
        "format": "written",
        "cost_usd": 400,
        "retake_policy": "Max 4 attempts"
      },
      {
        "name": "MSc/MD Part 2 (Specialty Written)",
        "official_link": "https://www.cu.edu.eg",
        "format": "written",
        "cost_usd": 500,
        "retake_policy": "Max 4 attempts"
      }
    ],
    "required_language_tests": [
      {
        "language": "English",
        "test_name": "TOEFL-IBT or IELTS",
        "min_score": "TOEFL 70 / IELTS 5.5",
        "official_link": "https://www.ets.org"
      }
    ],
    "total_estimated_cost_usd": 5000,
    "total_duration_months": 48,
    "content_status": "verified",
    "order": 6,
    "stages": [
      {
        "name": "University Registration",
        "type": "application",
        "order": 1,
        "duration_months": 1,
        "description": "Enrolment in an Egyptian university postgraduate programme (MSc or MD track).",
        "prerequisites": [
          "MBBS",
          "Internship completion",
          "University admission approval"
        ]
      },
      {
        "name": "Coursework & Part 1 Exam",
        "type": "exam",
        "order": 2,
        "duration_months": 12,
        "description": "Taught modules in research methodology, statistics, and basic specialty sciences.",
        "cost_usd": 400
      },
      {
        "name": "Clinical Training & Thesis",
        "type": "training_post",
        "order": 3,
        "duration_months": 24,
        "description": "Hospital-based clinical training combined with thesis research under university supervision.",
        "prerequisites": [
          "Part 1 pass"
        ]
      },
      {
        "name": "Part 2 Exam & Thesis Defence",
        "type": "exam",
        "order": 4,
        "duration_months": 6,
        "description": "Specialty written exam, clinical exam, and oral thesis defence.",
        "cost_usd": 500
      },
      {
        "name": "Degree Conferred",
        "type": "application",
        "order": 5,
        "description": "MSc or MD degree awarded by the university.",
        "prerequisites": [
          "Part 2 pass",
          "Thesis acceptance"
        ]
      }
    ],
    "official_source_links": [
      "https://www.cu.edu.eg",
      "https://www.alexu.edu.eg"
    ],
    "egypt_specific_notes": "MSc (2-3 years) and MD (3-5 years) are offered by Egyptian universities. The MD is the higher degree equivalent to a doctorate. University appointments are often required for these tracks.",
    "visa_info": [],
    "expected_salary": {
      "min_annual": 5000,
      "max_annual": 20000,
      "currency": "USD",
      "notes": "Government ~$5K; private up to $20K"
    },
    "pass_rates": [
      {
        "exam_name": "MSc/MD Part 1 (Written)",
        "pass_rate": 60,
        "source": "Estimated 2025"
      },
      {
        "exam_name": "MSc/MD Part 2 (Specialty Written)",
        "pass_rate": 60,
        "source": "Estimated 2025"
      }
    ],
    "competitiveness_rating": "medium",
    "language_course_required": false
  },
  {
    "name": "Stay-Egypt (NGO/International Health In-Country)",
    "category": "doctor",
    "path_type": "career",
    "target_country": "Egypt",
    "description": "Working with international organizations operating inside Egypt — WHO country office, MSF missions, UNICEF health programs.",
    "required_exams": [],
    "required_language_tests": [],
    "total_estimated_cost_usd": 500,
    "total_duration_months": null,
    "content_status": "stub",
    "order": 7,
    "official_source_links": [],
    "egypt_specific_notes": "Usually requires MPH or relevant experience. Competitive, often contract-based.",
    "visa_info": [],
    "expected_salary": {
      "min_annual": 5000,
      "max_annual": 20000,
      "currency": "USD",
      "notes": "Government ~$5K; private up to $20K"
    },
    "pass_rates": [],
    "competitiveness_rating": "medium",
    "language_course_required": false
  },
  {
    "name": "Saudi Arabia — Prometric/SCFHS",
    "category": "doctor",
    "path_type": "migration",
    "target_country": "Saudi Arabia",
    "description": "Saudi Commission for Health Specialties (SCFHS) licensing via the Prometric exam — the main pathway for Egyptian doctors to work in Saudi Arabia.",
    "required_exams": [
      {
        "name": "Saudi Medical Licensing Exam (SMLE)",
        "official_link": "https://www.scfhs.org.sa",
        "format": "computer",
        "cost_usd": 400,
        "retake_policy": "Max 4 attempts per year"
      }
    ],
    "required_language_tests": [
      {
        "language": "English",
        "test_name": "IELTS",
        "min_score": "6.0",
        "official_link": "https://www.ielts.org"
      }
    ],
    "total_estimated_cost_usd": 2000,
    "total_duration_months": 12,
    "content_status": "verified",
    "order": 8,
    "official_source_links": [
      "https://www.scfhs.org.sa"
    ],
    "egypt_specific_notes": "Egyptian degrees are recognized by SCFHS. Dataflow verification required.",
    "visa_info": [
      {
        "visa_type": "Work Visa (SCFHS Classification)",
        "duration_years": 2,
        "processing_months": 4,
        "notes": "Dataflow verification + Prometric exam required. Sponsorship via MOH or private hospital."
      }
    ],
    "expected_salary": {
      "min_annual": 55000,
      "max_annual": 120000,
      "currency": "SAR",
      "notes": "Tax-free; housing/transport often included"
    },
    "pass_rates": [
      {
        "exam_name": "Saudi Medical Licensing Exam (SMLE)",
        "pass_rate": 55,
        "source": "SCFHS 2025 Estimate"
      }
    ],
    "competitiveness_rating": "low",
    "language_course_required": false
  },
  {
    "name": "UAE — DHA (Dubai)",
    "category": "doctor",
    "path_type": "migration",
    "target_country": "UAE",
    "description": "Dubai Health Authority licensing for medical practice in Dubai — growing hub with high demand for Egyptian specialists.",
    "required_exams": [
      {
        "name": "DHA Licensing Exam",
        "official_link": "https://www.dha.gov.ae",
        "format": "computer",
        "cost_usd": 400,
        "retake_policy": "Max 4 attempts per year"
      },
      {
        "name": "DHA Dataflow PSV",
        "official_link": "https://www.dha.gov.ae",
        "format": "online",
        "cost_usd": 300,
        "retake_policy": "Per submission"
      }
    ],
    "required_language_tests": [
      {
        "language": "English",
        "test_name": "IELTS",
        "min_score": "6.0",
        "official_link": "https://www.ielts.org"
      }
    ],
    "total_estimated_cost_usd": 2500,
    "total_duration_months": 12,
    "content_status": "verified",
    "order": 9,
    "official_source_links": [
      "https://www.dha.gov.ae"
    ],
    "egypt_specific_notes": "Primary Source Verification (PSV) required through Dataflow. DHA exam is computer-based, specialty-specific.",
    "visa_info": [
      {
        "visa_type": "Employment Visa (DHA/DoH/MOHAP)",
        "duration_years": 2,
        "processing_months": 3,
        "notes": "Dubai — DHA, Abu Dhabi — DoH, Other — MOHAP"
      }
    ],
    "expected_salary": {
      "min_annual": 180000,
      "max_annual": 480000,
      "currency": "AED",
      "notes": "Tax-free"
    },
    "pass_rates": [
      {
        "exam_name": "DHA Licensing Exam",
        "pass_rate": 60,
        "source": "DHA 2025 Estimate"
      },
      {
        "exam_name": "DHA Dataflow PSV",
        "pass_rate": 60,
        "source": "DHA 2025 Estimate"
      }
    ],
    "competitiveness_rating": "high",
    "language_course_required": false
  },
  {
    "name": "UAE — DoH (Abu Dhabi)",
    "category": "doctor",
    "path_type": "migration",
    "target_country": "UAE",
    "description": "Department of Health Abu Dhabi licensing for practice in Abu Dhabi and the Northern Emirates — formerly HAAD.",
    "required_exams": [
      {
        "name": "DoH PQR (Physician Qualification Requirement)",
        "official_link": "https://www.doh.gov.ae",
        "format": "computer",
        "cost_usd": 400,
        "retake_policy": "Max 4 attempts per year"
      },
      {
        "name": "DoH Dataflow PSV",
        "official_link": "https://www.doh.gov.ae",
        "format": "online",
        "cost_usd": 300,
        "retake_policy": "Per submission"
      }
    ],
    "required_language_tests": [
      {
        "language": "English",
        "test_name": "IELTS",
        "min_score": "6.0",
        "official_link": "https://www.ielts.org"
      }
    ],
    "total_estimated_cost_usd": 2500,
    "total_duration_months": 12,
    "content_status": "verified",
    "order": 10,
    "official_source_links": [
      "https://www.doh.gov.ae"
    ],
    "egypt_specific_notes": "Similar PSV Dataflow process. PQR exam covers clinical knowledge and local regulations. Growing demand for specialists in Abu Dhabi.",
    "visa_info": [
      {
        "visa_type": "Employment Visa (DHA/DoH/MOHAP)",
        "duration_years": 2,
        "processing_months": 3,
        "notes": "Dubai — DHA, Abu Dhabi — DoH, Other — MOHAP"
      }
    ],
    "expected_salary": {
      "min_annual": 180000,
      "max_annual": 480000,
      "currency": "AED",
      "notes": "Tax-free"
    },
    "pass_rates": [
      {
        "exam_name": "DoH PQR (Physician Qualification Requirement)",
        "pass_rate": 62,
        "source": "DoH 2025 Estimate"
      },
      {
        "exam_name": "DoH Dataflow PSV",
        "pass_rate": 62,
        "source": "DoH 2025 Estimate"
      }
    ],
    "competitiveness_rating": "high",
    "language_course_required": false
  },
  {
    "name": "Qatar — QCHP",
    "category": "doctor",
    "path_type": "migration",
    "target_country": "Qatar",
    "description": "Qatar Council for Healthcare Practitioners licensing — growing healthcare sector with World Cup legacy infrastructure.",
    "required_exams": [
      {
        "name": "QCHP Prometric Exam",
        "official_link": "https://www.qchp.org.qa",
        "format": "computer",
        "cost_usd": 350,
        "retake_policy": "Max 4 attempts per year"
      },
      {
        "name": "QCHP Dataflow PSV",
        "official_link": "https://www.qchp.org.qa",
        "format": "online",
        "cost_usd": 300,
        "retake_policy": "Per submission"
      }
    ],
    "required_language_tests": [
      {
        "language": "English",
        "test_name": "IELTS",
        "min_score": "6.0",
        "official_link": "https://www.ielts.org"
      }
    ],
    "total_estimated_cost_usd": 2500,
    "total_duration_months": 12,
    "content_status": "verified",
    "order": 11,
    "official_source_links": [
      "https://www.qchp.org.qa"
    ],
    "egypt_specific_notes": "Prometric-based exam with dataflow verification. Growing demand post-World Cup for all specialties.",
    "visa_info": [
      {
        "visa_type": "Work Visa (QCHP Licensing)",
        "duration_years": 2,
        "processing_months": 3,
        "notes": "Dataflow verification + Prometric exam required"
      }
    ],
    "expected_salary": {
      "min_annual": 180000,
      "max_annual": 450000,
      "currency": "QAR"
    },
    "pass_rates": [
      {
        "exam_name": "QCHP Prometric Exam",
        "pass_rate": 55,
        "source": "GCC Estimate 2025"
      },
      {
        "exam_name": "QCHP Dataflow PSV",
        "pass_rate": 58,
        "source": "QCHP 2025 Estimate"
      }
    ],
    "competitiveness_rating": "low",
    "language_course_required": false
  },
  {
    "name": "Kuwait — MOH Licensing",
    "category": "doctor",
    "path_type": "migration",
    "target_country": "Kuwait",
    "description": "Kuwait Ministry of Health licensing for medical practice — established destination for Egyptian doctors.",
    "required_exams": [
      {
        "name": "Kuwait MOH Written Exam",
        "official_link": "https://www.moh.gov.kw",
        "format": "written",
        "cost_usd": 300,
        "retake_policy": "Max 3 attempts per year"
      },
      {
        "name": "Credential Verification",
        "official_link": "https://www.moh.gov.kw",
        "format": "online",
        "cost_usd": 200,
        "retake_policy": "Per submission"
      }
    ],
    "required_language_tests": [
      {
        "language": "English",
        "test_name": "IELTS",
        "min_score": "6.0",
        "official_link": "https://www.ielts.org"
      }
    ],
    "total_estimated_cost_usd": 2000,
    "total_duration_months": 12,
    "content_status": "verified",
    "order": 12,
    "official_source_links": [
      "https://www.moh.gov.kw"
    ],
    "egypt_specific_notes": "Requires credential verification and Kuwait MOH written exam for most specialties. Egyptian degrees well-recognized.",
    "visa_info": [
      {
        "visa_type": "Work Visa (MOH Licensing)",
        "duration_years": 2,
        "processing_months": 4,
        "notes": "Dataflow verification + Prometric exam required"
      }
    ],
    "expected_salary": {
      "min_annual": 20000,
      "max_annual": 55000,
      "currency": "KWD"
    },
    "pass_rates": [
      {
        "exam_name": "Kuwait MOH Written Exam",
        "pass_rate": 60,
        "source": "Estimated 2025"
      },
      {
        "exam_name": "Credential Verification",
        "pass_rate": 60,
        "source": "Estimated 2025"
      }
    ],
    "competitiveness_rating": "low",
    "language_course_required": false
  },
  {
    "name": "Bahrain — NHRA",
    "category": "doctor",
    "path_type": "migration",
    "target_country": "Bahrain",
    "description": "National Health Regulatory Authority licensing for medical practice in Bahrain.",
    "required_exams": [
      {
        "name": "NHRA Licensing Exam",
        "official_link": "https://www.nhra.bh",
        "format": "computer",
        "cost_usd": 300,
        "retake_policy": "Max 3 attempts per year"
      }
    ],
    "required_language_tests": [
      {
        "language": "English",
        "test_name": "IELTS",
        "min_score": "6.0",
        "official_link": "https://www.ielts.org"
      }
    ],
    "total_estimated_cost_usd": 1800,
    "total_duration_months": 9,
    "content_status": "verified",
    "order": 13,
    "official_source_links": [
      "https://www.nhra.bh"
    ],
    "egypt_specific_notes": "Smaller job market but faster processing times than Saudi/UAE.",
    "visa_info": [
      {
        "visa_type": "Work Visa (NHRA Licensing)",
        "duration_years": 2,
        "processing_months": 3,
        "notes": "Dataflow verification + Prometric exam"
      }
    ],
    "expected_salary": {
      "min_annual": 25000,
      "max_annual": 55000,
      "currency": "BHD"
    },
    "pass_rates": [
      {
        "exam_name": "NHRA Licensing Exam",
        "pass_rate": 60,
        "source": "Estimated 2025"
      }
    ],
    "competitiveness_rating": "low",
    "language_course_required": false
  },
  {
    "name": "Oman — MOH Licensing",
    "category": "doctor",
    "path_type": "migration",
    "target_country": "Oman",
    "description": "Oman Ministry of Health licensing — emerging destination with growing healthcare investment.",
    "required_exams": [
      {
        "name": "Oman MOH Prometric Exam",
        "official_link": "https://www.moh.gov.om",
        "format": "computer",
        "cost_usd": 300,
        "retake_policy": "Max 3 attempts per year"
      },
      {
        "name": "Oman MOH Credentialing",
        "official_link": "https://www.moh.gov.om",
        "format": "online",
        "cost_usd": 200,
        "retake_policy": "Per submission"
      }
    ],
    "required_language_tests": [
      {
        "language": "English",
        "test_name": "IELTS",
        "min_score": "6.0",
        "official_link": "https://www.ielts.org"
      }
    ],
    "total_estimated_cost_usd": 2000,
    "total_duration_months": 12,
    "content_status": "verified",
    "order": 14,
    "official_source_links": [
      "https://www.moh.gov.om"
    ],
    "egypt_specific_notes": "Prometric exam typically required. Growing demand for specialists in Oman's expanding healthcare system.",
    "visa_info": [
      {
        "visa_type": "Work Visa (MOH Licensing)",
        "duration_years": 2,
        "processing_months": 3,
        "notes": "Dataflow verification + Prometric exam"
      }
    ],
    "expected_salary": {
      "min_annual": 28000,
      "max_annual": 55000,
      "currency": "OMR"
    },
    "pass_rates": [
      {
        "exam_name": "Oman MOH Prometric Exam",
        "pass_rate": 55,
        "source": "GCC Estimate 2025"
      },
      {
        "exam_name": "Oman MOH Credentialing",
        "pass_rate": 60,
        "source": "Estimated 2025"
      }
    ],
    "competitiveness_rating": "low",
    "language_course_required": false
  },
  {
    "name": "UK — PLAB",
    "category": "doctor",
    "path_type": "migration",
    "target_country": "United Kingdom",
    "description": "UK medical licensing via PLAB 1 and PLAB 2, then GMC registration — the most popular European route for Egyptian graduates.",
    "required_exams": [
      {
        "name": "PLAB 1",
        "official_link": "https://www.gmc-uk.org",
        "format": "computer",
        "cost_usd": 300,
        "retake_policy": "Max 4 attempts"
      },
      {
        "name": "PLAB 2",
        "official_link": "https://www.gmc-uk.org",
        "format": "practical",
        "cost_usd": 1000,
        "retake_policy": "Max 4 attempts"
      }
    ],
    "required_language_tests": [
      {
        "language": "English",
        "test_name": "IELTS",
        "min_score": "7.5",
        "official_link": "https://www.ielts.org"
      },
      {
        "language": "English",
        "test_name": "OET Medicine",
        "min_score": "B",
        "official_link": "https://www.oet.com"
      }
    ],
    "total_estimated_cost_usd": 4000,
    "total_duration_months": 18,
    "content_status": "verified",
    "order": 15,
    "official_source_links": [
      "https://www.gmc-uk.org"
    ],
    "egypt_specific_notes": "Egyptian MBBS recognized by GMC. Foundation year 2 (FY2) equivalence often required.",
    "visa_info": [
      {
        "visa_type": "Health and Care Worker visa (Tier 2)",
        "duration_years": 5,
        "processing_months": 3,
        "notes": "Shortage occupation — expedited processing, reduced fees"
      }
    ],
    "expected_salary": {
      "min_annual": 65000,
      "max_annual": 120000,
      "currency": "GBP",
      "notes": "NHS Consultant £105K+; locum rates potentially higher"
    },
    "pass_rates": [
      {
        "exam_name": "PLAB 1",
        "pass_rate": 42,
        "source": "UK GLA 2024"
      },
      {
        "exam_name": "PLAB 2",
        "pass_rate": 42,
        "source": "UK GLA 2024"
      }
    ],
    "competitiveness_rating": "low",
    "language_course_required": false
  },
  {
    "name": "Ireland — IMC Registration",
    "category": "doctor",
    "path_type": "migration",
    "target_country": "Ireland",
    "description": "Irish Medical Council registration via Certificate of Experience — growing destination with strong Egyptian doctor community.",
    "required_exams": [
      {
        "name": "IMC Certificate of Experience",
        "official_link": "https://www.medicalcouncil.ie",
        "format": "portfolio",
        "cost_usd": 500,
        "retake_policy": "Max 3 attempts"
      },
      {
        "name": "PRES (Pre-Registration Exam System)",
        "official_link": "https://www.medicalcouncil.ie",
        "format": "computer",
        "cost_usd": 400,
        "retake_policy": "Max 4 attempts"
      }
    ],
    "required_language_tests": [
      {
        "language": "English",
        "test_name": "IELTS",
        "min_score": "7.0",
        "official_link": "https://www.ielts.org"
      }
    ],
    "total_estimated_cost_usd": 3500,
    "total_duration_months": 18,
    "content_status": "verified",
    "order": 16,
    "official_source_links": [
      "https://www.medicalcouncil.ie"
    ],
    "egypt_specific_notes": "English-friendly. EU/EEA exemption issues affect non-EU graduates. PRES exam required for non-EU applicants.",
    "visa_info": [
      {
        "visa_type": "Critical Skills Employment Permit",
        "duration_years": 2,
        "processing_months": 4,
        "notes": "Most medical roles on Critical Skills list"
      }
    ],
    "expected_salary": {
      "min_annual": 75000,
      "max_annual": 140000,
      "currency": "EUR",
      "notes": "Consultant €105K+"
    },
    "pass_rates": [
      {
        "exam_name": "IMC Certificate of Experience",
        "pass_rate": 60,
        "source": "Estimated 2025"
      },
      {
        "exam_name": "PRES (Pre-Registration Exam System)",
        "pass_rate": 60,
        "source": "Estimated 2025"
      }
    ],
    "competitiveness_rating": "medium",
    "language_course_required": false
  },
  {
    "name": "Germany — Approbation",
    "category": "doctor",
    "path_type": "migration",
    "target_country": "Germany",
    "description": "German medical licensing (Approbation) — requires German B2/C1 proficiency, growing demand for international doctors.",
    "required_exams": [
      {
        "name": "German Medical Knowledge Exam (Kenntnisprüfung)",
        "official_link": "https://www.bundesaerztekammer.de",
        "format": "written+practical",
        "cost_usd": 500,
        "retake_policy": "Max 3 attempts"
      },
      {
        "name": "Goethe-Institut German B2/C1",
        "official_link": "https://www.goethe.de",
        "format": "written+oral",
        "cost_usd": 300,
        "retake_policy": "Unlimited"
      },
      {
        "name": "EQF Diploma Verification",
        "official_link": "https://www.anabin.de",
        "format": "online",
        "cost_usd": 200,
        "retake_policy": "Per submission"
      }
    ],
    "required_language_tests": [
      {
        "language": "German",
        "test_name": "Goethe-Zertifikat",
        "min_score": "B2 (C1 recommended)",
        "official_link": "https://www.goethe.de"
      }
    ],
    "total_estimated_cost_usd": 4000,
    "total_duration_months": 24,
    "content_status": "verified",
    "order": 17,
    "official_source_links": [
      "https://www.bundesaerztekammer.de",
      "https://www.anabin.de"
    ],
    "egypt_specific_notes": "Language-gated (German B2/C1 required). EQF level verification and knowledge exam (Kenntnisprüfung) usually needed. Growing recruitment from Egypt.",
    "visa_info": [
      {
        "visa_type": "EU Blue Card / §18b AufenthG",
        "duration_years": 4,
        "processing_months": 4,
        "notes": "Recognition of qualifications (Anerkennung) required first"
      }
    ],
    "expected_salary": {
      "min_annual": 70000,
      "max_annual": 150000,
      "currency": "EUR",
      "notes": "Facharzt ~€85K; Oberarzt €120K+"
    },
    "pass_rates": [
      {
        "exam_name": "German Medical Knowledge Exam (Kenntnisprüfung)",
        "pass_rate": 55,
        "source": "Estimated 2025"
      },
      {
        "exam_name": "Goethe-Institut German B2/C1",
        "pass_rate": 78,
        "source": "OET 2024"
      },
      {
        "exam_name": "EQF Diploma Verification",
        "pass_rate": 60,
        "source": "Estimated 2025"
      }
    ],
    "competitiveness_rating": "high",
    "language_course_required": true,
    "language_course_cost_usd": 3000,
    "language_course_duration_months": 6
  },
  {
    "name": "Malta — Medical Council Registration",
    "category": "doctor",
    "path_type": "migration",
    "target_country": "Malta",
    "description": "Maltese medical licensing — smaller market with English-friendly environment and growing Egyptian presence.",
    "required_exams": [
      {
        "name": "MCC Verification & Assessment",
        "official_link": "https://www.medicalcouncilmalta.org",
        "format": "portfolio",
        "cost_usd": 300,
        "retake_policy": "Per submission"
      }
    ],
    "required_language_tests": [
      {
        "language": "English",
        "test_name": "IELTS",
        "min_score": "7.0",
        "official_link": "https://www.ielts.org"
      }
    ],
    "total_estimated_cost_usd": 2000,
    "total_duration_months": 9,
    "content_status": "verified",
    "order": 18,
    "official_source_links": [
      "https://www.medicalcouncilmalta.org"
    ],
    "egypt_specific_notes": "English is an official language. Generally faster process than UK/Germany.",
    "visa_info": [
      {
        "visa_type": "Single Permit / Key Employee Initiative",
        "duration_years": 1,
        "processing_months": 3,
        "notes": "Key Employee Initiative for specialist roles"
      }
    ],
    "expected_salary": {
      "min_annual": 50000,
      "max_annual": 90000,
      "currency": "EUR"
    },
    "pass_rates": [
      {
        "exam_name": "MCC Verification & Assessment",
        "pass_rate": 60,
        "source": "Estimated 2025"
      }
    ],
    "competitiveness_rating": "low",
    "language_course_required": false
  },
  {
    "name": "USA — USMLE",
    "category": "doctor",
    "path_type": "migration",
    "target_country": "USA",
    "description": "US medical licensing via USMLE Steps 1-3, plus ECFMG certification for IMGs — highest-stakes, highest-reward pathway.",
    "required_exams": [
      {
        "name": "USMLE Step 1",
        "official_link": "https://www.usmle.org",
        "format": "computer",
        "cost_usd": 1000,
        "retake_policy": "Max 3 attempts per year"
      },
      {
        "name": "USMLE Step 2 CK",
        "official_link": "https://www.usmle.org",
        "format": "computer",
        "cost_usd": 1000,
        "retake_policy": "Max 3 attempts per year"
      },
      {
        "name": "USMLE Step 3",
        "official_link": "https://www.usmle.org",
        "format": "computer",
        "cost_usd": 900,
        "retake_policy": "Max 3 attempts per year"
      }
    ],
    "required_language_tests": [
      {
        "language": "English",
        "test_name": "OET Medicine",
        "min_score": "350",
        "official_link": "https://www.oet.com"
      }
    ],
    "total_estimated_cost_usd": 8000,
    "total_duration_months": 36,
    "content_status": "verified",
    "order": 19,
    "official_source_links": [
      "https://www.usmle.org",
      "https://www.ecfmg.org"
    ],
    "egypt_specific_notes": "MBBS must be verified by ECFMG before Step 1. Egyptian graduates have high match rates in Internal Medicine and Pediatrics.",
    "visa_info": [
      {
        "visa_type": "H-1B / J-1 Exchange Visitor",
        "duration_years": 3,
        "processing_months": 6,
        "notes": "J-1 requires 2-year home-country rule. H-1B subject to annual cap"
      }
    ],
    "expected_salary": {
      "min_annual": 180000,
      "max_annual": 450000,
      "currency": "USD",
      "notes": "Primary care ~$200K; surgical ~$400K+"
    },
    "pass_rates": [
      {
        "exam_name": "USMLE Step 1",
        "pass_rate": 55,
        "source": "SCFHS 2025 Estimate"
      },
      {
        "exam_name": "USMLE Step 2 CK",
        "pass_rate": 55,
        "source": "SCFHS 2025 Estimate"
      },
      {
        "exam_name": "USMLE Step 3",
        "pass_rate": 55,
        "source": "SCFHS 2025 Estimate"
      }
    ],
    "competitiveness_rating": "high",
    "language_course_required": false
  },
  {
    "name": "Canada — NAC/MCCQE",
    "category": "doctor",
    "path_type": "migration",
    "target_country": "Canada",
    "description": "Canadian medical licensing via NAC-OSCE and MCCQE Part I — competitive but growing pathway for IMGs.",
    "required_exams": [
      {
        "name": "MCCQE Part I",
        "official_link": "https://www.mcc.ca",
        "format": "computer",
        "cost_usd": 1200,
        "retake_policy": "Max 4 attempts"
      },
      {
        "name": "NAC-OSCE",
        "official_link": "https://www.mcc.ca",
        "format": "practical",
        "cost_usd": 3000,
        "retake_policy": "Max 3 attempts"
      }
    ],
    "required_language_tests": [
      {
        "language": "English",
        "test_name": "IELTS",
        "min_score": "7.5",
        "official_link": "https://www.ielts.org"
      }
    ],
    "total_estimated_cost_usd": 7000,
    "total_duration_months": 24,
    "content_status": "verified",
    "order": 20,
    "official_source_links": [
      "https://www.mcc.ca"
    ],
    "egypt_specific_notes": "Requires MCCQE Part I and NAC-OSCE. Practice-ready assessment programs available in some provinces (e.g., Ontario, Alberta).",
    "visa_info": [
      {
        "visa_type": "Express Entry / PNP Healthcare Stream",
        "duration_years": 3,
        "processing_months": 8,
        "notes": "Provincial healthcare nominee streams expedite processing"
      }
    ],
    "expected_salary": {
      "min_annual": 150000,
      "max_annual": 350000,
      "currency": "CAD",
      "notes": "Fee-for-service varies by province"
    },
    "pass_rates": [
      {
        "exam_name": "MCCQE Part I",
        "pass_rate": 68,
        "source": "MCC 2024"
      },
      {
        "exam_name": "NAC-OSCE",
        "pass_rate": 72,
        "source": "MCC 2024"
      }
    ],
    "competitiveness_rating": "high",
    "language_course_required": false
  },
  {
    "name": "Australia — AMC",
    "category": "doctor",
    "path_type": "migration",
    "target_country": "Australia",
    "description": "Australian Medical Council exams (AMC MCQ + clinical) — well-established route with strong job market for specialists.",
    "required_exams": [
      {
        "name": "AMC MCQ (CAT MCQ)",
        "official_link": "https://www.amc.org.au",
        "format": "computer",
        "cost_usd": 800,
        "retake_policy": "Max 3 attempts per year"
      },
      {
        "name": "AMC Clinical (OSCE)",
        "official_link": "https://www.amc.org.au",
        "format": "practical",
        "cost_usd": 2500,
        "retake_policy": "Max 3 attempts per year"
      }
    ],
    "required_language_tests": [
      {
        "language": "English",
        "test_name": "IELTS Academic",
        "min_score": "7.0",
        "official_link": "https://www.ielts.org"
      }
    ],
    "total_estimated_cost_usd": 6000,
    "total_duration_months": 24,
    "content_status": "verified",
    "order": 21,
    "official_source_links": [
      "https://www.amc.org.au"
    ],
    "egypt_specific_notes": "Competency Authority Pathway available for specialists with comparable training. Growing demand for doctors in rural and regional Australia.",
    "visa_info": [
      {
        "visa_type": "TSS 482 / Permanent 186 (DE)",
        "duration_years": 4,
        "processing_months": 5,
        "notes": "AMC assessment + AHPRA registration required"
      }
    ],
    "expected_salary": {
      "min_annual": 150000,
      "max_annual": 350000,
      "currency": "AUD"
    },
    "pass_rates": [
      {
        "exam_name": "AMC MCQ (CAT MCQ)",
        "pass_rate": 65,
        "source": "AMC 2024"
      },
      {
        "exam_name": "AMC Clinical (OSCE)",
        "pass_rate": 65,
        "source": "AMC 2024"
      }
    ],
    "competitiveness_rating": "high",
    "language_course_required": false
  },
  {
    "name": "New Zealand — NZREX",
    "category": "doctor",
    "path_type": "migration",
    "target_country": "New Zealand",
    "description": "New Zealand Registration Exam (NZREX) for IMGs — smaller market but streamlined pathway.",
    "required_exams": [
      {
        "name": "NZREX Clinical",
        "official_link": "https://www.mcnz.org.nz",
        "format": "practical",
        "cost_usd": 2500,
        "retake_policy": "Max 3 attempts"
      }
    ],
    "required_language_tests": [
      {
        "language": "English",
        "test_name": "IELTS Academic",
        "min_score": "7.5",
        "official_link": "https://www.ielts.org"
      }
    ],
    "total_estimated_cost_usd": 5000,
    "total_duration_months": 18,
    "content_status": "verified",
    "order": 22,
    "official_source_links": [
      "https://www.mcnz.org.nz"
    ],
    "egypt_specific_notes": "NZREX Clinical exam required. Competent Authority pathway available for some qualifications from recognised jurisdictions.",
    "visa_info": [
      {
        "visa_type": "Straight to Residence Visa",
        "duration_years": 3,
        "processing_months": 4,
        "notes": "MCNZ registration via RMO or specialist pathway"
      }
    ],
    "expected_salary": {
      "min_annual": 140000,
      "max_annual": 300000,
      "currency": "NZD"
    },
    "pass_rates": [
      {
        "exam_name": "NZREX Clinical",
        "pass_rate": 55,
        "source": "MCNZ 2024"
      }
    ],
    "competitiveness_rating": "medium",
    "language_course_required": false
  },
  {
    "name": "International Organization Track (WHO/UN)",
    "category": "doctor",
    "path_type": "migration",
    "target_country": "Global/Multiple",
    "description": "Public health and policy roles with WHO, UNICEF, UNFPA, and other UN agencies — usually requires MPH or global health experience.",
    "required_exams": [],
    "required_language_tests": [],
    "total_estimated_cost_usd": 500,
    "total_duration_months": null,
    "content_status": "stub",
    "order": 23,
    "official_source_links": [
      "https://www.who.int/careers"
    ],
    "egypt_specific_notes": "Not exam-gated. Requires MPH, relevant experience, and UN language proficiency.",
    "visa_info": [],
    "pass_rates": [],
    "competitiveness_rating": "low",
    "language_course_required": false
  },
  {
    "name": "Humanitarian Field Track (MSF, IRC, Red Cross)",
    "category": "doctor",
    "path_type": "migration",
    "target_country": "Global/Multiple",
    "description": "Field medical roles in humanitarian response — crisis medicine, emergency surgery, and public health in conflict/disaster zones.",
    "required_exams": [],
    "required_language_tests": [],
    "total_estimated_cost_usd": 500,
    "total_duration_months": null,
    "content_status": "stub",
    "order": 24,
    "official_source_links": [
      "https://www.msf.org/work-msf"
    ],
    "egypt_specific_notes": "Requires clinical experience, language skills (French/Arabic valuable), and willingness to work in insecure environments.",
    "visa_info": [],
    "pass_rates": [],
    "competitiveness_rating": "low",
    "language_course_required": false
  },
  {
    "name": "Global Health Research Track",
    "category": "doctor",
    "path_type": "migration",
    "target_country": "Global/Multiple",
    "description": "Research positions with international universities and institutes — publication-driven, often PhD or MPH pathway.",
    "required_exams": [],
    "required_language_tests": [],
    "total_estimated_cost_usd": 500,
    "total_duration_months": null,
    "content_status": "stub",
    "order": 25,
    "official_source_links": [],
    "egypt_specific_notes": "Research experience and publications are key. Often requires MPH, MSc, or PhD.",
    "visa_info": [],
    "pass_rates": [],
    "competitiveness_rating": "low",
    "language_course_required": false
  },
  {
    "name": "Health-Tech / Digital Health Industry Track",
    "category": "doctor",
    "path_type": "migration",
    "target_country": "Global/Multiple",
    "description": "Clinical roles inside health-tech companies — telemedicine platforms, health AI, clinical decision support — growing alternative to classic migration.",
    "required_exams": [],
    "required_language_tests": [],
    "total_estimated_cost_usd": 500,
    "total_duration_months": null,
    "content_status": "stub",
    "order": 26,
    "official_source_links": [],
    "egypt_specific_notes": "Remote-friendly. Clinical experience valued. Product management or informatics skills advantageous.",
    "visa_info": [],
    "pass_rates": [],
    "competitiveness_rating": "low",
    "language_course_required": false
  },
  {
    "name": "Pharmaceutical / Clinical Research Industry Track",
    "category": "doctor",
    "path_type": "migration",
    "target_country": "Global/Multiple",
    "description": "Medical affairs, clinical research associate, or pharmacovigilance roles with multinational pharma — often Egypt/Gulf-based.",
    "required_exams": [],
    "required_language_tests": [],
    "total_estimated_cost_usd": 500,
    "total_duration_months": null,
    "content_status": "stub",
    "order": 27,
    "official_source_links": [],
    "egypt_specific_notes": "Egypt and UAE are regional hubs for pharma companies. Clinical research experience and GCP certification valuable.",
    "visa_info": [],
    "pass_rates": [],
    "competitiveness_rating": "low",
    "language_course_required": false
  },
  {
    "name": "France — ECN/CAES",
    "category": "doctor",
    "path_type": "migration",
    "target_country": "France",
    "description": "French medical licensing via ECN (Épreuves Classantes Nationales) or CAES for IMGs — requires French B2/C1 and diploma equivalence.",
    "required_exams": [
      {
        "name": "CAES (Concours d'Accès aux Études de Santé) pour IMG",
        "official_link": "https://www.enseignementsup-recherche.gouv.fr",
        "format": "written",
        "cost_usd": 400,
        "retake_policy": "Max 2 attempts"
      },
      {
        "name": "Diploma Equivalence (DEM)",
        "official_link": "https://www.conseil-national.medecin.fr",
        "format": "portfolio",
        "cost_usd": 300,
        "retake_policy": "Per submission"
      }
    ],
    "required_language_tests": [
      {
        "language": "French",
        "test_name": "TCF / DELF",
        "min_score": "B2 (C1 recommended)",
        "official_link": "https://www.ciep.fr"
      }
    ],
    "total_estimated_cost_usd": 3500,
    "total_duration_months": 24,
    "content_status": "verified",
    "order": 28,
    "official_source_links": [
      "https://www.enseignementsup-recherche.gouv.fr"
    ],
    "egypt_specific_notes": "French language essential (B2 minimum, C1 strongly recommended). Growing Egyptian community in French hospitals.",
    "visa_info": [
      {
        "visa_type": "Talent Passport – EU Blue Card",
        "duration_years": 4,
        "processing_months": 3,
        "notes": "Autorisation d'exercice from Ordre des Médecins required"
      }
    ],
    "expected_salary": {
      "min_annual": 60000,
      "max_annual": 130000,
      "currency": "EUR",
      "notes": "PH €70K+"
    },
    "pass_rates": [
      {
        "exam_name": "CAES (Concours d'Accès aux Études de Santé) pour IMG",
        "pass_rate": 60,
        "source": "Estimated 2025"
      },
      {
        "exam_name": "Diploma Equivalence (DEM)",
        "pass_rate": 60,
        "source": "Estimated 2025"
      }
    ],
    "competitiveness_rating": "medium",
    "language_course_required": true,
    "language_course_cost_usd": 2500,
    "language_course_duration_months": 6
  },
  {
    "name": "Netherlands — BIG-register",
    "category": "doctor",
    "path_type": "migration",
    "target_country": "Netherlands",
    "description": "Dutch medical licensing via the BIG register — requires language exam and competency assessment.",
    "required_exams": [
      {
        "name": "BIG Competency Assessment",
        "official_link": "https://www.bigregister.nl",
        "format": "portfolio",
        "cost_usd": 500,
        "retake_policy": "Per submission"
      },
      {
        "name": "Dutch Medical Knowledge Exam",
        "official_link": "https://www.bigregister.nl",
        "format": "computer",
        "cost_usd": 400,
        "retake_policy": "Max 3 attempts"
      }
    ],
    "required_language_tests": [
      {
        "language": "Dutch",
        "test_name": "NT2 (Nederlands als Tweede Taal)",
        "min_score": "B2",
        "official_link": "https://www.nt2.nl"
      }
    ],
    "total_estimated_cost_usd": 4000,
    "total_duration_months": 24,
    "content_status": "verified",
    "order": 29,
    "official_source_links": [
      "https://www.bigregister.nl"
    ],
    "egypt_specific_notes": "Language-gated (Dutch B2 required). Growing recruitment of international doctors.",
    "visa_info": [
      {
        "visa_type": "Highly Skilled Migrant Permit",
        "duration_years": 5,
        "processing_months": 3,
        "notes": "BIG registration from CIBG required prior to work"
      }
    ],
    "expected_salary": {
      "min_annual": 75000,
      "max_annual": 160000,
      "currency": "EUR",
      "notes": "Medisch specialist >€100K"
    },
    "pass_rates": [
      {
        "exam_name": "BIG Competency Assessment",
        "pass_rate": 60,
        "source": "Estimated 2025"
      },
      {
        "exam_name": "Dutch Medical Knowledge Exam",
        "pass_rate": 60,
        "source": "Estimated 2025"
      }
    ],
    "competitiveness_rating": "high",
    "language_course_required": true,
    "language_course_cost_usd": 2800,
    "language_course_duration_months": 5
  },
  {
    "name": "Sweden — Socialstyrelsen Licensing",
    "category": "doctor",
    "path_type": "migration",
    "target_country": "Sweden",
    "description": "Swedish medical licensing via the National Board of Health and Welfare (Socialstyrelsen) — knowledge exam, clinical training, and Swedish proficiency.",
    "required_exams": [
      {
        "name": "Swedish Medical Knowledge Exam (Provet)",
        "official_link": "https://www.socialstyrelsen.se",
        "format": "computer",
        "cost_usd": 600,
        "retake_policy": "Max 3 attempts"
      },
      {
        "name": "Clinical Training Assessment (BT)",
        "official_link": "https://www.socialstyrelsen.se",
        "format": "practical",
        "cost_usd": 0,
        "retake_policy": "Per enrolment"
      }
    ],
    "required_language_tests": [
      {
        "language": "Swedish",
        "test_name": "TISUS / Swedex",
        "min_score": "C1",
        "official_link": "https://www.uis.se"
      }
    ],
    "total_estimated_cost_usd": 3000,
    "total_duration_months": 36,
    "content_status": "verified",
    "order": 30,
    "official_source_links": [
      "https://www.socialstyrelsen.se"
    ],
    "egypt_specific_notes": "Swedish C1 required. The process includes a knowledge exam, supervised clinical training (BT), and a practical assessment.",
    "visa_info": [
      {
        "visa_type": "Work Permit for Specialists",
        "duration_years": 2,
        "processing_months": 4,
        "notes": "Socialstyrelsen licensing (legitimation) required"
      }
    ],
    "expected_salary": {
      "min_annual": 650000,
      "max_annual": 1200000,
      "currency": "SEK",
      "notes": "Specialistläkare"
    },
    "pass_rates": [
      {
        "exam_name": "Swedish Medical Knowledge Exam (Provet)",
        "pass_rate": 60,
        "source": "Estimated 2025"
      },
      {
        "exam_name": "Clinical Training Assessment (BT)",
        "pass_rate": 60,
        "source": "Estimated 2025"
      }
    ],
    "competitiveness_rating": "medium",
    "language_course_required": true,
    "language_course_cost_usd": 2600,
    "language_course_duration_months": 6
  },
  {
    "name": "Norway — Nokut/SAK",
    "category": "doctor",
    "path_type": "migration",
    "target_country": "Norway",
    "description": "Norwegian medical licensing via NOKUT diploma assessment and SAK tests — high demand for international doctors.",
    "required_exams": [
      {
        "name": "NOKUT Diploma Assessment",
        "official_link": "https://www.nokut.no",
        "format": "portfolio",
        "cost_usd": 500,
        "retake_policy": "Per submission"
      },
      {
        "name": "SAK Medical Knowledge Test",
        "official_link": "https://www.helsedirektoratet.no",
        "format": "computer",
        "cost_usd": 500,
        "retake_policy": "Max 2 attempts"
      }
    ],
    "required_language_tests": [
      {
        "language": "Norwegian",
        "test_name": "Bergenstesten / Norskprøve",
        "min_score": "B2",
        "official_link": "https://www.kompetansenorge.no"
      }
    ],
    "total_estimated_cost_usd": 3500,
    "total_duration_months": 24,
    "content_status": "verified",
    "order": 31,
    "official_source_links": [
      "https://www.nokut.no",
      "https://www.helsedirektoratet.no"
    ],
    "egypt_specific_notes": "Growing demand, especially in rural and northern Norway. Norwegian B2 required.",
    "visa_info": [
      {
        "visa_type": "Work Permit — Specialist Healthcare",
        "duration_years": 3,
        "processing_months": 5,
        "notes": "Autorisation from Helsedirektoratet required"
      }
    ],
    "expected_salary": {
      "min_annual": 700000,
      "max_annual": 1400000,
      "currency": "NOK",
      "notes": "Spesialist"
    },
    "pass_rates": [
      {
        "exam_name": "NOKUT Diploma Assessment",
        "pass_rate": 60,
        "source": "Estimated 2025"
      },
      {
        "exam_name": "SAK Medical Knowledge Test",
        "pass_rate": 60,
        "source": "Estimated 2025"
      }
    ],
    "competitiveness_rating": "medium",
    "language_course_required": true,
    "language_course_cost_usd": 3500,
    "language_course_duration_months": 6
  },
  {
    "name": "Denmark — AED Licensing",
    "category": "doctor",
    "path_type": "migration",
    "target_country": "Denmark",
    "description": "Danish medical licensing via the Agency for Education and Quality (AED) — language and professional assessment required.",
    "required_exams": [
      {
        "name": "AED Competency Assessment",
        "official_link": "https://www.aed.dk",
        "format": "portfolio",
        "cost_usd": 400,
        "retake_policy": "Per submission"
      },
      {
        "name": "Danish Medical License Test",
        "official_link": "https://www.aed.dk",
        "format": "computer",
        "cost_usd": 400,
        "retake_policy": "Max 3 attempts"
      }
    ],
    "required_language_tests": [
      {
        "language": "Danish",
        "test_name": "Danish Language Test (PD3/PD2)",
        "min_score": "B2",
        "official_link": "https://www.danskprove.dk"
      }
    ],
    "total_estimated_cost_usd": 3000,
    "total_duration_months": 24,
    "content_status": "verified",
    "order": 32,
    "official_source_links": [
      "https://www.aed.dk"
    ],
    "egypt_specific_notes": "Danish B2 required. Process includes diploma verification, language test, and a professional assessment.",
    "visa_info": [
      {
        "visa_type": "Fast-track Scheme / Pay Limit",
        "duration_years": 4,
        "processing_months": 2,
        "notes": "Danish Patient Safety Authority authorisation needed"
      }
    ],
    "expected_salary": {
      "min_annual": 650000,
      "max_annual": 1300000,
      "currency": "DKK",
      "notes": "Overlæge"
    },
    "pass_rates": [
      {
        "exam_name": "AED Competency Assessment",
        "pass_rate": 60,
        "source": "Estimated 2025"
      },
      {
        "exam_name": "Danish Medical License Test",
        "pass_rate": 60,
        "source": "Estimated 2025"
      }
    ],
    "competitiveness_rating": "medium",
    "language_course_required": true,
    "language_course_cost_usd": 3000,
    "language_course_duration_months": 6
  },
  {
    "name": "Switzerland — MEBEKO",
    "category": "doctor",
    "path_type": "migration",
    "target_country": "Switzerland",
    "description": "Swiss medical licensing via MEBEKO (Swiss Examination Commission) — federal exam with high income potential.",
    "required_exams": [
      {
        "name": "MEBEKO Federal Exam (Staatsexamen)",
        "official_link": "https://www.mebeko.admin.ch",
        "format": "written+practical",
        "cost_usd": 1500,
        "retake_policy": "Max 2 attempts"
      }
    ],
    "required_language_tests": [
      {
        "language": "French/German/Italian",
        "test_name": "Official language test (depending on canton)",
        "min_score": "B2/C1",
        "official_link": "https://www.mebeko.admin.ch"
      }
    ],
    "total_estimated_cost_usd": 5000,
    "total_duration_months": 18,
    "content_status": "verified",
    "order": 33,
    "official_source_links": [
      "https://www.mebeko.admin.ch"
    ],
    "egypt_specific_notes": "Language requirement depends on canton (French in Geneva/Lausanne, German in Zurich/Bern). High salaries but high cost of living.",
    "visa_info": [
      {
        "visa_type": "Work Permit B (EU Blue Card)",
        "duration_years": 1,
        "processing_months": 3,
        "notes": "Cantonal approval + MEBEKO recognition required"
      }
    ],
    "expected_salary": {
      "min_annual": 120000,
      "max_annual": 250000,
      "currency": "CHF",
      "notes": "Facharzt CHF 150K+"
    },
    "pass_rates": [
      {
        "exam_name": "MEBEKO Federal Exam (Staatsexamen)",
        "pass_rate": 60,
        "source": "Estimated 2025"
      }
    ],
    "competitiveness_rating": "high",
    "language_course_required": true,
    "language_course_cost_usd": 3500,
    "language_course_duration_months": 6
  },
  {
    "name": "Austria — APA Approbation",
    "category": "doctor",
    "path_type": "migration",
    "target_country": "Austria",
    "description": "Austrian medical licensing (Approbation) — similar to Germany but with separate language and EQF requirements.",
    "required_exams": [
      {
        "name": "Austrian Knowledge Exam (Kenntnisprüfung)",
        "official_link": "https://www.aerztekammer.at",
        "format": "written+practical",
        "cost_usd": 500,
        "retake_policy": "Max 3 attempts"
      },
      {
        "name": "EQF Diploma Verification",
        "official_link": "https://www.anabin.de",
        "format": "online",
        "cost_usd": 200,
        "retake_policy": "Per submission"
      }
    ],
    "required_language_tests": [
      {
        "language": "German",
        "test_name": "ÖSD / Goethe-Zertifikat",
        "min_score": "B2 (C1 recommended)",
        "official_link": "https://www.osd.at"
      }
    ],
    "total_estimated_cost_usd": 4000,
    "total_duration_months": 24,
    "content_status": "verified",
    "order": 34,
    "official_source_links": [
      "https://www.aerztekammer.at"
    ],
    "egypt_specific_notes": "German B2/C1 required. Smaller job market than Germany but growing demand.",
    "visa_info": [
      {
        "visa_type": "Red-White-Red Card",
        "duration_years": 2,
        "processing_months": 3,
        "notes": "Österreichische Ärztekammer registration required"
      }
    ],
    "expected_salary": {
      "min_annual": 65000,
      "max_annual": 130000,
      "currency": "EUR"
    },
    "pass_rates": [
      {
        "exam_name": "Austrian Knowledge Exam (Kenntnisprüfung)",
        "pass_rate": 55,
        "source": "Estimated 2025"
      },
      {
        "exam_name": "EQF Diploma Verification",
        "pass_rate": 60,
        "source": "Estimated 2025"
      }
    ],
    "competitiveness_rating": "low",
    "language_course_required": true,
    "language_course_cost_usd": 2800,
    "language_course_duration_months": 5
  },
  {
    "name": "Belgium — SPF Santé Publique",
    "category": "doctor",
    "path_type": "migration",
    "target_country": "Belgium",
    "description": "Belgian medical licensing via the Federal Public Service for Health — diploma equivalence and language assessment.",
    "required_exams": [
      {
        "name": "Belgian Diploma Equivalence",
        "official_link": "https://www.health.belgium.be",
        "format": "portfolio",
        "cost_usd": 300,
        "retake_policy": "Per submission"
      },
      {
        "name": "Interuniversity Exam for IMGs",
        "official_link": "https://www.health.belgium.be",
        "format": "computer",
        "cost_usd": 400,
        "retake_policy": "Max 3 attempts"
      }
    ],
    "required_language_tests": [
      {
        "language": "French or Dutch",
        "test_name": "Official language test (regional)",
        "min_score": "B2",
        "official_link": "https://www.health.belgium.be"
      }
    ],
    "total_estimated_cost_usd": 3000,
    "total_duration_months": 18,
    "content_status": "verified",
    "order": 35,
    "official_source_links": [
      "https://www.health.belgium.be"
    ],
    "egypt_specific_notes": "French required for Wallonia/Brussels, Dutch for Flanders. Diploma equivalence and an interuniversity exam required.",
    "visa_info": [
      {
        "visa_type": "Single Permit (B card)",
        "duration_years": 1,
        "processing_months": 4,
        "notes": "INAMI/RIZIV accreditation for medical practice"
      }
    ],
    "expected_salary": {
      "min_annual": 65000,
      "max_annual": 130000,
      "currency": "EUR"
    },
    "pass_rates": [
      {
        "exam_name": "Belgian Diploma Equivalence",
        "pass_rate": 60,
        "source": "Estimated 2025"
      },
      {
        "exam_name": "Interuniversity Exam for IMGs",
        "pass_rate": 60,
        "source": "Estimated 2025"
      }
    ],
    "competitiveness_rating": "low",
    "language_course_required": true,
    "language_course_cost_usd": 2500,
    "language_course_duration_months": 5
  },
  {
    "name": "Finland — VALVIRA Licensing",
    "category": "doctor",
    "path_type": "migration",
    "target_country": "Finland",
    "description": "Finnish medical licensing via VALVIRA (National Supervisory Authority) — language test and competency assessment.",
    "required_exams": [
      {
        "name": "VALVIRA Diploma Assessment",
        "official_link": "https://www.valvira.fi",
        "format": "portfolio",
        "cost_usd": 400,
        "retake_policy": "Per submission"
      },
      {
        "name": "Finnish Medical Knowledge Test",
        "official_link": "https://www.valvira.fi",
        "format": "computer",
        "cost_usd": 500,
        "retake_policy": "Max 2 attempts"
      }
    ],
    "required_language_tests": [
      {
        "language": "Finnish",
        "test_name": "YKI Test",
        "min_score": "B2",
        "official_link": "https://www.opintopolku.fi"
      }
    ],
    "total_estimated_cost_usd": 3500,
    "total_duration_months": 24,
    "content_status": "verified",
    "order": 36,
    "official_source_links": [
      "https://www.valvira.fi"
    ],
    "egypt_specific_notes": "Finnish B2 required. Growing demand for doctors in rural and eastern Finland.",
    "visa_info": [
      {
        "visa_type": "EU Blue Card / Work Permit",
        "duration_years": 2,
        "processing_months": 3,
        "notes": "Valvira licensing authority for healthcare professionals"
      }
    ],
    "expected_salary": {
      "min_annual": 60000,
      "max_annual": 120000,
      "currency": "EUR"
    },
    "pass_rates": [
      {
        "exam_name": "VALVIRA Diploma Assessment",
        "pass_rate": 60,
        "source": "Estimated 2025"
      },
      {
        "exam_name": "Finnish Medical Knowledge Test",
        "pass_rate": 60,
        "source": "Estimated 2025"
      }
    ],
    "competitiveness_rating": "medium",
    "language_course_required": true,
    "language_course_cost_usd": 2800,
    "language_course_duration_months": 6
  },
  {
    "name": "Singapore — SMC Registration",
    "category": "doctor",
    "path_type": "migration",
    "target_country": "Singapore",
    "description": "Singapore Medical Council registration — competitive but high-reward market with strong regulatory standards.",
    "required_exams": [
      {
        "name": "SMC Provisional Registration Exam",
        "official_link": "https://www.smc.gov.sg",
        "format": "computer",
        "cost_usd": 600,
        "retake_policy": "Max 3 attempts"
      },
      {
        "name": "IPR (Intra-Psychometric Test)",
        "official_link": "https://www.smc.gov.sg",
        "format": "computer",
        "cost_usd": 400,
        "retake_policy": "Per submission"
      }
    ],
    "required_language_tests": [
      {
        "language": "English",
        "test_name": "IELTS",
        "min_score": "7.5",
        "official_link": "https://www.ielts.org"
      }
    ],
    "total_estimated_cost_usd": 5000,
    "total_duration_months": 18,
    "content_status": "verified",
    "order": 37,
    "official_source_links": [
      "https://www.smc.gov.sg"
    ],
    "egypt_specific_notes": "Highly competitive. Only graduates from recognised medical schools considered. Egyptian MBBS may require individual assessment.",
    "visa_info": [
      {
        "visa_type": "Employment Pass (EP)",
        "duration_years": 2,
        "processing_months": 3,
        "notes": "SMC registration + Singapore Medical Council exam"
      }
    ],
    "expected_salary": {
      "min_annual": 80000,
      "max_annual": 200000,
      "currency": "SGD"
    },
    "pass_rates": [
      {
        "exam_name": "SMC Provisional Registration Exam",
        "pass_rate": 60,
        "source": "Estimated 2025"
      },
      {
        "exam_name": "IPR (Intra-Psychometric Test)",
        "pass_rate": 60,
        "source": "Estimated 2025"
      }
    ],
    "competitiveness_rating": "low",
    "language_course_required": false
  },
  {
    "name": "Malaysia — MMC Registration",
    "category": "doctor",
    "path_type": "migration",
    "target_country": "Malaysia",
    "description": "Malaysian Medical Council registration — emerging destination with growing healthcare sector.",
    "required_exams": [
      {
        "name": "MMC Provisional Registration",
        "official_link": "https://www.mmc.gov.my",
        "format": "portfolio",
        "cost_usd": 300,
        "retake_policy": "Per submission"
      }
    ],
    "required_language_tests": [
      {
        "language": "English",
        "test_name": "IELTS",
        "min_score": "7.0",
        "official_link": "https://www.ielts.org"
      }
    ],
    "total_estimated_cost_usd": 2000,
    "total_duration_months": 12,
    "content_status": "verified",
    "order": 38,
    "official_source_links": [
      "https://www.mmc.gov.my"
    ],
    "egypt_specific_notes": "Growing healthcare investment. English-friendly environment.",
    "visa_info": [
      {
        "visa_type": "Employment Pass (Category I/II)",
        "duration_years": 2,
        "processing_months": 4,
        "notes": "Malaysian Medical Council registration required"
      }
    ],
    "expected_salary": {
      "min_annual": 60000,
      "max_annual": 150000,
      "currency": "MYR"
    },
    "pass_rates": [
      {
        "exam_name": "MMC Provisional Registration",
        "pass_rate": 60,
        "source": "Estimated 2025"
      }
    ],
    "competitiveness_rating": "low",
    "language_course_required": false
  },
  {
    "name": "Japan — JMLE/Medical Licensing",
    "category": "doctor",
    "path_type": "migration",
    "target_country": "Japan",
    "description": "Japanese medical licensing via the JMLE (Japanese Medical Licensing Exam) — highly competitive with language and diploma prerequisites.",
    "required_exams": [
      {
        "name": "JMLE (Japanese Medical Licensing Exam)",
        "official_link": "https://www.mhlw.go.jp",
        "format": "written",
        "cost_usd": 600,
        "retake_policy": "Max 3 attempts"
      },
      {
        "name": "Diploma Equivalence (MEXT)",
        "official_link": "https://www.mext.go.jp",
        "format": "portfolio",
        "cost_usd": 400,
        "retake_policy": "Per submission"
      }
    ],
    "required_language_tests": [
      {
        "language": "Japanese",
        "test_name": "JLPT N1",
        "min_score": "N1 (most advanced)",
        "official_link": "https://www.jlpt.jp"
      }
    ],
    "total_estimated_cost_usd": 5000,
    "total_duration_months": 24,
    "content_status": "verified",
    "order": 39,
    "official_source_links": [
      "https://www.mhlw.go.jp",
      "https://www.mext.go.jp"
    ],
    "egypt_specific_notes": "Japanese N1 language requirement is extremely challenging. Few Egyptian doctors pursue this route. High income potential.",
    "visa_info": [
      {
        "visa_type": "Engineer/Specialist in Humanities Visa",
        "duration_years": 1,
        "processing_months": 4,
        "notes": "N1/N2 Japanese proficiency typically required"
      }
    ],
    "expected_salary": {
      "min_annual": 10000000,
      "max_annual": 25000000,
      "currency": "JPY"
    },
    "pass_rates": [
      {
        "exam_name": "JMLE (Japanese Medical Licensing Exam)",
        "pass_rate": 60,
        "source": "Estimated 2025"
      },
      {
        "exam_name": "Diploma Equivalence (MEXT)",
        "pass_rate": 60,
        "source": "Estimated 2025"
      }
    ],
    "competitiveness_rating": "low",
    "language_course_required": true,
    "language_course_cost_usd": 4000,
    "language_course_duration_months": 9
  },
  {
    "name": "South Korea — KMLE",
    "category": "doctor",
    "path_type": "migration",
    "target_country": "South Korea",
    "description": "Korean medical licensing via the KMLE (Korean Medical Licensing Exam) — growing medical tourism and healthcare sector.",
    "required_exams": [
      {
        "name": "KMLE (Korean Medical Licensing Exam)",
        "official_link": "https://www.kimsonline.or.kr",
        "format": "written+clinical",
        "cost_usd": 500,
        "retake_policy": "Max 3 attempts"
      },
      {
        "name": "Korean Language Proficiency",
        "official_link": "https://www.kimsonline.or.kr",
        "format": "written+oral",
        "cost_usd": 200,
        "retake_policy": "Unlimited"
      }
    ],
    "required_language_tests": [
      {
        "language": "Korean",
        "test_name": "TOPIK",
        "min_score": "Level 4",
        "official_link": "https://www.topik.go.kr"
      }
    ],
    "total_estimated_cost_usd": 4000,
    "total_duration_months": 18,
    "content_status": "verified",
    "order": 40,
    "official_source_links": [
      "https://www.kimsonline.or.kr"
    ],
    "egypt_specific_notes": "Korean language (TOPIK Level 4+) required. Growing medical sector but small Egyptian doctor community.",
    "visa_info": [
      {
        "visa_type": "E-7 Special Activity Visa",
        "duration_years": 1,
        "processing_months": 4,
        "notes": "Korean Medical Licensing Exam (KMLE) required"
      }
    ],
    "expected_salary": {
      "min_annual": 80000000,
      "max_annual": 200000000,
      "currency": "KRW"
    },
    "pass_rates": [
      {
        "exam_name": "KMLE (Korean Medical Licensing Exam)",
        "pass_rate": 60,
        "source": "Estimated 2025"
      },
      {
        "exam_name": "Korean Language Proficiency",
        "pass_rate": 60,
        "source": "Estimated 2025"
      }
    ],
    "competitiveness_rating": "low",
    "language_course_required": true,
    "language_course_cost_usd": 3500,
    "language_course_duration_months": 6
  },
  {
    "name": "Libya — MOH Licensing",
    "category": "doctor",
    "path_type": "migration",
    "target_country": "Libya",
    "description": "Libyan Ministry of Health licensing — traditional destination for Egyptian doctors with strong historical ties.",
    "required_exams": [
      {
        "name": "Libyan MOH Written Exam",
        "official_link": "https://www.health.gov.ly",
        "format": "written",
        "cost_usd": 200,
        "retake_policy": "Max 3 attempts"
      }
    ],
    "required_language_tests": [],
    "total_estimated_cost_usd": 1500,
    "total_duration_months": 6,
    "content_status": "verified",
    "order": 41,
    "official_source_links": [
      "https://www.health.gov.ly"
    ],
    "egypt_specific_notes": "Historically a major destination for Egyptian doctors. Security situation affects recruitment. Arabic language sufficient.",
    "visa_info": [
      {
        "visa_type": "Work Visa (MOH Registration)",
        "duration_years": 1,
        "processing_months": 3,
        "notes": "Preference for Egyptian degree holders. Security situation variable."
      }
    ],
    "expected_salary": {
      "min_annual": 15000,
      "max_annual": 35000,
      "currency": "USD"
    },
    "pass_rates": [
      {
        "exam_name": "Libyan MOH Written Exam",
        "pass_rate": 60,
        "source": "Estimated 2025"
      }
    ],
    "competitiveness_rating": "low",
    "language_course_required": false
  },
  {
    "name": "Sudan — MOH Licensing",
    "category": "doctor",
    "path_type": "migration",
    "target_country": "Sudan",
    "description": "Sudanese Ministry of Health licensing — close historical ties and mutual recognition of Egyptian qualifications.",
    "required_exams": [
      {
        "name": "Sudanese Medical Council Exam",
        "official_link": "https://www.sudmc.org",
        "format": "written",
        "cost_usd": 200,
        "retake_policy": "Max 3 attempts"
      }
    ],
    "required_language_tests": [],
    "total_estimated_cost_usd": 1000,
    "total_duration_months": 6,
    "content_status": "verified",
    "order": 42,
    "official_source_links": [
      "https://www.sudmc.org"
    ],
    "egypt_specific_notes": "Close ties with Egyptian medical system. Arabic language sufficient.",
    "visa_info": [
      {
        "visa_type": "Work Visa (Medical Council Reg.)",
        "duration_years": 1,
        "processing_months": 2,
        "notes": "Sudanese Medical Council registration + MOH approval"
      }
    ],
    "expected_salary": {
      "min_annual": 4000,
      "max_annual": 12000,
      "currency": "USD"
    },
    "pass_rates": [
      {
        "exam_name": "Sudanese Medical Council Exam",
        "pass_rate": 60,
        "source": "Estimated 2025"
      }
    ],
    "competitiveness_rating": "low",
    "language_course_required": false
  },
  {
    "name": "Stay-Egypt (MOH Government Nursing Track)",
    "category": "nurse",
    "path_type": "career",
    "target_country": "Egypt",
    "description": "Ministry of Health hospital nursing placement — government salary scale with pension and job security.",
    "required_exams": [],
    "required_language_tests": [],
    "total_estimated_cost_usd": 500,
    "total_duration_months": null,
    "content_status": "stub",
    "order": 1,
    "official_source_links": [],
    "egypt_specific_notes": "Requires Egyptian Nursing Syndicate registration. Government hospitals across all governorates.",
    "visa_info": [],
    "expected_salary": {
      "min_annual": 3000,
      "max_annual": 8000,
      "currency": "USD"
    },
    "pass_rates": [],
    "competitiveness_rating": "medium",
    "language_course_required": false
  },
  {
    "name": "Stay-Egypt (University/Teaching Hospital Nursing Track)",
    "category": "nurse",
    "path_type": "career",
    "target_country": "Egypt",
    "description": "Academic hospital nursing position with path toward nursing education and faculty roles.",
    "required_exams": [],
    "required_language_tests": [],
    "total_estimated_cost_usd": 500,
    "total_duration_months": null,
    "content_status": "stub",
    "order": 2,
    "official_source_links": [],
    "egypt_specific_notes": "Typically requires Bachelor's in Nursing. Teaching hospitals in major cities (Cairo, Alexandria).",
    "visa_info": [],
    "expected_salary": {
      "min_annual": 3000,
      "max_annual": 8000,
      "currency": "USD"
    },
    "pass_rates": [],
    "competitiveness_rating": "medium",
    "language_course_required": false
  },
  {
    "name": "Stay-Egypt (Private Sector Nursing)",
    "category": "nurse",
    "path_type": "career",
    "target_country": "Egypt",
    "description": "Private hospital nursing in Egypt — generally higher pay than government but less job security.",
    "required_exams": [],
    "required_language_tests": [],
    "total_estimated_cost_usd": 500,
    "total_duration_months": null,
    "content_status": "stub",
    "order": 3,
    "official_source_links": [],
    "egypt_specific_notes": "Private hospitals concentrated in Cairo, Alexandria, and tourist areas.",
    "visa_info": [],
    "expected_salary": {
      "min_annual": 3000,
      "max_annual": 8000,
      "currency": "USD"
    },
    "pass_rates": [],
    "competitiveness_rating": "medium",
    "language_course_required": false
  },
  {
    "name": "Stay-Egypt (Military/Police Nursing Services)",
    "category": "nurse",
    "path_type": "career",
    "target_country": "Egypt",
    "description": "Armed forces or police medical corps nursing track — distinct entry, benefits, and service commitment.",
    "required_exams": [],
    "required_language_tests": [],
    "total_estimated_cost_usd": 500,
    "total_duration_months": null,
    "content_status": "stub",
    "order": 4,
    "official_source_links": [],
    "egypt_specific_notes": "Requires military/security clearance. Service commitment and benefits differ from civilian tracks.",
    "visa_info": [],
    "expected_salary": {
      "min_annual": 3000,
      "max_annual": 8000,
      "currency": "USD"
    },
    "pass_rates": [],
    "competitiveness_rating": "medium",
    "language_course_required": false
  },
  {
    "name": "Stay-Egypt (Postgraduate Nursing Track)",
    "category": "nurse",
    "path_type": "career",
    "target_country": "Egypt",
    "description": "Pursuing a Master's in Nursing or nursing specialization in Egypt as the next career step.",
    "required_exams": [],
    "required_language_tests": [],
    "total_estimated_cost_usd": 500,
    "total_duration_months": null,
    "content_status": "stub",
    "order": 5,
    "official_source_links": [],
    "egypt_specific_notes": "Egyptian universities offer Master's in Nursing with clinical and thesis components.",
    "visa_info": [],
    "expected_salary": {
      "min_annual": 3000,
      "max_annual": 8000,
      "currency": "USD"
    },
    "pass_rates": [],
    "competitiveness_rating": "medium",
    "language_course_required": false
  },
  {
    "name": "Stay-Egypt (NGO/International Health Nursing)",
    "category": "nurse",
    "path_type": "career",
    "target_country": "Egypt",
    "description": "Working with international health organizations operating inside Egypt — WHO, UNICEF, UNFPA nursing programs.",
    "required_exams": [],
    "required_language_tests": [],
    "total_estimated_cost_usd": 500,
    "total_duration_months": null,
    "content_status": "stub",
    "order": 6,
    "official_source_links": [],
    "egypt_specific_notes": "Relevant experience and English proficiency important. Contract-based, competitive positions.",
    "visa_info": [],
    "expected_salary": {
      "min_annual": 3000,
      "max_annual": 8000,
      "currency": "USD"
    },
    "pass_rates": [],
    "competitiveness_rating": "medium",
    "language_course_required": false
  },
  {
    "name": "Saudi Arabia — Saudi Nursing License (SCFHS)",
    "category": "nurse",
    "path_type": "migration",
    "target_country": "Saudi Arabia",
    "description": "Saudi Commission for Health Specialties nursing licensing via Prometric — the largest overseas destination for Egyptian nurses.",
    "required_exams": [
      {
        "name": "SCFHS Nursing Prometric Exam",
        "official_link": "https://www.scfhs.org.sa",
        "format": "computer",
        "cost_usd": 300,
        "retake_policy": "Max 4 attempts per year"
      },
      {
        "name": "Dataflow PSV",
        "official_link": "https://www.scfhs.org.sa",
        "format": "online",
        "cost_usd": 250,
        "retake_policy": "Per submission"
      }
    ],
    "required_language_tests": [
      {
        "language": "English",
        "test_name": "IELTS",
        "min_score": "5.5",
        "official_link": "https://www.ielts.org"
      }
    ],
    "total_estimated_cost_usd": 2000,
    "total_duration_months": 12,
    "content_status": "verified",
    "order": 7,
    "official_source_links": [
      "https://www.scfhs.org.sa"
    ],
    "egypt_specific_notes": "Prometric exam for nursing. Dataflow verification required. Arabic language sometimes required for patient-facing roles.",
    "visa_info": [
      {
        "visa_type": "Work Visa (SCFHS Classification)",
        "duration_years": 2,
        "processing_months": 4,
        "notes": "Dataflow verification + Prometric exam required. Sponsorship via MOH or private hospital."
      }
    ],
    "expected_salary": {
      "min_annual": 35000,
      "max_annual": 60000,
      "currency": "SAR",
      "notes": "Tax-free with benefits"
    },
    "pass_rates": [
      {
        "exam_name": "SCFHS Nursing Prometric Exam",
        "pass_rate": 55,
        "source": "GCC Estimate 2025"
      },
      {
        "exam_name": "Dataflow PSV",
        "pass_rate": 60,
        "source": "Estimated 2025"
      }
    ],
    "competitiveness_rating": "low",
    "language_course_required": false
  },
  {
    "name": "UAE — Nursing License (DHA/DoH)",
    "category": "nurse",
    "path_type": "migration",
    "target_country": "UAE",
    "description": "Dubai Health Authority or Department of Health Abu Dhabi licensing for nursing practice in the UAE.",
    "required_exams": [
      {
        "name": "DHA Nursing Licensing Exam",
        "official_link": "https://www.dha.gov.ae",
        "format": "computer",
        "cost_usd": 350,
        "retake_policy": "Max 4 attempts per year"
      },
      {
        "name": "Dataflow PSV",
        "official_link": "https://www.dha.gov.ae",
        "format": "online",
        "cost_usd": 250,
        "retake_policy": "Per submission"
      }
    ],
    "required_language_tests": [
      {
        "language": "English",
        "test_name": "IELTS",
        "min_score": "6.0",
        "official_link": "https://www.ielts.org"
      }
    ],
    "total_estimated_cost_usd": 2200,
    "total_duration_months": 12,
    "content_status": "verified",
    "order": 8,
    "official_source_links": [
      "https://www.dha.gov.ae",
      "https://www.doh.gov.ae"
    ],
    "egypt_specific_notes": "Primary Source Verification required. Written exam for licensing.",
    "visa_info": [
      {
        "visa_type": "Employment Visa (DHA/DoH/MOHAP)",
        "duration_years": 2,
        "processing_months": 3,
        "notes": "Dubai — DHA, Abu Dhabi — DoH, Other — MOHAP"
      }
    ],
    "expected_salary": {
      "min_annual": 90000,
      "max_annual": 180000,
      "currency": "AED",
      "notes": "Tax-free"
    },
    "pass_rates": [
      {
        "exam_name": "DHA Nursing Licensing Exam",
        "pass_rate": 60,
        "source": "DHA 2025 Estimate"
      },
      {
        "exam_name": "Dataflow PSV",
        "pass_rate": 60,
        "source": "Estimated 2025"
      }
    ],
    "competitiveness_rating": "low",
    "language_course_required": false
  },
  {
    "name": "Qatar — QCHP Nursing License",
    "category": "nurse",
    "path_type": "migration",
    "target_country": "Qatar",
    "description": "Qatar Council for Healthcare Practitioners nursing licensing — growing healthcare sector with post-World Cup demand.",
    "required_exams": [
      {
        "name": "QCHP Nursing Prometric",
        "official_link": "https://www.qchp.org.qa",
        "format": "computer",
        "cost_usd": 300,
        "retake_policy": "Max 4 attempts per year"
      },
      {
        "name": "QCHP Dataflow PSV",
        "official_link": "https://www.qchp.org.qa",
        "format": "online",
        "cost_usd": 250,
        "retake_policy": "Per submission"
      }
    ],
    "required_language_tests": [
      {
        "language": "English",
        "test_name": "IELTS",
        "min_score": "5.5",
        "official_link": "https://www.ielts.org"
      }
    ],
    "total_estimated_cost_usd": 2000,
    "total_duration_months": 12,
    "content_status": "verified",
    "order": 9,
    "official_source_links": [
      "https://www.qchp.org.qa"
    ],
    "egypt_specific_notes": "Prometric-based exam with dataflow verification. Growing demand for nurses in Qatar.",
    "visa_info": [
      {
        "visa_type": "Work Visa (QCHP Licensing)",
        "duration_years": 2,
        "processing_months": 3,
        "notes": "Dataflow verification + Prometric exam required"
      }
    ],
    "expected_salary": {
      "min_annual": 90000,
      "max_annual": 180000,
      "currency": "QAR",
      "notes": "Tax-free"
    },
    "pass_rates": [
      {
        "exam_name": "QCHP Nursing Prometric",
        "pass_rate": 55,
        "source": "GCC Estimate 2025"
      },
      {
        "exam_name": "QCHP Dataflow PSV",
        "pass_rate": 58,
        "source": "QCHP 2025 Estimate"
      }
    ],
    "competitiveness_rating": "low",
    "language_course_required": false
  },
  {
    "name": "Kuwait — MOH Nursing License",
    "category": "nurse",
    "path_type": "migration",
    "target_country": "Kuwait",
    "description": "Kuwait Ministry of Health nursing licensing — established destination for Egyptian nurses.",
    "required_exams": [
      {
        "name": "Kuwait MOH Nursing Exam",
        "official_link": "https://www.moh.gov.kw",
        "format": "written",
        "cost_usd": 250,
        "retake_policy": "Max 3 attempts"
      },
      {
        "name": "Credential Verification",
        "official_link": "https://www.moh.gov.kw",
        "format": "online",
        "cost_usd": 200,
        "retake_policy": "Per submission"
      }
    ],
    "required_language_tests": [
      {
        "language": "English",
        "test_name": "IELTS",
        "min_score": "5.5",
        "official_link": "https://www.ielts.org"
      }
    ],
    "total_estimated_cost_usd": 1800,
    "total_duration_months": 9,
    "content_status": "verified",
    "order": 10,
    "official_source_links": [
      "https://www.moh.gov.kw"
    ],
    "egypt_specific_notes": "Requires credential verification and written exam. Egyptian nursing diplomas well-recognised.",
    "visa_info": [
      {
        "visa_type": "Work Visa (MOH Licensing)",
        "duration_years": 2,
        "processing_months": 4,
        "notes": "Dataflow verification + Prometric exam required"
      }
    ],
    "expected_salary": {
      "min_annual": 9000,
      "max_annual": 16000,
      "currency": "KWD"
    },
    "pass_rates": [
      {
        "exam_name": "Kuwait MOH Nursing Exam",
        "pass_rate": 60,
        "source": "Estimated 2025"
      },
      {
        "exam_name": "Credential Verification",
        "pass_rate": 60,
        "source": "Estimated 2025"
      }
    ],
    "competitiveness_rating": "low",
    "language_course_required": false
  },
  {
    "name": "Bahrain — NHRA Nursing License",
    "category": "nurse",
    "path_type": "migration",
    "target_country": "Bahrain",
    "description": "National Health Regulatory Authority nursing licensing for Bahrain.",
    "required_exams": [
      {
        "name": "NHRA Nursing Exam",
        "official_link": "https://www.nhra.bh",
        "format": "computer",
        "cost_usd": 250,
        "retake_policy": "Max 3 attempts"
      }
    ],
    "required_language_tests": [
      {
        "language": "English",
        "test_name": "IELTS",
        "min_score": "5.5",
        "official_link": "https://www.ielts.org"
      }
    ],
    "total_estimated_cost_usd": 1500,
    "total_duration_months": 9,
    "content_status": "verified",
    "order": 11,
    "official_source_links": [
      "https://www.nhra.bh"
    ],
    "egypt_specific_notes": "Smaller job market but faster processing times than Saudi/UAE.",
    "visa_info": [
      {
        "visa_type": "Work Visa (NHRA Licensing)",
        "duration_years": 2,
        "processing_months": 3,
        "notes": "Dataflow verification + Prometric exam"
      }
    ],
    "expected_salary": {
      "min_annual": 10000,
      "max_annual": 17000,
      "currency": "BHD"
    },
    "pass_rates": [
      {
        "exam_name": "NHRA Nursing Exam",
        "pass_rate": 60,
        "source": "Estimated 2025"
      }
    ],
    "competitiveness_rating": "low",
    "language_course_required": false
  },
  {
    "name": "Oman — MOH Nursing License",
    "category": "nurse",
    "path_type": "migration",
    "target_country": "Oman",
    "description": "Oman Ministry of Health nursing licensing — emerging destination with growing healthcare investment.",
    "required_exams": [
      {
        "name": "Oman MOH Nursing Prometric",
        "official_link": "https://www.moh.gov.om",
        "format": "computer",
        "cost_usd": 250,
        "retake_policy": "Max 3 attempts"
      }
    ],
    "required_language_tests": [
      {
        "language": "English",
        "test_name": "IELTS",
        "min_score": "5.5",
        "official_link": "https://www.ielts.org"
      }
    ],
    "total_estimated_cost_usd": 1800,
    "total_duration_months": 10,
    "content_status": "verified",
    "order": 12,
    "official_source_links": [
      "https://www.moh.gov.om"
    ],
    "egypt_specific_notes": "Growing demand for nurses in Oman's expanding healthcare system.",
    "visa_info": [
      {
        "visa_type": "Work Visa (MOH Licensing)",
        "duration_years": 2,
        "processing_months": 3,
        "notes": "Dataflow verification + Prometric exam"
      }
    ],
    "expected_salary": {
      "min_annual": 11000,
      "max_annual": 18000,
      "currency": "OMR"
    },
    "pass_rates": [
      {
        "exam_name": "Oman MOH Nursing Prometric",
        "pass_rate": 55,
        "source": "GCC Estimate 2025"
      }
    ],
    "competitiveness_rating": "low",
    "language_course_required": false
  },
  {
    "name": "UK — NMC OSCE",
    "category": "nurse",
    "path_type": "migration",
    "target_country": "United Kingdom",
    "description": "UK nursing registration via NMC — CBT + OSCE, the most popular European route for Egyptian nurses.",
    "required_exams": [
      {
        "name": "NMC CBT (Computer-Based Test)",
        "official_link": "https://www.nmc.org.uk",
        "format": "computer",
        "cost_usd": 150,
        "retake_policy": "Max 3 attempts"
      },
      {
        "name": "NMC OSCE (Objective Structured Clinical Examination)",
        "official_link": "https://www.nmc.org.uk",
        "format": "practical",
        "cost_usd": 1000,
        "retake_policy": "Max 3 attempts"
      }
    ],
    "required_language_tests": [
      {
        "language": "English",
        "test_name": "IELTS",
        "min_score": "7.0",
        "official_link": "https://www.ielts.org"
      },
      {
        "language": "English",
        "test_name": "OET Nursing",
        "min_score": "B",
        "official_link": "https://www.oet.com"
      }
    ],
    "total_estimated_cost_usd": 3500,
    "total_duration_months": 12,
    "content_status": "verified",
    "order": 13,
    "official_source_links": [
      "https://www.nmc.org.uk"
    ],
    "egypt_specific_notes": "IELTS 7.0 or OET B required. CBT followed by OSCE in UK. Growing NHS recruitment from Egypt.",
    "visa_info": [
      {
        "visa_type": "Health and Care Worker visa (Tier 2)",
        "duration_years": 5,
        "processing_months": 3,
        "notes": "Shortage occupation — expedited processing, reduced fees"
      }
    ],
    "expected_salary": {
      "min_annual": 28000,
      "max_annual": 45000,
      "currency": "GBP",
      "notes": "Band 5-7 NHS AFC"
    },
    "pass_rates": [
      {
        "exam_name": "NMC CBT (Computer-Based Test)",
        "pass_rate": 45,
        "source": "NMC 2024"
      },
      {
        "exam_name": "NMC OSCE (Objective Structured Clinical Examination)",
        "pass_rate": 45,
        "source": "NMC 2024"
      }
    ],
    "competitiveness_rating": "low",
    "language_course_required": false
  },
  {
    "name": "Ireland — NMBI Registration",
    "category": "nurse",
    "path_type": "migration",
    "target_country": "Ireland",
    "description": "Nursing and Midwifery Board of Ireland (NMBI) registration — English-friendly alternative to UK.",
    "required_exams": [
      {
        "name": "NMBI Competency Assessment",
        "official_link": "https://www.nmbi.ie",
        "format": "portfolio",
        "cost_usd": 400,
        "retake_policy": "Per submission"
      },
      {
        "name": "NMBI Adaptation & Assessment",
        "official_link": "https://www.nmbi.ie",
        "format": "practical",
        "cost_usd": 1000,
        "retake_policy": "Max 2 attempts"
      }
    ],
    "required_language_tests": [
      {
        "language": "English",
        "test_name": "IELTS",
        "min_score": "7.0",
        "official_link": "https://www.ielts.org"
      }
    ],
    "total_estimated_cost_usd": 3000,
    "total_duration_months": 12,
    "content_status": "verified",
    "order": 14,
    "official_source_links": [
      "https://www.nmbi.ie"
    ],
    "egypt_specific_notes": "IELTS/OET requirement. Competency assessment and adaptation period may be required.",
    "visa_info": [
      {
        "visa_type": "Critical Skills Employment Permit",
        "duration_years": 2,
        "processing_months": 4,
        "notes": "Most medical roles on Critical Skills list"
      }
    ],
    "expected_salary": {
      "min_annual": 32000,
      "max_annual": 52000,
      "currency": "EUR",
      "notes": "Staff Nurse €35K-€52K"
    },
    "pass_rates": [
      {
        "exam_name": "NMBI Competency Assessment",
        "pass_rate": 60,
        "source": "Estimated 2025"
      },
      {
        "exam_name": "NMBI Adaptation & Assessment",
        "pass_rate": 60,
        "source": "Estimated 2025"
      }
    ],
    "competitiveness_rating": "medium",
    "language_course_required": false
  },
  {
    "name": "Germany — Nursing Approbation",
    "category": "nurse",
    "path_type": "migration",
    "target_country": "Germany",
    "description": "German nursing licensing (Approbation) — requires German B1/B2, growing recruitment from Egypt.",
    "required_exams": [
      {
        "name": "German Language B1/B2",
        "official_link": "https://www.goethe.de",
        "format": "written+oral",
        "cost_usd": 250,
        "retake_policy": "Unlimited"
      },
      {
        "name": "German Nursing Knowledge Exam (Kenntnisprüfung)",
        "official_link": "https://www.bundesaerztekammer.de",
        "format": "written+practical",
        "cost_usd": 400,
        "retake_policy": "Max 2 attempts"
      },
      {
        "name": "Diploma Recognition Procedure",
        "official_link": "https://www.anabin.de",
        "format": "portfolio",
        "cost_usd": 200,
        "retake_policy": "Per submission"
      }
    ],
    "required_language_tests": [
      {
        "language": "German",
        "test_name": "Goethe-Zertifikat",
        "min_score": "B1 (B2 recommended)",
        "official_link": "https://www.goethe.de"
      }
    ],
    "total_estimated_cost_usd": 3000,
    "total_duration_months": 18,
    "content_status": "verified",
    "order": 15,
    "official_source_links": [
      "https://www.bundesaerztekammer.de",
      "https://www.anabin.de"
    ],
    "egypt_specific_notes": "German B1/B2 certification required. Recognition procedure for foreign nursing qualifications. Growing recruitment from Egypt.",
    "visa_info": [
      {
        "visa_type": "EU Blue Card / §18b AufenthG",
        "duration_years": 4,
        "processing_months": 4,
        "notes": "Recognition of qualifications (Anerkennung) required first"
      }
    ],
    "expected_salary": {
      "min_annual": 34000,
      "max_annual": 55000,
      "currency": "EUR",
      "notes": "Tarifvertrag Krankenhaus"
    },
    "pass_rates": [
      {
        "exam_name": "German Language B1/B2",
        "pass_rate": 60,
        "source": "Estimated 2025"
      },
      {
        "exam_name": "German Nursing Knowledge Exam (Kenntnisprüfung)",
        "pass_rate": 55,
        "source": "Estimated 2025"
      },
      {
        "exam_name": "Diploma Recognition Procedure",
        "pass_rate": 60,
        "source": "Estimated 2025"
      }
    ],
    "competitiveness_rating": "low",
    "language_course_required": true,
    "language_course_cost_usd": 3000,
    "language_course_duration_months": 6
  },
  {
    "name": "Malta — Nursing Council Registration",
    "category": "nurse",
    "path_type": "migration",
    "target_country": "Malta",
    "description": "Maltese nursing registration — English-friendly, smaller but accessible market.",
    "required_exams": [
      {
        "name": "Malta Nursing Council Assessment",
        "official_link": "https://www.maltanursingcouncil.org",
        "format": "portfolio",
        "cost_usd": 200,
        "retake_policy": "Per submission"
      }
    ],
    "required_language_tests": [
      {
        "language": "English",
        "test_name": "IELTS",
        "min_score": "6.5",
        "official_link": "https://www.ielts.org"
      }
    ],
    "total_estimated_cost_usd": 1500,
    "total_duration_months": 6,
    "content_status": "verified",
    "order": 16,
    "official_source_links": [
      "https://www.maltanursingcouncil.org"
    ],
    "egypt_specific_notes": "English language requirement. Smaller job market but faster process than UK/Germany.",
    "visa_info": [
      {
        "visa_type": "Single Permit / Key Employee Initiative",
        "duration_years": 1,
        "processing_months": 3,
        "notes": "Key Employee Initiative for specialist roles"
      }
    ],
    "expected_salary": {
      "min_annual": 24000,
      "max_annual": 38000,
      "currency": "EUR"
    },
    "pass_rates": [
      {
        "exam_name": "Malta Nursing Council Assessment",
        "pass_rate": 60,
        "source": "Estimated 2025"
      }
    ],
    "competitiveness_rating": "low",
    "language_course_required": false
  },
  {
    "name": "Canada — NCLEX-RN",
    "category": "nurse",
    "path_type": "migration",
    "target_country": "Canada",
    "description": "Canadian nursing licensing via NCLEX-RN, plus NNAS assessment for Internationally Educated Nurses (IENs).",
    "required_exams": [
      {
        "name": "NCLEX-RN",
        "official_link": "https://www.ncsbn.org/nclex.htm",
        "format": "computer",
        "cost_usd": 400,
        "retake_policy": "Max 8 attempts per year"
      },
      {
        "name": "Jurisprudence Exam",
        "official_link": "https://www.cno.org",
        "format": "online",
        "cost_usd": 100,
        "retake_policy": "Unlimited"
      }
    ],
    "required_language_tests": [
      {
        "language": "English",
        "test_name": "IELTS Academic",
        "min_score": "7.0",
        "official_link": "https://www.ielts.org"
      }
    ],
    "total_estimated_cost_usd": 5000,
    "total_duration_months": 24,
    "content_status": "verified",
    "order": 17,
    "official_source_links": [
      "https://www.nnas.ca",
      "https://www.cno.org"
    ],
    "egypt_specific_notes": "NNAS assessment required for Egyptian nursing diplomas. Bridging programs often needed for clinical hours equivalence.",
    "visa_info": [
      {
        "visa_type": "Express Entry / PNP Healthcare Stream",
        "duration_years": 3,
        "processing_months": 8,
        "notes": "Provincial healthcare nominee streams expedite processing"
      }
    ],
    "expected_salary": {
      "min_annual": 60000,
      "max_annual": 95000,
      "currency": "CAD",
      "notes": "RN salary CAD$70K-95K"
    },
    "pass_rates": [
      {
        "exam_name": "NCLEX-RN",
        "pass_rate": 62,
        "source": "NCSBN 2024 IMG Data"
      },
      {
        "exam_name": "Jurisprudence Exam",
        "pass_rate": 60,
        "source": "Estimated 2025"
      }
    ],
    "competitiveness_rating": "high",
    "language_course_required": false
  },
  {
    "name": "USA — NCLEX-RN",
    "category": "nurse",
    "path_type": "migration",
    "target_country": "USA",
    "description": "US nursing licensing via NCLEX-RN — the highest-paying destination for Egyptian nurses.",
    "required_exams": [
      {
        "name": "NCLEX-RN",
        "official_link": "https://www.ncsbn.org/nclex.htm",
        "format": "computer",
        "cost_usd": 400,
        "retake_policy": "Max 8 attempts per year"
      },
      {
        "name": "CGFNS Credentials Evaluation",
        "official_link": "https://www.cgfns.org",
        "format": "portfolio",
        "cost_usd": 400,
        "retake_policy": "Per submission"
      },
      {
        "name": "VisaScreen Certificate",
        "official_link": "https://www.cgfns.org",
        "format": "portfolio",
        "cost_usd": 500,
        "retake_policy": "Per submission"
      }
    ],
    "required_language_tests": [
      {
        "language": "English",
        "test_name": "OET Nursing / IELTS",
        "min_score": "IELTS 7.0 / OET B",
        "official_link": "https://www.ielts.org"
      }
    ],
    "total_estimated_cost_usd": 6000,
    "total_duration_months": 24,
    "content_status": "verified",
    "order": 18,
    "official_source_links": [
      "https://www.ncsbn.org/nclex.htm",
      "https://www.cgfns.org"
    ],
    "egypt_specific_notes": "CGFNS or equivalent credentials evaluation required. VisaScreen certification needed for work visa.",
    "visa_info": [
      {
        "visa_type": "H-1B / J-1 Exchange Visitor",
        "duration_years": 3,
        "processing_months": 6,
        "notes": "J-1 requires 2-year home-country rule. H-1B subject to annual cap"
      }
    ],
    "expected_salary": {
      "min_annual": 60000,
      "max_annual": 100000,
      "currency": "USD",
      "notes": "RN median ~$86K (2025 BLS)"
    },
    "pass_rates": [
      {
        "exam_name": "NCLEX-RN",
        "pass_rate": 62,
        "source": "NCSBN 2024 IMG Data"
      },
      {
        "exam_name": "CGFNS Credentials Evaluation",
        "pass_rate": 60,
        "source": "Estimated 2025"
      },
      {
        "exam_name": "VisaScreen Certificate",
        "pass_rate": 60,
        "source": "Estimated 2025"
      }
    ],
    "competitiveness_rating": "high",
    "language_course_required": false
  },
  {
    "name": "Australia — AHPRA/ANMAC Nursing",
    "category": "nurse",
    "path_type": "migration",
    "target_country": "Australia",
    "description": "Australian nursing registration via AHPRA — skilled migration pathway with strong demand across all states.",
    "required_exams": [
      {
        "name": "ANMAC Skills Assessment",
        "official_link": "https://www.anmac.org.au",
        "format": "portfolio",
        "cost_usd": 600,
        "retake_policy": "Per submission"
      },
      {
        "name": "NCLEX-RN or OSCE (depending on state)",
        "official_link": "https://www.ahpra.gov.au",
        "format": "computer",
        "cost_usd": 400,
        "retake_policy": "Max 3 attempts"
      }
    ],
    "required_language_tests": [
      {
        "language": "English",
        "test_name": "IELTS Academic",
        "min_score": "7.0",
        "official_link": "https://www.ielts.org"
      },
      {
        "language": "English",
        "test_name": "OET Nursing",
        "min_score": "B",
        "official_link": "https://www.oet.com"
      }
    ],
    "total_estimated_cost_usd": 5000,
    "total_duration_months": 18,
    "content_status": "verified",
    "order": 19,
    "official_source_links": [
      "https://www.ahpra.gov.au",
      "https://www.anmac.org.au"
    ],
    "egypt_specific_notes": "ANMAC skills assessment required. IELTS 7.0 or OET B. Bridging programs may be needed.",
    "visa_info": [
      {
        "visa_type": "TSS 482 / Permanent 186 (DE)",
        "duration_years": 4,
        "processing_months": 5,
        "notes": "AMC assessment + AHPRA registration required"
      }
    ],
    "expected_salary": {
      "min_annual": 65000,
      "max_annual": 100000,
      "currency": "AUD"
    },
    "pass_rates": [
      {
        "exam_name": "ANMAC Skills Assessment",
        "pass_rate": 60,
        "source": "Estimated 2025"
      },
      {
        "exam_name": "NCLEX-RN or OSCE (depending on state)",
        "pass_rate": 62,
        "source": "NCSBN 2024 IMG Data"
      }
    ],
    "competitiveness_rating": "low",
    "language_course_required": false
  },
  {
    "name": "New Zealand — Nursing Council Registration",
    "category": "nurse",
    "path_type": "migration",
    "target_country": "New Zealand",
    "description": "New Zealand nursing registration — streamlined pathway for IENs with growing healthcare workforce needs.",
    "required_exams": [
      {
        "name": "Nursing Council CAP (Competency Assessment Programme)",
        "official_link": "https://www.nursingcouncil.org.nz",
        "format": "practical",
        "cost_usd": 2000,
        "retake_policy": "Max 2 attempts"
      }
    ],
    "required_language_tests": [
      {
        "language": "English",
        "test_name": "IELTS Academic",
        "min_score": "7.0",
        "official_link": "https://www.ielts.org"
      }
    ],
    "total_estimated_cost_usd": 4000,
    "total_duration_months": 12,
    "content_status": "verified",
    "order": 20,
    "official_source_links": [
      "https://www.nursingcouncil.org.nz"
    ],
    "egypt_specific_notes": "Competency assessment program (CAP) may be required. IELTS 7.0.",
    "visa_info": [
      {
        "visa_type": "Straight to Residence Visa",
        "duration_years": 3,
        "processing_months": 4,
        "notes": "MCNZ registration via RMO or specialist pathway"
      }
    ],
    "expected_salary": {
      "min_annual": 60000,
      "max_annual": 95000,
      "currency": "NZD"
    },
    "pass_rates": [
      {
        "exam_name": "Nursing Council CAP (Competency Assessment Programme)",
        "pass_rate": 60,
        "source": "Estimated 2025"
      }
    ],
    "competitiveness_rating": "medium",
    "language_course_required": false
  },
  {
    "name": "Sweden — Socialstyrelsen Nursing",
    "category": "nurse",
    "path_type": "migration",
    "target_country": "Sweden",
    "description": "Swedish nursing licensing via Socialstyrelsen — language and competency assessment for IENs.",
    "required_exams": [
      {
        "name": "Swedish Nursing Knowledge Exam",
        "official_link": "https://www.socialstyrelsen.se",
        "format": "computer",
        "cost_usd": 400,
        "retake_policy": "Max 2 attempts"
      },
      {
        "name": "Clinical Training Assessment",
        "official_link": "https://www.socialstyrelsen.se",
        "format": "practical",
        "cost_usd": 0,
        "retake_policy": "Per enrolment"
      }
    ],
    "required_language_tests": [
      {
        "language": "Swedish",
        "test_name": "TISUS / Swedex",
        "min_score": "B2",
        "official_link": "https://www.uis.se"
      }
    ],
    "total_estimated_cost_usd": 3000,
    "total_duration_months": 24,
    "content_status": "verified",
    "order": 21,
    "official_source_links": [
      "https://www.socialstyrelsen.se"
    ],
    "egypt_specific_notes": "Swedish B2 required. Growing demand for nurses.",
    "visa_info": [
      {
        "visa_type": "Work Permit for Specialists",
        "duration_years": 2,
        "processing_months": 4,
        "notes": "Socialstyrelsen licensing (legitimation) required"
      }
    ],
    "expected_salary": {
      "min_annual": 300000,
      "max_annual": 480000,
      "currency": "SEK",
      "notes": "Leg. sjuksköterska"
    },
    "pass_rates": [
      {
        "exam_name": "Swedish Nursing Knowledge Exam",
        "pass_rate": 60,
        "source": "Estimated 2025"
      },
      {
        "exam_name": "Clinical Training Assessment",
        "pass_rate": 60,
        "source": "Estimated 2025"
      }
    ],
    "competitiveness_rating": "medium",
    "language_course_required": true,
    "language_course_cost_usd": 2600,
    "language_course_duration_months": 6
  },
  {
    "name": "Norway — NOKUT Nursing",
    "category": "nurse",
    "path_type": "migration",
    "target_country": "Norway",
    "description": "Norwegian nursing licensing via NOKUT diploma assessment — high demand for IENs.",
    "required_exams": [
      {
        "name": "NOKUT Diploma Assessment",
        "official_link": "https://www.nokut.no",
        "format": "portfolio",
        "cost_usd": 400,
        "retake_policy": "Per submission"
      },
      {
        "name": "Norwegian Nursing Knowledge Test",
        "official_link": "https://www.helsedirektoratet.no",
        "format": "computer",
        "cost_usd": 400,
        "retake_policy": "Max 2 attempts"
      }
    ],
    "required_language_tests": [
      {
        "language": "Norwegian",
        "test_name": "Bergenstesten / Norskprøve",
        "min_score": "B2",
        "official_link": "https://www.kompetansenorge.no"
      }
    ],
    "total_estimated_cost_usd": 3000,
    "total_duration_months": 24,
    "content_status": "verified",
    "order": 22,
    "official_source_links": [
      "https://www.nokut.no"
    ],
    "egypt_specific_notes": "Norwegian B2 required. Growing demand, especially in rural areas.",
    "visa_info": [
      {
        "visa_type": "Work Permit — Specialist Healthcare",
        "duration_years": 3,
        "processing_months": 5,
        "notes": "Autorisation from Helsedirektoratet required"
      }
    ],
    "expected_salary": {
      "min_annual": 380000,
      "max_annual": 550000,
      "currency": "NOK"
    },
    "pass_rates": [
      {
        "exam_name": "NOKUT Diploma Assessment",
        "pass_rate": 60,
        "source": "Estimated 2025"
      },
      {
        "exam_name": "Norwegian Nursing Knowledge Test",
        "pass_rate": 60,
        "source": "Estimated 2025"
      }
    ],
    "competitiveness_rating": "medium",
    "language_course_required": true,
    "language_course_cost_usd": 3500,
    "language_course_duration_months": 6
  },
  {
    "name": "France — Nursing License (AEI)",
    "category": "nurse",
    "path_type": "migration",
    "target_country": "France",
    "description": "French nursing licensing via AEI procedure — language and diploma equivalence required.",
    "required_exams": [
      {
        "name": "French Diploma Equivalence (AEI)",
        "official_link": "https://www.enseignementsup-recherche.gouv.fr",
        "format": "portfolio",
        "cost_usd": 300,
        "retake_policy": "Per submission"
      }
    ],
    "required_language_tests": [
      {
        "language": "French",
        "test_name": "TCF / DELF",
        "min_score": "B2",
        "official_link": "https://www.ciep.fr"
      }
    ],
    "total_estimated_cost_usd": 2500,
    "total_duration_months": 18,
    "content_status": "verified",
    "order": 23,
    "official_source_links": [
      "https://www.enseignementsup-recherche.gouv.fr"
    ],
    "egypt_specific_notes": "French B2 required. Growing recruitment from Egypt for French hospitals.",
    "visa_info": [
      {
        "visa_type": "Talent Passport – EU Blue Card",
        "duration_years": 4,
        "processing_months": 3,
        "notes": "Autorisation d'exercice from Ordre des Médecins required"
      }
    ],
    "expected_salary": {
      "min_annual": 29000,
      "max_annual": 45000,
      "currency": "EUR",
      "notes": "Infirmier diplômé"
    },
    "pass_rates": [
      {
        "exam_name": "French Diploma Equivalence (AEI)",
        "pass_rate": 60,
        "source": "Estimated 2025"
      }
    ],
    "competitiveness_rating": "medium",
    "language_course_required": true,
    "language_course_cost_usd": 2500,
    "language_course_duration_months": 6
  },
  {
    "name": "International Organization Nursing (WHO/UN)",
    "category": "nurse",
    "path_type": "migration",
    "target_country": "Global/Multiple",
    "description": "Nursing advisory and program management roles with WHO, UNICEF, UNFPA — public health focus.",
    "required_exams": [],
    "required_language_tests": [],
    "total_estimated_cost_usd": 500,
    "total_duration_months": null,
    "content_status": "stub",
    "order": 24,
    "official_source_links": [
      "https://www.who.int/careers"
    ],
    "egypt_specific_notes": "MPH or relevant experience. Not exam-gated. Usually requires UN language proficiency.",
    "visa_info": [],
    "pass_rates": [],
    "competitiveness_rating": "low",
    "language_course_required": false
  },
  {
    "name": "Humanitarian Nursing (MSF, IRC, Red Cross)",
    "category": "nurse",
    "path_type": "migration",
    "target_country": "Global/Multiple",
    "description": "Field nursing in humanitarian settings — emergency response, primary care, and public health in crisis zones.",
    "required_exams": [],
    "required_language_tests": [],
    "total_estimated_cost_usd": 500,
    "total_duration_months": null,
    "content_status": "stub",
    "order": 25,
    "official_source_links": [
      "https://www.msf.org/work-msf"
    ],
    "egypt_specific_notes": "Clinical experience, language skills, and willingness to work in insecure environments required.",
    "visa_info": [],
    "pass_rates": [],
    "competitiveness_rating": "low",
    "language_course_required": false
  },
  {
    "name": "UK — NMC Pre-Registration Nursing (Adult)",
    "category": "nurse",
    "path_type": "training",
    "target_country": "United Kingdom",
    "description": "UK pre-registration nursing programme (BSc/MSc) leading to NMC registration as an adult nurse — for those who completed nursing education outside the UK.",
    "stages": [
      {
        "name": "NMC Application & Portfolio",
        "type": "application",
        "order": 1,
        "duration_months": 3,
        "description": "Submission of nursing qualification, academic transcripts, and clinical hours logbook to NMC.",
        "prerequisites": [
          "Nursing diploma/degree from recognised institution"
        ]
      },
      {
        "name": "IELTS/OET Achievement",
        "type": "exam",
        "order": 2,
        "duration_months": 3,
        "description": "Achieve IELTS 7.0 or OET B in all bands.",
        "cost_usd": 250,
        "prerequisites": [
          "NMC application"
        ]
      },
      {
        "name": "CBT (Computer-Based Test)",
        "type": "exam",
        "order": 3,
        "duration_months": 3,
        "description": "Multiple-choice test covering numeracy, literacy, and clinical knowledge for nursing.",
        "cost_usd": 150,
        "exams": [
          {
            "name": "NMC CBT",
            "format": "computer",
            "cost_usd": 150,
            "official_link": "https://www.nmc.org.uk"
          }
        ]
      },
      {
        "name": "OSCE Preparation",
        "type": "training_post",
        "order": 4,
        "duration_months": 3,
        "description": "Clinical skills preparation in simulated UK practice environment.",
        "cost_usd": 500,
        "prerequisites": [
          "CBT pass"
        ]
      },
      {
        "name": "NMC OSCE (Objective Structured Clinical Examination)",
        "type": "exam",
        "order": 5,
        "duration_months": 1,
        "description": "Practical exam testing clinical competence across 6-8 stations.",
        "cost_usd": 1000,
        "exams": [
          {
            "name": "NMC OSCE",
            "format": "practical",
            "cost_usd": 1000,
            "official_link": "https://www.nmc.org.uk"
          }
        ]
      },
      {
        "name": "NMC Registration (RN Adult)",
        "type": "application",
        "order": 6,
        "description": "Full NMC registration as an adult nurse, enabling practice in the UK.",
        "prerequisites": [
          "CBT pass",
          "OSCE pass",
          "IELTS/OET pass",
          "Health & character declaration"
        ]
      }
    ],
    "total_estimated_cost_usd": 3500,
    "total_duration_months": 18,
    "content_status": "verified",
    "order": 26,
    "official_source_links": [
      "https://www.nmc.org.uk"
    ],
    "egypt_specific_notes": "The most common route for Egyptian nurses to register in the UK. Many NHS Trusts now sponsor the OSCE fee for international recruits.",
    "visa_info": [
      {
        "visa_type": "Health and Care Worker visa (Tier 2)",
        "duration_years": 5,
        "processing_months": 3,
        "notes": "Shortage occupation — expedited processing, reduced fees"
      }
    ],
    "expected_salary": {
      "min_annual": 28000,
      "max_annual": 45000,
      "currency": "GBP",
      "notes": "Band 5-7 NHS AFC"
    },
    "pass_rates": [],
    "competitiveness_rating": "low",
    "language_course_required": false
  },
  {
    "name": "Global Health Research Nursing",
    "category": "nurse",
    "path_type": "migration",
    "target_country": "Global/Multiple",
    "description": "Research nursing roles with international health research institutes — clinical trials, epidemiological studies, and implementation research.",
    "required_exams": [],
    "required_language_tests": [],
    "total_estimated_cost_usd": 500,
    "total_duration_months": null,
    "content_status": "stub",
    "order": 27,
    "official_source_links": [],
    "egypt_specific_notes": "Research nursing and GCP (Good Clinical Practice) certification valuable.",
    "visa_info": [],
    "pass_rates": [],
    "competitiveness_rating": "low",
    "language_course_required": false
  },
  {
    "name": "Health-Tech Nursing / Nursing Informatics",
    "category": "nurse",
    "path_type": "migration",
    "target_country": "Global/Multiple",
    "description": "Clinical informatics and health-tech roles for nurses — EHR implementation, telehealth, and clinical product management.",
    "required_exams": [],
    "required_language_tests": [],
    "total_estimated_cost_usd": 500,
    "total_duration_months": null,
    "content_status": "stub",
    "order": 28,
    "official_source_links": [],
    "egypt_specific_notes": "Informatics experience and EHR knowledge valuable. Remote-friendly career.",
    "visa_info": [],
    "pass_rates": [],
    "competitiveness_rating": "low",
    "language_course_required": false
  },
  {
    "name": "Pharmaceutical/Clinical Research Nursing",
    "category": "nurse",
    "path_type": "migration",
    "target_country": "Global/Multiple",
    "description": "Clinical research nursing roles within pharmaceutical companies — clinical trial coordination and pharmacovigilance.",
    "required_exams": [],
    "required_language_tests": [],
    "total_estimated_cost_usd": 500,
    "total_duration_months": null,
    "content_status": "stub",
    "order": 29,
    "official_source_links": [],
    "egypt_specific_notes": "GCP certification required. Regional pharma hubs in Egypt and UAE.",
    "visa_info": [],
    "pass_rates": [],
    "competitiveness_rating": "low",
    "language_course_required": false
  },
  {
    "name": "UK — MRCP (Internal Medicine)",
    "category": "doctor",
    "path_type": "training",
    "target_country": "United Kingdom",
    "description": "Membership of the Royal College of Physicians — the professional qualification for physicians in the UK, required for specialty training in Internal Medicine and its sub-specialties.",
    "stages": [
      {
        "name": "Foundation Training (FY1-FY2)",
        "type": "foundation",
        "order": 1,
        "duration_months": 24,
        "description": "Two-year foundation programme after medical school, with rotations across medical and surgical specialties.",
        "prerequisites": [
          "MBBS or equivalent primary medical qualification"
        ]
      },
      {
        "name": "Internal Medicine Training (IMT1-IMT3)",
        "type": "training_post",
        "order": 2,
        "duration_months": 36,
        "description": "Core medical training with exposure to acute medicine, specialties, and out-patient clinics.",
        "cost_usd": 500,
        "prerequisites": [
          "Foundation Year completion",
          "GMC registration with licence to practise"
        ]
      },
      {
        "name": "MRCP Part 1",
        "type": "exam",
        "order": 3,
        "duration_months": 6,
        "description": "200-question multiple-choice exam covering basic sciences relevant to medical practice.",
        "cost_usd": 500,
        "exams": [
          {
            "name": "MRCP Part 1",
            "format": "computer",
            "cost_usd": 500,
            "official_link": "https://www.mrcpuk.org"
          }
        ]
      },
      {
        "name": "MRCP Part 2",
        "type": "exam",
        "order": 4,
        "duration_months": 6,
        "description": "200-question multiple-choice exam covering clinical medicine.",
        "cost_usd": 550,
        "exams": [
          {
            "name": "MRCP Part 2 Written",
            "format": "computer",
            "cost_usd": 550,
            "official_link": "https://www.mrcpuk.org"
          }
        ]
      },
      {
        "name": "MRCP PACES",
        "type": "exam",
        "order": 5,
        "duration_months": 6,
        "description": "Practical Assessment of Clinical Examination Skills — a five-station OSCE assessing clinical examination, communication, and diagnosis.",
        "cost_usd": 1200,
        "exams": [
          {
            "name": "MRCP PACES",
            "format": "practical",
            "cost_usd": 1200,
            "official_link": "https://www.mrcpuk.org"
          }
        ]
      },
      {
        "name": "Specialty Training (ST3-ST7)",
        "type": "training_post",
        "order": 6,
        "duration_months": 60,
        "description": "Advanced training in chosen internal medicine sub-specialty (cardiology, gastroenterology, respiratory, etc.).",
        "prerequisites": [
          "MRCP full diploma",
          "GMC registration"
        ]
      },
      {
        "name": "Certificate of Completion of Training (CCT)",
        "type": "application",
        "order": 7,
        "description": "Final certification confirming completion of specialty training, enabling specialist registration with the GMC.",
        "prerequisites": [
          "Completion of ST6+",
          "MRCP diploma",
          "ARCP sign-off"
        ]
      }
    ],
    "total_estimated_cost_usd": 3500,
    "total_duration_months": 96,
    "content_status": "verified",
    "order": 27,
    "official_source_links": [
      "https://www.mrcpuk.org",
      "https://www.jrcptb.org.uk"
    ],
    "egypt_specific_notes": "This is the UK graduate training route. Egyptian IMGs typically take the PLAB route first, then apply for equivalence.",
    "visa_info": [
      {
        "visa_type": "Health and Care Worker visa (Tier 2)",
        "duration_years": 5,
        "processing_months": 3,
        "notes": "Shortage occupation — expedited processing, reduced fees"
      }
    ],
    "expected_salary": {
      "min_annual": 65000,
      "max_annual": 120000,
      "currency": "GBP",
      "notes": "NHS Consultant £105K+; locum rates potentially higher"
    },
    "pass_rates": [],
    "competitiveness_rating": "high",
    "language_course_required": false
  },
  {
    "name": "UK — MRCS (Surgery)",
    "category": "doctor",
    "path_type": "training",
    "target_country": "United Kingdom",
    "description": "Membership of the Royal College of Surgeons — the gateway qualification for all surgical specialties (general surgery, orthopaedics, ENT, urology, etc.).",
    "stages": [
      {
        "name": "Foundation Training (FY1-FY2)",
        "type": "foundation",
        "order": 1,
        "duration_months": 24,
        "description": "Two-year foundation programme with surgical rotations.",
        "prerequisites": [
          "MBBS or equivalent"
        ]
      },
      {
        "name": "Core Surgical Training (CT1-CT2)",
        "type": "training_post",
        "order": 2,
        "duration_months": 24,
        "description": "Two-year programme in basic surgical skills, emergency surgery, and theatre experience.",
        "cost_usd": 500,
        "prerequisites": [
          "Foundation completion",
          "GMC registration"
        ]
      },
      {
        "name": "MRCS Part A",
        "type": "exam",
        "order": 3,
        "duration_months": 6,
        "description": "Applied basic sciences and principles of surgery in written format.",
        "cost_usd": 450,
        "exams": [
          {
            "name": "MRCS Part A",
            "format": "computer",
            "cost_usd": 450,
            "official_link": "https://www.rcseng.ac.uk"
          }
        ]
      },
      {
        "name": "MRCS Part B (OSCE)",
        "type": "exam",
        "order": 4,
        "duration_months": 6,
        "description": "Objective Structured Clinical Examination testing surgical skills, anatomy, and communication.",
        "cost_usd": 1000,
        "exams": [
          {
            "name": "MRCS Part B",
            "format": "practical",
            "cost_usd": 1000,
            "official_link": "https://www.rcseng.ac.uk"
          }
        ]
      },
      {
        "name": "Specialty Training (ST3-ST8)",
        "type": "training_post",
        "order": 5,
        "duration_months": 72,
        "description": "Higher surgical training in chosen specialty (general surgery, orthopaedics, neurosurgery, etc.).",
        "prerequisites": [
          "MRCS diploma",
          "Core Surgical Training completion"
        ]
      },
      {
        "name": "Certificate of Completion of Training (CCT)",
        "type": "application",
        "order": 6,
        "description": "Final certification as a consultant surgeon.",
        "prerequisites": [
          "ST8 completion",
          "MRCS",
          "ARCP sign-off"
        ]
      }
    ],
    "total_estimated_cost_usd": 3000,
    "total_duration_months": 108,
    "content_status": "verified",
    "order": 28,
    "official_source_links": [
      "https://www.rcseng.ac.uk",
      "https://www.iscp.ac.uk"
    ],
    "egypt_specific_notes": "UK surgical training pathway for UK graduates. IMGs should pursue PLAB then apply for equivalency.",
    "visa_info": [
      {
        "visa_type": "Health and Care Worker visa (Tier 2)",
        "duration_years": 5,
        "processing_months": 3,
        "notes": "Shortage occupation — expedited processing, reduced fees"
      }
    ],
    "expected_salary": {
      "min_annual": 65000,
      "max_annual": 120000,
      "currency": "GBP",
      "notes": "NHS Consultant £105K+; locum rates potentially higher"
    },
    "pass_rates": [],
    "competitiveness_rating": "high",
    "language_course_required": false
  },
  {
    "name": "UK — MRCPCH (Paediatrics)",
    "category": "doctor",
    "path_type": "training",
    "target_country": "United Kingdom",
    "description": "Membership of the Royal College of Paediatrics and Child Health — the specialist qualification for paediatric training in the UK.",
    "stages": [
      {
        "name": "Foundation Training (FY1-FY2)",
        "type": "foundation",
        "order": 1,
        "duration_months": 24,
        "description": "Foundation programme with paediatric rotations.",
        "prerequisites": [
          "MBBS"
        ]
      },
      {
        "name": "Paediatric Specialty Training (ST1-ST2)",
        "type": "training_post",
        "order": 2,
        "duration_months": 24,
        "description": "Core paediatric training in general paediatrics and neonatal care.",
        "cost_usd": 400
      },
      {
        "name": "MRCPCH Part 1 (Foundation of Practice)",
        "type": "exam",
        "order": 3,
        "duration_months": 6,
        "description": "Written exam covering basic sciences and clinical paediatrics.",
        "cost_usd": 450,
        "exams": [
          {
            "name": "MRCPCH Foundation of Practice",
            "format": "computer",
            "cost_usd": 450,
            "official_link": "https://www.rcpch.ac.uk"
          }
        ]
      },
      {
        "name": "MRCPCH Part 2 (Theory and Science)",
        "type": "exam",
        "order": 4,
        "duration_months": 6,
        "description": "Applied clinical knowledge and evidence-based paediatrics.",
        "cost_usd": 500,
        "exams": [
          {
            "name": "MRCPCH Theory and Science",
            "format": "computer",
            "cost_usd": 500,
            "official_link": "https://www.rcpch.ac.uk"
          }
        ]
      },
      {
        "name": "MRCPCH Clinical Examination",
        "type": "exam",
        "order": 5,
        "duration_months": 6,
        "description": "Practical clinical examination assessing paediatric assessment skills.",
        "cost_usd": 1100,
        "exams": [
          {
            "name": "MRCPCH Clinical",
            "format": "practical",
            "cost_usd": 1100,
            "official_link": "https://www.rcpch.ac.uk"
          }
        ]
      },
      {
        "name": "Specialty Training (ST3-ST8)",
        "type": "training_post",
        "order": 6,
        "duration_months": 72,
        "description": "Advanced training in paediatric sub-specialties (neonatology, cardiology, neurology, etc.).",
        "prerequisites": [
          "MRCPCH",
          "GMC registration"
        ]
      },
      {
        "name": "CCT in Paediatrics",
        "type": "application",
        "order": 7,
        "description": "Certificate of Completion of Training.",
        "prerequisites": [
          "ST8 completion",
          "MRCPCH"
        ]
      }
    ],
    "total_estimated_cost_usd": 3500,
    "total_duration_months": 108,
    "content_status": "verified",
    "order": 29,
    "official_source_links": [
      "https://www.rcpch.ac.uk"
    ],
    "egypt_specific_notes": "UK paediatric training pathway. IMGs require GMC registration via PLAB first.",
    "visa_info": [
      {
        "visa_type": "Health and Care Worker visa (Tier 2)",
        "duration_years": 5,
        "processing_months": 3,
        "notes": "Shortage occupation — expedited processing, reduced fees"
      }
    ],
    "expected_salary": {
      "min_annual": 65000,
      "max_annual": 120000,
      "currency": "GBP",
      "notes": "NHS Consultant £105K+; locum rates potentially higher"
    },
    "pass_rates": [],
    "competitiveness_rating": "high",
    "language_course_required": false
  },
  {
    "name": "UK — MRCGP (General Practice)",
    "category": "doctor",
    "path_type": "training",
    "target_country": "United Kingdom",
    "description": "Membership of the Royal College of General Practitioners — the qualification for UK general practice (family medicine).",
    "stages": [
      {
        "name": "Foundation Training (FY1-FY2)",
        "type": "foundation",
        "order": 1,
        "duration_months": 24,
        "description": "Foundation programme with GP and community rotations.",
        "prerequisites": [
          "MBBS"
        ]
      },
      {
        "name": "GP Specialty Training (GPST1-GPST3)",
        "type": "training_post",
        "order": 2,
        "duration_months": 36,
        "description": "Three-year programme with 18 months in GP practice and 18 months in hospital posts.",
        "cost_usd": 500,
        "prerequisites": [
          "Foundation completion",
          "GMC registration"
        ]
      },
      {
        "name": "MRCGP Applied Knowledge Test (AKT)",
        "type": "exam",
        "order": 3,
        "duration_months": 6,
        "description": "200-question MCQ testing clinical knowledge applied to primary care.",
        "cost_usd": 450,
        "exams": [
          {
            "name": "MRCGP AKT",
            "format": "computer",
            "cost_usd": 450,
            "official_link": "https://www.rcgp.org.uk"
          }
        ]
      },
      {
        "name": "MRCGP Clinical Skills Assessment (CSA)",
        "type": "exam",
        "order": 4,
        "duration_months": 6,
        "description": "OSCE-style assessment of consultation skills across 13 cases.",
        "cost_usd": 1200,
        "exams": [
          {
            "name": "MRCGP CSA",
            "format": "practical",
            "cost_usd": 1200,
            "official_link": "https://www.rcgp.org.uk"
          }
        ]
      },
      {
        "name": "MRCGP Record of Competence (RCA)",
        "type": "exam",
        "order": 5,
        "duration_months": 6,
        "description": "Workplace-based assessment portfolio demonstrating competence across GP curriculum.",
        "cost_usd": 500,
        "exams": [
          {
            "name": "MRCGP RCA",
            "format": "portfolio",
            "cost_usd": 500,
            "official_link": "https://www.rcgp.org.uk"
          }
        ]
      },
      {
        "name": "CCT in General Practice",
        "type": "application",
        "order": 6,
        "description": "Certificate of Completion of Training — enables entry onto the GP Register with the GMC.",
        "prerequisites": [
          "GPST3 completion",
          "AKT",
          "CSA",
          "RCA"
        ]
      }
    ],
    "total_estimated_cost_usd": 3500,
    "total_duration_months": 60,
    "content_status": "verified",
    "order": 30,
    "official_source_links": [
      "https://www.rcgp.org.uk"
    ],
    "egypt_specific_notes": "UK GP training route. IMGs need GMC registration. MRCGP is recognised in some Commonwealth countries.",
    "visa_info": [
      {
        "visa_type": "Health and Care Worker visa (Tier 2)",
        "duration_years": 5,
        "processing_months": 3,
        "notes": "Shortage occupation — expedited processing, reduced fees"
      }
    ],
    "expected_salary": {
      "min_annual": 65000,
      "max_annual": 120000,
      "currency": "GBP",
      "notes": "NHS Consultant £105K+; locum rates potentially higher"
    },
    "pass_rates": [],
    "competitiveness_rating": "low",
    "language_course_required": false
  },
  {
    "name": "UK — MRCPath (Pathology)",
    "category": "doctor",
    "path_type": "training",
    "target_country": "United Kingdom",
    "description": "Membership/Fellowship of the Royal College of Pathologists — for histopathology, haematology, microbiology, chemical pathology, and forensic pathology.",
    "stages": [
      {
        "name": "Foundation Training (FY1-FY2)",
        "type": "foundation",
        "order": 1,
        "duration_months": 24,
        "description": "Foundation programme with laboratory medicine exposure.",
        "prerequisites": [
          "MBBS"
        ]
      },
      {
        "name": "Specialty Training (ST1)",
        "type": "training_post",
        "order": 2,
        "duration_months": 12,
        "description": "Introductory year in pathology with rotations across labs.",
        "prerequisites": [
          "Foundation completion"
        ]
      },
      {
        "name": "FRCPath Part 1",
        "type": "exam",
        "order": 3,
        "duration_months": 12,
        "description": "Written exam covering basic pathology sciences and principles.",
        "cost_usd": 600,
        "exams": [
          {
            "name": "FRCPath Part 1",
            "format": "computer",
            "cost_usd": 600,
            "official_link": "https://www.rcpath.org"
          }
        ]
      },
      {
        "name": "Specialty Training (ST2-ST5)",
        "type": "training_post",
        "order": 4,
        "duration_months": 48,
        "description": "Intermediate and higher training in chosen pathology sub-specialty.",
        "cost_usd": 400,
        "prerequisites": [
          "FRCPath Part 1"
        ]
      },
      {
        "name": "FRCPath Part 2",
        "type": "exam",
        "order": 5,
        "duration_months": 12,
        "description": "Portfolio-based assessment, practical exams, and dissertation in chosen pathology specialty.",
        "cost_usd": 1200,
        "exams": [
          {
            "name": "FRCPath Part 2",
            "format": "practical",
            "cost_usd": 1200,
            "official_link": "https://www.rcpath.org"
          }
        ]
      },
      {
        "name": "CCT in Pathology",
        "type": "application",
        "order": 6,
        "description": "Certificate of Completion of Training.",
        "prerequisites": [
          "ST5 completion",
          "FRCPath"
        ]
      }
    ],
    "total_estimated_cost_usd": 3000,
    "total_duration_months": 108,
    "content_status": "verified",
    "order": 31,
    "official_source_links": [
      "https://www.rcpath.org"
    ],
    "egypt_specific_notes": "UK pathology training. IMGs need GMC registration. Egypt-trained pathologists may get reduced training.",
    "visa_info": [
      {
        "visa_type": "Health and Care Worker visa (Tier 2)",
        "duration_years": 5,
        "processing_months": 3,
        "notes": "Shortage occupation — expedited processing, reduced fees"
      }
    ],
    "expected_salary": {
      "min_annual": 65000,
      "max_annual": 120000,
      "currency": "GBP",
      "notes": "NHS Consultant £105K+; locum rates potentially higher"
    },
    "pass_rates": [],
    "competitiveness_rating": "high",
    "language_course_required": false
  },
  {
    "name": "UK — FRCR (Radiology)",
    "category": "doctor",
    "path_type": "training",
    "target_country": "United Kingdom",
    "description": "Fellowship of the Royal College of Radiologists — for clinical radiology and clinical oncology training.",
    "stages": [
      {
        "name": "Foundation Training (FY1-FY2)",
        "type": "foundation",
        "order": 1,
        "duration_months": 24,
        "description": "Foundation programme with radiology exposure.",
        "prerequisites": [
          "MBBS"
        ]
      },
      {
        "name": "Clinical Radiology Training (ST1)",
        "type": "training_post",
        "order": 2,
        "duration_months": 12,
        "description": "First year of radiology training with basic reporting and imaging skills.",
        "prerequisites": [
          "Foundation completion"
        ]
      },
      {
        "name": "FRCR Part 1",
        "type": "exam",
        "order": 3,
        "duration_months": 6,
        "description": "Physics and anatomy written examination.",
        "cost_usd": 500,
        "exams": [
          {
            "name": "FRCR Part 1",
            "format": "computer",
            "cost_usd": 500,
            "official_link": "https://www.rcr.ac.uk"
          }
        ]
      },
      {
        "name": "FRCR Part 2A",
        "type": "exam",
        "order": 4,
        "duration_months": 6,
        "description": "Written exam covering all radiological systems and pathologies.",
        "cost_usd": 600,
        "exams": [
          {
            "name": "FRCR Part 2A",
            "format": "computer",
            "cost_usd": 600,
            "official_link": "https://www.rcr.ac.uk"
          }
        ]
      },
      {
        "name": "FRCR Part 2B (Rapid Reporting + OSCE)",
        "type": "exam",
        "order": 5,
        "duration_months": 6,
        "description": "Practical exam: rapid reporting of 20 cases and 8 OSCE stations.",
        "cost_usd": 1300,
        "exams": [
          {
            "name": "FRCR Part 2B",
            "format": "practical",
            "cost_usd": 1300,
            "official_link": "https://www.rcr.ac.uk"
          }
        ]
      },
      {
        "name": "Advanced Training (ST5-ST7)",
        "type": "training_post",
        "order": 6,
        "duration_months": 36,
        "description": "Sub-specialty training in neuroradiology, interventional radiology, paediatrics, etc.",
        "prerequisites": [
          "FRCR",
          "ST1-ST4 completion"
        ]
      },
      {
        "name": "CCT in Clinical Radiology",
        "type": "application",
        "order": 7,
        "description": "Certificate of Completion of Training.",
        "prerequisites": [
          "ST7 completion",
          "FRCR"
        ]
      }
    ],
    "total_estimated_cost_usd": 3500,
    "total_duration_months": 108,
    "content_status": "verified",
    "order": 32,
    "official_source_links": [
      "https://www.rcr.ac.uk"
    ],
    "egypt_specific_notes": "UK radiology training. Highly competitive. IMGs require GMC registration.",
    "visa_info": [
      {
        "visa_type": "Health and Care Worker visa (Tier 2)",
        "duration_years": 5,
        "processing_months": 3,
        "notes": "Shortage occupation — expedited processing, reduced fees"
      }
    ],
    "expected_salary": {
      "min_annual": 65000,
      "max_annual": 120000,
      "currency": "GBP",
      "notes": "NHS Consultant £105K+; locum rates potentially higher"
    },
    "pass_rates": [],
    "competitiveness_rating": "high",
    "language_course_required": false
  },
  {
    "name": "UK — FRCA (Anaesthetics)",
    "category": "doctor",
    "path_type": "training",
    "target_country": "United Kingdom",
    "description": "Fellowship of the Royal College of Anaesthetists — the professional qualification for anaesthesia, intensive care, and pain medicine.",
    "stages": [
      {
        "name": "Foundation Training (FY1-FY2)",
        "type": "foundation",
        "order": 1,
        "duration_months": 24,
        "description": "Foundation programme with anaesthetics and ICU rotations.",
        "prerequisites": [
          "MBBS"
        ]
      },
      {
        "name": "Core Anaesthesia Training (CT1-CT2)",
        "type": "training_post",
        "order": 2,
        "duration_months": 24,
        "description": "Basic anaesthesia training in theatre, ICU, and emergency settings.",
        "cost_usd": 400,
        "prerequisites": [
          "Foundation completion"
        ]
      },
      {
        "name": "Primary FRCA",
        "type": "exam",
        "order": 3,
        "duration_months": 12,
        "description": "MCQ and OSCE covering physics, pharmacology, physiology, and basic anaesthesia.",
        "cost_usd": 900,
        "exams": [
          {
            "name": "Primary FRCA MCQ",
            "format": "computer",
            "cost_usd": 450,
            "official_link": "https://www.rcoa.ac.uk"
          },
          {
            "name": "Primary FRCA OSCE",
            "format": "practical",
            "cost_usd": 450,
            "official_link": "https://www.rcoa.ac.uk"
          }
        ]
      },
      {
        "name": "Intermediate Training (ST3-ST4)",
        "type": "training_post",
        "order": 4,
        "duration_months": 24,
        "description": "Advanced anaesthesia training with subspecialty exposure.",
        "prerequisites": [
          "Primary FRCA",
          "CT2 completion"
        ]
      },
      {
        "name": "Final FRCA",
        "type": "exam",
        "order": 5,
        "duration_months": 12,
        "description": "Written and practical exam covering all aspects of anaesthesia, ICU, and pain.",
        "cost_usd": 1000,
        "exams": [
          {
            "name": "Final FRCA Written",
            "format": "computer",
            "cost_usd": 500,
            "official_link": "https://www.rcoa.ac.uk"
          },
          {
            "name": "Final FRCA SOE",
            "format": "oral",
            "cost_usd": 500,
            "official_link": "https://www.rcoa.ac.uk"
          }
        ]
      },
      {
        "name": "Advanced Training (ST5-ST7)",
        "type": "training_post",
        "order": 6,
        "duration_months": 36,
        "description": "Higher training in anaesthesia with optional dual CCT in ICM.",
        "prerequisites": [
          "Final FRCA"
        ]
      },
      {
        "name": "CCT in Anaesthetics",
        "type": "application",
        "order": 7,
        "description": "Certificate of Completion of Training.",
        "prerequisites": [
          "ST7 completion",
          "FRCA"
        ]
      }
    ],
    "total_estimated_cost_usd": 3500,
    "total_duration_months": 108,
    "content_status": "verified",
    "order": 33,
    "official_source_links": [
      "https://www.rcoa.ac.uk"
    ],
    "egypt_specific_notes": "UK anaesthetics training. IMGs should have PLAB + GMC registration first.",
    "visa_info": [
      {
        "visa_type": "Health and Care Worker visa (Tier 2)",
        "duration_years": 5,
        "processing_months": 3,
        "notes": "Shortage occupation — expedited processing, reduced fees"
      }
    ],
    "expected_salary": {
      "min_annual": 65000,
      "max_annual": 120000,
      "currency": "GBP",
      "notes": "NHS Consultant £105K+; locum rates potentially higher"
    },
    "pass_rates": [],
    "competitiveness_rating": "high",
    "language_course_required": false
  },
  {
    "name": "UK — MRCOG (Obstetrics & Gynaecology)",
    "category": "doctor",
    "path_type": "training",
    "target_country": "United Kingdom",
    "description": "Membership of the Royal College of Obstetricians and Gynaecologists — the specialist qualification for O&G training in the UK.",
    "stages": [
      {
        "name": "Foundation Training (FY1-FY2)",
        "type": "foundation",
        "order": 1,
        "duration_months": 24,
        "description": "Foundation programme with O&G rotations.",
        "prerequisites": [
          "MBBS"
        ]
      },
      {
        "name": "Core O&G Training (ST1-ST2)",
        "type": "training_post",
        "order": 2,
        "duration_months": 24,
        "description": "Basic training in obstetrics, gynaecology, and reproductive medicine.",
        "cost_usd": 400,
        "prerequisites": [
          "Foundation completion"
        ]
      },
      {
        "name": "MRCOG Part 1",
        "type": "exam",
        "order": 3,
        "duration_months": 6,
        "description": "Written exam covering basic sciences relevant to O&G.",
        "cost_usd": 450,
        "exams": [
          {
            "name": "MRCOG Part 1",
            "format": "computer",
            "cost_usd": 450,
            "official_link": "https://www.rcog.org.uk"
          }
        ]
      },
      {
        "name": "MRCOG Part 2",
        "type": "exam",
        "order": 4,
        "duration_months": 6,
        "description": "Written exam on clinical O&G knowledge and evidence-based practice.",
        "cost_usd": 550,
        "exams": [
          {
            "name": "MRCOG Part 2",
            "format": "computer",
            "cost_usd": 550,
            "official_link": "https://www.rcog.org.uk"
          }
        ]
      },
      {
        "name": "MRCOG OSCE",
        "type": "exam",
        "order": 5,
        "duration_months": 6,
        "description": "Objective Structured Clinical Examination with 8 stations.",
        "cost_usd": 1200,
        "exams": [
          {
            "name": "MRCOG OSCE",
            "format": "practical",
            "cost_usd": 1200,
            "official_link": "https://www.rcog.org.uk"
          }
        ]
      },
      {
        "name": "Advanced Training (ST3-ST7)",
        "type": "training_post",
        "order": 6,
        "duration_months": 60,
        "description": "Sub-specialty training in maternal-fetal medicine, gynae-oncology, reproductive medicine, or urogynaecology.",
        "prerequisites": [
          "MRCOG"
        ]
      },
      {
        "name": "CCT in O&G",
        "type": "application",
        "order": 7,
        "description": "Certificate of Completion of Training.",
        "prerequisites": [
          "ST7 completion",
          "MRCOG"
        ]
      }
    ],
    "total_estimated_cost_usd": 3500,
    "total_duration_months": 108,
    "content_status": "verified",
    "order": 34,
    "official_source_links": [
      "https://www.rcog.org.uk"
    ],
    "egypt_specific_notes": "UK O&G training. MRCOG is also recognised in the Middle East and Australia.",
    "visa_info": [
      {
        "visa_type": "Health and Care Worker visa (Tier 2)",
        "duration_years": 5,
        "processing_months": 3,
        "notes": "Shortage occupation — expedited processing, reduced fees"
      }
    ],
    "expected_salary": {
      "min_annual": 65000,
      "max_annual": 120000,
      "currency": "GBP",
      "notes": "NHS Consultant £105K+; locum rates potentially higher"
    },
    "pass_rates": [],
    "competitiveness_rating": "high",
    "language_course_required": false
  },
  {
    "name": "UK — MFPH (Public Health)",
    "category": "doctor",
    "path_type": "training",
    "target_country": "United Kingdom",
    "description": "Membership of the Faculty of Public Health — the specialist qualification for public health consultants and specialists in the UK.",
    "stages": [
      {
        "name": "Foundation Training (FY1-FY2)",
        "type": "foundation",
        "order": 1,
        "duration_months": 24,
        "description": "Foundation programme (can include public health placements).",
        "prerequisites": [
          "MBBS"
        ]
      },
      {
        "name": "Public Health Specialty Training (ST1-ST4)",
        "type": "training_post",
        "order": 2,
        "duration_months": 48,
        "description": "Four-year training programme in public health practice, epidemiology, and health policy.",
        "cost_usd": 500,
        "prerequisites": [
          "Foundation completion",
          "GMC registration",
          "MFPH Part A recommended"
        ]
      },
      {
        "name": "MFPH Part A",
        "type": "exam",
        "order": 3,
        "duration_months": 6,
        "description": "Written exam covering epidemiology, statistics, health economics, and public health sciences.",
        "cost_usd": 600,
        "exams": [
          {
            "name": "MFPH Part A",
            "format": "computer",
            "cost_usd": 600,
            "official_link": "https://www.fph.org.uk"
          }
        ]
      },
      {
        "name": "MFPH Part B",
        "type": "exam",
        "order": 4,
        "duration_months": 12,
        "description": "Portfolio-based assessment including audit, research, teaching, and management competencies.",
        "cost_usd": 800,
        "exams": [
          {
            "name": "MFPH Part B",
            "format": "portfolio",
            "cost_usd": 800,
            "official_link": "https://www.fph.org.uk"
          }
        ]
      },
      {
        "name": "CCT in Public Health",
        "type": "application",
        "order": 5,
        "description": "Certificate of Completion of Training, leading to UK Specialist Register entry.",
        "prerequisites": [
          "ST5 completion",
          "MFPH Part A + B",
          "ARCP sign-off"
        ]
      }
    ],
    "total_estimated_cost_usd": 2500,
    "total_duration_months": 72,
    "content_status": "verified",
    "order": 35,
    "official_source_links": [
      "https://www.fph.org.uk"
    ],
    "egypt_specific_notes": "Open to doctors and non-medical graduates (with relevant MSc). IMGs need GMC registration.",
    "visa_info": [
      {
        "visa_type": "Health and Care Worker visa (Tier 2)",
        "duration_years": 5,
        "processing_months": 3,
        "notes": "Shortage occupation — expedited processing, reduced fees"
      }
    ],
    "expected_salary": {
      "min_annual": 65000,
      "max_annual": 120000,
      "currency": "GBP",
      "notes": "NHS Consultant £105K+; locum rates potentially higher"
    },
    "pass_rates": [],
    "competitiveness_rating": "low",
    "language_course_required": false
  },
  {
    "name": "UK — MRCPsych (Psychiatry)",
    "category": "doctor",
    "path_type": "training",
    "target_country": "United Kingdom",
    "description": "Membership of the Royal College of Psychiatrists — the specialist qualification for psychiatric training in the UK.",
    "stages": [
      {
        "name": "Foundation Training (FY1-FY2)",
        "type": "foundation",
        "order": 1,
        "duration_months": 24,
        "description": "Foundation programme with psychiatry placements.",
        "prerequisites": [
          "MBBS"
        ]
      },
      {
        "name": "Core Psychiatry Training (CT1-CT3)",
        "type": "training_post",
        "order": 2,
        "duration_months": 36,
        "description": "Three-year core training across general adult, old age, child & adolescent, forensic, and learning disability psychiatry.",
        "cost_usd": 500,
        "prerequisites": [
          "Foundation completion",
          "GMC registration"
        ]
      },
      {
        "name": "MRCPsych Part A",
        "type": "exam",
        "order": 3,
        "duration_months": 6,
        "description": "Written exam covering basic sciences, psychopathology, and psychiatric principles.",
        "cost_usd": 450,
        "exams": [
          {
            "name": "MRCPsych Part A",
            "format": "computer",
            "cost_usd": 450,
            "official_link": "https://www.rcpsych.ac.uk"
          }
        ]
      },
      {
        "name": "MRCPsych Part B",
        "type": "exam",
        "order": 4,
        "duration_months": 6,
        "description": "Written exam on clinical psychiatry, treatment approaches, and evidence-based practice.",
        "cost_usd": 550,
        "exams": [
          {
            "name": "MRCPsych Part B",
            "format": "computer",
            "cost_usd": 550,
            "official_link": "https://www.rcpsych.ac.uk"
          }
        ]
      },
      {
        "name": "MRCPsych CASC",
        "type": "exam",
        "order": 5,
        "duration_months": 6,
        "description": "Clinical Assessment of Skills and Competencies — a 12-station OSCE.",
        "cost_usd": 1200,
        "exams": [
          {
            "name": "MRCPsych CASC",
            "format": "practical",
            "cost_usd": 1200,
            "official_link": "https://www.rcpsych.ac.uk"
          }
        ]
      },
      {
        "name": "Advanced Training (ST4-ST6)",
        "type": "training_post",
        "order": 6,
        "duration_months": 36,
        "description": "Sub-specialty training in chosen area (child, forensic, old age, psychotherapy, etc.).",
        "prerequisites": [
          "MRCPsych",
          "Core Training completion"
        ]
      },
      {
        "name": "CCT in Psychiatry",
        "type": "application",
        "order": 7,
        "description": "Certificate of Completion of Training.",
        "prerequisites": [
          "ST6 completion",
          "MRCPsych"
        ]
      }
    ],
    "total_estimated_cost_usd": 3500,
    "total_duration_months": 96,
    "content_status": "verified",
    "order": 36,
    "official_source_links": [
      "https://www.rcpsych.ac.uk"
    ],
    "egypt_specific_notes": "UK psychiatry training. IMGs should obtain GMC registration via PLAB. MRCPsych is highly valued internationally.",
    "visa_info": [
      {
        "visa_type": "Health and Care Worker visa (Tier 2)",
        "duration_years": 5,
        "processing_months": 3,
        "notes": "Shortage occupation — expedited processing, reduced fees"
      }
    ],
    "expected_salary": {
      "min_annual": 65000,
      "max_annual": 120000,
      "currency": "GBP",
      "notes": "NHS Consultant £105K+; locum rates potentially higher"
    },
    "pass_rates": [],
    "competitiveness_rating": "high",
    "language_course_required": false
  }
];
