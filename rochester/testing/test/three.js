var test = require('tape')
var centifier = require('../')

test('threes', function (t) {
  centifier(3, function (err, res) {
    t.error(err)
    t.equal(res, 300, 'cent(3) == 300')
    t.end()
  })
})
