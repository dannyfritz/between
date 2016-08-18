import Player from "./Player"

export default class Game {
  constructor ()
  {
    this.player = new Player(0, 0, 10)
  }
  update (dt)
  {
    this.player.update(dt)
  }
  draw (canvas)
  {
    canvas.clear()
    this.player.draw(canvas)
  }
}
