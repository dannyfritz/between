import nodeAssert from "Assert"

//eslint-disable-next-line brace-style
export let assert = () => {}

if (DEBUG)
{
  assert = nodeAssert
}
