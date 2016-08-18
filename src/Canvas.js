import { assert } from "./debug"

export default class Canvas {
  constructor (targetDomElement = document.body)
  {
    this.canvas = document.createElement("canvas")
    this.context = this.canvas.getContext("2d")
    assert(this.context !== null)
    targetDomElement.appendChild(this.canvas)
    this.fitWindow()
    this.addEvents()
  }
  addEvents ()
  {
    window.addEventListener("resize", () =>
    {
      this.fitWindow()
    })
  }
  fitWindow ()
  {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
  }
}
