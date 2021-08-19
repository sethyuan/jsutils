import { MaxPriorityQueue, MinPriorityQueue } from "../src/index"

describe("MaxPriorityQueue", () => {
  it("empty queue", () => {
    const q = new MaxPriorityQueue()
    expect(q.length).toBe(0)
    expect(q.pop()).toBe(undefined)
  })

  it("single element", () => {
    const q = new MaxPriorityQueue<string>()
    q.push(1, "s1")
    expect(q.length).toBe(1)
    expect(q.pop()).toBe("s1")
    expect(q.length).toBe(0)
  })

  it("multiple elements", () => {
    const q = new MaxPriorityQueue<string>()
    q.push(1, "s1")
    q.push(2, "s2")
    q.push(5, "s5")
    q.push(3, "s3")
    q.push(4, "s4")
    expect(q.length).toBe(5)
    expect(q.pop()).toBe("s5")
    expect(q.pop()).toBe("s4")
    expect(q.pop()).toBe("s3")
    expect(q.pop()).toBe("s2")
    expect(q.pop()).toBe("s1")
    expect(q.length).toBe(0)
  })

  it("multiple elements of the same priority", () => {
    const q = new MaxPriorityQueue<string>()
    q.push(1, "s1")
    q.push(1, "s2")
    q.push(1, "s3")
    q.push(1, "s4")
    q.push(1, "s5")
    console.log(q._data)
    expect(q.length).toBe(5)
    expect(q.pop()).toBe("s1")
    expect(q.pop()).toBe("s2")
    expect(q.pop()).toBe("s3")
    expect(q.pop()).toBe("s4")
    expect(q.pop()).toBe("s5")
    expect(q.length).toBe(0)
  })
})

describe("MinPriorityQueue", () => {
  it("empty queue", () => {
    const q = new MinPriorityQueue()
    expect(q.length).toBe(0)
    expect(q.pop()).toBe(undefined)
  })

  it("single element", () => {
    const q = new MinPriorityQueue<string>()
    q.push(1, "s1")
    expect(q.length).toBe(1)
    expect(q.pop()).toBe("s1")
    expect(q.length).toBe(0)
  })

  it("multiple elements", () => {
    const q = new MinPriorityQueue<string>()
    q.push(1, "s1")
    q.push(2, "s2")
    q.push(5, "s5")
    q.push(3, "s3")
    q.push(4, "s4")
    expect(q.length).toBe(5)
    expect(q.pop()).toBe("s1")
    expect(q.pop()).toBe("s2")
    expect(q.pop()).toBe("s3")
    expect(q.pop()).toBe("s4")
    expect(q.pop()).toBe("s5")
    expect(q.length).toBe(0)
  })

  it("multiple elements of the same priority", () => {
    const q = new MinPriorityQueue<string>()
    q.push(1, "s1")
    q.push(1, "s2")
    q.push(1, "s3")
    q.push(1, "s4")
    q.push(1, "s5")
    console.log(q._data)
    expect(q.length).toBe(5)
    expect(q.pop()).toBe("s1")
    expect(q.pop()).toBe("s2")
    expect(q.pop()).toBe("s3")
    expect(q.pop()).toBe("s4")
    expect(q.pop()).toBe("s5")
    expect(q.length).toBe(0)
  })
})
