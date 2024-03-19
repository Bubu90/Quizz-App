import questions from "../questions";
import Answer from "./Answer/Answer";
import backgroundMusic from "../assets/yt5s.io - One Piece OST Overtaken (128 kbps).mp3";

function Quiz() {
  return (
    <>
      <div id="quiz" className="quiz">
        <audio
          style={{ display: "none" }}
          src={backgroundMusic}
          controls
          autoPlay
          loop
        />
        <Answer questions={questions} />
      </div>
    </>
  );
}

export default Quiz;
