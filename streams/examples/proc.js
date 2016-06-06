var fs = require('fs')
var proc = require('child_process')

var ps = proc.spawn('git', ['log'])
ps.stdout.pipe(fs.createWriteStream('git-log.txt'))
