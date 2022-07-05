import { Ship } from '../battleship';

test('hit function (1) single hit', () => {
  const ship = Ship(2);

  ship.hit(1);

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
