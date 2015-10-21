"use strict";

var jsutils = require("../");
var expect = require("chai").expect;

describe("extend", function() {
  it("simple object", function() {
    var x = {name: "Seth"};
    var y = {age: 30};
    var z = jsutils.extend(x, y);
    expect(z).equal(x);
    expect(x).have.property("age").equal(y.age);
  });

  it("simple object override", function() {
    var x = {name: "Seth"};
    var y = {age: 30, name: "Fiona"};
    jsutils.extend(x, y);
    expect(x).have.property("age").equal(y.age);
    expect(x.name).equal(y.name);
  });

  it("src is no object nor function", function() {
    var x = {name: "Seth"};
    var y = 20;
    expect(jsutils.extend(x, y)).equal(x);
  });

  it("dest is no object nor function", function() {
    var x = 20;
    var y = {name: "Seth"};
    expect(jsutils.extend(x, y)).equal(x);
  });

  it("src is null", function() {
    var x = {name: "Seth"};
    var y = null;
    expect(jsutils.extend(x, y)).equal(x);
  });

  it("dest is null", function() {
    var x = null;
    var y = {name: "Seth"};
    expect(jsutils.extend(x, y)).equal(x);
  });

  it("src is function", function() {
    var x = {name: "Seth"};
    var y = function() {};
    y.foo = "foo";
    expect(jsutils.extend(x, y)).have.property("foo").equal(y.foo);
  });

  it("src is array", function() {
    var x = {name: "Seth"};
    var y = {toys: ["car", "xbox"] };
    jsutils.extend(x, y);
    expect(x).have.property("toys").equal(y.toys);
  });
});

describe("clone", function() {
  it("simple object", function() {
    var x = {name: "Seth"};
    var y = jsutils.clone(x);
    expect(y).have.property("name").equal(x.name);
  });

  it("object with array", function() {
    var x = {name: "Seth", toys: ["car", "xbox"]};
    var y = jsutils.clone(x);
    expect(y).have.property("toys").not.equal(x.toys);
    expect(y.toys).deep.equal(x.toys);
  });

  it("object with complex array", function() {
    var x = {name: "Seth", toys: ["car", {kind: "game console", name: "xbox"}]};
    var y = jsutils.clone(x);
    expect(y).have.property("toys").not.equal(x.toys);
    expect(y.toys).deep.equal(x.toys);
  });

  it("object with object", function() {
    var x = {name: "Seth", edu: {elementary: "xx"}};
    var y = jsutils.clone(x);
    expect(y).have.property("edu").not.equal(x.edu);
    expect(y.edu).have.property("elementary").equal(x.edu.elementary);
  });

  it("object with Date", function() {
    var x = {name: "Seth", birth: new Date(2000, 12, 1)};
    var y = jsutils.clone(x);
    expect(y).have.property("birth").not.equal(x.birth);
    expect(y.birth.getTime()).equal(x.birth.getTime());
  });

  it("object with RegExp", function() {
    var x = {name: "Seth", crit: /abc/g};
    var y = jsutils.clone(x);
    expect(y).have.property("crit").not.equal(x.crit);
    expect(y.crit.toString()).equal(x.crit.toString());
  });
});

describe("random", function() {
  it("1 to 1", function() {
    for (var i = 0; i < 1000; i++) {
      expect(jsutils.randomInt(1, 1)).within(1, 1);
    }
  });

  it("0 to 9", function() {
    for (var i = 0; i < 1000; i++) {
      expect(jsutils.randomInt(0, 9)).within(0, 9);
    }
  });

  it("1 to 10", function() {
    for (var i = 0; i < 1000; i++) {
      expect(jsutils.randomInt(1, 10)).within(1, 10);
    }
  });

  it("-10 to 10", function() {
    for (var i = 0; i < 1000; i++) {
      expect(jsutils.randomInt(-10, 10)).within(-10, 10);
    }
  });

  it("10 to 1", function() {
    for (var i = 0; i < 1000; i++) {
      expect(jsutils.randomInt(10, 1)).within(1, 10);
    }
  });
});


describe("shuffle", function() {
  it("shuffle", function() {
    var nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    jsutils.shuffle(nums);
    console.log(nums);
    expect(nums).have.length(10);
  });
});

describe("math", function() {
  var jsm = jsutils.math;

  it("positive %", function() {
    expect(jsm.mod(6, 5)).equal(1);
  });

  it("negative %", function() {
    expect(jsm.mod(-6, 5)).equal(4);
  });
});
