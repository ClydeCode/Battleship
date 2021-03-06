const Ship = (length, char) => {
  let hp = length;

  const hit = () => {
    hp -= 1;
  };

  const getHP = () => hp;

  const isSunk = () => (!hp);

  return {
    getHP, hit, isSunk, length, char,
  };
};

const Gameboard = (char) => {
  const array = [];
  const ships = [];

  for (let y = 0; y < 10; y += 1) {
    array[y] = [];
    for (let x = 0; x < 10; x += 1) {
      array[y][x] = 'o';
    }
  }

  const isAllowed = (ship, y, x, onYAxis) => {
    let allow = true;

    if (!onYAxis) {
      if (x !== 0) { if (array[y][x - 1] !== 'o' && array[y][x - 1] !== ship.char) allow = false; }

      if (x + ship.length < 10) { if (array[y][ship.length + x] !== 'o' && array[y][ship.length + x] !== ship.char) allow = false; }

      if (y !== 0) {
        for (let n = x; n < ship.length + x; n += 1) {
          if ((array[y - 1][n] !== 'o') && (array[y - 1][n] !== ship.char)) allow = false;
        }
      }

      if (y !== 0 && x !== 0) {
        if ((array[y - 1][x - 1] !== 'o') && (array[y - 1][x - 1] !== ship.char)) allow = false;
      }

      if (y < 9) {
        for (let n = x; n < ship.length + x; n += 1) {
          if ((array[y + 1][n] !== 'o') && (array[y + 1][n] !== ship.char)) allow = false;
        }
      }

      if (y !== 0 && x + ship.length < 10) {
        if ((array[y - 1][x + ship.length] !== 'o') && (array[y - 1][x + ship.length] !== ship.char)) allow = false;
      }

      if (y < 9 && x !== 0) {
        if ((array[y + 1][x - 1] !== 'o') && (array[y + 1][x - 1] !== ship.char)) allow = false;
      }

      if (y < 9 && x + ship.length < 10) {
        if ((array[y + 1][x + ship.length] !== 'o') && (array[y + 1][x + ship.length] !== ship.char)) allow = false;
      }
    } else {
      if (y !== 0) { if ((array[y - 1][x] !== 'o') && (array[y - 1][x] !== ship.char)) allow = false; }

      if (y + ship.length < 10) { if ((array[y + ship.length][x] !== 'o') && (array[y + ship.length][x] !== ship.char)) allow = false; }

      if (x !== 0) {
        for (let n = y; n < ship.length + y; n += 1) {
          if ((array[n][x - 1] !== 'o') && (array[n][x - 1] !== ship.char)) allow = false;
        }
      }

      if (y !== 0 && x !== 0) {
        if ((array[y - 1][x - 1] !== 'o') && (array[y - 1][x - 1] !== ship.char)) allow = false;
      }

      if (x < 9) {
        for (let n = y; n < ship.length + y; n += 1) {
          if ((array[n][x + 1] !== 'o') && (array[n][x + 1] !== ship.char)) allow = false;
        }
      }

      if (x !== 0 && y + ship.length < 10) {
        if ((array[y + ship.length][x - 1] !== 'o') && (array[y + ship.length][x - 1] !== ship.char)) allow = false;
      }

      if (y !== 0 && y < 9) {
        if ((array[y - 1][x + 1] !== 'o') && (array[y - 1][x + 1] !== ship.char)) allow = false;
      }

      if (x < 9 && y + ship.length < 10) {
        if ((array[y + ship.length][x + 1] !== 'o') && (array[y + ship.length][x + 1] !== ship.char)) allow = false;
      }
    }
    return allow;
  };

  const placeShip = (ship, y, x, onYAxis) => {
    if (onYAxis && y + ship.length <= 10 && x >= 0 && y >= 0) {
      if (isAllowed(ship, y, x, onYAxis)) {
        ships.push(ship);
        for (let n = 0; n <= ship.length - 1; n += 1) array[y + n][x] = ship.char;
      } else { return false; }
    } else if ((!onYAxis) && x + ship.length <= 10 && x >= 0 && y >= 0) {
      if (isAllowed(ship, y, x, onYAxis)) {
        ships.push(ship);
        for (let n = 0; n <= ship.length - 1; n += 1) array[y][x + n] = ship.char;
      } else { return false; }
    } else return false;

    return true;
  };

  const receiveAttack = (y, x) => {
    let hitted = false;
    const tempChar = array[y][x];
    if (array[y][x] !== 'm' && array[y][x] !== 'x') {
      array[y][x] = 'm';
      ships.forEach((ship) => {
        if (tempChar === ship.char) {
          ship.hit();
          array[y][x] = 'x';
          hitted = true;
        }
      });
    } else return false;
    return hitted ? 'hit' : 'miss';
  };

  const allShipsSunk = () => {
    const arr = ships.filter((ship) => !ship.isSunk());
    return !arr.length;
  };

  return {
    placeShip, receiveAttack, allShipsSunk, array, char, ships,
  };
};

const Player = (eGameboard, isBot = false) => {
  const move = (y, x) => eGameboard.receiveAttack(y, x);

  const generateNumber = () => Math.floor(Math.random() * 10);

  const autoMove = () => {
    if (isBot) {
      while (true) {
        if (move(generateNumber(), generateNumber()) === 'miss') return;
      }
    }
  };

  return { move, autoMove };
};

export { Ship, Gameboard, Player };
