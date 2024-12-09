import { createContext, PropsWithChildren, useContext, useState } from "react";
import { NavigateFunction } from "react-router-dom";

interface RecognitionContext {
  start: () => void;
  end: () => void;
  setup: (navigate: NavigateFunction, logout: () => void) => void;
}

type RecognitionContextProps = PropsWithChildren;

const Context = createContext<RecognitionContext>({
  start: () => {},
  end: () => {},
  setup: () => {},
});

export const RecognitionContext = ({ children }: RecognitionContextProps) => {
  const [recognition, setRecognition] = useState();
  const options = ["leaderboard", "game", "home", "login", "logout", "register"];

  function setup(navigate: NavigateFunction, logout: () => void) {
    const grammar = `#JSGF V1.0; grammar options; public <option> = ${options.join(
      " | ",
    )}`;
    //@ts-ignore
    const recognition = new webkitSpeechRecognition();
    //@ts-ignore
    const speechRecognitionList = new webkitSpeechGrammarList();
    speechRecognitionList.addFromString(grammar, 1);
    recognition.grammars = speechRecognitionList;
    recognition.continuous = true;
    recognition.lang = "en-US";
    recognition.maxAlternatives = 1;
    //@ts-ignore
    recognition.onresult = (e) => {
      console.log("react", e);
      const result = (e.results[e.results.length - 1][0].transcript as string)
        //@ts-ignore
        .replaceAll(" ", "")
        .trim();
      if (options.includes(result)) {
        if (result === "home") {
          navigate("/");
        } else if (result === "logout") {
          console.log("asdoahdk")
          logout();
        } else {
          navigate(`/${result}`);
        }
      }
    };
    setRecognition(recognition);
    recognition.start();
  }

  function start() {
    if (recognition) {
      try {
        //@ts-ignore
        recognition.start();
      } catch {}
      console.log("start");
    }
  }

  function end() {
    if (recognition) {
      try {
        //@ts-ignore
        recognition.stop();
      } catch {}
      console.log("end");
    }
  }

  return (
    <Context.Provider value={{ start, end, setup }}>
      {children}
    </Context.Provider>
  );
};

export const useRecognition = () => {
  const context = useContext(Context);

  return { ...context };
};
