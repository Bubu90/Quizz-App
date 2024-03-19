import { useState, useEffect } from "react";
import Question from "../Question";
import Summary from "../Summary";
import Timer from "../Timer";

export default function Answer({ questions }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [incorrectAnswersCount, setIncorrectAnswersCount] = useState(0);
  const [skippedQuestionsCount, setSkippedQuestionsCount] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setIsAnswerCorrect(null);
    setCorrectAnswersCount(0);
    setIncorrectAnswersCount(0);
    setSkippedQuestionsCount(0);
    setQuizCompleted(false);
    setUserAnswers([]);
  };

  // Ordina le domande in base all'ID prima di eseguire il rendering
  // useEffect(() => {
  //   questions.sort((a, b) => a.id - b.id);
  // }, [questions]);

  const handleNextQuestion = () => {
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    setIsAnswerCorrect(null);
  };

  const handleAnswerClick = (answerIndex) => {
    const isCorrect = answerIndex === questions[currentQuestion].correctAnswer;
    setIsAnswerCorrect(isCorrect);
    if (isCorrect) {
      setCorrectAnswersCount((prevCount) => prevCount + 1);
    } else {
      setIncorrectAnswersCount((prevCount) => prevCount + 1);
    }
    // Memorizza la risposta dell'utente
    setUserAnswers((prevAnswers) => [
      ...prevAnswers,
      {
        questionId: questions[currentQuestion].id,
        question: questions[currentQuestion].text,
        answer: questions[currentQuestion].answers[answerIndex],
        result: isCorrect ? "correct" : "wrong",
      },
    ]);
    handleNextQuestion();
  };

  const handleSkipQuestion = () => {
    setSkippedQuestionsCount((prevCount) => prevCount + 1);

    setUserAnswers((prevAnswers) => [
      ...prevAnswers,
      {
        questionId: questions[currentQuestion].id,
        question: questions[currentQuestion].text,
        answer: "Skipped",
        result: "skipped",
      },
    ]);
    handleNextQuestion();
  };

  const handleTimeout = () => {
    setSkippedQuestionsCount((prevCount) => prevCount + 1);
    // Memorizza la risposta dell'utente come skipped in caso di timeout
    setUserAnswers((prevAnswers) => [
      ...prevAnswers,
      {
        questionId: questions[currentQuestion].id,
        question: questions[currentQuestion].text,
        answer: "Skipped (Timeout)",
        result: "skipped",
      },
    ]);
    handleNextQuestion();
  };

  useEffect(() => {
    if (currentQuestion >= questions.length) {
      setQuizCompleted(true);
    }
  }, [currentQuestion, questions.length]);

  if (quizCompleted) {
    return (
      <Summary
        correctAnswersCount={correctAnswersCount}
        incorrectAnswersCount={incorrectAnswersCount}
        skippedQuestionsCount={skippedQuestionsCount}
        totalQuestions={questions.length}
        answeredQuestions={userAnswers}
        onRestartQuiz={restartQuiz}
      />
    );
  }

  return (
    <div className="Answer">
      <Timer handleTimeout={handleTimeout} />

      {questions[currentQuestion] !== undefined && (
        <Question
          question={questions[currentQuestion]}
          handleAnswerClick={handleAnswerClick}
          handleSkipQuestion={handleSkipQuestion}
        />
      )}
    </div>
  );
}
