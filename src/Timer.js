import { assert } from "./debug"

export default class Timer {
  constructor ()
  {
    this.startDate = new Date()
    this.lastDate = this.startDate
    this.dt = 0
  }
  update ()
  {
    const now = new Date()
    this.dt = now.getTime() - this.lastDate.getTime() || 1
    assert(this.dt > 0)
    this.lastDate = now
  }
}
