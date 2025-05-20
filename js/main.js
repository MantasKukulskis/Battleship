import { createBoard } from "./board.js";
import { handlePlayerBoardClick, updateStatus } from "./placement.js";
import { handleComputerBoardClick, placeComputerShips } from "./computer.js";
import {
  playerCells,
  computerCells,
  resetGameState,
  layout,
  layoutIndex,
  currentPlaced,
  playerShots,
  computerShots,
  lastHits,
  playerShips,
  computerShips,
  currentShip,
} from "./player.js";

const playerBoard = document.getElementById("player-board");
const computerBoard = document.getElementById("computer-board");
const statusText = document.getElementById("status");
const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");

// 1. Kuriam lentas
createBoard(playerBoard, playerCells, handlePlayerBoardClick);
createBoard(computerBoard, computerCells, handleComputerBoardClick);
updateStatus();

// 2. STARTAS
startBtn.addEventListener("click", () => {
  if (layoutIndex.value < layout.length) {
    alert("Please finish placing your ships!");
    return;
  }

  // TIK čia nustatom, kad žaidimas prasideda
  window.gameStarted = true;
  window.playerTurn = true;

  startBtn.disabled = true;
  placeComputerShips();
  statusText.textContent = "Game started! Your turn.";
});

// 3. RESTARTAS
restartBtn.addEventListener("click", restartGame);

function restartGame() {
  // Išvalom DOM
  playerBoard.innerHTML = "";
  computerBoard.innerHTML = "";

  // Išvalom viską
  playerCells.length = 0;
  computerCells.length = 0;
  playerShips.length = 0;
  computerShips.length = 0;
  currentShip.length = 0;
  playerShots.clear();
  computerShots.clear();
  lastHits.length = 0;
  layoutIndex.value = 0;
  currentPlaced.value = 0;

  window.gameStarted = false;
  window.playerTurn = true;

  // Sukuriam lentas iš naujo
  createBoard(playerBoard, playerCells, handlePlayerBoardClick);
  createBoard(computerBoard, computerCells, handleComputerBoardClick);

  updateStatus();

  statusText.textContent = "Place your ships!";
  startBtn.disabled = false;
  restartBtn.style.display = "none";
}