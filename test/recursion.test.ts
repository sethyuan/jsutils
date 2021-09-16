import { rec2iter, recurse } from "../src/index"

describe("rec2iter", () => {
  test("fib", () => {
    function fib(n: number) {
      return rec2iter(
        (n, context) => {
          if (n <= 1) return 1
          context.recursions = [n - 2, n - 1]
        },
        (_n, [fib_n_minus_2, fib_n_minus_1]) => {
          return fib_n_minus_2 + fib_n_minus_1
        },
        n,
      )
    }

    expect(fib(5)).toBe(8)
  })

  test("factorial", () => {
    function factorial(n: number) {
      return rec2iter(
        (n, context) => {
          if (n <= 1) return 1
          context.recursions = [n - 1]
        },
        (n, [fac_n_minus_1]) => n * fac_n_minus_1,
        n,
      )
    }

    expect(factorial(5)).toBe(120)
  })

  /**
   * function factorial(n) {
   *   if (n <= 1) return 1 * 2
   *   const doubleN = n * 2
   *   return doubleN * factorial(n - 1)
   * }
   */
  test("factorial with locals", () => {
    function factorial(n: number) {
      return rec2iter(
        (n, context) => {
          if (n <= 1) return 1 * 2
          const doubleN = n * 2
          context.locals = { doubleN }
          context.recursions = [n - 1]
        },
        (_n, [fac_n_minus_1], { doubleN }) => doubleN * fac_n_minus_1,
        n,
      )
    }

    expect(factorial(5)).toBe(120 * 2 ** 5)
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
        (node, context) => {
          if (node.val !== undefined) return node.val
          context.recursions = [node.left, node.right]
        },
        (node, [left, right]) => ops[node.op](left, right),
        expr,
      )
    }

    expect(calc(expr)).toBe(16)
  })

  test("reverse array", () => {
    function reverse<T>(arr: T[]) {
      return rec2iter(
        ([arr, start, end], context) => {
          if (start >= end) return
          ;[arr[start], arr[end]] = [arr[end], arr[start]]
          context.recursions = [[arr, start + 1, end - 1]]
        },
        () => {},
        [arr, 0, arr.length - 1] as [T[], number, number],
      )
    }

    const arr = [1, 2, 3, 4, 5]
    reverse(arr)
    expect(arr).toEqual([5, 4, 3, 2, 1])

    const arr2 = [1, 2, 3, 4]
    reverse(arr2)
    expect(arr2).toEqual([4, 3, 2, 1])
  })
})

describe("recurse", () => {
  test("fib", () => {
    function fib(n: number) {
      return recurse<number, number>(function* (n) {
        if (n <= 1) return 1
        return (yield n - 2) + (yield n - 1)
      }, n)
    }

    expect(fib(5)).toBe(8)
  })

  test("factorial", () => {
    function factorial(n: number) {
      return recurse<number, number>(function* (n) {
        if (n <= 1) return 1
        return n * (yield n - 1)
      }, n)
    }

    expect(factorial(5)).toBe(120)
  })

  /**
   * function factorial(n) {
   *   if (n <= 1) return 1 * 2
   *   const doubleN = n * 2
   *   return doubleN * factorial(n - 1)
   * }
   */
  test("factorial with locals", () => {
    function factorial(n: number) {
      return recurse<number, number>(function* (n) {
        if (n <= 1) return 1 * 2
        const doubleN = n * 2
        return doubleN * (yield n - 1)
      }, n)
    }

    expect(factorial(5)).toBe(120 * 2 ** 5)
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
      return recurse<ExprNode, number>(function* (node) {
        if (node.val !== undefined) return node.val
        return ops[node.op](yield node.left, yield node.right)
      }, expr)
    }

    expect(calc(expr)).toBe(16)
  })

  test("reverse array", () => {
    function reverse<T>(arr: T[]) {
      return recurse<[T[], number, number], void>(
        function* ([arr, start, end]) {
          if (start >= end) return
          ;[arr[start], arr[end]] = [arr[end], arr[start]]
          yield [arr, start + 1, end - 1]
        },
        [arr, 0, arr.length - 1],
      )
    }

    const arr = [1, 2, 3, 4, 5]
    reverse(arr)
    expect(arr).toEqual([5, 4, 3, 2, 1])

    const arr2 = [1, 2, 3, 4]
    reverse(arr2)
    expect(arr2).toEqual([4, 3, 2, 1])
  })

  test("recursions in a loop", () => {
    function perm(numbers: number[]) {
      const combinations: number[][] = []
      recurse<readonly [number[], number[]], void>(
        function* ([nums, combo]) {
          if (nums.length === combo.length) {
            combinations.push(combo.slice())
            return
          }
          for (let i = 0; i < nums.length; i++) {
            if (combo.includes(nums[i])) continue
            combo.push(nums[i])
            yield [nums, combo]
            combo.pop()
          }
        },
        [numbers, []],
      )
      return combinations
    }

    expect(perm([1, 2, 5])).toEqual([
      [1, 2, 5],
      [1, 5, 2],
      [2, 1, 5],
      [2, 5, 1],
      [5, 1, 2],
      [5, 2, 1],
    ])
  })
})
