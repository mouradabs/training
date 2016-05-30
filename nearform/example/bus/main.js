var html = require('yo-yo')
var EventEmitter = require('events').EventEmitter

var state = { clicks: 0 }
var root = document.querySelector('#content')
var bus = new EventEmitter
bus.on('increment', function () {
  state.clicks++
  update()
})
update()

function update () {
  html.update(root, render(state))
}

function render (state) {
  return html`<div>
    <button onclick=${onclick}>click me</button>
    <h1>${state.clicks}</h1>
  </div>`
  function onclick (ev) {
    bus.emit('increment')
  }
}
