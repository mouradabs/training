var zlib = require('zlib')
process.stdin
  .pipe(zlib.createGunzip())
  .pipe(process.stdout)
