var http = require('http')
var qs = require('querystring')
var concat = require('concat-stream')
var through = require('through2')

var server = http.createServer(function (req, res) {
  if (req.method === 'POST') {
    req.pipe(sizeCheck()).pipe(concat(function (body) {
      var params = qs.parse(body.toString())
      console.log('params=', params)
      res.end('ok\n')
    }))
  } else res.end('not found\n')
})
server.listen(5000)

function sizeCheck () {
  var size = 0
  return through(function (buf, enc, next) {
    size += buf.length
    if (size > 1e4) next(null, null)
    else next(null, buf)
  })
}
