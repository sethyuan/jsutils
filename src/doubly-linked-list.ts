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

/**
 * A doubly-linked list.
 *
 * ```ts
 * const list = new DLinkedList<number>()
 * list.push(2)
 * list.unshift(1)
 * list.append([3, 4])
 * list
 *   .filter((num) => n % 2 === 0)
 *   .map((num) => n * 2)
 *   .forEach((num) => console.log(num))
 * ```
 */
export class DLinkedList<T> implements Iterable<T> {
  first?: Node<T>
  last?: Node<T>
  private _length = 0

  /**
   * Number of elements in the list.
   */
  get length() {
    return this._length
  }

  /**
   * Pop an element from the start of the list.
   */
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

  /**
   * Pop an element from the end of the list.
   */
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

  /**
   * Push an element to the start of the list.
   *
   * @param val Element to push.
   */
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

  /**
   * Push an element to the end of the list.
   *
   * @param val Element to push.
   */
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

  /**
   * Push a sequence of elements to the start of the list.
   *
   * @param vals Elements to push.
   */
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

  /**
   * Push a sequence of elements to the end of the list.
   *
   * @param vals Elements to push.
   */
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

  /**
   * Empty the list.
   */
  clear() {
    this.first = undefined
    this.last = undefined
    this._length = 0
  }

  /**
   * Make instance iterable.
   */
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

  /**
   * Iterate through the list.
   */
  forEach(fn: (x: T) => void) {
    seq.forEach(this, fn)
  }

  /**
   * Map the list elements.
   *
   * @returns A new list instance.
   */
  map<U>(fn: (x: T) => U) {
    const newList = new DLinkedList<U>()
    for (const x of this) {
      newList.push(fn(x))
    }
    return newList
  }

  /**
   * Filter the list.
   *
   * @returns A new list instance.
   */
  filter(predicate: (x: T) => boolean) {
    const newList = new DLinkedList<T>()
    for (const x of this) {
      if (predicate(x)) {
        newList.push(x)
      }
    }
    return newList
  }

  /**
   * Perform reduce on the list.
   *
   * @returns The reduced value.
   */
  reduce<U>(fn: (prev: U, curr: T) => U, initialValue?: U) {
    return seq.reduce(this, fn, initialValue)
  }

  /**
   * Find a specific element in the list.
   *
   * @returns Element found or `undefined` otherwise.
   */
  find(predicate: (x: T) => boolean) {
    return seq.find(this, predicate)
  }

  /**
   * Check if at least one element meets the predicate.
   */
  some(predicate: (x: T) => boolean) {
    return seq.some(this, predicate)
  }

  /**
   * Check if all elements meet the predicate.
   */
  every(predicate: (x: T) => boolean) {
    return seq.every(this, predicate)
  }

  toString() {
    return `DLinkedList:${Array.from(this)}`
  }
}
