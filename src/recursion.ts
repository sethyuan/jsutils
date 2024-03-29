import { Stack } from "./stack"

type Locals = { [key: string]: any }

class Context<Param, Return> {
  param: Param
  returns?: Return[]
  locals?: Locals

  constructor(param: Param, locals?: Locals) {
    this.param = param
    this.locals = locals
  }
}

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
 * **NOTE:** Because it has only 2 phases, it can't support all kinds
 * of recursion usage, for more complex usages you can use {@link recurse}.
 * For simpler ones however, this function is faster.
 *
 * @example
 * ```ts
 * function factorial(n: number) {
 *   return rec2iter(
 *     (n, context) => {
 *       if (n <= 1) return 1
 *       context.recursions = [n - 1]
 *     },
 *     (n, [fac_n_minus_1]) => n * fac_n_minus_1,
 *     n,
 *   )
 * }
 * ```
 *
 * @param start The start phase where you write everything that runs before
 * recursive calls. You also specify what recursions you want to run next
 * here.
 * @param consume The consume phase where you can get all recursive calls'
 * return values.
 * @param param The initial parameters to kick off the recursion.
 *
 * @returns The result of the whole recursion.
 */
export function rec2iter<Param, Return>(
  start: (param: Param, context: StartContext<Param>) => Return | void,
  consume: (param: Param, returns?: Return[], locals?: Locals) => Return,
  param: Param,
) {
  const stack = new Stack(new Item(param, FRAME))
  const contextStack = new Stack<Context<Param, Return>>(new Context(param))
  while (stack.length > 0) {
    const { param, type } = stack.pop()!
    if (type === FRAME) {
      const startContext: StartContext<Param> = {}
      const v = start(param, startContext)
      if (startContext.recursions?.length) {
        contextStack.push(new Context(param, startContext.locals))
        stack.push(new Item(param, ITEM))
        stack.pushAll(
          startContext.recursions.map(
            (recursionParam) => new Item(recursionParam, FRAME),
          ),
          true,
        )
      } else {
        const context = contextStack.peek()!
        if (context.returns === undefined) {
          context.returns = []
        }
        context.returns.push(v!)
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
  return contextStack.pop()!.returns?.pop() as Return
}

/**
 * It implements an iterative execution of the given recursion. That is,
 * you write an algorithm in a recursive way, but you get an iterative
 * execution of it.
 *
 * @example
 * ```ts
 * function factorial(n: number) {
 *   return recurse<number, number>(function* (n) {
 *     if (n <= 1) return 1
 *     return n * (yield n - 1)
 *   }, n)
 * }
 * ```
 *
 * @param body A generator function working as the main body for recursion,
 * it yields recursions.
 * @param initialParam Initial parameter.
 */
export function recurse<Param, Return>(
  body: (param: Param) => Generator<Param, Return, Return>,
  initialParam: Param,
) {
  const stack = new Stack<[Param, Generator<Param, Return, Return> | null]>([
    initialParam,
    null,
  ])
  const contextStack = new Stack<Return>()
  while (stack.length > 0) {
    const [param, control] = stack.pop()!
    if (control === null) {
      const control = body(param)
      const { value, done } = control.next()
      if (!done) {
        // has more recursions to do.
        stack.push([param, control])
        stack.push([value as Param, null])
      } else {
        contextStack.push(value as Return)
      }
    } else {
      const returns = contextStack.peek()!
      const { value, done } = control.next(returns)
      if (!done) {
        // has more recursions to do.
        stack.push([param, control])
        stack.push([value as Param, null])
      } else {
        contextStack.pop()
        if (value !== undefined) {
          contextStack.push(value as Return)
        }
      }
    }
  }
  return contextStack.pop() as Return
}
