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
