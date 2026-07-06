# RA Education — Phase 3 Specification: Adaptive Specialty & Path Survey

**Purpose:** Defines the full adaptive survey system — axes, specialty/path taxonomies, target vectors, branching question tree, and scoring/routing algorithm — for both the Specialty Survey and the Path Survey, across Doctor and Nurse roles.

**Status:** This is a **living content document**, same treatment as §8 of the main spec. The axis system, tree architecture, and algorithm below are final and ready to build against. The **target vectors** (which specialty scores high on which axis) are a first pass covering the full taxonomy at reasonable confidence — they should be reviewed/refined by an actual doctor and nurse before this goes live with real users, the same way catalog cost/requirement data needs periodic verification. Mark any vector you personally disagree with; recalibrating a number is a five-minute edit, not a rebuild.

---

## 1. Architecture — how "comprehensive" stays simple

The survey does **not** need one branch per specialty. Instead:

1. Branching questions accumulate a score across a fixed set of **axes** (§2/§5).
2. At termination, the user's axis-score vector is compared (cosine similarity or weighted Euclidean distance — see §7) against a **target vector per specialty**, stored in a lookup table (§3/§6).
3. The top N closest specialties are returned as matches.

This means the question tree stays a manageable size (30-40 questions deep, branching) no matter how many specialties exist in the target-vector table. Adding specialty #52 is a content edit (one row), not a tree redesign.

---

## 2. Doctor Specialty Axes (14 axes)

| Axis | Captures |
|---|---|
| `procedural_affinity` | Hands-on/manual work vs. cognitive/diagnostic work |
| `surgical_tolerance` | Comfort with operating, invasive procedures, blood |
| `acute_vs_longitudinal` | Episodic/crisis care (+acute) vs. long-term relationships (+longitudinal) |
| `diagnostic_puzzle_affinity` | Enjoys complex differential diagnosis / rare-case reasoning |
| `pediatric_affinity` | Preference for treating children |
| `ob_gyn_affinity` | Preference for women's health/obstetrics |
| `psych_affinity` | Interest in mental health/behavioral medicine |
| `lab_imaging_affinity` | Prefers working with data/images/samples over direct patient contact |
| `emergency_tolerance` | Comfort with unpredictable, high-pressure, undifferentiated presentations |
| `lifestyle_priority` | How much controllable hours matter |
| `income_priority` | How much earning potential matters |
| `research_academic_affinity` | Interest in research/academia vs. pure clinical practice |
| `admin_systems_affinity` | Interest in process, policy, quality, systems-level work over direct patient care |
| `public_health_affinity` | Interest in population-level health vs. individual patient care |

## 3. Doctor Specialty Taxonomy + Target Vectors (first pass)

Grouped for readability. Each specialty's vector shows only its **standout axes** (the ones that differentiate it) — all unlisted axes default to a neutral 0.5 on a 0–1 scale.

### Surgical
| Specialty | Standout axes |
|---|---|
| General Surgery | procedural 0.9, surgical_tolerance 0.9, emergency 0.6 |
| Orthopedic Surgery | procedural 0.9, surgical_tolerance 0.85, lifestyle 0.6 |
| Neurosurgery | procedural 0.95, surgical_tolerance 0.95, diagnostic_puzzle 0.7, lifestyle 0.2 |
| Cardiothoracic Surgery | procedural 0.95, surgical_tolerance 0.95, emergency 0.7 |
| Vascular Surgery | procedural 0.85, surgical_tolerance 0.85, emergency 0.6 |
| Plastic & Reconstructive Surgery | procedural 0.9, surgical_tolerance 0.8, income 0.7 |
| Pediatric Surgery | procedural 0.85, surgical_tolerance 0.85, pediatric 0.95 |
| ENT (Otolaryngology) | procedural 0.75, surgical_tolerance 0.65, lifestyle 0.6 |
| Urology | procedural 0.75, surgical_tolerance 0.7, income 0.65 |
| Ophthalmology | procedural 0.8, surgical_tolerance 0.5, lifestyle 0.75, income 0.7 |

### Internal Medicine & Subspecialties
| Specialty | Standout axes |
|---|---|
| Internal Medicine (General) | diagnostic_puzzle 0.75, acute_vs_longitudinal 0.4 (longitudinal-leaning) |
| Cardiology | procedural 0.6, diagnostic_puzzle 0.7, acute 0.55 |
| Interventional Cardiology | procedural 0.85, surgical_tolerance 0.6, emergency 0.6 |
| Gastroenterology | procedural 0.65, diagnostic_puzzle 0.65 |
| Nephrology | diagnostic_puzzle 0.75, longitudinal 0.3, lab_imaging 0.5 |
| Pulmonology | diagnostic_puzzle 0.65, emergency 0.55 |
| Endocrinology | diagnostic_puzzle 0.6, longitudinal 0.25 |
| Rheumatology | diagnostic_puzzle 0.75, longitudinal 0.25 |
| Infectious Disease | diagnostic_puzzle 0.8, public_health 0.55 |
| Hematology/Oncology | diagnostic_puzzle 0.7, longitudinal 0.3, research 0.6 |
| Geriatric Medicine | longitudinal 0.2, lifestyle 0.6 |

### Emergency, Anesthesia, Critical Care
| Specialty | Standout axes |
|---|---|
| Emergency Medicine | emergency 0.95, acute 0.9, procedural 0.6, lifestyle 0.65 |
| Anesthesiology | procedural 0.8, emergency 0.7, lifestyle 0.65, income 0.7 |
| Critical Care / Intensivist | emergency 0.85, acute 0.85, diagnostic_puzzle 0.6 |

### Women's & Children's Health
| Specialty | Standout axes |
|---|---|
| Obstetrics & Gynecology | ob_gyn 0.95, procedural 0.7, emergency 0.5 |
| Pediatrics (General) | pediatric 0.9, longitudinal 0.5 |
| Neonatology | pediatric 0.95, emergency 0.7, procedural 0.6 |
| Pediatric Cardiology | pediatric 0.9, diagnostic_puzzle 0.65, procedural 0.5 |

### Mental Health & Neuro
| Specialty | Standout axes |
|---|---|
| Psychiatry | psych 0.95, longitudinal 0.35, lifestyle 0.6 |
| Child & Adolescent Psychiatry | psych 0.9, pediatric 0.6 |
| Neurology | diagnostic_puzzle 0.85, longitudinal 0.3 |

### Diagnostic / Lab-Based
| Specialty | Standout axes |
|---|---|
| Radiology | lab_imaging 0.95, diagnostic_puzzle 0.7, lifestyle 0.7, income 0.75 |
| Pathology | lab_imaging 0.9, diagnostic_puzzle 0.65, lifestyle 0.75 |
| Clinical Laboratory Medicine | lab_imaging 0.9, research 0.5 |

### Primary Care & Community
| Specialty | Standout axes |
|---|---|
| Family Medicine | longitudinal 0.15 (strongly longitudinal), lifestyle 0.6 |
| Community/Public Health Medicine | public_health 0.9, admin_systems 0.55, longitudinal 0.2 |
| Occupational Medicine | public_health 0.6, lifestyle 0.75 |

### Dermatology & Other Lifestyle-Leaning
| Specialty | Standout axes |
|---|---|
| Dermatology | lifestyle 0.85, income 0.75, procedural 0.4 |
| Physical Medicine & Rehabilitation | longitudinal 0.3, lifestyle 0.75 |
| Allergy & Immunology | diagnostic_puzzle 0.6, lifestyle 0.7 |

### Administrative / Non-Clinical Medical Specialties
| Specialty | Standout axes |
|---|---|
| Quality Management & Patient Safety | admin_systems 0.95, public_health 0.5, lifestyle 0.7 |
| Infection Control & Hospital Epidemiology | admin_systems 0.85, public_health 0.8 |
| Health Informatics / Medical Informatics | admin_systems 0.85, research 0.6, lab_imaging 0.4 |
| Medical Education / Academic Faculty | research_academic 0.9, admin_systems 0.5 |
| Hospital Administration / Medical Directorship | admin_systems 0.95, income 0.6 |
| Public Health / Epidemiology (non-clinical track) | public_health 0.95, research 0.7 |
| Health Insurance / Medical Underwriting | admin_systems 0.8, lifestyle 0.75, income 0.65 |
| Pharmaceutical / Clinical Research Medicine | research_academic 0.9, admin_systems 0.5 |
| Forensic Medicine | diagnostic_puzzle 0.7, admin_systems 0.5, lifestyle 0.6 |

*(This list covers the major real-world categories comprehensively; niche/regional sub-subspecialties — e.g. "pediatric interventional cardiology" — can be added as additional rows using the same axis pattern whenever it's useful, without any tree changes.)*

---

## 4. Doctor Specialty — Sample Branching Question Bank

The tree below shows the actual branching mechanic. Full production question bank should extend each branch with 2-3 more question layers before termination — this shows the pattern to replicate.

```
ROOT — Q1 (everyone)
"A patient's condition is unstable and changing fast. What's your instinct?"
 A) "Act immediately, with my hands"
    → surgical_tolerance +2, procedural_affinity +2, acute +2
    → next: Q2_PROCEDURAL
 B) "Step back and think through what's happening"
    → diagnostic_puzzle +2, acute -1
    → next: Q2_COGNITIVE
 C) "Depends entirely on the patient in front of me"
    → next: Q2_NEUTRAL

Q2_PROCEDURAL (from 1A)
"Open surgery with full control, or a smaller/minimally-invasive approach?"
 A) "Open surgery" → surgical_tolerance +2 → next: Q3_SURGICAL_FIELD
 B) "Minimally invasive / catheter / scope" → procedural +1 → next: Q3_INTERVENTIONAL

Q3_SURGICAL_FIELD (from 2A)
"Which appeals more?"
 A) "Bones and joints" → next: routes toward Orthopedic Surgery cluster
 B) "Abdomen / general operations" → next: routes toward General/Vascular Surgery cluster
 C) "Brain and nervous system" → next: routes toward Neurosurgery cluster
 D) "Heart and chest" → next: routes toward Cardiothoracic Surgery cluster

Q2_COGNITIVE (from 1B)
"When solving a hard case, what excites you more?"
 A) "Piecing together a rare diagnosis" → diagnostic_puzzle +2 → next: Q3_DX_FIELD
 B) "Understanding a chronic condition over years with a patient" → acute -2 → next: Q3_LONGITUDINAL_FIELD

Q2_NEUTRAL (from 1C)
"Which pulls at you most?"
 A) "Children" → pediatric +2 → next: Q3_PEDS_FIELD
 B) "Women's health / pregnancy" → ob_gyn +2 → next: routes toward OB/GYN
 C) "Mental health / behavior" → psych +2 → next: Q3_PSYCH_FIELD
 D) "Systems, policy, and how care is delivered — not hands-on patient care" 
    → admin_systems +3, procedural -2
    → next: Q3_ADMIN_FIELD   ← this is the branch that surfaces the 
                                 administrative/non-clinical specialties
 E) "None of these — ask me something else" → next: Q3_GENERAL_FORCING

Q3_ADMIN_FIELD (from 2D — new branch for non-clinical track)
"What kind of impact do you want to have?"
 A) "Making hospitals safer and processes better" 
    → admin_systems +2 → next: routes toward Quality Management, Infection Control
 B) "Advancing medical knowledge through research"
    → research_academic +3 → next: routes toward Academic Medicine, Clinical Research
 C) "Population-level health, not individual patients"
    → public_health +3 → next: routes toward Public Health/Epidemiology
 D) "Technology and data in medicine"
    → admin_systems +2, lab_imaging +1 → next: routes toward Health Informatics
```

**Universal calibration questions** (asked to everyone near the end, regardless of branch, before termination):
- Lifestyle: "How much does having predictable, controllable hours matter to you?" (1-5 scale → `lifestyle_priority`)
- Income: "How much does earning potential factor into your decision?" (1-5 scale → `income_priority`)
- Academic: "Do you see yourself pursuing research or teaching alongside clinical practice?" (yes/somewhat/no → `research_academic_affinity`)

**Termination:** stop at 30-35 questions max, or when the top specialty's similarity score is ≥30% ahead of the second-place specialty.

---

## 5. Nurse Specialty Axes (12 axes)

| Axis | Captures |
|---|---|
| `critical_care_affinity` | Comfort with high-acuity, rapidly changing patients |
| `procedural_comfort` | Comfort with hands-on technical/invasive nursing procedures |
| `pediatric_affinity` | Preference for treating children |
| `ob_affinity` | Preference for maternity/obstetric nursing |
| `psych_affinity` | Interest in mental health nursing |
| `community_affinity` | Preference for community/home/public health settings over hospital |
| `surgical_or_affinity` | Preference for operating room/perioperative nursing |
| `longitudinal_care_affinity` | Preference for ongoing relationships (chronic care, rehab) vs. episodic |
| `management_affinity` | Interest in charge/nurse-management track |
| `education_affinity` | Interest in nurse education/training roles |
| `admin_systems_affinity` | Interest in quality, infection control, informatics over bedside care |
| `shift_tolerance` | Tolerance for night shifts/rotating schedules |

## 6. Nurse Specialty Taxonomy + Target Vectors (first pass)

### Critical & Acute Care
| Specialty | Standout axes |
|---|---|
| ICU / Critical Care Nursing | critical_care 0.95, procedural 0.75, shift_tolerance 0.3 (needs high tolerance) |
| Emergency Room Nursing | critical_care 0.9, shift_tolerance 0.3, procedural 0.65 |
| Neonatal ICU Nursing | critical_care 0.85, pediatric 0.9, procedural 0.7 |
| Cardiac Care Nursing | critical_care 0.75, procedural 0.6 |
| Flight/Transport Nursing | critical_care 0.9, shift_tolerance 0.2 |

### Perioperative
| Specialty | Standout axes |
|---|---|
| OR / Surgical (Perioperative) Nursing | surgical_or 0.95, procedural 0.85 |
| Post-Anesthesia Care (PACU) Nursing | surgical_or 0.7, critical_care 0.6 |

### Women's & Children's
| Specialty | Standout axes |
|---|---|
| Pediatric Nursing | pediatric 0.9, longitudinal 0.5 |
| Pediatric Oncology Nursing | pediatric 0.9, longitudinal 0.4, critical_care 0.5 |
| Labor & Delivery / Obstetric Nursing | ob 0.95, critical_care 0.4 |
| Midwifery-track Nursing | ob 0.9, community 0.4, longitudinal 0.4 |

### Mental Health
| Specialty | Standout axes |
|---|---|
| Psychiatric/Mental Health Nursing | psych 0.95, longitudinal 0.4 |

### Community & Chronic Care
| Specialty | Standout axes |
|---|---|
| Community/Public Health Nursing | community 0.95, longitudinal 0.3 |
| Home Health Nursing | community 0.85, longitudinal 0.3 |
| Geriatric/Long-Term Care Nursing | longitudinal 0.2 (strongly longitudinal), community 0.5 |
| Rehabilitation Nursing | longitudinal 0.25, procedural 0.5 |
| Oncology Nursing (adult) | longitudinal 0.3, critical_care 0.5 |
| Dialysis/Nephrology Nursing | procedural 0.7, longitudinal 0.3 |

### Management & Education
| Specialty | Standout axes |
|---|---|
| Nurse Management / Charge Nurse | management 0.95, admin_systems 0.5 |
| Nurse Education / Clinical Instructor | education 0.95, admin_systems 0.4 |
| Case Management / Care Coordination | management 0.6, community 0.5, admin_systems 0.5 |

### Administrative / Non-Bedside
| Specialty | Standout axes |
|---|---|
| Infection Control Nursing | admin_systems 0.9, community 0.4 |
| Quality Management / Patient Safety Nursing | admin_systems 0.9, management 0.5 |
| Nursing Informatics | admin_systems 0.85, education 0.3 |
| Occupational Health Nursing | community 0.6, admin_systems 0.5, shift_tolerance 0.8 (favorable hours) |

---

## 7. Scoring Algorithm (both roles)

```
1. Normalize user's raw axis scores to a 0-1 scale (same scale as target vectors).
2. For each specialty in the taxonomy:
     similarity = cosine_similarity(user_vector, specialty_target_vector)
     — OR, simpler/more interpretable: 
     similarity = 1 - (weighted_euclidean_distance(user_vector, target_vector) / max_possible_distance)
3. Rank specialties by similarity, descending.
4. Return top 3-5 as "matches" with a confidence percentage (similarity score × 100).
5. Generate a short natural-language "why" summary by identifying the 2-3 axes 
   where the user's score most strongly drove the top match (i.e., the axes 
   with the largest contribution to that specialty's similarity score).
```

Recommend starting with weighted Euclidean distance — it's more intuitive to debug and explain than cosine similarity, and easier to reason about when tuning target vectors by hand.

---

## 8.0 Full Path Taxonomy (comprehensive — national + international + administrative)

A "path" is not just "which country" — it's the whole career track, including several distinct tracks *within* Egypt that earlier drafts flattened into one "Stay-Egypt" option. Expanded here to match the same comprehensiveness as the specialty taxonomy.

### Egypt — National Tracks (Doctor)
| Path | Description |
|---|---|
| MOH Government Track | Ministry of Health hospital placement, government salary scale, pension/job security |
| University Hospital / Academic Track | Teaching hospital appointment, path toward Masters/MD/professorship, research-adjacent |
| Private Sector Practice | Private hospital or own clinic, income-driven, less job security |
| Military/Police Medical Services | Armed forces or police medical corps track — distinct entry process and service commitment |
| Egyptian Postgraduate Degree Track | Pursuing Egyptian Board/Masters/MD as the primary next step before deciding anything else |
| NGO / In-Country International Health | Working with international organizations operating inside Egypt (e.g., WHO country office, MSF missions, UNICEF health programs) without emigrating |

### Egypt — National Tracks (Nurse)
| Path | Description |
|---|---|
| MOH Government Nursing Track | Government hospital placement |
| University/Teaching Hospital Nursing Track | Academic hospital, path toward nursing faculty/education roles |
| Private Sector Nursing | Private hospital, generally higher pay, less job security |
| Military/Police Nursing Services | Armed forces or police medical corps nursing track |
| Egyptian Postgraduate Nursing Track | Pursuing a Master's in Nursing in Egypt as the next step |
| NGO / In-Country International Health Nursing | Working with international health organizations inside Egypt |

### Gulf (Doctor & Nurse — separate licensing per country)
| Path | Body |
|---|---|
| Saudi Arabia — Prometric/SCFHS | Saudi Commission for Health Specialties |
| UAE — DHA (Dubai) | Dubai Health Authority |
| UAE — MOH/Haad (Abu Dhabi) | Department of Health Abu Dhabi |
| Qatar — QCHP | Qatar Council for Healthcare Practitioners |
| Kuwait — MOH Licensing | Kuwait Ministry of Health |
| Bahrain — NHRA | National Health Regulatory Authority |
| Oman — MOH Licensing | Oman Ministry of Health |

### Europe (Doctor & Nurse)
| Path | Body |
|---|---|
| UK — PLAB (Doctor) / NMC OSCE (Nurse) | GMC / Nursing and Midwifery Council |
| Ireland — Cert. of Experience / IMC (Doctor) / NMBI (Nurse) | Irish Medical Council / Nursing and Midwifery Board of Ireland |
| Germany — Approbation | State medical/nursing licensing boards (language-gated, German B2/C1 required) |
| Malta — Medical Council Registration | Smaller market, English-friendly, growing Egyptian-doctor presence |

### North America (Doctor & Nurse)
| Path | Body |
|---|---|
| USA — USMLE (Doctor) / NCLEX-RN (Nurse) | ECFMG / NCSBN |
| Canada — NAC-OSCE + MCCQE (Doctor) / NCLEX-RN (Nurse) | Medical Council of Canada / NNAS |

### Oceania (Doctor & Nurse)
| Path | Body |
|---|---|
| Australia — AMC exams (Doctor) / ANMAC (Nurse) | Australian Medical Council / Australian Nursing and Midwifery Accreditation Council |
| New Zealand — NZREX (Doctor) / CAC (Nurse) | Medical Council of New Zealand / Nursing Council of NZ |

### Administrative / Global Health Tracks (Doctor & Nurse — cross-cutting, not tied to one country's clinical exam)
| Path | Description |
|---|---|
| International Organization Track (WHO/UN agencies) | Public-health/policy roles with WHO, UNICEF, UNFPA, etc. — usually requires MPH or global health experience, not a clinical licensing exam |
| International NGO Field Track (MSF, IRC, Red Cross/Crescent) | Field medical/nursing roles in humanitarian response, often rotational/contract-based |
| Global Health Research Track | Research positions with international universities/institutes, publication-driven |
| Health-Tech / Digital Health Industry Track | Clinical roles inside health-tech companies (telemedicine platforms, health AI companies) — growing, low-barrier-to-entry alternative to classic migration |
| Pharmaceutical/Clinical Research Industry Track | Medical affairs, clinical research associate, or similar roles with multinational pharma — often based in Egypt or Gulf regional hubs, not exam-gated |

*(Nurse-equivalent administrative/global-health tracks mirror the same list — WHO/UN nursing advisor roles, MSF/IRC field nursing, nursing informatics roles with multinational health-tech companies, etc.)*

---

## 8. Path Survey — Doctor & Nurse (shared structure, role-specific weighting)

### 8.1 Axes (reconciled from initial draft — 12 axes, matching code implementation)

The original §8.1 draft defined 9 axes (13 unique names when expanding the regional cluster). During implementation a 12-axis set emerged that is a superset: 8 axes map 1:1 to original concepts (with naming differences), 4 axes are genuinely new (doing work the original 9 didn't cover), and 3 original concepts were intentionally deferred from scored axes (handled by branch routing instead).

Mapping from original §8.1 draft to current implementation:

| Current axis | Original §8.1 concept | Status |
|---|---|---|
| `willingness_relocate` | `migration_readiness` | Renamed — more action-oriented wording |
| `gulf_preference` | `region_gulf` | Renamed from region-prefixed convention |
| `western_preference` | `region_europe` + `region_namerica` + `region_oceania` | Merged — European/N. American/Oceanian destinations follow a shared "western" licensing pattern; finer split can be added in v2 if needed |
| `egypt_stability` | `region_stay_egypt` | Renamed — captures the stability/commitment dimension of staying in Egypt |
| `language_learning` | `language_readiness_english` | Renamed — shorter, captures the effort dimension |
| `exam_tolerance` | `exam_difficulty_tolerance` | Shortened — same concept |
| `time_investment` | `timeline_tolerance` | Renamed — more concrete |
| `cost_tolerance` | `cost_tolerance` | **Same name** — correctly matched in code |
| `income_expectation` | *(new)* | **Genuine new axis.** Captures expected earnings after migration. Distinct from `cost_tolerance` (willingness to pay). USMLE path scores high on both (expensive + high earnings), Gulf path scores medium on both. These are separate real-world factors. |
| `clinical_vs_admin` | *(new)* | **Genuine new axis.** Captures preference for direct clinical care vs. non-clinical/administrative/policy roles within a migration path. Broader than the original `admin_global_health_affinity` (which covered WHO/NGO specifically). Used by paths like Health-Tech (low clinical, high admin) vs. PLAB (high clinical, low admin). |
| `humanitarian_orientation` | *(new)* | **Genuine new axis.** Captures interest in boots-on-the-ground humanitarian/field work (MSF, IRC, Red Cross). Distinct from `admin_global_health_affinity` (policy/research focus). MSF/IRC paths score 0.9+ here. |
| `research_academic_orientation` | *(new)* | **Genuine new axis.** Captures interest in research, publishing, and academia as part of a migration path. Distinct from both humanitarian (field work) and admin (policy). Global Health Research track scores 0.95 here. |

Deferred from scored axes (handled by branching questions instead of accumulating a dimension score):
- `egypt_track_type` — Egypt's MOH vs. university vs. private vs. military sub-tracks are differentiated by dedicated routing questions (GULF_FOCUS vs. WESTERN_FOCUS vs. EGYPT_FOCUS branches), not a scored axis.
- `family_flexibility` — Family constraints are addressed contextually in DEEP8 ("spouse career"). A scored axis would add precision; deferred to v2.
- `admin_global_health_affinity` — Replaced by three finer-grained axes above (`clinical_vs_admin`, `humanitarian_orientation`, `research_academic_orientation`).

Final definition table:

| Axis | Captures |
|---|---|
| `willingness_relocate` | Willingness to relocate at all |
| `gulf_preference` | Pull toward Gulf region (Saudi, UAE, Qatar, Kuwait, Bahrain, Oman) |
| `western_preference` | Pull toward Europe, North America, Oceania |
| `egypt_stability` | Pull toward staying in Egypt |
| `language_learning` | Comfort/current level with English; willingness to learn a new language (German for Germany track) |
| `exam_tolerance` | Risk tolerance for high-stakes, high-failure-rate licensing exams |
| `time_investment` | Willingness to commit to a long (3-5yr+) prep/migration timeline |
| `cost_tolerance` | Willingness/ability to fund exam fees, prep courses, travel |
| `income_expectation` | Expected earnings after completing the migration path |
| `clinical_vs_admin` | Preference for direct clinical care (high) vs. non-clinical/administrative roles (low) |
| `humanitarian_orientation` | Interest in humanitarian field work (MSF, IRC, Red Cross) |
| `research_academic_orientation` | Interest in research, publishing, and academic-track careers |

### 8.2 Sample early branching
```
ROOT
"If cost and time weren't a factor, would you want to practice abroad?"
 A) "Yes, definitely" → willingness_relocate +3, income_expectation +2, egypt_stability -2 → next: Q2_REGION
 B) "Maybe, depends on the country/opportunity" → clinical_vs_admin -2, humanitarian_orientation +2, research_academic_orientation +1 → next: Q2_REGION
 C) "No, I want to stay in Egypt" → willingness_relocate -3, egypt_stability +2 → next: routes toward Stay-Egypt path (short-circuits migration questions)

Q2_REGION (skipped entirely if 1C)
"Which region appeals to you most?"
 A) "Gulf (Saudi, UAE, etc.)" → gulf_preference +3, willingness_relocate +1 → next: Q3_GULF
 B) "Europe / UK / North America / Oceania" → western_preference +2, willingness_relocate +1 → next: Q3_WESTERN
 C) "Not sure — help me decide" → next: Q3_COMPARE
```

## 8.3 Path Target Vectors

Scale: 0-1 per axis. `region_*` axes are mutually near-exclusive per path (a path targets one region strongly, others near 0) — reflects that a path is fundamentally about "which destination," so blending regions rarely makes sense the way blending specialty traits does.

### Doctor Paths
| Path | willingness_relocate | language_learning | exam_tolerance | time_investment | cost_tolerance | income_expectation | gulf_preference | western_preference | egypt_stability | clinical_vs_admin | humanitarian_orientation | research_academic_orientation |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Stay-Egypt (MOH) | 0.1 | 0.1 | 0.2 | 0.3 | 0.2 | 0.3 | 0.2 | 0.2 | 0.95 | 0.5 | 0.3 | 0.3 |
| Stay-Egypt (University) | 0.1 | 0.1 | 0.2 | 0.5 | 0.2 | 0.3 | 0.2 | 0.3 | 0.9 | 0.5 | 0.3 | 0.9 |
| Stay-Egypt (Private) | 0.1 | 0.1 | 0.2 | 0.2 | 0.3 | 0.8 | 0.2 | 0.2 | 0.8 | 0.5 | 0.2 | 0.2 |
| Stay-Egypt (Postgrad) | 0.2 | 0.2 | 0.4 | 0.6 | 0.3 | 0.3 | 0.2 | 0.3 | 0.7 | 0.5 | 0.3 | 0.9 |
| Saudi-Prometric | 0.8 | 0.2 | 0.6 | 0.4 | 0.5 | 0.8 | 0.95 | 0.2 | 0.2 | 0.5 | 0.2 | 0.3 |
| UK-PLAB | 0.85 | 0.1 | 0.7 | 0.5 | 0.6 | 0.6 | 0.2 | 0.9 | 0.15 | 0.5 | 0.3 | 0.4 |
| USA-USMLE | 0.9 | 0.1 | 0.95 | 0.9 | 0.95 | 0.95 | 0.1 | 0.95 | 0.1 | 0.5 | 0.2 | 0.5 |
| Germany-Approbation | 0.85 | 0.95 | 0.6 | 0.6 | 0.5 | 0.7 | 0.15 | 0.9 | 0.1 | 0.5 | 0.3 | 0.4 |
| Humanitarian Field (MSF) | 0.9 | 0.5 | 0.2 | 0.3 | 0.2 | 0.3 | 0.3 | 0.3 | 0.2 | 0.3 | 0.95 | 0.3 |
| Global Health Research | 0.5 | 0.4 | 0.3 | 0.6 | 0.3 | 0.4 | 0.15 | 0.5 | 0.3 | 0.15 | 0.6 | 0.95 |

*(Full target vector table for all 26 doctor paths and 21 nurse paths is defined in the seed files at `backend/seed/survey/survey-path-doctor.js` and `survey-path-nurse.js` — the table above shows representative selections.)*

**Reading these:** e.g., USA-USMLE scores high on `cost_tolerance`, `time_investment`, and `exam_tolerance` because it's genuinely the longest, most expensive, highest-stakes path — a user with low tolerance on those axes will correctly match away from it even if their `willingness_relocate` is high, and toward something like Saudi-Prometric instead. Same underlying matching algorithm as §7 (weighted Euclidean distance), just applied to this axis set instead of the specialty one.

**Caveat, same as §3/§6:** these are a confident first draft based on generally known realities of each path (cost, exam difficulty, timeline) — worth a sanity check from someone who's actually gone through one or more of these processes before this goes live with real users.

---

## 9. What's still needed before this is build-ready

1. **Full question bank depth** — §4 and §8.2 show the branching pattern with 2-3 levels; production needs each branch extended to reach the 30-35 question termination target. This is a content-writing task using the same pattern, not a new design problem.
2. **Target vector review** — every vector in §3 and §6 should be sanity-checked by an actual doctor and nurse respectively. These are a confident first draft, not verified ground truth.
3. **Nurse path survey question bank** — §8.2 shows doctor-flavored examples; nurse-specific path questions (e.g., NCLEX vs. Prometric vs. NMC OSCE framing) should mirror the same structure with role-appropriate wording.
4. **Add dedicated `family_flexibility` axis in a future iteration** — currently the signal is captured indirectly via DEEP4/DEEP8 (distributed across `willingness_relocate` and `egypt_stability` deltas), so matching is correct but the why-summary attributes it to those proximate axes instead of the actual underlying factor (family constraints on relocation). A dedicated axis would fix why-summary precision. Known deliberate gap, not a forgotten one.
