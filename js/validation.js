import { getSurrounding } from "./utils.js";

export function validateShip(ship, otherShips) {
  ship.sort((a, b) => a - b);
  const visited = new Set();
  const queue = [ship[0]];
  visited.add(ship[0]);

  while (queue.length > 0) {
    const current = queue.shift();
    const neighbors = getAdjacent(current);
    for (let n of neighbors) {
      if (ship.includes(n) && !visited.has(n)) {
        visited.add(n);
        queue.push(n);
      }
    }
  }

  if (visited.size !== ship.length) return false;

  for (let index of ship) {
    const surrounding = getSurrounding(index);
    for (let s of surrounding) {
      if (otherShips.includes(s) && !ship.includes(s)) return false;
    }
  }

  return true;
}

function getAdjacent(index) {
  const x = index % 10;
  const y = Math.floor(index / 10);
  const adjacent = [];
  if (x > 0) adjacent.push(index - 1);
  if (x < 9) adjacent.push(index + 1);
  if (y > 0) adjacent.push(index - 10);
  if (y < 9) adjacent.push(index + 10);
  return adjacent;
}