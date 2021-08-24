import {
  breadthFirstTraverse,
  LinkedList,
  postOrderTraverse,
  preOrderTraverse,
} from "../src/index"

describe("Graph", () => {
  describe("preOrderTraverse", () => {
    it("find path", () => {
      function findPath<T>(obj: T, predicate: (_: T) => boolean) {
        const path = []

        function onNode(node: T, i: number) {
          const found = predicate(node)
          if (found) {
            path.push(i)
          }
          return found
        }

        function onNodeEnter(node: T, i: number) {
          if (i > -1) {
            path.push(i)
          }
          return false
        }

        function onNodeLeave(node: T) {
          path.pop()
          return false
        }

        preOrderTraverse(obj, { onNode, onNodeEnter, onNodeLeave })

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
      type Node = { val?: number; op?: "+" | "-" | "*" | "/"; nodes?: Node[] }

      const fns = {
        "+": (numbers: number[]) => numbers.reduce((a, b) => a + b),
        "-": (numbers: number[]) => numbers.reduce((a, b) => a - b),
        "*": (numbers: number[]) => numbers.reduce((a, b) => a * b),
        "/": (numbers: number[]) => numbers.reduce((a, b) => a / b),
      }

      function calc(expr: Node) {
        const stack: number[] = []

        function onNode(node: Node) {
          if (node.op) {
            stack.push(NaN)
          } else if (node.val) {
            stack.push(node.val)
          }
          return false
        }

        function onNodeLeave(node: Node) {
          const vals = new LinkedList<number>()
          let val = stack.pop()
          while (!Number.isNaN(val)) {
            vals.unshift(val)
            val = stack.pop()
          }
          stack.push(fns[node.op](Array.from(vals)))
          return false
        }

        preOrderTraverse(expr, { onNode, onNodeLeave })

        return stack.pop()
      }

      const expr1: Node = {
        op: "*",
        nodes: [
          {
            val: 2,
          },
          {
            op: "-",
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

      expect(calc(expr1)).toBe(-2)
    })
  })

  describe("postOrderTraverse", () => {
    it("find people in an org", () => {
      interface Node {
        name: string
        nodes?: Node[]
      }

      const org = {
        name: "corp a",
        nodes: [
          {
            name: "dep b",
            nodes: [
              {
                name: "p1",
              },
            ],
          },
          {
            name: "dep c",
            nodes: [
              {
                name: "p2",
              },
              {
                name: "p3",
              },
            ],
          },
          {
            name: "p0",
          },
        ],
      }

      postOrderTraverse(org, {
        onNode(node: Node, index: number) {
          if (!node.nodes && node.name === "p2") {
            expect(index).toBe(0)
            return true
          }
          return false
        },
      })
    })
  })

  describe("breadthFirstTraverse", () => {
    it("check order", () => {
      interface Node {
        id: string
        nodes?: Node[]
      }

      const tree = {
        id: "A",
        nodes: [
          {
            id: "B",
            nodes: [
              {
                id: "D",
              },
              {
                id: "E",
              },
            ],
          },
          {
            id: "C",
            nodes: [
              {
                id: "F",
              },
              {
                id: "G",
              },
            ],
          },
        ],
      }
      const arr = []
      breadthFirstTraverse(tree, {
        onNode({ id }: Node) {
          arr.push(id)
          return false
        },
      })
      expect(arr).toEqual(["A", "B", "C", "D", "E", "F", "G"])
    })
  })
})
