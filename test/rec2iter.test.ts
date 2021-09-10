import { tsParameterProperty } from "@babel/types"
import { rec2iter } from "../src/index"

test("fib", () => {
  function fib(n: number) {
    return rec2iter(
      n,
      (n) => {
        if (n <= 1) return 1
      },
      (n) => [n - 2, n - 1],
      (_n, [fib_n_minus_2, fib_n_minus_1]) => {
        return fib_n_minus_2 + fib_n_minus_1
      },
    )
  }

  expect(fib(5)).toBe(8)
})

test("factorial", () => {
  function factorial(n: number) {
    return rec2iter(
      n,
      (n) => {
        if (n <= 1) return 1
      },
      (n) => [n - 1],
      (n, [fac_n_minus_1]) => n * fac_n_minus_1,
    )
  }

  expect(factorial(5)).toBe(120)
})

test("calc", () => {
  type ExprNode = {
    op?: "+" | "-" | "*"
    val?: number
    left?: ExprNode
    right?: ExprNode
  }

  const expr: ExprNode = {
    op: "+",
    left: {
      op: "*",
      left: { val: 3 },
      right: { val: 4 },
    },
    right: {
      op: "-",
      left: { val: 7 },
      right: { val: 3 },
    },
  }

  const ops = {
    "+": (x: number, y: number) => x + y,
    "-": (x: number, y: number) => x - y,
    "*": (x: number, y: number) => x * y,
  }

  function calc(expr: ExprNode) {
    return rec2iter(
      expr,
      (n) => {
        if (n.val !== undefined) return n.val
      },
      (n) => [n.left, n.right],
      (node, [left, right]) => ops[node.op](left, right),
    )
  }

  expect(calc(expr)).toBe(16)
})
