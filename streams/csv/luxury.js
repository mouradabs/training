var csv = require('csv-parser')
var fs = require('fs')
var to = require('to2')

fs.createReadStream('parcels.csv')
  .pipe(csv())
  .pipe(to.obj(write))

function write (row, enc, next) {
  var value = Number(row.ASSESSED_VALUE)
  if (value > 50e6) console.log(row)
  next()
}
