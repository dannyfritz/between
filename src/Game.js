import Canvas from "./Canvas"
import Timer from "./Timer"

export default class Game {
  constructor ()
  {
    this.timer = new Timer()
    this.canvas = new Canvas()
  }
  run ()
  {
    this.timer.update()
    this.update(this.timer.dt)
    this.draw()
    requestAnimationFrame(() => this.run())
  }
  update (dt)
  {
    console.log(dt)
  }
  draw ()
  {
    // console.log("draw")
  }
}