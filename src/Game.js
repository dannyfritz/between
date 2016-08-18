import Player from "./Player"
import Tunnel from "./Tunnel"

export default class Game {
  constructor ()
  {
    this.player = new Player(0, 0, 1)
    this.tunnel = new Tunnel(
      {x: 0, y: 0},
      {x: 10, y: 0},
      {x: 8, y: 12},
      {x: 2, y: 15}
    )
  }
  update (dt)
  {
    this.player.update(dt)
    if (!this.player.insideOf(this.tunnel))
    {
      console.log("you lose")
    }
    this.tunnel.update(dt)
  }
  draw (canvas)
  {
    canvas.clear()
    this.player.draw(canvas)
    this.tunnel.draw(canvas)
  }
}
