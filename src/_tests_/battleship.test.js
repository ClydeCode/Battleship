import { Gameboard, Player, Ship } from '../battleship';

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

  test('isSunk function (1) ship is alive', () => {
    const ship = Ship(2);

    ship.hit();

    expect(ship.isSunk()).toBe(false);
  });

  test('isSunk function (2) ship is dead', () => {
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

    expect(gameboard.placeShip(ship, 0, 9, false)).toBe(false);
  });

  test('placeShip function (4) two ships near each other (1) X axis', () => {
    const gameboard = Gameboard();
    const ship = Ship(2, 'z');
    const ship1 = Ship(2, 'q');

    expect(gameboard.placeShip(ship, 0, 0, false)).toBe(true);
    expect(gameboard.placeShip(ship1, 1, 0, false)).toBe(false);
  });

  test('placeShip function (5) two ships near each other (2) X axis', () => {
    const gameboard = Gameboard();
    const ship = Ship(2, 'z');
    const ship1 = Ship(2, 'q');

    expect(gameboard.placeShip(ship, 0, 8, false)).toBe(true);
    expect(gameboard.placeShip(ship1, 1, 6, false)).toBe(false);
  });

  test('placeShip function (6) two ships near each other (3) Y axis', () => {
    const gameboard = Gameboard();
    const ship = Ship(2, 'z');
    const ship1 = Ship(2, 'q');

    expect(gameboard.placeShip(ship, 7, 8, true)).toBe(true);
    expect(gameboard.placeShip(ship1, 5, 7, true)).toBe(false);
  });

  test('placeShip function (7) two ships near each other (4) Y axis', () => {
    const gameboard = Gameboard();
    const ship = Ship(2, 'z');
    const ship1 = Ship(2, 'q');

    expect(gameboard.placeShip(ship, 5, 4, true)).toBe(true);
    expect(gameboard.placeShip(ship1, 5, 5, true)).toBe(false);
  });

  test('receiveAttack function (1) hitting ship', () => {
    const gameboard = Gameboard();
    const ship = Ship(3, 'z');

    gameboard.placeShip(ship, 0, 0, false);

    expect(gameboard.receiveAttack(0, 1)).toBe('hit');
    expect(gameboard.receiveAttack(0, 2)).toBe('hit');
    expect(gameboard.array[0]).toStrictEqual(['z', 'x', 'x', 'o', 'o', 'o', 'o', 'o', 'o', 'o']);
  });

  test('receiveAttack function (2) missing attack', () => {
    const gameboard = Gameboard();
    const ship = Ship(3, 'z');

    gameboard.placeShip(ship, 0, 0, false);

    expect(gameboard.receiveAttack(0, 3)).toBe('miss');

    expect(gameboard.array[0]).toStrictEqual(['z', 'z', 'z', 'm', 'o', 'o', 'o', 'o', 'o', 'o']);
  });

  test('receiveAttack function (3) ship HP (hit)', () => {
    const gameboard = Gameboard();
    const ship = Ship(3, 'z');

    gameboard.placeShip(ship, 0, 0, false);

    expect(gameboard.receiveAttack(0, 0)).toBe('hit');
    expect(ship.getHP()).toBe(2);
  });

  test('receiveAttack function (4) ship HP (missing hit)', () => {
    const gameboard = Gameboard();
    const ship = Ship(3, 'z');

    gameboard.placeShip(ship, 0, 0, false);

    expect(gameboard.receiveAttack(0, 3)).toBe('miss');
    expect(ship.getHP()).toBe(3);
  });

  test('receiveAttack function (5) hitting twice (1)', () => {
    const gameboard = Gameboard();
    const ship = Ship(3, 'z');

    gameboard.placeShip(ship, 0, 0, false);

    expect(gameboard.receiveAttack(0, 0)).toBe('hit');
    expect(gameboard.receiveAttack(0, 0)).toBe(false);
    expect(ship.getHP()).toBe(2);
  });

  test('receiveAttack function (6) hitting twice (2)', () => {
    const gameboard = Gameboard();

    expect(gameboard.receiveAttack(0, 0)).toBe('miss');
    expect(gameboard.receiveAttack(0, 0)).toBe(false);
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
    gameboard.placeShip(ship1, 2, 0, false);

    ship.hit();
    ship1.hit();

    expect(gameboard.allShipsSunk()).toBe(false);
  });
});

describe('Player factory function', () => {
  test('move function', () => {
    const gameboard = Gameboard();
    const player = Player(gameboard);

    expect(player.move(0, 0)).toBe('miss');
    expect(gameboard.array[0]).toStrictEqual(['m', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o']);
  });

  describe('UI', () => {
    test('autoMove function', () => {
      const gameboard = Gameboard();
      const player = Player(gameboard, true);

      for (let n = 0; n < 100; n += 1) player.autoMove();

      expect(gameboard.array[0]).toStrictEqual(['m', 'm', 'm', 'm', 'm', 'm', 'm', 'm', 'm', 'm']);
    });
  });
});
