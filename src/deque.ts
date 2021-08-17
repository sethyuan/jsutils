import { DLinkedList } from "./doubly-linked-list"

export class Deque<T> {
  _list = new DLinkedList<T>()

  get length() {
    return this._list.length
  }

  push(val: T) {
    this._list.push(val)
  }

  pop() {
    return this._list.pop()
  }

  unshift(val: T) {
    this._list.unshift(val)
  }

  shift() {
    return this._list.shift()
  }
}
