let result = document.getElementById("showContent");
let cells = document.querySelectorAll(".cell");
let restartbtn = document.getElementById("restartbtn");
let xButton = document.getElementById("Xbtn");
let yButton = document.getElementById("Ybtn");

const winCondition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;
initializeGame();

function initializeGame() {
  cells.forEach((cell) => cell.addEventListener("click", cellClicked));
  restartbtn.addEventListener("click", restart);
  xButton.classList.add("active");
  running = true;
}

function cellClicked() {
  result.textContent = "Game Started💣";
  const cellIndex = this.getAttribute("cellIndex");
  if (options[cellIndex] !== "" || !running) {
    return;
  }
  updateCells(this, cellIndex);
  checkWinner();
  changePlayer();
}

function updateCells(cell, index) {
  options[index] = currentPlayer;
  cell.textContent = currentPlayer;
}

function changePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  if (currentPlayer === "X") {
    xButton.classList.add("active");
    yButton.classList.remove("active");
  } else {
    yButton.classList.add("active");
    xButton.classList.remove("active");
  }
}

function checkWinner() {
  let roundWon = false;
  for (let i = 0; i < winCondition.length; i++) {
    const condition = winCondition[i];
    const cellA = options[condition[0]];
    const cellB = options[condition[1]];
    const cellC = options[condition[2]];

    if (cellA === "" || cellB === "" || cellC === "") {
      continue;
    }
    if (cellA === cellB && cellB === cellC) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    result.textContent = `${currentPlayer === "X" ? "X" : "O"} wins!💥`;
    running = false;
  } else if (!options.includes("")) {
    result.textContent = "Draw!";
    running = false;
  }
}

function restart() {
  currentPlayer = "X";
  options = ["", "", "", "", "", "", "", "", ""];
  result.textContent = "Let's Start Playing👻";
  cells.forEach((cell) => (cell.textContent = ""));
  xButton.classList.add("active");
  yButton.classList.remove("active");
  running = true;
}
