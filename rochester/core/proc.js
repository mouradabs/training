var child = require('child_process')

var ps = child.spawn('cal', ['-3'])
ps.stdout.pipe(process.stdout)

/*
child.exec('ls -1 /dev', function (err, stdout, stderr) {
  if (err) return console.error(err)
  console.log(stdout.toString())
})
*/

// ps.stdin is writable
// ps.stdout is readable
// ps.stderr is readable

