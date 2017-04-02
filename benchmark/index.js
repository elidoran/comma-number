require('console.table')
var comma = require('../lib/index.js')
  , Benchmark = require('benchmark')

Benchmark.options.initCount  = 10
Benchmark.options.minSamples = 10

// useful when altering things because it runs once per.
// Benchmark.options.initCount = 1
// Benchmark.options.minSamples = 1
// Benchmark.options.minTime = -1
// Benchmark.options.maxTime = -1

inputs = [
  '1',
  '12',
  '123',
  '1234',
  '12345',
  '123456',
  '1234567',
  '12345678',
  '123456789',
  '1234567890',
  '12345678901',
  '123456789012',

  1,
  12,
  123,
  1234,
  12345,
  123456,
  1234567,
  12345678,
  123456789,
  1234567890,
  12345678901,
  123456789012
]

var methods = [
  require('./original'),
  comma
]

var suite = new Benchmark.Suite
  , headers = [' ', 'original', 'alternate']
  , results = []

for (var i = 0; i < inputs.length; i++) {
  var input = inputs[i]
    , name = typeof input === 'string' ? '\'' + input + '\'' : input

  results.push([name])

  suite.add(name, methods[0].bind(null, input))
  suite.add(name, methods[1].bind(null, input))
}

var columns = methods.length + 1
  , row = 0

suite.on('cycle', function(event) {
  var it = event.target
    , which = results[row].length === 1 ? ' original' : 'alternate'

  console.log(which,'completed',it.name)

  results[row].push(comma(it.hz.toFixed(2)) + ' (+-' + it.stats.rme.toFixed(2) + '%)')

  if (results[row].length === columns) {
    return row++
  }
})

suite.on('complete', function() {
  console.log()
  console.table(headers, results)
})

suite.run({
  async: false
})
