const io = require('socket.io')()

let board = null
const players = {'red': null, 'yellow': null}
let player = 'red'


function reset() {
  board = Array(6).fill(0).map(x => Array(8).fill('white'))
  players['red'] = null
  players['yellow'] = null
  player = 'red'
}

function checkVictory(i, j) {
  const c = board[i][j]

  // Check horizontally
  let count = 0
  // count to the left
  for (let k = 1; k < 4; ++k) {
    if (j - k < 0) {
      break
    }
    if (board[i][j - k] !== c) {
      break
    }
    count++
  }
  // count to the right
  for (let k = 1; k < 4; ++k) {
    if (j + k > 7) {
      break
    }
    if (board[i][j + k] !== c) {
      break
    }
    count++
  }

  if (count > 2) {
    return true
  }


  // Check vertically
  count = 0
  // count up
  for (let k = 1; k < 4; ++k) {
    if (i - k < 0) {
      break
    }
    if (board[i - k][j] !== c) {
      break
    }
    count++
  }
  // count down
  for (let k = 1; k < 4; ++k) {
    if (i + k > 5) {
      break
    }
    if (board[i + k][j] !== c) {
      break
    }
    count++
  }

  if (count > 2) {
    return true
  }

  // Check diagonal top-left -> bottom-right
  count = 0
  // count to top-left
  for (let k = 1; k < 4; ++k) {
    if (i - k < 0 || j - k < 0) {
      break
    }
    if (board[i - k][j - k] !== c) {
      break
    }
    count++
  }
  // count to bottom-right
  for (let k = 1; k < 4; ++k) {
    if (i + k > 5 || j + k > 7) {
      break
    }
    if (board[i + k][j + k] !== c) {
      break
    }
    count++
  }

  if (count > 2) {
    return true
  }

  // Check diagonal bottom-left -> top-right
  count = 0
  // count to bottom-left
  for (let k = 1; k < 4; ++k) {
    if (i + k > 5 || j - k < 0) {
      break
    }
    if (board[i + k][j - k] !== c) {
      break
    }
    count++
  }
  // count to top-right
  for (let k = 1; k < 4; ++k) {
    if (i - k < 0 || j + k > 7) {
      break
    }
    if (board[i - k][j + k] !== c) {
      break
    }
    count++
  }

  return count > 2
}


io.on('connection', function (socket) {
  if (players['red'] == null) {
    players['red'] = socket
    socket.emit('color', 'red')
  } else if (players['yellow'] == null) {
    players['yellow'] = socket
    socket.emit('color', 'yellow')
    io.emit('turn', 'red')
  } else {
    socket.disconnect()
  }

  socket.on('disconnect', function () {
    if (players['red'] === socket) {
      players['red'] = null
    } else if (players['yellow'] === socket) {
      players['yellow'] = null
    }
  })

  socket.on('click', function (column) {
    // Ignore players clicking when it's not their turn
    if (players[player] !== socket) {
      console.log('click from wrong player: ' + player === 'red' ? 'yellow' : 'red')
      return
    }

    // Ignore clicks on full columns
    if (board[0][column] !== 'white') {
      console.log('click on full column: ' + column)
      return
    }

    // Ignore clicks before both players are connected
    if ((players['red'] == null) || (players['yellow'] == null)) {
      console.log('click before all players are connected')
      return
    }

    // find first open spot in the column
    let row = -1
    for (row = 5; row >= 0; --row) {
      if (board[row][column] === 'white') {
        board[row][column] = player
        break
      }
    }

    io.emit('board', board)

    // Check victory (only current player can win)
    if (checkVictory(row, column)) {
      io.emit('victory', player)
      // Disconnect players
      players['red'].disconnect()
      players['yellow'].disconnect()
      reset()
      return
    }

    // Toggle the player
    player = player === 'red' ? 'yellow' : 'red'
    io.emit('turn', player)
  })
})

reset()
const port = 1337
io.listen(port)
console.log('Listening on port ' + port + '...')