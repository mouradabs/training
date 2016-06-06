var through = require('through2')

var stream = through.obj(write, end)
var sum = 0

function write (row, enc, next) {
  sum += row.x
  next()
}

function end () {
  console.log(sum)
}

stream.write({ x: 5 })
stream.write({ x: 2 })
stream.write({ x: 1 })
stream.write({ x: 10 })
stream.end()
