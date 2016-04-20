require("source-map-support").install()

import {
  extend,
  clone,
  shuffle,
  randomInt,
} from "../lib/jsutils"
import {expect} from "chai"

describe("extend", () => {
  it("simple object", () => {
    const x = {name: "Seth"}
    const y = {age: 30}
    const z = extend(x, y)
    expect(z).equal(x)
    expect(x).have.property("age").equal(y.age)
  })

  it("simple object override", () => {
    const x = {name: "Seth"}
    const y = {age: 30, name: "Fiona"}
    extend(x, y)
    expect(x).have.property("age").equal(y.age)
    expect(x.name).equal(y.name)
  })

  it("src is no object nor function", () => {
    const x = {name: "Seth"}
    const y = 20
    expect(extend(x, y)).equal(x)
  })

  it("dest is no object nor function", () => {
    const x = 20
    const y = {name: "Seth"}
    expect(extend(x, y)).equal(x)
  })

  it("src is null", () => {
    const x = {name: "Seth"}
    const y = null
    expect(extend(x, y)).equal(x)
  })

  it("dest is null", () => {
    const x = null
    const y = {name: "Seth"}
    expect(extend(x, y)).equal(x)
  })

  it("src is function", () => {
    const x = {name: "Seth"}
    const y = function() {}
    y.foo = "foo"
    expect(extend(x, y)).have.property("foo").equal(y.foo)
  })

  it("src is array", () => {
    const x = {name: "Seth"}
    const y = {toys: ["car", "xbox"] }
    extend(x, y)
    expect(x).have.property("toys").equal(y.toys)
  })
})

describe("clone", () => {
  it("simple object", () => {
    const x = {name: "Seth"}
    const y = clone(x)
    expect(y).have.property("name").equal(x.name)
  })

  it("object with array", () => {
    const x = {name: "Seth", toys: ["car", "xbox"]}
    const y = clone(x)
    expect(y).have.property("toys").not.equal(x.toys)
    expect(y.toys).deep.equal(x.toys)
  })

  it("object with complex array", () => {
    const x = {name: "Seth", toys: ["car", {kind: "game console", name: "xbox"}]}
    const y = clone(x)
    expect(y).have.property("toys").not.equal(x.toys)
    expect(y.toys).deep.equal(x.toys)
  })

  it("object with object", () => {
    const x = {name: "Seth", edu: {elementary: "xx"}}
    const y = clone(x)
    expect(y).have.property("edu").not.equal(x.edu)
    expect(y.edu).have.property("elementary").equal(x.edu.elementary)
  })

  it("object with Date", () => {
    const x = {name: "Seth", birth: new Date(2000, 12, 1)}
    const y = clone(x)
    expect(y).have.property("birth").not.equal(x.birth)
    expect(y.birth.getTime()).equal(x.birth.getTime())
  })

  it("object with RegExp", () => {
    const x = {name: "Seth", crit: /abc/g}
    const y = clone(x)
    expect(y).have.property("crit").not.equal(x.crit)
    expect(y.crit.toString()).equal(x.crit.toString())
  })
})

describe("random", () => {
  it("1 to 1", () => {
    for (let i = 0; i < 1000; i++) {
      expect(randomInt(1, 1)).within(1, 1)
    }
  })

  it("0 to 9", () => {
    for (let i = 0; i < 1000; i++) {
      expect(randomInt(0, 9)).within(0, 9)
    }
  })

  it("1 to 10", () => {
    for (let i = 0; i < 1000; i++) {
      expect(randomInt(1, 10)).within(1, 10)
    }
  })

  it("-10 to 10", () => {
    for (let i = 0; i < 1000; i++) {
      expect(randomInt(-10, 10)).within(-10, 10)
    }
  })

  it("10 to 1", () => {
    for (let i = 0; i < 1000; i++) {
      expect(randomInt(10, 1)).within(1, 10)
    }
  })
})


describe("shuffle", () => {
  it("shuffle", () => {
    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    shuffle(nums)
    console.log(nums)
    expect(nums).have.length(10)
  })
})
