import * as seq from "./seq"

class Node<T> {
  val: T
  prev?: Node<T>
  next?: Node<T>

  constructor(val: T, prev?: Node<T>, next?: Node<T>) {
    this.val = val
    this.prev = prev
    this.next = next
  }
}

export class DLinkedList<T> implements Iterable<T> {
  first?: Node<T>
  last?: Node<T>
  _length = 0

  get length() {
    return this._length
  }

  shift() {
    const first = this.first
    if (first === undefined) return undefined
    this._length--
    if (first.next === undefined) {
      this.last = undefined
    } else {
      first.next.prev = undefined
    }
    this.first = first.next
    first.next = undefined
    return first.val
  }

  pop() {
    const last = this.last
    if (last === undefined) return undefined
    this._length--
    if (last.prev === undefined) {
      this.first = undefined
    } else {
      last.prev.next = undefined
    }
    this.last = last.prev
    last.prev = undefined
    return last.val
  }

  unshift(val: T) {
    const node = new Node(val)
    const first = this.first
    if (first === undefined) {
      this.last = node
    } else {
      node.next = first
      first.prev = node
    }
    this.first = node
    this._length++
  }

  push(val: T) {
    const node = new Node(val)
    const last = this.last
    if (last === undefined) {
      this.first = node
    } else {
      last.next = node
      node.prev = last
    }
    this.last = node
    this._length++
  }

  prepend(vals: Iterable<T>) {
    let node: Node<T> | undefined
    let curr: Node<T> | undefined
    let count = 0
    for (const val of vals) {
      count++
      if (node === undefined) {
        node = new Node(val)
        curr = node
        continue
      }
      const newNode = new Node(val)
      curr!.next = newNode
      newNode.prev = curr
      curr = newNode
    }

    const first = this.first
    if (curr !== undefined) {
      curr.next = first
      if (first !== undefined) {
        first.prev = curr
      }
    }
    if (node !== undefined) {
      this.first = node
    }
    this._length += count
  }

  append(vals: Iterable<T>) {
    let node: Node<T> | undefined
    let curr: Node<T> | undefined
    let count = 0
    for (const val of vals) {
      count++
      if (node === undefined) {
        node = new Node(val)
        curr = node
        continue
      }
      const newNode = new Node(val)
      curr!.next = newNode
      newNode.prev = curr
      curr = newNode
    }

    const last = this.last
    if (last === undefined) {
      this.first = node
    } else {
      last.next = node
      if (node !== undefined) {
        node.prev = last
      }
    }
    this.last = node
    this._length += count
  }

  [Symbol.iterator](): Iterator<T> {
    let cur = this.first
    return {
      next() {
        if (cur === undefined) {
          return {
            done: true,
            value: undefined,
          }
        } else {
          const ret = {
            done: false,
            value: cur.val,
          }
          cur = cur.next
          return ret
        }
      },
    }
  }

  forEach(fn: (_: T) => void) {
    seq.forEach(this, fn)
  }

  map<U>(fn: (_: T) => U) {
    const newList = new DLinkedList<U>()
    for (const x of this) {
      newList.push(fn(x))
    }
    return newList
  }

  filter(predicate: (_: T) => boolean) {
    const newList = new DLinkedList<T>()
    for (const x of this) {
      if (predicate(x)) {
        newList.push(x)
      }
    }
    return newList
  }

  reduce<U>(fn: (prev: U, curr: T) => U, initialValue?: U) {
    return seq.reduce(this, fn, initialValue)
  }

  find(predicate: (_: T) => boolean) {
    return seq.find(this, predicate)
  }

  some(predicate: (_: T) => boolean) {
    return seq.some(this, predicate)
  }

  every(predicate: (_: T) => boolean) {
    return seq.every(this, predicate)
  }
}