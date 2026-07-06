/*
  Seed lessons — 3 per branch, each with embedded resources.
  Branch _ids are filled in at seed time by run.js.
*/
export const seedLessons = [
  // ── Cardiology: Interventional Cardiology ──
  {
    branch_name: 'Interventional Cardiology',
    lessons: [
      {
        title: 'Coronary Anatomy and Angiography Views',
        description: 'Standard angiographic projections and coronary artery segmentation.',
        duration_minutes: 45,
        order: 1,
        tags: ['anatomy', 'angiography', 'coronaries'],
        resources: [
          { title: 'Coronary Angiography — Standard Projections', url: 'https://youtube.com/watch?v=example1', type: 'youtube_international', language: 'en', priority_order: 1 },
          { title: 'شرح تصوير الشرايين التاجية', url: 'https://youtube.com/watch?v=example2', type: 'youtube_egyptian', language: 'ar', priority_order: 2 },
          { title: 'SCAI Coronary Anatomy Reference', url: 'https://scai.org/coronary-anatomy', type: 'official_site', language: 'en', priority_order: 3 },
        ],
      },
      {
        title: 'Percutaneous Coronary Intervention (PCI) Basics',
        description: 'Wire techniques, balloon angioplasty, and stent deployment.',
        duration_minutes: 60,
        order: 2,
        tags: ['pci', 'stent', 'angioplasty'],
        resources: [
          { title: 'PCI Step by Step — TCTMD', url: 'https://youtube.com/watch?v=example3', type: 'youtube_international', language: 'en', priority_order: 1 },
          { title: 'دليل تركيب الدعامات التاجية', url: 'https://youtube.com/watch?v=example4', type: 'youtube_egyptian', language: 'ar', priority_order: 2 },
          { title: 'ESC PCI Guidelines', url: 'https://academic.oup.com/eurheartj/article/43/22/2062/6516742', type: 'pdf', language: 'en', priority_order: 3 },
        ],
      },
      {
        title: 'Complications of PCI and Management',
        description: 'No-reflow, perforation, dissection, and access-site complications.',
        duration_minutes: 50,
        order: 3,
        tags: ['complications', 'pci', 'management'],
        resources: [
          { title: 'Managing PCI Complications — Radcliffe Cardiology', url: 'https://www.radcliffecardiology.com/pci-complications', type: 'official_site', language: 'en', priority_order: 1 },
          { title: 'مجموعة مناقشات مضاعفات القسطرة', url: 'https://t.me/example_cardio', type: 'telegram_channel', language: 'ar', priority_order: 2 },
        ],
      },
    ],
  },

  // ── Cardiology: Electrophysiology ──
  {
    branch_name: 'Electrophysiology',
    lessons: [
      {
        title: 'Basic ECG Interpretation',
        description: 'Systematic approach to reading 12-lead ECGs.',
        duration_minutes: 40,
        order: 1,
        tags: ['ecg', 'interpretation', 'basics'],
        resources: [
          { title: 'ECG Interpretation Made Easy', url: 'https://youtube.com/watch?v=example5', type: 'youtube_international', language: 'en', priority_order: 1 },
          { title: 'تفسير رسم القلب الكهربائي', url: 'https://youtube.com/watch?v=example6', type: 'youtube_egyptian', language: 'ar', priority_order: 2 },
        ],
      },
      {
        title: 'Atrial Fibrillation — Mechanisms and Management',
        description: 'Pathophysiology, rate vs rhythm control, and anticoagulation.',
        duration_minutes: 55,
        order: 2,
        tags: ['afib', 'arrhythmia', 'anticoagulation'],
        resources: [
          { title: 'AFib Management — EHRA Guidelines', url: 'https://academic.oup.com/europace/article/23/10/1612/6315111', type: 'pdf', language: 'en', priority_order: 1 },
          { title: 'الرجفان الأذيني — أحدث التوصيات', url: 'https://youtube.com/watch?v=example7', type: 'youtube_egyptian', language: 'ar', priority_order: 2 },
          { title: 'ESC Atrial Fibrillation Guidelines', url: 'https://www.escardio.org/Guidelines/Clinical-Practice-Guidelines/Atrial-Fibrillation', type: 'official_site', language: 'en', priority_order: 3 },
        ],
      },
      {
        title: 'Antiarrhythmic Drugs — Classification and Use',
        description: 'Vaughan Williams classification, indications, and side effects.',
        duration_minutes: 45,
        order: 3,
        tags: ['aad', 'pharmacology', 'arrhythmia'],
        resources: [
          { title: 'Antiarrhythmic Drugs — Osmosis', url: 'https://youtube.com/watch?v=example8', type: 'youtube_international', language: 'en', priority_order: 1 },
          { title: 'قناة أدوية اضطرابات النظم', url: 'https://t.me/example_aad', type: 'telegram_channel', language: 'ar', priority_order: 2 },
        ],
      },
    ],
  },

  // ── Cardiology: Heart Failure ──
  {
    branch_name: 'Heart Failure',
    lessons: [
      {
        title: 'HFrEF — Guideline-Directed Medical Therapy',
        description: 'Stepwise initiation of beta-blockers, ACEi/ARNI, MRA, and SGLT2i.',
        duration_minutes: 60,
        order: 1,
        tags: ['hfref', 'gdmt', 'pharmacotherapy'],
        resources: [
          { title: 'GDMT for HFrEF — ACC Expert Consensus', url: 'https://youtube.com/watch?v=example9', type: 'youtube_international', language: 'en', priority_order: 1 },
          { title: 'علاج فشل القلب — بروتوكول مصري', url: 'https://youtube.com/watch?v=example10', type: 'youtube_egyptian', language: 'ar', priority_order: 2 },
          { title: 'ESC Heart Failure Guidelines', url: 'https://academic.oup.com/eurheartj/article/43/36/3423/6640643', type: 'pdf', language: 'en', priority_order: 3 },
        ],
      },
      {
        title: 'HFpEF — Diagnosis and Emerging Therapies',
        description: 'Diagnostic criteria, phenotyping, and SGLT2i evidence.',
        duration_minutes: 45,
        order: 2,
        tags: ['hfpef', 'diagnosis', 'sgli2'],
        resources: [
          { title: 'HFpEF — A Practical Approach', url: 'https://youtube.com/watch?v=example11', type: 'youtube_international', language: 'en', priority_order: 1 },
          { title: 'HFA-PEFF Diagnostic Algorithm', url: 'https://www.escardio.org/Heart-failure/Diagnosis', type: 'official_site', language: 'en', priority_order: 2 },
        ],
      },
      {
        title: 'Acute Decompensated Heart Failure — Management',
        description: 'Diuresis, vasodilators, inotropes, and monitoring.',
        duration_minutes: 50,
        order: 3,
        tags: ['adhf', 'acute', 'management'],
        resources: [
          { title: 'ADHF Management — Emergency Approach', url: 'https://youtube.com/watch?v=example12', type: 'youtube_international', language: 'en', priority_order: 1 },
          { title: 'علاج قصور القلب الحاد', url: 'https://youtube.com/watch?v=example13', type: 'youtube_egyptian', language: 'ar', priority_order: 2 },
        ],
      },
    ],
  },

  // ── General Surgery: Colorectal Surgery ──
  {
    branch_name: 'Colorectal Surgery',
    lessons: [
      {
        title: 'Colorectal Cancer — Staging and Surgical Approach',
        description: 'TNM staging, neoadjuvant therapy, and resection principles.',
        duration_minutes: 55,
        order: 1,
        tags: ['crc', 'staging', 'surgery'],
        resources: [
          { title: 'Colorectal Cancer Surgery — Principles', url: 'https://youtube.com/watch?v=example14', type: 'youtube_international', language: 'en', priority_order: 1 },
          { title: 'NCCN Colon Cancer Guidelines', url: 'https://www.nccn.org/professionals/physician_gls/pdf/colon.pdf', type: 'pdf', language: 'en', priority_order: 2 },
        ],
      },
      {
        title: 'Diverticular Disease — From Diverticulosis to Surgery',
        description: 'Pathophysiology, acute management, and elective resection.',
        duration_minutes: 45,
        order: 2,
        tags: ['diverticulitis', 'diverticulosis', 'surgery'],
        resources: [
          { title: 'Diverticulitis Management — ASCRS', url: 'https://youtube.com/watch?v=example15', type: 'youtube_international', language: 'en', priority_order: 1 },
          { title: 'جراحة الرتوج القولونية', url: 'https://youtube.com/watch?v=example16', type: 'youtube_egyptian', language: 'ar', priority_order: 2 },
        ],
      },
      {
        title: 'Anorectal Disorders — Hemorrhoids, Fissures, Fistulas',
        description: 'Diagnosis and surgical management of common anorectal conditions.',
        duration_minutes: 40,
        order: 3,
        tags: ['anorectal', 'hemorrhoids', 'fistula'],
        resources: [
          { title: 'Anorectal Surgery — Techniques', url: 'https://youtube.com/watch?v=example17', type: 'youtube_international', language: 'en', priority_order: 1 },
          { title: 'قناة جراحة الشرج والمستقيم', url: 'https://t.me/example_colorectal', type: 'telegram_channel', language: 'ar', priority_order: 2 },
        ],
      },
    ],
  },

  // ── General Surgery: Hepatobiliary Surgery ──
  {
    branch_name: 'Hepatobiliary Surgery',
    lessons: [
      {
        title: 'Laparoscopic Cholecystectomy — Step-by-Step',
        description: 'Port placement, critical view of safety, and troubleshooting.',
        duration_minutes: 50,
        order: 1,
        tags: ['cholecystectomy', 'laparoscopic', 'gallbladder'],
        resources: [
          { title: 'Laparoscopic Cholecystectomy — SAGES', url: 'https://youtube.com/watch?v=example18', type: 'youtube_international', language: 'en', priority_order: 1 },
          { title: 'استئصال المرارة بالمنظار — شرح كامل', url: 'https://youtube.com/watch?v=example19', type: 'youtube_egyptian', language: 'ar', priority_order: 2 },
          { title: 'SAGES Cholecystectomy Guidelines', url: 'https://www.sages.org/publications/guidelines/guidelines-for-the-clinical-application-of-laparoscopic-biliary-tract-surgery/', type: 'official_site', language: 'en', priority_order: 3 },
        ],
      },
      {
        title: 'Liver Anatomy and Segmental Resection',
        description: 'Couinaud segments, vascular inflow, and resection planning.',
        duration_minutes: 55,
        order: 2,
        tags: ['liver', 'anatomy', 'resection'],
        resources: [
          { title: 'Liver Segmental Anatomy — AASLD', url: 'https://youtube.com/watch?v=example20', type: 'youtube_international', language: 'en', priority_order: 1 },
          { title: 'تشريح الكبد وتقسيم كوينو', url: 'https://youtube.com/watch?v=example21', type: 'youtube_egyptian', language: 'ar', priority_order: 2 },
        ],
      },
      {
        title: 'Pancreaticoduodenectomy (Whipple) — Indications and Technique',
        description: 'Patient selection, surgical steps, and postoperative care.',
        duration_minutes: 65,
        order: 3,
        tags: ['whipple', 'pancreas', 'surgery'],
        resources: [
          { title: 'Whipple Procedure — Operative Technique', url: 'https://youtube.com/watch?v=example22', type: 'youtube_international', language: 'en', priority_order: 1 },
          { title: 'IHPBA Guidelines for Pancreatic Surgery', url: 'https://www.ihpba.org/guidelines', type: 'official_site', language: 'en', priority_order: 2 },
        ],
      },
    ],
  },

  // ── ICU / Critical Care: Adult ICU ──
  {
    branch_name: 'Adult ICU',
    lessons: [
      {
        title: 'Mechanical Ventilation — Basic Modes and Settings',
        description: 'Volume vs pressure control, PEEP, FiO2, and weaning.',
        duration_minutes: 50,
        order: 1,
        tags: ['ventilation', 'respiratory', 'icu'],
        resources: [
          { title: 'Mechanical Ventilation Basics — OpenAnesthesia', url: 'https://youtube.com/watch?v=example23', type: 'youtube_international', language: 'en', priority_order: 1 },
          { title: 'أساسيات التنفس الصناعي', url: 'https://youtube.com/watch?v=example24', type: 'youtube_egyptian', language: 'ar', priority_order: 2 },
        ],
      },
      {
        title: 'Sepsis and Septic Shock — Surviving Sepsis Campaign',
        description: 'Early recognition, fluid resuscitation, vasopressors, and antibiotics.',
        duration_minutes: 60,
        order: 2,
        tags: ['sepsis', 'shock', 'resuscitation'],
        resources: [
          { title: 'Surviving Sepsis Campaign Guidelines 2024', url: 'https://www.sccm.org/SurvivingSepsisCampaign', type: 'official_site', language: 'en', priority_order: 1 },
          { title: 'Sepsis Management — ICU Steps', url: 'https://youtube.com/watch?v=example25', type: 'youtube_international', language: 'en', priority_order: 2 },
          { title: 'بروتوكول تعفن الدم في العناية', url: 'https://t.me/example_sepsis', type: 'telegram_channel', language: 'ar', priority_order: 3 },
        ],
      },
      {
        title: 'Acute Kidney Injury in the ICU',
        description: 'KDIGO classification, fluid management, and RRT timing.',
        duration_minutes: 45,
        order: 3,
        tags: ['aki', 'kidney', 'rrt'],
        resources: [
          { title: 'AKI Management — KDIGO Guidelines', url: 'https://youtube.com/watch?v=example26', type: 'youtube_international', language: 'en', priority_order: 1 },
          { title: 'KDIGO AKI Guideline PDF', url: 'https://kdigo.org/guidelines/acute-kidney-injury/', type: 'pdf', language: 'en', priority_order: 2 },
        ],
      },
    ],
  },

  // ── ICU / Critical Care: Neonatal ICU ──
  {
    branch_name: 'Neonatal ICU',
    lessons: [
      {
        title: 'Respiratory Distress Syndrome and Surfactant Therapy',
        description: 'Pathophysiology, CPAP vs intubation, and surfactant administration.',
        duration_minutes: 50,
        order: 1,
        tags: ['rds', 'surfactant', 'preterm'],
        resources: [
          { title: 'RDS Management — Neonatal Guidelines', url: 'https://youtube.com/watch?v=example27', type: 'youtube_international', language: 'en', priority_order: 1 },
          { title: 'علاج متلازمة الضائقة التنفسية', url: 'https://youtube.com/watch?v=example28', type: 'youtube_egyptian', language: 'ar', priority_order: 2 },
        ],
      },
      {
        title: 'Neonatal Jaundice — Assessment and Treatment',
        description: 'Bilirubin chart, phototherapy, and exchange transfusion criteria.',
        duration_minutes: 40,
        order: 2,
        tags: ['jaundice', 'bilirubin', 'phototherapy'],
        resources: [
          { title: 'Neonatal Jaundice — AAP Guidelines', url: 'https://youtube.com/watch?v=example29', type: 'youtube_international', language: 'en', priority_order: 1 },
          { title: 'اليرقان الوليدي — تقييم وعلاج', url: 'https://youtube.com/watch?v=example30', type: 'youtube_egyptian', language: 'ar', priority_order: 2 },
        ],
      },
      {
        title: 'Neonatal Resuscitation Program (NRP)',
        description: 'Delivery room assessment, PPV, chest compressions, and medications.',
        duration_minutes: 60,
        order: 3,
        tags: ['resuscitation', 'nrp', 'delivery'],
        resources: [
          { title: 'NRP 2024 Guidelines — Neonatal Resuscitation', url: 'https://youtube.com/watch?v=example31', type: 'youtube_international', language: 'en', priority_order: 1 },
          { title: 'قناة إنعاش حديثي الولادة', url: 'https://t.me/example_nrp', type: 'telegram_channel', language: 'ar', priority_order: 2 },
          { title: 'Textbook of Neonatal Resuscitation (8th ed)', url: 'https://www.aap.org/nrp-textbook', type: 'official_site', language: 'en', priority_order: 3 },
        ],
      },
    ],
  },

  // ── Pediatric Nursing: General Pediatrics ──
  {
    branch_name: 'General Pediatrics',
    lessons: [
      {
        title: 'Pediatric Immunization Schedule — Egypt and WHO',
        description: 'Routine vaccines, catch-up schedules, and contraindications.',
        duration_minutes: 45,
        order: 1,
        tags: ['immunization', 'vaccines', 'schedule'],
        resources: [
          { title: 'Egyptian Vaccination Schedule — MOHP', url: 'https://youtube.com/watch?v=example32', type: 'youtube_egyptian', language: 'ar', priority_order: 1 },
          { title: 'WHO Immunization Recommendations', url: 'https://www.who.int/immunization/policy/immunization_tables/en/', type: 'official_site', language: 'en', priority_order: 2 },
        ],
      },
      {
        title: 'Common Pediatric Infections and Management',
        description: 'Otitis media, pneumonia, gastroenteritis, and UTI in children.',
        duration_minutes: 50,
        order: 2,
        tags: ['infections', 'pediatric', 'antibiotics'],
        resources: [
          { title: 'Pediatric Infections — Rational Antibiotic Use', url: 'https://youtube.com/watch?v=example33', type: 'youtube_international', language: 'en', priority_order: 1 },
          { title: 'العدوى الشائعة عند الأطفال — دليل عملي', url: 'https://youtube.com/watch?v=example34', type: 'youtube_egyptian', language: 'ar', priority_order: 2 },
        ],
      },
      {
        title: 'Growth and Development Milestones',
        description: 'WHO growth charts, developmental screening, and red flags.',
        duration_minutes: 40,
        order: 3,
        tags: ['growth', 'development', 'milestones'],
        resources: [
          { title: 'Developmental Milestones — AAP', url: 'https://youtube.com/watch?v=example35', type: 'youtube_international', language: 'en', priority_order: 1 },
          { title: 'WHO Child Growth Standards', url: 'https://www.who.int/tools/child-growth-standards', type: 'official_site', language: 'en', priority_order: 2 },
        ],
      },
    ],
  },

  // ── Pediatric Nursing: Pediatric Oncology ──
  {
    branch_name: 'Pediatric Oncology',
    lessons: [
      {
        title: 'Acute Lymphoblastic Leukemia — Diagnosis and Risk Stratification',
        description: 'Cytogenetics, immunophenotyping, and risk groups in ALL.',
        duration_minutes: 55,
        order: 1,
        tags: ['all', 'leukemia', 'pediatric-oncology'],
        resources: [
          { title: 'ALL Risk Stratification — COG', url: 'https://youtube.com/watch?v=example36', type: 'youtube_international', language: 'en', priority_order: 1 },
          { title: 'NCCN Guidelines for ALL', url: 'https://www.nccn.org/professionals/physician_gls/pdf/all.pdf', type: 'pdf', language: 'en', priority_order: 2 },
        ],
      },
      {
        title: 'Chemotherapy Side Effects and Supportive Care',
        description: 'Febrile neutropenia, mucositis, antiemetics, and growth factors.',
        duration_minutes: 50,
        order: 2,
        tags: ['chemotherapy', 'supportive-care', 'toxicity'],
        resources: [
          { title: 'Supportive Care in Pediatric Oncology', url: 'https://youtube.com/watch?v=example37', type: 'youtube_international', language: 'en', priority_order: 1 },
          { title: 'الرعاية الداعمة في علاج أورام الأطفال', url: 'https://t.me/example_ped_onc', type: 'telegram_channel', language: 'ar', priority_order: 2 },
        ],
      },
      {
        title: 'Wilms Tumor — Diagnosis and Multimodal Treatment',
        description: 'Imaging, staging, surgical approach, and chemotherapy protocols.',
        duration_minutes: 45,
        order: 3,
        tags: ['wilms', 'nephroblastoma', 'pediatric-surgery'],
        resources: [
          { title: 'Wilms Tumor Treatment — COG Protocols', url: 'https://youtube.com/watch?v=example38', type: 'youtube_international', language: 'en', priority_order: 1 },
          { title: 'SIOP Wilms Tumor Guidelines', url: 'https://www.siop-online.org/guidelines', type: 'official_site', language: 'en', priority_order: 2 },
        ],
      },
    ],
  },
];
