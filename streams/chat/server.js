var net = require('net')
var onend = require('end-of-stream')
var randombytes = require('randombytes')
var split = require('split2')
var to = require('to2')

var streams = {}

var server = net.createServer(function (stream) {
  var id = randombytes(8).toString('hex')
  streams[id] = stream
  onend(stream, function () {
    delete streams[id]
  })

  stream.pipe(split()).pipe(to(function (buf, enc, next) {
    Object.keys(streams).forEach(function (key) {
      streams[key].write(buf.toString() + '\n')
    })
    next()
  }))
})
server.listen(5000)
