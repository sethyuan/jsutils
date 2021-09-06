import { MaxHeap, MinHeap } from "../src/index"

describe("MaxHeap", () => {
  test("empty", () => {
    const h = new MaxHeap()
    expect(h.length).toBe(0)
    expect(h.pop()).toBe(undefined)
  })

  test("multiple numbers", () => {
    const h = new MaxHeap()
    h.push(2)
    h.push(1)
    h.push(3)
    h.push(4)
    expect(h.length).toBe(4)
    expect(h.peek()).toBe(4)
    expect(h.pop()).toBe(4)
    expect(h.pop()).toBe(3)
    expect(h.pop()).toBe(2)
    expect(h.pop()).toBe(1)
  })
})

describe("MinHeap", () => {
  test("empty", () => {
    const h = new MinHeap()
    expect(h.length).toBe(0)
    expect(h.pop()).toBe(undefined)
  })

  test("multiple numbers", () => {
    const h = new MinHeap()
    h.push(2)
    h.push(1)
    h.push(3)
    h.push(4)
    expect(h.length).toBe(4)
    expect(h.peek()).toBe(1)
    expect(h.pop()).toBe(1)
    expect(h.pop()).toBe(2)
    expect(h.pop()).toBe(3)
    expect(h.pop()).toBe(4)
  })
})
