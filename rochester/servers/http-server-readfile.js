var http = require('http')
var fs = require('fs')
var server = http.createServer(function (req, res) {
  // req is a readable stream for POST, PUT methods
  // res is a writable stream
  console.log(req.method, req.url)
  //console.log(req.headers)

  res.setHeader('content-type', 'text/html')
  fs.readFile('file.html', function (err, src) {
    if (err) {
      res.statusCode = 500
      res.end(err + '\n')
    } else res.end(src)
  })
})
server.listen(5002)
