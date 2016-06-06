var crypto = require('crypto')
var h = crypto.createHash('sha512')
h.setEncoding('hex')
process.stdin.pipe(h).pipe(process.stdout)
