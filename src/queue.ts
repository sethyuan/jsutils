import { LinkedList } from "./linked-list"

export class Queue<T> {
  _list = new LinkedList<T>()

  get length() {
    return this._list.length
  }

  push(val: T) {
    this._list.push(val)
  }

  pop() {
    return this._list.shift()
  }
}
