var through = require('through2')
process.stdin.pipe(through(write)).pipe(process.stdout)

function write (buf, enc, next) {
  this.push(buf.toString().toUpperCase())
  next()
}
