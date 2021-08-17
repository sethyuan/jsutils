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
