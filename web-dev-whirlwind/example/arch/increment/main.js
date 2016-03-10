var EventEmitter = require('events').EventEmitter
var bus = new EventEmitter

var vdom = require('virtual-dom')
var h = vdom.h
var main = require('main-loop')
var loop = main({ times: 0 }, render, vdom)
document.querySelector('#content').appendChild(loop.target)

require('./actions.js')(bus, loop)

function render (state) {
  return h('div', [
    h('h1', 'clicked ' + state.times + ' times'),
    h('div', [
      h('button', { onclick: onclick }, 'click me')
    ])
  ])
  function onclick (ev) {
    bus.emit('increment')
  }
}
