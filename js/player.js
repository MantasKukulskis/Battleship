export const playerShips = [];
export const computerShips = [];
export const currentShip = [];
export const playerCells = [];
export const computerCells = [];

export const layout = [
  { size: 4, count: 1 },
  { size: 3, count: 2 },
  { size: 2, count: 3 },
  { size: 1, count: 4 },
];

export const layoutIndex = { value: 0 };
export const currentPlaced = { value: 0 };

export let playerShots = new Set();
export let computerShots = new Set();
export let lastHits = [];

export function resetGameState() {
  window.gameStarted = true;
  window.playerTurn = true;
  playerShots = new Set();
  computerShots = new Set();
  lastHits = [];
}