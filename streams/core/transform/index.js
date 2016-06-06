var inherits = require('inherits')
var Transform = require('readable-stream/transform')

module.exports = Flipper
inherits(Flipper, Transform)

function Flipper (mode) {
  if (!(this instanceof Flipper)) return new Flipper(mode)
  Transform.call(this)
  this.mode = mode
  this.modes = ['upper','lower','flip']
}

Flipper.prototype.setMode = function (mode) {
  this.mode = mode
}

Flipper.prototype.nextMode = function () {
  var i = this.modes.indexOf(this.mode)
  this.setMode(this.modes[(i+1)%this.modes.length])
}

Flipper.prototype._transform = function (buf, enc, next) {
  if (this.mode === 'upper') {
    next(null, buf.toString().toUpperCase())
  } else if (this.mode === 'lower') {
    next(null, buf.toString().toLowerCase())
  } else if (this.mode === 'flip') {
    var str = ''
    for (var i = 0; i < buf.length; i++) {
      var c = String.fromCharCode(buf[i])
      if (c.toLowerCase() === c) {
        str += c.toUpperCase()
      } else {
        str += c.toLowerCase()
      }
    }
    next(null, str)
  } else next()
}

Flipper.prototype._flush = function (next) {
  this.push('!!!!\n')
  next()
}
