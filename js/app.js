/*-------------------------------- Constants --------------------------------*/
const winningCombo = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6] // diagonals
];

/*---------------------------- Variables (state) ----------------------------*/
let board;
let turn;           // represents "X" and "O"
let winner;         // shows a message of who won the game
let tie;            // shows if the game was a tie
let squareIndex;

/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll(`.sqr`);
const messageEl = document.getElementById("message");
const resetBtnEl = document.getElementById('reset'); // Update to get the reset button

/*-------------------------------- Functions --------------------------------*/
function init() {
  board = Array(9).fill("");
  turn = "X";
  winner = false;
  tie = false;

  squareEls.forEach((square) => {
    square.textContent = "";
  });
  resetBtnEl.style.display = 'none'; // Hide the reset button initially
  render();
}

init(); // Call function

function render() {
  updateBoard();
  updateMessage();
}

function updateBoard() {
  board.forEach((mark, index) => {
    const square = squareEls[index];
    square.textContent = mark;
  });
}

function updateMessage() {
  if (winner === true && tie === false) {
    messageEl.textContent = `${turn} wins!`;
    resetBtnEl.style.display = 'block'; // Show reset button on win
  } else if (winner === false && tie === true) {
    messageEl.textContent = `It's a tie!`;
    resetBtnEl.style.display = 'block'; // Show reset button on tie
  } else {
    messageEl.textContent = `Current turn: ${turn}`;
  }
}

function handleClick(event) {
  squareIndex = parseInt(event.target.id);
  if (board[squareIndex] || winner === true) {
    return;
  }
  placePiece(squareIndex);
  checkForWinner();
  checkForTie(); // Check for a tie after each move
  updateMessage();
}

function placePiece(index) {
  board[index] = turn;
  updateBoard();
  turn = turn === "X" ? "O" : "X"; // Switch player
}

function checkForWinner() {
  for (const combo of winningCombo) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      winner = true;
      turn = board[c]; // Set the winner
      updateMessage();
      return;
    }
  }
}

function checkForTie() {
  if (winner === true) return;
  tie = board.every(cell => cell !== "");
}

/*----------------------------- Event Listeners -----------------------------*/
squareEls.forEach(square => {
  square.addEventListener("click", handleClick);
});

// Event listener for reset button
resetBtnEl.addEventListener('click', init);
