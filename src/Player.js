import SAT from "sat"
import { Keyboard, Debug } from "../fond"
const { assert } = Debug
export default class Player {
  constructor (x, y, radius)
  {
    this.keyboard = new Keyboard()
    this.controls = {
      up: "up",
      down: "down",
      left: "left",
      right: "right",
    }
    this.v = {x, y}
    this.speed = 30
    this.radius = radius
  }
  update (dt)
  {
    if (this.keyboard.isKeyDown(this.controls.up))
    {
      this.v.y -= dt * this.speed
    }
    if (this.keyboard.isKeyDown(this.controls.down))
    {
      this.v.y += dt * this.speed
    }
    if (this.keyboard.isKeyDown(this.controls.left))
    {
      this.v.x -= dt * this.speed
    }
    if (this.keyboard.isKeyDown(this.controls.right))
    {
      this.v.x += dt * this.speed
    }
    this.v.y = Math.max(this.v.y, 0)
    this.v.y = Math.min(this.v.y, 100)
    this.v.x = Math.max(this.v.x, 0)
    this.v.x = Math.min(this.v.x, 100)
  }
  draw (canvas)
  {
    canvas.circle(
      {x: this.v.x, y: this.v.y},
      this.radius
    )
  }
  isInsideOf (other)
  {
    assert(other.toShape)
    const response = new SAT.Response()
    SAT.testCirclePolygon(this.toShape(), other.toShape(), response)
    return response.aInB
  }
  overlap (other)
  {
    assert(other.toShape)
    const response = new SAT.Response()
    if (SAT.testCirclePolygon(this.toShape(), other.toShape(), response))
    {
      return response.overlap
    }
    return 0
  }
  toShape ()
  {
    return new SAT.Circle(new SAT.Vector(this.v.x, this.v.y), this.radius)
  }
}
