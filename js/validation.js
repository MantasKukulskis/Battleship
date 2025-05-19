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
  for (let cell of ship) {
    cellsArray[cell].classList.remove("hit");
    cellsArray[cell].classList.add("sunk");
  }
}

export function checkWin(ships, shots) {
  return ships.every(ship => isSunk(ship, shots));
}