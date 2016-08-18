import { assert } from "./debug"

export default class Canvas {
  constructor ()
  {
    this.canvas = document.createElement("canvas")
    this.context = this.canvas.getContext("2d")
    assert(this.context !== null, "Browser must support Canvas 2d")
  }
  addToDom (targetDomElement = document.body)
  {
    targetDomElement.appendChild(this.canvas)
  }
  fitWindow ()
  {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    this.canvas.style.display = "block"
    document.addEventListener("resize", () =>
    {
      this.fitWindow()
    })
  }
  longestEdge ()
  {
    const width = this.canvas.width
    const height = this.canvas.height
    return width > height ? width : height
  }
  shortestEdge ()
  {
    const width = this.canvas.width
    const height = this.canvas.height
    return width < height ? width : height
  }
  clear ()
  {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }
  circle (x, y, radius)
  {
    this.context.beginPath()
    this.context.arc(x, y, radius, 0, 360)
    this.context.stroke()
  }
}
