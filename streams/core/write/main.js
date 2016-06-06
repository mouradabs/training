var wc = require('./wc.js')
process.stdin.pipe(wc(function (counts) {
  console.log(counts)
}))
