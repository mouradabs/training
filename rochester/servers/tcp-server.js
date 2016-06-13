var net = require('net')
var server = net.createServer(function (stream) {
  stream.write('HELLO!\n')
  stream.pipe(stream)
})
server.listen(5001)
