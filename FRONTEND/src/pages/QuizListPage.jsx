import React, { useEffect, useMemo, useState } from 'react';
import '../styles/QuizListPage.css';
import { apiListQuizzes } from '../api/quizzes';
import { Link } from 'react-router-dom';
import SkeletonTable from '../components/SkeletonTable';

const QuizListPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const data = await apiListQuizzes();
        if (active) setQuizzes(data.quizzes || []);
      } catch (e) {
        setError(e.message || 'Failed to load quizzes');
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => { active = false; };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return quizzes;
    return quizzes.filter(it => (it.title || '').toLowerCase().includes(q) || (it.description || '').toLowerCase().includes(q));
  }, [quizzes, query]);

  return (
    <div className="quiz-list-page">
      <h2>Quiz List</h2>
      <div style={{ marginBottom: 12 }}>
        <input
          type="text"
          placeholder="Search quizzes"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: 8, width: '100%', maxWidth: 360 }}
        />
      </div>
      {loading ? <SkeletonTable rows={5} cols={4} /> : null}
      {error ? <p style={{ color: 'red' }}>{error}</p> : null}
      <table>
        <thead>
          <tr>
            <th>Quiz Title</th>
            <th>Created By</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(q => (
            <tr key={q._id}>
              <td>{q.title}</td>
              <td>{q.createdBy?.name || '-'}</td>
              <td>{new Date(q.createdAt).toLocaleString()}</td>
              <td>
                <Link to={`/quiz/${q._id}`}>Take</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuizListPage;
