var http = require('http')
var onend = require('end-of-stream')
var randombytes = require('randombytes')
var split = require('split2')
var to = require('to2')

var streams = {}

var ecstatic = require('ecstatic')
var st = ecstatic('public')
var server = http.createServer(st)
server.listen(5000)

var wsock = require('websocket-stream')
wsock.createServer({ server: server }, function (stream) {
  var id = randombytes(8).toString('hex')
  streams[id] = stream
  onend(stream, function () {
    delete streams[id]
  })

  stream.pipe(to(function (buf, enc, next) {
    Object.keys(streams).forEach(function (key) {
      if (key !== id) streams[key].write(buf)
    })
    next()
  }))
})
