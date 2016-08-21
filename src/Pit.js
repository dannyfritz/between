import SAT from "sat"
import _ from "lodash"

export default class Tunnel {
  constructor (vTopLeft, vTopRight)
  {
    this.speed = 7
    this.vertices = []
    const vBottomLeft = _.clone(vTopLeft)
    const vBottomRight = _.clone(vTopRight)
    const height = 3 + Math.random() * 35
    const horizontalOffset = Math.random() * 40 - 20
    vBottomLeft.y += height
    vBottomRight.y += height
    vBottomLeft.x += horizontalOffset
    vBottomRight.x += horizontalOffset
    if (vBottomLeft.x < 0)
    {
      const offset = vBottomLeft.x
      vBottomRight.x -= offset
      vBottomLeft.x -= offset
    }
    if (vBottomRight.x > 100)
    {
      const offset = vBottomRight.x - 100
      vBottomRight.x -= offset
      vBottomLeft.x -= offset
    }
    this.vertices = [vTopLeft, vTopRight, vBottomRight, vBottomLeft]
  }
  update (dt)
  {
    this.vertices.forEach((v) => v.y -= dt * this.speed)
  }
  draw (canvas)
  {
    canvas.line(this.vertices[0], this.vertices[3])
    canvas.line(this.vertices[1], this.vertices[2])
  }
  getTopRight ()
  {
    return this.vertices[1]
  }
  getBottomRight ()
  {
    return this.vertices[2]
  }
  getBottomLeft ()
  {
    return this.vertices[3]
  }
  getRightSide ()
  {
    return this.vertices[1].x
  }
  getBottomSide ()
  {
    return this.vertices[2].y
  }
  toShape ()
  {
    return new SAT.Polygon(
      new SAT.Vector(0, 0),
      this.vertices.map((v) => new SAT.Vector(v.x, v.y))
    )
  }
}
