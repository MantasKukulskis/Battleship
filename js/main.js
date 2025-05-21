import { createBoard } from "./board.js";
import { handlePlayerBoardClick, updateStatus } from "./placement.js";
import { handleComputerBoardClick, placeComputerShips } from "./computer.js";
import {
  playerCells,
  computerCells,
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

createBoard(playerBoard, playerCells, handlePlayerBoardClick);
createBoard(computerBoard, computerCells, handleComputerBoardClick);
updateStatus();

startBtn.addEventListener("click", () => {
  if (layoutIndex.value < layout.length) {
    alert("Please finish placing your ships!");
    return;
  }

  window.gameStarted = true;
  window.playerTurn = true;

  startBtn.disabled = true;
  placeComputerShips();
  statusText.textContent = "Game started! Your turn.";
});

restartBtn.addEventListener("click", restartGame);

function restartGame() {
  playerBoard.innerHTML = "";
  computerBoard.innerHTML = "";

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

  createBoard(playerBoard, playerCells, handlePlayerBoardClick);
  createBoard(computerBoard, computerCells, handleComputerBoardClick);

  updateStatus();

  statusText.textContent = "Place your ships!";
  startBtn.disabled = false;
  restartBtn.style.display = "none";
}