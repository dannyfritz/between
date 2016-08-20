import Player from "./Player"
import Tunnel from "./Tunnel"
import Pit from "./Pit"
import _ from "lodash"
import { assert } from "./debug"

export default class Game {
  constructor ()
  {
    this.player = new Player(1, 50, 1)
    this.tunnels = []
    this.pits = []
  }
  update (dt)
  {
    this.player.update(dt)
    while (this.isNeedingMoreTunnels())
    {
      const lastTunnel = _.last(this.tunnels) || new Tunnel(
          {x: -500, y: 40},
          {x: -500, y: 60}
        )
      assert(lastTunnel)
      this.tunnels.push(
        new Tunnel(lastTunnel.getTopRight(), lastTunnel.getBottomRight())
      )
    }
    while (this.isNeedingMorePits())
    {
      const lastPit = _.last(this.pits) || new Pit(
          {x: 40, y: -500},
          {x: 60, y: -500}
        )
      assert(lastPit)
      this.pits.push(
        new Pit(lastPit.getBottomLeft(), lastPit.getBottomRight())
      )
    }
    this.tunnels.forEach((tunnel) => tunnel.update(dt))
    this.pits.forEach((pit) => pit.update(dt))
    if (this.isGameLost())
    {
      console.log("You lost")
    }
    _.remove(this.tunnels, (tunnel) => tunnel.getRightSide() < -500)
    _.remove(this.pits, (pit) => pit.getBottomSide() < -500)
  }
  isGameLost ()
  {
    const tunnelIn = this.tunnels.every((tunnel) => this.player.isInsideOf(tunnel))
    const pitIn = this.pits.every((pit) => this.player.isInsideOf(pit))
    if (tunnelIn && pitIn)
    {
      return false
    }
    const tunnelOverlap = this.tunnels.reduce(
      (sum, tunnel) => sum += this.player.overlap(tunnel)
    , 0)
    if (tunnelOverlap < this.player.radius * 2)
    {
      return true
    }
    const pitOverlap = this.pits.reduce(
      (sum, pit) => sum += this.player.overlap(pit)
    , 0)
    if (pitOverlap < this.player.radius * 2)
    {
      return true
    }
    return false
  }
  isNeedingMoreTunnels ()
  {
    return !_.last(this.tunnels) || _.last(this.tunnels).getRightSide() <= 500
  }
  isNeedingMorePits ()
  {
    return !_.last(this.pits) || _.last(this.pits).getBottomSide() <= 500
  }
  draw (canvas)
  {
    canvas.clear()
    this.pits.forEach((pit) => pit.draw(canvas))
    this.tunnels.forEach((tunnel) => tunnel.draw(canvas))
    this.player.draw(canvas)
  }
}
