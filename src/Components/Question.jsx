import { useEffect, useState } from "react";

export default function Question({
  question,
  handleAnswerClick,
  handleSkipQuestion,
  handleTimeout,
  progressValue,
}) {
  const [clickedIndex, setClickedIndex] = useState(null);
  const [userAnswered, setUserAnswered] = useState(false);

  useEffect(() => {
    setClickedIndex(null);
    setUserAnswered(false);
  }, [question]);

  const handleButtonClick = (index) => {
    if (!userAnswered) {
      setUserAnswered(true);
      setClickedIndex(index);
      setTimeout(() => {
        handleAnswerClick(index);
      }, 1500);
    }
  };

  return (
    <div id="question">
      <h2>{question.text}</h2>

      <div id="answers">
        {question.answers.map((answer, index) => (
          <div className="answer" key={index}>
            <button
              onClick={() => handleButtonClick(index)}
              className={`${
                clickedIndex !== null &&
                index === question.correctAnswer &&
                userAnswered
                  ? "correct"
                  : clickedIndex === index && !userAnswered
                  ? "selected"
                  : clickedIndex === index &&
                    userAnswered &&
                    question.correctAnswer !== index
                  ? "wrong"
                  : ""
              }`}
              disabled={userAnswered}
            >
              {answer}
            </button>
          </div>
        ))}
      </div>
      <div id="skip-action">
        <button onClick={handleSkipQuestion}>Skip Question</button>
      </div>
    </div>
  );
}
