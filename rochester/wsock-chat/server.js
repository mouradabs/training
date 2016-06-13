var http = require('http')
var path = require('path')
var ecstatic = require('ecstatic')
var st = ecstatic(path.join(__dirname, 'public'))
var onend = require('end-of-stream')
var randombytes = require('crypto').randomBytes
var split = require('split2')
var to = require('to2')

var server = http.createServer(st)
server.listen(5005)

var streams = {}

var wsock = require('websocket-stream')
wsock.createServer({ server: server }, function (stream) {
  var id = randombytes(8).toString('hex')
  streams[id] = stream
  onend(stream, function () {
    delete streams[id]
  })
  stream.pipe(split()).pipe(to(function (buf, enc, next) {
    Object.keys(streams).forEach(function (key) {
      streams[key].write(buf + '\n')
    })
    next()
  }))
})
