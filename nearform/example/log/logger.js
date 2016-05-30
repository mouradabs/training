var hyperlog = require('hyperlog')
var level = require('level')
var net = require('net')

var db = level('cool.db')
var log = hyperlog(db, { valueEncoding: 'json' })

var server = net.createServer(function (stream) {
  stream.pipe(log.replicate()).pipe(stream)
})
server.listen(5000)

setInterval(function () {
  log.append(Date.now(), function (err, node) {
    console.log(node)
  })
}, 1000)
