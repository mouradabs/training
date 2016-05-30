var http = require('http')
var fs = require('fs')
var ecstatic = require('ecstatic')
var st = ecstatic('public')
var concat = require('concat-stream')
var qs = require('querystring')

var server = http.createServer(function (req, res) {
  console.log(req.method, req.url)
  if (req.url === '/hello') {
    res.setHeader('content-type', 'text/html')
    res.end('<h1>hello</h1>\n')
  } else if (req.method === 'POST' && req.url === '/submit') {
    req.pipe(concat(function (body) {
      var params = qs.parse(body.toString())
      console.log(params)
      res.end('got a post from: ' + params.email + '\n')
    }))
  } else st(req, res)
})
server.listen(5000)
