var http = require('http')
var path = require('path')
var ecstatic = require('ecstatic')
var st = ecstatic(path.join(__dirname, 'public'))

var server = http.createServer(st)
server.listen(5000)

var wsock = require('websocket-stream')
wsock.createServer({ server: server }, function (stream) {
  stream.write('{"n":5}\n')
  stream.write('{"n":6}\n')
  stream.write('{"n":10}\n')
})
