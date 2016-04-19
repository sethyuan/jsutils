import {mod} from "../lib/math"
import {expect} from "chai"

describe("math", () => {
  describe("mod", () => {
    it("positive %", () => {
      expect(mod(6, 5)).equal(1)
    })

    it("negative %", () => {
      expect(mod(-6, 5)).equal(4)
    })
  })
})
