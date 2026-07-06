# RA Education — Project Roadmap

## Phase 1 — Foundation ✅ (Built & Verified)
- [x] Auth: OTP-based login (Telegram primary, email fallback)
- [x] Auth: Rate limiting, max-attempt invalidation
- [x] Auth: Telegram webhook for link + OTP delivery
- [x] Auth: JWT issue + verify middleware
- [x] Catalog: Specialties with branches (name, weight, order, description)
- [x] Catalog: Paths with metadata
- [x] Catalog: Browse + detail pages (frontend)
- [x] QuickPick: Wizard (specialty → path → duration)
- [x] QuickPick: Zod preset_duration_months enum (6/12/18/24 — fixed: `z.number().refine(...)` for number type)
- [x] Study Plan: Generate from QuickPick, one-active-plan rule
- [x] Study Plan: Branch allocation via Largest Remainder
- [x] Study Plan: PlanLesson with sequence + status (locked / in_progress / completed)
- [x] Plan restart (abandon old → create new)

## Phase 2 — Assessment Engine ✅ (Built & Verified)
- [x] Question bank seed (27 questions across branches)
- [x] Adaptive question selection (random by difficulty)
- [x] Answer scoring (correct/incorrect per branch)
- [x] Results page: branch score cards, TiltCard applied
- [x] Reallocation: adjust plan branch_weighting based on assessment scores
- [x] Frontend: AssessmentSession with question loop + results

## Phase 3 — Survey Engine ✅ (Backend + Frontend)
- [x] Survey graph data model (nodes, edges, axes, bounds)
- [x] 4 graph definitions: specialty-doctor, specialty-nurse, path-doctor, path-nurse
- [x] Scoring engine with axis bounds (DP algorithm for calibration chain reachability)
- [x] Survey session: start → answer → state → complete
- [x] Frontend: SurveyLandingPage, SurveySessionPage, SurveyResultsPage
- [x] SurveyResultsPage uses TiltCard for match cards
- [x] Survey→Path CTA: `survey.service.js` resolves `specialty_id` by name, match cards link to specialty detail, "View Recommended Paths" button

## Auth Pivot — Password-based Registration ✅ (Fully Implemented & Verified)
- [x] Backend: User model — added `password_hash`, unique index on `email`/`national_id`
- [x] Backend: `POST /api/auth/register` — validates mobile/email/NID/password
- [x] Backend: `POST /api/auth/login` — mobile or email + password → JWT
- [x] Backend: `POST /api/auth/forgot-password` — OTP delivery for recovery
- [x] Backend: `POST /api/auth/reset-password` — verify OTP → set new password
- [x] Backend: NID validation via `egypt-natid` (validate + parse + age ≥ 16)
- [x] Backend: NID cross-check — DOB, Gender, Governorate verified against `parse()` output
- [x] Backend: 2-category error split — 6 failure modes → "This National ID is invalid."; duplicate NID → "This National ID is already registered."
- [x] Frontend: Landing page (navy/gold hero, TiltCard features, CTAs)
- [x] Frontend: RegisterPage (full form with DOB/date picker, Gender/radios, Governorate/27-item dropdown mapping "Born Abroad" → "Foreign", 4-option role dropdown, country code selector)
- [x] Frontend: LoginPage (mobile/email + password)
- [x] Frontend: ForgotPasswordPage (OTP → reset)
- [x] Frontend: App.tsx routing (/, /login, /register, /forgot-password)

## Round 1 — Role Filtering & Routing ✅ (Verified via E2E)
- [x] Backend: `POST /api/catalog/specialties/filtered` — role-based specialty filtering (doctor vs nurse)
- [x] Frontend: Specialties page shows only role-appropriate specialties
- [x] Frontend: PathDetail page + route (`/paths/:id`)
- [x] Frontend: PathDetail → QuickPick CTA with `?pathId=` pre-selection
- [x] Frontend: QuickPick reads `?pathId=` from URL, fetches path, shows "Path pre-selected" banner, skips path step
- [x] Frontend: NID field-level error display (`setNidError`)
- [x] Frontend: Selected-option contrast fix (gold accent on selected)
- [x] E2E: doctor-specialties screenshot, nurse-specialties screenshot
- [x] E2E: Stale-session bootstrap test (token-only → `fetchUser()` recovers user from API)
- [x] E2E: PathDetail→QuickPick pre-select flow

## Round 2 — Dark Mode, Responsive Layout, Survey CTA ✅ (WCAG AA Verified)
- [x] Dark mode contrast: `theme.css` `.dark` — `--color-primary: #D4D4D4` (12:1), `--color-border: #757E94` (4.33:1), `--color-accent-violet: #A585D4` (5.78:1). All pairs pass WCAG AA.
- [x] Responsive layout: `AppLayout.tsx` + `Navbar.tsx` — `max-w-3xl` → `max-w-5xl lg:max-w-6xl xl:max-w-7xl`
- [x] Survey→Path CTA: match cards link to specialty detail via `specialty_id`; "View Recommended Paths" button replaces generic "Explore Specialties"

## Round 3 — Search, Filter, Path Grouping ✅
- [x] Text search input with `useMemo` filtering on SpecialtiesPage, QuickPickPage, PathsPage
- [x] Path list grouped by `target_country` with section headers

## OTP / Delivery Infrastructure ✅ (Built & Verified on Production)
- [x] OTP generation + bcrypt hashing
- [x] Telegram bot (@RAEducationOTP_bot) with webhook
- [x] Email OTP via Resend (fallback)
- [x] Verified on production: Full OTP flow (request → Telegram link → receive code → verify → JWT)
- [x] DB-based rate limiting (per-mobile, per-minute)
- [x] Webhook secret_token hardening

## Design System v2 ✅ (Applied)
- [x] Navy/gold palette: primary `#0F2A4A` (navy), secondary `#B8912F` (gold)
- [x] Dark mode: primary `#1E3A5F`, secondary `#D4AF37`
- [x] Gold card borders (`--color-border-accent`, brighten on hover)
- [x] TiltCard component with cursor-tracked 3D rotation
- [x] TiltCard applied: SpecialtiesPage, PathsPage, SurveyResultsPage, AssessmentSession
- [x] NOT applied (correctly per spec): SurveySessionPage (buttons), StudyPlanPage (list rows)
- [x] Dark mode WCAG AA verified: `--color-primary: #D4D4D4`, `--color-border: #757E94`, `--color-accent-violet: #A585D4`

## Deployment ✅ (Backend + Frontend Live on Vercel)
- [x] Backend: Vercel serverless (Express via @vercel/node)
- [x] Backend: MongoDB Atlas with 0.0.0.0/0 whitelist
- [x] Backend: Connection health-ping fix (db.js — verifies before reusing cached connection)
- [x] Backend: connectDB awaited as Express middleware before route handlers (cold start fix)
- [x] Backend: Telegram webhook registered against live URL
- [x] Frontend: Vite + React deployed on Vercel
- [x] Frontend: Fixed Vercel build — `vite` moved from `devDependencies` to `dependencies` (was `vite: command not found`)
- [x] Auto-deploy from GitHub (main branch)

## Testing ✅ (26/26 E2E Tests Passing)
- [x] Playwright E2E test suite installed + configured
- [x] 26 tests: auth (3), catalog (4), design (4), nid-validation (7), quickpick (1), role-filtering (4), survey (1), assessment (1), fresh-registration (1)
- [x] All 26 passing
- [x] NID validation: all 7 failure modes covered (format, checksum, under-16, DOB mismatch, gender mismatch, governorate mismatch, duplicate NID)
- [x] Fresh registration flow verified end-to-end (NID-generating test)

## Data Cleanup ✅
- [x] One-off cleanup: 638 test-user documents deleted across 10 collections
- [x] All user-data collections at 0; catalog/content collections preserved (specialties 74, paths 47, lessons 27, questions 27, surveygraphs 4)

## Secret Rotation 🚧 (In Progress)
- [x] JWT_SECRET rotated (local .env + Vercel production + preview)
- [x] TELEGRAM_WEBHOOK_SECRET rotated (local .env + Vercel production)
- [ ] TELEGRAM_BOT_TOKEN — awaiting user action (rotate via @BotFather)
- [ ] Webhook re-registration — pending new bot token
- [ ] Verification: real OTP delivery via Telegram after rotation

## Never Started 🔴

### Round 4 — Dashboard & Profile ✅
- [x] Dashboard: central post-login page (/dashboard) with active plan widget, quick-link grid (explore, quickpick, survey, assessment), member-since stat
- [x] Profile: view/manage account info (/profile), masked NID (one-way, EyeOff icon), masked mobile, name/email edit form with save
- [x] PUT /api/users/me — validates name/email via Zod, silently drops national_id/role/mobile_number
- [x] DELETE /api/users/me — cascading delete across 8 collections: PlanLesson→StudyPlan, QuickPickSelection, SurveySession, TelegramLink, OtpRequest, AssessmentResponse→Assessment, User
- [x] Navbar: Home (/dashboard), Profile (/user) icons added; brand link points to /dashboard

### Phase 4 — Resource Curation & Lesson Exam Loop ✅
- [ ] Strapi admin panel for content curation (deferred)
- [x] Lesson → exam → score → adaptive re-suggestion loop
- [x] Lesson completion triggers exam unlock
- [x] Exam score below threshold → suggest related lessons before advancing
- [x] `plan_lesson_id` on Assessment — links exams to specific PlanLessons
- [x] `exam_status`/`exam_score` on PlanLesson — tracks pending/passed/failed
- [x] `min_pass_score` on Lesson — configurable pass threshold (default 60%)
- [x] `POST /lessons/start-exam` — creates Assessment with branch-scoped questions
- [x] `POST /lessons/complete` — validates exam, marks lesson done, unlocks next
- [x] `POST /lessons/suggestions` — returns related lessons for retry
- [x] `GET /lessons/:id` — full lesson detail with study resources
- [x] `GET /lessons/:id/resources` — existing endpoint (retained)
- [x] `GET /assessment/:id/next` — updated to filter by branch_id when `plan_lesson_id` is set
- [x] LessonViewPage (`/plan/lessons/:planLessonId`) — lesson content, resources, exam status, Start Exam button
- [x] LessonExamPage (`/plan/lessons/:planLessonId/exam/:assessmentId`) — question loop, pass/fail, retry, suggested lessons
- [x] StudyPlanPage — lesson rows now link to LessonViewPage; shows exam_status; `failed_needs_retry` uses AlertTriangle icon

### Phase 5 — Companion & History
- [x] Companion/mentor system (buddy matching)
  - CompanionRequest model (from_user_id, to_user_id, status: pending/accepted/declined)
  - `GET /api/companion/match` — finds same-specialty users with match score
  - `POST /api/companion/request` — send companion request
  - `POST /api/companion/respond` — accept/decline (sets companion_id on both users)
  - `GET /api/companion` — current companion info with lesson progress
  - `GET /api/companion/requests` — pending incoming/outgoing requests
  - CompanionSection on dashboard — shows current companion or "Find" CTA
  - CompanionPage (`/companion`) — 3-tab UI: My Companion / Find / Requests
- [x] Plan restart history (track abandoned plans, compare progress)
  - `GET /api/plan/history` — returns all plans (active/abandoned/completed) with lesson progress stats
  - PlanHistoryPage — shows each plan with status badge, progress bar, created date, restart indicator
  - StudyPlanPage — added History link alongside existing Assess/Restart buttons
- [ ] Catalog auto-refresh flagging (stale content notifications)

### Content Work
- [ ] Catalog entries are mostly stubs (`content_status: 'stub'`)
- [ ] Real lessons + resources not yet written for most specialties/paths
- [ ] Question bank limited to 27 seed questions — needs expansion

### Design System Verification
- [ ] Navy/gold applied to some pages but not systematically verified across entire app
- [ ] Catalog detail pages, QuickPick wizard, Onboarding, StudyPlanPage — confirm accent borders/dark mode consistency

## Fixes & Notable Changes
- **QuickPick Zod bug**: `z.enum(['6', '12', '18', '24'])` accepted strings only, frontend sends numbers → 400. Fixed: `z.number().refine(v => [6, 12, 18, 24].includes(v))`.
- **bcrypt → bcryptjs**: Native addon (bcrypt) crashed on Vercel; replaced with bcryptjs (pure JS).
- **MongoDB stale connection**: Health-check ping before reusing cached connection (db.js).
- **NID cross-check over single-style error**: 2-category split hides which sub-check failed among 6 invalid variants, preventing information leakage.
- **Mobile number normalization**: Country code selector now wired to state (`country_code`), prepended to mobile_number before API call. Backend Zod transform handles normalization once.
- **Vercel cold start**: connectDB() now runs as Express middleware, awaited per-request using existing cached health-check logic.
- **Vercel build fix**: vite + vite plugins moved to `dependencies` (were `devDependencies`, causing `vite: command not found` on Vercel).
