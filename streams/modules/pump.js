var pump = require('pump')
var split = require('split2')
var through = require('through2')

pump(
  process.stdin,
  split(),
  through(write),
  process.stdout
)

function write (buf, enc, next) {
  next(null, buf.toString().toUpperCase())
}
