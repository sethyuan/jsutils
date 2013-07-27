var utils = require("../"),
    should = require("should");

describe("extend", function() {
  it("simple object", function() {
    var x = {name: "Seth"};
    var y = {age: 30};
    var z = utils.extend(x, y);
    z.should.equal(x);
    x.should.have.property("age").equal(y.age);
  });

  it("simple object override", function() {
    var x = {name: "Seth"};
    var y = {age: 30, name: "Fiona"};
    utils.extend(x, y);
    x.should.have.property("age").equal(y.age);
    x.name.should.eql("Fiona");
  });

  it("src is no object nor function", function() {
    var x = {name: "Seth"};
    var y = 20;
    (function() {
      utils.extend(x, y);
    }).should.throw();
  });

  it("dest is no object nor function", function() {
    var x = 20;
    var y = {name: "Seth"};
    (function() {
      utils.extend(x, y);
    }).should.throw();
  });

  it("src is null", function() {
    var x = {name: "Seth"};
    var y = null;
    (function() {
      utils.extend(x, y);
    }).should.throw();
  });

  it("dest is null", function() {
    var x = null;
    var y = {name: "Seth"};
    (function() {
      utils.extend(x, y);
    }).should.throw();
  });

  it("src is function", function() {
    var x = {name: "Seth"};
    var y = function() {};
    y.foo = "foo";
    utils.extend(x, y).should.have.property("foo").equal(y.foo);
  });

  it("src is array", function() {
    var x = {name: "Seth"};
    var y = {toys: ["car", "xbox"] };
    utils.extend(x, y);
    x.should.have.property("toys").equal(y.toys);
  });
});

describe("clone", function() {
  it("simple object", function() {
    var x = {name: "Seth"};
    var y = utils.clone(x);
    y.should.have.property("name").eql(x.name);
  });

  it("object with array", function() {
    var x = {name: "Seth", toys: ["car", "xbox"]};
    var y = utils.clone(x);
    y.should.have.property("toys");
    y.toys.should.not.equal(x.toys);
    y.toys.should.eql(x.toys);
  });

  it("object with complex array", function() {
    var x = {name: "Seth", toys: ["car", {kind: "game console", name: "xbox"}]};
    var y = utils.clone(x);
    y.should.have.property("toys");
    y.toys.should.not.equal(x.toys);
    y.toys.should.eql(x.toys);
  });

  it("object with object", function() {
    var x = {name: "Seth", edu: {elementary: "xx"}};
    var y = utils.clone(x);
    y.should.have.property("edu");
    y.edu.should.not.equal(x.edu);
    y.edu.should.have.property("elementary").eql(x.edu.elementary);
  });

  it("object with Date", function() {
    var x = {name: "Seth", birth: new Date(2000, 12, 1)};
    var y = utils.clone(x);
    y.should.have.property("birth");
    y.birth.should.not.equal(x.birth);
    y.birth.getTime().should.eql(x.birth.getTime());
  });

  it("object with RegExp", function() {
    var x = {name: "Seth", crit: /abc/g};
    var y = utils.clone(x);
    y.should.have.property("crit");
    y.crit.should.not.equal(x.crit);
    y.crit.toString().should.eql(x.crit.toString());
  });
});

describe("math", function() {
  var jsm = utils.math;

  it("positive %", function() {
    jsm.mod(6, 5).should.equal(1);
  });

  it("negative %", function() {
    jsm.mod(-6, 5).should.equal(4);
  });
});

describe("random", function() {
  it("0 to 9", function() {
    for (var i = 0; i < 1000; i++) {
      utils.randomInt(0, 9).should.be.within(0, 9);
    }
  });

  it("1 to 10", function() {
    for (var i = 0; i < 1000; i++) {
      utils.randomInt(1, 10).should.be.within(1, 10);
    }
  });

  it("-10 to 10", function() {
    for (var i = 0; i < 1000; i++) {
      var v = utils.randomInt(-10, 10);
      console.log(v);
      v.should.be.within(-10, 10);
    }
  });

  it("10 to 1", function() {
    for (var i = 0; i < 1000; i++) {
      utils.randomInt(10, 1).should.be.within(1, 10);
    }
  });
});
