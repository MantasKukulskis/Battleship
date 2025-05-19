import { getPlayerShips, handlePlayerBoardClick as playerClickHandler, resetPlayerPlacement } from './player.js';
import { placeComputerShips, resetComputer } from './computer.js';

let placementDone = false;

export function handlePlayerBoardClick(index, playerCells, layout, statusText, startBtn) {
  if (placementDone) return;
  playerClickHandler(index, playerCells, layout, statusText, startBtn);
}

export function placeComputerShips(layout) {
  resetComputer();
  placeComputerShips(layout);
}

export function isPlacementDone() {
  return getPlayerShips().length === layout.reduce((acc, l) => acc + l.count, 0);
}