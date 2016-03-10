var vdom = require('virtual-dom')
var h = vdom.h
var main = require('main-loop')
var loop = main({ times: 0 }, render, vdom)
document.body.appendChild(loop.target)

function render (state) {
  return h('div', [
    h('h1', 'pressed ' + state.times + ' times'),
    h('div', [
      h('button', { onclick: onclick }, 'increment')
    ])
  ])
  function onclick (ev) {
    loop.update({ times: state.times + 1 })
  }
}
