export default function renderScreen(screen, game, requestAnimationFrame) {
  const context = screen.getContext('2d')
  context.fillStyle = 'white'
  context.clearRect(0, 0, 10, 10)

  for (const id in game.state.players) {
    const player = game.state.players[id]
    context.fillStyle = 'black'
    context.fillRect(player.x, player.y, 1, 1)
  }

  for (const id in game.state.fruits) {
    const fruit = game.state.fruits[id]
    context.fillStyle = 'red'
    context.fillRect(fruit.x, fruit.y, 1, 1)
  }

  requestAnimationFrame(() => renderScreen(screen, game, requestAnimationFrame))
}
