var http = require('http')
var path = require('path')
var ecstatic = require('ecstatic')
var st = ecstatic(path.join(__dirname, 'public'))
var onend = require('end-of-stream')

var server = http.createServer(st)
server.listen(5000)

var wsock = require('websocket-stream')
wsock.createServer({ server: server }, function (stream) {
  var iv = setInterval(function () {
    stream.write(JSON.stringify({ n: Math.random() }) + '\n')
  }, 1000)

  onend(stream, function () { clearInterval(iv) })
})
