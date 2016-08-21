import SAT from "sat"
import _ from "lodash"

export default class Tunnel {
  constructor (vTopLeft, vBottomLeft)
  {
    this.speed = 5
    this.vertices = []
    const vTopRight = _.clone(vTopLeft)
    const vBottomRight = _.clone(vBottomLeft)
    const width = 3 + Math.random() * 35
    const verticalOffset = Math.random() * 40 - 20
    vTopRight.x += width
    vBottomRight.x += width
    vTopRight.y += verticalOffset
    vBottomRight.y += verticalOffset
    if (vBottomRight.y > 100)
    {
      const offset = vBottomRight.y - 100
      vBottomRight.y -= offset
      vTopRight.y -= offset
    }
    if (vTopRight.y < 0)
    {
      const offset = vTopRight.y
      vBottomRight.y -= offset
      vTopRight.y -= offset
    }
    this.vertices = [vTopLeft, vTopRight, vBottomRight, vBottomLeft]
  }
  update (dt)
  {
    this.vertices.forEach((v) => v.x -= dt * this.speed)
  }
  draw (canvas)
  {
    canvas.line(this.vertices[0], this.vertices[1])
    canvas.line(this.vertices[3], this.vertices[2])
  }
  getTopRight ()
  {
    return this.vertices[1]
  }
  getBottomRight ()
  {
    return this.vertices[2]
  }
  getRightSide ()
  {
    return this.vertices[1].x
  }
  toShape ()
  {
    return new SAT.Polygon(
      new SAT.Vector(0, 0),
      this.vertices.map((v) => new SAT.Vector(v.x, v.y))
    )
  }
}
