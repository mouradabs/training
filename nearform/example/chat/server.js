var http = require('http')
var ecstatic = require('ecstatic')
var st = ecstatic(__dirname + '/public')
var onend = require('end-of-stream')
var split = require('split2')
var through = require('through2')

var server = http.createServer(function (req, res) {
  st(req, res)
})
server.listen(5000)

var streams = []
var wsock = require('websocket-stream')
wsock.createServer({ server: server }, function (stream) {
  console.log('client connected')
  streams.push(stream)
  stream.pipe(split()).pipe(through(function (buf, enc, next) {
    streams.forEach(function (s) {
      s.write(buf + '\n')
    })
    next()
  }))
  onend(stream, function () {
    console.log('client disconnected')
    var ix = streams.indexOf(stream)
    streams.splice(ix, 1)
  })
})
