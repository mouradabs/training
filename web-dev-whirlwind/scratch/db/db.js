var level = require('level')
var db = level('data.db', {
  valueEncoding: 'json'
})
var minimist = require('minimist')
var argv = minimist(process.argv.slice(2))

if (process.argv[2] === 'put') {
  var key = process.argv[3]
  var value = process.argv[4]
  db.put(key, value, function (err) {
    if (err) console.error(err)
  })
} else if (process.argv[2] === 'get') {
  var key = process.argv[3]
  db.get(key, function (err, value) {
    if (err) console.error(err)
    else console.log(value)
  })
} else if (process.argv[2] === 'read') {
  var r = db.createReadStream(argv)
  r.on('data', console.log)
}
