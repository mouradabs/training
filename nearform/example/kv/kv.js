var hyperlog = require('hyperlog')
var hyperkv = require('hyperkv')

var level = require('level')
var minimist = require('minimist')
var argv = minimist(process.argv.slice(2))

var db = level(argv.d + '/log')
var log = hyperlog(db, { valueEncoding: 'json' })

var kv = hyperkv({
  db: level(argv.d + '/index'),
  log: log
})

if (argv._[0] === 'set') {
  var key = argv.key
  var value = argv.value
  kv.put(key, value, function (err, node) {
    console.log(node.key)
  })
} else if (argv._[0] === 'get') {
  kv.get(argv.key, function (err, value) {
    console.log(value)
  })
} else if (argv._[0] === 'sync') {
  process.stdin.pipe(log.replicate()).pipe(process.stdout)
}
