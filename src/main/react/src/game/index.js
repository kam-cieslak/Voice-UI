const gameBoard = document.getElementById("game-board");
let score = 0;
let queue = [];
let globalRecognition;
let isRunning = true;
let shouldCheckColissions = false;
const counter = document.getElementById("counter");
const playAgainButton = document.getElementById("play-again");
const gameOverScreen = document.getElementById("game-over-screen");
const gameOverCounter = document.getElementById("game-over-counter");
const pageOptions = ["leaderboard", "home"];

let snakeSegments = [
  {
    x: 18,
    y: 19,
  },
  {
    x: 18,
    y: 18,
  },
  {
    x: 18,
    y: 17,
  },
];

let directions = {
  x: 0,
  y: 0,
};

let applePosition = {
  x: 0,
  y: 0,
};

function timeout(milis) {
  return new Promise(function (resolve) {
    setTimeout(resolve, milis);
  });
}

function moveSnake() {
  for (let i = snakeSegments.length - 1; i >= 1; i--) {
    snakeSegments[i].x = snakeSegments[i - 1].x;
    snakeSegments[i].y = snakeSegments[i - 1].y;
  }
  snakeSegments[0].x += directions.x;
  snakeSegments[0].y += directions.y;
}

function placeApple() {
  applePosition.x = Math.round(Math.random() * 37);
  applePosition.y = Math.round(Math.random() * 37);
}

function checkColissions() {
  if (
    snakeSegments[0].x > 37 ||
    snakeSegments[0].x < 1 ||
    snakeSegments[0].y > 37 ||
    snakeSegments[0].y < 1
  ) {
    return true;
  }
  for (let i = 1; i < snakeSegments.length - 1; i++) {
    if (
      snakeSegments[0].x === snakeSegments[i].x &&
      snakeSegments[0].y === snakeSegments[i].y
    ) {
      return true;
    }
  }
  return false;
}

function checkIfApple() {
  return (
    snakeSegments[0].x === applePosition.x &&
    snakeSegments[0].y === applePosition.y
  );
}

function scorePoints() {
  snakeSegments = [
    {
      x: snakeSegments[0].x,
      y: snakeSegments[0].y,
    },
    ...snakeSegments,
  ];
  score += 100;
}

function reset() {
  snakeSegments = [
    {
      x: 18,
      y: 19,
    },
    {
      x: 18,
      y: 18,
    },
    {
      x: 18,
      y: 17,
    },
  ];
  directions = {
    x: 0,
    y: 0,
  };
  score = 0;
  placeApple();
  isRunning = true;
  shouldCheckColissions = false;
  gameOverScreen.style.visibility = "hidden";
  gameOverCounter.innerHTML = "";
}

function determineCommand(command) {
  console.log("wchodze tu", command)
  if (command === "playagain") {
    reset();
  } else {
    if (pageOptions.includes(command)) {
      window.parent.postMessage({
        type: "NAVIGATE",
        data: command,
      });
    }
  }
}

function gameOver() {
  window.parent.postMessage({
    type: "GAME_OVER",
    data: String(score),
  });
  isRunning = false;
  shouldCheckColissions = false;
  gameOverCounter.innerHTML = `Your score: ${score}`;
  gameOverScreen.style.visibility = "visible";
}

function init() {
  const recognition = new webkitSpeechRecognition();
  const directions = ["up", "down", "left", "right"];
  const grammar = `#JSGF V1.0; grammar directions; public <direction> = ${directions.join(
    " | ",
  )}`;
  const speechRecognitionList = new webkitSpeechGrammarList();
  speechRecognitionList.addFromString(grammar, 1);
  recognition.grammars = speechRecognitionList;
  recognition.continuous = false;
  recognition.lang = "en-US";
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;
  recognition.onresult = function (e) {
    console.log("iframe", e);
    const result = e.results[e.results.length - 1][0].transcript.replaceAll(" ", "").trim();
    if (isRunning) {
      if (
        result.includes("left") ||
        result.includes("right") ||
        result.includes("up") ||
        result.includes("down")
      ) {
        queue.push(result);
      }
    } else {
      determineCommand(result);
    }
  };
  recognition.onend = function () {
    recognition.start();
  };
  window.addEventListener("keydown", function (e) {
    switch (e.key) {
      case "ArrowUp":
        determineDirections("up");
        break;
      case "ArrowDown":
        determineDirections("down");
        break;
      case "ArrowLeft":
        determineDirections("left");
        break;
      case "ArrowRight":
        determineDirections("right");
        break;
    }
  });
  recognition.start();
  globalRecognition = recognition;
  playAgainButton.addEventListener("click", () => {
    reset();
  });
  placeApple();
}

function render() {
  gameBoard.innerHTML = "";
  const apple = document.createElement("div");
  apple.setAttribute("class", "apple");
  apple.style.gridRow = applePosition.x;
  apple.style.gridColumn = applePosition.y;
  gameBoard.append(apple);
  snakeSegments.forEach(function (e, i) {
    const div = document.createElement("div");
    if (i === 0) {
      div.setAttribute("class", "snake-head");
    } else {
      div.setAttribute("class", "snake-segment");
    }
    div.style.gridRow = e.x;
    div.style.gridColumn = e.y;
    gameBoard.append(div);
  });
  counter.innerHTML = score;
}

function determineDirections(dir) {
  shouldCheckColissions = true;
  dir = dir.replaceAll(" ", "").toLowerCase();
  if (dir.includes("up")) {
    if (directions.x !== 1) {
      directions = {
        x: -1,
        y: 0,
      };
    }
  } else if (dir.includes("down")) {
    if (directions.x !== -1) {
      directions = {
        x: 1,
        y: 0,
      };
    }
  } else if (dir.includes("left")) {
    if (directions.y !== 1) {
      directions = {
        x: 0,
        y: -1,
      };
    }
  } else if (dir.includes("right")) {
    if (directions.y !== -1) {
      directions = {
        x: 0,
        y: 1,
      };
    }
  }
}

async function gameLoop() {
  render();
  while (true) {
    if (queue.length > 0) {
      determineDirections(queue[0]);
      queue.shift();
    }
    if (isRunning) {
      moveSnake();
      if (shouldCheckColissions && checkColissions()) {
        gameOver();
      } else if (checkIfApple()) {
        scorePoints();
        placeApple();
      }
      render();
    }
    await timeout(300);
  }
}

init();
gameLoop();
