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
- [x] QuickPick: Zod preset_duration_months enum (6/12/18/24 — **bug fixed**: changed to z.number().refine())
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

## Phase 3 — Survey Engine ✅ (Backend Built, Frontend Built)
- [x] Survey graph data model (nodes, edges, axes, bounds)
- [x] 4 graph definitions: specialty-doctor, specialty-nurse, path-doctor, path-nurse
- [x] Scoring engine with axis bounds
- [x] Survey session: start → answer → state → complete
- [x] Frontend: SurveyLandingPage, SurveySessionPage, SurveyResultsPage
- [x] SurveyResultsPage uses TiltCard for match cards

## OTP / Delivery Infrastructure ✅ (Built & Verified on Production)
- [x] OTP generation + bcrypt hashing
- [x] Telegram bot (@RAEducationOTP_bot) with webhook
- [x] Email OTP via Resend (fallback)
- [x] **Verified on production**: Full OTP flow (request → Telegram link → receive code → verify → JWT)

## Design System v2 ✅ (Applied)
- [x] Navy/gold palette (§16): primary `#0F2A4A` (navy), secondary `#B8912F` (gold)
- [x] Dark mode: primary `#1E3A5F`, secondary `#D4AF37`
- [x] Gold card borders (`--color-border-accent`, brighten on hover)
- [x] TiltCard component with cursor-tracked 3D rotation
- [x] TiltCard applied: SpecialtiesPage, PathsPage, SurveyResultsPage, AssessmentSession
- [x] NOT applied (correctly per spec): SurveySessionPage (buttons), StudyPlanPage (list rows)

## Deployment ✅ (Backend + Frontend Live on Vercel)
- [x] Backend: Vercel serverless (Express via @vercel/node)
- [x] Backend: MongoDB Atlas with 0.0.0.0/0 whitelist
- [x] Backend: Connection health-ping fix (db.js — verifies before reusing cached connection)
- [x] Backend: Telegram webhook registered against live URL
- [x] Frontend: Vite + React deployed on Vercel
- [x] Auto-deploy from GitHub (main branch)

## Auth Pivot — Password-based Registration 🔄 (In Progress, Implemented)
- [x] Backend: User model — added `password_hash`, unique index on `email`/`national_id`
- [x] Backend: `POST /api/auth/register` — validates mobile/email/NID/password
- [x] Backend: `POST /api/auth/login` — mobile or email + password → JWT
- [x] Backend: `POST /api/auth/forgot-password` — OTP delivery for recovery
- [x] Backend: `POST /api/auth/reset-password` — verify OTP → set new password
- [x] Backend: NID validation via `egypt-natid` (validate + parse + age ≥ 16)
- [x] Backend: Generic NID error for ALL NID failures
- [x] Frontend: Landing page (navy/gold hero, TiltCard features, CTAs)
- [x] Frontend: RegisterPage (4-option role dropdown, country code selector)
- [x] Frontend: LoginPage (mobile/email + password)
- [x] Frontend: ForgotPasswordPage (OTP → reset)
- [x] Frontend: App.tsx routing (/, /login, /register, /forgot-password)

## Testing ⚠️ (Partial)
- [x] Playwright E2E test suite installed + configured
- [x] 15 tests written (auth, catalog, survey, assessment, quickpick, design)
- [x] 15/15 passing (after identity-mismatch fix)
- [ ] Tests use `test.skip()` for seed-data-dependent features — need test seed data
- [ ] Registration/login/forgot-password E2E tests not yet written

## Never Started 🔴

### Phase 4 — Resource Curation & Lesson Exam Loop
- [ ] Strapi admin panel for content curation
- [ ] Lesson → exam → score → adaptive re-suggestion loop
- [ ] Lesson completion triggers exam unlock
- [ ] Exam score below threshold → suggest related lessons before advancing

### Phase 5 — Companion & History
- [ ] Companion/mentor system (buddy matching)
- [ ] Plan restart history (track abandoned plans, compare progress)
- [ ] Catalog auto-refresh flagging (stale content notifications)

### Content Work
- [ ] Catalog entries are mostly stubs (`content_status: 'stub'`)
- [ ] Real lessons + resources not yet written for most specialties/paths
- [ ] Question bank limited to 27 seed questions — needs expansion

### Security Cleanup
- [ ] Telegram bot token exposed in chat history twice — rotate before production launch
- [ ] JWT_SECRET still set to `dev-test-secret-2026` — update for production
- [ ] Audit for other secrets exposed in conversation

### Design System Verification
- [ ] Navy/gold applied to some pages but not systematically verified across entire app
- [ ] Catalog detail pages, QuickPick wizard, Onboarding, StudyPlanPage — confirm accent borders/dark mode consistency

## QuickPick Zod Bug — Fixed ✅
- **Was**: `z.enum(['6', '12', '18', '24'])` accepted strings only, frontend sends numbers → 400 error
- **Fix**: Changed to `z.number().refine(v => [6, 12, 18, 24].includes(v))` in `quickpick.routes.js:12`
- **Also**: Updated E2E test to send `12` (number) instead of `'12'` (string) to match real usage
