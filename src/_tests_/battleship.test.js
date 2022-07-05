import { Gameboard, Ship } from '../battleship';

describe('Ship factory function', () => {
  test('hit function (1) single hit', () => {
    const ship = Ship(2);

    ship.hit();

    expect(ship.getHP()).toBe(1);
  });

  test('hit function (2) single hit', () => {
    const ship = Ship(5);

    ship.hit();

    expect(ship.getHP()).toBe(4);
  });

  test('hit function (3) multiple hits', () => {
    const ship = Ship(4);

    ship.hit();
    ship.hit();

    expect(ship.getHP()).toBe(2);
  });

  test('isSunk function (1)', () => {
    const ship = Ship(2);

    ship.hit();

    expect(ship.isSunk()).toBe(false);
  });

  test('isSunk function (2)', () => {
    const ship = Ship(2);

    ship.hit();
    ship.hit();

    expect(ship.isSunk()).toBe(true);
  });
});

describe('Gameboard factory function', () => {
  test('placeShip function (1) X axis', () => {
    const gameboard = Gameboard();
    const ship = Ship(2, 'z');

    gameboard.placeShip(ship, 0, 0, false);

    expect(gameboard.array[0]).toStrictEqual(['z', 'z', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o']);
  });

  test('placeShip function (2) Y axis', () => {
    const gameboard = Gameboard();
    const ship = Ship(2, 'z');

    gameboard.placeShip(ship, 0, 0, true);

    expect(gameboard.array[0]).toStrictEqual(['z', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o']);
    expect(gameboard.array[1]).toStrictEqual(['z', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o']);
  });

  test('placeShip function (3) out of range', () => {
    const gameboard = Gameboard();
    const ship = Ship(2, 'z');

    expect(() => { gameboard.placeShip(ship, 0, 9, false); }).toThrow(RangeError);
  });

  test('receiveAttack function (1) hitting ship', () => {
    const gameboard = Gameboard();
    const ship = Ship(3, 'z');

    gameboard.placeShip(ship, 0, 0, false);

    gameboard.receiveAttack(0, 1);
    gameboard.receiveAttack(0, 2);

    expect(gameboard.array[0]).toStrictEqual(['z', 'x', 'x', 'o', 'o', 'o', 'o', 'o', 'o', 'o']);
  });

  test('receiveAttack function (2) missing attack', () => {
    const gameboard = Gameboard();
    const ship = Ship(3, 'z');

    gameboard.placeShip(ship, 0, 0, false);

    gameboard.receiveAttack(0, 3);

    expect(gameboard.array[0]).toStrictEqual(['z', 'z', 'z', 'm', 'o', 'o', 'o', 'o', 'o', 'o']);
  });

  test('receiveAttack function (3) ship HP (hit)', () => {
    const gameboard = Gameboard();
    const ship = Ship(3, 'z');

    gameboard.placeShip(ship, 0, 0, false);

    gameboard.receiveAttack(0, 0);

    expect(ship.getHP()).toBe(2);
  });

  test('receiveAttack function (3) ship HP (missing hit)', () => {
    const gameboard = Gameboard();
    const ship = Ship(3, 'z');

    gameboard.placeShip(ship, 0, 0, false);

    gameboard.receiveAttack(0, 3);

    expect(ship.getHP()).toBe(3);
  });

  test('allShipsSunk function (1) all ships are sunk', () => {
    const gameboard = Gameboard();
    const ship = Ship(1, 'z');
    const ship1 = Ship(1, 'l');

    gameboard.placeShip(ship, 0, 0, false);

    ship.hit();
    ship1.hit();

    expect(gameboard.allShipsSunk()).toBe(true);
  });

  test('allShipsSunk function (2) one ship is left', () => {
    const gameboard = Gameboard();
    const ship = Ship(1, 'z');
    const ship1 = Ship(2, 'l');

    gameboard.placeShip(ship, 0, 0, false);
    gameboard.placeShip(ship1, 1, 0, false);

    ship.hit();
    ship1.hit();

    expect(gameboard.allShipsSunk()).toBe(false);
  });
});