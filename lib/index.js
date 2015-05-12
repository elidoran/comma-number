/**
 * Comma number formatter
 * @param {Number} number Number to format
 * @param {String} [separator=','] Value used to separate numbers
 * @returns {String} Comma formatted number
 */
module.exports = function commaNumber (number, separator) {
  separator = typeof separator === 'undefined' ? ',' : ('' + separator)

  // Convert to number if it's a non-numeric value
  if (typeof number !== 'number')
    number = Number(number)

  // NaN => 0
  if (isNaN(number))
    number = 0

  // Return Infinity immediately
  if (!Number.isFinite(number))
    return '' + number

  var stringNumber = ('' + Math.abs(number))
    .split('')
    .reverse()

  var result = []
  for (var i = 0; i < stringNumber.length; i++) {
    if (i && i % 3 === 0)
      result.push(separator)
    result.push(stringNumber[i])
  }

  // Handle negative numbers
  if (number < 0)
    result.push('-')

  return result
    .reverse()
    .join('')
}
