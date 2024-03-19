import { useState, useEffect } from "react";

export default function Timer({ handleTimeout }) {
  const [timer, setTimer] = useState(10);

  useEffect(() => {
    const timerId = setInterval(() => {
      if (timer > 0) {
        setTimer((prevTimer) => prevTimer - 0.1);
      } else {
        handleTimeout();
        clearInterval(timerId);
      }
    }, 100);

    return () => clearInterval(timerId);
  }, [timer, handleTimeout]);

  useEffect(() => {
    setTimer(10);
  }, [handleTimeout]);

  const progressValue = (timer / 10) * 100;
  return (
    <div id="question">
      <progress id="progress" value={progressValue} max="100"></progress>
    </div>
  );
}
