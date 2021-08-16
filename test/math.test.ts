import { mod } from "../src/index"

describe("math", () => {
  describe("mod", () => {
    it("positive %", () => {
      expect(mod(6, 5)).toBe(1)
    })

    it("negative %", () => {
      expect(mod(-6, 5)).toBe(4)
    })
  })
})
