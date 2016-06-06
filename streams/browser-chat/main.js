var html = require('yo-yo')
var wsock = require('websocket-stream')
var split = require('split2')
var to = require('to2')
var root = document.querySelector('#content')

var lines = []
update()

function update () {
  html.update(root, html`<div>
    <form onsubmit=${onsubmit}>
      <input type="text" name="text" />
    </form>
    ${lines.map(function (line) {
      return html`<div>${line}</div>`
    })}
  </div>`)
  function onsubmit (ev) {
    ev.preventDefault()
    stream.write(this.elements.text.value + '\n')
    this.reset()
  }
}

var stream = wsock('ws://' + location.host)
stream.pipe(split()).pipe(to(function (buf, enc, next) {
  lines.push(buf.toString())
  update()
  next()
}))
