var http = require('http')
var ecstatic = require('ecstatic')
var st = ecstatic(__dirname + '/public')

var server = http.createServer(function (req, res) {
  if (req.url === '/time') {
    res.end(Date.now() + '\n')
  } else st(req, res)
})
server.listen(5000)
