import { httpRequest } from './http';

export async function apiListPublicQuizzes(subject) {
  const qs = subject ? `?subject=${encodeURIComponent(subject)}` : '';
  return httpRequest(`/public/quizzes${qs}`, { method: 'GET' });
}


