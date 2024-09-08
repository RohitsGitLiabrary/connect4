const board = document.getElementById("board");
const message = document.getElementById("message");
const resetBtn = document.getElementById("resetBtn");

let currentPlayer = "red";
let gameBoard = Array.from({ length: 6 }, () =>
  Array.from({ length: 7 }, () => null)
);

function createBoard() {
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 7; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = row;
      cell.dataset.col = col;
      board.appendChild(cell);
    }
  }
}

function resetBoard() {
  currentPlayer = "red";
  gameBoard = Array.from({ length: 6 }, () =>
    Array.from({ length: 7 }, () => null)
  );
  board.style.backgroundColor = "";
  board.classList.remove("winner-announcement");
  board.classList.add("board");
  resetBtn.innerText = "Reset";
  board.innerHTML = "";
  createBoard();
  board.addEventListener("click", handleClick);
  message.innerText = "";
}
function checkWin() {
  // Check rows
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 4; col++) {
      if (
        gameBoard[row][col] === currentPlayer &&
        gameBoard[row][col + 1] === currentPlayer &&
        gameBoard[row][col + 2] === currentPlayer &&
        gameBoard[row][col + 3] === currentPlayer
      ) {
        return true;
      }
    }
  }

  // Check columns
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 7; col++) {
      if (
        gameBoard[row][col] === currentPlayer &&
        gameBoard[row + 1][col] === currentPlayer &&
        gameBoard[row + 2][col] === currentPlayer &&
        gameBoard[row + 3][col] === currentPlayer
      ) {
        return true;
      }
    }
  }

  // Check diagonals
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 4; col++) {
      if (
        gameBoard[row][col] === currentPlayer &&
        gameBoard[row + 1][col + 1] === currentPlayer &&
        gameBoard[row + 2][col + 2] === currentPlayer &&
        gameBoard[row + 3][col + 3] === currentPlayer
      ) {
        return true;
      }
    }
  }

  for (let row = 0; row < 3; row++) {
    for (let col = 3; col < 7; col++) {
      if (
        gameBoard[row][col] === currentPlayer &&
        gameBoard[row + 1][col - 1] === currentPlayer &&
        gameBoard[row + 2][col - 2] === currentPlayer &&
        gameBoard[row + 3][col - 3] === currentPlayer
      ) {
        return true;
      }
    }
  }

  return false;
}

function checkDraw() {
  return gameBoard.every((row) => row.every((cell) => cell !== null));
}

function handleClick(event) {
  const col = event.target.dataset.col;

  if (col === undefined) return;

  let row = findAvailableRow(col);
  if (row === -1) return;

  gameBoard[row][col] = currentPlayer;
  changeColor(row, col, currentPlayer);

  if (checkWin()) {
    board.classList.remove("board");
    board.classList.add("winner-announcement");
    board.style.backgroundColor = currentPlayer;
    board.innerHTML = `${currentPlayer.toUpperCase()} wins!`;
    board.removeEventListener("click", handleClick);
    resetBtn.innerText = "New Game";
    gameBoard = [];
  } else if (checkDraw()) {
    board.classList.remove("board");
    board.classList.add("draw-announcement");
    board.style.backgroundColor = "#e6e6fa";
    board.innerHTML = "It's a draw!";
    resetBtn.innerText = "New Game";
    board.removeEventListener("click", handleClick);
    gameBoard = [];
  } else {
    currentPlayer = currentPlayer === "red" ? "yellow" : "red";
  }
}

function findAvailableRow(col) {
  for (row = 5; row >= 0; row--) {
    if (gameBoard[row][col] === null) {
      return row;
    }
  }
  return -1;
}

function changeColor(row, col, currentPlayer) {
  const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
  if (cell) {
    cell.style.backgroundColor = currentPlayer;
  } else {
    console.error(`No cell found with data-row="${row}" and data-col="${col}"`);
  }
}

createBoard();
board.addEventListener("click", handleClick);
resetBtn.addEventListener("click", resetBoard);
