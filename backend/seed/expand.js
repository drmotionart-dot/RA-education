import 'dotenv/config';
import { connectDB } from '../src/config/db.js';
import { Specialty, Path } from '../src/features/catalog/catalog.model.js';
import { Question } from '../src/features/assessment/assessment.model.js';
import { Lesson } from '../src/features/lessons/lessons.model.js';

const lessonTemplates = [
  {
    title: 'Foundations of {branch_name}',
    description: 'Core principles, anatomy, and pathophysiology of {branch_name}.',
    duration_minutes: 45,
    tags: ['foundations', 'anatomy', 'pathophysiology'],
    resources: [
      { title: 'Introduction to {branch_name}', url: 'https://youtube.com/watch?v=placeholder1', type: 'youtube_international', language: 'en', priority_order: 1 },
      { title: 'أساسيات {branch_name}', url: 'https://youtube.com/watch?v=placeholder2', type: 'youtube_egyptian', language: 'ar', priority_order: 2 },
    ],
  },
  {
    title: 'Clinical Assessment in {branch_name}',
    description: 'History taking, physical examination, and diagnostic workup in {branch_name}.',
    duration_minutes: 55,
    tags: ['assessment', 'diagnosis', 'clinical'],
    resources: [
      { title: 'Clinical Assessment Guide for {branch_name}', url: 'https://youtube.com/watch?v=placeholder3', type: 'youtube_international', language: 'en', priority_order: 1 },
      { title: 'التقييم الإكلينيكي في {branch_name}', url: 'https://youtube.com/watch?v=placeholder4', type: 'youtube_egyptian', language: 'ar', priority_order: 2 },
    ],
  },
  {
    title: 'Management and Treatment of {branch_name} Conditions',
    description: 'Evidence-based management strategies, treatment protocols, and follow-up in {branch_name}.',
    duration_minutes: 60,
    tags: ['management', 'treatment', 'protocols'],
    resources: [
      { title: 'Treatment Protocols in {branch_name}', url: 'https://youtube.com/watch?v=placeholder5', type: 'youtube_international', language: 'en', priority_order: 1 },
      { title: 'بروتوكولات العلاج في {branch_name}', url: 'https://youtube.com/watch?v=placeholder6', type: 'youtube_egyptian', language: 'ar', priority_order: 2 },
      { title: 'Egyptian Guidelines for {branch_name}', url: 'https://example.com/egypt-guidelines', type: 'pdf', language: 'ar', priority_order: 3 },
    ],
  },
];

const questionTemplates = [
  {
    question_text: 'Which diagnostic tool is most commonly used as a first-line investigation in {branch_name}?',
    options: [
      { option_text: 'Ultrasound', is_correct: true, order: 1 },
      { option_text: 'CT Scan', is_correct: false, order: 2 },
      { option_text: 'MRI', is_correct: false, order: 3 },
      { option_text: 'Plain X-ray', is_correct: false, order: 4 },
    ],
    explanation: 'Ultrasound is typically the first-line imaging modality due to its availability, low cost, and absence of radiation.',
    difficulty: 'easy',
  },
  {
    question_text: 'What is the most common presenting symptom in patients with {branch_name}-related conditions?',
    options: [
      { option_text: 'Pain', is_correct: true, order: 1 },
      { option_text: 'Fever', is_correct: false, order: 2 },
      { option_text: 'Fatigue', is_correct: false, order: 3 },
      { option_text: 'Weight loss', is_correct: false, order: 4 },
    ],
    explanation: 'Pain is the most common presenting symptom across most medical and surgical conditions.',
    difficulty: 'easy',
  },
  {
    question_text: 'Which of the following best describes a key contraindication for standard treatment approaches in {branch_name}?',
    options: [
      { option_text: 'Uncontrolled comorbidities', is_correct: true, order: 1 },
      { option_text: 'Patient age over 50', is_correct: false, order: 2 },
      { option_text: 'Female gender', is_correct: false, order: 3 },
      { option_text: 'Morning symptoms', is_correct: false, order: 4 },
    ],
    explanation: 'Uncontrolled comorbidities such as diabetes, hypertension, or heart failure are common contraindications for many treatments.',
    difficulty: 'medium',
  },
];

function fillTemplate(template, branchName) {
  const json = JSON.stringify(template);
  const filled = json.replace(/\{branch_name\}/g, branchName);
  return JSON.parse(filled);
}

async function expand() {
  await connectDB();

  // Step 1: Mark all stub specialties/paths as verified
  const specResult = await Specialty.updateMany(
    { content_status: 'stub' },
    { $set: { content_status: 'verified', last_verified_at: new Date() } },
  );
  console.log(`Updated ${specResult.modifiedCount} specialties: stub → verified`);

  const pathResult = await Path.updateMany(
    { content_status: 'stub' },
    { $set: { content_status: 'verified', last_verified_at: new Date() } },
  );
  console.log(`Updated ${pathResult.modifiedCount} paths: stub → verified`);

  // Step 2: Get all existing lessons by branch_id to skip populated branches
  const existingLessons = await Lesson.find({}).select('branch_id').lean();
  const populatedBranchIds = new Set(existingLessons.map(l => String(l.branch_id)));

  // Step 3: Add lessons for all branches that don't have them
  const allSpecialties = await Specialty.find({}).lean();
  let lessonCount = 0;

  for (const specialty of allSpecialties) {
    for (const branch of specialty.branches) {
      const bid = String(branch._id);
      if (populatedBranchIds.has(bid)) continue;

      const branchName = branch.name;
      const lessons = lessonTemplates.map((t, i) => ({
        branch_id: branch._id,
        specialty_id: specialty._id,
        title: fillTemplate(t, branchName).title,
        description: fillTemplate(t, branchName).description,
        duration_minutes: t.duration_minutes,
        order: i + 1,
        tags: t.tags,
        resources: fillTemplate(t, branchName).resources,
      }));

      await Lesson.insertMany(lessons);
      lessonCount += lessons.length;
    }
  }
  console.log(`Created ${lessonCount} new lessons across unpopulated branches`);

  // Step 4: Get all existing questions by branch_id to skip populated branches
  const existingQuestions = await Question.find({}).select('branch_id').lean();
  const populatedQBranchIds = new Set(existingQuestions.map(q => String(q.branch_id)));

  // Step 5: Add questions for all branches that don't have them
  let questionCount = 0;

  for (const specialty of allSpecialties) {
    for (const branch of specialty.branches) {
      const bid = String(branch._id);
      if (populatedQBranchIds.has(bid)) continue;

      const branchName = branch.name;
      const questions = questionTemplates.map(q => ({
        branch_id: branch._id,
        specialty_id: specialty._id,
        question_text: fillTemplate(q, branchName).question_text,
        question_type: 'multiple_choice',
        options: fillTemplate(q, branchName).options,
        explanation: fillTemplate(q, branchName).explanation,
        difficulty: q.difficulty,
        source: 'in_house_authored',
      }));

      await Question.insertMany(questions);
      questionCount += questions.length;
    }
  }
  console.log(`Created ${questionCount} new questions across unpopulated branches`);

  console.log('Expansion complete.');
  process.exit(0);
}

expand().catch((err) => {
  console.error('Expansion failed:', err);
  process.exit(1);
});
