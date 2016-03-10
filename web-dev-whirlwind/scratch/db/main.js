var level = require('level-browserify')
var db = level('data', { valueEncoding: 'json' })
var EventEmitter = require('events').EventEmitter
var bus = new EventEmitter
db.createReadStream({
  gt: 'item!',
  lt: 'item!~'
}).on('data', function (row) {
  loop.state.items[row.key.split('!')[1]] = row.value
  loop.update(loop.state)
})

bus.on('add-item', function (key, name) {
  db.put('item!' + key, { name: name }, function (err) {
    if (err) console.error(err)
  })
  loop.state.items[key] = { name: name }
  loop.update(loop.state)
})

bus.on('remove-item', function (key) {
  db.del('item!' + key, function (err) {
    if (err) console.error(err)
  })
  delete loop.state.items[key]
  loop.update(loop.state)
})

var vdom = require('virtual-dom')
var h = vdom.h
var main = require('main-loop')
var loop = main({ items: [] }, render, vdom)
document.body.appendChild(loop.target)

function render (state) {
  return h('div', [
    h('div.items', Object.keys(state.items).map(function (key) {
      return h('div.item', [
        h('span', state.items[key].name),
        h('button', { onclick: remove }, 'x')
      ])
      function remove (ev) {
        bus.emit('remove-item', key)
      }
    })),
    h('form', { onsubmit: onsubmit }, [
      h('input', { type: 'text', name: 'name' })
    ])
  ])
  function onsubmit (ev) {
    ev.preventDefault()
    var key = new Date().toISOString()
    bus.emit('add-item', key, this.elements.name.value)
    this.reset()
  }
}
