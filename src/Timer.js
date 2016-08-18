export default class Timer {
  constructor ()
  {
    this.startDate = new Date()
    this.lastDate = this.startDate
    this.dt = 0
  }
  step ()
  {
    const now = new Date()
    this.dt = now.getTime() - this.lastDate.getTime()
    this.lastDate = now
  }
}
