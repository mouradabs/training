var test = require('tape')
var path = require('path')
var spawn = require('child_process').spawn

var server
PORT = Math.floor(Math.random() * 50000 + 10000)

test('setup suite', function (t) {
  var file = path.join(__dirname, '../server.js')
  server = spawn(process.execPath, [file, PORT])
  var exited = false
  server.on('exit', onexit)
  setTimeout(function () {
    t.equal(exited, false, 'did not exit after 1 second')
    server.removeListener('exit', onexit)
    t.end()
  }, 1000)
  function onexit () { exited = true }
})

test.onFinish(function () {
  server.kill()
})
