import { min, reduce } from "./seq"

/**
 * Returns a new set that is the union of all given sets.
 */
export function union<T>(...sets: Set<T>[]): Set<T> {
  const ret = new Set<T>()
  for (const set of sets) {
    for (const x of set) {
      ret.add(x)
    }
  }
  return ret
}

/**
 * Returns a new set that is the intersection of all given sets.
 */
export function intersection<T>(...sets: Set<T>[]): Set<T> {
  const ret = new Set<T>()
  const smallestSet = min(sets, (x) => x.size) ?? new Set()
  for (const x of smallestSet) {
    if (sets.every((s) => s.has(x))) {
      ret.add(x)
    }
  }
  return ret
}

/**
 * Returns a new set that is the difference of the given sets in sequence.
 */
export function diff<T>(...sets: Set<T>[]): Set<T> {
  return reduce(sets, (a, b) => {
    const ret = new Set<T>()
    for (const x of a) {
      if (!b.has(x)) {
        ret.add(x)
      }
    }
    return ret
  })
}
