import { httpRequest } from "./http";

// Fetch logged-in user profile
export function fetchMe() {
  return httpRequest("/auth/me");
}

// Fetch student's quiz results
export function fetchMyResults() {
  return httpRequest("/results/my");
}

// Fetch assignments assigned to the student
export function fetchMyAssignments() {
  return httpRequest("/assignments");
}

// Fetch all quizzes (for overview + courses)
export function fetchAllQuizzes() {
  return httpRequest("/quizzes");
}

// Fetch leaderboard (new endpoint added)
export function fetchLeaderboard() {
  return httpRequest("/results/leaderboard");
}
