var net = require('net')
var host = process.argv[2]
var port = Number(process.argv[3])
var stream = net.connect(port, host)

// stream is a duplex stream
process.stdin.pipe(stream).pipe(process.stdout)
