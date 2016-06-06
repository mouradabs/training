var to = require('to2')
var split = require('split2')

var bytes = 0
process.stdin.pipe(split()).pipe(to(write, end))

function write (buf, enc, next) {
  bytes += buf.length
  next()
}

function end () {
  console.log(bytes)
}
