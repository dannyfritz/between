import Player from "./Player"
import Tunnel from "./Tunnel"
import Pit from "./Pit"
import _ from "lodash"
import Menu from "./Menu"
import fond from "fond"
const { Audio, Debug, Graphics } = fond
import runtime from "./runtime"
const { assert, log } = Debug

export default class Game {
  constructor ()
  {
    this.player = new Player(50, 50, 1)
    this.tunnels = []
    this.pits = []
    this.cooldown = 5
    this.score = 0
    this.audio = new Audio()
  }
  enter ()
  {
    this.graphics = new Graphics()
    this.graphics.addToDom()
    this.graphics.fitWindow()
    this.music = this.audio.newSource(
      "./assets/01_Another_World_The_Other_Side_LukHash.mp3"
    )
    this.music.currentTime = 15
  }
  leave ()
  {
    this.graphics.removeFromDom()
    this.music.pause()
  }
  update (dt)
  {
    this.player.update(dt)
    if (this.cooldown > 0)
    {
      this.cooldown -= dt
    }
    else
    {
      this.score += dt * 100
    }
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
    if (this.isGameLost() && this.cooldown <= 0)
    {
      log("You lost")
      runtime.swap(new Menu())
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
  draw ()
  {
    this.graphics.clear()
    this.graphics.letterBox()
    this.pits.forEach((pit) => pit.draw(this.graphics))
    this.tunnels.forEach((tunnel) => tunnel.draw(this.graphics))
    this.player.draw(this.graphics)
    if (this.cooldown > 0)
    {
      this.graphics.context.font = "48px serif"
      this.graphics.text({x: 10, y: 10}, Math.ceil(this.cooldown))
    }
    else
    {
      this.graphics.context.font = "48px serif"
      this.graphics.text({x: 10, y: 10}, Math.round(this.score))
    }
  }
}
