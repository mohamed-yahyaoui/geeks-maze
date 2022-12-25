let counter;

function generateGame() {
  return new Game(new Point(5, 0), new Point(6, 9), [
    [
      new Cell(true, true, false, true),
      new Cell(true, false, false, true),
      new Cell(true, false, false, false),
      new Cell(true, false, true, false),
      new Cell(true, false, false, false),
      new Cell(true, false, false, false),
      new Cell(true, true, false, false),
      new Cell(true, false, false, true),
      new Cell(true, false, false, false),
      new Cell(true, true, true, false),
    ],
    [
      new Cell(false, false, true, true),
      new Cell(false, true, true, false),
      new Cell(false, false, true, true),
      new Cell(true, true, true, false),
      new Cell(false, true, false, true),
      new Cell(false, true, false, true),
      new Cell(false, true, false, true),
      new Cell(false, true, false, true),
      new Cell(false, false, true, true),
      new Cell(true, true, false, false),
    ],
    [
      new Cell(true, false, false, true),
      new Cell(true, false, true, false),
      new Cell(true, false, true, false),
      new Cell(true, true, false, false),
      new Cell(false, true, true, true),
      new Cell(false, true, false, true),
      new Cell(false, true, false, true),
      new Cell(false, false, false, true),
      new Cell(true, true, true, false),
      new Cell(false, true, false, true),
    ],
    [
      new Cell(false, false, true, true),
      new Cell(true, true, false, false),
      new Cell(true, false, true, true),
      new Cell(false, true, true, false),
      new Cell(true, false, false, true),
      new Cell(false, true, true, false),
      new Cell(false, false, true, true),
      new Cell(false, true, true, false),
      new Cell(true, false, false, true),
      new Cell(false, true, true, false),
    ],
    [
      new Cell(true, false, false, true),
      new Cell(false, false, true, false),
      new Cell(true, false, true, false),
      new Cell(true, false, false, false),
      new Cell(false, true, true, false),
      new Cell(true, false, false, true),
      new Cell(true, false, true, false),
      new Cell(true, false, true, false),
      new Cell(false, false, true, false),
      new Cell(true, true, false, false),
    ],
    [
      new Cell(false, true, true, false),
      new Cell(true, false, true, true),
      new Cell(true, true, false, false),
      new Cell(false, false, true, true),
      new Cell(true, true, false, false),
      new Cell(false, false, true, true),
      new Cell(true, false, true, false),
      new Cell(true, false, true, false),
      new Cell(true, true, false, false),
      new Cell(false, true, false, true),
    ],
    [
      new Cell(true, false, false, true),
      new Cell(true, false, true, false),
      new Cell(false, true, true, false),
      new Cell(true, false, false, true),
      new Cell(false, true, false, false),
      new Cell(true, true, false, true),
      new Cell(true, false, false, true),
      new Cell(true, true, false, false),
      new Cell(false, true, false, true),
      new Cell(false, false, true, true),
    ],
    [
      new Cell(false, true, false, true),
      new Cell(true, false, true, true),
      new Cell(true, true, false, false),
      new Cell(false, true, false, true),
      new Cell(false, true, false, true),
      new Cell(false, true, false, true),
      new Cell(false, true, false, true),
      new Cell(false, true, true, true),
      new Cell(false, false, true, true),
      new Cell(true, true, false, false),
    ],
    [
      new Cell(false, true, false, true),
      new Cell(true, false, false, true),
      new Cell(false, true, false, false),
      new Cell(false, true, false, true),
      new Cell(false, true, false, true),
      new Cell(false, true, false, true),
      new Cell(false, true, false, true),
      new Cell(true, false, false, true),
      new Cell(true, false, true, false),
      new Cell(false, true, false, false),
    ],
    [
      new Cell(false, false, true, true),
      new Cell(false, true, true, false),
      new Cell(false, false, true, true),
      new Cell(false, true, true, false),
      new Cell(false, false, true, true),
      new Cell(false, true, true, false),
      new Cell(false, false, true, true),
      new Cell(false, true, true, false),
      new Cell(true, false, true, true),
      new Cell(false, true, true, false),
    ],
  ]);
}

function startGame() {
  document.querySelector(".timer-board").classList.remove("cached");
  document.querySelector(".welcome").classList.add("cached");
  gameSound.currentTime = 0;
  gameSound.play();
  counter = setInterval(() => {
    if (game.verify() != 0) {
      clearInterval(counter);
    } else if (!game.isPaused) {
      game.statistics.timer += 1000;
      let minutes = Math.floor(
        (game.statistics.timer % (1000 * 60 * 60)) / (1000 * 60)
      );
      let seconds = Math.floor((game.statistics.timer % (1000 * 60)) / 1000);

      document.querySelector(".timer").innerHTML = `${
        minutes < 10 ? "0" : ""
      }${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }
  }, 1000);
  draw(game);
}

function endGame(game) {
  if (game.verify() != 0 && !game.isEnd) {
    gameSound.pause();
    clearInterval(counter);
    if (game.verify() == 1) {
      document.querySelector(
        "#score"
      ).innerText = `Final score: ${game.statistics.score()}`;
      document.querySelector("#time").innerText = `Time:  ${
        game.statistics.timer / 1000
      } seconds`;
      document.querySelector(".win-result").classList.remove("cached");
      winSound.play();
    } else {
      document.querySelector(".lose-result").classList.remove("cached");
      looseSound.play();
    }
    document.querySelector(".timer-board").classList.add("cached");
    document.querySelector(".game-board").classList.add("cached");
    game.isEnd = true;
  }
}

function pauseGame(ev) {
  game.isPaused = !game.isPaused;
  ev.target.innerText = game.isPaused ? "⏺" : "⏸";
  game.isPaused ? gameSound.pause() : gameSound.play();
}

function replayGame() {
  endGame(game);
  game = generateGame();
  clearInterval(counter);
  startGame();
  document.querySelector(".game-board").classList.remove("cached");
  document.querySelector(".win-result").classList.add("cached");
  document.querySelector(".lose-result").classList.add("cached");
}

let game = generateGame();

document.body.addEventListener("keydown", function (ev) {
  if (game.verify() == 0 && !game.isPaused) {
    switch (ev.key) {
      case "ArrowUp":
        game.moveUp();
        break;
      case "ArrowDown":
        game.moveDown();
        break;
      case "ArrowRight":
        game.moveRight();
        break;
      case "ArrowLeft":
        game.moveLeft();
        break;
    }
    game.eatPrice();
    game.eatTrap();
    console.log(game.statistics);
    game.statistics.distance += 1;
    draw(game);
    endGame(game);
  }
});
