import './style.css'
const scoreElement = document.querySelector('.score-num')
const button = document.getElementById('btn')
const start = document.getElementById('start')

let score = 0
scoreElement.textContent = `${score}`
const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

const BLOCK_SIZE = 20
const BLOCK_WIDTH = 14
const BLOCK_HEIGTH = 30
const board = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]
// PIEZA

const piece = {
  position: { x: 5, y: 5 },
  shape: [
    [1, 1],
    [1, 1]
  ],
  color: 'red'
}
// random pieces
const PIECES = [
  {
    shape: [
      [0, 1, 0],
      [1, 1, 1]
    ],
    color: 'pink'
  },
  {
    shape: [[1, 1, 1, 1]],
    color: 'pink'
  },
  {
    shape: [
      [1, 0, 0],
      [1, 1, 1]
    ],
    color: 'yellow'
  },
  {
    shape: [
      [1, 1, 0],
      [0, 1, 1]
    ],
    color: 'green'
  },
  {
    shape: [
      [0, 1, 1],
      [1, 1, 0]
    ],
    color: 'blue'
  }
]
canvas.width = BLOCK_SIZE * BLOCK_WIDTH
canvas.height = BLOCK_SIZE * BLOCK_HEIGTH

context.scale(BLOCK_SIZE, BLOCK_SIZE)
// GAME LOOP
let dropCounter = 0
let lastTime = 0
function update (time = 0) {
  const deltaTime = time - lastTime
  lastTime = time
  dropCounter += deltaTime
  if (dropCounter > 1000) {
    piece.position.y++
    dropCounter = 0

    if (checkColision()) {
      piece.position.y--
      solidifyPiece()
      removeRows()
    }
  }
  drow()
  window.requestAnimationFrame(update)
}
function drow () {
  context.fillStyle = '#000'
  context.fillRect(0, 0, canvas.width, canvas.height)

  board.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value === 1) {
        context.fillStyle = 'red'
        context.fillRect(x, y, 1, 1)
      }
    })
  })
  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value === 1) {
        context.fillStyle = piece.color
        context.fillRect(x + piece.position.x, y + piece.position.y, 1, 1)
      }
    })
  })
}

///
// Obtén el elemento contenedor donde deseas detectar el desplazamiento horizontal (scroll)

canvas.addEventListener('click', () => {
  const rotated = []
  for (let i = 0; i < piece.shape[0].length; i++) {
    const row = []
    for (let j = piece.shape.length - 1; j >= 0; j--) {
      row.push(piece.shape[j][i])
    }
    rotated.push(row)
  }
  const previusShape = piece.shape
  piece.shape = rotated
  if (checkColision()) {
    piece.shape = previusShape
  }
})
// // Obtén el elemento contenedor donde deseas detectar el deslizamiento

// Mantén un registro de las coordenadas táctiles anteriores
let previousTouchX = null

// Agrega eventos táctiles al contenedor
canvas.addEventListener('touchstart', function (event) {
  // Obtén las coordenadas táctiles iniciales
  previousTouchX = event.touches[0].clientX
})

canvas.addEventListener('touchmove', function (event) {
  // Detén el desplazamiento predeterminado para evitar el comportamiento de desplazamiento de la página
  event.preventDefault()

  // Obtiene las coordenadas táctiles actuales
  const currentTouchX = event.touches[0].clientX

  // Comprueba si el deslizamiento fue hacia la izquierda o hacia la derecha
  if (currentTouchX < previousTouchX) {
    piece.position.x--
    if (checkColision()) {
      piece.position.x++
    }
  } else if (currentTouchX > previousTouchX) {
    piece.position.x++
    if (checkColision()) {
      piece.position.x--
    }
  }
})

canvas.addEventListener('touchend', function () {
  // Restablece las coordenadas táctiles anteriores
  previousTouchX = null
})

document.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') {
    piece.position.x--
    if (checkColision()) {
      piece.position.x++
    }
  }
  if (event.key === 'ArrowRight') {
    piece.position.x++
    if (checkColision()) {
      piece.position.x--
    }
  }
  if (event.key === 'ArrowDown') {
    piece.position.y++
    if (checkColision()) {
      piece.position.y--
      solidifyPiece()
      removeRows()
    }
  }
  if (event.key === 'ArrowUp') {
    const rotated = []
    for (let i = 0; i < piece.shape[0].length; i++) {
      const row = []
      for (let j = piece.shape.length - 1; j >= 0; j--) {
        row.push(piece.shape[j][i])
      }
      rotated.push(row)
    }
    const previusShape = piece.shape
    piece.shape = rotated
    if (checkColision()) {
      piece.shape = previusShape
    }
  }
})

// checkear colision

function checkColision () {
  return piece.shape.find((row, y) => {
    return row.find((value, x) => {
      return (
        value !== 0 &&

        board[y + piece.position.y]?.[x + piece.position.x] !== 0
      )
    })
  })
}

function solidifyPiece () {
  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value === 1) {
        board[y + piece.position.y][x + piece.position.x] = 1
      }
    })
  })
  const newPiece = PIECES[Math.floor(Math.random() * PIECES.length)]
  piece.shape = newPiece.shape
  piece.color = newPiece.color
  piece.position.x = BLOCK_WIDTH / 2
  piece.position.y = 0

  if (checkColision()) {
    window.alert('Game Over!!')
    board.forEach((row) => row.fill(0))
  }
}
function removeRows () {
  const rowsToRemove = []
  board.forEach((row, y) => {
    if (row.every(value => value === 1)) {
      rowsToRemove.push(y)
      const addscore = 5
      score += addscore
      scoreElement.textContent = `${score}`
    }
  })
  rowsToRemove.forEach(y => {
    board.splice(y, 1)
    const newRow = Array(BLOCK_WIDTH).fill(0)
    board.unshift(newRow)
  })
}
button.addEventListener('click', (e) => {
  e.preventDefault()
  update()
  console.log('hola')
  board.forEach((row) => {
    row.forEach(item => {
      item = 0
    })
  })
})
start.addEventListener('click', (e) => {
  e.preventDefault()
  document.querySelector('.modal').classList.add('hidden')
  update()
})
