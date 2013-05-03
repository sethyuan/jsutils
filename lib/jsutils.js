var util = require("util");

exports.extend = function(dest, src) {
  var destType = typeof dest;
  var srcType = typeof src;
  if (!dest || (destType !== "object" && destType !== "function"))
    throw new TypeError("dest has to be a object or a function.");
  if (!src || (srcType !== "object" && srcType !== "function"))
    throw new TypeError("src has to be a object or a function.");

  var keys = Object.keys(src);
  for (var i = 0; i < keys.length; i++) {
    dest[keys[i]] = src[keys[i]];
  }
  return dest;
};

exports.clone = function clone(src) {
  if (util.isArray(src)) {
    var arr = new Array(src.length);
    for (var i = 0; i < arr.length; i++) {
      arr[i] = clone(src[i]);
    }
    return arr;
  } else if (util.isDate(src)) {
    return new Date(src.getTime());
  } else if (util.isRegExp(src)) {
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
};
