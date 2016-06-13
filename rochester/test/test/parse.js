var parse = require('../')
var test = require('tape')
var strftime = require('strftime')

test('simple schedule', function (t) {
  var p = parse('every thursday at 7pm')
  var next = []
  var d = new Date
  for (var i = 0; i < 5; i++) {
    d = p.next(d)
    next.push(strftime('%F %T', d))
  }
  d = new Date
  var prev = []
  for (var i = 0; i < 5; i++) {
    d = p.prev(d)
    prev.push(strftime('%F %T', d))
  }
  var expectedNext = [
    '2016-06-16 19:00:00',
    '2016-06-23 19:00:00',
    '2016-06-30 19:00:00',
    '2016-07-07 19:00:00',
    '2016-07-14 19:00:00'
  ]
  t.deepEqual(next, expectedNext, 'expected next dates')
  var expectedPrev = [
    '2016-06-09 19:00:00',
    '2016-06-02 19:00:00',
    '2016-05-26 19:00:00',
    '2016-05-19 19:00:00',
    '2016-05-12 19:00:00'
  ]
  t.deepEqual(prev, expectedPrev, 'expected prev dates')
  t.end()
})

test.only('the 1st of every other month', function (t) {
  var p = parse('the 1st of every other month')
  var next = []
  var d = new Date
  for (var i = 0; i < 5; i++) {
    d = p.next(d)
    next.push(strftime('%F %T', d))
  }
  var expected = [
    '2016-07-01 00:00:00',
    '2016-09-01 00:00:00',
    '2016-11-01 00:00:00',
    '2017-01-01 00:00:00',
    '2017-03-01 00:00:00'
  ]
  t.deepEqual(next, expected, 'expected next dates')
  t.end()
})
