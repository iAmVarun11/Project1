// src/pages/TakeQuizPage.jsx
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import '../styles/TakeQuizPage.css';
import { useNavigate, useParams } from 'react-router-dom';
import { apiGetQuiz } from '../api/quizzes';
import { apiSubmitResult } from '../api/results';

const TakeQuizPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [startedAt] = useState(new Date().toISOString());
  const [current, setCurrent] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        setLoading(true);
        const data = await apiGetQuiz(id);
        if (active) setQuiz(data.quiz);
      } catch (e) {
        setError(e.message || 'Failed to load quiz');
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => { active = false; };
  }, [id]);

  const totalPoints = useMemo(() => {
    if (!quiz) return 0;
    return (quiz.questions || []).reduce((sum, q) => sum + (q.points || 1), 0);
  }, [quiz]);

  const questions = quiz?.questions || [];
  const total = questions.length;
  const currentQuestion = total > 0 ? questions[current] : null;

  const selectAnswer = useCallback((questionId, optionIndex) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  }, []);

  const goNext = useCallback(() => setCurrent((c) => Math.min(c + 1, total - 1)), [total]);
  const goPrev = useCallback(() => setCurrent((c) => Math.max(c - 1, 0)), []);

  async function handleSubmit() {
    try {
      if (submitting) return;
      setSubmitting(true);
      if (!quiz) return;
      const payloadAnswers = (quiz.questions || []).map(q => ({
        questionId: q._id,
        selectedOptionIndex: typeof answers[q._id] === 'number' ? answers[q._id] : -1
      }));
      const { result } = await apiSubmitResult({ quizId: quiz._id, answers: payloadAnswers, startedAt });
      navigate('/quiz/result', { state: { result, quiz, totalPoints } });
    } catch (e) {
      setError(e.message || 'Failed to submit quiz');
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <p>Loading quiz...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!quiz) return <p>Quiz not found.</p>;

  return (
    <div className="take-quiz-page">
      <h2>{quiz.title}</h2>
      <p>{quiz.description}</p>
      <div style={{ marginBottom: 8 }}>Progress: {total > 0 ? `${current + 1}/${total}` : '0/0'}</div>
      {currentQuestion ? (
        <div className="question-block">
          <h4>{current + 1}. {currentQuestion.text}</h4>
          <ul className="options">
            {currentQuestion.options.map((opt, oi) => (
              <li key={oi}>
                <label>
                  <input
                    type="radio"
                    name={`q-${currentQuestion._id}`}
                    checked={answers[currentQuestion._id] === oi}
                    onChange={() => selectAnswer(currentQuestion._id, oi)}
                  />
                  {' '}{opt.text}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No questions in this quiz.</p>
      )}
      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        <button disabled={current <= 0} onClick={goPrev}>Previous</button>
        <button disabled={current >= total - 1} onClick={goNext}>Next</button>
        <button onClick={handleSubmit} disabled={submitting}>{submitting ? 'Submitting...' : 'Submit'}</button>
      </div>
    </div>
  );
};

export default TakeQuizPage;
