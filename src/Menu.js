import Player from "./Player"
import fond, { Keyboard } from "../fond"
import Game from "./Game"
import SAT from "SAT"

export default class Menu
{
  constructor ()
  {
    this.player = new Player(50, 50, 1)
    this.keyboard = new Keyboard()
    this.menuItems = [
      new MenuItem({x: 25, y: 25}, "Play", () =>
      {
        fond.push(new Game())
      }),
      new MenuItem({x: 25, y: 75}, "How to Play", () =>
      {
        fond.push(new Game())
      }),
    ]
  }
  update (dt)
  {
    this.player.update(dt)
    this.menuItems.forEach((menuItem) =>
    {
      if (this.player.overlap(menuItem) > 0)
      {
        menuItem.fillColor = "blue"
      }
      else
      {
        menuItem.fillColor = "black"
      }
    })
    if (this.keyboard.isKeyDown("space"))
    {
      this.menuItems.forEach((menuItem) =>
      {
        if (this.player.overlap(menuItem) > 0)
        {
          menuItem.activate()
        }
      })
    }
  }
  draw (canvas)
  {
    canvas.clear()
    this.player.draw(canvas)
    this.menuItems.forEach((menuItem) => menuItem.draw(canvas))
  }
}

class MenuItem
{
  constructor (v, text, callback)
  {
    this.v = v
    this.text = text
    this.callback = callback
  }
  update ()
  {

  }
  draw (canvas)
  {
    canvas.push()
    canvas.context.fillStyle = this.fillColor || "black"
    canvas.context.strokeStyle = this.fillColor || "black"
    canvas.context.textBaseline = "hanging"
    canvas.context.font = "48px serif"
    canvas.text(this.v, this.text)
    const shape = this.toShape()
    canvas.polygon(shape.points)
    canvas.pop()
  }
  toShape ()
  {
    return new SAT.Polygon(
      new SAT.Vector(),
      [
        new SAT.Vector(this.v.x, this.v.y),
        new SAT.Vector(this.v.x + 50, this.v.y),
        new SAT.Vector(this.v.x + 50, this.v.y + 10),
        new SAT.Vector(this.v.x, this.v.y + 10),
      ]
    )
  }
  activate ()
  {
    this.callback()
  }
}
