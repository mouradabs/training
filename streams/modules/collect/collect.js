var collect = require('collect-stream')
var split = require('split2')

collect(process.stdin.pipe(split(JSON.parse)), function (err, rows) {
  if (err) console.error(err)
  else console.log(rows)
})
