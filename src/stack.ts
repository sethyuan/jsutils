import { LinkedList } from "./linked-list"

export class Stack<T> {
  private _list = new LinkedList<T>()

  get length() {
    return this._list.length
  }

  push(val: T) {
    this._list.unshift(val)
  }

  pop() {
    return this._list.shift()
  }
}
