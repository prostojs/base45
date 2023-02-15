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

### Browser

**ESM**

```html
<script type="module">
import { encode, decode } from 'https://unpkg.com/base45-mjs/dist/index.browser.mjs'

console.log(encode('Hello!'))
console.log(decode(encode('Hello!')).toString())
</script>
```

**unpkg**

```html
<script type="application/javascript" src="https://unpkg.com/base45-mjs"></script>
<script>
    console.log(base45.encode('Hello!'))
    console.log(base45.decode(base45.encode('Hello!')).toString())
</script>
```

**jsdelivr**

```html
<script type="application/javascript" src="https://cdn.jsdelivr.net/npm/base45-mjs"></script>
<script>
    console.log(base45.encode('Hello!'))
    console.log(base45.decode(base45.encode('Hello!')).toString())
</script>
```

