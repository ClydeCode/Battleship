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

const Gameboard = () => {
  const array = [];
  const ships = [];

  for (let y = 0; y < 10; y += 1) {
    array[y] = [];
    for (let x = 0; x < 10; x += 1) {
      array[y][x] = 'o';
    }
  }

  const placeShip = (ship, y, x, onYAxis) => {
    if (x + ship.length <= 10 && y + ship.length <= 10) {
      ships.push(ship);
      for (let n = 0; n <= ship.length - 1; n += 1) {
        if (onYAxis) { array[y + n][x] = ship.char; } else { array[y][x + n] = ship.char; }
      }
    } else { throw RangeError('Coordinates are out of range!'); }
  };

  const receiveAttack = (y, x) => {
    const tempChar = array[y][x];
    array[y][x] = 'm';
    ships.forEach((ship) => {
      if (tempChar === ship.char) {
        ship.hit();
        array[y][x] = 'x';
      }
    });
  };

  const allShipsSunk = () => {
    const arr = ships.filter((ship) => !ship.isSunk());
    return !arr.length;
  };

  return {
    placeShip, receiveAttack, allShipsSunk, array,
  };
};

export { Ship, Gameboard };
