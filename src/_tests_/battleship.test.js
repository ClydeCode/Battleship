import { Ship } from '../battleship';

test('create ship with wrong length (1)', () => {
  const ship = Ship(0);

  expect(ship.getArray()).toBeUndefined();
});

test('create ship with wrong length (2)', () => {
  const ship = Ship(7);

  expect(ship.getArray()).toBeUndefined();
});

test('create ship with good length', () => {
  const ship = Ship(2);

  expect(ship.getArray()).toStrictEqual(['o', 'o']);
});

test('hit function (1) single hit', () => {
  const ship = Ship(2);

  ship.hit(1);

  expect(ship.getArray()).toStrictEqual(['x', 'o']);
});

test('hit function (2) single hit', () => {
  const ship = Ship(2);

  ship.hit(2);

  expect(ship.getArray()).toStrictEqual(['o', 'x']);
});

test('hit function (3) multiple hits', () => {
  const ship = Ship(2);

  ship.hit(1);
  ship.hit(2);

  expect(ship.getArray()).toStrictEqual(['x', 'x']);
});

test('isSunk function (1)', () => {
  const ship = Ship(2);

  ship.hit(1);

  expect(ship.isSunk()).toBe(false);
});

test('isSunk function (2)', () => {
  const ship = Ship(2);

  ship.hit(1);
  ship.hit(2);

  expect(ship.isSunk()).toBe(true);
});
