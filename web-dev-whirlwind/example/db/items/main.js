var EventEmitter = require('events').EventEmitter
var bus = new EventEmitter
var level = require('level-browserify')
var db = level('items', { valueEncoding: 'json' })

var vdom = require('virtual-dom')
var h = vdom.h
var main = require('main-loop')
var loop = main({ items: null }, render, vdom)
document.querySelector('#content').appendChild(loop.target)

require('./actions.js')(bus, loop, db)

function render (state) {
  var items = state.items
    ? Object.keys(state.items).map(function (key) {
      return h('div.item', [
        h('button', { onclick: remove }, 'x'),
        h('span.name', state.items[key]),
      ])
      function remove (ev) { bus.emit('remove-item', key) }
    })
    : '...'

  return h('div', [
    h('div.items', items),
    h('form', { onsubmit: additem }, [
      h('input', { type: 'text', name: 'item-name' })
    ])
  ])
  function additem (ev) {
    ev.preventDefault()
    bus.emit('add-item', this.elements['item-name'].value)
    this.reset()
  }
}
