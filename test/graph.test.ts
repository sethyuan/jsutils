import { dfs, TreeNode } from "../src/index"

describe("Graph", () => {
  describe("dfs", () => {
    it("find path", () => {
      function findPath<T>(
        obj: TreeNode<T>,
        predicate: (_: TreeNode<T>) => boolean,
      ) {
        const path = []

        function handler(node: TreeNode<T>, i: number) {
          const found = predicate(node)
          if (found) {
            path.push(i)
          }
          return found
        }

        function enter(node: TreeNode<T>, i: number) {
          if (i > -1) {
            path.push(i)
          }
          return false
        }

        function leave(node: TreeNode<T>) {
          path.pop()
          return false
        }

        dfs(obj, handler, enter, leave)

        return path
      }

      const root = {
        nodes: [
          {
            nodes: [
              {
                name: "D",
              },
              {
                nodes: [
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

      const path = findPath(root, (node) => node.name === "F")
      expect(path).toEqual([0, 1, 0])
    })

    it("calc", () => {
      type Node = { val?: number; op?: "+" | "-" | "*" | "/" }

      const fns = {
        "+": (numbers: number[]) => numbers.reduce((a, b) => a + b),
        "-": (numbers: number[]) => numbers.reduce((a, b) => a - b),
        "*": (numbers: number[]) => numbers.reduce((a, b) => a * b),
        "/": (numbers: number[]) => numbers.reduce((a, b) => a / b),
      }

      function calc(expr: TreeNode<Node>) {
        const stack: number[] = []

        function handler(node: TreeNode<Node>) {
          if (!node.op) {
            stack.push(node.val)
          }
          return false
        }

        function enter(node: TreeNode<Node>) {
          if (node.op) {
            stack.push(NaN)
          }
          return false
        }

        function leave(node: TreeNode<Node>) {
          const vals = []
          let val = stack.pop()
          while (!Number.isNaN(val)) {
            vals.push(val)
            val = stack.pop()
          }
          stack.push(fns[node.op](vals))
          return false
        }

        dfs(expr, handler, enter, leave)

        return stack.pop()
      }

      const expr1: TreeNode<Node> = {
        op: "*",
        nodes: [
          {
            val: 2,
          },
          {
            op: "+",
            nodes: [
              {
                val: 3,
              },
              {
                val: 4,
              },
            ],
          },
        ],
      }

      expect(calc(expr1)).toBe(14)
    })
  })

  // describe("bfs", () => {
  //   it("find path", () => {})
  // })
})
