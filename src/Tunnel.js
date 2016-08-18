import SAT from "sat"

export default class Tunnel {
  constructor (v1, v2, v3, v4)
  {
    this.vertices = [v1, v2, v3, v4]
    this.speed = 5
  }
  update (dt)
  {
    this.vertices.forEach((v) => v.x += dt * this.speed)
  }
  draw (canvas)
  {
    canvas.polygon(this.vertices)
  }
  toShape ()
  {
    return new SAT.Polygon(
      new SAT.Vector(0, 0),
      this.vertices.map((v) => new SAT.Vector(v.x, v.y))
    )
  }
}
