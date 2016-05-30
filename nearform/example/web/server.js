var http = require('http')
var fs = require('fs')
var ecstatic = require('ecstatic')
var st = ecstatic('public')
var body = require('body/any')

var server = http.createServer(function (req, res) {
  console.log(req.method, req.url)
  if (req.url === '/hello') {
    res.setHeader('content-type', 'text/html')
    res.end('<h1>hello</h1>\n')
  } else if (req.method === 'POST' && req.url === '/submit') {
    body(req, res, function (err, params) {
      if (err) {
        res.statusCode = 400
        res.end(err + '\n')
        return
      }
      console.log(params)
      res.end('got a post from: ' + params.email + '\n')
    })
  } else st(req, res)
})
server.listen(5000)
