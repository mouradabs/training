var vdom = require('virtual-dom')
var main = require('main-loop')
var router = require('./routes.js')
var EventEmitter = require('events').EventEmitter
var bus = new EventEmitter

var loop = main({
  items: [],
  path: location.pathname
}, render, vdom)
document.body.replaceChild(loop.target, document.body.childNodes[0])

require('./actions.js')(bus, loop)

function render (state) {
  var m = router.match(state.path)
  if (m) return m.fn(m, state, bus.emit.bind(bus))
  else return vdom.h('div', 'not found')
}
