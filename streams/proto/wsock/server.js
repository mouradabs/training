var http = require('http')
var Proto = require('../')
var ecstatic = require('ecstatic')

var server = http.createServer(ecstatic('public'))
server.listen(5000)

var wsock = require('websocket-stream')
wsock.createServer({ server: server }, function (stream) {
  var proto = Proto()
  stream.pipe(proto).pipe(stream)
  setInterval(function () {
    proto.time(function (t) {
      console.log('t=', t)
    })
  }, 1000)
})
