import { useState } from "react";
import Header from "./Components/Header";
import Quiz from "./Components/Quiz";
import questions from "./questions";

function App() {
  const [quizStarted, setQuizStarted] = useState(false);

  const handleStartQuiz = () => {
    setQuizStarted(true);
    // Altre azioni da eseguire quando il quiz viene avviato
  };

  return (
    <div>
      <Header onStartQuiz={handleStartQuiz} />

      {quizStarted ? <Quiz questions={questions} /> : null}
    </div>
  );
}

export default App;
