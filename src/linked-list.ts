import * as seq from "./seq"

class Node<T> {
  val: T
  next?: Node<T>

  constructor(val: T, next?: Node<T>) {
    this.val = val
    this.next = next
  }
}

export class LinkedList<T> implements Iterable<T> {
  private first?: Node<T>
  private last?: Node<T>
  private _length = 0

  get length() {
    return this._length
  }

  shift() {
    const first = this.first
    if (first === undefined) return undefined
    this._length--
    if (first.next === undefined) {
      this.last = undefined
    }
    this.first = first.next
    first.next = undefined
    return first.val
  }

  unshift(val: T) {
    const node = new Node(val)
    const first = this.first
    if (first === undefined) {
      this.last = node
    } else {
      node.next = first
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
      curr = newNode
    }

    if (curr !== undefined) {
      curr.next = this.first
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
      curr = newNode
    }

    const last = this.last
    if (last === undefined) {
      this.first = node
    } else {
      last.next = node
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
    const newList = new LinkedList<U>()
    for (const x of this) {
      newList.push(fn(x))
    }
    return newList
  }

  filter(predicate: (_: T) => boolean) {
    const newList = new LinkedList<T>()
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
