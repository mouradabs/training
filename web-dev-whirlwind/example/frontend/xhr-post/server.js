var ecstatic = require('ecstatic')
var st = ecstatic(__dirname)

var http = require('http')
var server = http.createServer(function (req, res) {
  if (req.method === 'POST') {
    req.pipe(process.stdout)
    req.on('end', function () { res.end('ok\n') })
  } else st(req, res)
})
server.listen(5000)
