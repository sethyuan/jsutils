import { LinkedList } from "./linked-list"

/**
 * A proper queue implemented using a linked list.
 */
export class Queue<T> {
  private _list = new LinkedList<T>()

  /**
   * Number of elements in the queue.
   */
  get length() {
    return this._list.length
  }

  /**
   * Push an element onto the queue.
   *
   * @param val Element to push.
   */
  push(val: T) {
    this._list.push(val)
  }

  /**
   * Pop an element from the queue.
   */
  pop() {
    return this._list.shift()
  }
}
