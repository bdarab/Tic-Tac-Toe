/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
/* eslint-disable no-use-before-define */


const game = () => {
  const circlePlayer = 'circle'
  const xPlayer = 'x'
  const winResult = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [1, 4, 7],
    [0, 3, 6],
    [2, 5, 8]
  ]
  const board = document.querySelector('#board')

  const boardCell = document.querySelectorAll('[data-cell]')

  const winningMessageElement = document.querySelector('#winning-message')

  const restartBtn = document.querySelector('#resBtn')

  const winningMessage = document.querySelector('[data-winner-message]')

  let circleTurn
  
  startGame()
  winningMessageElement.classList.add('show')
  restartBtn.addEventListener('click', startGame)
    function startGame() {
      circleTurn = false
      boardCell.forEach(cell => {
        cell.classList.remove(xPlayer)
        cell.classList.remove(circlePlayer)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true })
      })
      winningMessageElement.classList.remove('show')
    }
  
  function handleClick (e) {
    const cell = e.target
    const currentPlayer = circleTurn ? circlePlayer : xPlayer
    markPlay(cell, currentPlayer)
    // check for win
    if (winnerPlayer(currentPlayer)) {
      endGame(false) 
    } else if (checkDraw()) {
      endGame(true)
    } else {
      // switch turn
      toggleTurns()
    }
  }

  function endGame (draw) {
    if (draw) {
      winningMessage.innerText = "It's a Tie!"
    } else {
      winningMessage.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
    }
    winningMessageElement.classList.add('show')
  }

  function checkDraw (draw) {
    return [...boardCell].every(cell => cell.classList.contains(xPlayer) || cell.classList.contains(circlePlayer))
  }

  function markPlay (cell, currentPlayer) {
    cell.classList.add(currentPlayer)
  }

  function toggleTurns () {
    circleTurn = !circleTurn
    }
  
  function winnerPlayer (currentPlayer) {
    return winResult.some(results => 
      results.every(index => 
      boardCell[index].classList.contains(currentPlayer)))
  }
  return (handleClick, markPlay, toggleTurns)
}

game()