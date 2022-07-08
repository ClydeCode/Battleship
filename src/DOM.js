const initGameboards = () => {
  const gameboards = document.querySelectorAll('.gameboard');

  gameboards.forEach((gameboard) => {
    for (let n = 0; n < 10; n += 1) {
      const column = document.createElement('div');
      column.className = 'column';
      column.id = `col${n}`;
      gameboard.appendChild(column);

      for (let i = 0; i < 10; i += 1) {
        const row = document.createElement('div');
        row.className = 'row';

        if (gameboard.id === 'enemy') {
          row.classList.add('active');
          row.id = `e-col${n}-row${i}`;
        } else { row.id = `f-col${n}-row${i}`; }
        column.appendChild(row);
      }
    }
  });
};

const refreshGameboard = (gameboard) => {
  const rows = document.querySelectorAll('.row');
  const { array } = gameboard;

  array.forEach((column, y) => {
    column.forEach((row, x) => {
      if (gameboard.char !== 'e' && row !== 'x' && row !== 'o') {
        rows.forEach((row) => {
          if (row.id === `${gameboard.char}-col${y}-row${x}`) row.classList.add('fill');
        });
      }
      if (row === 'x') {
        rows.forEach((row) => {
          if (row.id === `${gameboard.char}-col${y}-row${x}`) row.classList.add('attack');
        });
      }
      if (row === 'm') {
        rows.forEach((row) => {
          if (row.id === `${gameboard.char}-col${y}-row${x}`) row.classList.add('miss');
        });
      }
    });
  });
};

export { initGameboards, refreshGameboard };
