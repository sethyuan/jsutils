import { DLinkedList } from "./doubly-linked-list"

/**
 * A doubly-ended queue.
 *
 * ```ts
 * const queue = new Deque<number>()
 * queue.push(3)
 * queue.push(4)
 * queue.unshift(2)
 * queue.unshift(1)
 * queue.shift() // 1
 * queue.pop() // 4
 * ```
 */
export class Deque<T> {
  private _list = new DLinkedList<T>()

  /**
   * Number of elements in the queue.
   */
  get length() {
    return this._list.length
  }

  /**
   * Push an element to the end of the queue.
   *
   * @param val Element to push.
   */
  push(val: T) {
    this._list.push(val)
  }

  /**
   * Pop an element from the end of the queue.
   */
  pop() {
    return this._list.pop()
  }

  /**
   * Push an element to the start of the queue.
   *
   * @param val Element to push.
   */
  unshift(val: T) {
    this._list.unshift(val)
  }

  /**
   * Pop an element from the start of the queue.
   */
  shift() {
    return this._list.shift()
  }
}
