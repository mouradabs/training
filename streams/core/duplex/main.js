var fs = require('fs')
var log = require('./')('localhost', 5000, function (counts) {
  console.log(counts)
})
process.stdin.pipe(log).pipe(fs.createWriteStream('log.txt'))
