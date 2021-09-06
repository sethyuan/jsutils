import { Queue } from "./queue"
import { Stack } from "./stack"

/**
 * A function that returns the subnodes if any given a node.
 */
export type ChildrenGetter<T> = (node: T) => T[] | undefined | null

/**
 * Context of the current node non-leaf node.
 */
export class Context<Params, Return> {
  /**
   * Parameters given to the current processing.
   */
  params: Params
  /**
   * Local data specific to this context.
   */
  locals: { [key: string]: any }
  /**
   * The value of each child after evaluation.
   */
  childReturns: Return[]

  constructor(
    params: Params,
    locals: { [key: string]: any },
    childReturns: Return[],
  ) {
    this.params = params
    this.locals = locals
    this.childReturns = childReturns
  }
}

export type Handler<T, Params, Return> = (
  node: T,
  context: Context<Params, Return>,
  index: number,
) => boolean | void

export type PostHandler<T, Params, Return> = (
  node: T,
  context: Context<Params, Return>,
  index: number,
) => {
  value: Return
  interrupt?: boolean
}

export type DfOptions<T, Params, Return> = {
  preHandler?: Handler<T, Params, Return>
  postHandler?: PostHandler<T, Params, Return>
  inHandler?: Handler<T, Params, Return>
  leafHandler?: Handler<T, Params, Return>
}

const NODE = 0
const LEAF = 1
const PRE = 2
const IN = 3
const POST = 4

type NodeType = typeof NODE | typeof LEAF | typeof PRE | typeof IN | typeof POST

class Node<T> {
  node: T
  index: number
  type: NodeType

  constructor(node: T, index: number, type: NodeType) {
    this.node = node
    this.index = index
    this.type = type
  }
}

export function dfs<T, Params, Return>(
  root: T,
  children: ChildrenGetter<T>,
  params: Params,
  {
    preHandler,
    postHandler,
    inHandler,
    leafHandler,
  }: DfOptions<T, Params, Return> = {},
) {
  const nodeStack = new Stack(
    new Node(root, 0, children(root)?.length ? NODE : LEAF),
  )
  const contextStack = new Stack<Context<Params, Return>>(
    new Context<Params, Return>(params, {}, []),
  )
  while (nodeStack.length > 0) {
    const { node, index, type } = nodeStack.pop()!
    if (type === NODE) {
      nodeStack.push(new Node(node, index, POST))
      const subnodes = children(node)!
      const len = subnodes.length
      const half = (subnodes.length / 2) >> 0
      for (let i = len - 1; i >= half; i--) {
        const subnode = subnodes[i]
        nodeStack.push(
          new Node(subnode, i, children(subnode)?.length ? NODE : LEAF),
        )
      }
      nodeStack.push(new Node(node, index, IN))
      for (let i = half - 1; i >= 0; i--) {
        const subnode = subnodes[i]
        nodeStack.push(
          new Node(subnode, i, children(subnode)?.length ? NODE : LEAF),
        )
      }
      nodeStack.push(new Node(node, index, PRE))
    } else if (type === PRE) {
      contextStack.push(
        new Context<Params, Return>(contextStack.peek()!.params, {}, []),
      )
      if (!preHandler) continue
      const context = contextStack.peek()!
      contextStack.push(context)
      if (preHandler(node, context, index)) break
    } else if (type === IN) {
      if (!inHandler) continue
      const context = contextStack.peek()!
      if (inHandler(node, context, index)) break
    } else if (type === POST) {
      const context = contextStack.pop()!
      if (!postHandler) continue
      const { value, interrupt } = postHandler(node, context, index)
      contextStack.peek()!.childReturns[index] = value
      if (interrupt) break
    } else if (type === LEAF) {
      if (!leafHandler) continue
      const context = contextStack.peek()!
      if (leafHandler(node, context, index)) break
    }
  }
  return contextStack.pop()!.childReturns.pop()
}

/**
 * Optional arguments for an breadth-first traversal.
 */
export type BFOptions<T> = {
  /**
   * A function that returns the subnodes if any given a node.
   *
   * *Defaults to* `(node) => node.nodes`
   */
  children?: ChildrenGetter<T>
  /**
   * Nodes traversed can be handled by this function.
   */
  onNode?: (node: T) => boolean | void
}

/**
 * Breadth first traverse a tree like object.
 *
 * @param root The tree like object to traverse to.
 */
export function bfs<T extends Record<string, any>>(
  root: T,
  { children = (node: T) => node.nodes, onNode }: BFOptions<T> = {},
) {
  const queue = new Queue<T>()
  queue.push(root)
  while (queue.length > 0) {
    const node = queue.pop()!
    if (onNode?.(node)) break
    const subnodes = children(node)
    if (subnodes?.length) {
      for (const n of subnodes) {
        queue.push(n)
      }
    }
  }
}
