var vdom = require('virtual-dom')
var hyperx = require('hyperx')
var hx = hyperx(vdom.h)
var main = require('main-loop')
var loop = main({ times: 0 }, render, vdom)
document.body.appendChild(loop.target)

function render (state) {
  return hx`<div>
    <h1>pressed ${state.times} times</h1>
    <div>
      <button onclick=${onclick}>increment</button>
    </div>
  </div>`
  function onclick (ev) {
    loop.update({ times: state.times + 1 })
  }
}
