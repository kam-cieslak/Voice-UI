import { useEffect, useRef, useState } from "react";
import useWindowSize from "../../hooks/useWindowSize";

type Message = {
  type: string;
  data: string;
};

export default function GamePage() {
  const [score, setScore] = useState<number>(0);
  const [didLose, setDidLose] = useState<boolean>(false);
  const [width, _] = useWindowSize();
  const ref = useRef<HTMLIFrameElement>(null);

  useEffect(function () {
    ref.current?.focus(); 
  }, [ref]);

  if (didLose) {
    if (ref.current) {
      ref.current.blur();
    }
  } else {
    if (ref.current) {
      ref.current.focus();
    }
  }

  useEffect(function () {
    const handler = function (message: MessageEvent<Message>) {
      console.log(message);
      if (message.data.type === "SCORE_POINT") {
        setScore(Number(message.data.data));
      } else if (message.data.type === "GAME_OVER") {
        setScore(Number(message.data.data));
        setDidLose(true);
      } else if (message.data.type === "PLAY_AGAIN") {
        playAgain();
      }
    };

    window.addEventListener("message", handler);

    return function () {
      window.removeEventListener("message", handler);
    };
  }, []);

  function playAgain() {
    setDidLose(false);
    setScore(0);
  }

  return (
    <>
      {!didLose ? (
        <span>Score: {score}</span>
      ) : (
        <>
          <span>You lost! Score: {score}</span>
          <button onClick={playAgain}>Play again</button>
        </>
      )}
      <iframe
        ref={ref}
        width={width / 3}
        height={width / 3}
        src="/src/game/index.html"
        style={{
          overflow: didLose ? "hidden" : "auto",
          pointerEvents: didLose ? "none" : "auto",
          
        }}
      ></iframe>
    </>
  );
}
