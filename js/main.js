import { createBoard } from "./board.js";
import { handlePlayerBoardClick, updateStatus, resetPlacement } from "./placement.js";
import { handleComputerBoardClick, placeComputerShips } from "./computer.js";
import { playerCells, computerCells, resetGameState, layout, layoutIndex } from "./player.js";

const playerBoard = document.getElementById("player-board");
const computerBoard = document.getElementById("computer-board");
const statusText = document.getElementById("status");
const startBtn = document.getElementById("start-btn");

createBoard(playerBoard, playerCells, handlePlayerBoardClick);
createBoard(computerBoard, computerCells, handleComputerBoardClick);
updateStatus();

startBtn.addEventListener("click", () => {
  if (layoutIndex.value < layout.length) {
    alert("Prašome užbaigti laivų dėliojimą!");
    return;
  }
  startBtn.disabled = true;
  resetGameState();
  placeComputerShips();
  statusText.textContent = "Žaidimas prasidėjo! Tavo ėjimas.";
});