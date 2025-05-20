import { layout } from "./player.js";
import {computerCells,playerShips,playerCells,computerShips,computerShots,
  playerShots,lastHits,} from "./player.js";
import { generateShipShape, isHit, getShipByCell, isSunk, markSunkShip, checkWin } from "./utils.js";

const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart-btn");

export function placeComputerShips() {
  computerShips.length = 0;
  const all = [];

  for (let group of layout) {
    for (let i = 0; i < group.count; i++) {
      let placed = false;
      while (!placed) {
        const start = Math.floor(Math.random() * 100);
        const shape = generateShipShape(start, group.size, all);
        if (shape) {
          computerShips.push(shape);
          all.push(...shape);
          placed = true;
        }
      }
    }
  }
}

export function handleComputerBoardClick(index) {
  if (!window.gameStarted || !window.playerTurn || playerShots.has(index)) return;

  playerShots.add(index);

  if (isHit(computerShips, index)) {
    computerCells[index].classList.add("hit");
    const sunkShip = getShipByCell(computerShips, index);
    if (isSunk(sunkShip, playerShots)) {
      markSunkShip(sunkShip, computerCells);
      statusText.textContent = "Nuskandinai priešininko laivą! Šauk dar kartą.";
    } else {
      statusText.textContent = "Pataikei! Šauk dar kartą.";
    }
    if (checkWin(computerShips, playerShots)) {
      statusText.textContent = "Laimėjai! Visus priešininko laivus nuskandinai!";
      window.gameStarted = false;
      restartBtn.style.display = "inline-block";
    }
  } else {
    computerCells[index].classList.add("miss");
    statusText.textContent = "Nepataikei. Kompiuterio ėjimas.";
    window.playerTurn = false;
    setTimeout(computerMove, 1000);
  }
}

function computerMove() {
  if (!window.gameStarted) return;

  let move;
  if (lastHits.length > 0) {
    move = findTargetAroundHits();
  } else {
    do {
      move = Math.floor(Math.random() * 100);
    } while (computerShots.has(move));
  }

  computerShots.add(move);

  if (isHit(playerShips, move)) {
    playerCells[move].classList.add("hit");
    lastHits.push(move);
    const sunkShip = getShipByCell(playerShips, move);
    if (isSunk(sunkShip, computerShots)) {
      markSunkShip(sunkShip, playerCells);
      statusText.textContent = "Kompiuteris nuskandino tavo laivą! Šauna dar kartą.";
      lastHits.splice(0, lastHits.length, ...lastHits.filter(i => !sunkShip.includes(i)));
    } else {
      statusText.textContent = "Kompiuteris pataikė!";
    }
    if (checkWin(playerShips, computerShots)) {
      statusText.textContent = "Pralaimėjai! Kompiuteris laimėjo.";
      window.gameStarted = false;
      restartBtn.style.display = "inline-block";
      return;
    }
    setTimeout(computerMove, 1000);
  } else {
    playerCells[move].classList.add("miss");
    statusText.textContent = "Tavo ėjimas.";
    window.playerTurn = true;
  }
}

function findTargetAroundHits() {
  const directions = [-1, 1, -10, 10];
  for (let hit of lastHits) {
    for (let dir of directions) {
      const target = hit + dir;
      if (target >= 0 && target < 100 && !computerShots.has(target)) {
        const x1 = hit % 10;
        const x2 = target % 10;
        if (Math.abs(x1 - x2) <= 1) {
          return target;
        }
      }
    }
  }
  let random;
  do {
    random = Math.floor(Math.random() * 100);
  } while (computerShots.has(random));
  return random;
}