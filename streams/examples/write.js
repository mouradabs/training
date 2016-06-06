var fs = require('fs')

var stream = fs.createWriteStream('output.txt')
stream.write('whatever\n')
stream.write('hey')
stream.write(' cool\n')
stream.end('!!!\n')
