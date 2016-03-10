var wswarm = require('webrtc-swarm')
var signalhub = require('signalhub')
var swarm = wswarm(signalhub(
  'webrtc-example',
  ['https://signalhub.mafintosh.com']
))

var split = require('split2')
var through = require('through2')

swarm.on('peer', function (stream, id) {
  console.log('CONNECTED', id)

  stream.pipe(split()).pipe(through(function (line, enc, next) {
    console.log(id + ': ' + line)
    next()
  }))
  
  setInterval(function () {
    stream.write(new Date().toISOString() + '\n')
  }, 1000)
})
