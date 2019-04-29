var inspect, pad, Benchmark, suite, revised, original, methods, results, useDelta, columns, row, oldOps, INVALID, NA, inputs

require('console.table')

inspect = require('util').inspect
pad = require('pad')
Benchmark = require('benchmark')
suite = new Benchmark.Suite
revised = require('../lib/')
original = require('./original.js')
methods = [original, revised]
results = []
useDelta = process.argv.indexOf('--delta') > -1
columns = (methods.length * (useDelta ? 2 : 1)) + 2
row = 0
oldOps = -1
INVALID = '!    invalid'
NA = '  N/A'

inputs = [

  [ [ '1' ], '1' ],
  [ [ '12' ], '12' ],
  [ [ '123' ], '123' ],
  [ [ '1234' ], '1,234' ],
  [ [ '12345' ], '12,345' ],
  [ [ '123456' ], '123,456' ],
  [ [ '1234567' ], '1,234,567' ],
  [ [ '12345678' ], '12,345,678' ],
  [ [ '123456789' ], '123,456,789' ],
  [ [ '1234567890' ], '1,234,567,890' ],
  [ [ '12345678901' ], '12,345,678,901' ],
  [ [ '123456789012' ], '123,456,789,012' ],

  [ [ '-1' ], '-1' ],
  [ [ '-12' ], '-12' ],
  [ [ '-123' ], '-123' ],
  [ [ '-1234' ], '-1,234' ],
  [ [ '-12345' ], '-12,345' ],
  [ [ '-123456' ], '-123,456' ],
  [ [ '-1234567' ], '-1,234,567' ],
  [ [ '-12345678' ], '-12,345,678' ],
  [ [ '-123456789' ], '-123,456,789' ],
  [ [ '-1234567890' ], '-1,234,567,890' ],
  [ [ '-12345678901' ], '-12,345,678,901' ],
  [ [ '-123456789012' ], '-123,456,789,012' ],

  [ [ 1 ], '1' ],
  [ [ 12 ], '12' ],
  [ [ 123 ], '123' ],
  [ [ 1234 ], '1,234' ],
  [ [ 12345 ], '12,345' ],
  [ [ 123456 ], '123,456' ],
  [ [ 1234567 ], '1,234,567' ],
  [ [ 12345678 ], '12,345,678' ],
  [ [ 123456789 ], '123,456,789' ],
  [ [ 1234567890 ], '1,234,567,890' ],
  [ [ 12345678901 ], '12,345,678,901' ],
  [ [ 123456789012 ], '123,456,789,012' ],

  [ [ -1 ], '-1' ],
  [ [ -12 ], '-12' ],
  [ [ -123 ], '-123' ],
  [ [ -1234 ], '-1,234' ],
  [ [ -12345 ], '-12,345' ],
  [ [ -123456 ], '-123,456' ],
  [ [ -1234567 ], '-1,234,567' ],
  [ [ -12345678 ], '-12,345,678' ],
  [ [ -123456789 ], '-123,456,789' ],
  [ [ -1234567890 ], '-1,234,567,890' ],
  [ [ -12345678901 ], '-12,345,678,901' ],
  [ [ -123456789012 ], '-123,456,789,012' ],

  [ ['1.2'], '1.2' ],
  [ ['12.3'], '12.3' ],
  [ ['123.4'], '123.4' ],
  [ ['1234.5'], '1,234.5' ],
  [ ['12345.6'], '12,345.6' ],
  [ ['123456.7'], '123,456.7' ],
  [ ['1234567.8'], '1,234,567.8' ],
  [ ['12345678.9'], '12,345,678.9' ],
  [ ['123456789.0'], '123,456,789.0' ],
  [ ['1234567890.1'], '1,234,567,890.1' ],
  [ ['12345678901.2'], '12,345,678,901.2' ],
  [ ['123456789012.3'], '123,456,789,012.3' ],

  [ ['-1.2'], '-1.2' ],
  [ ['-12.3'], '-12.3' ],
  [ ['-123.4'], '-123.4' ],
  [ ['-1234.5'], '-1,234.5' ],
  [ ['-12345.6'], '-12,345.6' ],
  [ ['-123456.7'], '-123,456.7' ],
  [ ['-1234567.8'], '-1,234,567.8' ],
  [ ['-12345678.9'], '-12,345,678.9' ],
  [ ['-123456789.0'], '-123,456,789.0' ],
  [ ['-1234567890.1'], '-1,234,567,890.1' ],
  [ ['-12345678901.2'], '-12,345,678,901.2' ],
  [ ['-123456789012.3'], '-123,456,789,012.3' ],

  [ [ 1.2 ], '1.2' ],
  [ [ 12.3 ], '12.3' ],
  [ [ 123.4 ], '123.4' ],
  [ [ 1234.5 ], '1,234.5' ],
  [ [ 12345.6 ], '12,345.6' ],
  [ [ 123456.7 ], '123,456.7' ],
  [ [ 1234567.8 ], '1,234,567.8' ],
  [ [ 12345678.9 ], '12,345,678.9' ],
  [ [ 123456789.1 ], '123,456,789.1' ],
  [ [ 1234567890.1 ], '1,234,567,890.1' ],
  [ [ 12345678901.2 ], '12,345,678,901.2' ],
  [ [ 123456789012.3 ], '123,456,789,012.3' ],

  [ [ -1.2 ], '-1.2' ],
  [ [ -12.3 ], '-12.3' ],
  [ [ -123.4 ], '-123.4' ],
  [ [ -1234.5 ], '-1,234.5' ],
  [ [ -12345.6 ], '-12,345.6' ],
  [ [ -123456.7 ], '-123,456.7' ],
  [ [ -1234567.8 ], '-1,234,567.8' ],
  [ [ -12345678.9 ], '-12,345,678.9' ],
  [ [ -123456789.1 ], '-123,456,789.1' ],
  [ [ -1234567890.1 ], '-1,234,567,890.1' ],
  [ [ -12345678901.2 ], '-12,345,678,901.2' ],
  [ [ -123456789012.3 ], '-123,456,789,012.3' ],

]

Benchmark.options.initCount  = 20
Benchmark.options.minSamples = 20

function run(fn, input) {
  return function() { fn.apply(fn, input) }
}

for (var i = 0, end = inputs.length; i < end; i++) {
  var input, name, rowResult

  input = inputs[i][0]
  answer = inputs[i][1]

  name = pad(20, inspect(input).slice(2, -2))

  rowResult = {
    name: name,
    old: { info: null, valid: false },
    new: { info: null, valid: false }
  }

  // start out with an object containing the info.
  // the onCycle event will replace it with a data array
  results.push(rowResult)

  // test if function produces answer.
  if (methods[0].apply(methods[0], input) === answer) {
    rowResult.old.valid = true
    suite.add(name, run(methods[0], input))
  }

  if (methods[1].apply(methods[1], input) === answer) {
    rowResult.new.valid = true
    suite.add(name, run(methods[1], input))
  }

  // if they're both invalid then we have to handle it right now
  if (rowResult.old.valid === false && rowResult.new.valid === false) {
    results[results.length - 1] = resultArray(rowResult)
  }
}

function filterInfo(info) {
  return { hz: info.hz, rme: info.stats.rme }
}

function formatOps(info) {
  var fixed, formatted
  fixed     = info.hz.toFixed(0)
  formatted = revised(fixed)
  return pad(12, formatted)
}

function formatDelta(info) {
  var fixed, decorated
  fixed     = info.stats.rme.toFixed(1)
  decorated = '+-' + fixed + '%'
  return pad(6, decorated)
}

function formatDiff(oldResult, newResult) {
  var diff, percent, decorated
  if (oldResult.valid && newResult.valid) {
    diff    = (newResult.info.hz - oldResult.info.hz)
    percent = (diff / oldResult.info.hz) * 100
    decorated = percent.toFixed(0) + '%'
    return pad(5, decorated)
  } else {
    return NA
  }
}

function resultArray(result) {
  var array, newIndex

  if (useDelta) {
    array = [ result.name, null, null, null, null, null ]

    array[2] = (result.old.valid) ? formatDelta(result.old.info) : NA
    array[4] = (result.new.valid) ? formatDelta(result.new.info) : NA

    newIndex = 3
  } else {
    array = [ result.name, null, null, null ]
    newIndex = 2
  }

  array[1] = (result.old.valid) ? formatOps(result.old.info) : INVALID
  array[newIndex] = (result.new.valid) ? formatOps(result.new.info) : INVALID
  array[array.length - 1] = formatDiff(result.old, result.new)

  return array
}

suite.on('cycle', function(event) {
  var it, result, which

  it = event.target
  result = results[row]

  // if all methods produced invalid results then this `result` will already be
  // an array. so, skip until we find a result row which is *not* an array.
  // that's the one which corresponds to the current cycle result.
  while (Array.isArray(result)) {
    row++
    result = results[row]
  }

  if (result.old == null)
    console.log('result is missing `old`:',result)

  which = (result.old.info == null && result.old.valid) ? 'old' : 'new'

  console.log(which, 'completed', it.name)

  if (which === 'new') {
    result.new.info = filterInfo(it)
    results[row] = resultArray(result)
    row++
  } else {
    result.old.info = filterInfo(it)
  }
})

suite.on('complete', function() {
  var headers
  headers = ['     input', '     old     ', '     new     ', '+']
  if (useDelta) {
    headers.splice(2, 0, 'delta1')
    headers.splice(4, 0, 'delta2')
  }
  console.log()
  console.table(headers, results)
})

console.log('comma-number benchmark (' + process.pid + ')')

const ask = require('readline').createInterface({
  input : process.stdin,
  output: process.stdout
})

ask.question('Begin benchmark? (y/N)  ', function(answer) {

  ask.close()

  if ((answer != null) && (answer[0] === 'y' || answer[0] === 'Y')) {
    suite.run({
      async: false
    })
  }

  else {
    console.log('quitting')
  }

})
