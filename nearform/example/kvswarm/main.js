var hyperlog = require('hyperlog')
var hyperkv = require('hyperkv')
var level = require('level-browserify')
var html = require('yo-yo')

var db = level('log')
var log = hyperlog(db, { valueEncoding: 'json' })
var kv = hyperkv({ db: level('index'), log: log })

var wswarm = require('webrtc-swarm')
var signalhub = require('signalhub')
var onend = require('end-of-stream')
var swarm = wswarm(signalhub('kv-demo', [
  'https://signalhub.mafintosh.com'
]))
swarm.on('peer', function (peer, id) {
  console.log('PEER CONNECTED', id)
  peer.pipe(log.replicate({ live: true })).pipe(peer)
  onend(peer, function () {
    console.log('PEER DISCONNECTED', id)
  })
})

var state = { values: {} }

var root = document.querySelector('#content')
function update () { html.update(root, render(state)) }
update()

function render (state) {
  return html`<div>
    <form onsubmit=${get}>
      <h1>get</h1>
      <input type="text" name="key">
      <button type="submit">get</button>
      <div>
        ${JSON.stringify(state.values)}
      </div>
    </form>
    <form onsubmit=${set}>
      <h1>set</h1>
      <input type="text" name="key">
      <input type="text" name="value">
      <button type="submit">set</button>
    </form>
  </div>`

  function get (ev) {
    ev.preventDefault()
    kv.get(this.elements.key.value, function (err, values) {
      console.log('onget', err, values)
      state.values = values
      update()
    })
  }
  function set (ev) {
    ev.preventDefault()
    var key = this.elements.key.value
    var value = this.elements.value.value
    kv.put(key, value, function (err, node) {
      console.log('onput', err, node)
    })
  }
}
