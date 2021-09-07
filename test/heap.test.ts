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

  test("obj", () => {
    interface Obj {
      name: string
      priority: number
    }

    const h = new MaxHeap<Obj>((x) => x?.priority)
    h.push({ name: "n1", priority: 2 })
    h.push({ name: "n2", priority: 1 })
    h.push({ name: "n3", priority: 3 })
    h.push({ name: "n4", priority: 4 })
    expect(h.length).toBe(4)
    expect(h.pop().name).toBe("n4")
    expect(h.pop().name).toBe("n3")
    expect(h.pop().name).toBe("n1")
    expect(h.pop().name).toBe("n2")
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

  test("obj", () => {
    interface Obj {
      name: string
      priority: number
    }

    const h = new MinHeap<Obj>((x) => x?.priority)
    h.push({ name: "n1", priority: 2 })
    h.push({ name: "n2", priority: 1 })
    h.push({ name: "n3", priority: 3 })
    h.push({ name: "n4", priority: 4 })
    expect(h.length).toBe(4)
    expect(h.pop().name).toBe("n2")
    expect(h.pop().name).toBe("n1")
    expect(h.pop().name).toBe("n3")
    expect(h.pop().name).toBe("n4")
  })
})
