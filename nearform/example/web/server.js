var http = require('http')
var fs = require('fs')
var ecstatic = require('ecstatic')
var st = ecstatic('public')
var body = require('body/any')
var Router = require('routes')

var router = Router()
router.addRoute('GET /hello', function (req, res) {
  res.setHeader('content-type', 'text/html')
  res.end('<h1>hello</h1>\n')
})

router.addRoute('GET /photos/:user', function (req, res, params) {
  res.end('photo page for ' + params.user + '\n')
})

router.addRoute('POST /submit', function (req, res, params) {
  body(req, res, function (err, params) {
    if (err) {
      res.statusCode = 400
      res.end(err + '\n')
      return
    }
    console.log(params)
    res.end('got a post from: ' + params.email + '\n')
  })
})

var server = http.createServer(function (req, res) {
  console.log(req.method, req.url)
  var m = router.match(req.method + ' ' + req.url)
  if (m) m.fn(req, res, m.params)
  else st(req, res)
})
server.listen(5000)
