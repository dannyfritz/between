// eslint-disable-next-line no-console
console.log(`Between running in ${process.env.NODE_ENV} mode.`)

import Game from "./Game"

const game = new Game()
game.run()
