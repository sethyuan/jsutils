import { bfs, dfs, filterTree, mapTree } from "../src/index"

describe("Traversals", () => {
  test("pre-order output", () => {
    const tree = {
      name: "A",
      nodes: [
        {
          name: "B",
          nodes: [{ name: "C" }, { name: "D", nodes: [{ name: "E" }] }],
        },
        {
          name: "F",
          nodes: [{ name: "G" }, { name: "H" }],
        },
      ],
    }

    const nodes = []
    dfs(tree, (node: any) => node.nodes, null, {
      onPre(node) {
        nodes.push(node.name)
      },
      onLeaf(node) {
        nodes.push(node.name)
      },
    })
    expect(nodes).toEqual(["A", "B", "C", "D", "E", "F", "G", "H"])
  })

  test("post-order output", () => {
    const tree = {
      name: "A",
      nodes: [
        {
          name: "B",
          nodes: [{ name: "C" }, { name: "D", nodes: [{ name: "E" }] }],
        },
        {
          name: "F",
          nodes: [{ name: "G" }, { name: "H" }],
        },
      ],
    }

    const nodes = []
    dfs(tree, (node: any) => node.nodes, null, {
      onPost(node) {
        nodes.push(node.name)
      },
      onLeaf(node) {
        nodes.push(node.name)
      },
    })
    expect(nodes).toEqual(["C", "E", "D", "B", "G", "H", "F", "A"])
  })

  test("in-order output", () => {
    const tree = {
      name: "A",
      nodes: [
        {
          name: "B",
          nodes: [
            { name: "C" },
            { name: "D", nodes: [{ name: "E" }, { name: "Z" }] },
          ],
        },
        {
          name: "F",
          nodes: [{ name: "G" }, { name: "H" }],
        },
      ],
    }

    const nodes = []
    dfs(tree, (node: any) => node.nodes, null, {
      onIn(node) {
        nodes.push(node.name)
      },
      onLeaf(node) {
        nodes.push(node.name)
      },
    })
    expect(nodes).toEqual(["C", "B", "E", "D", "Z", "A", "G", "F", "H"])
  })

  test("breadth first output", () => {
    const tree = {
      name: "A",
      nodes: [
        {
          name: "B",
          nodes: [
            { name: "C" },
            { name: "D", nodes: [{ name: "E" }, { name: "Z" }] },
          ],
        },
        {
          name: "F",
          nodes: [{ name: "G" }, { name: "H" }],
        },
      ],
    }

    const nodes = []
    bfs(
      tree,
      (node: any) => node.nodes,
      (node) => {
        nodes.push(node.name)
      },
    )
    expect(nodes).toEqual(["A", "B", "F", "C", "D", "G", "H", "E", "Z"])
  })

  test("breadth first traversal with cut", () => {
    type Node = {
      name: string
      checked?: boolean
      nodes?: Node[]
    }

    const tree: Node = {
      name: "A",
      nodes: [
        {
          name: "B",
          nodes: [
            { name: "C" },
            {
              name: "D",
              checked: true,
              nodes: [{ name: "E", checked: true }, { name: "Z" }],
            },
          ],
        },
        {
          name: "F",
          nodes: [{ name: "G" }, { name: "H", checked: true }],
        },
      ],
    }

    const nodes = []
    bfs(
      tree,
      (node: any) => node.nodes,
      (node, context) => {
        if (node.checked) {
          nodes.push(node.name)
          context.cut = true
        }
      },
    )
    expect(nodes).toEqual(["D", "H"])
  })

  test("post-order calc example", () => {
    type ExprNode = {
      op?: "+" | "-" | "*"
      val?: number
      children?: ExprNode[]
    }

    const expr: ExprNode = {
      op: "+",
      children: [
        {
          op: "*",
          children: [{ val: 3 }, { val: 4 }, { val: 1 }],
        },
        {
          op: "-",
          children: [{ val: 7 }, { val: 3 }],
        },
      ],
    }

    const ops = {
      "+": (nums: number[]) => nums.reduce((result, x) => result + x),
      "-": (nums: number[]) => nums.reduce((result, x) => result - x),
      "*": (nums: number[]) => nums.reduce((result, x) => result * x),
    }

    const ret = dfs<ExprNode, null, number>(
      expr,
      (node) => node.children,
      null,
      {
        onLeaf(node, context) {
          context.returnValue = node.val
        },
        onPost(node, context) {
          context.returnValue = ops[node.op!](context.childReturns)
        },
      },
    )

    expect(ret).toBe(16)
  })

  test("pre-order find path example", () => {
    type Node = {
      name?: string
      nodes?: Node[]
    }

    const root: Node = {
      nodes: [
        {
          nodes: [
            {
              name: "D",
            },
            {
              nodes: [
                {
                  name: "G",
                },
                {
                  name: "F",
                },
              ],
              name: "E",
            },
          ],
          name: "A",
        },
        {
          name: "B",
        },
        {
          nodes: [
            {
              name: "G",
            },
          ],
          name: "C",
        },
      ],
      name: "root",
    }

    function findPath(obj: Node, predicate: (node: Node) => boolean) {
      return dfs<Node, number[], number[]>(obj, (node) => node.nodes, [], {
        onPre(node, context, index) {
          context.param = [...context.param, index]
          if (predicate(node)) {
            context.returnValue = context.param
            return true
          }
        },
        onLeaf(node, context, index) {
          if (predicate(node)) {
            context.returnValue = [...context.param, index]
            return true
          }
        },
      }).slice(1)
    }

    const path = findPath(root, (node) => node.name === "F")
    expect(path).toEqual([0, 1, 1])
  })
})

describe("common sequence ops on tree", () => {
  type Node = {
    val: number
    left?: Node
    right?: Node
  }

  let root: Node

  beforeEach(() => {
    root = {
      val: 1,
      left: {
        val: 2,
        left: {
          val: 3,
          left: { val: 4 },
          right: { val: 5 },
        },
        right: {
          val: 6,
          left: { val: 7 },
          right: { val: 8 },
        },
      },
      right: { val: 9 },
    }
  })

  test("map", () => {
    function map(root: Node, mapper: (node: Node, index: number) => Node) {
      return mapTree(
        root,
        (node) => (node.left == null ? [] : [node.left, node.right]),
        (parent, index, node) => {
          if (index === 0) {
            parent.left = node
          } else {
            parent.right = node
          }
        },
        mapper,
      )
    }

    const newTree = map(root, (node, index) => {
      if (node.val % 2 !== 0) {
        return { ...node, val: node.val * index }
      }
      return { ...node }
    })

    const arr = []
    bfs(
      newTree,
      (node) => (node.left == null ? [] : [node.left, node.right]),
      (node) => {
        arr.push(node.val)
      },
    )
    expect(arr).toEqual([0, 2, 9, 0, 6, 4, 5, 0, 8])
  })

  test("filter", () => {
    function filter(
      root: Node,
      predicate: (node: Node, index: number) => boolean,
    ) {
      return filterTree(
        root,
        (node) =>
          node.left == null && node.right == null
            ? []
            : node.left == null
            ? [node.right]
            : node.right == null
            ? [node.left]
            : [node.left, node.right],
        (parent, index, node?) => {
          if (index === 0) {
            parent.left = node
          } else if (parent.left) {
            parent.right = node
          } else {
            parent.left = node
            parent.right = undefined
          }
        },
        predicate,
      )
    }

    const newTree = filter(root, (node, index) => {
      return node.val % 2 !== 0
    })

    const arr = []
    bfs(
      newTree,
      (node) =>
        node.left == null && node.right == null
          ? []
          : node.left == null
          ? [node.right]
          : node.right == null
          ? [node.left]
          : [node.left, node.right],
      (node) => {
        arr.push(node.val)
      },
    )
    expect(arr).toEqual([1, 9])
  })
})
