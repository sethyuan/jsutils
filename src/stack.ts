import { LinkedList } from "./linked-list"
import { reverseArray } from "./seq"

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
   * Preview the element to pop next.
   */
  peek() {
    return this._list.first?.val
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

  /**
   * Pop all the elements left in the stack into an array.
   *
   * @returns An array of the elements.
   */
  popAll() {
    const result = Array.from(this._list)
    this._list = new LinkedList<T>()
    return result
  }

  /**
   * Push all elements given.
   *
   * @param vals An array of elements to push.
   */
  pushAll(vals: T[]) {
    this._list.prepend(reverseArray(vals))
  }
}
