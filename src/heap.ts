/**
 * MaxHeap
 */
export class MaxHeap {
  private _data: number[] = []

  /**
   * Number of elements in the heap.
   */
  get length() {
    return this._data.length
  }

  /**
   * Preview the root value.
   */
  peep(): number | undefined {
    return this._data[0]
  }

  /**
   * Push a value onto the heap/
   */
  push(val: number) {
    const data = this._data
    data.push(val)
    let me = data.length - 1
    let parent = ((me - 1) / 2) >> 0
    while (me > 0 && data[me] > data[parent]) {
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
    const toPop = data[0]
    data[0] = data.pop()!
    let me = 0
    let left = 2 * me + 1
    let right = 2 * me + 2
    let leftVal = data[left] ?? -Infinity
    let rightVal = data[right] ?? -Infinity
    let child = rightVal > leftVal ? right : left
    let childVal = data[child] ?? -Infinity
    while (childVal > data[me]) {
      ;[data[child], data[me]] = [data[me], data[child]]
      me = child
      left = 2 * me + 1
      right = 2 * me + 2
      leftVal = data[left] ?? -Infinity
      rightVal = data[right] ?? -Infinity
      child = rightVal > leftVal ? right : left
      childVal = data[child] ?? -Infinity
    }
    return toPop
  }
}

/**
 * MinHeap
 */
export class MinHeap {
  private _data: number[] = []

  /**
   * Number of elements in the heap.
   */
  get length() {
    return this._data.length
  }

  /**
   * Preview the root value.
   */
  peep() {
    return this._data[0]
  }

  /**
   * Push a value onto the heap/
   */
  push(val: number) {
    const data = this._data
    data.push(val)
    let me = data.length - 1
    let parent = ((me - 1) / 2) >> 0
    while (me > 0 && data[me] < data[parent]) {
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
    const toPop = data[0]
    data[0] = data.pop()!
    let me = 0
    let left = 2 * me + 1
    let right = 2 * me + 2
    let leftVal = data[left] ?? Infinity
    let rightVal = data[right] ?? Infinity
    let child = rightVal < leftVal ? right : left
    let childVal = data[child] ?? Infinity
    while (childVal < data[me]) {
      ;[data[child], data[me]] = [data[me], data[child]]
      me = child
      left = 2 * me + 1
      right = 2 * me + 2
      leftVal = data[left] ?? Infinity
      rightVal = data[right] ?? Infinity
      child = rightVal > leftVal ? right : left
      childVal = data[child] ?? Infinity
    }
    return toPop
  }
}
