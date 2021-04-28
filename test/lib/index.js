var tap = require('tap')
var commaNumber = require('../../lib')

function testEach(pairs, t, format) {
  t.plan(pairs.length)
  pairs.forEach(function (pair) {
    var input, actual, expected, inputString, description

    input = pair[0]
    actual = format(input)
    expected = pair[1]
    inputString =
      ('object' === typeof input)
      ? JSON.stringify(input)
      : ('string' === typeof input)
        ? '\'' + input + '\''
        : input
    description = inputString + ' => ' + expected

    t.equal(actual, expected, description)
  })
}

tap.test('Formatting', function (t) {

  var testPairs

  testPairs = [
    // Positive numbers
    [0, '0'],
    [1, '1'],
    [12, '12'],
    [123, '123'],
    [1234, '1,234'],
    [12345, '12,345'],
    [123456, '123,456'],
    [1234567, '1,234,567'],
    [1234567890, '1,234,567,890'],
    [Infinity, 'Infinity'],

    // With decimals
    [.1, '0.1'],
    [.12, '0.12'],
    [.123, '0.123'],
    [1.2, '1.2'],
    [1.23, '1.23'],
    [1.234, '1.234'],
    [12.3, '12.3'],
    [12.34, '12.34'],
    [123.4, '123.4'],
    [123.45, '123.45'],
    [1234.5, '1,234.5'],
    [1234.56, '1,234.56'],
    [12345.6, '12,345.6'],
    [12345.67, '12,345.67'],
    [123456.7, '123,456.7'],
    [123456.78, '123,456.78'],
    [123456.789, '123,456.789'],
    [1234567.8, '1,234,567.8'],
    [1234567.89, '1,234,567.89'],
    [1234567.899, '1,234,567.899'],

    // Negative numbers
    [-1, '-1'],
    [-12, '-12'],
    [-123, '-123'],
    [-1234, '-1,234'],
    [-12345, '-12,345'],
    [-123456, '-123,456'],
    [-1234567, '-1,234,567'],
    [-1234567890, '-1,234,567,890'],
    [-Infinity, '-Infinity'],

    // With decimals
    [-.1, '-0.1'],
    [-.12, '-0.12'],
    [-.123, '-0.123'],
    [-1.2, '-1.2'],
    [-1.23, '-1.23'],
    [-1.234, '-1.234'],
    [-12.3, '-12.3'],
    [-12.34, '-12.34'],
    [-123.4, '-123.4'],
    [-123.45, '-123.45'],
    [-1234.5, '-1,234.5'],
    [-1234.56, '-1,234.56'],
    [-12345.6, '-12,345.6'],
    [-12345.67, '-12,345.67'],
    [-123456.7, '-123,456.7'],
    [-123456.78, '-123,456.78'],
    [-123456.789, '-123,456.789'],
    [-1234567.8, '-1,234,567.8'],
    [-1234567.89, '-1,234,567.89'],
    [-1234567.899, '-1,234,567.899'],

    // Strings
    ['0', '0'],
    ['1', '1'],
    ['12', '12'],
    ['123', '123'],
    ['1234', '1,234'],
    ['12345', '12,345'],
    ['123456', '123,456'],
    ['1234567', '1,234,567'],
    ['1234567890', '1,234,567,890'],

    // With decimals
    ['.1', '.1'],
    ['0.1', '0.1'],
    ['.12', '.12'],
    ['0.12', '0.12'],
    ['.123', '.123'],
    ['0.123', '0.123'],
    ['1.2', '1.2'],
    ['1.23', '1.23'],
    ['1.234', '1.234'],
    ['12.3', '12.3'],
    ['12.34', '12.34'],
    ['123.4', '123.4'],
    ['123.45', '123.45'],
    ['1234.5', '1,234.5'],
    ['1234.56', '1,234.56'],
    ['12345.6', '12,345.6'],
    ['12345.67', '12,345.67'],
    ['123456.7', '123,456.7'],
    ['123456.78', '123,456.78'],
    ['123456.789', '123,456.789'],
    ['1234567.8', '1,234,567.8'],
    ['1234567.89', '1,234,567.89'],
    ['1234567.899', '1,234,567.899'],

    // Negative numbers
    ['-1', '-1'],
    ['-12', '-12'],
    ['-123', '-123'],
    ['-1234', '-1,234'],
    ['-12345', '-12,345'],
    ['-123456', '-123,456'],
    ['-1234567', '-1,234,567'],
    ['-1234567890', '-1,234,567,890'],
    [-Infinity, '-Infinity'],

    // With decimals
    ['-.1', '-.1'],
    ['-.12', '-.12'],
    ['-.123', '-.123'],
    ['-1.2', '-1.2'],
    ['-1.23', '-1.23'],
    ['-1.234', '-1.234'],
    ['-12.3', '-12.3'],
    ['-12.34', '-12.34'],
    ['-123.4', '-123.4'],
    ['-123.45', '-123.45'],
    ['-1234.5', '-1,234.5'],
    ['-1234.56', '-1,234.56'],
    ['-12345.6', '-12,345.6'],
    ['-12345.67', '-12,345.67'],
    ['-123456.7', '-123,456.7'],
    ['-123456.78', '-123,456.78'],
    ['-123456.789', '-123,456.789'],
    ['-1234567.8', '-1,234,567.8'],
    ['-1234567.89', '-1,234,567.89'],
    ['-1234567.899', '-1,234,567.899'],

  ]

  testEach(testPairs, t, commaNumber)
  // t.plan(testPairs.length)
  // testPairs.forEach(function (pair) {
  //   var input, actual, expected, inputString, description
  //
  //   input = pair[0]
  //   actual = format(input)
  //   expected = pair[1]
  //   inputString =
  //     ('object' === typeof input)
  //     ? JSON.stringify(input)
  //     : ('string' === typeof input)
  //       ? '\'' + input + '\''
  //       : input
  //   description = inputString + ' => ' + expected
  //
  //   t.equal(actual, expected, description)
  // })
})

tap.test('Invalid input', function (t) {

  var input

  input = [
    [],
    {},
    null,
    undefined,
    'abc',
  ]

  t.plan(6)
  t.equal(commaNumber(input[0]), input[0], '[] => []')
  t.equal(commaNumber(input[1]), input[1], '{} => {}')
  t.equal(commaNumber(input[2]), input[2], 'null => null')
  t.equal(commaNumber(input[3]), input[3], 'undefined => undefined')
  t.equal(commaNumber(input[4]), input[4], '\'abc\' => \'abc\'')

  t.equal(isNaN(commaNumber(NaN)), true, 'NaN => NaN')
})

tap.test('Separator', function (t) {
  t.plan(2)
  t.equal(commaNumber(1000, ' '), '1 000', '1000 => 1 000')
  t.equal(commaNumber(1000, '.'), '1.000', '1000 => 1.000')
})

tap.test('Decimal Separator', function (t) {
  t.plan(3)
  t.equal(commaNumber('1234.5', undefined, '.'), '1,234.5', '1234.5 => 1,234.5')
  t.equal(commaNumber('1234,5', '.', ','), '1.234,5', '1234,5 => 1.234,5')
  t.equal(commaNumber('1234 5', undefined, ' '), '1,234 5', '1234 5 => 1,234 5')
})

tap.test('bindWith() and string inputs', function (t) {

  var boundVersion, testPairs

  boundVersion = commaNumber.bindWith('_', '!')

  testPairs = [
    ['1234!56', '1_234!56'],
    ['1234567!89', '1_234_567!89'],
    ['1234567890!12', '1_234_567_890!12'],
    ['-1234!56', '-1_234!56'],
    ['-1234567!89', '-1_234_567!89'],
    ['-1234567890!12', '-1_234_567_890!12'],
  ]

  testEach(testPairs, t, boundVersion)
})

tap.test('bindWith() and number inputs', function (t) {

  var boundVersion, testPairs

  boundVersion = commaNumber.bindWith('_', '!')

  testPairs = [
    [1234.56, '1_234!56'],
    [1234567.89, '1_234_567!89'],
    [1234567890.12, '1_234_567_890!12'],
    [-1234.56, '-1_234!56'],
    [-1234567.89, '-1_234_567!89'],
    [-1234567890.12, '-1_234_567_890!12'],
  ]

  testEach(testPairs, t, boundVersion)
})
