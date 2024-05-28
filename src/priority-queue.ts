import { MaxHeap, MinHeap } from "./heap"
import { Queue } from "./queue"

abstract class PriorityQueue<T> {
  protected abstract _priorities: MaxHeap | MinHeap
  private _data = new Map<number, Queue<T>>()
  private _length = 0

  /**
   * Number of elements in the queue.
   */
  get length() {
    return this._length
  }

  /**
   * Push an element onto the queue.
   *
   * @param priority Priority of the element.
   * @param val Element to push.
   */
  push(priority: number, val: T) {
    const data = this._data
    if (!data.has(priority)) {
      data.set(priority, new Queue<T>())
      this._priorities.push(priority)
    }
    const list = data.get(priority)!
    list.push(val)
    this._length++
  }

  /**
   * Pop an element from the queue.
   */
  pop(): T | undefined {
    const data = this._data
    const priorities = this._priorities
    const priority = priorities.peek()
    if (!priority) return undefined
    const list = data.get(priority)!
    const val = list.pop()!
    if (list.length < 1) {
      priorities.pop()
      data.delete(priority)
    }
    this._length--
    return val
  }

  /**
   * Preview the element to pop next.
   */
  peek() {
    const data = this._data
    const priorities = this._priorities
    const priority = priorities.peek()
    if (!priority) return undefined
    const list = data.get(priority)!
    return list.peek()
  }

  /**
   * Preview the next priority number.
   */
  peekPriority() {
    return this._priorities.peek()
  }

  /** Clear the queue. */
  clear() {
    this._data.clear()
    this._priorities.clear()
    this._length = 0
  }
}

/**
 * A priority queue where bigger numbers have higher
 * priorities.
 *
 * ```ts
 * const queue = new MaxPriorityQueue<string>()
 * queue.push(1, "1")
 * queue.push(2, "2")
 * queue.pop() // "2"
 * ```
 */
export class MaxPriorityQueue<T> extends PriorityQueue<T> {
  protected _priorities = new MaxHeap()
}

/**
 * A priority queue where smaller numbers have higher
 * priorities.
 *
 * ```ts
 * const queue = new MinPriorityQueue<string>()
 * queue.push(1, "1")
 * queue.push(2, "2")
 * queue.push(0, "0")
 * queue.pop() // "0"
 * ```
 */
export class MinPriorityQueue<T> extends PriorityQueue<T> {
  protected _priorities = new MinHeap()
}
