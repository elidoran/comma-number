'use strict'

// return a string with the provided number formatted with commas.
// can specify either a Number or a String.
function commaNumber(inputNumber, optionalSeparator, optionalDecimalChar) {

  // we'll strip off and hold the decimal value to reattach later.
  // we'll hold both the `number` value and `stringNumber` value.
  let number, stringNumber, decimal

  // default `separator` is a comma
  const separator = optionalSeparator || ','

  // default `decimalChar` is a period
  const decimalChar = optionalDecimalChar || '.'

  switch (typeof inputNumber) {

    case 'string':

      // if there aren't enough digits to need separators then return it
      // NOTE: some numbers which are too small will get passed this
      //       when they have decimal values which make them too long here.
      //       but, the number value check after this switch will catch it.
      if (inputNumber.length < (inputNumber[0] === '-' ? 5 : 4)) {
        return inputNumber
      }

      // remember it as a string in `stringNumber` and convert to a Number
      stringNumber = inputNumber

      // if they're not using the Node standard decimal char then replace it
      // before converting.
      number = Number(
        (decimalChar !== '.') ? stringNumber.replace(decimalChar, '.') : stringNumber
      )
      break

    // convert to a string.
    // NOTE: don't check if the number is too small before converting
    //       because we'll need to return `stringNumber` anyway.
    case 'number':
      stringNumber = String(inputNumber)
      number       = inputNumber
      // create the string version with the decimalChar they specified.
      // this matches what the above case 'string' produces,
      // and, fixes the bug *not* doing this caused.
      if ('.' !== decimalChar && !Number.isInteger(inputNumber)) {
        stringNumber = stringNumber.replace('.', decimalChar)
      }
      break

    // return invalid type as-is
    default: return inputNumber
  }

  // when it doesn't need a separator or isn't a number then return it
  if ((-1000 < number && number < 1000) || isNaN(number) || !isFinite(number)) {
    return stringNumber
  }

  // strip off decimal value to append to the final result at the bottom
  let decimalIndex = stringNumber.lastIndexOf(decimalChar)

  if (decimalIndex > -1) {
    decimal = stringNumber.slice(decimalIndex)
    stringNumber = stringNumber.slice(0, -decimal.length)
  }

  // else {
  //   decimal = null
  // }

  // finally, parse the string and add in separators
  stringNumber = parse(stringNumber, separator)

  // if there's a decimal value add it back on the end.
  // NOTE: we sliced() it off including the decimalChar, so it's good.
  return decimal ? stringNumber + decimal : stringNumber

}


function parse(stringNumber, separator) {

  // below here we split the number at spots to add a separator.
  // then, combine it with the separator and add decimal value (if exists)

  const start = stringNumber[0] === '-' ? 1 : 0  // start after minus sign
  const count = stringNumber.length - start - 1  // count digits after first
  let i = (count % 3) + 1 + start                // index for first separator
  const strings = [                              // hold string parts
    // grab string content before where the first separator belongs
    stringNumber.slice(0, i)
  ]

  // split remaining string in groups of 3 where a separator belongs
  while (i < stringNumber.length) {
    strings.push(stringNumber.substr(i, 3))
    i += 3
  }

  // finally, combine groups with the separator
  return strings.join(separator)
}


// convenience function for currying style:
//   const format = commaNumber.bindWith(',', '.')
function bindWith(separator, decimalChar) {
  return function(number) {
    return commaNumber(number, separator, decimalChar)
  }
}

module.exports = commaNumber
module.exports.bindWith = bindWith
