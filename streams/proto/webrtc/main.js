var wswarm = require('webrtc-swarm')
var Proto = require('../')
var onend = require('end-of-stream')

var signalhub = require('signalhub')
var swarm = wswarm(signalhub('test-time', [
  'https://signalhub.mafintosh.com'
]))
swarm.on('peer', function (peer, id) {
  console.log('CONNECTED')
  var proto = Proto()
  peer.pipe(proto).pipe(peer)

  var iv = setInterval(function () {
    proto.time(function (t) {
      console.log('t=', t)
    })
  }, 1000)
  onend(peer, function () {
    clearInterval(iv)
  })
})
