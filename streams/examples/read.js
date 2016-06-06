var fs = require('fs')
fs.createReadStream('hello.txt')
  .pipe(process.stdout)
