var test = require('tape')
var centifier = require('../')

test('tape example', function (t) {
  t.plan(4)
  centifier(2, function (err, res) {
    t.error(err)
    t.equal(res, 200, '2*100 equals 200')
  })
  centifier(0, function (err, res) {
    t.error(err)
    t.ok(res >= 0, '>= 0')
  })
})
