import Timer from "./Timer"
import Canvas from "./Canvas"
import newMoody from "moody"

export default class Runtime {
  constructor ()
  {
    this.timer = new Timer()
    this.moody = newMoody()
    this.canvas = new Canvas()
    this.canvas.addToDom()
    this.canvas.fitWindow()
  }
  run ()
  {
    this.timer.update()
    this.moody.execute("update", this.timer.dt)
    this.moody.execute("draw", this.canvas)
    this.canvas.letterBox()
    requestAnimationFrame(() => this.run())
  }
  push (newState, ...args)
  {
    this.moody.push(newState, args)
  }
  pop ()
  {
    return this.moody.pop()
  }
}
