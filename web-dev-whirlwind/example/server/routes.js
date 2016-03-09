// server using the routes package for routing

var http = require('http')
var Router = require('routes')
var router = Router()

router.addRoute('/hello', function (req, res, m) {
  res.end('oh hello\n')
})

router.addRoute('/hello/:name', function (req, res, m) {
  res.end('hello ' + m.params.name + '\n')
})

var server = http.createServer(function (req, res) {
  var m = router.match(req.url)
  if (m) m.fn(req, res, m)
  else {
    res.statusCode = 404
    res.end('not found\n')
  }
})
server.listen(5000)
