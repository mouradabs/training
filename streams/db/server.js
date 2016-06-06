var http = require('http')
var level = require('level')
var db = level('kv.db')
var concat = require('concat-stream')
var qs = require('querystring')
var through = require('through2')

var server = http.createServer(function (req, res) {
  if (req.method === 'POST') {
    req.pipe(concat(function (body) {
      db.put(req.url, body.toString(), function (err) {
        if (err) res.end(err + '\n')
        else res.end('ok\n')
      })
    }))
  } else if (req.url.split('?')[0] === '/list') {
    var opts = qs.parse(req.url.split('?')[1] || '')
    db.createReadStream(opts)
      .pipe(through.obj(function (row, enc, next) {
        next(null, row.key + ' => ' + row.value + '\n')
      }))
      .pipe(res)
  } else {
    db.get(req.url, function (err, value) {
      if (err) res.end(err + '\n')
      else res.end(value + '\n')
    })
  }
})
server.listen(5000)
