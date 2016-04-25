"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.merge = merge;
exports.clone = clone;
exports.randomInt = randomInt;
exports.shuffle = shuffle;
function mergeBase(dest, src) {
  if (!(src && src.constructor === Object)) return dest;

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = Object.keys(src)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var key = _step.value;

      var d = dest[key];
      var s = src[key];

      if (d && d.constructor === Object && s && s.constructor === Object) {
        mergeBase(d, s);
      } else if (Array.isArray(d) && Array.isArray(s)) {
        for (var i = 0; i < s.length; i++) {
          if (d[i] && d[i].constructor === Object && s[i] && s[i].constructor === Object) {
            mergeBase(d[i], s[i]);
          } else {
            d[i] = s[i];
          }
        }
      } else {
        dest[key] = clone(s);
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return dest;
}

function merge(dest) {
  for (var _len = arguments.length, srcs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    srcs[_key - 1] = arguments[_key];
  }

  return srcs.reduce(function (res, src) {
    return mergeBase(res, src);
  }, dest);
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
    var attrs = (src.global ? "g" : "") + (src.multiline ? "m" : "") + (src.ignoreCase ? "i" : "");
    return new RegExp(src.source, attrs);
  } else if (src && src.constructor === Object) {
    var o = {};
    var keys = Object.keys(src);
    for (var _i = 0; _i < keys.length; _i++) {
      var key = keys[_i];
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
  return (Math.random() * (end - start + 1) >> 0) + start;
}

function shuffle(array) {
  var m = array.length;
  var tmp = void 0,
      i = void 0;

  while (m) {
    i = Math.floor(Math.random() * m--);

    tmp = array[m];
    array[m] = array[i];
    array[i] = tmp;
  }

  return array;
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,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QVAsQ0FBWSxHQUFaLENBQVAsQ0FGc0M7QUFHNUMsU0FBSyxJQUFJLEtBQUksQ0FBSixFQUFPLEtBQUksS0FBSyxNQUFMLEVBQWEsSUFBakMsRUFBc0M7QUFDcEMsVUFBTSxNQUFNLEtBQUssRUFBTCxDQUFOLENBRDhCO0FBRXBDLFFBQUUsR0FBRixJQUFTLE1BQU0sSUFBSSxHQUFKLENBQU4sQ0FBVCxDQUZvQztLQUF0QztBQUlBLFdBQU8sQ0FBUCxDQVA0QztHQUF2QyxNQVFBO0FBQ0wsV0FBTyxHQUFQLENBREs7R0FSQTtDQWRGOztBQTJCQSxTQUFTLFNBQVQsQ0FBbUIsSUFBbkIsRUFBeUIsRUFBekIsRUFBNkI7QUFDbEMsTUFBTSxRQUFRLFFBQVEsQ0FBUixDQURvQjtBQUVsQyxNQUFNLE1BQU0sTUFBTSxDQUFOLENBRnNCO0FBR2xDLFNBQU8sQ0FBQyxJQUFDLENBQUssTUFBTCxNQUFpQixNQUFNLEtBQU4sR0FBYyxDQUFkLENBQWpCLElBQXNDLENBQXZDLENBQUQsR0FBNkMsS0FBN0MsQ0FIMkI7Q0FBN0I7O0FBTUEsU0FBUyxPQUFULENBQWlCLEtBQWpCLEVBQXdCO0FBQzdCLE1BQUksSUFBSSxNQUFNLE1BQU4sQ0FEcUI7QUFFN0IsTUFBSSxZQUFKO01BQVMsVUFBVCxDQUY2Qjs7QUFJN0IsU0FBTyxDQUFQLEVBQVU7QUFDUixRQUFJLEtBQUssS0FBTCxDQUFXLEtBQUssTUFBTCxLQUFnQixHQUFoQixDQUFmLENBRFE7O0FBR1IsVUFBTSxNQUFNLENBQU4sQ0FBTixDQUhRO0FBSVIsVUFBTSxDQUFOLElBQVcsTUFBTSxDQUFOLENBQVgsQ0FKUTtBQUtSLFVBQU0sQ0FBTixJQUFXLEdBQVgsQ0FMUTtHQUFWOztBQVFBLFNBQU8sS0FBUCxDQVo2QjtDQUF4QiIsImZpbGUiOiJqc3V0aWxzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gbWVyZ2VCYXNlKGRlc3QsIHNyYykge1xuICBpZiAoIShzcmMgJiYgc3JjLmNvbnN0cnVjdG9yID09PSBPYmplY3QpKSByZXR1cm4gZGVzdFxuXG4gIGZvciAobGV0IGtleSBvZiBPYmplY3Qua2V5cyhzcmMpKSB7XG4gICAgY29uc3QgZCA9IGRlc3Rba2V5XVxuICAgIGNvbnN0IHMgPSBzcmNba2V5XVxuXG4gICAgaWYgKGQgJiYgZC5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0ICYmIHMgJiYgcy5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0KSB7XG4gICAgICBtZXJnZUJhc2UoZCwgcylcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoZCkgJiYgQXJyYXkuaXNBcnJheShzKSkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChkW2ldICYmIGRbaV0uY29uc3RydWN0b3IgPT09IE9iamVjdFxuICAgICAgICAgICAgJiYgc1tpXSAmJiBzW2ldLmNvbnN0cnVjdG9yID09PSBPYmplY3QpIHtcbiAgICAgICAgICBtZXJnZUJhc2UoZFtpXSwgc1tpXSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkW2ldID0gc1tpXVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlc3Rba2V5XSA9IGNsb25lKHMpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGRlc3Rcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlKGRlc3QsIC4uLnNyY3MpIHtcbiAgcmV0dXJuIHNyY3MucmVkdWNlKChyZXMsIHNyYykgPT4gbWVyZ2VCYXNlKHJlcywgc3JjKSwgZGVzdClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsb25lKHNyYykge1xuICBpZiAoQXJyYXkuaXNBcnJheShzcmMpKSB7XG4gICAgY29uc3QgYXJyID0gbmV3IEFycmF5KHNyYy5sZW5ndGgpXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFycltpXSA9IGNsb25lKHNyY1tpXSlcbiAgICB9XG4gICAgcmV0dXJuIGFyclxuICB9IGVsc2UgaWYgKHNyYyBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICByZXR1cm4gbmV3IERhdGUoc3JjLmdldFRpbWUoKSlcbiAgfSBlbHNlIGlmIChzcmMgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICBjb25zdCBhdHRycyA9IChzcmMuZ2xvYmFsID8gXCJnXCIgOiBcIlwiKVxuICAgICAgICAgICAgICAgICsgKHNyYy5tdWx0aWxpbmUgPyBcIm1cIiA6IFwiXCIpXG4gICAgICAgICAgICAgICAgKyAoc3JjLmlnbm9yZUNhc2UgPyBcImlcIiA6IFwiXCIpXG4gICAgcmV0dXJuIG5ldyBSZWdFeHAoc3JjLnNvdXJjZSwgYXR0cnMpXG4gIH0gZWxzZSBpZiAoc3JjICYmIHNyYy5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0KSB7XG4gICAgY29uc3QgbyA9IHt9XG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHNyYylcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGtleSA9IGtleXNbaV1cbiAgICAgIG9ba2V5XSA9IGNsb25lKHNyY1trZXldKVxuICAgIH1cbiAgICByZXR1cm4gb1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBzcmNcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmFuZG9tSW50KGZyb20sIHRvKSB7XG4gIGNvbnN0IHN0YXJ0ID0gZnJvbSA+PiAwXG4gIGNvbnN0IGVuZCA9IHRvID4+IDBcbiAgcmV0dXJuICgoTWF0aC5yYW5kb20oKSAqIChlbmQgLSBzdGFydCArIDEpKSA+PiAwKSArIHN0YXJ0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaHVmZmxlKGFycmF5KSB7XG4gIGxldCBtID0gYXJyYXkubGVuZ3RoXG4gIGxldCB0bXAsIGlcblxuICB3aGlsZSAobSkge1xuICAgIGkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBtLS0pXG5cbiAgICB0bXAgPSBhcnJheVttXVxuICAgIGFycmF5W21dID0gYXJyYXlbaV1cbiAgICBhcnJheVtpXSA9IHRtcFxuICB9XG5cbiAgcmV0dXJuIGFycmF5XG59XG4iXX0=
