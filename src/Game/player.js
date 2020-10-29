export const getPlayerRelativePosition = map => {
  for (let i = 0; i < map.length; i++) {
    const row = map[i];
    for (let j = 0; j < row.length; j++) {
      if (row[j] === 'A') return { x: j, y: i };
    }
  }
};
