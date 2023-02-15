# base45-mjs

Simple and fast base45 implementation with TS, mjs, cjs and tree shaking

## Install

```bash
npm i base45-mjs
```

## Usage

```js
// cjs
const { encode, decode } = require('base45-mjs')

console.log(encode('Hello!'))
console.log(decode(encode('Hello!')).toString())
```


```js
// mjs
import { encode, decode } from 'base45-mjs'

console.log(encode('Hello!'))
console.log(decode(encode('Hello!')).toString())
```

