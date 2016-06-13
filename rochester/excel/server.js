var parseXlsx = require('excel')
var http = require('http')
var fs = require('fs')
var path = require('path')
var tmpdir = require('os').tmpdir()
var randombytes = require('crypto').randomBytes

var server = http.createServer(function (req, res) {
  if (req.method === 'POST') {
    var tmpfile = path.join(tmpdir, randombytes(8).toString('hex'))
    req.pipe(fs.createWriteStream(tmpfile))
      .once('finish', function () {
        parseXlsx(tmpfile, onparse)
      })
  } else res.end('send a POST to get some json\n')

  function onparse (err, data) {
    if (err) {
      res.statusCode = 400
      res.end(err + '\n')
    } else {
      res.setHeader('content-type', 'text/json')
      res.end(JSON.stringify(data))
    }
  }
})
server.listen(5000)
