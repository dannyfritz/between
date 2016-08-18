import { assert } from "./debug"

export const keyEnum = Object.freeze({
  "up": "ArrowUp",
  "down": "ArrowDown",
  "left": "ArrowLeft",
  "right": "ArrowRight",
  "w": "KeyW",
  "s": "KeyS",
  "a": "KeyA",
  "d": "KeyD",
})

export default class Keyboard {
  constructor ()
  {
    this.keyState = {}
    for (const key in keyEnum)
    {
      this.keyState[keyEnum[key]] = false
    }
    this.addEvents()
  }
  addEvents ()
  {
    document.addEventListener("keydown", this.keyDownEvent.bind(this))
    document.addEventListener("keyup", this.keyUpEvent.bind(this))
  }
  keyDownEvent (event)
  {
    event.preventDefault()
    this.keyState[event.code] = true
  }
  keyUpEvent (event)
  {
    event.preventDefault()
    this.keyState[event.code] = false
  }
  onKeyPressed (code, callback)
  {

  }
  onKeyReleased (key, callback)
  {

  }
  keyToCode (key)
  {
    assert(keyEnum[key], `${key} is not in keyEnum`)
    return keyEnum[key]
  }
  isKeyDown (key)
  {
    return this.keyState[this.keyToCode(key)]
  }
}
