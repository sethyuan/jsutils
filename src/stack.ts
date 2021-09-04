import { LinkedList } from "./linked-list"
import { reverseArray } from "./seq"

/**
 * A proper stack implemented using a linked list.
 */
export class Stack<T> {
  private _list = new LinkedList<T>()

  /**
   * Create a new stack with an optional initial element.
   *
   * @param initial Optional initial element.
   */
  constructor(initial?: T) {
    if (initial !== undefined) {
      this._list.unshift(initial)
    }
  }

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
   * Push all elements given in an optional specific order.
   *
   * @param vals An array of elements to push.
   * @param reversed Push the elements in reversed order.
   */
  pushAll(vals: T[], reversed: boolean = false) {
    if (reversed) {
      this._list.prepend(vals)
    } else {
      this._list.prepend(reverseArray(vals))
    }
  }
}
