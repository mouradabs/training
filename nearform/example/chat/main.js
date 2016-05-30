var html = require('yo-yo')
var strftime = require('strftime')
var split = require('split2')

var wsock = require('websocket-stream')
var stream = wsock('ws://' + location.host)

var root = document.querySelector('#content')
var state = { lines: [] }
function update () {
  html.update(root, render(state))
}
update()

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
    stream.write(msg + '\n')
    this.reset()
  }
}

stream.pipe(split()).on('data', function (buf) {
  state.lines.push(buf.toString())
  update()
})
