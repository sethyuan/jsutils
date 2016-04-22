function mergeBase(dest, src) {
  if (!(src && src.constructor === Object)) return dest

  for (let key of Object.keys(src)) {
    const d = dest[key]
    const s = src[key]

    if (d && d.constructor === Object && s && s.constructor === Object) {
      mergeBase(d, s)
    } else if (Array.isArray(d) && Array.isArray(s)) {
      for (let i = 0; i < s.length; i++) {
        if (d[i] && d[i].constructor === Object
            && s[i] && s[i].constructor === Object) {
          mergeBase(d[i], s[i])
        } else {
          d[i] = s[i]
        }
      }
    } else {
      dest[key] = s
    }
  }

  return dest
}

export function merge(dest, ...srcs) {
  return srcs.reduce((res, src) => mergeBase(res, src), dest)
}

export function clone(src) {
  if (Array.isArray(src)) {
    const arr = new Array(src.length)
    for (let i = 0; i < arr.length; i++) {
      arr[i] = clone(src[i])
    }
    return arr
  } else if (src instanceof Date) {
    return new Date(src.getTime())
  } else if (src instanceof RegExp) {
    const attrs = (src.global ? "g" : "")
                + (src.multiline ? "m" : "")
                + (src.ignoreCase ? "i" : "")
    return new RegExp(src.source, attrs)
  } else if (src && src.constructor === Object) {
    const o = {}
    const keys = Object.keys(src)
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      o[key] = clone(src[key])
    }
    return o
  } else {
    return src
  }
}

export function randomInt(from, to) {
  const start = from >> 0
  const end = to >> 0
  return ((Math.random() * (end - start + 1)) >> 0) + start
}

export function shuffle(array) {
  let m = array.length
  let tmp, i

  while (m) {
    i = Math.floor(Math.random() * m--)

    tmp = array[m]
    array[m] = array[i]
    array[i] = tmp
  }

  return array
}
