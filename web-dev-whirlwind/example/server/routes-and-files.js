// routing with routes and serving static files with ecstatic

var Router = require('routes')
var router = Router()
router.addRoute('/hello', function (req, res, m) {
  res.end('oh hello\n')
})

router.addRoute('/hello/:name', function (req, res, m) {
  res.end('hello ' + m.params.name + '\n')
})

var ecstatic = require('ecstatic')
var st = ecstatic(__dirname + '/public')

var http = require('http')
var server = http.createServer(function (req, res) {
  var m = router.match(req.url)
  if (m) m.fn(req, res, m)
  else st(req, res)
})
server.listen(5000)
