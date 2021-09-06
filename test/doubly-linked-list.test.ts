import { DLinkedList } from "../src/index"

describe("modification", () => {
  test("2 unshift 2 pop", () => {
    const list = new DLinkedList<number>()
    list.unshift(1)
    list.unshift(2)
    expect(list.pop()).toBe(1)
    expect(list.pop()).toBe(2)
    expect(list.pop()).toBe(undefined)
  })

  test("2 push 2 shift", () => {
    const list = new DLinkedList<number>()
    list.push(1)
    list.push(2)
    expect(list.shift()).toBe(1)
    expect(list.shift()).toBe(2)
    expect(list.shift()).toBe(undefined)
  })

  test("2 push 2 pop", () => {
    const list = new DLinkedList<number>()
    list.push(1)
    list.push(2)
    expect(list.pop()).toBe(2)
    expect(list.pop()).toBe(1)
    expect(list.pop()).toBe(undefined)
  })

  test("2 unshift 2 shift", () => {
    const list = new DLinkedList<number>()
    list.unshift(1)
    list.unshift(2)
    expect(list.shift()).toBe(2)
    expect(list.shift()).toBe(1)
    expect(list.shift()).toBe(undefined)
  })

  test("prepend empty", () => {
    const list = new DLinkedList<number>()
    list.prepend([])
    expect(list.length).toBe(0)
    expect(Array.from(list)).toEqual([])
  })

  test("prepend empty but list not empty", () => {
    const list = new DLinkedList<number>()
    list.push(1)
    list.prepend([])
    expect(list.length).toBe(1)
    expect(Array.from(list)).toEqual([1])
  })

  test("prepend to an empty list", () => {
    const list = new DLinkedList<number>()
    list.prepend([1, 2])
    expect(list.length).toBe(2)
    expect(Array.from(list)).toEqual([1, 2])
  })

  test("prepend", () => {
    const list = new DLinkedList<number>()
    list.push(3)
    list.prepend([1, 2])
    expect(list.length).toBe(3)
    expect(Array.from(list)).toEqual([1, 2, 3])
  })

  test("prepend check value", () => {
    const list = new DLinkedList<number>()
    list.push(2)
    list.prepend([1])
    expect(list.pop()).toBe(2)
    expect(list.pop()).toBe(1)
    expect(list.pop()).toBe(undefined)
  })

  test("prepend shift", () => {
    const list = new DLinkedList<number>()
    list.push(2)
    list.prepend([1])
    expect(list.shift()).toBe(1)
    expect(list.shift()).toBe(2)
    expect(list.shift()).toBe(undefined)
    list.unshift(100)
    expect(list.pop()).toBe(100)
    list.push(10)
    expect(list.pop()).toBe(10)
  })

  test("append empty", () => {
    const list = new DLinkedList<number>()
    list.append([])
    expect(list.length).toBe(0)
    expect(Array.from(list)).toEqual([])
  })

  test("append empty but list not empty", () => {
    const list = new DLinkedList<number>()
    list.push(1)
    list.append([])
    expect(list.length).toBe(1)
    expect(Array.from(list)).toEqual([1])
  })

  test("append to an empty list", () => {
    const list = new DLinkedList<number>()
    list.append([1, 2])
    expect(list.length).toBe(2)
    expect(Array.from(list)).toEqual([1, 2])
  })

  test("append", () => {
    const list = new DLinkedList<number>()
    list.push(1)
    list.append([2, 3])
    expect(list.length).toBe(3)
    expect(Array.from(list)).toEqual([1, 2, 3])
  })

  test("append check value", () => {
    const list = new DLinkedList<number>()
    list.push(1)
    list.append([2])
    expect(list.pop()).toBe(2)
    expect(list.pop()).toBe(1)
    expect(list.pop()).toBe(undefined)
    list.push(10)
    expect(list.pop()).toBe(10)
    list.unshift(100)
    expect(list.pop()).toBe(100)
  })
})

test("length", () => {
  const list = new DLinkedList<number>()
  expect(list.length).toBe(0)
  list.push(1)
  expect(list.length).toBe(1)
  list.push(2)
  expect(list.length).toBe(2)
  list.shift()
  expect(list.length).toBe(1)
})

test("iteration", () => {
  const list = new DLinkedList<number>()
  list.push(1)
  list.push(2)
  list.push(3)
  expect(list.length).toBe(3)
  const mapped = []
  for (const n of list) {
    mapped.push(n)
  }
  expect(mapped).toEqual([1, 2, 3])
})

test("map", () => {
  const list = new DLinkedList<number>()
  list.push(1)
  list.push(2)
  list.push(3)
  const mapped = list.map((n) => n * 2)
  expect(mapped instanceof DLinkedList).toBe(true)
  expect(Array.from(mapped)).toEqual([2, 4, 6])
})

test("filter", () => {
  const list = new DLinkedList<number>()
  list.push(1)
  list.push(2)
  list.push(3)
  list.push(4)
  const filtered = list.filter((n) => n % 2 === 0)
  expect(filtered instanceof DLinkedList).toBe(true)
  expect(Array.from(filtered)).toEqual([2, 4])
})
