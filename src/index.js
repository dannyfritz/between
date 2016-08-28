import runtime from "./runtime"
import Menu from "./Menu"

//eslint-disable-next-line no-console
console.log(`Between is running in ${process.env.NODE_ENV} mode.`)

runtime.push(new Menu())
runtime.run()
