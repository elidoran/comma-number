/**
 * Comma number formatter
 * @param {Number} number Number to format
 * @param {String} [separator=','] Value used to separate numbers
 * @param {String} [decimalChar='.'] Decimal character
 * @returns {String} Comma formatted number
 */
module.exports = function commaNumber (number, separator, decimalChar) {

  // get the stringNumber based on type, or, return '0' for invalid types
  var stringNumber
  switch(typeof number) {
    case 'string': stringNumber = number         ; break
    case 'number': stringNumber = String(number) ; break
    default      : return '0' // object, undefined, function, array, ...
  }

  // strip off decimal value to append to final result at the bottom
  decimalChar = typeof decimalChar === 'undefined' ? '.' : String(decimalChar)
  var decimal = stringNumber.lastIndexOf(decimalChar)
  if (decimal > -1) {
    number = stringNumber.slice(0, decimal)
    decimal = stringNumber.slice(decimal)
    stringNumber = number
  } else {
    decimal = null
  }

  // ensure we have an actual number
  if (typeof number !== 'number') {
    number = Number(number)
  }

  // when it doesn't need a separator then return it (w/decimal, if exists)
  if (-1000 < number && number < 1000) {
    return decimal ? stringNumber + decimal : stringNumber
  }

  // NaN => 0
  if (isNaN(number)) {
    return '0'
  }

  // Return Infinity immediately
  if (!isFinite(number) ) {
    return stringNumber
  }

  // below here we split the number at spots to add a separator.
  // then, combine it with the separator and add decimal value (if exists)

  var start = stringNumber[0] === '-' ? 1 : 0  // start after minus sign
    , count = stringNumber.length - start - 1  // count digits after first
    , strings = []                             // hold string parts
    , i = (count % 3) + 1 + start              // index for first separator

  // grab string content before where the first separator belongs
  strings.push(stringNumber.slice(0, i))

  // split remaining string in groups of 3 where a separator belongs
  for (; i < stringNumber.length; i += 3) {
    strings.push(stringNumber.substr(i, 3))
  }

  // finally, combine groups with the separator
  separator = typeof separator === 'undefined' ? ',' : String(separator)
  stringNumber = strings.join(separator)

  // if there's a decimal value then append it
  if (decimal) {
    stringNumber += decimal
  }

  return stringNumber
}
