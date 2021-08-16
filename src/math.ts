/**
 * Real modulo operation that supports negative numbers.
 */
export function mod(x: number, y: number) {
  return ((x % y) + y) % y
}
