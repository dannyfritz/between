import Timer from "./Timer"
import Canvas from "./Canvas"
import _ from "lodash"
import newMoody from "moody"

export default class Runtime {
  constructor ()
  {
    //eslint-disable-next-line no-console
    console.log(`Between is running in ${process.env.NODE_ENV} mode.`)
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
  push (newState)
  {
    this.moody.push(newState, _.tail(arguments))
  }
  pop ()
  {
    return this.moody.pop()
  }
}

export const runtime = new Runtime()
