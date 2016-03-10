var Routes = require('routes')
var router = Routes()
var h = require('virtual-dom/h')
module.exports = router

router.addRoute('/', function (m, state, emit) {
  return h('div', [
    h('h1', 'PERSONAL HOME PAGE'),
    h('a', { href: '/items' }, 'items')
  ])
  function onclick (ev) {
    ev.preventDefault()
    emit('page', '/items')
  }
})

router.addRoute('/about', function (m) {
  return h('div', [ 'This page is about me...' ])
})

router.addRoute('/items', function (m, state, emit) {
  return h('div', [
    h('div.items', state.items.map(function (item) {
      return h('div.item', [
        h('button', { onclick: remove }, [ 'x' ]),
        item
      ])
      function remove (ev) {
        emit('remove-item', item)
      }
    })),
    h('form', { onsubmit: onsubmit }, [
      h('input', { type: 'text', name: 'name' }),
      h('button', { type: 'submit' }, 'submit')
    ])
  ])
  function onsubmit (ev) {
    ev.preventDefault()
    var name = this.elements.name.value
    emit('add-item', name)
    this.reset()
  }
})
