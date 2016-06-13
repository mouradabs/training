var http = require('http')
var ecstatic = require('ecstatic')
var path = require('path')

var st = ecstatic(path.join(__dirname, 'public'))

var server = http.createServer(function (req, res) {
  if (req.method === 'POST') {
    res.end('whatever\n')
  } else st(req, res)
})
server.listen(5002)
