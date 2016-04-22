# jsutils

Utilities for JavaScript.

## Installation

```bash
$ npm install jsutils
```

## Example

```js
import {merge, clone} from "jsutils"
import {mod} from "jsutils/lib/math"

// Merge
const x = {
  name: "x",
  hobbies: ["soccer"]
};
const y = {
  name: "y",
  val: 10,
  hobbies: ["football"]
};
merge(x, y); // returns x

// Clone
const y = {
  name: "y",
  attrs: ["a", "b", {name: "c", pos: 3}],
  modDate: new Date()
};
const x = clone(y);

// Mod
console.log(mod(-6, 5)) // 4
```

## API

### General

### jsutils.merge(dest, ...srcs)

Assign every `src` own, non-inherited properties to `dest`, merging if necessary. Arrays are also merged.

### jsutils.clone(src)

Deep clone `src`. Supports simple values, Object, Array, Date and RegExp.

### jsutils.randomInt(from, to)

Returns random integers between `from` and `to` inclusive. `from` and `to` can be negative.

### jsutils.shuffle(array)

Shuffle `array` in place, and return it.

### Math

### jsutils.math.mod(x, y)

Real modulo operation that supports negative numbers.

### Date

### jsutils.date.isDst(date)

Returns true if given `date` is DST, false otherwise.

## License

(The MIT License)

Copyright (c) 2013 Seth Yuan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
