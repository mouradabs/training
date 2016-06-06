var net = require('net')
var fs = require('fs')

var stream = net.connect(4000, 'localhost')
process.stdin.pipe(stream).pipe(process.stdout)
stream.pipe(fs.createWriteStream('log.txt'))
