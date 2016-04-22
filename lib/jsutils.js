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
        dest[key] = s;
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,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QVosQ0FBUCxDQUZzQztBQUc1QyxTQUFLLElBQUksS0FBSSxDQUFKLEVBQU8sS0FBSSxLQUFLLE1BQUwsRUFBYSxJQUFqQyxFQUFzQztBQUNwQyxVQUFNLE1BQU0sS0FBSyxFQUFMLENBQU4sQ0FEOEI7QUFFcEMsUUFBRSxHQUFGLElBQVMsTUFBTSxJQUFJLEdBQUosQ0FBTixDQUFULENBRm9DO0tBQXRDO0FBSUEsV0FBTyxDQUFQLENBUDRDO0dBQXZDLE1BUUE7QUFDTCxXQUFPLEdBQVAsQ0FESztHQVJBO0NBZEY7O0FBMkJBLFNBQVMsU0FBVCxDQUFtQixJQUFuQixFQUF5QixFQUF6QixFQUE2QjtBQUNsQyxNQUFNLFFBQVEsUUFBUSxDQUFSLENBRG9CO0FBRWxDLE1BQU0sTUFBTSxNQUFNLENBQU4sQ0FGc0I7QUFHbEMsU0FBTyxDQUFDLElBQUMsQ0FBSyxNQUFMLE1BQWlCLE1BQU0sS0FBTixHQUFjLENBQWQsQ0FBakIsSUFBc0MsQ0FBdkMsQ0FBRCxHQUE2QyxLQUE3QyxDQUgyQjtDQUE3Qjs7QUFNQSxTQUFTLE9BQVQsQ0FBaUIsS0FBakIsRUFBd0I7QUFDN0IsTUFBSSxJQUFJLE1BQU0sTUFBTixDQURxQjtBQUU3QixNQUFJLFlBQUo7TUFBUyxVQUFULENBRjZCOztBQUk3QixTQUFPLENBQVAsRUFBVTtBQUNSLFFBQUksS0FBSyxLQUFMLENBQVcsS0FBSyxNQUFMLEtBQWdCLEdBQWhCLENBQWYsQ0FEUTs7QUFHUixVQUFNLE1BQU0sQ0FBTixDQUFOLENBSFE7QUFJUixVQUFNLENBQU4sSUFBVyxNQUFNLENBQU4sQ0FBWCxDQUpRO0FBS1IsVUFBTSxDQUFOLElBQVcsR0FBWCxDQUxRO0dBQVY7O0FBUUEsU0FBTyxLQUFQLENBWjZCO0NBQXhCIiwiZmlsZSI6ImpzdXRpbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBtZXJnZUJhc2UoZGVzdCwgc3JjKSB7XG4gIGlmICghKHNyYyAmJiBzcmMuY29uc3RydWN0b3IgPT09IE9iamVjdCkpIHJldHVybiBkZXN0XG5cbiAgZm9yIChsZXQga2V5IG9mIE9iamVjdC5rZXlzKHNyYykpIHtcbiAgICBjb25zdCBkID0gZGVzdFtrZXldXG4gICAgY29uc3QgcyA9IHNyY1trZXldXG5cbiAgICBpZiAoZCAmJiBkLmNvbnN0cnVjdG9yID09PSBPYmplY3QgJiYgcyAmJiBzLmNvbnN0cnVjdG9yID09PSBPYmplY3QpIHtcbiAgICAgIG1lcmdlQmFzZShkLCBzKVxuICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShkKSAmJiBBcnJheS5pc0FycmF5KHMpKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGRbaV0gJiYgZFtpXS5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0XG4gICAgICAgICAgICAmJiBzW2ldICYmIHNbaV0uY29uc3RydWN0b3IgPT09IE9iamVjdCkge1xuICAgICAgICAgIG1lcmdlQmFzZShkW2ldLCBzW2ldKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRbaV0gPSBzW2ldXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZGVzdFtrZXldID0gc1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBkZXN0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZShkZXN0LCAuLi5zcmNzKSB7XG4gIHJldHVybiBzcmNzLnJlZHVjZSgocmVzLCBzcmMpID0+IG1lcmdlQmFzZShyZXMsIHNyYyksIGRlc3QpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbG9uZShzcmMpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoc3JjKSkge1xuICAgIGNvbnN0IGFyciA9IG5ldyBBcnJheShzcmMubGVuZ3RoKVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcnJbaV0gPSBjbG9uZShzcmNbaV0pXG4gICAgfVxuICAgIHJldHVybiBhcnJcbiAgfSBlbHNlIGlmIChzcmMgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKHNyYy5nZXRUaW1lKCkpXG4gIH0gZWxzZSBpZiAoc3JjIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgY29uc3QgYXR0cnMgPSAoc3JjLmdsb2JhbCA/IFwiZ1wiIDogXCJcIilcbiAgICAgICAgICAgICAgICArIChzcmMubXVsdGlsaW5lID8gXCJtXCIgOiBcIlwiKVxuICAgICAgICAgICAgICAgICsgKHNyYy5pZ25vcmVDYXNlID8gXCJpXCIgOiBcIlwiKVxuICAgIHJldHVybiBuZXcgUmVnRXhwKHNyYy5zb3VyY2UsIGF0dHJzKVxuICB9IGVsc2UgaWYgKHNyYyAmJiBzcmMuY29uc3RydWN0b3IgPT09IE9iamVjdCkge1xuICAgIGNvbnN0IG8gPSB7fVxuICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhzcmMpXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBrZXkgPSBrZXlzW2ldXG4gICAgICBvW2tleV0gPSBjbG9uZShzcmNba2V5XSlcbiAgICB9XG4gICAgcmV0dXJuIG9cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gc3JjXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJhbmRvbUludChmcm9tLCB0bykge1xuICBjb25zdCBzdGFydCA9IGZyb20gPj4gMFxuICBjb25zdCBlbmQgPSB0byA+PiAwXG4gIHJldHVybiAoKE1hdGgucmFuZG9tKCkgKiAoZW5kIC0gc3RhcnQgKyAxKSkgPj4gMCkgKyBzdGFydFxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2h1ZmZsZShhcnJheSkge1xuICBsZXQgbSA9IGFycmF5Lmxlbmd0aFxuICBsZXQgdG1wLCBpXG5cbiAgd2hpbGUgKG0pIHtcbiAgICBpID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbS0tKVxuXG4gICAgdG1wID0gYXJyYXlbbV1cbiAgICBhcnJheVttXSA9IGFycmF5W2ldXG4gICAgYXJyYXlbaV0gPSB0bXBcbiAgfVxuXG4gIHJldHVybiBhcnJheVxufVxuIl19
