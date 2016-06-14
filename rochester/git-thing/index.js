var proc = require('child_process')
var split = require('split2')
var through = require('through2')
var readonly = require('read-only-stream')

module.exports = Git

function Git (opts) {
  if (!(this instanceof Git)) return new Git(opts)
  if (!opts) opts = {}
  this.cwd = opts.cwd || process.cwd()
}

Git.prototype.history = function () {
  var ps = proc.spawn('git', ['log'])
  var stream = through.obj(write, end)
  var commit = null
  ps.stdout.pipe(split()).pipe(stream)
  return readonly(stream)

  function write (buf, enc, next) {
    var line = buf.toString()
    if (/^commit/.test(line)) {
      if (commit) this.push(commit)
      commit = { hash: line.split(/\s+/)[1] }
    }
    next()
  }
  function end (next) {
    this.push(commit)
    next()
  }
}
