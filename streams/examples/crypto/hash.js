var crypto = require('crypto')
process.stdin.pipe(crypto.createHash('sha512'))
  .pipe(process.stdout)
