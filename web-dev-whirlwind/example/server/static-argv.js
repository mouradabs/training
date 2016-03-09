// static file server with command-line options

var http = require('http')
var ecstatic = require('ecstatic')
var st = ecstatic(__dirname + '/public')

var minimist = require('minimist')
var argv = minimist(process.argv.slice(2), {
  default: { port: 5000 },
  alias: { p: 'port' }
})

var server = http.createServer(function (req, res) {
  st(req, res)
})
server.listen(argv.port)
