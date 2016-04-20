function stdTimezoneOffset() {
  const jan = new Date(this.getFullYear(), 0, 1)
  const jul = new Date(this.getFullYear(), 6, 1)
  return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset())
}

export function isDst(date) {
  return date.getTimezoneOffset() < stdTimezoneOffset()
}
