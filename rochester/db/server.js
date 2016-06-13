var http = require('http')
var router = require('routes')()
var fs = require('fs')
var level = require('level')
var db = level('webscale.db', { valueEncoding: 'json' })
var path = require('path')
var html = require('yo-yo')

var mkdirp = require('mkdirp')
mkdirp.sync(__dirname + '/public/files')

var randombytes = require('crypto').randomBytes
var strftime = require('strftime')
var collect = require('collect-stream')

router.addRoute('GET /', function (req, res, params) {
  res.setHeader('content-type', 'text/html')
  collect(db.createReadStream({ reverse: true }), function (err, docs) {
    res.end(html`<div>
      ${docs.map(function (doc) {
        return html`<div>
          <a href="files/${doc.value.file}">${doc.key}</a>
        </div>`
      })}
    </div>`.toString())
  })
})

router.addRoute('GET /info/:id', function (req, res, params) {
  db.get(params.id, function (err, value) {
    res.end(JSON.stringify(value, null, 2))
  })
})

router.addRoute('POST /upload', function (req, res, params) {
  var file = __dirname + '/public/files/'
    + randombytes(8).toString('hex') + '.png'
  req.pipe(fs.createWriteStream(file))
    .on('finish', function () {
      var key = strftime('%F %T', new Date)
      db.put(key, { file: path.basename(file) }, function (err) {
        if (err) res.end(err + '\n')
        else res.end('ok\n')
      })
    })
})

var ecstatic = require('ecstatic')
var st = ecstatic(__dirname + '/public')

var server = http.createServer(function (req, res) {
  var m = router.match(req.method + ' ' + req.url)
  if (m) m.fn(req, res, m.params)
  else st(req, res)
})
server.listen(5000)
