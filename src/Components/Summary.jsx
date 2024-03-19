export default function Summary({
  correctAnswersCount,
  incorrectAnswersCount,
  skippedQuestionsCount,
  totalQuestions,
  answeredQuestions,
  onRestartQuiz,
}) {
  const totalAnswersCount =
    correctAnswersCount + incorrectAnswersCount + skippedQuestionsCount;
  const correctPercentage = (
    (correctAnswersCount / totalAnswersCount) *
    100
  ).toFixed();
  const incorrectPercentage = (
    (incorrectAnswersCount / totalAnswersCount) *
    100
  ).toFixed();
  const skippedPercentage = (
    (skippedQuestionsCount / totalQuestions) *
    100
  ).toFixed();

  return (
    <div id="summary" className="Summary">
      <img src="../../public/quiz-complete.png" alt="" />
      <h2>Quiz completed!</h2>
      <div id="summary-stats">
        <p>
          <span className="number">{skippedPercentage}%</span>
          <span className="text">Skipped Questions</span>
        </p>
        <p>
          <span className="number">{incorrectPercentage}%</span>
          <span className="text">Wrong Questions</span>
        </p>
        <p>
          <span className="number">{correctPercentage}%</span>
          <span className="text">Correct Questions</span>
        </p>
      </div>
      <ol>
        {answeredQuestions &&
          answeredQuestions.length > 0 &&
          answeredQuestions.map((answer, index) => (
            <li key={index}>
              <h3>Q {index + 1}</h3>
              <div className="question">{answer.question}</div>
              <div className={`user-answer ${answer.result}`}>
                {answer.answer}
              </div>
            </li>
          ))}
      </ol>

      <button className="start-button " onClick={onRestartQuiz}>
        Restart Quiz
      </button>
    </div>
  );
}
