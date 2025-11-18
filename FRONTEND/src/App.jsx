// src/App.jsx
import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Spinner from "./components/Spinner";

/* ---------------- STUDENT PAGES ---------------- */
const StudentDashboard = lazy(() => import("./pages/StudentDashboard"));
const QuizListPage = lazy(() => import("./pages/QuizListPage"));
const TakeQuizPage = lazy(() => import("./pages/TakeQuizPage"));
const QuizResultPage = lazy(() => import("./pages/QuizResultPage"));
const StudentSettingsPage = lazy(() => import("./pages/StudentSettingsPage"));
const StudentResultsPage = lazy(() => import("./pages/StudentResultsPage"));
const EditProfilePage = lazy(() => import("./pages/EditProfilePage"));
const StudentChatPage = lazy(() => import("./pages/StudentChatPage"));

/* ---------------- TEACHER PAGES ---------------- */
const TeacherDashboard = lazy(() => import("./pages/TeacherDashboard"));
const TeacherChatInterface = lazy(() => import("./pages/TeacherChatInterface"));
const StudentManagementPage = lazy(() => import("./pages/StudentManagementPage"));
const AssignQuizPage = lazy(() => import("./pages/AssignQuizPage"));
const CreateQuizPage = lazy(() => import("./pages/CreateQuizPage"));
const ViewStudentResultsPage = lazy(() => import("./pages/ViewStudentResultsPage"));
const DetailedResultViewPage = lazy(() => import("./pages/DetailedResultViewPage"));
const TeacherQuizList = lazy(() => import("./pages/TeacherQuizList"));
const QuestionBankPage = lazy(() => import("./pages/QuestionBankPage"));

/* ---------------- ADMIN ---------------- */
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));

/* ---------------- PUBLIC ---------------- */
const PublicQuizzesPage = lazy(() => import("./pages/PublicQuizzesPage"));

export default function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>

        {/* -------- PUBLIC ROUTES -------- */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/quizzes/public" element={<PublicQuizzesPage />} />

        {/* -------- STUDENT ROUTES -------- */}
        <Route element={<ProtectedRoute allowRoles={["student"]} />}>
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/quizzes" element={<QuizListPage />} />
          <Route path="/student/quiz/:id" element={<TakeQuizPage />} />
          <Route path="/student/quiz/result" element={<QuizResultPage />} />
          <Route path="/student/settings" element={<StudentSettingsPage />} />
          <Route path="/student/results" element={<StudentResultsPage />} />
          <Route path="/student/profile" element={<EditProfilePage />} />
          <Route path="/student/chat" element={<StudentChatPage />} />
        </Route>

        {/* -------- TEACHER ROUTES -------- */}
        <Route element={<ProtectedRoute allowRoles={["teacher"]} />}>
          <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
          <Route path="/teacher/chat" element={<TeacherChatInterface />} />
          <Route path="/teacher/students" element={<StudentManagementPage />} />
          <Route path="/teacher/assign" element={<AssignQuizPage />} />
          <Route path="/teacher/create-quiz" element={<CreateQuizPage />} />
          <Route path="/teacher/results" element={<ViewStudentResultsPage />} />
          <Route path="/teacher/results/:id" element={<DetailedResultViewPage />} />
          <Route path="/teacher/quizzes" element={<TeacherQuizList />} />
          <Route path="/teacher/question-bank" element={<QuestionBankPage />} />
        </Route>

        {/* -------- ADMIN ROUTES -------- */}
        <Route element={<ProtectedRoute allowRoles={["admin"]} />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>

      </Routes>
    </Suspense>
  );
}
