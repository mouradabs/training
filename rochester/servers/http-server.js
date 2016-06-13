var http = require('http')
var fs = require('fs')
var server = http.createServer(function (req, res) {
  // req is a readable stream for POST, PUT methods
  // res is a writable stream
  console.log(req.method, req.url)
  //console.log(req.headers)

  res.statusCode = 200
  res.setHeader('content-type', 'text/html')
  res.end('<h1>some html</h1>\n')
})
server.listen(5002)
