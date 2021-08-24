import { Queue } from "./queue"
import { reverseArray } from "./seq"

class Node<T> {
  node: T
  index: number
  isSep?: boolean

  constructor(node: T, index: number, isSep?: boolean) {
    this.node = node
    this.index = index
    this.isSep = isSep
  }
}

type NodeHandler<T> = (node: T, index: number) => boolean | void

type PrePostOptions<T> = {
  children?: (node: T) => T[] | undefined
  onNode?: NodeHandler<T>
  onNodeEnter?: NodeHandler<T>
  onNodeLeave?: NodeHandler<T>
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
    const { node, index, isSep } = stack.pop()!
    if (isSep) {
      if (onNodeLeave?.(node, index)) break
      continue
    }
    if (onNode?.(node, index)) break
    const subnodes = children(node)
    if (subnodes?.length) {
      if (onNodeEnter?.(node, index)) break
      stack.push(
        new Node(node, index, true),
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
    const { node, index, isSep } = stack.pop()!
    if (isSep) {
      if (onNode?.(node, index)) break
      if (onNodeLeave?.(node, index)) break
      continue
    }
    const subnodes = children(node)
    if (subnodes?.length) {
      if (onNodeEnter?.(node, index)) break
      stack.push(
        new Node(node, index, true),
        ...reverseArray(subnodes.map((n, i) => new Node(n, i))),
      )
    } else {
      if (onNode?.(node, index)) break
    }
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
