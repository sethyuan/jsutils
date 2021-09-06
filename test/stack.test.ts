import { Stack } from "../src/index"

test("2 push 2 pop", () => {
  const s = new Stack<number>()
  s.push(1)
  s.push(2)
  expect(s.pop()).toBe(2)
  expect(s.pop()).toBe(1)
  expect(s.pop()).toBe(undefined)
})

test("length", () => {
  const s = new Stack<number>()
  expect(s.length).toBe(0)
  s.push(1)
  expect(s.length).toBe(1)
  s.push(2)
  expect(s.length).toBe(2)
  s.pop()
  expect(s.length).toBe(1)
})

test("peek", () => {
  const s = new Stack<number>()
  s.push(1)
  s.push(2)
  s.push(3)
  expect(s.peek()).toBe(3)
  s.pop()
  expect(s.peek()).toBe(2)
})

test("peek after popAll", () => {
  const s = new Stack<number>()
  s.push(1)
  s.push(2)
  s.push(3)
  expect(s.peek()).toBe(3)
  s.popAll()
  expect(s.peek()).toBe(undefined)
})

test("pushAll popAll", () => {
  const s = new Stack<number>()
  s.push(1)
  s.pushAll([2, 3])
  expect(s.popAll()).toEqual([3, 2, 1])
})
