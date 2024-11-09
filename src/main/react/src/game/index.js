class Snake {
  constructor() {
    this.moveDir = {
      x: 0,
      y: 0,
    };
    this.segments = [
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
  }

  move() {
    for (let i = this.segments.length - 1; i >= 1; i--) {
      this.segments[i].x = this.segments[i - 1].x;
      this.segments[i].y = this.segments[i - 1].y;
    }
    this.segments[0].x += this.moveDir.x;
    this.segments[0].y += this.moveDir.y;
  }

  didCollide(applePos) {
    if (
      this.segments[0].x === applePos.x &&
      this.segments[0].y === applePos.y
    ) {
      this.segments = [
        {
          x: this.segments[0].x,
          y: this.segments[0].y,
        },
        ...this.segments,
      ];
      return true;
    }
    return false;
  }

  didLose() {
    if (
      this.segments[0].x > 37 ||
      this.segments[0].x < 0 ||
      this.segments[0].y > 37 ||
      this.segments[0].y < 0
    ) {
      this.moveDir = {
        x: 0,
        y: 0,
      };
      this.segments = [
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
      return true;
    }
    for (let i = 1; i < this.segments.length - 1; i++) {
      if (
        this.segments[0].x === this.segments[i].x &&
        this.segments[0].y === this.segments[i].y
      ) {
        this.moveDir = {
          x: 0,
          y: 0,
        };
        this.segments = [
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
        return true;
      }
    }
    return false;
  }
}

function placeApple() {
  applePos.x = Math.round(Math.random() * 37);
  applePos.y = Math.round(Math.random() * 37);
}

let applePos = {
  x: Math.round(Math.random() * 37),
  y: Math.round(Math.random() * 37),
};
const snake = new Snake();
const gameBoard = document.getElementById("game-board");
let score = 0;
let gameRunning = false;

function timeout(milis) {
  return new Promise(function (resolve) {
    setTimeout(resolve, milis);
  });
}

function render() {
  gameBoard.innerHTML = "";
  const apple = document.createElement("div");
  apple.setAttribute("class", "apple");
  apple.style.gridRow = applePos.x;
  apple.style.gridColumn = applePos.y;
  gameBoard.append(apple);
  snake.segments.forEach(function (e, i) {
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
}

function init() {
  window.addEventListener("keydown", function (e) {
    gameRunning = true;
    switch (e.key) {
      case "ArrowUp":
        if (snake.moveDir.x !== 1) {
          snake.moveDir = {
            x: -1,
            y: 0,
          };
        }
        break;
      case "ArrowDown":
        if (snake.moveDir.x !== -1) {
          snake.moveDir = {
            x: 1,
            y: 0,
          };
        }
        break;
      case "ArrowLeft":
        if (snake.moveDir.y !== 1) {
          snake.moveDir = {
            x: 0,
            y: -1,
          };
        }
        break;
      case "ArrowRight":
        if (snake.moveDir.y !== -1) {
          snake.moveDir = {
            x: 0,
            y: 1,
          };
        }
        break;
    }
    console.log(gameRunning);
  });
}

async function gameLoop() {
  render();
  while (true) {
    render();
    snake.move();
    if (gameRunning) {
      if (snake.didLose()) {
        window.parent.postMessage({
          type: "GAME_OVER",
          data: String(score),
        });
        gameRunning = false;
      }
      if (snake.didCollide(applePos)) {
        score += 100;
        window.parent.postMessage({
          type: "SCORE_POINT",
          data: String(score),
        });
        placeApple();
      }
    }
    await timeout(150);
  }
}
init();
gameLoop();
