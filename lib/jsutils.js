"use strict";

(function() {
  function extend(dest, src) {
    if (dest == null || src == null) return dest;

    var destType = typeof dest;
    var srcType = typeof src;
    if ((destType !== "object" && destType !== "function") ||
        (srcType !== "object" && srcType !== "function")) return dest;

    var keys = Object.keys(src);
    for (var i = 0; i < keys.length; i++) {
      dest[keys[i]] = src[keys[i]];
    }
    return dest;
  }

  function clone(src) {
    if (Array.isArray(src)) {
      var arr = new Array(src.length);
      for (var i = 0; i < arr.length; i++) {
        arr[i] = clone(src[i]);
      }
      return arr;
    } else if (src instanceof Date) {
      return new Date(src.getTime());
    } else if (src instanceof RegExp) {
      var attrs = (src.global ? "g" : "") +
                  (src.multiline ? "m" : "") +
                  (src.ignoreCase ? "i" : "");
      return new RegExp(src.source, attrs);
    } else if (src && src.constructor === Object) {
      var o = {};
      var keys = Object.keys(src);
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        o[key] = clone(src[key]);
      }
      return o;
    } else {
      return src;
    }
  }

  function randomInt(from, to) {
    var start = from >> 0;
    var end = to >> 0;
    return ((Math.random() * (end - start + 1)) >> 0) + start;
  }

  function shuffle(array) {
    var m = array.length;
    var tmp, i;

    while (m) {
      i = Math.floor(Math.random() * m--);

      tmp = array[m];
      array[m] = array[i];
      array[i] = tmp;
    }

    return array;
  }

  if (module != null && exports != null) {
    module.exports = {
      extend: extend,
      clone: clone,
      randomInt: randomInt,
      shuffle: shuffle,

      math: require("./math"),
      date: require("./date")
    };
  } else {
    window.jsutils = {
      extend: extend,
      clone: clone,
      randomInt: randomInt,
      shuffle: shuffle
    };
  }
})();
