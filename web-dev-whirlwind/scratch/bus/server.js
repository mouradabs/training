var http = require('http')
var router = require('./routes.js')
var ecstatic = require('ecstatic')
var st = ecstatic(__dirname + '/public')
var createElement = require('virtual-dom').create

var server = http.createServer(function (req, res) {
  var m = router.match(req.url)
  if (m) {
    var tree = m.fn(m, { path: req.url, items: [] }, function () {})
    res.setHeader('content-type', 'text/html')
    res.end('<body>'
      + createElement(tree).toString()
      + '<script src="/bundle.js"></script>'
    + '</body>')
  }
  else st(req, res)
})
server.listen(5000)
