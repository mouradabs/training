var html = require('yo-yo')
var strftime = require('strftime')
var split = require('split2')

var wsock = require('websocket-stream')
var stream = wsock('ws://' + location.host)

var root = document.querySelector('#content')
var state = { date: null }
function update () {
  html.update(root, render(state))
}
update()

function render (state) {
  return html`<div>
    <h1>the time</h1>
    <div>${state.date ? strftime('%T', state.date) : ''}</div>
  </div>`
}

stream.pipe(split()).on('data', function (buf) {
  state.date = new Date(Number(buf.toString()))
  update()
})
