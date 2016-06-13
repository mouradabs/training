var wsock = require('websocket-stream')
var split = require('split2')
var to = require('to2')

var stream = wsock('ws://' + location.host)

stream.pipe(split()).pipe(to(function (buf, enc, next) {
  try { var msg = JSON.parse(buf.toString()) }
  catch (err) { return console.error(err) }

  var pre = document.createElement('pre')
  pre.textContent = msg.n
  document.body.appendChild(pre)

  next()
}))
