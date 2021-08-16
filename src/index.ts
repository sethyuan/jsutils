export * from "./date"
export * from "./math"
export * from "./queue"

/**
 * Returns random integers between from and to inclusive. from and to can be negative.
 */
export function randomInt(from: number, to: number) {
  const start = from >> 0
  const end = to >> 0
  return ((Math.random() * (end - start + 1)) >> 0) + start
}
