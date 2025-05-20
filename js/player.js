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

export const playerShots = new Set();
export const computerShots = new Set();
export const lastHits = [];

export function resetGameState() {
  window.gameStarted = true;
  window.playerTurn = true;

  playerShots.clear();
  computerShots.clear();
  lastHits.length = 0;

  playerShips.length = 0;
  computerShips.length = 0;
  currentShip.length = 0;

  layoutIndex.value = 0;
  currentPlaced.value = 0;
}