var wsock = require('websocket-stream')
var Proto = require('../')

var stream = wsock('ws://' + location.host)
var proto = Proto()
stream.pipe(proto).pipe(stream)

setInterval(function () {
  proto.time(function (t) {
    console.log('t=', t)
  })
}, 1000)
