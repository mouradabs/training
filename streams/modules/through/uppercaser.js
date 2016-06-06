var through = require('through2')
process.stdin.pipe(through(write, end)).pipe(process.stdout)

function write (buf, enc, next) {
  next(null, buf.toString().toUpperCase())
}

function end (next) {
  next()
}
