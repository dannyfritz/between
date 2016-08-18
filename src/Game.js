import Player from "./Player"
import Tunnel from "./Tunnel"
import _ from "lodash"
import { assert } from "./debug"

export default class Game {
  constructor ()
  {
    this.player = new Player(1, 50, 1)
    this.tunnels = [new Tunnel(
      {x: -5, y: 40},
      {x: -5, y: 60}
    )]
  }
  update (dt)
  {
    this.player.update(dt)
    while (this.isNeedingMoreTunnels())
    {
      const lastTunnel = _.last(this.tunnels)
      assert(lastTunnel)
      this.tunnels.push(
        new Tunnel(lastTunnel.getTopRight(), lastTunnel.getBottomRight())
      )
    }
    this.tunnels.forEach((tunnel) => tunnel.update(dt))
    if (this.isGameLost())
    {
      console.log("You lost")
    }
    _.remove(this.tunnels, (tunnel) => tunnel.getRightSide() < 0)
  }
  isGameLost ()
  {
    let lost = this.tunnels.every((tunnel) => !this.player.isInsideOf(tunnel))
    if (!lost)
    {
      return false
    }
    lost = this.tunnels.reduce(
      (sum, tunnel) => sum += this.player.overlap(tunnel)
    , 0)
    return lost < this.player.radius * 2
  }
  isNeedingMoreTunnels ()
  {
    return !_.last(this.tunnels) || _.last(this.tunnels).getRightSide() <= 100
  }
  draw (canvas)
  {
    canvas.clear()
    this.player.draw(canvas)
    this.tunnels.forEach((tunnel) => tunnel.draw(canvas))
  }
}
