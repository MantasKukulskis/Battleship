export function getAdjacent(index) {
  const x = index % 10;
  const y = Math.floor(index / 10);
  const adjacent = [];
  if (x > 0) adjacent.push(index - 1);
  if (x < 9) adjacent.push(index + 1);
  if (y > 0) adjacent.push(index - 10);
  if (y < 9) adjacent.push(index + 10);
  return adjacent;
}

export function getSurrounding(index) {
  const x = index % 10;
  const y = Math.floor(index / 10);
  const surrounding = [];
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (dx === 0 && dy === 0) continue;
      const nx = x + dx;
      const ny = y + dy;
      if (nx >= 0 && nx < 10 && ny >= 0 && ny < 10) {
        surrounding.push(ny * 10 + nx);
      }
    }
  }
  return surrounding;
}