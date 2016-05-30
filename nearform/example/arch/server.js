var http = require('http')
var router = require('./router.js')
var ecstatic = require('ecstatic')
var st = ecstatic(__dirname + '/public')
var fs = require('fs')

var server = http.createServer(function (req, res) {
  var m = router.match(req.method + ' ' + req.url)
  if (m) {
    m.fn(m.params, getData, function (err, tree) {
      if (err) {
        res.statusCode = 500
        res.end(err + '\n')
      } else {
        res.setHeader('content-type', 'text/html')
        res.end(tree.toString())
      }
    })
  } else if (req.url === '/posts.json') {
    getData('posts', function (err, data) {
      if (err) res.end(err + '\n')
      else res.end(JSON.stringify(data))
    })
  } else st(req, res)
})
server.listen(5000)

function getData (topic, cb) {
  if (topic === 'posts') {
    fs.readFile('posts.json', function (err, src) {
      if (err) cb(err)
      else cb(null, JSON.parse(src))
    })
  } else cb(null)
}
