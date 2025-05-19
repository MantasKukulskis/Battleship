import { getAdjacent, getSurrounding } from './utils.js';

let playerShips = [];
let currentShip = [];
let layoutIndex = 0;
let currentPlaced = 0;

export function getPlayerShips() {
  return playerShips;
}

export function resetPlayerPlacement() {
  playerShips = [];
  currentShip = [];
  layoutIndex = 0;
  currentPlaced = 0;
}

export function updateStatusText(layout, statusText, startBtn) {
  if (layoutIndex >= layout.length) {
    statusText.textContent = 'Visi laivai padėti. Spauskite "Pradėti žaidimą".';
    startBtn.disabled = false;
    return;
  }
  const { size, count } = layout[layoutIndex];
  statusText.textContent = `Dėstomas laivas: ${size} langelių (${currentPlaced + 1} iš ${count})`;
}

export function handlePlayerBoardClick(index, playerCells, layout, statusText, startBtn) {
  if (layoutIndex >= layout.length) return;

  const cell = playerCells[index];
  if (cell.classList.contains("confirmed") || cell.classList.contains("invalid")) return;

  if (currentShip.includes(index)) {
    cell.classList.remove("valid");
    currentShip = currentShip.filter((i) => i !== index);
  } else {
    currentShip.push(index);
    cell.classList.add("valid");
  }

  if (currentShip.length === layout[layoutIndex].size) {
    if (validateShip(currentShip, playerShips.flat())) {
      confirmShip(playerCells, layout, statusText, startBtn);
    } else {
      flashInvalid(playerCells);
    }
  }
}

function validateShip(ship, otherShips) {
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

function confirmShip(playerCells, layout, statusText, startBtn) {
  for (let i of currentShip) {
    playerCells[i].classList.remove("valid");
    playerCells[i].classList.add("confirmed");
  }
  playerShips.push([...currentShip]);
  currentShip = [];
  currentPlaced++;

  if (currentPlaced === layout[layoutIndex].count) {
    layoutIndex++;
    currentPlaced = 0;
  }

  updateStatusText(layout, statusText, startBtn);
}

function flashInvalid(playerCells) {
  for (let i of currentShip) {
    playerCells[i].classList.add("invalid");
  }
  setTimeout(() => {
    for (let i of currentShip) {
      playerCells[i].classList.remove("invalid");
      playerCells[i].classList.remove("valid");
    }
    currentShip = [];
  }, 500);
}