var http = require('http')
var path = require('path')
var ecstatic = require('ecstatic')
var st = ecstatic(path.join(__dirname, 'public'))

var server = http.createServer(st)
server.listen(5000)

var wsock = require('websocket-stream')
wsock.createServer({ server: server }, function (stream) {
  stream.write('hello!\n')
  stream.pipe(stream)
})
