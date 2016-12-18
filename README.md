# Comma number

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]

## Installation

```sh
$ npm install comma-number
```

## Usage

```js
var commaNumber = require('comma-number')

commaNumber(1000) // "1,000"
commaNumber(-1000) // "-1,000"
commaNumber(-1000, '.') // "-1.000"

commaNumber(1000.12) // "1,000.12"
commaNumber(-1000.12) // "-1,000.12"
commaNumber('-1000,12', '.', ',') // "-1.000,12"
```

## API

### commaNumber(number, [separator=','], [decimalChar='.'])

**Parameters:**

* number : {(Number|String)} Number to format
* separator : {String} Value used to separate numbers
* decimalChar : {String} Value used to separate the decimal value

**Returns:**

* {String} Comma formatted number

## Tests

```sh
$ npm test
```

## License

MIT

[npm-image]: https://img.shields.io/npm/v/comma-number.svg?style=flat-square
[npm-url]: https://npmjs.org/package/comma-number
[travis-image]: https://img.shields.io/travis/cesarandreu/comma-number/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/cesarandreu/comma-number
