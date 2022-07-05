const Ship = (length, char) => {
  let hp = length;
  let isAlive = true;

  const hit = () => {
    hp -= 1;
  };

  const getHP = () => hp;

  const isSunk = () => {
    if (!hp) isAlive = false;
    return !hp;
  };

  return {
    getHP, hit, isSunk, length, char, isAlive,
  };
};

export { Ship };
