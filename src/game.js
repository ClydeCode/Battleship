import { endGame, refreshGameboard } from './DOM';

const refreshGameboards = (gameboards) => {
  refreshGameboard(gameboards[0]);
  refreshGameboard(gameboards[1]);
};

const attackSquare = (coords, player) => {
  const x = coords.split('')[10];
  const y = coords.split('')[5];

  return player.move(y, x);
};

const isGameOver = (gameboards) => {
  if (gameboards[0].allShipsSunk()) {
    endGame('You won!');
    return true;
  }
  if (gameboards[1].allShipsSunk()) {
    endGame('You lose!');
    return true;
  }
  return false;
};

const randNumbers = (number) => Math.floor(Math.random() * number);

const placeRandomlyShips = (ships, gameboard) => {
  ships.forEach((ship) => {
    while (true) {
      if (gameboard.placeShip(ship, randNumbers(10), randNumbers(10), randNumbers(2))) return;
    }
  });
};

export {
  attackSquare, isGameOver, placeRandomlyShips, refreshGameboards,
};
