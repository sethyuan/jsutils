"use strict";

(function() {
  function stdTimezoneOffset() {
    var jan = new Date(this.getFullYear(), 0, 1);
    var jul = new Date(this.getFullYear(), 6, 1);
    return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
  }

  function isDst(date) {
    return date.getTimezoneOffset() < stdTimezoneOffset();
  }

  if (module != null && exports != null) {
    module.exports = {
      isDst: isDst
    };
  } else {
    window.jsutils.date = {
      isDst: isDst
    };
  }
})();
