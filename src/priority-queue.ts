import { MaxHeap, MinHeap } from "./heap"
import { Queue } from "./queue"

abstract class PriorityQueue<T> {
  abstract _priorities: MaxHeap | MinHeap
  _data = new Map<number, Queue<T>>()
  _length = 0

  get length() {
    return this._length
  }

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

  pop(): T | undefined {
    const data = this._data
    const priorities = this._priorities
    const priority = priorities.peep()
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
}

export class MaxPriorityQueue<T> extends PriorityQueue<T> {
  _priorities = new MaxHeap()
}

export class MinPriorityQueue<T> extends PriorityQueue<T> {
  _priorities = new MinHeap()
}
