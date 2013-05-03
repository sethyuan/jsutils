# jsutils

Utilities for JavaScript.

## Installation

```bash
$ npm install jsutils
```

## Example

```js
var js = require("jsutils");

// Extend
var x = {
  name: "x"
};
var y = {
  name: "y",
  val: 10
};
js.extend(x, y); // returns x

// Clone
var y = {
  name: "y",
  attrs: ["a", "b", {name: "c", pos: 3}],
  modDate: new Date()
};
var x = js.clone(y);
```

## API

### jsutils.extend(dest, src)

Assign every `src` own, non-inherited properties to `dest`, overriding if necessary.

### jsutils.clone(src)

Deep clone `src`. Supports simple values, Object, Array, Date and RegExp.

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
