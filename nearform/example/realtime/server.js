var http = require('http')
var ecstatic = require('ecstatic')
var st = ecstatic(__dirname + '/public')
var onend = require('end-of-stream')

var server = http.createServer(function (req, res) {
  st(req, res)
})
server.listen(5001)

var streams = []
var wsock = require('websocket-stream')
wsock.createServer({ server: server }, function (stream) {
  console.log('client connected')
  streams.push(stream)
  onend(stream, function () {
    console.log('client disconnected')
    var ix = streams.indexOf(stream)
    streams.splice(ix, 1)
  })
})

setInterval(function () {
  streams.forEach(function (stream) {
    stream.write(Date.now() + '\n')
  })
}, 1000)
