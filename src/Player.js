import SAT from "sat"
import Keyboard from "./Keyboard"

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
    this.speed = 100
    this.radius = radius
    this.shape = new SAT.Circle(new SAT.Vector(x, y), radius)
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
    this.updateShape()
  }
  updateShape ()
  {
    this.shape.pos.y = this.y
    this.shape.pos.x = this.x
    this.shape.radius = this.radius
  }
  draw (canvas)
  {
    canvas.circle(
      this.x, this.y,
      this.radius
    )
  }
}
