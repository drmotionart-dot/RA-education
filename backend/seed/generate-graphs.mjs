/*
  Survey graph generator: reads shallow seed files, expands each terminal
  into 3-4 domain-specific questions + shared deep-dive chain (12 nodes)
  + value calibration chain (5 nodes) + universal calibration (3 nodes).

  Output: expanded .js files at seed/survey/*.expanded.js
  Verification: prints node counts + full path traces to console.
*/

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ============================================================
// Shared question pools — used by ALL graphs of the same type
// ============================================================

function makeNurseDeepChain() {
  return [
    { node_id: 'DEEP1', order: 10, is_universal: false, question_text: 'How important is having a predictable schedule and work-life balance in your nursing practice?', options: [
      { option_text: 'Extremely — I want control over my shifts', next_node_id: 'DEEP2', axis_deltas: { lifestyle_priority: 3 } },
      { option_text: 'Moderately — I can handle some unpredictability', next_node_id: 'DEEP2', axis_deltas: { lifestyle_priority: 1 } },
      { option_text: 'Not important — I work whenever needed', next_node_id: 'DEEP2', axis_deltas: { lifestyle_priority: 0, critical_care_acuity: 1 } },
    ]},
    { node_id: 'DEEP2', order: 11, is_universal: false, question_text: 'How do you feel about high-acuity environments where patient status can change in seconds?', options: [
      { option_text: 'I thrive on the intensity and pace', next_node_id: 'DEEP3', axis_deltas: { critical_care_acuity: 2, acute_vs_chronic: 2 } },
      { option_text: 'I can handle it in controlled doses', next_node_id: 'DEEP3', axis_deltas: { critical_care_acuity: 0 } },
      { option_text: 'I prefer a more stable, predictable environment', next_node_id: 'DEEP3', axis_deltas: { critical_care_acuity: -1, acute_vs_chronic: -1 } },
    ]},
    { node_id: 'DEEP3', order: 12, is_universal: false, question_text: 'How important is patient and family education in your ideal nursing role?', options: [
      { option_text: 'Essential — teaching is a core part of nursing to me', next_node_id: 'DEEP4', axis_deltas: { patient_education_affinity: 2, community_outreach: 1 } },
      { option_text: 'Important but not my primary focus', next_node_id: 'DEEP4', axis_deltas: { patient_education_affinity: 1 } },
      { option_text: 'I prefer tasks over teaching — let the educators handle it', next_node_id: 'DEEP4', axis_deltas: { patient_education_affinity: -1 } },
    ]},
    { node_id: 'DEEP4', order: 13, is_universal: false, question_text: 'Do you see yourself mentoring new nurses or leading a team?', options: [
      { option_text: 'Yes — leadership and developing others is my path', next_node_id: 'DEEP5', axis_deltas: { management_leadership: 2 } },
      { option_text: 'Somewhat — I enjoy helping when asked', next_node_id: 'DEEP5', axis_deltas: { management_leadership: 1 } },
      { option_text: 'Not really — I prefer focusing on my own patients', next_node_id: 'DEEP5', axis_deltas: { management_leadership: -1 } },
    ]},
    { node_id: 'DEEP5', order: 14, is_universal: false, question_text: 'How important is salary and benefits in your nursing career decisions?', options: [
      { option_text: 'A top priority — nursing is my career and investment', next_node_id: 'DEEP6', axis_deltas: { income_priority: 3 } },
      { option_text: 'Important but balanced with other factors', next_node_id: 'DEEP6', axis_deltas: { income_priority: 1 } },
      { option_text: 'Secondary — fulfilling work matters more than pay', next_node_id: 'DEEP6', axis_deltas: { income_priority: -1 } },
    ]},
    { node_id: 'DEEP6', order: 15, is_universal: false, question_text: 'How do you handle emotionally difficult situations with patients and families?', options: [
      { option_text: 'I process them and grow — emotional resilience is part of nursing', next_node_id: 'DEEP7', axis_deltas: { psych_affinity: 2, patient_education_affinity: 1 } },
      { option_text: 'I cope but they stay with me', next_node_id: 'DEEP7', axis_deltas: { psych_affinity: 1 } },
      { option_text: 'They drain me significantly — I prefer less emotionally intense settings', next_node_id: 'DEEP7', axis_deltas: { psych_affinity: -1 } },
    ]},
    { node_id: 'DEEP7', order: 16, is_universal: false, question_text: 'How much do you enjoy hands-on technical skills — IVs, lines, wound care, equipment?', options: [
      { option_text: 'Love it — the more technical the better', next_node_id: 'DEEP8', axis_deltas: { procedural_technical: 2 } },
      { option_text: 'I enjoy them but they are not the main draw', next_node_id: 'DEEP8', axis_deltas: { procedural_technical: 1 } },
      { option_text: 'I prefer assessment, communication, and coordination over procedures', next_node_id: 'DEEP8', axis_deltas: { procedural_technical: -1, patient_education_affinity: 1 } },
    ]},
    { node_id: 'DEEP8', order: 17, is_universal: false, question_text: 'Do you prefer the intensity of acute, short-term episodes or the depth of ongoing patient relationships?', options: [
      { option_text: 'Acute episodes — treat, stabilize, move on', next_node_id: 'DEEP9', axis_deltas: { acute_vs_chronic: 2 } },
      { option_text: 'A mix of both is ideal', next_node_id: 'DEEP9', axis_deltas: { acute_vs_chronic: 0 } },
      { option_text: 'Ongoing relationships — I want to know my patients over time', next_node_id: 'DEEP9', axis_deltas: { acute_vs_chronic: -1, patient_education_affinity: 1 } },
    ]},
    { node_id: 'DEEP9', order: 18, is_universal: false, question_text: 'How interested are you in improving systems, policies, and workflows?', options: [
      { option_text: 'Very — I can see myself leading quality initiatives', next_node_id: 'DEEP10', axis_deltas: { admin_systems_affinity: 3 } },
      { option_text: 'Somewhat — I want to understand them but not lead them', next_node_id: 'DEEP10', axis_deltas: { admin_systems_affinity: 1 } },
      { option_text: 'Not at all — I just want to provide direct patient care', next_node_id: 'DEEP10', axis_deltas: { admin_systems_affinity: -1 } },
    ]},
    { node_id: 'DEEP10', order: 19, is_universal: false, question_text: 'How comfortable are you with nursing informatics, charting systems, and data?', options: [
      { option_text: 'Very comfortable — I embrace health IT', next_node_id: 'DEEP11', axis_deltas: { admin_systems_affinity: 2 } },
      { option_text: 'Comfortable with basic documentation', next_node_id: 'DEEP11', axis_deltas: {} },
      { option_text: 'I prefer spending time with patients over charting', next_node_id: 'DEEP11', axis_deltas: { admin_systems_affinity: -1 } },
    ]},
    { node_id: 'DEEP11', order: 20, is_universal: false, question_text: 'How do you feel about spending time talking and teaching vs. doing procedures and tasks?', options: [
      { option_text: 'Teaching and talking is why I chose nursing', next_node_id: 'DEEP12', axis_deltas: { patient_education_affinity: 2, community_outreach: 1 } },
      { option_text: 'I like a balance of both', next_node_id: 'DEEP12', axis_deltas: {} },
      { option_text: 'I prefer hands-on tasks — that is where I excel', next_node_id: 'DEEP12', axis_deltas: { procedural_technical: 1 } },
    ]},
    { node_id: 'DEEP12', order: 21, is_universal: false, question_text: 'How important is work-life balance compared to career advancement?', options: [
      { option_text: 'Balance is everything — I work to live', next_node_id: 'VAL1', axis_deltas: { lifestyle_priority: 2, income_priority: -1 } },
      { option_text: 'Both are important — I want a sustainable career', next_node_id: 'VAL1', axis_deltas: { lifestyle_priority: 1 } },
      { option_text: 'Advancement comes first — I will sacrifice balance for growth', next_node_id: 'VAL1', axis_deltas: { income_priority: 1, management_leadership: 1 } },
    ]},
  ];
}

function makeDeepChain(type) {
  if (type === 'path') {
    return [
      { node_id: 'DEEP1', order: 10, is_universal: false, question_text: 'How important is mentorship and guidance in your career move?', options: [
        { option_text: 'Critical — I need structured programs', next_node_id: 'DEEP2', axis_deltas: { time_investment: 1 } },
        { option_text: 'Nice-to-have but not essential', next_node_id: 'DEEP2', axis_deltas: { willingness_relocate: 1 } },
        { option_text: 'I prefer to figure things out independently', next_node_id: 'DEEP2', axis_deltas: { exam_tolerance: 1 } },
      ]},
      { node_id: 'DEEP2', order: 11, is_universal: false, question_text: 'How do you feel about bureaucratic processes and paperwork?', options: [
        { option_text: 'I can tolerate them for the right opportunity', next_node_id: 'DEEP3', axis_deltas: { exam_tolerance: 1 } },
        { option_text: 'They frustrate me but I manage', next_node_id: 'DEEP3', axis_deltas: { time_investment: -1 } },
        { option_text: 'I want to minimize them as much as possible', next_node_id: 'DEEP3', axis_deltas: { cost_tolerance: -1 } },
      ]},
      { node_id: 'DEEP3', order: 12, is_universal: false, question_text: 'Would you consider a pathway that requires you to repeat residency or training?', options: [
        { option_text: 'Yes, if it leads to a better outcome', next_node_id: 'DEEP4', axis_deltas: { time_investment: 2 } },
        { option_text: 'Only if I can shorten it significantly', next_node_id: 'DEEP4', axis_deltas: { time_investment: 1, western_preference: 1 } },
        { option_text: 'No — I want to practice as soon as possible', next_node_id: 'DEEP4', axis_deltas: { time_investment: -2, egypt_stability: 1 } },
      ]},
      { node_id: 'DEEP4', order: 13, is_universal: false, question_text: 'How important is being near family and your support network?', options: [
        { option_text: 'Extremely important — I cannot leave them', next_node_id: 'DEEP5', axis_deltas: { egypt_stability: 2, willingness_relocate: -2 } },
        { option_text: 'Important but I would travel for the right opportunity', next_node_id: 'DEEP5', axis_deltas: { willingness_relocate: 1 } },
        { option_text: 'Not a factor — I am ready to start fresh anywhere', next_node_id: 'DEEP5', axis_deltas: { willingness_relocate: 3 } },
      ]},
      { node_id: 'DEEP5', order: 14, is_universal: false, question_text: 'How confident are you in your English proficiency for exams and practice?', options: [
        { option_text: 'Fluent — no concerns', next_node_id: 'DEEP6', axis_deltas: { language_learning: 0, western_preference: 1 } },
        { option_text: 'Good but would benefit from preparation', next_node_id: 'DEEP6', axis_deltas: { language_learning: 1 } },
        { option_text: 'Limited — I would need significant improvement', next_node_id: 'DEEP6', axis_deltas: { language_learning: 2, gulf_preference: 1 } },
      ]},
      { node_id: 'DEEP6', order: 15, is_universal: false, question_text: 'How do you feel about taking computer-based standardized exams?', options: [
        { option_text: 'Comfortable — I test well', next_node_id: 'DEEP7', axis_deltas: { exam_tolerance: 2 } },
        { option_text: 'Nervous but I prepare and pass', next_node_id: 'DEEP7', axis_deltas: { exam_tolerance: 1 } },
        { option_text: 'I really struggle with standardized tests', next_node_id: 'DEEP7', axis_deltas: { exam_tolerance: -1 } },
      ]},
      { node_id: 'DEEP7', order: 16, is_universal: false, question_text: 'How long are you willing to live abroad before deciding whether to stay permanently?', options: [
        { option_text: '1-2 years — I want the option to return', next_node_id: 'DEEP8', axis_deltas: { willingness_relocate: 0, egypt_stability: 0 } },
        { option_text: '3-5 years — enough time to establish myself', next_node_id: 'DEEP8', axis_deltas: { willingness_relocate: 1, western_preference: 1 } },
        { option_text: 'Indefinitely — I plan to settle abroad', next_node_id: 'DEEP8', axis_deltas: { willingness_relocate: 2, western_preference: 2 } },
      ]},
      { node_id: 'DEEP8', order: 17, is_universal: false, question_text: 'How important is it that your spouse or partner can also work in the destination country?', options: [
        { option_text: 'Critical — we need dual income', next_node_id: 'DEEP9', axis_deltas: { western_preference: 1, income_expectation: 1 } },
        { option_text: 'Important but not a dealbreaker', next_node_id: 'DEEP9', axis_deltas: { willingness_relocate: 1 } },
        { option_text: 'Not applicable — I am single', next_node_id: 'DEEP9', axis_deltas: {} },
      ]},
      { node_id: 'DEEP9', order: 18, is_universal: false, question_text: 'Would you accept a lower-tier position or location to get your foot in the door?', options: [
        { option_text: 'Yes — any opportunity to start', next_node_id: 'DEEP10', axis_deltas: { willingness_relocate: 1, income_expectation: -1 } },
        { option_text: 'Only if it is still in my desired region', next_node_id: 'DEEP10', axis_deltas: { western_preference: 0 } },
        { option_text: 'No — I will wait for the right opportunity', next_node_id: 'DEEP10', axis_deltas: { income_expectation: 1, time_investment: 1 } },
      ]},
      { node_id: 'DEEP10', order: 19, is_universal: false, question_text: 'How much research have you already done on your preferred pathway?', options: [
        { option_text: 'Extensive — I know the steps and costs', next_node_id: 'DEEP11', axis_deltas: { exam_tolerance: 1, cost_tolerance: 0 } },
        { option_text: 'Some — I have a general idea', next_node_id: 'DEEP11', axis_deltas: { time_investment: 1 } },
        { option_text: 'Very little — that is why I am here', next_node_id: 'DEEP11', axis_deltas: { time_investment: 2 } },
      ]},
      { node_id: 'DEEP11', order: 20, is_universal: false, question_text: 'How would you describe your financial situation for funding a career move?', options: [
        { option_text: 'Comfortable — I can self-fund', next_node_id: 'DEEP12', axis_deltas: { cost_tolerance: 2, income_expectation: 1 } },
        { option_text: 'Limited but manageable with loans or support', next_node_id: 'DEEP12', axis_deltas: { cost_tolerance: 1 } },
        { option_text: 'Tight — cost is the biggest factor for me', next_node_id: 'DEEP12', axis_deltas: { cost_tolerance: -1, income_expectation: 2 } },
      ]},
      { node_id: 'DEEP12', order: 21, is_universal: false, question_text: 'Do you have colleagues or friends who have already made the move you are considering?', options: [
        { option_text: 'Yes — several, and they have shared their experience', next_node_id: 'VAL1', axis_deltas: { western_preference: 1, gulf_preference: 1 } },
        { option_text: 'One or two — enough to have some insight', next_node_id: 'VAL1', axis_deltas: { willingness_relocate: 1 } },
        { option_text: 'No — I would be paving the way myself', next_node_id: 'VAL1', axis_deltas: { exam_tolerance: 1, time_investment: 1 } },
      ]},
    ];
  }

  // Specialty deep-dive chain (same for doctor and nurse)
  return [
    { node_id: 'DEEP1', order: 10, is_universal: false, question_text: 'How important is it to have a clear, predictable schedule in your specialty?', options: [
      { option_text: 'Extremely — I want control over my time', next_node_id: 'DEEP2', axis_deltas: { lifestyle_priority: 3 } },
      { option_text: 'Moderately — some flexibility is fine', next_node_id: 'DEEP2', axis_deltas: { lifestyle_priority: 1 } },
      { option_text: 'Not important — I am available when needed', next_node_id: 'DEEP2', axis_deltas: { lifestyle_priority: 0, emergency_tolerance: 1 } },
    ]},
    { node_id: 'DEEP2', order: 11, is_universal: false, question_text: 'How do you feel about working in a high-pressure, fast-paced environment daily?', options: [
      { option_text: 'I thrive on it — the faster the better', next_node_id: 'DEEP3', axis_deltas: { emergency_tolerance: 2, acute_vs_longitudinal: 2 } },
      { option_text: 'I can handle it in bursts but not every day', next_node_id: 'DEEP3', axis_deltas: { emergency_tolerance: 0 } },
      { option_text: 'I prefer a calm, controlled environment', next_node_id: 'DEEP3', axis_deltas: { emergency_tolerance: -1, acute_vs_longitudinal: -1 } },
    ]},
    { node_id: 'DEEP3', order: 12, is_universal: false, question_text: 'How important is having a strong evidence base and research behind your daily decisions?', options: [
      { option_text: 'Essential — I want to practice evidence-based medicine rigorously', next_node_id: 'DEEP4', axis_deltas: { research_academic_affinity: 2, diagnostic_puzzle_affinity: 1 } },
      { option_text: 'Important but I also rely on clinical judgment', next_node_id: 'DEEP4', axis_deltas: { research_academic_affinity: 1 } },
      { option_text: 'I trust practical experience more than studies', next_node_id: 'DEEP4', axis_deltas: { research_academic_affinity: -1 } },
    ]},
    { node_id: 'DEEP4', order: 13, is_universal: false, question_text: 'Do you enjoy teaching and mentoring junior colleagues or students?', options: [
      { option_text: 'Yes — teaching is one of the most rewarding parts of medicine', next_node_id: 'DEEP5', axis_deltas: { research_academic_affinity: 2 } },
      { option_text: 'Somewhat — I enjoy it occasionally', next_node_id: 'DEEP5', axis_deltas: { research_academic_affinity: 1 } },
      { option_text: 'Not really — I prefer focusing on my own patients', next_node_id: 'DEEP5', axis_deltas: { research_academic_affinity: -1 } },
    ]},
    { node_id: 'DEEP5', order: 14, is_universal: false, question_text: 'How important is income and financial growth potential in your specialty choice?', options: [
      { option_text: 'A top priority — medicine is my career and investment', next_node_id: 'DEEP6', axis_deltas: { income_priority: 3 } },
      { option_text: 'Important but balanced with other factors', next_node_id: 'DEEP6', axis_deltas: { income_priority: 1 } },
      { option_text: 'Secondary — fulfilling work matters more', next_node_id: 'DEEP6', axis_deltas: { income_priority: -1 } },
    ]},
    { node_id: 'DEEP6', order: 15, is_universal: false, question_text: 'How comfortable are you with ambiguity and uncertainty in diagnosis?', options: [
      { option_text: 'I enjoy the challenge of ambiguous cases', next_node_id: 'DEEP7', axis_deltas: { diagnostic_puzzle_affinity: 2 } },
      { option_text: 'I tolerate it but prefer some clarity', next_node_id: 'DEEP7', axis_deltas: { diagnostic_puzzle_affinity: 1 } },
      { option_text: 'I find it stressful — I like clear answers', next_node_id: 'DEEP7', axis_deltas: { diagnostic_puzzle_affinity: -1 } },
    ]},
    { node_id: 'DEEP7', order: 16, is_universal: false, question_text: 'How much hands-on procedural work do you want in your daily practice?', options: [
      { option_text: 'As much as possible — I want to use my hands', next_node_id: 'DEEP8', axis_deltas: { procedural_affinity: 2, surgical_tolerance: 1 } },
      { option_text: 'A moderate amount — some procedures, some clinic', next_node_id: 'DEEP8', axis_deltas: { procedural_affinity: 1 } },
      { option_text: 'Minimal — I prefer cognitive and diagnostic work', next_node_id: 'DEEP8', axis_deltas: { procedural_affinity: -1 } },
    ]},
    { node_id: 'DEEP8', order: 17, is_universal: false, question_text: 'How do you feel about longitudinal relationships with patients over years?', options: [
      { option_text: 'That is what drew me to medicine — lasting connections', next_node_id: 'DEEP9', axis_deltas: { acute_vs_longitudinal: -2 } },
      { option_text: 'I appreciate them but they are not essential', next_node_id: 'DEEP9', axis_deltas: { acute_vs_longitudinal: 0 } },
      { option_text: 'I prefer episodic care — treat and move on', next_node_id: 'DEEP9', axis_deltas: { acute_vs_longitudinal: 2 } },
    ]},
    { node_id: 'DEEP9', order: 18, is_universal: false, question_text: 'How interested are you in the business and administrative side of healthcare?', options: [
      { option_text: 'Very — I can see myself leading departments or hospitals', next_node_id: 'DEEP10', axis_deltas: { admin_systems_affinity: 3 } },
      { option_text: 'Somewhat — I want to understand it but not lead it', next_node_id: 'DEEP10', axis_deltas: { admin_systems_affinity: 1 } },
      { option_text: 'Not at all — I just want to practice medicine', next_node_id: 'DEEP10', axis_deltas: { admin_systems_affinity: -1 } },
    ]},
    { node_id: 'DEEP10', order: 19, is_universal: false, question_text: 'How comfortable are you with using technology and data in your practice?', options: [
      { option_text: 'Very comfortable — I embrace digital health', next_node_id: 'DEEP11', axis_deltas: { lab_imaging_affinity: 1, admin_systems_affinity: 1 } },
      { option_text: 'Comfortable with basic tools', next_node_id: 'DEEP11', axis_deltas: {} },
      { option_text: 'I prefer traditional clinical methods', next_node_id: 'DEEP11', axis_deltas: { lab_imaging_affinity: -1 } },
    ]},
    { node_id: 'DEEP11', order: 20, is_universal: false, question_text: 'How would you feel about a specialty where most of your interaction is with data, slides, or images rather than patients?', options: [
      { option_text: 'That sounds ideal — I love the diagnostic detective work', next_node_id: 'DEEP12', axis_deltas: { lab_imaging_affinity: 2, diagnostic_puzzle_affinity: 1 } },
      { option_text: 'I could do it but I would miss patient contact', next_node_id: 'DEEP12', axis_deltas: { lab_imaging_affinity: 1 } },
      { option_text: 'Not for me — patient interaction is why I chose medicine', next_node_id: 'DEEP12', axis_deltas: { lab_imaging_affinity: -1, acute_vs_longitudinal: -1 } },
    ]},
    { node_id: 'DEEP12', order: 21, is_universal: false, question_text: 'How important is work-life balance compared to professional achievement?', options: [
      { option_text: 'Balance is everything — I work to live', next_node_id: 'VAL1', axis_deltas: { lifestyle_priority: 2, income_priority: -1 } },
      { option_text: 'Both are important — I want a sustainable career', next_node_id: 'VAL1', axis_deltas: { lifestyle_priority: 1 } },
      { option_text: 'Achievement comes first — I will sacrifice balance early on', next_node_id: 'VAL1', axis_deltas: { income_priority: 1, research_academic_affinity: 1 } },
    ]},
  ];
}

function makeValueChain(type, role) {
  const isNurseSpec = type === 'specialty' && role === 'nurse';
  const nodes = [
    { node_id: 'VAL1', order: 22, is_universal: false, question_text: 'How much does prestige and respect within the medical community matter to you?', options: [
      { option_text: 'Very important — I want a respected specialty', next_node_id: 'VAL2', axis_deltas: type === 'path' ? { income_expectation: 1, time_investment: 1 } : (isNurseSpec ? { income_priority: 1, management_leadership: 1 } : { income_priority: 1, research_academic_affinity: 1 }) },
      { option_text: 'Somewhat — it matters but is not everything', next_node_id: 'VAL2', axis_deltas: type === 'path' ? {} : {} },
      { option_text: 'Not important — I care about the work itself', next_node_id: 'VAL2', axis_deltas: type === 'path' ? { income_expectation: -1 } : { income_priority: -1 } },
    ]},
    { node_id: 'VAL2', order: 23, is_universal: false, question_text: 'Would you rather be a generalist with broad knowledge or a specialist with deep expertise?', options: [
      { option_text: 'Generalist — I like variety and breadth', next_node_id: 'VAL3', axis_deltas: type === 'path' ? { clinical_vs_admin: 1 } : (isNurseSpec ? { procedural_technical: -1 } : { procedural_affinity: -1, diagnostic_puzzle_affinity: 0 }) },
      { option_text: 'Specialist — I want to master one area', next_node_id: 'VAL3', axis_deltas: type === 'path' ? { research_academic_orientation: 1 } : (isNurseSpec ? { procedural_technical: 1, patient_education_affinity: 1 } : { surgical_tolerance: 1, diagnostic_puzzle_affinity: 1 }) },
      { option_text: 'In between — I want focus but not extreme narrowing', next_node_id: 'VAL3', axis_deltas: type === 'path' ? {} : {} },
    ]},
    { node_id: 'VAL3', order: 24, is_universal: false, question_text: 'How important is geographic flexibility — being able to practice in multiple locations?', options: [
      { option_text: 'Very important — I want options to move', next_node_id: 'VAL4', axis_deltas: type === 'path' ? { willingness_relocate: 2, western_preference: 1 } : { lifestyle_priority: 1 } },
      { option_text: 'Nice-to-have but I can commit to one place', next_node_id: 'VAL4', axis_deltas: type === 'path' ? { willingness_relocate: 0 } : {} },
      { option_text: 'Not important — I want to put down roots', next_node_id: 'VAL4', axis_deltas: type === 'path' ? { willingness_relocate: -1, egypt_stability: 1 } : { income_priority: -1 } },
    ]},
    { node_id: 'VAL4', order: 25, is_universal: false, question_text: 'How would you describe your risk tolerance for trying a new, less-established career path?', options: [
      { option_text: 'High — I embrace calculated risks', next_node_id: 'VAL5', axis_deltas: type === 'path' ? { willingness_relocate: 1, exam_tolerance: 1 } : (isNurseSpec ? { critical_care_acuity: 1 } : { surgical_tolerance: 1 }) },
      { option_text: 'Moderate — I need some certainty', next_node_id: 'VAL5', axis_deltas: type === 'path' ? {} : {} },
      { option_text: 'Low — I prefer well-established, secure paths', next_node_id: 'VAL5', axis_deltas: type === 'path' ? { egypt_stability: 1 } : { lifestyle_priority: 1 } },
    ]},
    { node_id: 'VAL5', order: 26, is_universal: false, question_text: 'If you could design your perfect work week, how many hours would you work?', options: [
      { option_text: '30-40 hours — I value time outside medicine', next_node_id: type === 'path' ? 'CALIB_EXAMS' : 'CALIB_LIFESTYLE', axis_deltas: type === 'path' ? { clinical_vs_admin: -1 } : { lifestyle_priority: 2, income_priority: -1 } },
      { option_text: '40-50 hours — a standard medical work week', next_node_id: type === 'path' ? 'CALIB_EXAMS' : 'CALIB_LIFESTYLE', axis_deltas: type === 'path' ? {} : { lifestyle_priority: 0 } },
      { option_text: '50+ hours — I am fully committed to my career', next_node_id: type === 'path' ? 'CALIB_EXAMS' : 'CALIB_LIFESTYLE', axis_deltas: type === 'path' ? { clinical_vs_admin: 1 } : (isNurseSpec ? { income_priority: 1, management_leadership: 1 } : { income_priority: 1, research_academic_affinity: 1 }) },
    ]},
  ];
  return nodes;
}

function makeCalibrationChain(type, role) {
  if (type === 'path') {
    return [
      { node_id: 'CALIB_EXAMS', order: 27, is_universal: true, question_text: 'How many standardized exams are you willing to sit for your career move?', options: [
        { option_text: '0 — I want minimal or no exams', next_node_id: 'CALIB_COST', axis_deltas: { exam_tolerance: 0 } },
        { option_text: '1-2 exams — manageable', next_node_id: 'CALIB_COST', axis_deltas: { exam_tolerance: 2 } },
        { option_text: '3+ exams — I will do whatever it takes', next_node_id: 'CALIB_COST', axis_deltas: { exam_tolerance: 4 } },
      ]},
      { node_id: 'CALIB_COST', order: 28, is_universal: true, question_text: 'How much are you willing to invest financially? (1 = as little as possible, 5 = whatever it costs)', options: [
        { option_text: '1 — As little as possible', next_node_id: 'CALIB_TIME', axis_deltas: { cost_tolerance: 0 } },
        { option_text: '2 — Up to $1,000', next_node_id: 'CALIB_TIME', axis_deltas: { cost_tolerance: 1 } },
        { option_text: '3 — Up to $4,000', next_node_id: 'CALIB_TIME', axis_deltas: { cost_tolerance: 2 } },
        { option_text: '4 — Up to $8,000', next_node_id: 'CALIB_TIME', axis_deltas: { cost_tolerance: 3 } },
        { option_text: '5 — Whatever it costs', next_node_id: 'CALIB_TIME', axis_deltas: { cost_tolerance: 4 } },
      ]},
      { node_id: 'CALIB_TIME', order: 29, is_universal: true, question_text: 'How much time are you willing to invest in this pathway?', options: [
        { option_text: '6-12 months — I want to move quickly', next_node_id: null, axis_deltas: { time_investment: 1 } },
        { option_text: '1-2 years — reasonable timeframe', next_node_id: null, axis_deltas: { time_investment: 2 } },
        { option_text: '2-4 years — I am in it for the long haul', next_node_id: null, axis_deltas: { time_investment: 3 } },
      ]},
    ];
  }

  return [
    { node_id: 'CALIB_LIFESTYLE', order: 27, is_universal: true, question_text: 'How much does having predictable, controllable hours matter to you? (1 = not at all, 5 = extremely)', options: [
      { option_text: '1 — Not at all', next_node_id: 'CALIB_INCOME', axis_deltas: { lifestyle_priority: 0 } },
      { option_text: '2', next_node_id: 'CALIB_INCOME', axis_deltas: { lifestyle_priority: 1 } },
      { option_text: '3 — Moderately', next_node_id: 'CALIB_INCOME', axis_deltas: { lifestyle_priority: 2 } },
      { option_text: '4', next_node_id: 'CALIB_INCOME', axis_deltas: { lifestyle_priority: 3 } },
      { option_text: '5 — Extremely', next_node_id: 'CALIB_INCOME', axis_deltas: { lifestyle_priority: 4 } },
    ]},
    { node_id: 'CALIB_INCOME', order: 28, is_universal: true, question_text: 'How much does earning potential factor into your decision? (1 = not at all, 5 = primary driver)', options: [
      { option_text: '1 — Not at all', next_node_id: 'CALIB_ACADEMIC', axis_deltas: { income_priority: 0 } },
      { option_text: '2', next_node_id: 'CALIB_ACADEMIC', axis_deltas: { income_priority: 1 } },
      { option_text: '3 — Moderately', next_node_id: 'CALIB_ACADEMIC', axis_deltas: { income_priority: 2 } },
      { option_text: '4', next_node_id: 'CALIB_ACADEMIC', axis_deltas: { income_priority: 3 } },
      { option_text: '5 — Primary driver', next_node_id: 'CALIB_ACADEMIC', axis_deltas: { income_priority: 4 } },
    ]},
    { node_id: 'CALIB_ACADEMIC', order: 29, is_universal: true, question_text: 'Do you see yourself pursuing research or teaching alongside clinical practice?', options: [
      { option_text: 'Yes — that is my primary interest', next_node_id: null, axis_deltas: { research_academic_affinity: 3 } },
      { option_text: 'Somewhat — I would like to be involved', next_node_id: null, axis_deltas: { research_academic_affinity: 1.5 } },
      { option_text: 'No — I want pure clinical practice', next_node_id: null, axis_deltas: { research_academic_affinity: 0 } },
    ]},
  ];
}

// ============================================================
// Branch-specific expansion content
// ============================================================

function expandBranchNode(nodeId, branchType, usedIdents, role) {
  // Each branch gets 4 domain-specific questions before routing to DEEP1
  // The nodeId is the parent terminal being expanded
  const expansions = {
    // --- Doctor Specialty branches ---
    'Q3_SURGICAL_FIELD': [
      { node_id: 'SURG_ORTHO', order: 4, is_universal: false, question_text: 'In orthopedic surgery, what interests you most?', options: [
        { option_text: 'Sports medicine and joint preservation', next_node_id: 'SURG_SPINE', axis_deltas: { procedural_affinity: 1 } },
        { option_text: 'Spine surgery — complex anatomy and precision', next_node_id: 'SURG_SPINE', axis_deltas: { surgical_tolerance: 1, diagnostic_puzzle_affinity: 1 } },
        { option_text: 'Reconstructive and trauma surgery', next_node_id: 'SURG_SPINE', axis_deltas: { emergency_tolerance: 1 } },
        { option_text: 'Pediatric orthopedics', next_node_id: 'SURG_SPINE', axis_deltas: { pediatric_affinity: 1 } },
      ]},
      { node_id: 'SURG_SPINE', order: 5, is_universal: false, question_text: 'How do you feel about long, meticulous surgeries lasting 6+ hours?', options: [
        { option_text: 'I am drawn to the focus and precision required', next_node_id: 'SURG_GENERAL', axis_deltas: { surgical_tolerance: 2 } },
        { option_text: 'I can handle them but prefer efficient cases', next_node_id: 'SURG_GENERAL', axis_deltas: { surgical_tolerance: 1 } },
        { option_text: 'I prefer shorter, higher-volume procedures', next_node_id: 'SURG_GENERAL', axis_deltas: { procedural_affinity: 1 } },
      ]},
      { node_id: 'SURG_GENERAL', order: 6, is_universal: false, question_text: 'Would you rather operate on a wide variety of cases or specialize in one type of surgery?', options: [
        { option_text: 'Variety — general surgery approach', next_node_id: 'SURG_ROBOTICS', axis_deltas: { procedural_affinity: 1 } },
        { option_text: 'Specialize — master one type of procedure', next_node_id: 'SURG_ROBOTICS', axis_deltas: { surgical_tolerance: 1 } },
      ]},
      { node_id: 'SURG_ROBOTICS', order: 7, is_universal: false, question_text: 'How excited are you about robotic and AI-assisted surgery?', options: [
        { option_text: 'Very — I want to be at the forefront', next_node_id: 'DEEP1', axis_deltas: { lab_imaging_affinity: 1, procedural_affinity: 1 } },
        { option_text: 'Interested but I value traditional techniques too', next_node_id: 'DEEP1', axis_deltas: { surgical_tolerance: 0 } },
        { option_text: 'I prefer direct hands-on surgery', next_node_id: 'DEEP1', axis_deltas: { surgical_tolerance: 1 } },
      ]},
    ],
    'Q3_INTERVENTIONAL': [
      { node_id: 'INT_CATH', order: 4, is_universal: false, question_text: 'Which interventional area draws you most?', options: [
        { option_text: 'Cardiac catheterization — coronary interventions', next_node_id: 'INT_IMAGING', axis_deltas: { procedural_affinity: 2, acute_vs_longitudinal: 1 } },
        { option_text: 'Interventional radiology — image-guided procedures', next_node_id: 'INT_IMAGING', axis_deltas: { lab_imaging_affinity: 2, procedural_affinity: 1 } },
        { option_text: 'Endoscopy / gastroenterology procedures', next_node_id: 'INT_IMAGING', axis_deltas: { procedural_affinity: 1, diagnostic_puzzle_affinity: 1 } },
      ]},
      { node_id: 'INT_IMAGING', order: 5, is_universal: false, question_text: 'How comfortable are you interpreting complex imaging during procedures?', options: [
        { option_text: 'Very — real-time imaging is fascinating', next_node_id: 'INT_ACUITY', axis_deltas: { lab_imaging_affinity: 2, diagnostic_puzzle_affinity: 1 } },
        { option_text: 'Adequate — I can read what I need', next_node_id: 'INT_ACUITY', axis_deltas: { lab_imaging_affinity: 1 } },
        { option_text: 'I prefer direct visualization over imaging guidance', next_node_id: 'INT_ACUITY', axis_deltas: { procedural_affinity: 1 } },
      ]},
      { node_id: 'INT_ACUITY', order: 6, is_universal: false, question_text: 'Are you comfortable with the acuity of interventional complications?', options: [
        { option_text: 'Yes — managing complications is part of the excitement', next_node_id: 'DEEP1', axis_deltas: { emergency_tolerance: 2, surgical_tolerance: 1 } },
        { option_text: 'I accept it as part of the job', next_node_id: 'DEEP1', axis_deltas: { emergency_tolerance: 1 } },
        { option_text: 'It makes me anxious — I prefer low-risk procedures', next_node_id: 'DEEP1', axis_deltas: { emergency_tolerance: -1 } },
      ]},
    ],
    'Q3_DX_FIELD': [
      { node_id: 'DX_INTERNAL', order: 4, is_universal: false, question_text: 'What diagnostic area fascinates you most?', options: [
        { option_text: 'Complex internal medicine — multisystem mysteries', next_node_id: 'DX_INFECTIOUS', axis_deltas: { diagnostic_puzzle_affinity: 2 } },
        { option_text: 'Neurological localization — finding the lesion', next_node_id: 'DX_INFECTIOUS', axis_deltas: { diagnostic_puzzle_affinity: 1, lab_imaging_affinity: 1 } },
        { option_text: 'Infectious disease — identifying the pathogen', next_node_id: 'DX_INFECTIOUS', axis_deltas: { diagnostic_puzzle_affinity: 1, public_health_affinity: 1 } },
      ]},
      { node_id: 'DX_INFECTIOUS', order: 5, is_universal: false, question_text: 'How do you feel about managing chronic, complex patients with multiple comorbidities?', options: [
        { option_text: 'I enjoy the challenge of coordinating their care', next_node_id: 'DX_RARE', axis_deltas: { acute_vs_longitudinal: -1, diagnostic_puzzle_affinity: 1 } },
        { option_text: 'It can be rewarding but also draining', next_node_id: 'DX_RARE', axis_deltas: { acute_vs_longitudinal: 0 } },
        { option_text: 'I prefer acute diagnostic challenges, not long-term management', next_node_id: 'DX_RARE', axis_deltas: { acute_vs_longitudinal: 2 } },
      ]},
      { node_id: 'DX_RARE', order: 6, is_universal: false, question_text: 'How interested are you in rare diseases and unusual presentations?', options: [
        { option_text: 'Extremely — zebras are what excite me about medicine', next_node_id: 'DX_LITIGATION', axis_deltas: { diagnostic_puzzle_affinity: 2, research_academic_affinity: 1 } },
        { option_text: 'Moderately — interesting but I see mostly common cases', next_node_id: 'DX_LITIGATION', axis_deltas: { diagnostic_puzzle_affinity: 1 } },
        { option_text: 'Less interested — I want practical, common medicine', next_node_id: 'DX_LITIGATION', axis_deltas: { diagnostic_puzzle_affinity: -1 } },
      ]},
      { node_id: 'DX_LITIGATION', order: 7, is_universal: false, question_text: 'How does the risk of diagnostic errors and litigation affect your decision?', options: [
        { option_text: 'I accept it — it comes with the territory in diagnosis', next_node_id: 'DEEP1', axis_deltas: { emergency_tolerance: 1 } },
        { option_text: 'It worries me but I will practice carefully', next_node_id: 'DEEP1', axis_deltas: { lifestyle_priority: 1 } },
        { option_text: 'It is a significant concern that makes me lean toward lower-risk fields', next_node_id: 'DEEP1', axis_deltas: { lifestyle_priority: 2, emergency_tolerance: -1 } },
      ]},
    ],
    'Q3_LONGITUDINAL_FIELD': [
      { node_id: 'LONG_CHRONIC', order: 4, is_universal: false, question_text: 'What aspect of long-term patient care appeals most?', options: [
        { option_text: 'Managing chronic diseases over decades', next_node_id: 'LONG_GERIATRIC', axis_deltas: { acute_vs_longitudinal: -2, diagnostic_puzzle_affinity: 1 } },
        { option_text: 'Building deep therapeutic relationships', next_node_id: 'LONG_GERIATRIC', axis_deltas: { acute_vs_longitudinal: -2, psych_affinity: 1 } },
        { option_text: 'Coordinating care across multiple specialties', next_node_id: 'LONG_GERIATRIC', axis_deltas: { admin_systems_affinity: 1 } },
      ]},
      { node_id: 'LONG_GERIATRIC', order: 5, is_universal: false, question_text: 'How do you feel about caring for elderly patients with complex social and medical needs?', options: [
        { option_text: 'I find it deeply rewarding', next_node_id: 'LONG_PALLIATIVE', axis_deltas: { public_health_affinity: 1 } },
        { option_text: 'I can do it but it is not my passion', next_node_id: 'LONG_PALLIATIVE', axis_deltas: {} },
        { option_text: 'I prefer a patient population with more acute challenges', next_node_id: 'LONG_PALLIATIVE', axis_deltas: { acute_vs_longitudinal: 1 } },
      ]},
      { node_id: 'LONG_PALLIATIVE', order: 6, is_universal: false, question_text: 'How do you feel about palliative and end-of-life care conversations?', options: [
        { option_text: 'I consider them a privilege and core to medicine', next_node_id: 'DEEP1', axis_deltas: { acute_vs_longitudinal: -1, psych_affinity: 1 } },
        { option_text: 'They are important but emotionally taxing', next_node_id: 'DEEP1', axis_deltas: { psych_affinity: 1 } },
        { option_text: 'I prefer to focus on curative treatment', next_node_id: 'DEEP1', axis_deltas: { acute_vs_longitudinal: 1 } },
      ]},
    ],
    'Q3_PEDS_FIELD': [
      { node_id: 'PEDS_GENERAL', order: 4, is_universal: false, question_text: 'What draws you to pediatrics?', options: [
        { option_text: 'Caring for children and their families holistically', next_node_id: 'PEDS_NEONATAL', axis_deltas: { pediatric_affinity: 2 } },
        { option_text: 'The diagnostic challenge of pediatric presentations', next_node_id: 'PEDS_NEONATAL', axis_deltas: { pediatric_affinity: 1, diagnostic_puzzle_affinity: 1 } },
        { option_text: 'I want to sub-specialize in a pediatric organ system', next_node_id: 'PEDS_NEONATAL', axis_deltas: { pediatric_affinity: 1 } },
      ]},
      { node_id: 'PEDS_NEONATAL', order: 5, is_universal: false, question_text: 'How do you feel about the emotional weight of caring for seriously ill children?', options: [
        { option_text: 'I am prepared for it — it comes with the calling', next_node_id: 'PEDS_ACUTE', axis_deltas: { pediatric_affinity: 1, emergency_tolerance: 1 } },
        { option_text: 'It is difficult but meaningful', next_node_id: 'PEDS_ACUTE', axis_deltas: { pediatric_affinity: 1 } },
        { option_text: 'It worries me — I prefer less emotionally intense settings', next_node_id: 'PEDS_ACUTE', axis_deltas: { lifestyle_priority: 1 } },
      ]},
      { node_id: 'PEDS_ACUTE', order: 6, is_universal: false, question_text: 'Would you prefer general pediatrics with variety or a pediatric sub-specialty?', options: [
        { option_text: 'General pediatrics — I like the variety', next_node_id: 'DEEP1', axis_deltas: { pediatric_affinity: 1 } },
        { option_text: 'Pediatric sub-specialty — deeper expertise in one area', next_node_id: 'DEEP1', axis_deltas: { diagnostic_puzzle_affinity: 1 } },
        { option_text: 'Neonatology or pediatric ICU — acute and technical', next_node_id: 'DEEP1', axis_deltas: { emergency_tolerance: 1, procedural_affinity: 1 } },
      ]},
    ],
    'Q3_PSYCH_FIELD': [
      { node_id: 'PSYCH_GENERAL', order: 4, is_universal: false, question_text: 'What aspect of mental health appeals to you most?', options: [
        { option_text: 'Understanding the human mind and behavior', next_node_id: 'PSYCH_ACUTE', axis_deltas: { psych_affinity: 2, diagnostic_puzzle_affinity: 1 } },
        { option_text: 'Helping people through talk therapy and connection', next_node_id: 'PSYCH_ACUTE', axis_deltas: { psych_affinity: 2, acute_vs_longitudinal: -1 } },
        { option_text: 'The neurobiology and pharmacology of psychiatric conditions', next_node_id: 'PSYCH_ACUTE', axis_deltas: { psych_affinity: 1, research_academic_affinity: 1 } },
      ]},
      { node_id: 'PSYCH_ACUTE', order: 5, is_universal: false, question_text: 'How comfortable are you with managing acute psychiatric crises and involuntary care?', options: [
        { option_text: 'Comfortable — crisis management is part of psychiatry', next_node_id: 'PSYCH_CHILD', axis_deltas: { emergency_tolerance: 1, psych_affinity: 1 } },
        { option_text: 'I prefer outpatient, non-crisis settings', next_node_id: 'PSYCH_CHILD', axis_deltas: { lifestyle_priority: 1 } },
        { option_text: 'I would focus on psychotherapy rather than crisis care', next_node_id: 'PSYCH_CHILD', axis_deltas: { psych_affinity: 1, acute_vs_longitudinal: -1 } },
      ]},
      { node_id: 'PSYCH_CHILD', order: 6, is_universal: false, question_text: 'Would you work with children and adolescents, adults, or both?', options: [
        { option_text: 'Child and adolescent — early intervention is powerful', next_node_id: 'PSYCH_LIFESTYLE', axis_deltas: { pediatric_affinity: 1, psych_affinity: 1 } },
        { option_text: 'Adults — more experience with complex comorbidities', next_node_id: 'PSYCH_LIFESTYLE', axis_deltas: { psych_affinity: 1 } },
        { option_text: 'Both — I want flexibility', next_node_id: 'PSYCH_LIFESTYLE', axis_deltas: { psych_affinity: 1 } },
      ]},
      { node_id: 'PSYCH_LIFESTYLE', order: 7, is_universal: false, question_text: 'How important is lifestyle flexibility (private practice, telehealth) in psychiatry?', options: [
        { option_text: 'Very — the lifestyle is a major draw for me', next_node_id: 'DEEP1', axis_deltas: { lifestyle_priority: 2 } },
        { option_text: 'Somewhat — I value the flexibility but it is not primary', next_node_id: 'DEEP1', axis_deltas: { lifestyle_priority: 1 } },
        { option_text: 'Not a factor — I will work wherever I am needed', next_node_id: 'DEEP1', axis_deltas: { public_health_affinity: 1 } },
      ]},
    ],
    'Q3_ADMIN_FIELD': [
      { node_id: 'ADMIN_QUALITY', order: 4, is_universal: false, question_text: 'What kind of systems impact appeals to you most?', options: [
        { option_text: 'Quality improvement and patient safety', next_node_id: 'ADMIN_INFORMATICS', axis_deltas: { admin_systems_affinity: 2 } },
        { option_text: 'Health policy and population health', next_node_id: 'ADMIN_INFORMATICS', axis_deltas: { public_health_affinity: 2, admin_systems_affinity: 1 } },
        { option_text: 'Medical education and training the next generation', next_node_id: 'ADMIN_INFORMATICS', axis_deltas: { research_academic_affinity: 2 } },
      ]},
      { node_id: 'ADMIN_INFORMATICS', order: 5, is_universal: false, question_text: 'How comfortable are you with health IT, data analytics, and informatics?', options: [
        { option_text: 'Very — I see data as the future of medicine', next_node_id: 'ADMIN_IMPACT', axis_deltas: { admin_systems_affinity: 1, lab_imaging_affinity: 1 } },
        { option_text: 'Moderately — I can work with basic systems', next_node_id: 'ADMIN_IMPACT', axis_deltas: {} },
        { option_text: 'Not interested — I prefer clinical work', next_node_id: 'ADMIN_IMPACT', axis_deltas: { procedural_affinity: -1 } },
      ]},
      { node_id: 'ADMIN_IMPACT', order: 6, is_universal: false, question_text: 'Would you be satisfied with an entirely non-clinical role?', options: [
        { option_text: 'Yes — my impact would be on systems, not individuals', next_node_id: 'DEEP1', axis_deltas: { admin_systems_affinity: 1, procedural_affinity: -1 } },
        { option_text: 'I want a hybrid — some clinical, some administrative', next_node_id: 'DEEP1', axis_deltas: { admin_systems_affinity: 1 } },
        { option_text: 'No — I need direct patient care to feel fulfilled', next_node_id: 'DEEP1', axis_deltas: { procedural_affinity: 1, acute_vs_longitudinal: -1 } },
      ]},
    ],
    'Q3_GENERAL_FORCING': [
      { node_id: 'GEN_SCIENCE', order: 4, is_universal: false, question_text: 'If you had to pick one aspect of medicine as your primary focus, what would it be?', options: [
        { option_text: 'The science — understanding disease mechanisms', next_node_id: 'GEN_ART', axis_deltas: { diagnostic_puzzle_affinity: 1, research_academic_affinity: 1 } },
        { option_text: 'The art — connecting with patients and their stories', next_node_id: 'GEN_ART', axis_deltas: { acute_vs_longitudinal: -1, psych_affinity: 1 } },
        { option_text: 'The craft — procedures and technical skills', next_node_id: 'GEN_ART', axis_deltas: { procedural_affinity: 1 } },
      ]},
      { node_id: 'GEN_ART', order: 5, is_universal: false, question_text: 'Would you rather work in a community setting or an academic medical center?', options: [
        { option_text: 'Community — I want to serve a local population', next_node_id: 'GEN_EMERGENCY', axis_deltas: { public_health_affinity: 1 } },
        { option_text: 'Academic — I want research and teaching', next_node_id: 'GEN_EMERGENCY', axis_deltas: { research_academic_affinity: 2 } },
        { option_text: 'Either — I am flexible', next_node_id: 'GEN_EMERGENCY', axis_deltas: {} },
      ]},
      { node_id: 'GEN_EMERGENCY', order: 6, is_universal: false, question_text: 'How important is it to have predictable hours vs. shift-based work?', options: [
        { option_text: 'Predictable hours — I need routine', next_node_id: 'DEEP1', axis_deltas: { lifestyle_priority: 2, emergency_tolerance: -1 } },
        { option_text: 'Shift-based is fine — I like variety', next_node_id: 'DEEP1', axis_deltas: { emergency_tolerance: 1 } },
        { option_text: 'A mix of both works best for me', next_node_id: 'DEEP1', axis_deltas: {} },
      ]},
    ],
    // --- Path graph branches ---
    'GULF_FOCUS': [
      { node_id: 'GULF_PREP', order: 4, is_universal: false, question_text: 'How prepared are you for the Gulf licensing process (Prometric, dataflow, etc.)?', options: [
        { option_text: 'I have done extensive research and know the steps', next_node_id: 'GULF_ACCLIMATE', axis_deltas: { exam_tolerance: 1, gulf_preference: 1 } },
        { option_text: 'I know the basics but need guidance', next_node_id: 'GULF_ACCLIMATE', axis_deltas: { time_investment: 1 } },
        { option_text: 'I am starting from scratch', next_node_id: 'GULF_ACCLIMATE', axis_deltas: { time_investment: 2 } },
      ]},
      { node_id: 'GULF_ACCLIMATE', order: 5, is_universal: false, question_text: 'How important is the social and cultural environment in your Gulf destination choice?', options: [
        { option_text: 'Very — I want a familiar Arab cultural setting', next_node_id: 'GULF_FAMILY', axis_deltas: { gulf_preference: 1 } },
        { option_text: 'Moderately — work conditions matter more', next_node_id: 'GULF_FAMILY', axis_deltas: { income_expectation: 1 } },
        { option_text: 'Not a concern — I adapt easily', next_node_id: 'GULF_FAMILY', axis_deltas: { willingness_relocate: 1 } },
      ]},
      { node_id: 'GULF_FAMILY', order: 6, is_universal: false, question_text: 'Would you plan to bring your family to the Gulf or work there while they remain in Egypt?', options: [
        { option_text: 'Bring them — we would relocate together', next_node_id: 'DEEP1', axis_deltas: { gulf_preference: 1, willingness_relocate: 1 } },
        { option_text: 'Commute and send remittances — family stays in Egypt', next_node_id: 'DEEP1', axis_deltas: { income_expectation: 2, egypt_stability: 1 } },
        { option_text: 'Not applicable — single or no dependents', next_node_id: 'DEEP1', axis_deltas: { willingness_relocate: 1 } },
      ]},
    ],
    'EUROPE_FOCUS': [
      { node_id: 'EUR_LANGUAGE', order: 4, is_universal: false, question_text: 'How committed are you to learning a new language for your European move?', options: [
        { option_text: 'Fully committed — I enjoy learning languages', next_node_id: 'EUR_SPECIALTY', axis_deltas: { language_learning: 3, time_investment: 2 } },
        { option_text: 'I am willing but it is a significant hurdle', next_node_id: 'EUR_SPECIALTY', axis_deltas: { language_learning: 2 } },
        { option_text: 'I prefer English-only destinations', next_node_id: 'EUR_SPECIALTY', axis_deltas: { language_learning: 0, western_preference: 1 } },
      ]},
      { node_id: 'EUR_SPECIALTY', order: 5, is_universal: false, question_text: 'Would you consider a European country where your specialty is in high demand?', options: [
        { option_text: 'Yes — demand matters most to me', next_node_id: 'EUR_LIFESTYLE', axis_deltas: { western_preference: 1, income_expectation: 1 } },
        { option_text: 'Somewhat — I also care about the country itself', next_node_id: 'EUR_LIFESTYLE', axis_deltas: { western_preference: 1 } },
        { option_text: 'No — I have a specific country in mind', next_node_id: 'EUR_LIFESTYLE', axis_deltas: { western_preference: 2 } },
      ]},
      { node_id: 'EUR_LIFESTYLE', order: 6, is_universal: false, question_text: 'How important is work-life balance in your European destination?', options: [
        { option_text: 'Critical — that is why I am considering Europe', next_node_id: 'DEEP1', axis_deltas: { western_preference: 1, income_expectation: -1 } },
        { option_text: 'Important but income matters too', next_node_id: 'DEEP1', axis_deltas: { income_expectation: 1 } },
        { option_text: 'Secondary — career growth is my focus', next_node_id: 'DEEP1', axis_deltas: { research_academic_orientation: 1 } },
      ]},
    ],
    'NA_FOCUS': [
      { node_id: 'NA_EXAMS', order: 4, is_universal: false, question_text: 'How prepared are you for the rigorous exam process (USMLE/MCCQE)?', options: [
        { option_text: 'Very — I have started or completed preparation', next_node_id: 'NA_MATCH', axis_deltas: { exam_tolerance: 2, time_investment: 1 } },
        { option_text: 'Somewhat — I know what is required', next_node_id: 'NA_MATCH', axis_deltas: { exam_tolerance: 1 } },
        { option_text: 'Not at all — it is overwhelming to consider', next_node_id: 'NA_MATCH', axis_deltas: { exam_tolerance: -1, cost_tolerance: 1 } },
      ]},
      { node_id: 'NA_MATCH', order: 5, is_universal: false, question_text: 'Are you willing to go through the Match/residency process again in North America?', options: [
        { option_text: 'Yes — I am prepared to redo residency', next_node_id: 'NA_COST', axis_deltas: { time_investment: 3, exam_tolerance: 1 } },
        { option_text: 'Only if I can get credit for my training', next_node_id: 'NA_COST', axis_deltas: { time_investment: 1 } },
        { option_text: 'No — I want direct practice or observership pathways', next_node_id: 'NA_COST', axis_deltas: { time_investment: -1 } },
      ]},
      { node_id: 'NA_COST', order: 6, is_universal: false, question_text: 'How do you plan to fund the North America process (exams, applications, travel)?', options: [
        { option_text: 'Self-fund — I have savings', next_node_id: 'DEEP1', axis_deltas: { cost_tolerance: 2, income_expectation: 2 } },
        { option_text: 'Loans or family support', next_node_id: 'DEEP1', axis_deltas: { cost_tolerance: 1 } },
        { option_text: 'I need scholarships or sponsored programs', next_node_id: 'DEEP1', axis_deltas: { cost_tolerance: -1 } },
      ]},
    ],
    'OCEANIA_FOCUS': [
      { node_id: 'OCEANIA_VISA', order: 4, is_universal: false, question_text: 'How important is the ease of the visa and registration process for your destination?', options: [
        { option_text: 'Very — I want a straightforward pathway', next_node_id: 'OCEANIA_SPECIALTY', axis_deltas: { exam_tolerance: 1, time_investment: -1 } },
        { option_text: 'Moderately — I am willing to navigate complexity', next_node_id: 'OCEANIA_SPECIALTY', axis_deltas: { time_investment: 1 } },
        { option_text: 'Not a concern — process is process', next_node_id: 'OCEANIA_SPECIALTY', axis_deltas: { willingness_relocate: 1 } },
      ]},
      { node_id: 'OCEANIA_SPECIALTY', order: 5, is_universal: false, question_text: 'Would you consider working rurally or in underserved areas in Australia/New Zealand for faster registration?', options: [
        { option_text: 'Yes — I am open to rural practice', next_node_id: 'DEEP1', axis_deltas: { humanitarian_orientation: 1, willingness_relocate: 1 } },
        { option_text: 'Only metropolitan areas', next_node_id: 'DEEP1', axis_deltas: { western_preference: 1, income_expectation: 1 } },
        { option_text: 'I need to learn more about the options first', next_node_id: 'DEEP1', axis_deltas: { time_investment: 1 } },
      ]},
    ],
    'EGYPT_PATH': [
      { node_id: 'EGYPT_MOTIVE', order: 4, is_universal: false, question_text: 'What is your main reason for staying in Egypt?', options: [
        { option_text: 'Family and personal roots', next_node_id: 'EGYPT_SECTOR', axis_deltas: { egypt_stability: 2 } },
        { option_text: 'I believe in building up the Egyptian healthcare system', next_node_id: 'EGYPT_SECTOR', axis_deltas: { egypt_stability: 1, humanitarian_orientation: 1 } },
        { option_text: 'I prefer not to leave — familiarity and comfort', next_node_id: 'EGYPT_SECTOR', axis_deltas: { egypt_stability: 2, willingness_relocate: -1 } },
        { option_text: 'Financial constraints make moving abroad difficult', next_node_id: 'EGYPT_SECTOR', axis_deltas: { cost_tolerance: -1 } },
      ]},
      { node_id: 'EGYPT_SECTOR', order: 5, is_universal: false, question_text: 'How do you view the differences between government, private, and academic sectors in Egypt?', options: [
        { option_text: 'I prefer the stability and pension of government work', next_node_id: 'EGYPT_GROWTH', axis_deltas: { egypt_stability: 1, income_expectation: -1 } },
        { option_text: 'Private sector — better income and autonomy', next_node_id: 'EGYPT_GROWTH', axis_deltas: { income_expectation: 2 } },
        { option_text: 'Academic — I want teaching and research', next_node_id: 'EGYPT_GROWTH', axis_deltas: { research_academic_orientation: 2 } },
      ]},
      { node_id: 'EGYPT_GROWTH', order: 6, is_universal: false, question_text: 'Do you see yourself staying in Egypt long-term or eventually moving abroad?', options: [
        { option_text: 'Long-term — Egypt is where I want to be', next_node_id: 'DEEP1', axis_deltas: { egypt_stability: 2 } },
        { option_text: 'Build experience here first, then consider abroad', next_node_id: 'DEEP1', axis_deltas: { egypt_stability: 1, willingness_relocate: 1 } },
        { option_text: 'Use Egypt as a base while pursuing international opportunities', next_node_id: 'DEEP1', axis_deltas: { egypt_stability: 1, gulf_preference: 1 } },
      ]},
    ],
    'NON_CLINICAL_PATH': [
      { node_id: 'NONCLIN_SKILLS', order: 4, is_universal: false, question_text: 'What non-clinical skills do you already have?', options: [
        { option_text: 'Research and academic writing', next_node_id: 'NONCLIN_EDUCATION', axis_deltas: { research_academic_orientation: 2 } },
        { option_text: 'Administration, management, or leadership', next_node_id: 'NONCLIN_EDUCATION', axis_deltas: { clinical_vs_admin: -2 } },
        { option_text: 'Technology, data, or informatics', next_node_id: 'NONCLIN_EDUCATION', axis_deltas: { clinical_vs_admin: -1 } },
        { option_text: 'Public health, policy, or advocacy', next_node_id: 'NONCLIN_EDUCATION', axis_deltas: { humanitarian_orientation: 2 } },
      ]},
      { node_id: 'NONCLIN_EDUCATION', order: 5, is_universal: false, question_text: 'Would you pursue additional education (MPH, MBA, MS) to strengthen your non-clinical profile?', options: [
        { option_text: 'Yes — already planning to or currently doing so', next_node_id: 'NONCLIN_EARNINGS', axis_deltas: { time_investment: 2, research_academic_orientation: 1 } },
        { option_text: 'Maybe — depends on the program length and cost', next_node_id: 'NONCLIN_EARNINGS', axis_deltas: { time_investment: 1 } },
        { option_text: 'No — I want to transition without more school', next_node_id: 'NONCLIN_EARNINGS', axis_deltas: { time_investment: -1 } },
      ]},
      { node_id: 'NONCLIN_EARNINGS', order: 6, is_universal: false, question_text: 'What are your income expectations for a non-clinical role?', options: [
        { option_text: 'Comparable to clinical practice or higher', next_node_id: 'DEEP1', axis_deltas: { income_expectation: 2, clinical_vs_admin: -1 } },
        { option_text: 'Slightly less than clinical — I accept the tradeoff', next_node_id: 'DEEP1', axis_deltas: { income_expectation: 0 } },
        { option_text: 'I am flexible — impact matters more than income', next_node_id: 'DEEP1', axis_deltas: { humanitarian_orientation: 1, research_academic_orientation: 1 } },
      ]},
    ],
    // --- Nurse Specialty branches (critical/acute cluster) ---
    'ER_FOCUS': [
      { node_id: 'ER_TRIAGE', order: 4, is_universal: false, question_text: 'In the emergency department, what role fits you best?', options: [
        { option_text: 'Trauma bay — major resuscitation, bleeding control, coding patients', next_node_id: 'ER_ACUITY', axis_deltas: { critical_care_acuity: 2, procedural_technical: 1 } },
        { option_text: 'Triage — rapid assessment and patient flow', next_node_id: 'ER_ACUITY', axis_deltas: { acute_vs_chronic: 1, patient_education_affinity: 1 } },
        { option_text: 'Fast track — managing moderate acuity with efficiency', next_node_id: 'ER_ACUITY', axis_deltas: { acute_vs_chronic: 1, lifestyle_priority: 1 } },
      ]},
      { node_id: 'ER_ACUITY', order: 5, is_universal: false, question_text: 'How do you handle the constant flow and unpredictability of the ER?', options: [
        { option_text: 'I thrive on it — the chaos keeps me sharp', next_node_id: 'ER_TEAM', axis_deltas: { critical_care_acuity: 2, acute_vs_chronic: 1 } },
        { option_text: 'I manage it well with good organizational skills', next_node_id: 'ER_TEAM', axis_deltas: { acute_vs_chronic: 1 } },
        { option_text: 'It can be overwhelming — I need periods of calm', next_node_id: 'ER_TEAM', axis_deltas: { critical_care_acuity: -1, lifestyle_priority: 1 } },
      ]},
      { node_id: 'ER_TEAM', order: 6, is_universal: false, question_text: 'Multi-disciplinary teamwork in the ER — essential part of the job or a challenge?', options: [
        { option_text: 'Essential — I love the collaboration', next_node_id: 'DEEP1', axis_deltas: { acute_vs_chronic: 1 } },
        { option_text: 'A necessary part of the job', next_node_id: 'DEEP1', axis_deltas: {} },
        { option_text: 'Often frustrating — too many competing priorities', next_node_id: 'DEEP1', axis_deltas: { management_leadership: 1 } },
      ]},
    ],
    'ICU_FOCUS': [
      { node_id: 'ICU_RATIO', order: 4, is_universal: false, question_text: 'One-to-one or one-to-two critical care — which ratio suits you?', options: [
        { option_text: 'One-to-one — deep focus on a single critically ill patient', next_node_id: 'ICU_TECH', axis_deltas: { critical_care_acuity: 2, procedural_technical: 1 } },
        { option_text: 'One-to-two — I like the variety and pace', next_node_id: 'ICU_TECH', axis_deltas: { critical_care_acuity: 1, acute_vs_chronic: 1 } },
        { option_text: 'I prefer progressive care / step-down over full ICU', next_node_id: 'ICU_TECH', axis_deltas: { critical_care_acuity: -1 } },
      ]},
      { node_id: 'ICU_TECH', order: 5, is_universal: false, question_text: 'How comfortable are you with complex ICU technology — vents, CRRT, invasive lines?', options: [
        { option_text: 'Very — the technology is exciting to me', next_node_id: 'ICU_FAMILY', axis_deltas: { procedural_technical: 2 } },
        { option_text: 'Adequate — I can learn what I need to know', next_node_id: 'ICU_FAMILY', axis_deltas: { procedural_technical: 1 } },
        { option_text: 'I prefer less technology-heavy nursing environments', next_node_id: 'ICU_FAMILY', axis_deltas: { procedural_technical: -1, patient_education_affinity: 1 } },
      ]},
      { node_id: 'ICU_FAMILY', order: 6, is_universal: false, question_text: 'Family communication in the ICU — how much does it affect you?', options: [
        { option_text: 'It is a core part of the job I take seriously', next_node_id: 'DEEP1', axis_deltas: { patient_education_affinity: 1, psych_affinity: 1 } },
        { option_text: 'Important but I let the doctors handle the hard conversations', next_node_id: 'DEEP1', axis_deltas: { patient_education_affinity: 1 } },
        { option_text: 'It drains me — I prefer fewer family interactions', next_node_id: 'DEEP1', axis_deltas: { psych_affinity: -1 } },
      ]},
    ],
    'ADULT_CRITICAL': [
      { node_id: 'ADULT_CRIT_VENT', order: 5, is_universal: false, question_text: 'Managing ventilators, CRRT, and multi-organ support — does this excite you?', options: [
        { option_text: 'Yes — complex critical care is my passion', next_node_id: 'ADULT_CRIT_DECISIONS', axis_deltas: { critical_care_acuity: 2, procedural_technical: 2 } },
        { option_text: 'I can do it competently', next_node_id: 'ADULT_CRIT_DECISIONS', axis_deltas: { critical_care_acuity: 1, procedural_technical: 1 } },
        { option_text: 'I prefer less invasive, more holistic care', next_node_id: 'ADULT_CRIT_DECISIONS', axis_deltas: { procedural_technical: -1 } },
      ]},
      { node_id: 'ADULT_CRIT_DECISIONS', order: 6, is_universal: false, question_text: 'How do you handle goals-of-care conversations and end-of-life decisions with families?', options: [
        { option_text: 'I find meaning in helping families through these moments', next_node_id: 'ADULT_CRIT_TRANSPORT', axis_deltas: { psych_affinity: 1, patient_education_affinity: 1 } },
        { option_text: 'I can participate but they stay with me', next_node_id: 'ADULT_CRIT_TRANSPORT', axis_deltas: { psych_affinity: 1 } },
        { option_text: 'I find them very difficult — I prefer curative-focused settings', next_node_id: 'ADULT_CRIT_TRANSPORT', axis_deltas: { psych_affinity: -1, acute_vs_chronic: 1 } },
      ]},
      { node_id: 'ADULT_CRIT_TRANSPORT', order: 7, is_universal: false, question_text: 'Would you consider critical care transport (helicopter or ground)?', options: [
        { option_text: 'Yes — that sounds exciting and challenging', next_node_id: 'DEEP1', axis_deltas: { critical_care_acuity: 1, acute_vs_chronic: 1 } },
        { option_text: 'Maybe — depends on the setting and patient population', next_node_id: 'DEEP1', axis_deltas: { lifestyle_priority: 1 } },
        { option_text: 'No — I prefer a fixed-unit environment', next_node_id: 'DEEP1', axis_deltas: { lifestyle_priority: 1, acute_vs_chronic: -1 } },
      ]},
    ],
    'NICU_FOCUS': [
      { node_id: 'NICU_TINY', order: 5, is_universal: false, question_text: 'Caring for micro-preemies and extremely fragile neonates — rewarding or overwhelming?', options: [
        { option_text: 'Deeply rewarding — these are the patients who need us most', next_node_id: 'NICU_PARENTS', axis_deltas: { pediatric_affinity: 2, critical_care_acuity: 1 } },
        { option_text: 'Rewarding but the emotional weight is significant', next_node_id: 'NICU_PARENTS', axis_deltas: { pediatric_affinity: 1, psych_affinity: 1 } },
        { option_text: 'Overwhelming — I prefer older, more stable patients', next_node_id: 'NICU_PARENTS', axis_deltas: { pediatric_affinity: -1 } },
      ]},
      { node_id: 'NICU_PARENTS', order: 6, is_universal: false, question_text: 'Parent bonding and coaching in the NICU — is this part of your calling?', options: [
        { option_text: 'Yes — supporting parents is as important as caring for the baby', next_node_id: 'NICU_OUTCOMES', axis_deltas: { patient_education_affinity: 2, pediatric_affinity: 1 } },
        { option_text: 'I support parents but focus mainly on the infant', next_node_id: 'NICU_OUTCOMES', axis_deltas: { pediatric_affinity: 1 } },
        { option_text: 'I prefer the technical aspect — let social work handle family support', next_node_id: 'NICU_OUTCOMES', axis_deltas: { procedural_technical: 1 } },
      ]},
      { node_id: 'NICU_OUTCOMES', order: 7, is_universal: false, question_text: 'How do you cope with the emotional toll of neonatal loss and adverse outcomes?', options: [
        { option_text: 'I process it through team debriefing and peer support', next_node_id: 'DEEP1', axis_deltas: { psych_affinity: 1 } },
        { option_text: 'It is hard but I compartmentalize', next_node_id: 'DEEP1', axis_deltas: { management_leadership: 1 } },
        { option_text: 'It accumulates over time — it is my biggest concern about NICU', next_node_id: 'DEEP1', axis_deltas: { psych_affinity: -1, lifestyle_priority: 1 } },
      ]},
    ],
    // --- Nurse Specialty branches (perioperative cluster) ---
    'OR_FOCUS': [
      { node_id: 'OR_ROLE', order: 4, is_universal: false, question_text: 'Which perioperative role appeals to you most?', options: [
        { option_text: 'Scrub nurse — sterile field, instruments, anticipating the surgeon', next_node_id: 'OR_PRECISION', axis_deltas: { procedural_technical: 2, acute_vs_chronic: 1 } },
        { option_text: 'Circulating nurse — coordination, positioning, documentation', next_node_id: 'OR_PRECISION', axis_deltas: { management_leadership: 1, procedural_technical: 1 } },
        { option_text: 'PACU — one-on-one recovery after anesthesia', next_node_id: 'OR_PRECISION', axis_deltas: { critical_care_acuity: 1, acute_vs_chronic: 1 } },
      ]},
      { node_id: 'OR_PRECISION', order: 5, is_universal: false, question_text: 'How do you feel about the meticulous, repetitive nature of OR nursing?', options: [
        { option_text: 'I thrive on precision and consistency', next_node_id: 'OR_SCHEDULE', axis_deltas: { procedural_technical: 1 } },
        { option_text: 'I appreciate it but need variety sometimes', next_node_id: 'OR_SCHEDULE', axis_deltas: {} },
        { option_text: 'I find it tedious — I prefer more dynamic environments', next_node_id: 'OR_SCHEDULE', axis_deltas: { acute_vs_chronic: 1, critical_care_acuity: 1 } },
      ]},
      { node_id: 'OR_SCHEDULE', order: 6, is_universal: false, question_text: 'On-call shifts, trauma cases, and weekend surgeries — dealbreaker or acceptable?', options: [
        { option_text: 'Acceptable — I knew what I signed up for', next_node_id: 'DEEP1', axis_deltas: { acute_vs_chronic: 1, lifestyle_priority: -1 } },
        { option_text: 'Tolerable if the schedule is fair and predictable', next_node_id: 'DEEP1', axis_deltas: { lifestyle_priority: 1 } },
        { option_text: 'A significant drawback — I want a predictable schedule', next_node_id: 'DEEP1', axis_deltas: { lifestyle_priority: 2 } },
      ]},
    ],
    // --- Nurse Specialty branches (management/education cluster) ---
    'MANAGEMENT_FOCUS': [
      { node_id: 'MGMT_STYLE', order: 4, is_universal: false, question_text: 'What kind of nursing leader do you want to be?', options: [
        { option_text: 'Hands-on unit manager — staffing, scheduling, mentoring daily', next_node_id: 'MGMT_CHALLENGES', axis_deltas: { management_leadership: 2, admin_systems_affinity: 1 } },
        { option_text: 'Strategic leader — quality improvement, policy, big picture', next_node_id: 'MGMT_CHALLENGES', axis_deltas: { admin_systems_affinity: 2, management_leadership: 1 } },
        { option_text: 'I want to lead through clinical expertise, not management', next_node_id: 'MGMT_CHALLENGES', axis_deltas: { patient_education_affinity: 1 } },
      ]},
      { node_id: 'MGMT_CHALLENGES', order: 5, is_universal: false, question_text: 'Staffing shortages and budget constraints — how do you handle these?', options: [
        { option_text: 'I find creative solutions and advocate for my team', next_node_id: 'MGMT_CLINICAL', axis_deltas: { management_leadership: 1, admin_systems_affinity: 1 } },
        { option_text: 'I manage within constraints but it frustrates me', next_node_id: 'MGMT_CLINICAL', axis_deltas: { management_leadership: 1 } },
        { option_text: 'This is the part of management I dread most', next_node_id: 'MGMT_CLINICAL', axis_deltas: { admin_systems_affinity: -1 } },
      ]},
      { node_id: 'MGMT_CLINICAL', order: 6, is_universal: false, question_text: 'Would you stay clinically active while managing, or go fully administrative?', options: [
        { option_text: 'Stay clinically active — I need patient contact to stay grounded', next_node_id: 'DEEP1', axis_deltas: { management_leadership: 1, acute_vs_chronic: 1 } },
        { option_text: 'A mix — some clinical, some admin', next_node_id: 'DEEP1', axis_deltas: { management_leadership: 1 } },
        { option_text: 'Fully administrative — my impact is on systems, not individuals', next_node_id: 'DEEP1', axis_deltas: { admin_systems_affinity: 1, management_leadership: 1 } },
      ]},
    ],
    'TEACHING_FOCUS': [
      { node_id: 'EDUC_SETTING', order: 4, is_universal: false, question_text: 'What kind of nurse educator appeals to you?', options: [
        { option_text: 'Academic — teaching in nursing schools and universities', next_node_id: 'EDUC_LEARNERS', axis_deltas: { patient_education_affinity: 2, management_leadership: 1 } },
        { option_text: 'Clinical precepting — one-on-one with new nurses at the bedside', next_node_id: 'EDUC_LEARNERS', axis_deltas: { patient_education_affinity: 2, procedural_technical: 1 } },
        { option_text: 'Community outreach — health education for populations', next_node_id: 'EDUC_LEARNERS', axis_deltas: { community_outreach: 2, patient_education_affinity: 1 } },
      ]},
      { node_id: 'EDUC_LEARNERS', order: 5, is_universal: false, question_text: 'Who do you most want to teach?', options: [
        { option_text: 'Nursing students and new graduates — shaping the next generation', next_node_id: 'EDUC_GROWTH', axis_deltas: { patient_education_affinity: 1, management_leadership: 1 } },
        { option_text: 'Experienced nurses seeking specialization', next_node_id: 'EDUC_GROWTH', axis_deltas: { patient_education_affinity: 1 } },
        { option_text: 'Patients and families in the community', next_node_id: 'EDUC_GROWTH', axis_deltas: { community_outreach: 2, patient_education_affinity: 1 } },
      ]},
      { node_id: 'EDUC_GROWTH', order: 6, is_universal: false, question_text: 'Would you pursue an advanced degree (MSN, DNP, PhD) for education?', options: [
        { option_text: 'Yes — already planning to or currently pursuing', next_node_id: 'DEEP1', axis_deltas: { management_leadership: 2, income_priority: 1 } },
        { option_text: 'Maybe — depends on program length and cost', next_node_id: 'DEEP1', axis_deltas: { income_priority: 1 } },
        { option_text: 'No — I want to teach from clinical experience, not academia', next_node_id: 'DEEP1', axis_deltas: { patient_education_affinity: 1 } },
      ]},
    ],
    // OB/GYN branch — expansion via Q2_NEUTRAL's ob_gyn terminal option
    'Q2_NEUTRAL': [
      { node_id: 'OBGYN_CLINICAL', order: 4, is_universal: false, question_text: 'What aspect of women\'s health draws you most?', options: [
        { option_text: 'Obstetrics — pregnancy, delivery, and childbirth', next_node_id: 'OBGYN_SURGERY', axis_deltas: { ob_gyn_affinity: 2, procedural_affinity: 1 } },
        { option_text: 'Gynecology — surgical and medical care of the female reproductive system', next_node_id: 'OBGYN_SURGERY', axis_deltas: { ob_gyn_affinity: 2, surgical_tolerance: 1 } },
        { option_text: 'Reproductive endocrinology and infertility', next_node_id: 'OBGYN_SURGERY', axis_deltas: { ob_gyn_affinity: 1, research_academic_affinity: 1 } },
      ]},
      { node_id: 'OBGYN_SURGERY', order: 5, is_universal: false, question_text: 'How do you feel about the surgical component of OB/GYN?', options: [
        { option_text: 'I love it — surgery is a big draw for me', next_node_id: 'OBGYN_LIFESTYLE', axis_deltas: { surgical_tolerance: 1, procedural_affinity: 1 } },
        { option_text: 'I can do it but it is not my favorite part', next_node_id: 'OBGYN_LIFESTYLE', axis_deltas: { surgical_tolerance: 0 } },
        { option_text: 'I prefer the medical management aspects', next_node_id: 'OBGYN_LIFESTYLE', axis_deltas: { diagnostic_puzzle_affinity: 1 } },
      ]},
      { node_id: 'OBGYN_LIFESTYLE', order: 6, is_universal: false, question_text: 'How do you feel about the on-call demands and unpredictability of obstetrics?', options: [
        { option_text: 'I accept it — babies arrive on their own schedule', next_node_id: 'DEEP1', axis_deltas: { emergency_tolerance: 1 } },
        { option_text: 'It is a concern but manageable', next_node_id: 'DEEP1', axis_deltas: { lifestyle_priority: 1 } },
        { option_text: 'It is a significant drawback for me', next_node_id: 'DEEP1', axis_deltas: { lifestyle_priority: 2 } },
      ]},
    ],
  };

  // Generic expansion for any terminal not specifically mapped
  const nurseGeneric = [
    { node_id: `${nodeId}_EXPLORE1`, order: 4, is_universal: false, question_text: 'What interests you most about this area of nursing?', options: [
      { option_text: 'The clinical challenges and critical thinking', next_node_id: `${nodeId}_EXPLORE2`, axis_deltas: { critical_care_acuity: 1 } },
      { option_text: 'The patient relationships and connection', next_node_id: `${nodeId}_EXPLORE2`, axis_deltas: { patient_education_affinity: 1 } },
      { option_text: 'The hands-on procedures and skills', next_node_id: `${nodeId}_EXPLORE2`, axis_deltas: { procedural_technical: 1 } },
    ]},
    { node_id: `${nodeId}_EXPLORE2`, order: 5, is_universal: false, question_text: 'Would you prefer a broad scope or a focused area in this field?', options: [
      { option_text: 'Broad scope — I like variety', next_node_id: `${nodeId}_EXPLORE3`, axis_deltas: {} },
      { option_text: 'Focused expertise — deep knowledge in one niche', next_node_id: `${nodeId}_EXPLORE3`, axis_deltas: { patient_education_affinity: 1 } },
    ]},
    { node_id: `${nodeId}_EXPLORE3`, order: 6, is_universal: false, question_text: 'How important is work-life balance in this area compared to income?', options: [
      { option_text: 'Balance matters more', next_node_id: 'DEEP1', axis_deltas: { lifestyle_priority: 1, income_priority: -1 } },
      { option_text: 'Income matters more', next_node_id: 'DEEP1', axis_deltas: { income_priority: 1 } },
      { option_text: 'Both are equally important', next_node_id: 'DEEP1', axis_deltas: {} },
    ]},
  ];

  const generic = [
    { node_id: `${nodeId}_EXPLORE1`, order: 4, is_universal: false, question_text: 'What interests you most about this area of medicine?', options: [
      { option_text: 'The clinical challenges and complexity', next_node_id: `${nodeId}_EXPLORE2`, axis_deltas: { diagnostic_puzzle_affinity: 1 } },
      { option_text: 'The patient relationships and continuity', next_node_id: `${nodeId}_EXPLORE2`, axis_deltas: { acute_vs_longitudinal: -1 } },
      { option_text: 'The procedures and hands-on work', next_node_id: `${nodeId}_EXPLORE2`, axis_deltas: { procedural_affinity: 1 } },
    ]},
    { node_id: `${nodeId}_EXPLORE2`, order: 5, is_universal: false, question_text: 'Would you prefer a broad scope or a focused sub-specialty in this area?', options: [
      { option_text: 'Broad scope — I like variety', next_node_id: `${nodeId}_EXPLORE3`, axis_deltas: {} },
      { option_text: 'Sub-specialty — deep expertise in one niche', next_node_id: `${nodeId}_EXPLORE3`, axis_deltas: { diagnostic_puzzle_affinity: 1 } },
    ]},
    { node_id: `${nodeId}_EXPLORE3`, order: 6, is_universal: false, question_text: 'How important is work-life balance in this field compared to income?', options: [
      { option_text: 'Balance matters more', next_node_id: 'DEEP1', axis_deltas: { lifestyle_priority: 1, income_priority: -1 } },
      { option_text: 'Income matters more', next_node_id: 'DEEP1', axis_deltas: { income_priority: 1 } },
      { option_text: 'Both are equally important', next_node_id: 'DEEP1', axis_deltas: {} },
    ]},
  ];

  return expansions[nodeId] || (role === 'nurse' ? nurseGeneric : generic);
}

// ============================================================
// Build expanded graph
// ============================================================

let identCounter = 0;
function uniqueId(prefix) {
  return `${prefix}_${++identCounter}`;
}

function expandGraph(baseGraph, type, graphLabel) {
  const nodeMap = new Map();
  const newNodes = [];

  // Collect existing nodes
  for (const node of baseGraph.nodes) {
    nodeMap.set(node.node_id, { ...node });
  }

  // Identify terminal nodes (any node with an option that has null/invalid next_node_id)
  const terminalOptions = []; // { parentNodeId, optionIndex, branchContext }
  for (const node of baseGraph.nodes) {
    if (!node.options) continue;
    for (let i = 0; i < node.options.length; i++) {
      const opt = node.options[i];
      if (!opt.next_node_id || !nodeMap.has(opt.next_node_id)) {
        terminalOptions.push({ parentNodeId: node.node_id, optionIndex: i, option: opt });
      }
    }
  }

  console.log(`\n[${graphLabel}] Found ${terminalOptions.length} terminal options across ${baseGraph.nodes.length} nodes`);

  // Expand each terminal into a branch-specific chain
  // Skip calibration nodes — they are always true terminals
  let totalNewNodes = 0;
  for (const tOpt of terminalOptions) {
    const branchId = tOpt.parentNodeId;

    // Skip expansion for calibration nodes (true survey terminals)
    if (branchId.startsWith('CALIB_')) continue;

    const expansion = expandBranchNode(branchId, null, identCounter, baseGraph.role);

    // Replace the null next_node_id with the first expansion node
    const parentNode = nodeMap.get(branchId);
    if (parentNode) {
      parentNode.options[tOpt.optionIndex] = {
        ...tOpt.option,
        next_node_id: expansion[0].node_id,
      };
    }

    for (const newNode of expansion) {
      if (!nodeMap.has(newNode.node_id)) {
        nodeMap.set(newNode.node_id, newNode);
        newNodes.push(newNode);
        totalNewNodes++;
      }
    }
  }

  console.log(`[${graphLabel}] Added ${totalNewNodes} branch-specific expansion nodes`);

  // Add shared chains (deep-dive, value, calibration)
  const isNurse = baseGraph.role === 'nurse' && type === 'specialty';
  const deepChain = isNurse ? makeNurseDeepChain() : makeDeepChain(type);
  const valueChain = makeValueChain(type, baseGraph.role);
  const calibChain = makeCalibrationChain(type, baseGraph.role);

  let sharedAdded = 0;
  for (const chain of [deepChain, valueChain, calibChain]) {
    for (const node of chain) {
      if (!nodeMap.has(node.node_id)) {
        nodeMap.set(node.node_id, node);
        newNodes.push(node);
        sharedAdded++;
      }
    }
  }

  console.log(`[${graphLabel}] Added ${sharedAdded} shared chain nodes (deep-dive + value + calibration)`);

  // Build final node list (existing order preserved, new nodes appended)
  const finalNodes = [
    ...baseGraph.nodes.map(n => ({ ...nodeMap.get(n.node_id) })),
    ...newNodes,
  ];

  // Sanity check: count nodes + trace paths
  console.log(`[${graphLabel}] Total nodes: ${finalNodes.length}`);

  // ============================================================
  // Path tracing
  // ============================================================
  function tracePath(startNodeId, pathNodes) {
    const path = [];
    let current = startNodeId;
    while (current && nodeMap.has(current)) {
      const node = nodeMap.get(current);
      path.push(node);
      if (node.options && node.options.length > 0) {
        const nextId = node.options[0].next_node_id;
        if (nextId && nodeMap.has(nextId)) {
          // Check for cycle
          if (path.some(p => p.node_id === nextId)) break;
          current = nextId;
        } else {
          break;
        }
      } else {
        break;
      }
    }
    return path;
  }

  // Trace one full path starting from ROOT, following the first option each time
  const rootPath = tracePath(baseGraph.root_node_id, []);
  console.log(`[${graphLabel}] Full path (following first option): ${rootPath.length} nodes`);
  for (const n of rootPath) {
    const options = n.options ? n.options.map(o => o.option_text.substring(0, 30) + (o.option_text.length > 30 ? '...' : '')).join(' | ') : '';
    console.log(`    ${n.node_id}: ${n.question_text.substring(0, 50)}${n.question_text.length > 50 ? '...' : ''}`);
  }

  // Verify calibration is reachable
  const hasCalib = rootPath.some(n => n.node_id.startsWith('CALIB_'));
  console.log(`[${graphLabel}] Calibration reachable on first-option path: ${hasCalib}`);

  // Trace a path following the LAST option (to maximize delta diversity)
  function traceLastPath(startNodeId) {
    const path = [];
    let current = startNodeId;
    const visited = new Set();
    while (current && nodeMap.has(current) && !visited.has(current)) {
      visited.add(current);
      const node = nodeMap.get(current);
      path.push(node);
      if (node.options && node.options.length > 0) {
        const lastOpt = node.options[node.options.length - 1];
        if (lastOpt.next_node_id && nodeMap.has(lastOpt.next_node_id)) {
          current = lastOpt.next_node_id;
        } else {
          break;
        }
      } else {
        break;
      }
    }
    return path;
  }

  const lastPath = traceLastPath(baseGraph.root_node_id);
  console.log(`[${graphLabel}] Full path (following LAST option): ${lastPath.length} nodes`);
  const hasCalibLast = lastPath.some(n => n.node_id.startsWith('CALIB_'));
  console.log(`[${graphLabel}] Calibration reachable on last-option path: ${hasCalibLast}`);

  return finalNodes;
}

// ============================================================
// Main
// ============================================================

// Read shallow seed files
async function main() {
  const graphs = [
    { file: 'survey-specialty-doctor.js', type: 'specialty', label: 'Doctor Specialty' },
    { file: 'survey-specialty-nurse.js', type: 'specialty', label: 'Nurse Specialty' },
    { file: 'survey-path-doctor.js', type: 'path', label: 'Doctor Path' },
    { file: 'survey-path-nurse.js', type: 'path', label: 'Nurse Path' },
  ];

  for (const { file, type, label } of graphs) {
    const filePath = path.resolve(__dirname, 'survey', file);
    const module = await import(pathToFileURL(filePath));
    const baseGraph = module[Object.keys(module).find(k => k.includes('Graph') || k.includes('graph'))];

    if (!baseGraph) {
      console.error(`Could not find graph export in ${file}`);
      continue;
    }

    console.log(`\n======================================`);
    console.log(`Expanding ${label}...`);
    console.log(`======================================`);

    const expandedNodes = expandGraph(baseGraph, type, label);

    // Build output
    const output = `// Auto-generated expanded ${label} Survey Graph\n// Source: ${file}\n// Generated on: ${new Date().toISOString()}\n\nexport const ${label.toLowerCase().replace(/ /g, '_')}_graph = {\n  type: '${baseGraph.type}',\n  role: '${baseGraph.role}',\n  root_node_id: '${baseGraph.root_node_id}',\n  axes: ${JSON.stringify(baseGraph.axes, null, 2)},\n  nodes: ${JSON.stringify(expandedNodes, null, 2)},\n  target_vectors: ${JSON.stringify(baseGraph.target_vectors, null, 2)},\n};\n`;

    const outputPath = path.join(__dirname, 'survey', `${path.basename(file, '.js')}.expanded.js`);
    fs.writeFileSync(outputPath, output, 'utf-8');
    console.log(`\nWritten: ${outputPath}`);
  }

  console.log('\n======================================');
  console.log('All graphs expanded. Verify with seed/run.js using the expanded files.');
  console.log('======================================');
}

main().catch(console.error);
