function stdTimezoneOffset(date: Date) {
  const jan = new Date(date.getFullYear(), 0, 1)
  const jul = new Date(date.getFullYear(), 6, 1)
  return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset())
}

/**
 * Returns true if given date is DST, false otherwise.
 */
export function isDst(date: Date) {
  return date.getTimezoneOffset() < stdTimezoneOffset(date)
}
