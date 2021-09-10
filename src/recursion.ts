import { Stack } from "./stack"

type Context<Param, Return> = [Param, Return[]]

const ITEM = 0
const FRAME = 1

type ItemType = typeof ITEM | typeof FRAME

class Item<Param> {
  param: Param
  type: ItemType

  constructor(param: Param, type: ItemType) {
    this.param = param
    this.type = type
  }
}

export function rec2iter<Param, Return>(
  param: Param,
  starting: (param: Param) => Return | undefined,
  recursions: (param: Param) => Param[],
  consuming: (param: Param, returns: Return[]) => void,
) {
  const stack = new Stack(new Item(param, FRAME))
  const contextStack = new Stack<Context<Param, Return>>([param, []])
  while (stack.length > 0) {
    const { param, type } = stack.pop()!
    if (type === FRAME) {
      const v = starting(param)
      if (v === undefined) {
        stack.push(new Item(param, ITEM))
        stack.pushAll(
          recursions(param).map((x) => new Item(x, FRAME)),
          true,
        )
        contextStack.push([param, []])
      } else {
        contextStack.peek()![1].push(v)
      }
    } else {
      const context = contextStack.pop()!
      const ret = consuming(...context)
      if (ret !== undefined) {
        contextStack.peek()![1].push(ret)
      }
    }
  }
  return contextStack.pop()![1].pop()
}
