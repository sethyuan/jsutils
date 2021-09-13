import { Queue } from "./queue"
import { Stack } from "./stack"

/**
 * The accessor function that returns the child nodes if any.
 */
export type ChildrenGetter<T> = (node: T) => T[] | undefined | null

/**
 * Context of the current non-leaf node.
 */
export class TraversalContext<Param, Return> {
  /**
   * Parameters given to the current processing.
   */
  param: Param
  /**
   * Local data specific to this context.
   */
  locals: { [key: string]: any }
  /**
   * The value of each child after evaluation.
   */
  childReturns: Return[]
  /**
   * The value the current processing returns.
   */
  returnValue?: Return

  constructor(param: Param) {
    this.param = param
    this.locals = {}
    this.childReturns = []
  }
}

/**
 * Node processing.
 *
 * If this is a non-leaf node handler and you want to return prematurely,
 * you can push the return value in `context.childReturns` and gives a
 * `true` as function's return value.
 *
 * If this is a leaf node handler, you can push the return value into
 * `context.childReturns`.
 *
 * @returns True if you want to interrupt the traversal of the rest of
 * the nodes.
 */
export type NodeHandler<T, Param, Return> = (
  node: T,
  context: TraversalContext<Param, Return>,
  index: number,
) => boolean | void

export type DfsOptions<T, Param, Return> = {
  /**
   * Handling of non-leaf node at pre-order position.
   */
  onPre?: NodeHandler<T, Param, Return>
  /**
   * Handling of non-leaf node at post-order position.
   */
  onPost?: NodeHandler<T, Param, Return>
  /**
   * Handling of non-leaf node at in-order position.
   */
  onIn?: NodeHandler<T, Param, Return>
  /**
   * Handling of leaf node..
   */
  onLeaf?: NodeHandler<T, Param, Return>
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

/**
 * This is a general and efficient iterative version of depth first
 * search/traversal.
 *
 * @example
 * ```ts
 * type ExprNode = {
 *   op?: "+" | "-" | "*"
 *   val?: number
 *   children?: ExprNode[]
 * }
 *
 * const expr: ExprNode = {
 *   op: "+",
 *   children: [
 *     {
 *       op: "*",
 *       children: [{ val: 3 }, { val: 4 }, { val: 1 }],
 *     },
 *     {
 *       op: "-",
 *       children: [{ val: 7 }, { val: 3 }],
 *     },
 *   ],
 * }
 *
 * const ops = {
 *   "+": (nums: number[]) => nums.reduce((result, x) => result + x),
 *   "-": (nums: number[]) => nums.reduce((result, x) => result - x),
 *   "*": (nums: number[]) => nums.reduce((result, x) => result * x),
 * }
 *
 * const ret = dfs<ExprNode, null, number>(
 *   expr,
 *   (node) => node.children,
 *   null,
 *   {
 *     onLeaf(node, context) {
 *       context.returnValue = node.val
 *     },
 *     onPost(node, context) {
 *       context.returnValue = ops[node.op!](context.childReturns)
 *     },
 *   },
 * )
 * ```
 *
 * @typeParam T Node type
 * @typeParam Param Parameters type
 * @typeParam Return The return value type
 *
 * @param root The root node of a tree like object to begin search with.
 * @param children An accessor function that returns the sub-nodes if any.
 * @param param Optional parameters that can be used during traversal.
 * Give it a `null` if you don't need it.
 *
 * @returns The evaluation result of the traversal.
 */
export function dfs<T, Param, Return>(
  root: T,
  children: ChildrenGetter<T>,
  param: Param,
  { onPre, onPost, onIn, onLeaf }: DfsOptions<T, Param, Return> = {},
) {
  const nodeStack = new Stack(
    new Node(root, 0, children(root)?.length ? NODE : LEAF),
  )
  const contextStack = new Stack<TraversalContext<Param, Return>>(
    new TraversalContext<Param, Return>(param),
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
        new TraversalContext<Param, Return>(contextStack.peek()!.param),
      )
      if (!onPre) continue
      const context = contextStack.peek()!
      const interrupt = onPre(node, context, index)
      if (context.returnValue !== undefined) {
        contextStack.peek()!.childReturns.push(context.returnValue)
      }
      if (interrupt) break
    } else if (type === IN) {
      if (!onIn) continue
      const context = contextStack.peek()!
      const interrupt = onIn(node, context, index)
      if (context.returnValue !== undefined) {
        contextStack.peek()!.childReturns.push(context.returnValue)
      }
      if (interrupt) break
    } else if (type === POST) {
      const context = contextStack.pop()!
      if (!onPost) continue
      const interrupt = onPost(node, context, index)
      if (context.returnValue !== undefined) {
        contextStack.peek()!.childReturns.push(context.returnValue)
      }
      if (interrupt) break
    } else if (type === LEAF) {
      if (!onLeaf) continue
      const context = new TraversalContext<Param, Return>(
        contextStack.peek()!.param,
      )
      const interrupt = onLeaf(node, context, index)
      if (context.returnValue !== undefined) {
        contextStack.peek()!.childReturns.push(context.returnValue)
      }
      if (interrupt) break
    }
  }
  return contextStack.pop()!.childReturns.pop()
}

export type BfsContext = {
  cut?: boolean
}

/**
 * Breadth first traverse a tree like object.
 *
 * @param root The tree like object to traverse to.
 * @param children The accessor function that returns the child nodes if any.
 * @param onNode Handling of the node. Return true if you want to interrupt
 * the whole traversal, or use `context.cut` to indicate you don't want to
 * go down this path.
 */
export function bfs<T extends { [key: string]: any }>(
  root: T,
  children: ChildrenGetter<T>,
  onNode: (node: T, context: BfsContext, index: number) => boolean | void,
) {
  const queue = new Queue(new Node(root, 0, NODE))
  while (queue.length > 0) {
    const { node, index } = queue.pop()!
    const context: BfsContext = {}
    if (onNode(node, context, index)) break
    if (context.cut) continue
    const subnodes = children(node)
    const len = subnodes?.length
    if (len) {
      for (let i = 0; i < len; i++) {
        const subnode = subnodes![i]
        queue.push(new Node(subnode, i, NODE))
      }
    }
  }
}
