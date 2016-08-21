import Player from "./Player"
import fond, { Graphics, Keyboard } from "fond"
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
        fond.swap(new Game())
      }),
      new MenuItem({x: 25, y: 75}, "How to Play", () =>
      {
        fond.swap(new Game())
      }),
    ]
  }
  enter ()
  {
    this.graphics = new Graphics()
    this.graphics.addToDom()
    this.graphics.fitWindow()
  }
  leave ()
  {
    this.graphics.removeFromDom()
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
  draw ()
  {
    this.graphics.clear()
    this.player.draw(this.graphics)
    this.menuItems.forEach((menuItem) => menuItem.draw(this.graphics))
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
  draw (graphics)
  {
    graphics.push()
    graphics.context.fillStyle = this.fillColor || "black"
    graphics.context.strokeStyle = this.fillColor || "black"
    graphics.context.textBaseline = "hanging"
    graphics.context.font = "48px serif"
    graphics.text(this.v, this.text)
    const shape = this.toShape()
    graphics.polygon(shape.points)
    graphics.pop()
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
