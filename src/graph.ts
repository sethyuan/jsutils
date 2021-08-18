import { Queue } from "./queue"
import { reverseArray } from "./seq"

export type TreeNode<T extends { [key: string]: any }> = T & {
  nodes?: TreeNode<T>[]
}

type NodeHandler<T> = (node: TreeNode<T>, index: number) => boolean

class Node<T> {
  node: TreeNode<T>
  index: number
  isSep?: boolean

  constructor(node: TreeNode<T>, index: number, isSep?: boolean) {
    this.node = node
    this.index = index
    this.isSep = isSep
  }
}

export function preOrderTraverse<T>(
  root: TreeNode<T>,
  handler: NodeHandler<T>,
  enterHandler?: NodeHandler<T>,
  leaveHandler?: NodeHandler<T>,
) {
  const stack = [new Node(root, -1)]
  while (stack.length > 0) {
    const { node, index, isSep } = stack.pop()!
    if (isSep) {
      if (leaveHandler?.(node, index)) break
      continue
    }
    if (handler(node, index)) break
    if (node.nodes?.length) {
      if (enterHandler?.(node, index)) break
      stack.push(
        new Node(node, index, true),
        ...reverseArray(node.nodes.map((n, i) => new Node(n, i))),
      )
    }
  }
}

export function postOrderTraverse<T>(
  root: TreeNode<T>,
  handler: NodeHandler<T>,
  enterHandler?: NodeHandler<T>,
  leaveHandler?: NodeHandler<T>,
) {
  const stack = [new Node(root, -1)]
  while (stack.length > 0) {
    const { node, index, isSep } = stack.pop()!
    if (isSep) {
      if (handler(node, index)) break
      if (leaveHandler?.(node, index)) break
      continue
    }
    if (node.nodes?.length) {
      if (enterHandler?.(node, index)) break
      stack.push(
        new Node(node, index, true),
        ...reverseArray(node.nodes.map((n, i) => new Node(n, i))),
      )
    } else {
      if (handler(node, index)) break
    }
  }
}

export function breadthFirstTraverse<T>(
  root: TreeNode<T>,
  handler: (_: TreeNode<T>) => boolean,
) {
  const queue = new Queue<TreeNode<T>>()
  queue.push(root)
  while (queue.length > 0) {
    const node = queue.pop()!
    if (handler(node)) break
    if (node.nodes?.length) {
      for (const n of node.nodes) {
        queue.push(n)
      }
    }
  }
}
