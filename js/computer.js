import { layout } from "./player.js";
import { computerCells, playerShips, playerCells, computerShips, computerShots,
  playerShots, lastHits,} from "./player.js";
import { generateShipShape, isHit, getShipByCell, isSunk, markSunkShip, checkWin,} from "./utils.js";

const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart-btn");

let targetQueue = []; 
let currentTarget = null;

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

  let move = selectTarget();
  computerShots.add(move);

  if (isHit(playerShips, move)) {
    playerCells[move].classList.add("hit");
    lastHits.push(move);
    currentTarget = move;

        updateTargetQueue();

    const sunkShip = getShipByCell(playerShips, move);
    if (isSunk(sunkShip, computerShots)) {
      markSunkShip(sunkShip, playerCells);
      statusText.textContent = "Kompiuteris nuskandino tavo laivą! Šauna dar kartą.";
      lastHits.splice(0, lastHits.length, ...lastHits.filter(i => !sunkShip.includes(i)));
      targetQueue = [];
      direction = null;
    } else {
      statusText.textContent = "Kompiuteris pataikė!";
    }

    if (checkWin(playerShips, computerShots)) {
      statusText.textContent = "Pralaimėjai! Kompiuteris laimėjo.";
      window.gameStarted = false;
      restartBtn.style.display = "inline-block";
      return;
    }
    setTimeout(computerMove, 800);
  } else {
    playerCells[move].classList.add("miss");
    statusText.textContent = "Tavo ėjimas.";
    window.playerTurn = true;
  }
}

function selectTarget() {
  if (targetQueue.length > 0) {
    return targetQueue.shift();
  } else {
    
    let move;
    do {
      move = Math.floor(Math.random() * 100);
    } while (
      computerShots.has(move) ||
      (move % 2 !== Math.floor(move / 10) % 2) 
    );
    return move;
  }
}

function updateTargetQueue() {
  const directions = [
    { dx: 0, dy: -1 }, 
    { dx: 0, dy: 1 },  
    { dx: -1, dy: 0 }, 
    { dx: 1, dy: 0 }, 
  ];

  const row = Math.floor(currentTarget / 10);
  const col = currentTarget % 10;

  for (let { dx, dy } of directions) {
    const newRow = row + dy;
    const newCol = col + dx;
    const index = newRow * 10 + newCol;
    if (
      newRow >= 0 && newRow < 10 &&
      newCol >= 0 && newCol < 10 &&
      !computerShots.has(index)
    ) {
      targetQueue.push(index);
    }
  }

  targetQueue.sort((a, b) => Math.abs(45 - a) - Math.abs(45 - b));
}