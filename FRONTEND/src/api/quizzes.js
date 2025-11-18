import { httpRequest } from './http';

export async function apiListQuizzes() {
  return httpRequest('/quizzes', { method: 'GET' });
}

export async function apiGetQuiz(id) {
  return httpRequest(`/quizzes/${id}`, { method: 'GET' });
}


