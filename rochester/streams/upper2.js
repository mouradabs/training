     var through = require('through2')
     process.stdin
       .pipe(through(write, end))
       .pipe(process.stdout)
     
     function write (buf, enc, next) {
       this.push(buf.toString().toUpperCase())
       next()
     }
     function end (next) {
       this.push('\nEND\n')
       next()
     }
