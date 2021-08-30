import { LinkedList } from "./linked-list"

/**
 * A proper stack implemented using a linked list.
 */
export class Stack<T> {
  private _list = new LinkedList<T>()

  /**
   * Number of elements in the queue.
   */
  get length() {
    return this._list.length
  }

  /**
   * Push an element to the stack.
   *
   * @param val Element to push.
   */
  push(val: T) {
    this._list.unshift(val)
  }

  /**
   * Pop an element from the stack.
   */
  pop() {
    return this._list.shift()
  }
}
