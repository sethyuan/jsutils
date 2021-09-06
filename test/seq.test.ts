import {
  every,
  filter,
  find,
  forEach,
  LinkedList,
  map,
  reduce,
  reverseArray,
  some,
} from "../src/index"

test("reverseArray", () => {
  const reversed = reverseArray([1, 2, 3])
  expect(Array.from(reversed)).toEqual([3, 2, 1])
})

test("forEach", () => {
  const list = new LinkedList<number>()
  list.push(1)
  list.push(2)
  let i = 0
  forEach(list, (n) => {
    i++
    if (i === 1) {
      expect(n).toBe(1)
    } else if (i === 2) {
      expect(n).toBe(2)
    }
  })
})

test("map", () => {
  const list = new LinkedList<number>()
  list.push(1)
  list.push(2)
  const ret = map(list, (x) => x * 2)
  expect(Array.isArray(ret)).toBe(false)
  expect(Array.from(ret)).toEqual([2, 4])
})

test("filter", () => {
  const list = new LinkedList<number>()
  list.push(1)
  list.push(2)
  list.push(3)
  list.push(4)
  const ret = filter(list, (x) => x % 2 === 0)
  expect(Array.isArray(ret)).toBe(false)
  expect(Array.from(ret)).toEqual([2, 4])
})

describe("reduce", () => {
  test("no initial value", () => {
    const list = new LinkedList<number>()
    list.push(1)
    list.push(2)
    list.push(3)
    list.push(4)
    const ret = reduce(list, (total: number, x) => total + x)
    expect(ret).toBe(10)
  })

  test("initial value", () => {
    const list = new LinkedList<number>()
    list.push(1)
    list.push(2)
    list.push(3)
    list.push(4)
    const ret = reduce(list, (total: number, x) => total + x, 100)
    expect(ret).toBe(110)
  })
})

test("find", () => {
  const list = new LinkedList<number>()
  list.push(1)
  list.push(2)
  list.push(3)
  list.push(4)
  expect(find(list, (x) => x === 2)).toBe(2)
})

test("some", () => {
  const list = new LinkedList<number>()
  list.push(1)
  list.push(2)
  list.push(3)
  list.push(4)
  expect(some(list, (x) => x === 2)).toBe(true)
  expect(some(list, (x) => x === 10)).toBe(false)
})

test("every", () => {
  const list = new LinkedList<number>()
  list.push(1)
  list.push(2)
  list.push(3)
  list.push(4)
  expect(every(list, (x) => x % 2 === 0)).toBe(false)
  expect(every(list, (x) => x < 10)).toBe(true)
})
