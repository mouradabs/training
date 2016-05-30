var http = require('http')
var fs = require('fs')

var server = http.createServer(function (req, res) {
  console.log(req.method, req.url)
  if (req.url === '/cool') {
    var stream = fs.createReadStream('cool.txt')
    stream.on('error', function (err) {
      res.statusCode = 500
      res.end('something went wrong: ' + err + '\n')
    })
    res.setHeader('content-type', 'text/html')
    stream.pipe(res)

    /*
    fs.readFile('cool.txt', function (err, src) {
      if (err) {
        res.statusCode = 500
        res.end('something went wrong: ' + err + '\n')
      } else {
        res.setHeader('content-type', 'text/html')
        res.end(src)
      }
    })
    */
  } else {
    res.setHeader('content-type', 'text/html')
    res.end('<h1>hello</h1>\n')
  }
})
server.listen(5000)
