var multiplex = require('multiplex')
var RPC = require('rpc-stream')

module.exports = function () {
  var plex = multiplex()
  var control = plex.createSharedStream('control')
  var rpc = RPC({
    time: function (cb) {
      cb(Date.now())
    }
  })
  var client = rpc.wrap(['time'])
  control.pipe(rpc).pipe(control)
  plex.time = function (cb) {
    client.time(cb)
  }
  return plex
}
