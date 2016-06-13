var duplex = require('./duplex.js')()
duplex.write('hello')
duplex.end('!!!\n')
