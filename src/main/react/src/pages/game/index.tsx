import { useEffect, useRef } from "react";
import useWindowSize from "../../hooks/useWindowSize";
import { useScore } from "../../hooks/useScore.ts";
import { useRecognition } from "../../hooks/RecognitionContext.tsx";
import { useNavigate } from "react-router-dom";

type Message = {
  type: string;
  data: string;
};

export default function GamePage() {
  const [width, _] = useWindowSize();
  const { start, end } = useRecognition();
  const ref = useRef<HTMLIFrameElement>(null);
  const { sendScore } = useScore();
  const navigate = useNavigate();

  useEffect(
    function () {
      ref.current?.focus();
    },
    [ref],
  );

  useEffect(function () {
    end();
  }, []);

  useEffect(function () {
    const handler = function (e: MessageEvent<Message>) {
      console.log("handler", e);
      if (e.data.type === "GAME_OVER") {
        sendScore({
          score: Number(e.data.data),
        });
      } else if (e.data.type === "NAVIGATE") {
        start();
        if (e.data.data === "home") {
          navigate("/");
        } else {
          navigate(`/${e.data.data}`);
        }
      }
    };

    window.addEventListener("message", handler);

    return function () {
      window.removeEventListener("message", handler);
    };
  }, []);

  return (
    <>
      <iframe
        autoFocus
        ref={ref}
        width={width / 3}
        height={width / 3}
        src="/src/game/index.html"
      ></iframe>
    </>
  );
}
