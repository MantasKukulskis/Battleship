import { layout, layoutIndex, currentShip, currentPlaced, playerShips, playerCells } from "./player.js";
import { validateShip } from "./validation.js";

const statusText = document.getElementById("status");
const startBtn = document.getElementById("start-btn");

export function updateStatus() {
  if (layoutIndex.value >= layout.length) {
    statusText.textContent = "Visi laivai padėti. Spauskite \"Pradėti žaidimą\".";
    startBtn.disabled = false;
    return;
  }
  const { size, count } = layout[layoutIndex.value];
  statusText.textContent = `Dėstomas laivas: ${size} langelių (${currentPlaced.value + 1} iš ${count})`;
}

export function handlePlayerBoardClick(index) {
  if (window.gameStarted) return;
  const cell = playerCells[index];
  if (cell.classList.contains("confirmed") || cell.classList.contains("invalid")) return;

  if (currentShip.includes(index)) {
    cell.classList.remove("valid");
    currentShip.splice(currentShip.indexOf(index), 1);
  } else {
    currentShip.push(index);
    cell.classList.add("valid");
  }

  if (currentShip.length === layout[layoutIndex.value].size) {
    if (validateShip(currentShip, playerShips.flat())) {
      confirmShip();
    } else {
      flashInvalid();
    }
  }
}

function confirmShip() {
  for (let i of currentShip) {
    playerCells[i].classList.remove("valid");
    playerCells[i].classList.add("confirmed");
  }
  playerShips.push([...currentShip]);
  currentShip.length = 0;
  currentPlaced.value++;
  if (currentPlaced.value === layout[layoutIndex.value].count) {
    layoutIndex.value++;
    currentPlaced.value = 0;
  }
  updateStatus();
}

function flashInvalid() {
  for (let i of currentShip) playerCells[i].classList.add("invalid");
  setTimeout(() => {
    for (let i of currentShip) {
      playerCells[i].classList.remove("invalid");
      playerCells[i].classList.remove("valid");
    }
    currentShip.length = 0;
  }, 500);
}

export function resetPlacement() {
  playerShips.length = 0;
  currentShip.length = 0;
  layoutIndex.value = 0;
  currentPlaced.value = 0;
}