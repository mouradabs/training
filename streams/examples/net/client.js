var net = require('net')
var stream = net.connect(4000, 'localhost')
process.stdin.pipe(stream).pipe(process.stdout)
