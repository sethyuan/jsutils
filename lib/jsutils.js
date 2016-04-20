"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.extend = extend;
exports.clone = clone;
exports.randomInt = randomInt;
exports.shuffle = shuffle;
function extend(dest, src) {
  if (dest == null || src == null) return dest;

  var destType = typeof dest === "undefined" ? "undefined" : _typeof(dest);
  var srcType = typeof src === "undefined" ? "undefined" : _typeof(src);

  if (destType !== "object" && destType !== "function" || srcType !== "object" && srcType !== "function") return dest;

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = Object.keys(src)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var key = _step.value;

      dest[key] = src[key];
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpzdXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7UUFBZ0I7UUFnQkE7UUEyQkE7UUFNQTtBQWpEVCxTQUFTLE1BQVQsQ0FBZ0IsSUFBaEIsRUFBc0IsR0FBdEIsRUFBMkI7QUFDaEMsTUFBSSxRQUFRLElBQVIsSUFBZ0IsT0FBTyxJQUFQLEVBQWEsT0FBTyxJQUFQLENBQWpDOztBQUVBLE1BQU0sa0JBQWtCLGtEQUFsQixDQUgwQjtBQUloQyxNQUFNLGlCQUFpQixnREFBakIsQ0FKMEI7O0FBTWhDLE1BQUksUUFBQyxLQUFhLFFBQWIsSUFBeUIsYUFBYSxVQUFiLElBQ3RCLFlBQVksUUFBWixJQUF3QixZQUFZLFVBQVosRUFBeUIsT0FBTyxJQUFQLENBRHpEOzt1Q0FOZ0M7Ozs7O0FBU2hDLHlCQUFnQixPQUFPLElBQVAsQ0FBWSxHQUFaLDJCQUFoQixvR0FBa0M7VUFBekIsa0JBQXlCOztBQUNoQyxXQUFLLEdBQUwsSUFBWSxJQUFJLEdBQUosQ0FBWixDQURnQztLQUFsQzs7Ozs7Ozs7Ozs7Ozs7R0FUZ0M7O0FBYWhDLFNBQU8sSUFBUCxDQWJnQztDQUEzQjs7QUFnQkEsU0FBUyxLQUFULENBQWUsR0FBZixFQUFvQjtBQUN6QixNQUFJLE1BQU0sT0FBTixDQUFjLEdBQWQsQ0FBSixFQUF3QjtBQUN0QixRQUFNLE1BQU0sSUFBSSxLQUFKLENBQVUsSUFBSSxNQUFKLENBQWhCLENBRGdCO0FBRXRCLFNBQUssSUFBSSxJQUFJLENBQUosRUFBTyxJQUFJLElBQUksTUFBSixFQUFZLEdBQWhDLEVBQXFDO0FBQ25DLFVBQUksQ0FBSixJQUFTLE1BQU0sSUFBSSxDQUFKLENBQU4sQ0FBVCxDQURtQztLQUFyQztBQUdBLFdBQU8sR0FBUCxDQUxzQjtHQUF4QixNQU1PLElBQUksZUFBZSxJQUFmLEVBQXFCO0FBQzlCLFdBQU8sSUFBSSxJQUFKLENBQVMsSUFBSSxPQUFKLEVBQVQsQ0FBUCxDQUQ4QjtHQUF6QixNQUVBLElBQUksZUFBZSxNQUFmLEVBQXVCO0FBQ2hDLFFBQU0sUUFBUSxDQUFDLElBQUksTUFBSixHQUFhLEdBQWIsR0FBbUIsRUFBbkIsQ0FBRCxJQUNDLElBQUksU0FBSixHQUFnQixHQUFoQixHQUFzQixFQUF0QixDQURELElBRUMsSUFBSSxVQUFKLEdBQWlCLEdBQWpCLEdBQXVCLEVBQXZCLENBRkQsQ0FEa0I7QUFJaEMsV0FBTyxJQUFJLE1BQUosQ0FBVyxJQUFJLE1BQUosRUFBWSxLQUF2QixDQUFQLENBSmdDO0dBQTNCLE1BS0EsSUFBSSxPQUFPLElBQUksV0FBSixLQUFvQixNQUFwQixFQUE0QjtBQUM1QyxRQUFNLElBQUksRUFBSixDQURzQztBQUU1QyxRQUFNLE9BQU8sT0FBTyxJQUFQLENBQVksR0FBWixDQUFQLENBRnNDO0FBRzVDLFNBQUssSUFBSSxLQUFJLENBQUosRUFBTyxLQUFJLEtBQUssTUFBTCxFQUFhLElBQWpDLEVBQXNDO0FBQ3BDLFVBQU0sTUFBTSxLQUFLLEVBQUwsQ0FBTixDQUQ4QjtBQUVwQyxRQUFFLEdBQUYsSUFBUyxNQUFNLElBQUksR0FBSixDQUFOLENBQVQsQ0FGb0M7S0FBdEM7QUFJQSxXQUFPLENBQVAsQ0FQNEM7R0FBdkMsTUFRQTtBQUNMLFdBQU8sR0FBUCxDQURLO0dBUkE7Q0FkRjs7QUEyQkEsU0FBUyxTQUFULENBQW1CLElBQW5CLEVBQXlCLEVBQXpCLEVBQTZCO0FBQ2xDLE1BQU0sUUFBUSxRQUFRLENBQVIsQ0FEb0I7QUFFbEMsTUFBTSxNQUFNLE1BQU0sQ0FBTixDQUZzQjtBQUdsQyxTQUFPLENBQUMsSUFBQyxDQUFLLE1BQUwsTUFBaUIsTUFBTSxLQUFOLEdBQWMsQ0FBZCxDQUFqQixJQUFzQyxDQUF2QyxDQUFELEdBQTZDLEtBQTdDLENBSDJCO0NBQTdCOztBQU1BLFNBQVMsT0FBVCxDQUFpQixLQUFqQixFQUF3QjtBQUM3QixNQUFJLElBQUksTUFBTSxNQUFOLENBRHFCO0FBRTdCLE1BQUksWUFBSjtNQUFTLFVBQVQsQ0FGNkI7O0FBSTdCLFNBQU8sQ0FBUCxFQUFVO0FBQ1IsUUFBSSxLQUFLLEtBQUwsQ0FBVyxLQUFLLE1BQUwsS0FBZ0IsR0FBaEIsQ0FBZixDQURROztBQUdSLFVBQU0sTUFBTSxDQUFOLENBQU4sQ0FIUTtBQUlSLFVBQU0sQ0FBTixJQUFXLE1BQU0sQ0FBTixDQUFYLENBSlE7QUFLUixVQUFNLENBQU4sSUFBVyxHQUFYLENBTFE7R0FBVjs7QUFRQSxTQUFPLEtBQVAsQ0FaNkI7Q0FBeEIiLCJmaWxlIjoianN1dGlscy5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBleHRlbmQoZGVzdCwgc3JjKSB7XG4gIGlmIChkZXN0ID09IG51bGwgfHwgc3JjID09IG51bGwpIHJldHVybiBkZXN0XG5cbiAgY29uc3QgZGVzdFR5cGUgPSB0eXBlb2YgZGVzdFxuICBjb25zdCBzcmNUeXBlID0gdHlwZW9mIHNyY1xuXG4gIGlmICgoZGVzdFR5cGUgIT09IFwib2JqZWN0XCIgJiYgZGVzdFR5cGUgIT09IFwiZnVuY3Rpb25cIilcbiAgICAgIHx8IChzcmNUeXBlICE9PSBcIm9iamVjdFwiICYmIHNyY1R5cGUgIT09IFwiZnVuY3Rpb25cIikpIHJldHVybiBkZXN0XG5cbiAgZm9yIChsZXQga2V5IG9mIE9iamVjdC5rZXlzKHNyYykpIHtcbiAgICBkZXN0W2tleV0gPSBzcmNba2V5XVxuICB9XG5cbiAgcmV0dXJuIGRlc3Rcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsb25lKHNyYykge1xuICBpZiAoQXJyYXkuaXNBcnJheShzcmMpKSB7XG4gICAgY29uc3QgYXJyID0gbmV3IEFycmF5KHNyYy5sZW5ndGgpXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFycltpXSA9IGNsb25lKHNyY1tpXSlcbiAgICB9XG4gICAgcmV0dXJuIGFyclxuICB9IGVsc2UgaWYgKHNyYyBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICByZXR1cm4gbmV3IERhdGUoc3JjLmdldFRpbWUoKSlcbiAgfSBlbHNlIGlmIChzcmMgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICBjb25zdCBhdHRycyA9IChzcmMuZ2xvYmFsID8gXCJnXCIgOiBcIlwiKVxuICAgICAgICAgICAgICAgICsgKHNyYy5tdWx0aWxpbmUgPyBcIm1cIiA6IFwiXCIpXG4gICAgICAgICAgICAgICAgKyAoc3JjLmlnbm9yZUNhc2UgPyBcImlcIiA6IFwiXCIpXG4gICAgcmV0dXJuIG5ldyBSZWdFeHAoc3JjLnNvdXJjZSwgYXR0cnMpXG4gIH0gZWxzZSBpZiAoc3JjICYmIHNyYy5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0KSB7XG4gICAgY29uc3QgbyA9IHt9XG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHNyYylcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGtleSA9IGtleXNbaV1cbiAgICAgIG9ba2V5XSA9IGNsb25lKHNyY1trZXldKVxuICAgIH1cbiAgICByZXR1cm4gb1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBzcmNcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmFuZG9tSW50KGZyb20sIHRvKSB7XG4gIGNvbnN0IHN0YXJ0ID0gZnJvbSA+PiAwXG4gIGNvbnN0IGVuZCA9IHRvID4+IDBcbiAgcmV0dXJuICgoTWF0aC5yYW5kb20oKSAqIChlbmQgLSBzdGFydCArIDEpKSA+PiAwKSArIHN0YXJ0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaHVmZmxlKGFycmF5KSB7XG4gIGxldCBtID0gYXJyYXkubGVuZ3RoXG4gIGxldCB0bXAsIGlcblxuICB3aGlsZSAobSkge1xuICAgIGkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBtLS0pXG5cbiAgICB0bXAgPSBhcnJheVttXVxuICAgIGFycmF5W21dID0gYXJyYXlbaV1cbiAgICBhcnJheVtpXSA9IHRtcFxuICB9XG5cbiAgcmV0dXJuIGFycmF5XG59XG4iXX0=
