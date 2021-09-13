import { bfs, dfs } from "../src/index"

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
      (node, context) => {
        nodes.push(node.name)
        if (node.name === "B") {
          context.cut = true
        }
      },
    )
    expect(nodes).toEqual(["A", "B", "F", "G", "H"])
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
