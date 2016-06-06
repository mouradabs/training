var duplexify = require('duplexify')
var mkdirp = require('mkdirp')
var fs = require('fs')
var path = require('path')

module.exports = function (dir) {
  var d = duplexify()
  mkdirp(dir, function (err) {
    if (err) return d.emit('error', err)
    var file = path.join(dir, 'output.txt')
    d.setWritable(fs.createWriteStream(file))
  })
  return d
}
