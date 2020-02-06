export default function createGame(screen) {
  const state = {
    players: {},
    fruits: {}
  }

  function addPlayer(command) {
    const x = command.x
    const y = command.y
    state.players[command.id] = { x, y }
  }

  function removePlayer(id) {
    delete state.players[id]
  }

  function addFruit(command) {
    const x = command.x
    const y = command.y
    state.fruits[command.id] = { x, y }
  }

  function removeFruit(id) {
    delete state.fruits[id]
  }
  
  function movePlayer(command) {
    const keyPressed = command.keyPressed
    const player = state.players[command.playerId]

    const movement = {
      ArrowUp: player => {
        const newPos = player.y - 1
        if (newPos >= 0) {
          player.y = newPos
        }
      },
      ArrowDown: player => {
        const newPos = player.y + 1
        if (newPos < screen.height) {
          player.y = newPos
        }
      },
      ArrowLeft: player => {
        const newPos = player.x - 1
        if (newPos >= 0) {
          player.x = newPos
        }
      },
      ArrowRight: player => {
        const newPos = player.x + 1
        if (newPos < screen.width) {
          player.x = newPos
        }
      },
    }

    const move = movement[keyPressed]
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

  return {
    movePlayer,
    addPlayer,
    removePlayer,
    addFruit,
    removeFruit,
    state,
  }
}