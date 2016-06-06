var fs = require('fs')
var proc = require('child_process')

var ps = proc.spawn('wc', ['-l'])
ps.stdin.write('one\ntwo\nthree\n')
ps.stdin.end('four\nfive\n')
ps.stdout.pipe(process.stdout)
