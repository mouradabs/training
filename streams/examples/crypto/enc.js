var crypto = require('crypto')
var fs = require('fs')

var stream = crypto.createCipher('aes192', 'password')
process.stdin.pipe(stream)
  .pipe(fs.createWriteStream('secret.txt'))
