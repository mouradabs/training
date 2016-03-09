var http = require('http')
var body = require('body/any')
var fs = require('fs')

var router = require('routes')()
router.addRoute('/order', function (req, res, m) {
  if (req.method !== 'POST') return error(400, res, 'expected POST')
  body(req, res, function (err, params) {
    if (err) return error(500, res, err)
    res.end('submitted order: '
      + params.item + ' x ' + params.quantity + '\n')
  })
})

var server = http.createServer(function (req, res) {
  var m = router.match(req.url)
  if (m) m.fn(req, res, m)
  else {
    if (req.url === '/') req.url = '/form.html'
    st(req, res)
  }
})
server.listen(5000)

function error (code, res, err) {
  res.statusCode = 500
  res.end('error: ' + (err.message || err) + '\n')
}
