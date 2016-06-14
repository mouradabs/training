var test = require('tape')
var request = require('request')
var href = 'http://localhost:5000'

var token = null
test('setup', function (t) {
  request(href + '/token', function (err, res, body) {
    t.error(err)
    token = body.toString()
    var opts = {
      url: href + '/clear',
      headers: { token: token }
    }
    request(opts, function (err, res, body) {
      t.error(err)
      t.equal(body.toString(), 'ok\n')
      t.end()
    })
  })
})

test('populate the server with /add', function (t) {
  var messages = ['cool','beans','saxaphone','potato']
  t.plan(2 * messages.length)
  messages.forEach(function (msg) {
    var opts = {
      url: href + '/add/' + msg,
      headers: { token: token }
    }
    request(opts, function (err, res, body) {
      t.error(err)
      t.equal(body.toString(), 'ok\n')
    })
  })
})

test('get a list of the added records', function (t) {
  t.plan(1)
  var opts = {
    url: href + '/list',
    headers: { token: token }
  }
  request(opts, function (err, res, body) {
    var lines = body.toString().split('\n')
    var expected = ['cool','beans','saxaphone','potato']
    t.deepEqual(lines, expected, 'expected values in the list')
  })
})
