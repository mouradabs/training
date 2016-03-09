var http = require('http')
var body = require('body/any')
var fs = require('fs')

var server = http.createServer(function (req, res) {
  if (req.url === '/') {
    res.setHeader('content-type', 'text/html')
    fs.createReadStream(__dirname + '/public/form.html').pipe(res)
  } else if (req.method === 'POST' && req.url === '/order') {
    body(req, res, function (err, params) {
      if (err) return error(500, res, err)
      res.end('submitted order: '
        + params.item + ' x ' + params.quantity + '\n')
    })
  } else {
    res.statusCode = 404
    res.end('not found\n')
  }
})
server.listen(5000)

function error (code, res, err) {
  res.statusCode = 500
  res.end('error: ' + (err.message || err) + '\n')
}
