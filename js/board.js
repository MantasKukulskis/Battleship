export function createBoard(boardElem, cellsArray, clickHandler) {
  for (let i = 0; i < 100; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", () => clickHandler(i));
    boardElem.appendChild(cell);
    cellsArray.push(cell);
  }
}