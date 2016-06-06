var dup = require('./mod.js')('/tmp/foo/baz/bar')
dup.write('hello\n')
dup.end('whatever\n')
