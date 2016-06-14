var http = require('http')
var randombytes = require('crypto').randomBytes

var tokens = {}
var elements = []

var server = http.createServer(function (req, res) {
  if (req.url === '/token') {
    var token = randombytes(8).toString('hex')
    tokens[token] = true
    res.end(token)
  } else if (req.url === '/clear') {
    if (check()) return
    elements = []
    res.end('ok\n')
  } else if (req.url === '/list') {
    if (check()) return
    res.end(elements.join('\n'))
  } else if (req.url.split('/')[1] === 'add') {
    if (check()) return
    elements.push(req.url.split('/')[2])
    res.end('ok\n')
  } else {
    res.statusCode = 404
    res.end('not found\n')
  }
  function check () {
    if (!tokens.hasOwnProperty(req.headers.token)) {
      res.statusCode = 403
      res.end('ACCESS DENIED')
      return true
    }
  }
})
server.listen(Number(process.argv[2]))
