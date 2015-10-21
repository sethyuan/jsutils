"use strict";

function stdTimezoneOffset() {
  var jan = new Date(this.getFullYear(), 0, 1);
  var jul = new Date(this.getFullYear(), 6, 1);
  return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
}

exports.isDst = function(date) {
  return date.getTimezoneOffset() < stdTimezoneOffset();
};
