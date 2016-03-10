var fs = require('fs')
var path = require('path')
var xtend = require('xtend')
var hyperstream = require('hyperstream')

var ecstatic = require('ecstatic')
var st = ecstatic(path.join(__dirname, 'public'))
var createElement = require('virtual-dom/create-element')

var http = require('http')
var router = require('./router.js')

var server = http.createServer(function (req, res) {
  var state = { path: req.url }
  var m = router.match(req.url)
  if (m) {
    var elem = createElement(m.fn(xtend(m, { state: state })))
    read('index.html').pipe(hyperstream({
      '#content': elem.toString()
    })).pipe(res)
  }
  else st(req, res)
})
server.listen(8000)

function read (x) {
  return fs.createReadStream(path.join(__dirname, 'public', x))
}
