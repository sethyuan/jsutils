import { Stack } from "../src/index"

describe("Stack", () => {
  it("2 push 2 pop", () => {
    const s = new Stack<number>()
    s.push(1)
    s.push(2)
    expect(s.pop()).toBe(2)
    expect(s.pop()).toBe(1)
    expect(s.pop()).toBe(undefined)
  })

  it("length", () => {
    const s = new Stack<number>()
    expect(s.length).toBe(0)
    s.push(1)
    expect(s.length).toBe(1)
    s.push(2)
    expect(s.length).toBe(2)
    s.pop()
    expect(s.length).toBe(1)
  })

  it("peek", () => {
    const s = new Stack<number>()
    s.push(1)
    s.push(2)
    s.push(3)
    expect(s.peek()).toBe(3)
    s.pop()
    expect(s.peek()).toBe(2)
  })

  it("peek after popAll", () => {
    const s = new Stack<number>()
    s.push(1)
    s.push(2)
    s.push(3)
    expect(s.peek()).toBe(3)
    s.popAll()
    expect(s.peek()).toBe(undefined)
  })

  it("pushAll popAll", () => {
    const s = new Stack<number>()
    s.push(1)
    s.pushAll([2, 3])
    expect(s.popAll()).toEqual([3, 2, 1])
  })
})
