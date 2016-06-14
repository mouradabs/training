var csv = require('csv-parser')
var to = require('to2')

var sum = 0
process.stdin
  .pipe(csv())
  .pipe(to.obj(write, end))

function write (row, enc, next) {
  sum += Number(row.ASSESSED_VALUE)
  next()
}

function end () {
  console.log(sum)
}
