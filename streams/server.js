var concat = require('concat-stream')
var qs = require('querystring')
var http = require('http')
var server = http.createServer(function (req, res) {
  req.pipe(concat(function (body) {
    var params = qs.parse(body.toString())
    console.log('params=', params)
    res.end('ok\n')
  }))
})
server.listen(5000)
