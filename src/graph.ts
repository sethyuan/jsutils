import { Queue } from "./queue"
import { reverseArray } from "./seq"

export type NodeHandler<T> = (node: T, index: number) => boolean | void

export type PrePostOptions<T> = {
  children?: (node: T) => T[] | undefined
  onNode?: NodeHandler<T>
  onNodeEnter?: NodeHandler<T>
  onNodeLeave?: NodeHandler<T>
}

export type InOptions<T> = {
  left?: (node: T) => T | undefined
  right?: (node: T) => T | undefined
  onNode?: NodeHandler<T>
  onNodeEnter?: NodeHandler<T>
  onNodeLeave?: NodeHandler<T>
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

export function breadthFirstTraverse<T extends Record<string, any>>(
  root: T,
  {
    children = (node: T) => node.nodes,
    onNode,
  }: {
    children?: (node: T) => T[] | undefined
    onNode?: (node: T) => boolean | void
  } = {},
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
