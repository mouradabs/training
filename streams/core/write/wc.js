//var Writable = require('stream').Writable
var Writable = require('readable-stream/writable')
//var inherits = require('util').inherits
var inherits = require('inherits')

module.exports = WC
inherits(WC, Writable)

function WC (fn) {
  if (!(this instanceof WC)) return new WC(fn)
  Writable.call(this)
  this.bytes = 0
  this.lines = 0
  this.fn = fn
  this.once('finish', function () {
    fn({ bytes: this.bytes, lines: this.lines })
  })
}

WC.prototype._write = function (buf, enc, next) {
  this.bytes += buf.length
  for (var i = 0; i < buf.length; i++) {
    if (buf[i] === 0x0a) this.lines++
  }
  next()
}
