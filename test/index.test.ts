import { randomInt } from "../src/index"

describe("random", () => {
  it("1 to 1", () => {
    for (let i = 0; i < 1000; i++) {
      expect(randomInt(1, 1)).toBe(1)
    }
  })

  it("0 to 9", () => {
    for (let i = 0; i < 1000; i++) {
      const val = randomInt(0, 9)
      expect(val).toBeGreaterThanOrEqual(0)
      expect(val).toBeLessThanOrEqual(9)
    }
  })

  it("1 to 10", () => {
    for (let i = 0; i < 1000; i++) {
      const val = randomInt(1, 10)
      expect(val).toBeGreaterThanOrEqual(1)
      expect(val).toBeLessThanOrEqual(10)
    }
  })

  it("-10 to 10", () => {
    for (let i = 0; i < 1000; i++) {
      const val = randomInt(-10, 10)
      expect(val).toBeGreaterThanOrEqual(-10)
      expect(val).toBeLessThanOrEqual(10)
    }
  })

  it("10 to 1", () => {
    for (let i = 0; i < 1000; i++) {
      const val = randomInt(10, 1)
      expect(val).toBeGreaterThanOrEqual(1)
      expect(val).toBeLessThanOrEqual(10)
    }
  })
})
