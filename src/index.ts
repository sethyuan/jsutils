export * from "./date"
export * from "./deque"
export * from "./doubly-linked-list"
export * from "./graph"
export * from "./heap"
export * from "./linked-list"
export * from "./math"
export * from "./priority-queue"
export * from "./queue"
export * from "./seq"
export * from "./stack"

/**
 * Returns random integers between from and to inclusive. from and to can be negative.
 */
export function randomInt(from: number, to: number) {
  const start = from >> 0
  const end = to >> 0
  return ((Math.random() * (end - start + 1)) >> 0) + start
}
