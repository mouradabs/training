var inherits = require('inherits')
//var Readable = require('readable-stream').Readable
var Readable = require('readable-stream/readable')
//var Readable = require('stream').Readable
var http = require('http')

module.exports = Log
inherits(Log, Readable)

function Log (host, port) {
  if (!(this instanceof Log)) return new Log(host, port)
  Readable.call(this)
  this.host = host
  this.port = port
}

Log.prototype.setHost = function (host) {
  this.host = host
}
Log.prototype.setPort = function (port) {
  this.port = port
}

Log.prototype._read = function (size) {
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
