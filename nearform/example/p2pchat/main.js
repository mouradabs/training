var html = require('yo-yo')
var strftime = require('strftime')
var split = require('split2')
var through = require('through2')
var onend = require('end-of-stream')
var randombytes = require('randombytes')

var root = document.querySelector('#content')
var state = { lines: [] }
function update () {
  html.update(root, render(state))
}
update()

var streams = {}
var wswarm = require('webrtc-swarm')
var signalhub = require('signalhub')

var swarm = wswarm(signalhub('chat-demo', [
  'https://signalhub.mafintosh.com'
]))

var seen = {}
swarm.on('peer', function (stream, id) {
  console.log('peer connected')
  streams[id] = stream
  stream.pipe(split()).pipe(through(function (buf, enc, next) {
    var parts = buf.toString().split(',')
    var id = parts[0]
    var msg = parts.slice(1).join(',')
    if (seen[id]) return next()
    seen[id] = true
    state.lines.push(msg)
    update()

    Object.keys(streams).forEach(function (key) {
      streams[key].write(buf + '\n')
    })
    next()
  }))
  onend(stream, function () {
    console.log('peer disconnected')
    delete streams[id]
  })
})

function render (state) {
  return html`<div>
    <h1>chat</h1>
    <form onsubmit=${onsubmit}>
      <input type="text" name="msg">
    </form>
    <div>
      ${state.lines.map(function (line) {
        return html`<div>${line}</div>`
      })}
    </div>
  </div>`
  function onsubmit (ev) {
    ev.preventDefault()
    var msg = this.elements.msg.value
    var id = randombytes(8).toString('hex')
    seen[id] = true
    Object.keys(streams).forEach(function (key) {
      streams[key].write(id + ',' + msg + '\n')
    })
    this.reset()
    state.lines.push(msg)
    update()
  }
}
