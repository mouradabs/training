var split = require('split2')
var through = require('through2')

var sp = split(/\r?\n/, JSON.parse)
sp.on('error', function (err) {
  console.error(err)
})

process.stdin
  .pipe(sp)
  .pipe(through.obj(function (row, enc, next) {
    console.log(row)
    next()
  }))
