import SAT from "sat"
import Keyboard from "./Keyboard"
import { assert } from "./debug"

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
    this.x = x
    this.y = y
    this.speed = 10
    this.radius = radius
  }
  update (dt)
  {
    if (this.keyboard.isKeyDown(this.controls.up))
    {
      this.y -= dt * this.speed
    }
    if (this.keyboard.isKeyDown(this.controls.down))
    {
      this.y += dt * this.speed
    }
    if (this.keyboard.isKeyDown(this.controls.left))
    {
      this.x -= dt * this.speed
    }
    if (this.keyboard.isKeyDown(this.controls.right))
    {
      this.x += dt * this.speed
    }
  }
  draw (canvas)
  {
    canvas.circle(
      {x: this.x, y: this.y},
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
    return new SAT.Circle(new SAT.Vector(this.x, this.y), this.radius)
  }
}
