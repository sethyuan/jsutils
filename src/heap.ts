/**
 * MaxHeap
 */
export class MaxHeap<T = number> {
  private _data: T[] = []
  private _accessor: (x?: T) => number | undefined

  constructor(accessor: (x?: T) => number | undefined = (x) => x as any) {
    this._accessor = accessor
  }

  /**
   * Number of elements in the heap.
   */
  get length() {
    return this._data.length
  }

  /**
   * Preview the root value.
   */
  peek(): T | undefined {
    return this._data[0]
  }

  /**
   * Push a value onto the heap/
   */
  push(val: T) {
    const data = this._data
    const accessor = this._accessor
    data.push(val)
    let me = data.length - 1
    let parent = ((me - 1) / 2) >> 0
    while (me > 0 && accessor(data[me])! > accessor(data[parent])!) {
      ;[data[parent], data[me]] = [data[me], data[parent]]
      me = parent
      parent = ((me - 1) / 2) >> 0
    }
  }

  /**
   * Pop the root value.
   */
  pop() {
    const data = this._data
    if (data.length <= 1) return data.pop()
    const accessor = this._accessor
    const toPop = data[0]
    data[0] = data.pop()!
    let me = 0
    let left = 2 * me + 1
    let right = 2 * me + 2
    let leftVal = accessor(data[left]) ?? -Infinity
    let rightVal = accessor(data[right]) ?? -Infinity
    let child = rightVal > leftVal ? right : left
    let childVal = accessor(data[child]) ?? -Infinity
    while (childVal > accessor(data[me])!) {
      ;[data[child], data[me]] = [data[me], data[child]]
      me = child
      left = 2 * me + 1
      right = 2 * me + 2
      leftVal = accessor(data[left]) ?? -Infinity
      rightVal = accessor(data[right]) ?? -Infinity
      child = rightVal > leftVal ? right : left
      childVal = accessor(data[child]) ?? -Infinity
    }
    return toPop
  }
}

/**
 * MinHeap
 */
export class MinHeap<T> {
  private _data: T[] = []
  private _accessor: (x?: T) => number | undefined

  constructor(accessor: (x?: T) => number | undefined = (x) => x as any) {
    this._accessor = accessor
  }

  /**
   * Number of elements in the heap.
   */
  get length() {
    return this._data.length
  }

  /**
   * Preview the root value.
   */
  peek(): T | undefined {
    return this._data[0]
  }

  /**
   * Push a value onto the heap/
   */
  push(val: T) {
    const data = this._data
    data.push(val)
    const accessor = this._accessor
    let me = data.length - 1
    let parent = ((me - 1) / 2) >> 0
    while (me > 0 && accessor(data[me])! < accessor(data[parent])!) {
      ;[data[parent], data[me]] = [data[me], data[parent]]
      me = parent
      parent = ((me - 1) / 2) >> 0
    }
  }

  /**
   * Pop the root value.
   */
  pop() {
    const data = this._data
    if (data.length <= 1) return data.pop()
    const accessor = this._accessor
    const toPop = data[0]
    data[0] = data.pop()!
    let me = 0
    let left = 2 * me + 1
    let right = 2 * me + 2
    let leftVal = accessor(data[left]) ?? Infinity
    let rightVal = accessor(data[right]) ?? Infinity
    let child = rightVal < leftVal ? right : left
    let childVal = accessor(data[child]) ?? Infinity
    while (childVal < accessor(data[me])!) {
      ;[data[child], data[me]] = [data[me], data[child]]
      me = child
      left = 2 * me + 1
      right = 2 * me + 2
      leftVal = accessor(data[left]) ?? Infinity
      rightVal = accessor(data[right]) ?? Infinity
      child = rightVal > leftVal ? right : left
      childVal = accessor(data[child]) ?? Infinity
    }
    return toPop
  }
}
