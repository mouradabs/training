var http = require('http')

var req = http.request({
  method: 'POST',
  host: 'localhost',
  port: 5000,
  path: '/'
}, onreq)
req.end('hello whatever\n')

function onreq (res) {
  res.pipe(process.stdout)
}
