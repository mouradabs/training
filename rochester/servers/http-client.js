var http = require('http')
var req = http.request({
  method: 'GET', // this is the default
  host: 'localhost',
  port: 5002,
  path: '/'
}, onresponse)
req.end()

function onresponse (res) {
  console.log(res.statusCode, res.headers['content-type'])
  res.pipe(process.stdout)
}
