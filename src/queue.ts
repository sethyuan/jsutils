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
   * Preview the element to pop next.
   */
  peek() {
    return this._list.first?.val
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

  /**
   * Pop all the elements left in the queue into an array.
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
   * @param vals An iterable of elements to push.
   */
  pushAll(vals: Iterable<T>) {
    this._list.append(vals)
  }
}
