import fond from "../fond"
import Menu from "./Menu"

//eslint-disable-next-line no-console
console.log(`Between is running in ${process.env.NODE_ENV} mode.`)
fond.push(new Menu())
fond.run()
