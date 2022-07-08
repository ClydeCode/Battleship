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
        } else { row.id = `col${n}-row${i}`; }
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
      if (row !== 'x' && row !== 'o') {
        rows.forEach((row) => {
          if (row.id === `col${y}-row${x}`) row.classList.add('fill');
        });
      }
    });
  });
};

export { initGameboards, refreshGameboard };
