import { Stack } from "./stack"

type Locals = { [key: string]: any }
type Context<Param, Return> = {
  param: Param
  returns?: Return[]
  locals?: Locals
}

const ITEM = 0
const FRAME = 1
type ItemType = typeof ITEM | typeof FRAME
type Item<Param> = [Param, ItemType]

/**
 * You can use this context for storing local variables and/or specify
 * recursions you need to perform and their parameters.
 */
export type StartContext<Param> = {
  /**
   * You can set local variables for the current call with this.
   */
  locals?: Locals
  /**
   * Specify all the recursions and their parameters with this.
   */
  recursions?: Param[]
}

/**
 * It implements an iterative execution of the given recursion. That is,
 * you write an algorithm in a recursive way, but you get an iterative
 * execution of it.
 *
 * The running is divided into 2 phases. In `start` phase, you write
 * everything that runs before recursions, you also specify recursions
 * you want to run here; In `consume` phase, you consume all the recursive
 * calls' returns.
 *
 * @example
 * ```ts
 * function factorial(n: number) {
 *   return rec2iter(
 *     n,
 *     (n, context) => {
 *       if (n <= 1) return 1
 *       context.recursions = [n - 1]
 *     },
 *     (n, [fac_n_minus_1]) => n * fac_n_minus_1,
 *   )
 * }
 * ```
 *
 * @param param The initial parameters to kick off the recursion.
 * @param start The start phase where you write everything that runs before
 * recursive calls. You also specify what recursions you want to run next
 * here.
 * @param consume The consume phase where you can get all recursive calls'
 * return values.
 *
 * @returns The result of the whole recursion.
 */
export function rec2iter<Param, Return>(
  param: Param,
  start: (param: Param, context: StartContext<Param>) => Return,
  consume: (param: Param, returns?: Return[], locals?: Locals) => Return,
) {
  const stack = new Stack<Item<Param>>([param, FRAME])
  const contextStack = new Stack<Context<Param, Return>>({ param })
  while (stack.length > 0) {
    const [param, type] = stack.pop()!
    if (type === FRAME) {
      const startContext: StartContext<Param> = {}
      const v = start(param, startContext)
      if (startContext.recursions?.length) {
        contextStack.push({ param, locals: startContext.locals })
        stack.push([param, ITEM])
        stack.pushAll(
          startContext.recursions.map((recursionParam) => [
            recursionParam,
            FRAME,
          ]),
          true,
        )
      } else {
        const context = contextStack.peek()!
        if (context.returns === undefined) {
          context.returns = []
        }
        context.returns.push(v)
      }
    } /* type === ITEM */ else {
      const { param, returns, locals } = contextStack.pop()!
      const ret = consume(param, returns, locals)
      if (ret !== undefined) {
        const context = contextStack.peek()!
        if (context.returns === undefined) {
          context.returns = []
        }
        context.returns.push(ret)
      }
    }
  }
  return contextStack.pop()!.returns?.pop()
}
