var http = require('http')
var fs = require('fs')
var ecstatic = require('ecstatic')
var st = ecstatic('public')

var server = http.createServer(function (req, res) {
  console.log(req.method, req.url)
  if (req.url === '/hello') {
    res.setHeader('content-type', 'text/html')
    res.end('<h1>hello</h1>\n')
  } else st(req, res)
})
server.listen(5000)
