var duplexify = require('duplexify')
var mkdirp = require('mkdirp')
var fs = require('fs')

module.exports = function () {
  var d = duplexify()
  mkdirp('/tmp/foo/bar/baz/whatever', function (err) {
    if (err) return d.emit('error', err)
    d.setWritable(fs.createWriteStream('/tmp/foo/bar/baz/whatever/cool.txt'))
  })
  return d
}
