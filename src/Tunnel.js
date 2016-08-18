import SAT from "sat"
import _ from "lodash"

export default class Tunnel {
  constructor (vTopLeft, vBottomLeft)
  {
    const vTopRight = _.clone(vTopLeft)
    const vBottomRight = _.clone(vBottomLeft)
    const width = 5 + Math.random() * 30
    const verticalOffset = Math.random() * 30 - 15
    vTopRight.x += width
    vBottomRight.x += width
    vTopRight.y += verticalOffset
    vBottomRight.y += verticalOffset
    this.vertices = [vTopLeft, vTopRight, vBottomRight, vBottomLeft]
    this.speed = 5
  }
  update (dt)
  {
    this.vertices.forEach((v) => v.x -= dt * this.speed)
  }
  draw (canvas)
  {
    canvas.polygon(this.vertices)
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
