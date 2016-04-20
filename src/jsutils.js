export function extend(dest, src) {
  if (dest == null || src == null) return dest

  const destType = typeof dest
  const srcType = typeof src

  if ((destType !== "object" && destType !== "function")
      || (srcType !== "object" && srcType !== "function")) return dest

  for (let key of Object.keys(src)) {
    dest[key] = src[key]
  }

  return dest
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
