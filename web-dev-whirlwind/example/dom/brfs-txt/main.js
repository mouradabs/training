var fs = require('fs')
var src = fs.readFileSync(__dirname + '/hello.txt', 'utf8')
console.log(src)
