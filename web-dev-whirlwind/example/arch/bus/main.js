var EventEmitter = require('events').EventEmitter
var bus = new EventEmitter

var vdom = require('virtual-dom')
var h = vdom.h
var main = require('main-loop')
var loop = main({ items: [] }, render, vdom)
document.querySelector('#content').appendChild(loop.target)

require('./actions.js')(bus, loop)

function render (state) {
  return h('div', [
    h('div.items', state.items.map(function (item, index) {
      return h('div.item', [
        h('button', { onclick: remove }, 'x'),
        h('span.name', item),
      ])
      function remove (ev) { bus.emit('remove-item', index) }
    })),
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
