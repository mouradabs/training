var h = require('virtual-dom/h')
var xtend = require('xtend')

var main = require('main-loop')
var state = {
  path: location.pathname
}
var router = require('./router.js')
var loop = main(state, render, require('virtual-dom'))
var target = document.querySelector('#content')
target.parentNode.replaceChild(loop.target, target)

var show = require('single-page')(function (href) {
  loop.update(xtend({ path: href }))
})
require('catch-links')(window, show)

function render (state) {
  var m = router.match(state.path)
  if (!m) return h('div.error', 'not found')
  else return m.fn(xtend(m, { state: state }))
}
