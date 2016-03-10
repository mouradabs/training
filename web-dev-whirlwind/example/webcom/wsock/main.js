var wsock = require('websocket-stream')
var stream = wsock('ws://localhost:5000')

var split = require('split2')
var through = require('through2')
stream.pipe(split()).pipe(through(function (line, enc, next) {
  console.log('line=' + line)
  next()
}))

setInterval(function () {
  stream.write(new Date().toISOString() + '\n')
}, 1000)
