class Game {
  constructor(initial, final, maze) {
    this.person = initial;
    this.goal = final;
    this.maze = maze;
    this.statistics = new Statistics();
    this.priceList = generatePriceList(this);
    this.trapList = generateTrapList(this);
    this.isEnd = false;
    this.isPaused = false;
  }

  eatPrice() {
    this.priceList = this.priceList.map((price) => {
      if (
        this.person.x == price.point.x &&
        this.person.y == price.point.y &&
        !price.isEaten
      ) {
        this.statistics.bonus += 1;
        return new Item(price.point, true);
      }
      return price;
    });
  }

  eatTrap() {
    this.trapList = this.trapList.map((trap) => {
      if (
        this.person.x == trap.point.x &&
        this.person.y == trap.point.y &&
        !trap.isEaten
      ) {
        this.statistics.traps += 1;
        return new Item(trap.point, true);
      }
      return trap;
    });
  }

  moveUp() {
    let currentCell = this.maze[this.person.x][this.person.y];
    if (!currentCell.topWall) {
      this.person.x -= 1;
    }
  }

  moveRight() {
    let currentCell = this.maze[this.person.x][this.person.y];
    if (!currentCell.rightWall) {
      this.person.y += 1;
    }
  }

  moveDown() {
    let currentCell = this.maze[this.person.x][this.person.y];
    if (!currentCell.bottomWall) {
      this.person.x += 1;
    }
  }

  moveLeft() {
    let currentCell = this.maze[this.person.x][this.person.y];
    if (!currentCell.leftWall) {
      this.person.y -= 1;
    }
  }

  verify() {
    if (this.statistics.traps >= 3) return -1;
    if (this.person.x == this.goal.x && this.person.y == this.goal.y) return 1;
    return 0;
  }
}

class Statistics {
  constructor() {
    this.timer = 0;
    this.distance = 0;
    this.traps = 0;
    this.bonus = 0;
  }

  score() {
    return (
      parseInt(1000 / (this.timer / 1000 + this.distance)) +
      this.bonus * 10 -
      this.traps * 10
    );
  }
}

class Cell {
  constructor(topWall, rightWall, bottomWall, leftWall) {
    this.topWall = topWall;
    this.rightWall = rightWall;
    this.bottomWall = bottomWall;
    this.leftWall = leftWall;
  }
}

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Item {
  constructor(point, isEaten = false) {
    this.point = point;
    this.isEaten = isEaten;
  }
}

function generateRandomPoint(game, exceptions) {
  let randomX = 0;
  let randomY = 0;
  do {
    randomX = parseInt(Math.random() * 10);
    randomY = parseInt(Math.random() * 10);
  } while (
    (randomX == game.person.x && randomX == game.person.Y) ||
    exceptions.findIndex(
      (exception) => exception.x == randomX && exception.y == randomY
    ) != -1
  );
  return new Item(new Point(randomX, randomY));
}

function generatePriceList(game) {
  let valueList = [];
  return Array.from(Array(5), (_) => {
    let value = generateRandomPoint(
      game,
      valueList.map((e) => e.point)
    );
    valueList.push(value);
    return value;
  });
}

function generateTrapList(game) {
  let valueList = [];
  return Array.from(Array(5), (_) => {
    let value = generateRandomPoint(
      game,
      [...valueList, ...game.priceList].map((e) => e.point)
    );
    console.log(valueList);
    valueList.push(value);
    return value;
  });
}
