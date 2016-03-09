var ecstatic = require('ecstatic')
var st = ecstatic(__dirname + '/public')
var http = require('http')
var server = http.createServer(function (req, res) {
  st(req, res)
})
server.listen(5000)

var wsock = require('websocket-stream')
var split = require('split2')
var through = require('through2')
wsock.createServer({ server: server }, function (stream) {
  stream
    .pipe(split())
    .pipe(through(uppercaser))
    .pipe(stream)

  function uppercaser (buf, enc, next) {
    next(null, buf.toString().toUpperCase() + '\n')
  }
})
