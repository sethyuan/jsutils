import { LinkedList } from "../src/index"

describe("LinkedList", () => {
  describe("modification", () => {
    it("2 push 2 shift", () => {
      const list = new LinkedList<number>()
      list.push(1)
      list.push(2)
      expect(list.shift()).toBe(1)
      expect(list.shift()).toBe(2)
      expect(list.shift()).toBe(undefined)
    })

    it("prepend empty", () => {
      const list = new LinkedList<number>()
      list.prepend([])
      expect(list.length).toBe(0)
      expect(Array.from(list)).toEqual([])
    })

    it("prepend empty but list not empty", () => {
      const list = new LinkedList<number>()
      list.push(1)
      list.prepend([])
      expect(list.length).toBe(1)
      expect(Array.from(list)).toEqual([1])
    })

    it("prepend to an empty list", () => {
      const list = new LinkedList<number>()
      list.prepend([1, 2])
      expect(list.length).toBe(2)
      expect(Array.from(list)).toEqual([1, 2])
    })

    it("prepend", () => {
      const list = new LinkedList<number>()
      list.push(3)
      list.prepend([1, 2])
      expect(list.length).toBe(3)
      expect(Array.from(list)).toEqual([1, 2, 3])
    })

    it("append empty", () => {
      const list = new LinkedList<number>()
      list.append([])
      expect(list.length).toBe(0)
      expect(Array.from(list)).toEqual([])
    })

    it("append empty but list not empty", () => {
      const list = new LinkedList<number>()
      list.push(1)
      list.append([])
      expect(list.length).toBe(1)
      expect(Array.from(list)).toEqual([1])
    })

    it("append to an empty list", () => {
      const list = new LinkedList<number>()
      list.append([1, 2])
      expect(list.length).toBe(2)
      expect(Array.from(list)).toEqual([1, 2])
    })

    it("append", () => {
      const list = new LinkedList<number>()
      list.push(1)
      list.append([2, 3])
      expect(list.length).toBe(3)
      expect(Array.from(list)).toEqual([1, 2, 3])
    })
  })

  describe("length", () => {
    it("length", () => {
      const list = new LinkedList<number>()
      expect(list.length).toBe(0)
      list.push(1)
      expect(list.length).toBe(1)
      list.push(2)
      expect(list.length).toBe(2)
      list.shift()
      expect(list.length).toBe(1)
    })
  })

  describe("iteration", () => {
    it("iteration", () => {
      const list = new LinkedList<number>()
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
  })

  describe("map", () => {
    it("map", () => {
      const list = new LinkedList<number>()
      list.push(1)
      list.push(2)
      list.push(3)
      const mapped = list.map((n) => n * 2)
      expect(mapped instanceof LinkedList).toBe(true)
      expect(Array.from(mapped)).toEqual([2, 4, 6])
    })
  })

  describe("filter", () => {
    it("filter", () => {
      const list = new LinkedList<number>()
      list.push(1)
      list.push(2)
      list.push(3)
      list.push(4)
      const filtered = list.filter((n) => n % 2 === 0)
      expect(filtered instanceof LinkedList).toBe(true)
      expect(Array.from(filtered)).toEqual([2, 4])
    })
  })
})
