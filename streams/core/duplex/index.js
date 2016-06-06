var inherits = require('inherits')
var Duplex = require('readable-stream/duplex')
var http = require('http')

module.exports = LogWC
inherits(LogWC, Duplex)

function LogWC (host, port, fn) {
  if (!(this instanceof LogWC)) return new LogWC(host, port, fn)
  Duplex.call(this)
  this.host = host
  this.port = port
  this.bytes = 0
  this.lines = 0
  this.fn = fn
  this.once('finish', function () {
    fn({ bytes: this.bytes, lines: this.lines })
  })
}

LogWC.prototype.setHost = function (host) {
  this.host = host
}
LogWC.prototype.setPort = function (port) {
  this.port = port
}

LogWC.prototype._read = function (size) {
  var self = this
  var req = http.request({
    host: this.host,
    port: this.port,
    path: '/file.txt'
  }, function (res) {
    self.push(res.statusCode + '\n')
  })
  req.end()
}

LogWC.prototype._write = function (buf, enc, next) {
  this.bytes += buf.length
  for (var i = 0; i < buf.length; i++) {
    if (buf[i] === 0x0a) this.lines++
  }
  next()
}
