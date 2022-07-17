import { Ship, Gameboard, Player } from './battleship';
import {
  attackSquare, isGameOver, refreshGameboards, placeRandomlyShips,
} from './game';
import { freezeGameboard, initGameboards, unfreezeGameboard } from './DOM';
import './styles.css';

initGameboards();

const enemy = document.querySelector('#enemy');
const rows = enemy.querySelectorAll('.active');

const fGameboard = Gameboard('f');
const eGameboard = Gameboard('e');

const gameboards = [eGameboard, fGameboard];

const player = Player(eGameboard, false);
const bot = Player(fGameboard, true);

const fShip1 = Ship(5, 'q');
const fShip2 = Ship(4, 'w');
const fShip3 = Ship(3, 'e');
const fShip4 = Ship(3, 'r');
const fShip5 = Ship(2, 't');

const eShip1 = Ship(5, 'q');
const eShip2 = Ship(4, 'w');
const eShip3 = Ship(3, 'e');
const eShip4 = Ship(3, 'r');
const eShip5 = Ship(2, 't');

const fShips = [fShip1, fShip2, fShip3, fShip4, fShip5];
const eShips = [eShip1, eShip2, eShip3, eShip4, eShip5];

placeRandomlyShips(fShips, fGameboard);
placeRandomlyShips(eShips, eGameboard);

refreshGameboards(gameboards);

rows.forEach((row) => {
  row.addEventListener('click', () => {
    if (attackSquare(row.id, player) === 'miss') {
      freezeGameboard();
      if (!isGameOver(gameboards)) {
        setTimeout(() => {
          bot.autoMove();
          refreshGameboards(gameboards);
          unfreezeGameboard();
        }, 800);
      }
    }
    isGameOver(gameboards);
    refreshGameboards(gameboards);
  });
});
