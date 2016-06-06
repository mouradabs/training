var fs = require('fs')

process.stdin
  .pipe(fs.createWriteStream('input.txt'))
