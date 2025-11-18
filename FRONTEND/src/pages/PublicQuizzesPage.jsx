// src/pages/PublicQuizzesPage.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { apiListPublicQuizzes } from '../api/public';
import '../styles/QuizListPage.css';

const SUBJECTS = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History', 'Geography', 'Computer Science'];

const PublicQuizzesPage = () => {
  const [subject, setSubject] = useState('');
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        setLoading(true);
        const data = await apiListPublicQuizzes(subject || undefined);
        if (active) setQuizzes(data.quizzes || []);
      } catch (e) {
        setError(e.message || 'Failed to load quizzes');
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => { active = false; };
  }, [subject]);

  const subjectGroups = useMemo(() => {
    const map = new Map();
    for (const q of quizzes) {
      const s = q.subject || 'General';
      if (!map.has(s)) map.set(s, []);
      map.get(s).push(q);
    }
    return map;
  }, [quizzes]);

  return (
    <div className="quiz-list-page">
      <h2>Browse Quizzes</h2>
      <div style={{ marginBottom: 16 }}>
        <label style={{ marginRight: 8 }}>Filter by subject:</label>
        <select value={subject} onChange={(e) => setSubject(e.target.value)}>
          <option value="">All</option>
          {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      {loading ? <p>Loading...</p> : null}
      {error ? <p style={{ color: 'red' }}>{error}</p> : null}
      {[...subjectGroups.keys()].map(s => (
        <div key={s} style={{ marginBottom: 24 }}>
          <h3 style={{ margin: '12px 0' }}>{s}</h3>
          <table>
            <thead>
              <tr>
                <th>Quiz Title</th>
                <th>Description</th>
                <th>Published</th>
              </tr>
            </thead>
            <tbody>
              {subjectGroups.get(s).map(q => (
                <tr key={q._id}>
                  <td>{q.title}</td>
                  <td>{q.description || '-'}</td>
                  <td>{q.createdAt ? new Date(q.createdAt).toLocaleDateString() : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default PublicQuizzesPage;
