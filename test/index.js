var test = require('tape')
var commaNumber = require('../lib')

test('Formatting', function (t) {
  var testPairs = [
    // Positive numbers
    [0, '0'],
    [1, '1'],
    [100, '100'],
    [1000, '1,000'],
    [10000, '10,000'],
    [100000, '100,000'],
    [1000000, '1,000,000'],
    [Infinity, 'Infinity'],

    // Negative numbers
    [-1, '-1'],
    [-100, '-100'],
    [-1000, '-1,000'],
    [-10000, '-10,000'],
    [-100000, '-100,000'],
    [-1000000, '-1,000,000'],
    [-Infinity, '-Infinity'],

    // Strings
    ['0', '0'],
    ['1', '1'],
    ['100', '100'],
    ['1000', '1,000'],
    ['10000', '10,000'],
    ['100000', '100,000'],
    ['1000000', '1,000,000'],

    // Invalid input
    [[], '0'],
    [{}, '0'],
    [NaN, '0'],
    [null, '0'],
    [undefined, '0']
  ]

  t.plan(testPairs.length)
  testPairs.forEach(function (pair) {
    t.equal(commaNumber(pair[0]), pair[1], JSON.stringify(pair[0]) + ' => ' + pair[1])
  })
})

test('Separator', function (t) {
  t.plan(3)
  t.equal(commaNumber(1000, ''), '1000', '1000 => 1000')
  t.equal(commaNumber(1000, ' '), '1 000', '1000 => 1 000')
  t.equal(commaNumber(1000, '.'), '1.000', '1000 => 1.000')
})
