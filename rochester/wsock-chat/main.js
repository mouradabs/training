var wsock = require('websocket-stream')
var split = require('split2')
var to = require('to2')
var html = require('yo-yo')
var lines = []
var root = document.querySelector('#content')
update()

function update () {
  return html.update(root, html`<div>
    <form onsubmit=${onsubmit}>
      <input type="text" name="msg">
    </form>
    <div>
      ${lines.map(function (line) {
        return html`<div>${line}</div>`
      })}
    </div>
  </div>`)
  function onsubmit (ev) {
    ev.preventDefault()
    var msg = this.elements.msg.value
    stream.write(JSON.stringify({ msg: msg }) + '\n')
    this.reset()
  }
}

var stream = wsock('ws://' + location.host)

stream.pipe(split()).pipe(to(function (buf, enc, next) {
  try { var msg = JSON.parse(buf.toString()) }
  catch (err) { return console.error(err) }
  lines.push(msg.msg)
  update()
  next()
}))
