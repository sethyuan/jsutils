import * as seq from "./seq"

class Node<T> {
  val: T
  next?: Node<T>

  constructor(val: T, next?: Node<T>) {
    this.val = val
    this.next = next
  }
}

/**
 * A singlely-linked list.
 *
 * ```ts
 * const list = new LinkedList<number>()
 * list.push(1)
 * list.append([2, 3])
 * list
 *   .filter((num) => n % 2 !== 0)
 *   .map((num) => n * 2)
 *   .forEach((num) => console.log(num))
 * ```
 */
export class LinkedList<T> implements Iterable<T> {
  first?: Node<T>
  last?: Node<T>
  private _length = 0

  /**
   * Number of elements in the queue.
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
    }
    this.first = first.next
    first.next = undefined
    return first.val
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
  forEach(fn: (_: T) => void) {
    seq.forEach(this, fn)
  }

  /**
   * Map the list elements.
   *
   * @returns A new list instance.
   */
  map<U>(fn: (_: T) => U) {
    const newList = new LinkedList<U>()
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
  filter(predicate: (_: T) => boolean) {
    const newList = new LinkedList<T>()
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
  find(predicate: (_: T) => boolean) {
    return seq.find(this, predicate)
  }

  /**
   * Check if at least one element meets the predicate.
   */
  some(predicate: (_: T) => boolean) {
    return seq.some(this, predicate)
  }

  /**
   * Check if all elements meet the predicate.
   */
  every(predicate: (_: T) => boolean) {
    return seq.every(this, predicate)
  }

  toString() {
    return `LinkedList:${Array.from(this)}`
  }
}
