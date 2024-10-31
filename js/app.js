/*-------------------------------- Constants --------------------------------*/
const winningCombo = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], //rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], //columns
  [0, 4, 8], [2, 4, 8] //diagonals
]


/*---------------------------- Variables (state) ----------------------------*/
let board;
let turn;
let winner;
let tie;
let squareIndex;


/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll(`.sqr`);
const statusMessage = document.getElementById("message");
const boardContainer = document.querySelector(`.board`)

/*-------------------------------- Functions --------------------------------*/
function init() {
  board  = Array(9).fill("");
  board = ["x", "o", "x", "", "x", "", "o", "", ""];
  turn = "x";
  winner = false;
  tie = false;
  console.log("Game initialized");
  render();
}

function render() {
  updateBoard();
  updateMessage();
}

function updateBoard() {
  board.forEach((mark, index) => {
    const square = squareEls[index];
    square.textContent = mark
  })
}

function updateMessage() {
  if (winner === true && tie === false) {
    messageEl.textContent = `${turn} wins`
  } else if (winner === false && tie === true) {
    messageEl.textContent = `It's a tie!`
  } else if (winner === false && tie === false) {
    messageEl.textContent = `Current turn: ${turn}`
  }
}

function handleCLick(event) {

  squareIndex = parseInt(event.target.id)
  // console.log(event.target.id)
  if (board[squareIndex] || winner === true) return;

  placePiece(squareIndex);
  checkForWinner();
}

function placePiece(index) {
  board[index] = turn
  console.log(board)
}

function checkForWinner() {
  for (const combo of winningCombos) {
    const [a, b, c] = combo
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      winner = true;
      console.log("Winner: "  + winner);
      return;
    }
  }
}

function checkForTie() {
  if (winner ===true) return;
  tie = board.every(cell => cell !== "");
  console.log("Tie: " + winner)

}
/*----------------------------- Event Listeners -----------------------------*/
// boardContainer.addEventListener("click", handleClick);
squareEls.forEach(square => {
  square.addEventListener("click", handleCLick);

});

init();


