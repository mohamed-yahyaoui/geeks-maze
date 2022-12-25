function drawBoard(game) {
  document.body.removeChild(document.querySelector(".game-board"));
  let gameBoard = document.createElement("div");
  gameBoard.classList.add("game-board");
  document.body.appendChild(gameBoard);
}

function drawCell(cell, i, j) {
  let cellElement = document.createElement("div");
  cellElement.classList.add("game-cell");
  if (cell.topWall) cellElement.classList.add("top-border");
  if (cell.rightWall) cellElement.classList.add("right-border");
  if (cell.bottomWall) cellElement.classList.add("bottom-border");
  if (cell.leftWall) cellElement.classList.add("left-border");
  cellElement.id = `${i}${j}`;
  return cellElement;
}

function drawMaze(game) {
  game.maze.map((e, i) => {
    let row = document.createElement("div");
    row.classList.add("game-row");
    e.forEach((element, j) => {
      row.appendChild(drawCell(element, i, j));
    });
    document.querySelector(".game-board").appendChild(row);
  });
}

function drawPriceElements(game) {
  game.priceList.forEach((price) => {
    if (!price.isEaten) {
      let priceIcon = document.createElement("img");
      priceIcon.setAttribute("src", "./images/price.png");
      document
        .getElementById(`${price.point.x}${price.point.y}`)
        .appendChild(priceIcon);
    }
  });
}

function drawTrapElements(game) {
  game.trapList.forEach((trap) => {
    if (!trap.isEaten) {
      let trapIcon = document.createElement("img");
      trapIcon.setAttribute("src", "./images/trap.png");
      document
        .getElementById(`${trap.point.x}${trap.point.y}`)
        .appendChild(trapIcon);
    }
  });
}

function drawPerson(game) {
  let person = document.createElement("div");
  person.classList.add("person");
  document
    .getElementById(`${game.person.x}${game.person.y}`)
    .appendChild(person);
}

function draw(game) {
  drawBoard(game);
  drawMaze(game);
  drawPerson(game);
  drawPriceElements(game);
  drawTrapElements(game);
}
