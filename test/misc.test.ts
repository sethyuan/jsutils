import { mod, randomInt } from "../src/index"

describe("mod", () => {
  test("positive %", () => {
    expect(mod(6, 5)).toBe(1)
  })

  test("negative %", () => {
    expect(mod(-6, 5)).toBe(4)
  })
})

describe("random", () => {
  test("1 to 1", () => {
    for (let i = 0; i < 1000; i++) {
      expect(randomInt(1, 1)).toBe(1)
    }
  })

  test("0 to 9", () => {
    for (let i = 0; i < 1000; i++) {
      const val = randomInt(0, 9)
      expect(val).toBeGreaterThanOrEqual(0)
      expect(val).toBeLessThanOrEqual(9)
    }
  })

  test("1 to 10", () => {
    for (let i = 0; i < 1000; i++) {
      const val = randomInt(1, 10)
      expect(val).toBeGreaterThanOrEqual(1)
      expect(val).toBeLessThanOrEqual(10)
    }
  })

  test("-10 to 10", () => {
    for (let i = 0; i < 1000; i++) {
      const val = randomInt(-10, 10)
      expect(val).toBeGreaterThanOrEqual(-10)
      expect(val).toBeLessThanOrEqual(10)
    }
  })

  test("10 to 1", () => {
    for (let i = 0; i < 1000; i++) {
      const val = randomInt(10, 1)
      expect(val).toBeGreaterThanOrEqual(1)
      expect(val).toBeLessThanOrEqual(10)
    }
  })
})
