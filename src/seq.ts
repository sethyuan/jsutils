export function* reverseArray<T>(arr: T[]) {
  for (let i = arr.length - 1; i >= 0; i--) {
    yield arr[i]
  }
}

export function forEach<T>(seq: Iterable<T>, fn: (_: T) => void) {
  for (const x of seq) {
    fn(x)
  }
}

export function* map<T, U>(seq: Iterable<T>, fn: (_: T) => U) {
  for (const x of seq) {
    yield fn(x)
  }
}

export function* filter<T>(seq: Iterable<T>, predicate: (_: T) => boolean) {
  for (const x of seq) {
    if (predicate(x)) yield x
  }
}

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

export function find<T>(seq: Iterable<T>, predicate: (_: T) => boolean) {
  for (const x of seq) {
    if (predicate(x)) return x
  }
  return undefined
}

export function some<T>(seq: Iterable<T>, predicate: (_: T) => boolean) {
  for (const x of seq) {
    if (predicate(x)) return true
  }
  return false
}

export function every<T>(seq: Iterable<T>, predicate: (_: T) => boolean) {
  for (const x of seq) {
    if (!predicate(x)) return false
  }
  return true
}
