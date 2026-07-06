import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import { AppLayout } from './components/layout/AppLayout';
import { LandingPage } from './features/landing/LandingPage';
import { LoginPage } from './features/auth/LoginPage';
import { RegisterPage } from './features/auth/RegisterPage';
import { ForgotPasswordPage } from './features/auth/ForgotPasswordPage';
import { VerifyOTPPage } from './features/auth/VerifyOTPPage';
import { OnboardingPage } from './features/onboarding/OnboardingPage';
import { SpecialtiesPage } from './features/catalog/SpecialtiesPage';
import { SpecialtyDetail } from './features/catalog/SpecialtyDetail';
import { PathDetail } from './features/catalog/PathDetail';
import { PathsPage } from './features/catalog/PathsPage';
import { QuickPickPage } from './features/quickpick/QuickPickPage';
import { StudyPlanPage } from './features/studyplan/StudyPlanPage';
import { AssessmentPage } from './features/assessment/AssessmentPage';
import { AssessmentSession } from './features/assessment/AssessmentSession';
import { SurveyLandingPage } from './features/survey/SurveyLandingPage';
import { SurveySessionPage } from './features/survey/SurveySessionPage';
import { SurveyResultsPage } from './features/survey/SurveyResultsPage';
import { DashboardPage } from './features/dashboard/DashboardPage';
import { ProfilePage } from './features/profile/ProfilePage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/verify-otp" element={<VerifyOTPPage />} />
        <Route path="/onboard" element={<OnboardingPage />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/explore" element={<SpecialtiesPage />} />
            <Route path="/explore/specialties/:id" element={<SpecialtyDetail />} />
            <Route path="/paths" element={<PathsPage />} />
            <Route path="/paths/:id" element={<PathDetail />} />
            <Route path="/quick-pick" element={<QuickPickPage />} />
            <Route path="/plan" element={<StudyPlanPage />} />
            <Route path="/assessment" element={<AssessmentPage />} />
            <Route path="/assessment/:id" element={<AssessmentSession />} />
            <Route path="/survey" element={<SurveyLandingPage />} />
            <Route path="/survey/:id" element={<SurveySessionPage />} />
            <Route path="/survey/:id/results" element={<SurveyResultsPage />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
