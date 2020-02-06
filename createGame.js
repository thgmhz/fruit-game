export default function createGame(screen) {
  const state = {
    players: {},
    fruits: {}
  }

  function addPlayer(player) {
    const x = player.x
    const y = player.y
    const direction = 'right'

    state.players[player.id] = { x, y, direction }
    startMove(player.id)
  }

  function removePlayer(id) {
    delete state.players[id]
  }

  function addFruit(fruit) {
    const x = fruit.x
    const y = fruit.y
    state.fruits[fruit.id] = { x, y }
  }

  function removeFruit(id) {
    delete state.fruits[id]
  }

  function setDirection({ id, keyPressed }) {
    const directions = {
      ArrowUp: 'up',
      ArrowDown: 'down',
      ArrowLeft: 'left',
      ArrowRight: 'right',
    }

    state.players[id].direction = directions[keyPressed]
  }
  
  function movePlayer({ id }) {
    const player = state.players[id]
    const direction = player.direction

    const movement = {
      up: player => {
        let newPos = player.y - 1
        if (newPos < 0) {
          newPos = screen.height
        }
        player.y = newPos
      },
      down: player => {
        let newPos = player.y + 1
        if (newPos > screen.height) {
          newPos = 0
        }
        player.y = newPos
      },
      left: player => {
        let newPos = player.x - 1
        if (newPos < 0) {
          newPos = screen.width
        }
        player.x = newPos
      },
      right: player => {
        let newPos = player.x + 1
        if (newPos > screen.width) {
          newPos = 0
        }
        player.x = newPos
      },
    }

    const move = movement[direction]
    
    if (player && move) {
      move(player)
      checkForFruitCollision(player)
    }
  }

  function checkForFruitCollision(player) {
    for (const fruitId in state.fruits) {
      const fruit = state.fruits[fruitId]

      if (player.x === fruit.x && player.y === fruit.y) {
        removeFruit(fruitId)
      }
    }
  }
  
  function startMove(playerId) {
    setTimeout(() => {
      movePlayer({ id: playerId })
      startMove(playerId)
    }, 500)
  }

  return {
    setDirection,
    addPlayer,
    removePlayer,
    addFruit,
    removeFruit,
    state,
  }
}