/**
 * Reverse an array and return a sequence.
 */
export function* reverseArray<T>(arr: T[]) {
  if (arr == null) return
  for (let i = arr.length - 1; i >= 0; i--) {
    yield arr[i]
  }
}

/**
 * Iterate a sequence in a functional style.
 */
export function forEach<T>(seq: Iterable<T>, fn: (x: T) => void) {
  for (const x of seq) {
    fn(x)
  }
}

/**
 * Map and return a new sequence.
 */
export function* map<T, U>(seq: Iterable<T>, fn: (x: T) => U) {
  for (const x of seq) {
    yield fn(x)
  }
}

/**
 * Filter and return a new sequence.
 */
export function* filter<T>(seq: Iterable<T>, predicate: (x: T) => boolean) {
  for (const x of seq) {
    if (predicate(x)) yield x
  }
}

/**
 * Perform reduce on a sequence.
 */
export function reduce<T, U>(
  seq: Iterable<T>,
  fn: (prev: U, curr: T) => U,
  initialValue?: U,
) {
  let prev: U | undefined = initialValue
  for (const x of seq) {
    if (prev === undefined) {
      prev = x as unknown as U
      continue
    }
    prev = fn(prev, x)
  }
  return prev as U
}

/**
 * Find an element in a sequence.
 */
export function find<T>(seq: Iterable<T>, predicate: (x: T) => boolean) {
  for (const x of seq) {
    if (predicate(x)) return x
  }
  return undefined
}

/**
 * Check if an element in the sequence meets predicate.
 */
export function some<T>(seq: Iterable<T>, predicate: (x: T) => boolean) {
  for (const x of seq) {
    if (predicate(x)) return true
  }
  return false
}

/**
 * Check if all elements in the sequence meet predicate.
 */
export function every<T>(seq: Iterable<T>, predicate: (x: T) => boolean) {
  for (const x of seq) {
    if (!predicate(x)) return false
  }
  return true
}

/**
 * Find the first minimum element in the given sequence.
 * You need to provide a accessor `by` for the comparison purpose.
 */
export function min<T>(seq: Iterable<T>, by: (x: T) => number): T | undefined {
  let ret
  for (const x of seq) {
    if (ret === undefined || by(x) < by(ret)) {
      ret = x
    }
  }
  return ret
}

/**
 * Find the first maximum element in the given sequence.
 * You need to provide a accessor `by` for the comparison purpose.
 */
export function max<T>(seq: Iterable<T>, by: (x: T) => number): T | undefined {
  let ret
  for (const x of seq) {
    if (ret === undefined || by(x) > by(ret)) {
      ret = x
    }
  }
  return ret
}
