import React, { useState } from 'react';
import '../styles/CreateQuizPage.css';

const CreateQuizPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [questions, setQuestions] = useState([]);

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', ''], answer: '' }]);
  };

  const handleSave = () => {
    // Save quiz logic
  };

  return (
    <div className="create-quiz-page">
      <h2>Create Quiz</h2>
      <input
        type="text"
        placeholder="Quiz Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Duration (minutes)"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        required
      />
      <button onClick={handleAddQuestion}>Add Question</button>
      {questions.map((q, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Question"
            value={q.question}
            onChange={(e) => {
              const newQuestions = [...questions];
              newQuestions[index].question = e.target.value;
              setQuestions(newQuestions);
            }}
          />
          <input
            type="text"
            placeholder="Option 1"
            value={q.options[0]}
            onChange={(e) => {
              const newQuestions = [...questions];
              newQuestions[index].options[0] = e.target.value;
              setQuestions(newQuestions);
            }}
          />
          <input
            type="text"
            placeholder="Option 2"
            value={q.options[1]}
            onChange={(e) => {
              const newQuestions = [...questions];
              newQuestions[index].options[1] = e.target.value;
              setQuestions(newQuestions);
            }}
          />
          <input
            type="text"
            placeholder="Correct Answer"
            value={q.answer}
            onChange={(e) => {
              const newQuestions = [...questions];
              newQuestions[index].answer = e.target.value;
              setQuestions(newQuestions);
            }}
          />
        </div>
      ))}
      <button onClick={handleSave}>Save Quiz</button>
    </div>
  );
};

export default CreateQuizPage;
