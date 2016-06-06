var csv = require('csv-parser')
var fs = require('fs')
var to = require('to2')

var sum = 0
fs.createReadStream('parcels.csv')
  .pipe(csv())
  .pipe(to.obj(write, end))

function write (row, enc, next) {
  var value = Number(row.ASSESSED_VALUE)
  sum += value
  next()
}

function end () {
  console.log(sum)
}
