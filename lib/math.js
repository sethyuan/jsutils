"use strict";

(function() {
  function mod(x, y) {
    return (x % y + y) % y;
  }

  if (module != null && exports != null) {
    module.exports = {
      mod: mod
    };
  } else {
    window.jsutils.math = {
      mod: mod
    };
  }
})();
