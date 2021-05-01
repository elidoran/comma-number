2.1.0 - 2021/04/30
==================

1. tweak the flow a bit so the `separator` and `decimal` value are all in an array which is turned into a string via `join('')`. so, all at once the parts are turned into the final string.
2. added some local scopes to the format.
3. changed how it calculates where to start putting separators.
4. switched a while-loop with an increment in the block to a for-loop with the increment in its loop definition.
5. fixed a bug in the `benchmark/index.js` file when using the `--delta` option.
6. added more (longer) numbers to the tests


2.0.2 - 2021/04/28

1. update dev dependencies
2. add 2021 to copyright
3. reformatted var usage in test/lib/index.js and added new test showing a bug
4. fixed bug when a number input was given for a `decimalChar` other than `'.'`.
5. added node 14 to testing
6. switched from tape to tap for testing and removed istanbul
7. added `.nyc_output` to git ignore
8. updated travis config to use a single VM and use nave to run tests with multiple node versions.
9. add `npm install` to command list in docs/benchmark.md.

2.0.1 - 2019/04/19

1. update dev dependencies
2. add 2018 and 2019 to copyright
3. remove lcov only coverage script
4. add nave dev dependency and use it in test scripts for node 4-12 (evens)
5. use const/let instead of var
6. use more descriptive variable names
7. reformat a bit
8. update benchmark script to report PID and ask before starting so the process can be set to a high priority

2.0.0 - 2017/04/02
==================

1. revised implementation
2. supports decimals
3. more test cases
4. updated travis with modern node versions
5. added badges to README
6. updated README content with change info, new `bindWith()`, benchmark info.
7. added code coverage
8. dropped 'standard' lint
9. added benchmarking
10. added a document showing the benchmark output (docs/benchmark.md)


1.1.0 / 2015-07-16
==================

* Use isFinite instead of Number.isFinite for improved browser compatibility

1.0.0 / 2015-05-12
==================

  * Initial release
