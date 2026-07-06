import 'dotenv/config';
import { connectDB } from '../src/config/db.js';
import env from '../src/config/env.js';
import { Specialty, Path } from '../src/features/catalog/catalog.model.js';
import { Question } from '../src/features/assessment/assessment.model.js';
import { Lesson } from '../src/features/lessons/lessons.model.js';
import { SurveyGraph } from '../src/features/survey/survey.model.js';
import { computeAxisBounds } from '../src/utils/scoring.js';
import { specialties } from './specialties.js';
import { paths } from './paths.js';
import { seedQuestions } from './questions.js';
import { seedLessons } from './lessons.js';
import { doctor_specialty_graph } from './survey/survey-specialty-doctor.expanded.js';
import { nurse_specialty_graph } from './survey/survey-specialty-nurse.expanded.js';
import { doctor_path_graph } from './survey/survey-path-doctor.expanded.js';
import { nurse_path_graph } from './survey/survey-path-nurse.expanded.js';

async function seed() {
  if (env.NODE_ENV !== 'development') {
    console.error('Seed script can only run in NODE_ENV=development');
    process.exit(1);
  }

  await connectDB();

  console.log('Seeding specialties...');
  await Specialty.deleteMany({});
  for (const s of specialties) {
    await Specialty.create(s);
    console.log(`  Created specialty: ${s.name}`);
  }

  console.log('Seeding paths...');
  await Path.deleteMany({});
  for (const p of paths) {
    await Path.create(p);
    console.log(`  Created path: ${p.name}`);
  }

  console.log('Seeding questions...');
  await Question.deleteMany({});

  const allSpecialties = await Specialty.find({}).lean();
  let questionCount = 0;

  for (const sq of seedQuestions) {
    const specialty = allSpecialties.find(s =>
      s.branches.some(b => b.name === sq.branch_name),
    );
    if (!specialty) {
      console.log(`  Skipping questions for "${sq.branch_name}" — no matching specialty/branch found`);
      continue;
    }

    const branch = specialty.branches.find(b => b.name === sq.branch_name);

    for (const q of sq.questions) {
      await Question.create({
        branch_id: branch._id,
        specialty_id: specialty._id,
        question_text: q.question_text,
        question_type: q.question_type,
        options: q.options,
        explanation: q.explanation,
        difficulty: q.difficulty,
        source: 'in_house_authored',
      });
      questionCount += 1;
    }
    console.log(`  Created ${sq.questions.length} questions for ${specialty.name} > ${sq.branch_name}`);
  }

  console.log('Seeding lessons...');
  await Lesson.deleteMany({});
  let lessonCount = 0;

  for (const sl of seedLessons) {
    const specialty = allSpecialties.find(s =>
      s.branches.some(b => b.name === sl.branch_name),
    );
    if (!specialty) {
      console.log(`  Skipping lessons for "${sl.branch_name}" — no matching specialty/branch found`);
      continue;
    }

    const branch = specialty.branches.find(b => b.name === sl.branch_name);

    for (const l of sl.lessons) {
      await Lesson.create({
        branch_id: branch._id,
        title: l.title,
        description: l.description,
        duration_minutes: l.duration_minutes,
        order: l.order,
        tags: l.tags,
        resources: l.resources,
      });
      lessonCount += 1;
    }
    console.log(`  Created ${sl.lessons.length} lessons for ${specialty.name} > ${sl.branch_name}`);
  }

  console.log('Seeding survey graphs...');
  await SurveyGraph.deleteMany({});
  const graphs = [
    { label: 'Doctor Specialty', data: doctor_specialty_graph },
    { label: 'Nurse Specialty', data: nurse_specialty_graph },
    { label: 'Doctor Path', data: doctor_path_graph },
    { label: 'Nurse Path', data: nurse_path_graph },
  ];

  for (const { label, data } of graphs) {
    const axisBounds = computeAxisBounds(data.nodes, data.root_node_id);
    const doc = await SurveyGraph.create({
      type: data.type,
      role: data.role,
      root_node_id: data.root_node_id,
      axes: data.axes,
      nodes: data.nodes,
      target_vectors: data.target_vectors,
      axis_bounds: axisBounds,
    });
    console.log(`  Created ${label} SurveyGraph (${doc.nodes.length} nodes, ${axisBounds.length} axis bounds)`);
  }

  console.log(`Seed complete. ${questionCount} questions, ${lessonCount} lessons, ${graphs.length} survey graphs seeded.`);
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
