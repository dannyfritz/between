import Player from "./Player"
import Tunnel from "./Tunnel"

export default class Game {
  constructor ()
  {
    this.player = new Player(0, 0, 10)
    this.tunnel = new Tunnel(
      {x: 0, y: 0},
      {x: 100, y: 0},
      {x: 80, y: 120},
      {x: 20, y: 150}
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
