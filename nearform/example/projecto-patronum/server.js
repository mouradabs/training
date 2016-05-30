var http = require('http')
var ecstatic = require('ecstatic')
var st = ecstatic(__dirname + '/public')
var onend = require('end-of-stream')
var split = require('split2')
var through = require('through2')

var server = http.createServer(function (req, res) {
  st(req, res)
})
server.listen(5000)
