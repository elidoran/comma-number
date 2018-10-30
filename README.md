# Comma number
[![Build Status](https://travis-ci.org/elidoran/comma-number.svg?branch=master)](https://travis-ci.org/elidoran/comma-number)
[![npm version](https://badge.fury.io/js/comma-number.svg)](http://badge.fury.io/js/comma-number)
[![Coverage Status](https://coveralls.io/repos/github/elidoran/comma-number/badge.svg?branch=master)](https://coveralls.io/github/elidoran/comma-number?branch=master)


## Install

```sh
$ npm install --save comma-number
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


## Version 2 Changes

Revised implementation changes the API a bit:

1. input with a type other than `string` and `number` is returned **as is**, not as `'0'`.
2. supports decimals in the number
3. a string number may use an alternate decimal character, specify it as the third argument
4. added a `bindWith` function to use a currying style to bind options for a reusable format function.

Other changes:

1. Added benchmarking to test implementation performance
2. added code coverage
3. added new badges in this README
4. added more versions to the Travis CI config


## API

### commaNumber(number, [separator=','], [decimalChar='.'])

**Parameters:**

* number : {(Number|String)} Number to format
* separator : {String} Value used to separate numbers
* decimalChar : {String} Value used to separate the decimal value

**Returns:**

* {String} Comma formatted number


### bindWith(separator, decimalChar)

The `commaNumber` function accepts these same parameters as the second and third params. This prevents using currying to bind them and reuse that bound function.

The `bindWith` function accepts the options and returns a function bound with them.

```javascript
var commaNumber = require('comma-number')
  , format = commaNumber.bindWith(',', '.')
  , result = format('1234567.89')

// outputs:  1,234,567.89
console.log(result)
```


## Scripts for Testing, Benchmarking, and Code Coverage

```sh
# run tests via Tape
$ npm test

# benchmark current implementation versus previous
npm run benchmark

# get coverage info
npm run coverage
```


## Performance Comparison

The rewrite has a considerable performance increase from the previous version.

I converted the benchmark output from my machine into a [table](docs/benchmark.md).

It compares the performance of version 1.1.0 with 2.0.0. The inputs with decimals can only be processed by the new version so those show as "invalid" for the previous version.


## License MIT
