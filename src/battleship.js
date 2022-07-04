const Ship = (length) => {
  let array;

  if (length >= 1 && length <= 5) { array = Array.from('o'.repeat(length)); }

  const hit = (cord) => {
    array[cord - 1] = 'x';
  };

  const getArray = () => array;

  const isSunk = () => {
    let parts = 0;
    array.forEach((cord) => {
      if (cord === 'x') parts += 1;
    });
    return (parts === array.length);
  };

  return { getArray, hit, isSunk };
};

export { Ship };
