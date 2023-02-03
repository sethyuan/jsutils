/**
 * Returns random integers between from and to inclusive. from and to can be negative.
 */
export function randomInt(from: number, to: number) {
  const start = from >> 0
  const end = to >> 0
  return ((Math.random() * (end - start + 1)) >> 0) + start
}

/**
 * Real modulo operation that supports negative numbers.
 *
 * ```ts
 * mod(1, 3) // 1
 * mod(-1, 3) // 2
 * ```
 */
export function mod(x: number, y: number) {
  return ((x % y) + y) % y
}

/**
 * Returns a promise that wait for ms milliseconds.
 */
export function waitMs(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
