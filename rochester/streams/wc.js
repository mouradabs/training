var split = require('split2')
var through = require('through2')

var count = 0
process.stdin
  .pipe(split())
  .pipe(through(write, end))
  .pipe(process.stdout)
  
function write (buf, enc, next) {
  count++
  next()
}
function end (next) {
  this.push(count + '\n')
  next()
}
