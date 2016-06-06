var crypto = require('crypto')
var fs = require('fs')

var stream = crypto.createDecipher('aes192', 'password')
fs.createReadStream('secret.txt')
  .pipe(stream).pipe(process.stdout)
