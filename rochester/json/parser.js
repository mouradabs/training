var json = require('jsonstream').parse
var fs = require('fs')
var to = require('to2')

fs.createReadStream('trees.geojson')
  .pipe(json(['features',true,'properties']))
  .pipe(to.obj(function (row, enc, next) {
    if (row.IS_PROBLEM !== 'False') {
      console.log(row.SPECIES)
    }
    next()
  }))
