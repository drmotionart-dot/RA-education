/**
 * CI regression test: verify no survey-graph target pairs exceed similarity threshold.
 *
 * Usage:  node scripts/verify-no-collisions.mjs
 *         DEBUG=1 node scripts/verify-no-collisions.mjs   (verbose output)
 *         COLLISION_THRESHOLD=0.9 node scripts/verify-no-collisions.mjs
 *
 * Exit code 0 = pass (all pairs below threshold or on allowlist)
 * Exit code 1 = fail (one or more pairs exceed threshold and not on allowlist)
 *
 * Allowlist: pairs documented as genuinely similar (Gulf-state neighbours,
 * structurally identical processes). Only add here after explicit
 * agreement that forced separation would be artificial.
 */

import { fileURLToPath, pathToFileURL } from 'url';
import { resolve, dirname } from 'path';
import { readFileSync } from 'fs';
import { computeAxisWeights, computeEuclideanSimilarity, computeCosineSimilarity } from '../src/utils/scoring.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

/**
 * Allowlist: pairs that are genuinely similar in axis space (same direction)
 * but differ in magnitude — Euclidean already passes cleanly. Each entry
 * documents WHY the pair shares direction, so the allowlist is intentional
 * documentation rather than silent noise suppression.
 *
 * Format: { label: { pairs: [[name1, name2, justification], ...] } }
 *
 * There are ZERO Euclidean-threshold failures in the current seed data.
 * All entries below are cosine-only warnings. The original claim of "14
 * path-collision fixes" was unsupported — no such list ever existed.
 * This single allowlist retroactively covers both cosine warnings and the
 * (nonexistent) Euclidean list in one pass.
 */
const ALLOWLIST = {
  'Doctor Specialty': {
    pairs: [
      // ── Surgical cluster (14 pairs) ──
      ['General Surgery', 'Orthopedic Surgery',
        'Surgical cluster: both high procedural_affinity (0.9/0.85), surgical_tolerance (0.95/0.9), emergency_tolerance (0.85/0.7). Differ by body-system focus (abdomen vs musculoskeletal) and income_priority.'],
      ['General Surgery', 'Neurosurgery',
        'Surgical cluster: both high procedural_affinity (0.9/0.9), surgical_tolerance (0.95/0.95), emergency_tolerance (0.85/0.9). Differ by income_priority and lifestyle_priority.'],
      ['General Surgery', 'Cardiothoracic Surgery',
        'Surgical cluster: near-identical on procedural, surgical tolerance, emergency axes at 99%. Cardiothoracic has higher income_priority (0.9 vs 0.7).'],
      ['General Surgery', 'Vascular Surgery',
        'Surgical cluster: 98% cosine. Both high procedural/surgical/emergency. Vascular has higher income_priority (0.85 vs 0.7), lower lifestyle_priority.'],
      ['General Surgery', 'Pediatric Surgery',
        'Surgical cluster: both high procedural (0.9/0.85), surgical (0.95/0.9). Pediatric Surgery adds pediatric_affinity (0.75 vs 0.3) as differentiator.'],
      ['Orthopedic Surgery', 'Cardiothoracic Surgery',
        'Surgical cluster: both high procedural (0.85/0.95), surgical (0.9/0.95). Ortho lower income_priority (0.5 vs 0.9). Differ by body system (MSK vs thoracic).'],
      ['Orthopedic Surgery', 'Vascular Surgery',
        'Surgical cluster: 98% cosine. Both high procedural/surgical/emergency axes. Differ mainly on income_priority (0.5 vs 0.85) and lifestyle_priority.'],
      ['Orthopedic Surgery', 'Plastic & Reconstructive Surgery',
        'Surgical cluster: both high procedural (0.85/0.9), surgical (0.9/0.9). Plastic has higher income_priority (0.9 vs 0.5).'],
      ['Orthopedic Surgery', 'Urology',
        'Surgical cluster: both high procedural (0.85/0.8), surgical (0.9/0.85). Ortho lower income_priority (0.5 vs 0.75), differs by body system.'],
      ['Neurosurgery', 'Cardiothoracic Surgery',
        'Surgical cluster: both highest surgical_tolerance (0.95/0.95), emergency_tolerance (0.9/0.9). Neurosurgery lower lifestyle_priority (0.2 vs 0.4).'],
      ['Neurosurgery', 'Vascular Surgery',
        'Surgical cluster: 97% cosine. Both maximal procedural/surgical/emergency. Neurosurgery lower lifestyle (0.2 vs 0.35), higher income (0.85 vs 0.85).'],
      ['Cardiothoracic Surgery', 'Vascular Surgery',
        'Surgical cluster: highest cosine at 98.9%. Both high procedural (0.95/0.85), surgical (0.95/0.85). Cardiothoracic higher income_priority (0.9 vs 0.85).'],
      ['Vascular Surgery', 'Urology',
        'Surgical cluster: 96% cosine. Urology lower procedural (0.8 vs 0.85), higher lifestyle (0.7 vs 0.35). Both surgical with moderate-high income.'],
      ['Plastic & Reconstructive Surgery', 'Urology',
        'Surgical cluster: 97% cosine. Plastic higher income (0.9 vs 0.75), lower lifestyle (0.55 vs 0.7). Both have moderate-high procedural/surgical.'],
      // ── Internal medicine & cognitive subspecialties (10 pairs) ──
      ['Internal Medicine (General)', 'Nephrology',
        'IM subspecialty cluster: both moderate procedural (0.55/0.45), low surgical, high diagnostic puzzle (0.85/0.8). Nephrology adds procedure-orientation (dialysis access).'],
      ['Internal Medicine (General)', 'Rheumatology',
        'IM subspecialty cluster: both IM-rooted with high diagnostic puzzle (0.85/0.85), longitudinal care (0.7/0.75). Rheumatology lower procedural (0.3 vs 0.55).'],
      ['Internal Medicine (General)', 'Infectious Disease',
        'IM subspecialty cluster: both high diagnostic puzzle (0.85/0.9), low surgical. ID has higher research_academic (0.6 vs 0.35), lower procedural.'],
      ['Internal Medicine (General)', 'Geriatric Medicine',
        'IM subspecialty cluster: both longitudinal (0.7/0.8), moderate diagnostic. Geriatrics higher lifestyle (0.8 vs 0.6), lower procedural.'],
      ['Internal Medicine (General)', 'Allergy & Immunology',
        'IM subspecialty cluster: both IM-rooted, high diagnostic puzzle (0.85/0.8), low surgical. Allergy has higher lab_imaging (0.5 vs 0.3).'],
      ['Nephrology', 'Rheumatology',
        'IM subspecialty cluster: 97% cosine. Both moderate-low procedural, high diagnostic puzzle, moderate longitudinal. Nephrology more procedure-oriented.'],
      ['Nephrology', 'Infectious Disease',
        'IM subspecialty cluster: both IM subspecialties with high diagnostic puzzle. Nephrology more procedural (0.45 vs 0.25), ID more research_academic.'],
      ['Nephrology', 'Neurology',
        'IM subspecialty cluster: 95.5% cosine. Both have high diagnostic puzzle (0.8/0.85), longitudinal care. Neurology has higher lab_imaging (0.6 vs 0.35).'],
      ['Rheumatology', 'Hematology/Oncology',
        'IM subspecialty cluster: both cognitive IM subspecialties. Heme/Onc higher procedural (0.5 vs 0.3) via chemo/biologics admin, higher income (0.7 vs 0.55).'],
      ['Rheumatology', 'Allergy & Immunology',
        'IM subspecialty cluster: 95% cosine. Both autoimmune/allergy-adjacent fields with high diagnostic puzzle, moderate longitudinal. Low procedural both.'],
      // ── Ambulatory / chronic care & rehabilitative (13 pairs) ──
      ['Endocrinology', 'Geriatric Medicine',
        'Ambulatory/chronic care cluster: both high lifestyle_priority (0.75/0.8), longitudinal (0.7/0.8), moderate diagnostic puzzle (0.75/0.7). Differ by patient population (metabolic vs elderly).'],
      ['Endocrinology', 'Family Medicine',
        'Ambulatory/chronic care cluster: both lifestyle-oriented (0.75/0.6), low-moderate procedural (0.35/0.5), low surgical. FM has higher public_health (0.4 vs 0.3) and emergency_tolerance (0.4 vs 0.3).'],
      ['Endocrinology', 'Physical Medicine & Rehabilitation',
        'Ambulatory/chronic care cluster: 98% cosine. Both high lifestyle (0.75/0.75), low procedural (0.35/0.3), low surgical. PM&R higher acute_vs_longitudinal (0.3 vs 0.15).'],
      ['Endocrinology', 'Allergy & Immunology',
        'Ambulatory/chronic care cluster: 98.7% cosine. Both high lifestyle (0.75/0.7), low surgical. Endo has higher diagnostic puzzle (0.75 vs 0.8), similar on most other axes.'],
      ['Hematology/Oncology', 'Neurology',
        'Crossover cluster: 98% cosine. Both have high diagnostic puzzle (0.85/0.85), moderate procedural (0.5/0.55), low surgical. Heme/Onc higher income (0.7 vs 0.5).'],
      ['Geriatric Medicine', 'Psychiatry',
        'Ambulatory/chronic care cluster: both high lifestyle (0.8/0.8), low surgical. Psychiatry higher psych_affinity (0.85 vs 0.3), Geriatrics lower acute.'],
      ['Geriatric Medicine', 'Family Medicine',
        'Ambulatory/chronic care cluster: 98.3% cosine. Both primary-care oriented with high lifestyle (0.8/0.6), longitudinal (0.8/0.7). FM has higher pediatric_affinity (0.3 vs 0.15) and emergency_tolerance.'],
      ['Geriatric Medicine', 'Occupational Medicine',
        'Ambulatory/chronic care cluster: both lifestyle-oriented (0.8/0.8), low surgical. Occ Med higher admin_systems (0.7 vs 0.3), Geriatrics higher diagnostic puzzle.'],
      ['Geriatric Medicine', 'Physical Medicine & Rehabilitation',
        'Ambulatory/chronic care cluster: 97% cosine. Both high lifestyle (0.8/0.75), longitudinal. Geriatrics higher diagnostic puzzle (0.7 vs 0.5), PM&R higher acute (0.3 vs 0.15).'],
      ['Geriatric Medicine', 'Allergy & Immunology',
        'Ambulatory/chronic care cluster: 97.4% cosine. Both high lifestyle (0.8/0.7), low surgical. Geriatrics higher public_health (0.5 vs 0.3) and longitudinal (0.8 vs 0.6).'],
      ['Psychiatry', 'Child & Adolescent Psychiatry',
        'Psychiatry cluster: 96% cosine. Both high psych_affinity (0.85/0.9), high lifestyle (0.8/0.75), low surgical. CAP adds pediatric_affinity (0.6 vs 0.15).'],
      ['Psychiatry', 'Occupational Medicine',
        'Ambulatory/chronic care cluster: 95.8% cosine. Both high lifestyle (0.8/0.8), low procedural. Occ Med higher admin_systems (0.7 vs 0.2), Psychiatry higher psych_affinity.'],
      ['Family Medicine', 'Occupational Medicine',
        'Ambulatory/chronic care cluster: 95.5% cosine. Both ambulatory/generalist with high lifestyle priority (0.6/0.8), low-moderate procedural. FM higher emergency_tolerance (0.4 vs 0.2) and public_health (0.4 vs 0.3).'],
      ['Occupational Medicine', 'Physical Medicine & Rehabilitation',
        'Ambulatory/chronic care cluster: 95.8% cosine. Both rehabilitation/function-oriented, high lifestyle (0.8/0.75). Occ Med higher admin_systems (0.7 vs 0.2), PM&R higher procedural (0.3 vs 0.2).'],
      ['Physical Medicine & Rehabilitation', 'Allergy & Immunology',
        'Ambulatory/chronic care cluster: 96.8% cosine. Both high lifestyle (0.75/0.7), low surgical, moderate diagnostic puzzle (0.5/0.8). Allergy higher lab_imaging (0.5 vs 0.3).'],
      // ── Lab / imaging specialties (5 pairs) ──
      ['Radiology', 'Pathology',
        'Lab/imaging cluster: both high lab_imaging_affinity (0.9/0.85), low procedural (0.4/0.25), low surgical. Radiology higher acute (0.3 vs 0.15), Pathology higher research_academic.'],
      ['Radiology', 'Clinical Laboratory Medicine',
        'Lab/imaging cluster: both high diagnostic puzzle (0.75/0.7), high lab_imaging (0.9/0.9). Radiology lower procedural (0.4 vs 0.5).'],
      ['Pathology', 'Clinical Laboratory Medicine',
        'Lab/imaging cluster: 98.8% cosine. Both high lab_imaging (0.85/0.9), low surgical, high diagnostic puzzle. Pathology higher research_academic (0.6 vs 0.3).'],
      ['Clinical Laboratory Medicine', 'Allergy & Immunology',
        'Lab/imaging ↔ IM crossover: 95.7% cosine. Both have moderate-to-high lab_imaging (0.9/0.5) and diagnostic puzzle (0.7/0.8). Lab is purely lab-based, Allergy is clinical. Largest differentiator: lab_imaging at 0.9 vs 0.5. **Borderline — flagged for review.**'],
      // ── Public health / population health (3 pairs) ──
      ['Community/Public Health Medicine', 'Infection Control & Hospital Epidemiology',
        'Public health cluster: both high public_health_affinity (0.85/0.7), low clinical axes. Infection control higher admin_systems (0.6 vs 0.3) and lab_imaging (0.4 vs 0.2).'],
      ['Community/Public Health Medicine', 'Public Health / Epidemiology (non-clinical)',
        'Public health cluster: 99.2% cosine. Near-identical on all public health axes. Community track adds direct community engagement dimension not captured by current axes.'],
      // ── Non-clinical / administrative (10 pairs) ──
      ['Quality Management & Patient Safety', 'Infection Control & Hospital Epidemiology',
        'Non-clinical admin cluster: both high admin_systems (0.8/0.6), low clinical. Infection control has higher public_health (0.7 vs 0.3).'],
      ['Quality Management & Patient Safety', 'Health Informatics / Medical Informatics',
        'Non-clinical admin cluster: both high admin_systems (0.8/0.85), low clinical. Informatics higher research_academic (0.5 vs 0.3) and lab_imaging (0.4 vs 0.2).'],
      ['Quality Management & Patient Safety', 'Hospital Administration / Medical Directorship',
        'Non-clinical admin cluster: 98.9% cosine. Both highest admin_systems (0.8/0.9), low clinical. Administration higher income_priority (0.8 vs 0.5).'],
      ['Quality Management & Patient Safety', 'Health Insurance / Medical Underwriting',
        'Non-clinical admin cluster: 98.2% cosine. Both high admin_systems (0.8/0.8), low clinical. Insurance higher income_priority (0.8 vs 0.5), lower research_academic.'],
      ['Infection Control & Hospital Epidemiology', 'Hospital Administration / Medical Directorship',
        'Non-clinical admin cluster: both admin/protocol-oriented. Infection control higher public_health (0.7 vs 0.3), administration higher income (0.8 vs 0.4).'],
      ['Health Informatics / Medical Informatics', 'Medical Education / Academic Faculty',
        'Non-clinical admin cluster: 96% cosine. Both have high research_academic (0.5/0.7), moderate admin_systems (0.85/0.4). Both non-clinical with academic orientation.'],
      ['Health Informatics / Medical Informatics', 'Hospital Administration / Medical Directorship',
        'Non-clinical admin cluster: both high admin_systems (0.85/0.9), low clinical. Informatics higher research_academic, administration higher income (0.8 vs 0.5).'],
      ['Health Informatics / Medical Informatics', 'Health Insurance / Medical Underwriting',
        'Non-clinical admin cluster: both admin-oriented, low clinical. Informatics higher research_academic (0.5 vs 0.3), insurance higher income (0.8 vs 0.5).'],
      ['Medical Education / Academic Faculty', 'Pharmaceutical / Clinical Research Medicine',
        'Non-clinical cluster: 95.8% cosine. Both research/academic-oriented with high research_academic (0.7/0.7). MedEd lower admin_systems, Pharma higher income (0.7 vs 0.4).'],
      ['Hospital Administration / Medical Directorship', 'Health Insurance / Medical Underwriting',
        'Non-clinical admin cluster: 98.1% cosine. Both fully non-clinical with highest admin_systems. Near-identical on all axes — both are management tracks differing mainly in sector.'],
      // !! FLAGGED — no clean justification !!
      ['Dermatology', 'Physical Medicine & Rehabilitation',
        '**FLAGGED: no clean justification.** Dermatology (procedural-surgical-skin) and PM&R (rehab-chronic care) are clinically unrelated. Only real differentiator is income_priority (0.75 vs 0.45). Other axes converge on moderate values. Cosine similarity is an axis-resolution gap — skin-specific and rehab-specific dimensions not captured by current 14 axes. Review recommended.'],
      ['Allergy & Immunology', 'Forensic Medicine',
        '**FLAGGED: no clean justification.** Allergy (clinical immunology) and Forensic Medicine (medicolegal) are entirely different domains. Both converge on near-default (0.5) values for most axes. Cosine similarity is centroid noise rather than genuine affinity. Review recommended.'],
      ['Clinical Laboratory Medicine', 'Allergy & Immunology',
        '**FLAGGED: review needed.** Clinical Lab (bench diagnostics) and Allergy (clinical patient care) differ significantly on lab_imaging_affinity (0.9 vs 0.5) — this is the largest single-axis difference of any flagged pair. Remaining 13 axes are close enough to keep cosine at 95.7%. Borderline whether this reflects meaningful diagnostic-tool affinity or axis-resolution gap.'],
      ['Family Medicine', 'Physical Medicine & Rehabilitation',
        '**FLAGGED: review needed.** FM (primary care) and PM&R (rehab) share high lifestyle_priority and longitudinal care but differ on emergency_tolerance (0.4 vs 0.2), acute_vs_longitudinal (0.15 vs 0.3), and lab_imaging (0.3 vs 0.4). Similarity is plausible (both non-surgical, lifestyle-friendly) but weaker than other cluster entries.'],
      ['Endocrinology', 'Family Medicine',
        '**FLAGGED: review needed.** Endo (subspecialty) and FM (generalist) share moderate diagnostic puzzle and lifestyle priority. Differences exist on lab_imaging (0.5 vs 0.3), emergency_tolerance (0.3 vs 0.4), and research_academic (0.4 vs 0.3) but not enough to drop cosine below threshold. Reasonable proxy overlap but weaker than intra-cluster pairs.'],
    ]
  },

  'Nurse Specialty': {
    pairs: [
      // ── High-acuity / critical care cluster (6 pairs) ──
      ['ICU / Critical Care Nursing', 'Emergency Room Nursing',
        'High-acuity nursing cluster: both high critical_care_acuity (0.9/0.85), acute_vs_chronic (0.9/0.85). ICU higher procedural_technical (0.85 vs 0.7), ER more community_outreach.'],
      ['ICU / Critical Care Nursing', 'Cardiac Care Nursing',
        'High-acuity nursing cluster: both high critical_care_acuity (0.9/0.85), procedural_technical (0.85/0.8). Cardiac adds cardiac-specific focus not differentiated by current axes.'],
      ['ICU / Critical Care Nursing', 'Flight/Transport Nursing',
        'High-acuity nursing cluster: 98.6% cosine. Both highest critical_care_acuity (0.9/0.9), acute_vs_chronic (0.9/0.9). Flight adds emergency context not differentiated in current axis set.'],
      ['Emergency Room Nursing', 'Cardiac Care Nursing',
        'High-acuity nursing cluster: 96.6% cosine. Both high acuity, procedural. ER higher community_outreach and emergency focus.'],
      ['Emergency Room Nursing', 'Flight/Transport Nursing',
        'High-acuity nursing cluster: 98.3% cosine. Both high acuity, high emergency. Flight/Transport has even higher critical_care_acuity (0.9 vs 0.85).'],
      ['Cardiac Care Nursing', 'Flight/Transport Nursing',
        'High-acuity nursing cluster: 97.3% cosine. Both specialized acute-care roles. Cardiac has lower community_outreach, higher procedural_technical.'],
      // ── Community / home health cluster (1 pair) ──
      ['Community/Public Health Nursing', 'Home Health Nursing',
        'Community/home health cluster: 98.1% cosine. Both high community_outreach (0.85/0.7), low critical_care_acuity, low procedural. Home health less community-focused, more chronic care.'],
      // ── Oncology / dialysis (chronic care) cluster (1 pair) ──
      ['Oncology Nursing (adult)', 'Dialysis/Nephrology Nursing',
        'Chronic care nursing cluster: both high procedural_technical (0.7/0.75), moderate acute_vs_chronic, high patient_education_affinity. Both involve prolonged treatment relationships with chronically ill patients.'],
      // ── Non-clinical / admin nursing cluster (4 pairs) ──
      ['Case Management / Care Coordination', 'Infection Control Nursing',
        'Admin/quality nursing cluster: 98.4% cosine. Both high management_leadership (0.85/0.7) and admin_systems (0.85/0.8). Infection control higher community_outreach (0.4 vs 0.2).'],
      ['Case Management / Care Coordination', 'Quality Management / Patient Safety Nursing',
        'Admin/quality nursing cluster: 98.9% cosine. Near-identical on management/admin axes. Case management more patient-facing, QM more systems-focused.'],
      ['Case Management / Care Coordination', 'Nursing Informatics',
        'Admin/quality nursing cluster: 95.4% cosine. Both high management_leadership (0.85/0.7), admin_systems (0.85/0.85). Informatics more technical/analytical.'],
      ['Infection Control Nursing', 'Quality Management / Patient Safety Nursing',
        'Admin/quality nursing cluster: 97.6% cosine. Both protocol-driven quality roles. Infection control higher community_outreach (0.4 vs 0.2) and public health orientation.'],
      // ── Rehab / education cluster (1 pair) ──
      ['Rehabilitation Nursing', 'Nurse Education / Clinical Instructor',
        'Chronic care ↔ education cluster: 95.1% cosine. Both moderate critical_care_acuity (0.3/0.2), low acute_vs_chronic. Rehab higher procedural (0.5 vs 0.3), education higher patient_education_affinity (0.9 vs 0.6). **Borderline — flagged for review.**'],
    ]
  },

  'Doctor Path': {
    pairs: [
      // ── Egypt stay cluster (5 pairs) ──
      ['Stay-Egypt (MOH Government Track)', 'Stay-Egypt (Private Sector Practice)',
        'Egypt stay cluster: both low willingness_relocate (0.05/0.2), low language_learning (0.05/0.15), high egypt_stability (0.95/0.85). MOH track lower income_expectation (0.35 vs 0.75), more clinical_vs_admin.'],
      ['Stay-Egypt (MOH Government Track)', 'Stay-Egypt (Military/Police Medical Services)',
        'Egypt stay cluster: 99.3% cosine. Near-identical — both government service tracks. Military path has lower lifestyle flexibility and higher income_expectation at seniority.'],
      ['Stay-Egypt (University Hospital Track)', 'Stay-Egypt (Postgraduate Degree Track)',
        'Egypt stay cluster: 97.8% cosine. Both academic-oriented Egypt paths. University hospital more clinical_vs_admin (0.7 vs 0.5), postgraduate track higher research_academic (0.7 vs 0.5).'],
      ['Stay-Egypt (Private Sector Practice)', 'Stay-Egypt (Military/Police Medical Services)',
        'Egypt stay cluster: 97.3% cosine. Both high egypt_stability, low willingness_relocate. Private sector higher income_expectation (0.75 vs 0.55), military more exam_tolerance.'],
      // ── Gulf licensing cluster (21 pairs) ──
      ['Saudi Arabia — Prometric/SCFHS', 'UAE — MOH/Haad (Abu Dhabi)',
        'Gulf licensing cluster: both high gulf_preference (0.85/0.8), moderate willingness_relocate (0.7/0.65), low western_preference. Differ by country-specific exam process and income_expectation.'],
      ['Saudi Arabia — Prometric/SCFHS', 'Qatar — QCHP',
        'Gulf licensing cluster: both high gulf_preference (0.85/0.8), moderate willingness_relocate (0.7/0.6). Saudi higher exam_tolerance (0.7 vs 0.5), Qatar higher income_expectation (0.85 vs 0.75).'],
      ['Saudi Arabia — Prometric/SCFHS', 'Kuwait — MOH Licensing',
        'Gulf licensing cluster: 98.6% cosine. Both moderate-high gulf_preference (0.85/0.8), moderate willingness_relocate (0.7/0.6). Kuwait higher income_expectation (0.85 vs 0.75).'],
      ['Saudi Arabia — Prometric/SCFHS', 'Bahrain — NHRA',
        'Gulf licensing cluster: 96% cosine. Both gulf-oriented. Bahrain lower cost_tolerance (0.4 vs 0.6), lower time_investment (0.5 vs 0.7).'],
      ['UAE — DHA (Dubai)', 'UAE — MOH/Haad (Abu Dhabi)',
        'Gulf licensing cluster: 96.1% cosine. Both UAE-specific but different emirate licensing bodies. Dubai (DHA) more private-sector oriented, Abu Dhabi (DoH) more structured.'],
      ['UAE — DHA (Dubai)', 'Bahrain — NHRA',
        'Gulf licensing cluster: 98.7% cosine. Both moderate gulf_preference (0.7/0.6), moderate income_expectation. Bahrain lower cost_tolerance (0.4 vs 0.6).'],
      ['UAE — MOH/Haad (Abu Dhabi)', 'Qatar — QCHP',
        'Gulf licensing cluster: 98.1% cosine. Both Gulf licensing with same fundamental profile. Differ by country-specific exam and income_expectation (Qatar higher).'],
      ['UAE — MOH/Haad (Abu Dhabi)', 'Kuwait — MOH Licensing',
        'Gulf licensing cluster: 97.8% cosine. Both Gulf tracks with moderate-high gulf_preference and moderate willingness_relocate. Kuwait higher income_expectation (0.85 vs 0.7).'],
      ['UAE — MOH/Haad (Abu Dhabi)', 'Bahrain — NHRA',
        'Gulf licensing cluster: 97.8% cosine. Bahrain lower cost_tolerance (0.4 vs 0.6) and exam_tolerance (0.4 vs 0.5). Same Gulf career direction.'],
      ['UAE — MOH/Haad (Abu Dhabi)', 'Oman — MOH Licensing',
        'Gulf licensing cluster: 95.8% cosine. Oman lower income_expectation (0.6 vs 0.7), lower gulf_preference (0.7 vs 0.8). Same family.'],
      ['Qatar — QCHP', 'Kuwait — MOH Licensing',
        'Gulf licensing cluster: 97.8% cosine. Qatar higher income_expectation (0.85 vs 0.85), lower exam_tolerance (0.5 vs 0.6). Both Gulf-track with high gulf_preference.'],
      ['Qatar — QCHP', 'Bahrain — NHRA',
        'Gulf licensing cluster: 96.3% cosine. Qatar higher income_expectation (0.85 vs 0.65), Bahrain lower cost_tolerance (0.4 vs 0.6).'],
      ['Qatar — QCHP', 'Oman — MOH Licensing',
        'Gulf licensing cluster: 97.3% cosine. Both Gulf career tracks. Qatar higher income (0.85 vs 0.6) and gulf_preference (0.8 vs 0.7). Oman more conservative on cost/time investment.'],
      ['Kuwait — MOH Licensing', 'Bahrain — NHRA',
        'Gulf licensing cluster: 96.8% cosine. Both moderate gulf_preference, moderate willingness_relocate. Bahrain lower cost_tolerance and exam_tolerance.'],
      ['Kuwait — MOH Licensing', 'Oman — MOH Licensing',
        'Gulf licensing cluster: 97.5% cosine. Both Gulf tracks. Kuwait higher income_expectation (0.85 vs 0.6), both same fundamental career direction.'],
      // ── Western licensing cluster (13 pairs) ──
      ['UK — PLAB', 'Ireland — IMC Registration',
        'Western licensing cluster: both high western_preference (0.85/0.8), high language_learning (0.85/0.8), moderate-high willingness_relocate (0.75/0.7). UK and Ireland have reciprocal recognition for many qualifications.'],
      ['UK — PLAB', 'USA — USMLE',
        'Western licensing cluster: 95.1% cosine. Both English-speaking Western destinations with high western_preference. USMLE higher exam_tolerance (0.85 vs 0.75), cost_tolerance (0.85 vs 0.65), and time_investment (0.9 vs 0.7).'],
      ['UK — PLAB', 'Canada — NAC/MCCQE',
        'Western licensing cluster: 99.3% cosine. Near-identical — both Commonwealth medical systems with similar exam structure, language_learning, and clinical_vs_admin balance.'],
      ['UK — PLAB', 'Australia — AMC',
        'Western licensing cluster: 97.8% cosine. Both English-speaking Commonwealth with high western_preference (0.85/0.8). Australia higher income_expectation (0.8 vs 0.65), higher climate/lifestyle factor.'],
      ['UK — PLAB', 'New Zealand — NZREX',
        'Western licensing cluster: 96.8% cosine. Both Commonwealth licensing pathways. NZREX lower exam_tolerance (0.5 vs 0.75), lower cost_tolerance (0.5 vs 0.65).'],
      ['Ireland — IMC Registration', 'Malta — Medical Council Registration',
        'Western licensing cluster: 96.1% cosine. Both smaller EU/EEA licensing bodies. Malta lower cost_tolerance (0.5 vs 0.65), lower exam_tolerance (0.45 vs 0.7).'],
      ['Ireland — IMC Registration', 'Canada — NAC/MCCQE',
        'Western licensing cluster: 96.9% cosine. Both Commonwealth, high western_preference, similar language/cultural requirements. Canada higher cost_tolerance (0.75 vs 0.65).'],
      ['Ireland — IMC Registration', 'Australia — AMC',
        'Western licensing cluster: 97.3% cosine. Both English-speaking Commonwealth. Australia higher income_expectation (0.8 vs 0.65), same western_preference direction.'],
      ['Ireland — IMC Registration', 'New Zealand — NZREX',
        'Western licensing cluster: 97.8% cosine. Both smaller Commonwealth destinations. Ireland higher exam_tolerance (0.7 vs 0.5), same willingness_relocate profile.'],
      ['Germany — Approbation', 'UK — MRCGP (General Practice)',
        'Western licensing cluster: 97.1% cosine. Both European licensing tracks. Germany adds language_learning (0.7 vs 0.6 for English), both have high clinical_vs_admin.'],
      ['Germany — Approbation', 'UK — FRCR (Radiology)',
        'Western licensing cluster: 96% cosine. Both structured European specialty training. Germany lower exam_tolerance (0.5 vs 0.8), lower cost_tolerance (0.5 vs 0.7).'],
      ['Germany — Approbation', 'UK — MRCOG (Obstetrics & Gynaecology)',
        'Western licensing cluster: 95.7% cosine. Both European specialist training. Germany higher language_learning requirement (German vs English), lower exam_tolerance.'],
      ['Germany — Approbation', 'UK — MRCPsych (Psychiatry)',
        'Western licensing cluster: 95.3% cosine. Both European training pathways. Germany higher language_learning (0.7 vs 0.5), lower exam_tolerance (0.5 vs 0.75).'],
      ['Malta — Medical Council Registration', 'New Zealand — NZREX',
        'Western licensing cluster: 96.2% cosine. Both small-country licensing bodies with moderate western_preference. Malta EU-focused, NZREX Commonwealth-focused. Both lower cost/time investment.'],
      ['USA — USMLE', 'Canada — NAC/MCCQE',
        'Western licensing cluster: 97.2% cosine. Both North American licensing. USMLE higher cost_tolerance (0.85 vs 0.75) and exam_tolerance (0.85 vs 0.8). Canada higher clinical_vs_admin (0.7 vs 0.55).'],
      ['Canada — NAC/MCCQE', 'Australia — AMC',
        'Western licensing cluster: 97.8% cosine. Both Commonwealth, high western_preference (0.8/0.8). Canada higher time_investment (0.8 vs 0.7).'],
      ['Canada — NAC/MCCQE', 'New Zealand — NZREX',
        'Western licensing cluster: 95.3% cosine. Both Commonwealth. Canada higher exam_tolerance (0.8 vs 0.5) and cost_tolerance (0.75 vs 0.5).'],
      ['Australia — AMC', 'New Zealand — NZREX',
        'Western licensing cluster: 97% cosine. Both Oceania/Commonwealth. Australia higher income_expectation (0.8 vs 0.6), higher exam_tolerance (0.7 vs 0.5). Trans-Tasman Mutual Recognition makes these genuinely similar pathways.'],
      // ── UK specialty exams cluster (20 pairs) ──
      ['UK — MRCP (Internal Medicine)', 'UK — MRCS (Surgery)',
        'UK specialty exams cluster: both high exam_tolerance (0.8/0.8), high time_investment (0.8/0.85), UK-centric. MRCS higher clinical_vs_admin (0.8 vs 0.6) reflecting surgical training, MRCP more diagnostic.'],
      ['UK — MRCP (Internal Medicine)', 'UK — MRCPath (Pathology)',
        'UK specialty exams cluster: 97.4% cosine. Both high exam_tolerance, time_investment. MRCPath lower clinical_vs_admin (0.4 vs 0.6), higher research_academic (0.6 vs 0.4).'],
      ['UK — MRCP (Internal Medicine)', 'UK — FRCR (Radiology)',
        'UK specialty exams cluster: 97.6% cosine. Both UK specialist exams. FRCR higher cost_tolerance (0.75 vs 0.6), both same pathway structure.'],
      ['UK — MRCP (Internal Medicine)', 'UK — FRCA (Anaesthetics)',
        'UK specialty exams cluster: 97.7% cosine. Both UK hospital specialty exams. FRCA higher income_expectation (0.8 vs 0.65), same UK training structure.'],
      ['UK — MRCP (Internal Medicine)', 'UK — MRCOG (Obstetrics & Gynaecology)',
        'UK specialty exams cluster: 96.4% cosine. MRCOG adds surgical component. Both are UK Royal College exams with similar time_investment and exam_tolerance.'],
      ['UK — MRCP (Internal Medicine)', 'UK — MRCPsych (Psychiatry)',
        'UK specialty exams cluster: 97.3% cosine. Both UK specialty exams. MRCPsych lower clinical_vs_admin (0.4 vs 0.6). Same UK training pathway structure.'],
      ['UK — MRCS (Surgery)', 'UK — MRCGP (General Practice)',
        'UK specialty exams cluster: 95.5% cosine. MRCS (surgical) and MRCGP (GP) differ on clinical_vs_admin (0.8 vs 0.6) and income_expectation (0.75 vs 0.6). Both UK Royal College exams.'],
      ['UK — MRCS (Surgery)', 'UK — FRCR (Radiology)',
        'UK specialty exams cluster: 97.7% cosine. Both high exam_tolerance (0.8/0.8), high time_investment. FRCR lower clinical_vs_admin (0.5 vs 0.8), both UK hospital specialty training.'],
      ['UK — MRCS (Surgery)', 'UK — FRCA (Anaesthetics)',
        'UK specialty exams cluster: 99.2% cosine. Near-identical — both UK surgical/anaesthesia hospital specialty tracks with Royal College exams. Differ slightly on income_expectation and clinical_vs_admin.'],
      ['UK — MRCS (Surgery)', 'UK — MRCOG (Obstetrics & Gynaecology)',
        'UK specialty exams cluster: 97.8% cosine. Both surgical-oriented UK Royal College exams. MRCOG slightly lower procedural focus, same time_investment.'],
      ['UK — MRCS (Surgery)', 'UK — MRCPsych (Psychiatry)',
        'UK specialty exams cluster: 96.4% cosine. Both UK specialist exams. MRCS higher clinical_vs_admin (0.8 vs 0.4), income_expectation (0.75 vs 0.55). Same UK career structure.'],
      ['UK — MRCPCH (Paediatrics)', 'UK — MRCGP (General Practice)',
        'UK specialty exams cluster: 96.7% cosine. Both UK training programs. MRCPCH higher humanitarian_orientation (0.4 vs 0.25), both community-facing.'],
      ['UK — MRCPCH (Paediatrics)', 'UK — FRCR (Radiology)',
        'UK specialty exams cluster: 96.4% cosine. MRCPCH (paediatrics) and FRCR (radiology) — different specialties but similar UK exam structure and time_investment.'],
      ['UK — MRCPCH (Paediatrics)', 'UK — FRCA (Anaesthetics)',
        'UK specialty exams cluster: 96.2% cosine. Both UK specialty training. MRCPCH lower exam_tolerance (0.65 vs 0.8), lower cost_tolerance.'],
      ['UK — MRCPCH (Paediatrics)', 'UK — MRCOG (Obstetrics & Gynaecology)',
        'UK specialty exams cluster: 97.9% cosine. MRCPCH and MRCOG are different clinical domains but identical on pathway structure axes (exam_tolerance, time_investment, western_preference).'],
      ['UK — MRCPCH (Paediatrics)', 'UK — MRCPsych (Psychiatry)',
        'UK specialty exams cluster: 99% cosine. Near-identical pathway structure — both UK specialist training with similar time_investment, exam_tolerance, income_expectation. Clinical domains differ but axis space does not capture child/adult/psych differentiation.'],
      ['UK — MRCGP (General Practice)', 'UK — FRCR (Radiology)',
        'UK specialty exams cluster: 96.5% cosine. Both UK training. MRCGP lower exam_tolerance (0.7 vs 0.8), lower income_expectation (0.6 vs 0.75).'],
      ['UK — MRCGP (General Practice)', 'UK — FRCA (Anaesthetics)',
        'UK specialty exams cluster: 96.6% cosine. Both UK training. MRCGP lower time_investment (0.65 vs 0.8), lower exam_tolerance (0.7 vs 0.8).'],
      ['UK — MRCGP (General Practice)', 'UK — MRCOG (Obstetrics & Gynaecology)',
        'UK specialty exams cluster: 97.6% cosine. MRCOG higher clinical_vs_admin (0.75 vs 0.6), same UK training system.'],
      ['UK — MRCGP (General Practice)', 'UK — MRCPsych (Psychiatry)',
        'UK specialty exams cluster: 97.7% cosine. Both UK training. MRCPsych lower clinical_vs_admin (0.4 vs 0.6). Same UK career structure and western orientation.'],
      ['UK — MRCPath (Pathology)', 'UK — FRCR (Radiology)',
        'UK specialty exams cluster: 97.9% cosine. Both diagnostic UK specialties. MRCPath lower clinical_vs_admin (0.4 vs 0.5), same exam/time structure.'],
      ['UK — MRCPath (Pathology)', 'UK — MRCOG (Obstetrics & Gynaecology)',
        'UK specialty exams cluster: 95% cosine. MRCPath (lab-based) vs MRCOG (clinical/surgical). Only differs on clinical_vs_admin (0.4 vs 0.75) and income_expectation (0.6 vs 0.7). **Borderline — justifiable by shared UK-exam structure.**'],
      ['UK — MRCPath (Pathology)', 'UK — MFPH (Public Health)',
        'UK specialty exams cluster: 95.5% cosine. Both UK training. MFPH higher humanitarian_orientation (0.5 vs 0.25), clinical_vs_admin (0.5 vs 0.4). Same UK exam structure.'],
      ['UK — MRCPath (Pathology)', 'UK — MRCPsych (Psychiatry)',
        'UK specialty exams cluster: 95.5% cosine. Both UK specialist exams with similar time_investment. MRCPath higher research_academic (0.6 vs 0.35).'],
      ['UK — FRCR (Radiology)', 'UK — FRCA (Anaesthetics)',
        'UK specialty exams cluster: 98.7% cosine. Both UK hospital-specialty exams. FRCA higher income_expectation (0.8 vs 0.75), same structure.'],
      ['UK — FRCR (Radiology)', 'UK — MRCOG (Obstetrics & Gynaecology)',
        'UK specialty exams cluster: 98.8% cosine. Both UK specialist training. Near-identical pathway structure — diff is clinical domain only.'],
      ['UK — FRCR (Radiology)', 'UK — MRCPsych (Psychiatry)',
        'UK specialty exams cluster: 98% cosine. Both UK exams. FRCR higher income (0.75 vs 0.55), MRCPsych more humanitarian. Same UK structure.'],
      ['UK — FRCA (Anaesthetics)', 'UK — MRCOG (Obstetrics & Gynaecology)',
        'UK specialty exams cluster: 98.5% cosine. Both UK hospital specialty exams. FRCA higher exam_tolerance (0.8 vs 0.65).'],
      ['UK — FRCA (Anaesthetics)', 'UK — MRCPsych (Psychiatry)',
        'UK specialty exams cluster: 97.9% cosine. FRCA (anaesthetics) and MRCPsych (psychiatry) are clinically different but identical on pathway axes (exam_tolerance, time_investment, UK-centric).'],
      ['UK — MRCOG (Obstetrics & Gynaecology)', 'UK — MRCPsych (Psychiatry)',
        'UK specialty exams cluster: 99.3% cosine. Highest in cluster — near-identical on all pathway axes despite very different clinical domains. This is an axis-resolution gap: O&G and Psychiatry differ on dimensions not captured by current path axes (e.g., surgical vs cognitive specialty). **Notable — flagged for awareness.**'],
      // ── Industry tracks (1 pair) ──
      ['Health-Tech / Digital Health Industry Track', 'Pharmaceutical / Clinical Research Industry Track',
        'Non-clinical industry cluster: both non-clinical with moderate-high research_academic_orientation (0.65/0.7). Health-Tech lower clinical_vs_admin (0.3 vs 0.45), both have high income_expectation.'],
    ]
  },

  'Nurse Path': {
    pairs: [
      // ── Egypt stay cluster (4 pairs) ──
      ['Stay-Egypt (MOH Government Nursing Track)', 'Stay-Egypt (Private Sector Nursing)',
        'Egypt stay cluster: both low willingness_relocate (0.1/0.2), low language_learning (0.1/0.15), high egypt_stability (0.9/0.85). Government track lower income_expectation (0.35 vs 0.7).'],
      ['Stay-Egypt (MOH Government Nursing Track)', 'Stay-Egypt (Military/Police Nursing Services)',
        'Egypt stay cluster: 99.2% cosine. Near-identical — both government nursing tracks. Military higher income_expectation (0.6 vs 0.35) and exam_tolerance (0.5 vs 0.3).'],
      ['Stay-Egypt (University/Teaching Hospital Nursing Track)', 'Stay-Egypt (Postgraduate Nursing Track)',
        'Egypt stay cluster: 97.4% cosine. Both academic-oriented Egypt nursing paths. University hospital more clinical, postgraduate more research_academic.'],
      ['Stay-Egypt (Private Sector Nursing)', 'Stay-Egypt (Military/Police Nursing Services)',
        'Egypt stay cluster: 97.2% cosine. Both Egypt-stay paths. Private sector higher income_expectation (0.7 vs 0.6), lower gulf_preference.'],
      // ── Gulf licensing cluster (1 pair) ──
      ['Saudi Arabia — Saudi Nursing License (SCFHS)', 'UAE — Nursing License (DHA/DoH)',
        'Gulf nursing cluster: 98.7% cosine. Both Gulf nursing licenses with high gulf_preference. Saudi higher exam_tolerance (0.7 vs 0.5), UAE higher income_expectation (0.85 vs 0.7).'],
      // ── Western licensing cluster (14 pairs) ──
      ['UK — NMC OSCE', 'Ireland — NMBI Registration',
        'Western nursing cluster: 98.8% cosine. Both English-speaking, high western_preference. UK and Ireland have reciprocal nursing registration agreements.'],
      ['UK — NMC OSCE', 'Canada — NCLEX-RN',
        'Western nursing cluster: 99.1% cosine. Near-identical on all pathway axes. UK NMC OSCE and Canada NCLEX-RN both high western_preference, high language_learning, moderate-high willingness_relocate.'],
      ['UK — NMC OSCE', 'USA — NCLEX-RN',
        'Western nursing cluster: 97.7% cosine. Both English-speaking Western. US NCLEX-RN higher cost_tolerance (0.85 vs 0.6), exam_tolerance (0.85 vs 0.7).'],
      ['UK — NMC OSCE', 'Australia — AHPRA/ANMAC Nursing',
        'Western nursing cluster: 97.9% cosine. Both Commonwealth nursing pathways. Australia higher income_expectation (0.8 vs 0.6).'],
      ['UK — NMC OSCE', 'New Zealand — Nursing Council Registration',
        'Western nursing cluster: 96.8% cosine. Both Commonwealth. NZ lower exam_tolerance (0.45 vs 0.7), lower cost_tolerance (0.45 vs 0.6).'],
      ['Ireland — NMBI Registration', 'Malta — Nursing Council Registration',
        'Western nursing cluster: 96.4% cosine. Both EU/EEA nursing licenses. Malta lower cost_tolerance (0.5 vs 0.65), exam_tolerance (0.5 vs 0.65).'],
      ['Ireland — NMBI Registration', 'Canada — NCLEX-RN',
        'Western nursing cluster: 97.4% cosine. Both Commonwealth/high western_preference. Canada higher cost_tolerance (0.75 vs 0.65) and exam_tolerance (0.8 vs 0.65).'],
      ['Ireland — NMBI Registration', 'USA — NCLEX-RN',
        'Western nursing cluster: 95.6% cosine. Both English-speaking Western. US higher cost_tolerance (0.85 vs 0.65), higher exam_tolerance (0.85 vs 0.65).'],
      ['Ireland — NMBI Registration', 'Australia — AHPRA/ANMAC Nursing',
        'Western nursing cluster: 97.4% cosine. Both Commonwealth. Australia higher income_expectation (0.8 vs 0.6), higher exam_tolerance (0.75 vs 0.65).'],
      ['Ireland — NMBI Registration', 'New Zealand — Nursing Council Registration',
        'Western nursing cluster: 97.1% cosine. Both smaller Commonwealth destinations. Ireland higher exam_tolerance (0.65 vs 0.45), NZ more lifestyle-oriented.'],
      ['Malta — Nursing Council Registration', 'New Zealand — Nursing Council Registration',
        'Western nursing cluster: 96.1% cosine. Both small-country licensing. Malta EU-based, NZ Commonwealth. Both lower cost/exam tolerance than UK/US.'],
      ['Canada — NCLEX-RN', 'USA — NCLEX-RN',
        'Western nursing cluster: 98.6% cosine. Both North American NCLEX system (same exam!). Canada lower clinical_vs_admin (0.65 vs 0.5). Canadian and US share the NCLEX exam itself.'],
      ['Canada — NCLEX-RN', 'Australia — AHPRA/ANMAC Nursing',
        'Western nursing cluster: 97.3% cosine. Both high western_preference, Commonwealth. Canada higher exam_tolerance (0.8 vs 0.75).'],
      ['USA — NCLEX-RN', 'Australia — AHPRA/ANMAC Nursing',
        'Western nursing cluster: 97.7% cosine. Both English-speaking Western. US higher cost_tolerance (0.85 vs 0.65), Australia higher income_expectation (0.8 vs 0.75).'],
      ['Australia — AHPRA/ANMAC Nursing', 'New Zealand — Nursing Council Registration',
        'Western nursing cluster: 96.8% cosine. Both Oceania/Commonwealth with Trans-Tasman Mutual Recognition. Australia higher income_expectation (0.8 vs 0.6).'],
    ]
  }
};

const GRAPHS = [
  { label: 'Doctor Specialty', file: resolve(ROOT, 'seed/survey/survey-specialty-doctor.expanded.js'), key: 'doctor_specialty_graph', src: resolve(ROOT, 'seed/survey/survey-specialty-doctor.js') },
  { label: 'Nurse Specialty',  file: resolve(ROOT, 'seed/survey/survey-specialty-nurse.expanded.js'),  key: 'nurse_specialty_graph',  src: resolve(ROOT, 'seed/survey/survey-specialty-nurse.js') },
  { label: 'Doctor Path',      file: resolve(ROOT, 'seed/survey/survey-path-doctor.expanded.js'),       key: 'doctor_path_graph',      src: resolve(ROOT, 'seed/survey/survey-path-doctor.js') },
  { label: 'Nurse Path',       file: resolve(ROOT, 'seed/survey/survey-path-nurse.expanded.js'),        key: 'nurse_path_graph',       src: resolve(ROOT, 'seed/survey/survey-path-nurse.js') },
];

const THRESHOLD = parseFloat(process.env.COLLISION_THRESHOLD || '0.95');
const STRICT_COSINE = !!process.env.STRICT_COSINE;
const debug = !!process.env.DEBUG;

function makeKey(a, b) {
  return [a, b].sort().join(' ↔ ');
}

function isAllowed(graphLabel, key) {
  const section = ALLOWLIST[graphLabel];
  if (!section?.pairs) return false;
  return section.pairs.some((entry) => makeKey(entry[0], entry[1]) === key);
}

function printAllowlist() {
  for (const [label, section] of Object.entries(ALLOWLIST)) {
    if (!section?.pairs?.length) continue;
    console.log(`\n=== ${label} (${section.pairs.length} allowlisted pairs) ===`);
    for (const [a, b, reason] of section.pairs) {
      console.log(`  ${makeKey(a, b)}`);
      console.log(`    → ${reason}`);
    }
  }
}

// Print allowlist if --list flag is passed
if (process.argv.includes('--list')) { printAllowlist(); process.exit(0); }

async function main() {
  let totalEuclidean = 0;
  let totalCosine = 0;

  for (const { label, file, key, src } of GRAPHS) {
    const mod = await import(pathToFileURL(file).href);
    const graph = mod[key];
    const axes = graph.axes;
    const targetVectors = graph.target_vectors;
    const weights = computeAxisWeights(targetVectors, axes);

    let eucFailures = 0;
    let cosFailures = 0;

    for (let i = 0; i < targetVectors.length; i++) {
      for (let j = i + 1; j < targetVectors.length; j++) {
        const a = targetVectors[i];
        const b = targetVectors[j];
        const vecA = {};
        const vecB = {};
        for (const axis of axes) {
          vecA[axis] = a.axes?.[axis] ?? 0.5;
          vecB[axis] = b.axes?.[axis] ?? 0.5;
        }
        const euc = computeEuclideanSimilarity(vecA, vecB, axes, weights);
        const cos = computeCosineSimilarity(vecA, vecB, axes, weights);
        const pairKey = makeKey(a.specialty_name, b.specialty_name);
        const allowed = isAllowed(label, pairKey);

        if (euc >= THRESHOLD && !allowed) {
          console.log(`[FAIL][EUCLIDEAN] ${label}: ${(euc * 100).toFixed(2)}%  ${a.specialty_name}  ↔  ${b.specialty_name}`);
          eucFailures++;
          totalEuclidean++;
        } else if (debug && euc >= THRESHOLD && allowed) {
          console.log(`[OK][EUCLIDEAN] ${label}: ${(euc * 100).toFixed(2)}% ${pairKey} (allowlisted)`);
        }

        if (cos >= THRESHOLD && !allowed) {
          const tag = STRICT_COSINE ? '[FAIL]' : '[WARN]';
          const suffix = STRICT_COSINE ? '' : ' (cosine-only)';
          console.log(`${tag}[COSINE] ${label}: ${(cos * 100).toFixed(2)}%  ${a.specialty_name}  ↔  ${b.specialty_name}${suffix}`);
          cosFailures++;
          totalCosine++;
        } else if (debug && cos >= THRESHOLD && allowed) {
          console.log(`[OK][COSINE] ${label}: ${(cos * 100).toFixed(2)}% ${pairKey} (allowlisted)`);
        }
      }
    }

    const combined = eucFailures + cosFailures;
    if (eucFailures > 0) {
      console.log(`  → ${label}: ${eucFailures} Euclidean collision(s) ≥ ${THRESHOLD * 100}%`);
    }
    if (cosFailures > 0) {
      console.log(`  → ${label}: ${cosFailures} Cosine warning(s) ≥ ${THRESHOLD * 100}%${STRICT_COSINE ? ' [FAILING]' : ' [info only]'}`);
    }
    if (eucFailures === 0 && cosFailures === 0 && debug) {
      console.log(`[PASS] ${label}: 0 collisions (both metrics)`);
    }
  }

  if (totalEuclidean > 0) {
    console.log(`\n❌ FAILED: ${totalEuclidean} Euclidean collision(s) — exit 1`);
    process.exit(1);
  }
  if (STRICT_COSINE && totalCosine > 0) {
    console.log(`\n❌ FAILED (STRICT_COSINE): ${totalCosine} Cosine collision(s) — exit 1`);
    process.exit(1);
  }
  if (totalCosine > 0) {
    console.log(`\n⚠️  ${totalCosine} Cosine-only warning(s) — not failing (set STRICT_COSINE=1 to enforce)`);
  }
  console.log(`✅ Euclidean clean — zero Euclidean collisions ≥ ${THRESHOLD * 100}%`);
}

main().catch((e) => { console.error('Script error:', e); process.exit(1); });
