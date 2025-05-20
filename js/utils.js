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

export function generateShipShape(start, size, occupied) {
  const x = start % 10;
  const y = Math.floor(start / 10);
  if (x + size <= 10) {
    const horizontal = Array.from({ length: size }, (_, i) => start + i);
    if (canPlace(horizontal, occupied)) return horizontal;
  }
  if (y + size <= 10) {
    const vertical = Array.from({ length: size }, (_, i) => start + i * 10);
    if (canPlace(vertical, occupied)) return vertical;
  }
  return null;
}

export function canPlace(shipCells, occupied) {
  for (let cell of shipCells) {
    if (occupied.includes(cell)) return false;
    const surrounding = getSurrounding(cell);
    if (surrounding.some(s => occupied.includes(s))) return false;
  }
  return true;
}

export function isHit(ships, index) {
  return ships.some(ship => ship.includes(index));
}

export function getShipByCell(ships, cell) {
  return ships.find(ship => ship.includes(cell));
}

export function isSunk(ship, shots) {
  return ship.every(cell => shots.has(cell));
}

export function markSunkShip(ship, cellsArray) {
  const surroundingSet = new Set();

  for (let cell of ship) {
    cellsArray[cell].classList.remove("hit");
    cellsArray[cell].classList.add("sunk");

    const around = getSurrounding(cell);
    around.forEach(i => {
      if (!ship.includes(i)) surroundingSet.add(i);
    });
  }

  for (let index of surroundingSet) {
    if (!cellsArray[index].classList.contains("sunk") &&
        !cellsArray[index].classList.contains("miss") &&
        !cellsArray[index].classList.contains("hit")) {
      cellsArray[index].classList.add("empty"); 
    }
  }
}

export function checkWin(ships, shots) {
  return ships.every(ship => isSunk(ship, shots));
}