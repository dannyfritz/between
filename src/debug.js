import nodeAssert from "Assert"

//eslint-disable-next-line brace-style
export let assert = () => {}
//eslint-disable-next-line brace-style
export let log = () => {}

if (DEBUG)
{
  assert = nodeAssert
  // eslint-disable-next-line no-console
  log = console.log
}
