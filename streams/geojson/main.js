var json = require('jsonstream')
var fs = require('fs')
var to = require('to2')

var counts = {}

fs.createReadStream('trees.geojson')
  .pipe(json.parse(['features',true,'properties','SPECIES']))
  .pipe(to.obj(write, end))

function write (species, enc, next) {
  counts[species] = (counts[species] || 0) + 1
  next()
}
function end () {
  var sorted = Object.keys(counts).sort(function (a, b) {
    return counts[a] < counts[b] ? -1 : 1
  })
  for (var i = 0; i < 10; i++) {
    console.log(sorted[i], counts[sorted[i]])
  }
}
