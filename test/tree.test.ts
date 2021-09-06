import { dfs } from "../src/index"

describe("Traversals", () => {
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
        leafHandler(node, { childReturns }) {
          childReturns.push(node.val!)
        },
        postHandler(node, { childReturns }) {
          return { value: ops[node.op!](childReturns) }
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
        preHandler(node, context, index) {
          context.params = [...context.params, index]
          context.childReturns.push(context.params)
          if (predicate(node)) return true
        },
        leafHandler(node, context, index) {
          if (predicate(node)) {
            context.childReturns.push([...context.params, index])
            return true
          }
        },
      }).slice(1)
    }

    const path = findPath(root, (node) => node.name === "F")
    expect(path).toEqual([0, 1, 1])
  })
})
