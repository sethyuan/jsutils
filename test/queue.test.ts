import { Queue } from "../src/index"

describe("Queue", () => {
  it("2 push 2 pop", () => {
    const q = new Queue<number>()
    q.push(1)
    q.push(2)
    expect(q.pop()).toBe(1)
    expect(q.pop()).toBe(2)
    expect(q.pop()).toBe(undefined)
  })

  it("length", () => {
    const q = new Queue<number>()
    expect(q.length).toBe(0)
    q.push(1)
    expect(q.length).toBe(1)
    q.push(2)
    expect(q.length).toBe(2)
    q.pop()
    expect(q.length).toBe(1)
  })

  it("pushAll popAll", () => {
    const q = new Queue<number>()
    q.push(1)
    q.pushAll([2, 3])
    expect(q.popAll()).toEqual([1, 2, 3])
  })
})
