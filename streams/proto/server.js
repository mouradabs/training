var net = require('net')
var Proto = require('./')

var server = net.createServer(function (stream) {
  var proto = Proto()
  stream.pipe(proto).pipe(stream)
  setInterval(function () {
    proto.time(function (t) {
      console.log('t=', t)
    })
  }, 1000)
})
server.listen(5000)
