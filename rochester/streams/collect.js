var test = require('tape')
var collect = require('collect-stream')
var Readable = require('readable-stream/readable')

test('collecting some objects', function (t) {
  t.plan(2)
  var r = createStream()
  collect(r, function (err, values) {
    t.error(err)
    t.deepEqual(values, [ {n:5}, {n:3}, {n:9}, {n:1} ])
  })
})

function createStream () {
  var r = new Readable({ objectMode: true })
  r._read = function () {}

  r.push({n:5})
  r.push({n:3})
  r.push({n:9})
  r.push({n:1})
  r.push(null)
  return r
}
