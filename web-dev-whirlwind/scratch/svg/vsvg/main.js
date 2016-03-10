var hsvg = require('virtual-hyperscript-svg')
var vdom = require('virtual-dom')
var hyperx = require('hyperx')
var svg = hyperx(hsvg)
var html = hyperx(vdom.h)
var xtend = require('xtend')

var main = require('main-loop')
var loop = main({
  pos: [200,200], vel: [0,0]
}, render, vdom)
document.body.appendChild(loop.target)

var last = Date.now()
function frame () {
  var now = Date.now()
  var dt = (last - now) / 1000
  last = now
  loop.update(xtend(loop.state, {
    pos: [
      loop.state.pos[0] + loop.state.vel[0] * 200 * dt,
      loop.state.pos[1] + loop.state.vel[1] * 200 * dt
    ]
  }))
  window.requestAnimationFrame(frame)
}
window.requestAnimationFrame(frame)

window.addEventListener('keydown', function (ev) {
  if (ev.keyCode === 37) {
    loop.update(xtend(loop.state, { vel: [+1,0] }))
  } else if (ev.keyCode === 39) {
    loop.update(xtend(loop.state, { vel: [-1,0] }))
  }
})
window.addEventListener('keyup', function (ev) {
  loop.update(xtend(loop.state, { vel: [0,0] }))
})

function render (state) {
  return html`<div>
    <h1>HELLO</h1>
    ${createSvg(state)}
  </div>`
}

function createSvg (state) {
  return svg`<svg width="100%" height="100%">
    <circle r="50" cx="${state.pos[0]}" cy="${state.pos[1]}"
      fill="purple"
    />
  </svg>`
}
