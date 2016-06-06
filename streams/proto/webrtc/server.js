var http = require('http')
var Proto = require('../')
var ecstatic = require('ecstatic')

var server = http.createServer(ecstatic('public'))
server.listen(5000)
