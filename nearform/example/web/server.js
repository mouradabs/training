var http = require('http')
var server = http.createServer(function (req, res) {
  console.log(req.method, req.url)
  res.setHeader('content-type', 'text/html')
  res.end('<h1>hello</h1>\n')
})
server.listen(5000)
