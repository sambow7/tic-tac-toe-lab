/*-------------------------------- Constants --------------------------------*/
const winningCombo = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], //rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], //columns
  [0, 4, 8], [2, 4, 8] //diagonals
]


/*---------------------------- Variables (state) ----------------------------*/
let board;
let turn;           // represents "x" and "o"
let winner;         // shows a message of who wobn the game
let tie;            // shows if the game was a tie
let squareIndex;


/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll(`.sqr`);
const messageEl = document.getElementById("message");
const gameBoard = document.querySelector(`.board`)

/*-------------------------------- Functions --------------------------------*/
function init() {
  // board = Array(9).fill("");
  board = [" ", " ", " ", " ", " ", "", " ", " ", " "];
  turn = "X";
  winner = false;
  tie = false;

  squareEls.forEach((square) => {
    square.textContent = "";
  })
  console.log("Game initialized");
  render();
};

init(); // call function

function render() {
  updateBoard();
  updateMessage();
};

function updateBoard() {
  board.forEach((mark, index) => {
    const square = squareEls[index];
    square.textContent = mark
  })
};

function updateMessage() {
  if (winner === true && tie === false) {
    messageEl.textContent = `${turn} wins`
  } else if (winner === false && tie === true) {
    messageEl.textContent = `It's a tie!`            //render message that the game is a tie
  } else if (winner === false && tie === false) {
    messageEl.textContent = `Current turn: ${turn}`  //rendering message who won
  }
};

function handleCLick(event) {
  squareIndex = parseInt(event.target.id)
  // console.log(event.target.id)
  if (board[squareIndex] || winner === true) {
    return;
  }
  placePiece(squareIndex);
  checkForWinner();
  updateMessage();
};

function placePiece(index) {
  board[index] = turn
  if (board[index] === "X") {
    updateBoard(index);
    updateMessage();
    turn = "O"
  } else if (board[index] === "O") {
    updateBoard(index);
    updateMessage();
    turn = "X"
  }
  console.log(board[index])
};

function checkForWinner() {
  for (const combo of winningCombo) {
    const [a, b, c] = combo
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      winner = true;
      turn = board[c];
      updateMessage();
      console.log(`The winner is ${turn}`);
      return;
    }
  }
};

function checkForTie() {
  if (winner === true) return;
  tie = board.every(cell => cell !== "");
  console.log("Tie: " + winner)

};

function restartGame() {
  const restartButton = document.createElement("button");
  restartButton.textContent = "Restart"
  messageEl.appendChild(restartButton)
};

restartGame(); //call function

/*----------------------------- Event Listeners -----------------------------*/
// boardContainer.addEventListener("click", handleClick);
squareEls.forEach(square => {
  square.addEventListener("click", handleCLick);

});
