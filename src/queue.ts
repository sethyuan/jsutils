interface Node<T> {
  val: T
  next?: Node<T>
}

export class Queue<T> {
  first?: Node<T>
  last?: Node<T>
  length = 0

  push(el: T) {
    const node = {
      val: el,
      next: undefined,
    }
    if (this.last === undefined) {
      this.first = node
    } else {
      this.last.next = node
    }
    this.last = node
    this.length++
  }

  pop() {
    const head = this.first
    if (head === undefined) return undefined
    this.length--
    if (head.next === undefined) {
      this.last = undefined
    }
    this.first = head.next
    return head.val
  }
}
