'use strict'

// return a string with the provided number formatted with commas.
// can specify either a Number or a String.
function commaNumber(inputNumber, optionalSeparator, optionalDecimalChar) {

  // default `decimalChar` is a period
  const decimalChar = optionalDecimalChar || '.'

  let stringNumber // we assign this in the switch block and need it later.

  {
    let number // we assign this in the switch block and need it right after.

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
  }

  {
    // strip off decimal value to add back in later
    const decimalIndex = stringNumber.lastIndexOf(decimalChar)
    let decimal
    if (decimalIndex > -1) {
      decimal = stringNumber.slice(decimalIndex)
      stringNumber = stringNumber.slice(0, decimalIndex)
    }

    // finally, parse the string. Note, default 'separator' is a comma.
    const parts = parse(stringNumber, optionalSeparator || ',')

    // if there's a decimal value then add it to the parts.
    if (decimal) {// NOTE: we sliced() it off including the decimalChar
      parts.push(decimal)
    }

    // combine all parts for the final string (note, has separators).
    return parts.join('')
  }
}

function parse(string, separator) {

  // find first index to split the string at (where 1st separator goes).
  let i = ((string.length - 1) % 3) + 1

  // above calculation is wrong when num is negative and a certain size.
  if (i === 1 && (string[0] === '-')) {
    i = 4  // example: -123,456,789  start at 4, not 1.
  }

  const strings = [ // holds the string parts
    string.slice(0, i) // grab part before the first separator
  ]

  // split remaining string in groups of 3 where a separator belongs
  for (; i < string.length; i += 3) {
    strings.push(separator, string.substr(i, 3))
  }

  return strings
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
