"use strict";

var util = require("util");

exports.extend = function(dest, src) {
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

exports.randomInt = function(from, to) {
  var start = from >> 0;
  var end = to >> 0;
  return ((Math.random() * (end - start + 1)) >> 0) + start;
};

exports.shuffle = function(array) {
  var m = array.length;
  var tmp, i;

  while (m) {
    i = Math.floor(Math.random() * m--);

    tmp = array[m];
    array[m] = array[i];
    array[i] = tmp;
  }

  return array;
};

exports.math = require("./math");
exports.date = require("./date");
