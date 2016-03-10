var ecstatic = require('ecstatic')
var st = ecstatic(__dirname + '/public')
var http = require('http')
var fs = require('fs')
var server = http.createServer(function (req, res) {
  if (req.method === 'POST' && req.url === '/upload') {
    req.pipe(fs.createWriteStream('file-' + Math.random()))
    req.on('end', function () { res.end('ok\n') })
  } else st(req, res)
})
server.listen(5000)
