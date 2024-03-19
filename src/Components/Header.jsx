import { useState } from "react";

const Header = ({ onStartQuiz }) => {
  const [quizStarted, setQuizStarted] = useState(false);

  const handleStartQuiz = () => {
    setQuizStarted(true);
    onStartQuiz();
  };

  return (
    <header className="header">
      <img src="/quiz-logo.png" alt="" />
      <h1>REACT QUIZZ</h1>
      {!quizStarted && (
        <>
          <button className="start-button" onClick={handleStartQuiz}>
            Start Quiz
            <img src="/Luffys-flag-2-icon.png" alt="" />
          </button>
        </>
      )}
    </header>
  );
};

export default Header;
