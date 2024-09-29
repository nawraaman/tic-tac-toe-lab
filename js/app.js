/*-------------------------------- Constants --------------------------------*/
const squareEls = document.querySelectorAll('.sqr')
const messageEl = document.getElementById('message')
const resetBtnEl = document.getElementById('reset')
const winningCombos = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // top-left to bottom-right
  [2, 4, 6] // top-right to bottom-left
]
/*---------------------------- Variables (state) ----------------------------*/
let board
let turn
let winner
let tie
let winningCombo // Add this variable to store the winning combination
/*------------------------ Cached Element References ------------------------*/
/*-------------------------------- Functions --------------------------------*/
const init = () => {
  console.log('Initializing game...')
  board = ['', '', '', '', '', '', '', '', '']
  turn = 'X'
  winner = false
  tie = false
  winningCombo = null
  render()
}
// Handle player clicks on squares
const handleClick = (event) => {
  const target = event.target // Get the clicked element
  const squareIndex = parseInt(target.id) // Get the index from the element's id
  if (board[squareIndex] !== '' || winner) {
    return
  }
  placePiece(squareIndex) // Place the piece
  checkForWinner() // Check for a winner
  checkForTie() // Check for a tie
  switchPlayerTurn() // Switch turns
  render() // Update the board and message
}
// Update the board array at the index so that it is equal to the current value of turn.
const placePiece = (index) => {
  board[index] = turn
  console.log(board)
}
const checkForWinner = () => {
  winningCombos.forEach((combo) => {
    const [a, b, c] = combo
    if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
      winner = true
      winningCombo = combo
    }
  })
  console.log(winner)
}
const checkForTie = () => {
  if (winner) return
  tie = !board.includes('')
  console.log(tie)
}
const switchPlayerTurn = () => {
  if (winner) return
  turn = turn === 'X' ? 'O' : 'X' // condition ? expressionTrue : expressionFalse
  console.log(turn)
}
const render = () => {
  updateBoard()
  updateMessage()
}
const updateBoard = () => {
  board.forEach((cell, index) => {
    const square = squareEls[index]
    square.textContent = cell // Update the text content displayed in each square element based on the values stored in the board array.
    if (winner && winningCombo.includes(index)) {
      square.style.backgroundColor = 'red'
    } else {
      square.style.backgroundColor = ''
    }
    if (cell === 'X') {
      square.style.color = 'pink'
    } else if (cell === 'O') {
      square.style.color = 'blue'
    } else {
      square.style.color = ''
    }
  })
}
const updateMessage = () => {
  if (winner) {
    messageEl.textContent = `Player ${turn} wins!`
  } else if (tie) {
    messageEl.textContent = `It's a tie!`
  } else {
    messageEl.textContent = `Player ${turn}'s turn`
  }
}
// Attach event listeners to squares
squareEls.forEach((square) => {
  square.addEventListener('click', handleClick)
})
// Attach event listener to reset button
resetBtnEl.addEventListener('click', init)
// Call init when the app loads
window.onload = init
