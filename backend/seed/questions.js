/*
  Seed questions — 3 per branch, all source: 'in_house_authored'.
  Branch _ids are filled in at seed time by run.js after specialties are created.
  The `branch_name` field is used as a lookup key to match branches by name.
*/
export const seedQuestions = [
  // ── Cardiology: Interventional Cardiology ──
  {
    branch_name: 'Interventional Cardiology',
    questions: [
      {
        question_text: 'Which artery is most commonly accessed for coronary angiography via the transradial approach?',
        question_type: 'multiple_choice',
        options: [
          { option_text: 'Radial artery', is_correct: true, order: 1 },
          { option_text: 'Femoral artery', is_correct: false, order: 2 },
          { option_text: 'Brachial artery', is_correct: false, order: 3 },
          { option_text: 'Axillary artery', is_correct: false, order: 4 },
        ],
        explanation: 'The transradial approach uses the radial artery. It is preferred over femoral for lower bleeding risk and faster ambulation.',
        difficulty: 'medium',
      },
      {
        question_text: 'What is the most common complication of percutaneous coronary intervention (PCI)?',
        question_type: 'multiple_choice',
        options: [
          { option_text: 'Myocardial infarction', is_correct: false, order: 1 },
          { option_text: 'Access site bleeding or hematoma', is_correct: true, order: 2 },
          { option_text: 'Stroke', is_correct: false, order: 3 },
          { option_text: 'Coronary perforation', is_correct: false, order: 4 },
        ],
        explanation: 'Access site complications are the most common following PCI, occurring in 2-6% of cases depending on approach.',
        difficulty: 'easy',
      },
      {
        question_text: 'Dual antiplatelet therapy (DAPT) after drug-eluting stent placement typically includes which two drugs?',
        question_type: 'multiple_choice',
        options: [
          { option_text: 'Aspirin + Clopidogrel', is_correct: true, order: 1 },
          { option_text: 'Aspirin + Warfarin', is_correct: false, order: 2 },
          { option_text: 'Clopidogrel + Heparin', is_correct: false, order: 3 },
          { option_text: 'Ticagrelor + Rivaroxaban', is_correct: false, order: 4 },
        ],
        explanation: 'DAPT with aspirin and a P2Y12 inhibitor (clopidogrel, ticagrelor, or prasugrel) is standard after DES placement to prevent stent thrombosis.',
        difficulty: 'easy',
      },
    ],
  },

  // ── Cardiology: Electrophysiology ──
  {
    branch_name: 'Electrophysiology',
    questions: [
      {
        question_text: 'Which finding on ECG is most characteristic of atrial fibrillation?',
        question_type: 'multiple_choice',
        options: [
          { option_text: 'Flutter waves', is_correct: false, order: 1 },
          { option_text: 'Absent P waves with irregularly irregular rhythm', is_correct: true, order: 2 },
          { option_text: 'Widened QRS complex', is_correct: false, order: 3 },
          { option_text: 'ST segment elevation', is_correct: false, order: 4 },
        ],
        explanation: 'Atrial fibrillation shows absent P waves replaced by fibrillatory waves with an irregularly irregular ventricular response.',
        difficulty: 'easy',
      },
      {
        question_text: 'Which class of antiarrhythmic drugs works by blocking sodium channels (fast channel blockade)?',
        question_type: 'multiple_choice',
        options: [
          { option_text: 'Class I', is_correct: true, order: 1 },
          { option_text: 'Class II', is_correct: false, order: 2 },
          { option_text: 'Class III', is_correct: false, order: 3 },
          { option_text: 'Class IV', is_correct: false, order: 4 },
        ],
        explanation: 'Class I antiarrhythmics (e.g., lidocaine, flecainide) block sodium channels, slowing conduction velocity in atrial and ventricular myocardium.',
        difficulty: 'medium',
      },
      {
        question_text: 'What is the first-line treatment for hemodynamically unstable ventricular tachycardia?',
        question_type: 'multiple_choice',
        options: [
          { option_text: 'Amiodarone IV', is_correct: false, order: 1 },
          { option_text: 'Synchronized cardioversion', is_correct: true, order: 2 },
          { option_text: 'Lidocaine bolus', is_correct: false, order: 3 },
          { option_text: 'Defibrillation (unsynchronized)', is_correct: false, order: 4 },
        ],
        explanation: 'Synchronized cardioversion is the treatment of choice for unstable VT. Unsynchronized defibrillation is used for pulseless VT/VF.',
        difficulty: 'medium',
      },
    ],
  },

  // ── Cardiology: Heart Failure ──
  {
    branch_name: 'Heart Failure',
    questions: [
      {
        question_text: 'Which of the following is a Class I recommendation for all patients with HFrEF (LVEF ≤40%)?',
        question_type: 'multiple_choice',
        options: [
          { option_text: 'Beta-blocker + ACE inhibitor/ARNI + Aldosterone antagonist', is_correct: true, order: 1 },
          { option_text: 'Digoxin monotherapy', is_correct: false, order: 2 },
          { option_text: 'Calcium channel blocker', is_correct: false, order: 3 },
          { option_text: 'Ivabradine alone', is_correct: false, order: 4 },
        ],
        explanation: 'Guideline-directed medical therapy (GDMT) for HFrEF includes beta-blockers, ACE inhibitors (or ARNI), and aldosterone antagonists.',
        difficulty: 'hard',
      },
      {
        question_text: 'What is the most common cause of heart failure with preserved ejection fraction (HFpEF)?',
        question_type: 'multiple_choice',
        options: [
          { option_text: 'Coronary artery disease', is_correct: false, order: 1 },
          { option_text: 'Hypertension', is_correct: true, order: 2 },
          { option_text: 'Valvular heart disease', is_correct: false, order: 3 },
          { option_text: 'Cardiomyopathy', is_correct: false, order: 4 },
        ],
        explanation: 'Hypertension is the most common cause of HFpEF, leading to left ventricular hypertrophy and diastolic dysfunction.',
        difficulty: 'medium',
      },
      {
        question_text: 'Which laboratory test is most important to monitor in patients on spironolactone for heart failure?',
        question_type: 'multiple_choice',
        options: [
          { option_text: 'Serum creatinine and potassium', is_correct: true, order: 1 },
          { option_text: 'Liver enzymes', is_correct: false, order: 2 },
          { option_text: 'Complete blood count', is_correct: false, order: 3 },
          { option_text: 'BNP', is_correct: false, order: 4 },
        ],
        explanation: 'Spironolactone is a potassium-sparing diuretic; hyperkalemia and renal impairment are key risks requiring monitoring of potassium and creatinine.',
        difficulty: 'easy',
      },
    ],
  },

  // ── General Surgery: Colorectal Surgery ──
  {
    branch_name: 'Colorectal Surgery',
    questions: [
      {
        question_text: 'Which of the following is the most common location for colorectal cancer?',
        question_type: 'multiple_choice',
        options: [
          { option_text: 'Cecum', is_correct: false, order: 1 },
          { option_text: 'Rectosigmoid region', is_correct: true, order: 2 },
          { option_text: 'Transverse colon', is_correct: false, order: 3 },
          { option_text: 'Ascending colon', is_correct: false, order: 4 },
        ],
        explanation: 'The rectosigmoid region is the most common site for colorectal cancer, accounting for approximately 55% of cases.',
        difficulty: 'easy',
      },
      {
        question_text: 'What is the gold standard curative treatment for stage III colon cancer?',
        question_type: 'multiple_choice',
        options: [
          { option_text: 'Colectomy with lymphadenectomy + adjuvant chemotherapy', is_correct: true, order: 1 },
          { option_text: 'Chemotherapy alone', is_correct: false, order: 2 },
          { option_text: 'Radiation therapy alone', is_correct: false, order: 3 },
          { option_text: 'Endoscopic resection', is_correct: false, order: 4 },
        ],
        explanation: 'Stage III colon cancer requires surgical resection with en bloc lymphadenectomy followed by adjuvant chemotherapy.',
        difficulty: 'medium',
      },
      {
        question_text: 'Which diverticula in the colon are true diverticula (containing all layers of the bowel wall)?',
        question_type: 'multiple_choice',
        options: [
          { option_text: 'None — all colonic diverticula are false (pseudodiverticula)', is_correct: true, order: 1 },
          { option_text: 'Diverticula in the cecum', is_correct: false, order: 2 },
          { option_text: 'Diverticula in the ascending colon', is_correct: false, order: 3 },
          { option_text: 'Diverticula in the rectum', is_correct: false, order: 4 },
        ],
        explanation: 'Colonic diverticula are pseudodiverticula: only the mucosa and submucosa protrude through the muscular layer. True diverticula contain all layers.',
        difficulty: 'hard',
      },
    ],
  },

  // ── General Surgery: Hepatobiliary Surgery ──
  {
    branch_name: 'Hepatobiliary Surgery',
    questions: [
      {
        question_text: 'Which of the following is the most common indication for laparoscopic cholecystectomy?',
        question_type: 'multiple_choice',
        options: [
          { option_text: 'Symptomatic gallstones', is_correct: true, order: 1 },
          { option_text: 'Gallbladder polyps', is_correct: false, order: 2 },
          { option_text: 'Gallbladder cancer', is_correct: false, order: 3 },
          { option_text: 'Acalculous cholecystitis', is_correct: false, order: 4 },
        ],
        explanation: 'Symptomatic gallstones (biliary colic) are by far the most common indication for laparoscopic cholecystectomy.',
        difficulty: 'easy',
      },
      {
        question_text: 'What is the critical view of safety in laparoscopic cholecystectomy?',
        question_type: 'multiple_choice',
        options: [
          { option_text: 'Clear identification of cystic duct and cystic artery before clipping', is_correct: true, order: 1 },
          { option_text: 'Identification of the common bile duct', is_correct: false, order: 2 },
          { option_text: 'Visualization of the gallbladder fundus', is_correct: false, order: 3 },
          { option_text: 'Fluoroscopic confirmation of anatomy', is_correct: false, order: 4 },
        ],
        explanation: 'The critical view requires dissecting Calot triangle to clearly identify only two structures entering the gallbladder: the cystic duct and cystic artery.',
        difficulty: 'medium',
      },
      {
        question_text: 'Which liver segment is most commonly resected in living donor liver transplantation?',
        question_type: 'multiple_choice',
        options: [
          { option_text: 'Segment II + III (left lateral segment)', is_correct: true, order: 1 },
          { option_text: 'Segment IV + V', is_correct: false, order: 2 },
          { option_text: 'Segment VI + VII', is_correct: false, order: 3 },
          { option_text: 'Segment VIII', is_correct: false, order: 4 },
        ],
        explanation: 'The left lateral segment (segments II and III) is the most commonly used graft for pediatric living donor liver transplantation.',
        difficulty: 'hard',
      },
    ],
  },

  // ── ICU / Critical Care: Adult ICU ──
  {
    branch_name: 'Adult ICU',
    questions: [
      {
        question_text: 'Which sedation scale is most commonly used in adult ICU patients to assess level of consciousness?',
        question_type: 'multiple_choice',
        options: [
          { option_text: 'Richmond Agitation-Sedation Scale (RASS)', is_correct: true, order: 1 },
          { option_text: 'Glasgow Coma Scale (GCS)', is_correct: false, order: 2 },
          { option_text: 'Ramsay Sedation Scale', is_correct: false, order: 3 },
          { option_text: 'Pain Assessment and Management (PAM)', is_correct: false, order: 4 },
        ],
        explanation: 'RASS is the most widely validated sedation assessment tool in adult ICU patients, ranging from +4 (combative) to -5 (unarousable).',
        difficulty: 'easy',
      },
      {
        question_text: 'What tidal volume setting is recommended for lung-protective ventilation in ARDS?',
        question_type: 'multiple_choice',
        options: [
          { option_text: '4-6 mL/kg predicted body weight', is_correct: true, order: 1 },
          { option_text: '8-10 mL/kg predicted body weight', is_correct: false, order: 2 },
          { option_text: '10-12 mL/kg predicted body weight', is_correct: false, order: 3 },
          { option_text: '12-15 mL/kg predicted body weight', is_correct: false, order: 4 },
        ],
        explanation: 'Low tidal volume ventilation (4-6 mL/kg PBW) is the cornerstone of lung-protective ventilation, reducing mortality in ARDS.',
        difficulty: 'medium',
      },
      {
        question_text: 'Which of the following is the earliest sign of septic shock?',
        question_type: 'multiple_choice',
        options: [
          { option_text: 'Hypotension requiring vasopressors with lactate >2 mmol/L', is_correct: true, order: 1 },
          { option_text: 'Fever above 38.5°C', is_correct: false, order: 2 },
          { option_text: 'Elevated white blood cell count', is_correct: false, order: 3 },
          { option_text: 'Positive blood culture', is_correct: false, order: 4 },
        ],
        explanation: 'Septic shock is defined by the need for vasopressors to maintain MAP ≥65 mmHg with lactate >2 mmol/L despite adequate fluid resuscitation.',
        difficulty: 'easy',
      },
    ],
  },

  // ── ICU / Critical Care: Neonatal ICU ──
  {
    branch_name: 'Neonatal ICU',
    questions: [
      {
        question_text: 'What is the most common cause of respiratory distress in preterm neonates?',
        question_type: 'multiple_choice',
        options: [
          { option_text: 'Respiratory distress syndrome (surfactant deficiency)', is_correct: true, order: 1 },
          { option_text: 'Meconium aspiration', is_correct: false, order: 2 },
          { option_text: 'Congenital pneumonia', is_correct: false, order: 3 },
          { option_text: 'Pneumothorax', is_correct: false, order: 4 },
        ],
        explanation: 'RDS due to surfactant deficiency is the most common cause of respiratory distress in preterm infants, with incidence inversely related to gestational age.',
        difficulty: 'easy',
      },
      {
        question_text: 'At what gestational age is a neonate considered late preterm?',
        question_type: 'multiple_choice',
        options: [
          { option_text: '34 + 0/7 to 36 + 6/7 weeks', is_correct: true, order: 1 },
          { option_text: '32 + 0/7 to 33 + 6/7 weeks', is_correct: false, order: 2 },
          { option_text: '28 + 0/7 to 31 + 6/7 weeks', is_correct: false, order: 3 },
          { option_text: '37 + 0/7 to 38 + 6/7 weeks', is_correct: false, order: 4 },
        ],
        explanation: 'Late preterm infants are born between 34+0 and 36+6 weeks. They account for the majority of preterm births and have higher morbidity than term infants.',
        difficulty: 'medium',
      },
      {
        question_text: 'Which intervention has been shown to reduce the incidence of necrotizing enterocolitis (NEC) in preterm infants?',
        question_type: 'multiple_choice',
        options: [
          { option_text: 'Exclusive human milk feeding', is_correct: true, order: 1 },
          { option_text: 'Probiotic administration', is_correct: false, order: 2 },
          { option_text: 'Delayed cord clamping', is_correct: false, order: 3 },
          { option_text: 'Prophylactic antibiotics', is_correct: false, order: 4 },
        ],
        explanation: 'Exclusive human milk feeding is the most effective strategy to reduce NEC risk. Probiotics also show benefit but are not universally adopted.',
        difficulty: 'medium',
      },
    ],
  },

  // ── Pediatric Nursing: General Pediatrics ──
  {
    branch_name: 'General Pediatrics',
    questions: [
      {
        question_text: 'What is the most important vital sign to monitor in a child with suspected dehydration?',
        question_type: 'multiple_choice',
        options: [
          { option_text: 'Heart rate', is_correct: true, order: 1 },
          { option_text: 'Temperature', is_correct: false, order: 2 },
          { option_text: 'Respiratory rate', is_correct: false, order: 3 },
          { option_text: 'Blood pressure', is_correct: false, order: 4 },
        ],
        explanation: 'Heart rate is the earliest and most sensitive indicator of dehydration in children. Blood pressure drops only in advanced shock.',
        difficulty: 'easy',
      },
      {
        question_text: 'At what age is the measles-mumps-rubella (MMR) vaccine typically first administered?',
        question_type: 'multiple_choice',
        options: [
          { option_text: '12 months', is_correct: true, order: 1 },
          { option_text: '6 months', is_correct: false, order: 2 },
          { option_text: '18 months', is_correct: false, order: 3 },
          { option_text: '2 years', is_correct: false, order: 4 },
        ],
        explanation: 'MMR is first given at 12 months of age. A second dose is given at 4-6 years. Early doses before 12 months may be less effective due to maternal antibodies.',
        difficulty: 'easy',
      },
      {
        question_text: 'Which of the following is the most common cause of bronchiolitis in infants?',
        question_type: 'multiple_choice',
        options: [
          { option_text: 'Respiratory syncytial virus (RSV)', is_correct: true, order: 1 },
          { option_text: 'Influenza virus', is_correct: false, order: 2 },
          { option_text: 'Adenovirus', is_correct: false, order: 3 },
          { option_text: 'Rhinovirus', is_correct: false, order: 4 },
        ],
        explanation: 'RSV causes approximately 70% of bronchiolitis cases in infants. It is most prevalent in winter months and peaks at age 2-6 months.',
        difficulty: 'easy',
      },
    ],
  },

  // ── Pediatric Nursing: Pediatric Oncology ──
  {
    branch_name: 'Pediatric Oncology',
    questions: [
      {
        question_text: 'What is the most common childhood malignancy?',
        question_type: 'multiple_choice',
        options: [
          { option_text: 'Acute lymphoblastic leukemia (ALL)', is_correct: true, order: 1 },
          { option_text: 'Brain tumors', is_correct: false, order: 2 },
          { option_text: 'Neuroblastoma', is_correct: false, order: 3 },
          { option_text: 'Wilms tumor', is_correct: false, order: 4 },
        ],
        explanation: 'ALL accounts for approximately 25% of all childhood cancers and is the most common malignancy in children.',
        difficulty: 'easy',
      },
      {
        question_text: 'Which of the following is a common side effect of high-dose methotrexate that requires aggressive monitoring?',
        question_type: 'multiple_choice',
        options: [
          { option_text: 'Mucositis and myelosuppression', is_correct: true, order: 1 },
          { option_text: 'Cardiomyopathy', is_correct: false, order: 2 },
          { option_text: 'Hemorrhagic cystitis', is_correct: false, order: 3 },
          { option_text: 'Pulmonary fibrosis', is_correct: false, order: 4 },
        ],
        explanation: 'Methotrexate causes mucositis and myelosuppression. Leucovorin rescue and hydration are required to prevent severe toxicity.',
        difficulty: 'medium',
      },
      {
        question_text: 'What is the most common presenting symptom of Wilms tumor?',
        question_type: 'multiple_choice',
        options: [
          { option_text: 'Abdominal mass', is_correct: true, order: 1 },
          { option_text: 'Hematuria', is_correct: false, order: 2 },
          { option_text: 'Abdominal pain', is_correct: false, order: 3 },
          { option_text: 'Hypertension', is_correct: false, order: 4 },
        ],
        explanation: 'Wilms tumor typically presents as an asymptomatic abdominal mass discovered by a parent or during routine examination.',
        difficulty: 'medium',
      },
    ],
  },
];
