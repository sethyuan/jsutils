import { Queue } from "./queue"
import { reverseArray } from "./seq"

/**
 * Nodes are delivered to this handler while traversing.
 *
 * @param node Node traversed.
 * @param index Node index within its parent node. For a binary tree,
 * `0` means it's the left child, `1` means it's the right child.
 *
 * @returns You can return `true` if you want to interrupt the traversal,
 * otherwise you return nothing or `false`.
 */
export type NodeHandler<T> = (node: T, index: number) => boolean | void

/**
 * Optional arguments for a pre-order/post-order traversal.
 */
export type PrePostOptions<T> = {
  /**
   * A function that returns the subnodes if any given a node.
   *
   * *Defaults to* `(node) => node.nodes`
   */
  children?: (node: T) => T[] | undefined
  /**
   * Nodes traversed can be handled by this function.
   */
  onNode?: NodeHandler<T>
  /**
   * If a node has descendant, this function will get called before
   * traversing descendants.
   */
  onNodeEnter?: NodeHandler<T>
  /**
   * If a node has descendant nodes, this function will get called
   * after traversing all descendants.
   */
  onNodeLeave?: NodeHandler<T>
}

/**
 * Optional arguments for an in-order traversal.
 */
export type InOptions<T> = {
  /**
   * A function that returns the left child if any given a node.
   */
  left?: (node: T) => T | undefined
  /**
   * A function that returns the right child if any given a node.
   */
  right?: (node: T) => T | undefined
  /**
   * Nodes traversed can be handled by this function.
   */
  onNode?: NodeHandler<T>
  /**
   * If a node has descendant, this function will get called
   * before traversing descendants.
   */
  onNodeEnter?: NodeHandler<T>
  /**
   * If a node has descendant nodes, this function will get called
   * after traversing all descendants.
   */
  onNodeLeave?: NodeHandler<T>
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
  children?: (node: T) => T[] | undefined
  /**
   * Nodes traversed can be handled by this function.
   */
  onNode?: (node: T) => boolean | void
}

const SELF = 0
const LEAVING = 1

type NodeType = typeof SELF | typeof LEAVING

class Node<T> {
  node: T
  index: number
  type?: NodeType

  constructor(node: T, index: number, type?: NodeType) {
    this.node = node
    this.index = index
    this.type = type
  }
}

/**
 * Traverse a tree like object in pre-order.
 *
 * See {@link postOrderTraverse} for an example usage.
 * This function is used in a similar way.
 *
 * @param root The tree like object to traverse to.
 */
export function preOrderTraverse<T extends Record<string, any>>(
  root: T,
  {
    children = (node: T) => node.nodes,
    onNode,
    onNodeEnter,
    onNodeLeave,
  }: PrePostOptions<T> = {},
) {
  const stack = [new Node(root, -1)]
  while (stack.length > 0) {
    const { node, index, type } = stack.pop()!
    if (type === LEAVING) {
      if (onNodeLeave?.(node, index)) break
      continue
    }
    if (onNode?.(node, index)) break
    const subnodes = children(node)
    if (subnodes?.length) {
      if (onNodeEnter?.(node, index)) break
      stack.push(
        new Node(node, index, LEAVING),
        ...reverseArray(subnodes.map((n, i) => new Node(n, i))),
      )
    }
  }
}

/**
 * Traverse a tree like object in post-order.
 *
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
 * function calc(expr: ExprNode): number {
 *   const ops = {
 *     "+": (nums: number[]) => nums.reduce((result, x) => result + x),
 *     "-": (nums: number[]) => nums.reduce((result, x) => result - x),
 *     "*": (nums: number[]) => nums.reduce((result, x) => result * x),
 *   }
 *   const stack = new Stack<Queue<number>>()
 *   stack.push(new Queue())
 *   postOrderTraverse(expr, {
 *     children(node) {
 *       return node.children
 *     },
 *     onNodeEnter() {
 *       stack.push(new Queue())
 *     },
 *     onNode(node) {
 *       if (node.val != null) {
 *         stack.peek().push(node.val)
 *       } else if (node.op != null) {
 *         const values = stack.pop().popAll()
 *         stack.peek().push(ops[node.op](values))
 *       }
 *     },
 *   })
 *   return stack.pop().pop()
 * }
 *
 * calc(expr) // 16
 * ```
 *
 * @param root The tree like object to traverse to.
 */
export function postOrderTraverse<T extends Record<string, any>>(
  root: T,
  {
    children = (node: T) => node.nodes,
    onNode,
    onNodeEnter,
    onNodeLeave,
  }: PrePostOptions<T> = {},
) {
  const stack = [new Node(root, -1)]
  while (stack.length > 0) {
    const { node, index, type } = stack.pop()!
    if (type === SELF) {
      if (onNode?.(node, index)) break
      if (onNodeLeave?.(node, index)) break
      continue
    }
    const subnodes = children(node)
    if (subnodes?.length) {
      if (onNodeEnter?.(node, index)) break
      stack.push(
        new Node(node, index, SELF),
        ...reverseArray(subnodes.map((n, i) => new Node(n, i))),
      )
    } else {
      if (onNode?.(node, index)) break
    }
  }
}

/**
 * Traverse a binary tree like object in in-order.
 *
 * See {@link postOrderTraverse} for an example usage.
 * This function is used in a similar way, except that
 * instead of providing a `children` accessor, you
 * provide `left` and `right` accessors.
 *
 * @param root The tree like object to traverse to.
 */
export function inOrderTraverse<T extends Record<string, any>>(
  root: T,
  {
    left = (node: T) => node.left,
    right = (node: T) => node.right,
    onNode,
    onNodeEnter,
    onNodeLeave,
  }: InOptions<T> = {},
) {
  const stack = [new Node(root, -1)]
  while (stack.length > 0) {
    const { node, index, type } = stack.pop()!
    switch (type) {
      case SELF: {
        if (onNode?.(node, index)) break
        continue
      }
      case LEAVING: {
        if (onNodeLeave?.(node, index)) break
        continue
      }
    }
    const l = left(node)
    const r = right(node)
    if ((l || r) && onNodeEnter?.(node, index)) break
    if (l || r) stack.push(new Node(node, index, LEAVING))
    if (r) stack.push(new Node(r, 1))
    stack.push(new Node(node, index, SELF))
    if (l) stack.push(new Node(l, 0))
  }
}

/**
 * Breadth first traverse a tree like object.
 *
 * @param root The tree like object to traverse to.
 */
export function breadthFirstTraverse<T extends Record<string, any>>(
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
