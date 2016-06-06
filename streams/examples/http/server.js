var http = require('http')
var server = http.createServer(function (req, res) {
  if (req.method === 'POST') {
    req.pipe(process.stdout)
    res.end('ok cool\n')
  } else res.end('whatever\n')
})
server.listen(5000)
