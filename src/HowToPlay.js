import Menu from "./Menu"
import fond from "fond"
const { Graphics, Keyboard } = fond
import runtime from "./runtime"

export default class Game {
  constructor ()
  {
    this.keyboard = new Keyboard()
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
  update ()
  {
    if (this.keyboard.isKeyDown("Escape") || this.keyboard.isKeyDown(" "))
    {
      runtime.swap(new Menu())
    }
  }
  draw ()
  {
    this.graphics.clear()
    this.graphics.letterBox()
    this.graphics.context.font = "48px serif"
    this.graphics.text({x: 10, y: 10}, "How do I play!?")
    this.graphics.context.font = "24px serif"
    this.graphics.text({x: 10, y: 10+4+3*0}, "Use the arrow keys to moves around.")
    this.graphics.text({x: 10, y: 10+4+3*2}, "Stay inside both the horizontal and vertical tunnels.")
    this.graphics.text({x: 10, y: 10+4+3*4}, "Escape to go back")
  }
}
