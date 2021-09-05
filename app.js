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
  const boardCell = document.querySelectorAll('[data-cell]')

  const winningMessageElement = document.querySelector('#winning-message')

  const winningMessage = document.querySelector('[data-winner-message]')

  let circleTurn
  
  boardCell.forEach(cell => {
      cell.addEventListener('click', handleClick, { once: true })
    })

  function handleClick (e) {
    const cell = e.target
    const currentPlayer = circleTurn ? circlePlayer : xPlayer
    markPlay(cell, currentPlayer)
    // check for win
    if (winnerPlayer(currentPlayer)) {
      // check for draw
      endGame(false) 
    } else {
      // switch turn
      toggleTurns()
    }
  }

  function endGame (draw) {
    if (draw) {

    } else {
      winningMessage.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
    }
    winningMessageElement.classList.add('show')
  }


  function markPlay (cell, currentPlayer) {
    cell.classList.add(currentPlayer)
  }

  function toggleTurns () {
    circleTurn = !circleTurn
    }
  
  function winnerPlayer (currentPlayer) {
    return winResult.some(results => {
      return results.every(index => {
        return boardCell[index].classList.contains(currentPlayer)
      })
    })
  }
  return (handleClick, markPlay, toggleTurns)
}

game()