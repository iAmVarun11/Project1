// src/api/results.js
import { httpRequest } from './http';

export async function apiSubmitResult({ quizId, answers, startedAt }) {
  return httpRequest('/results/submit', {
    method: 'POST',
    body: JSON.stringify({ quizId, answers, startedAt })
  });
}

export async function apiMyResults() {
  return httpRequest('/results/my', { method: 'GET' });
}

export async function apiResultsForQuiz(quizId) {
  return httpRequest(`/results/quiz/${encodeURIComponent(quizId)}`, { method: 'GET' });
}
