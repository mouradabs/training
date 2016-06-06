var zlib = require('zlib')
process.stdin
  .pipe(zlib.createGzip())
  .pipe(process.stdout)
