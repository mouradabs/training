var hyperlog = require('hyperlog')
var hyperkv = require('hyperkv')
var level = require('level-browserify')
var html = require('yo-yo')
var wsock = require('websocket-stream')

var db = level('log')
var log = hyperlog(db, { valueEncoding: 'json' })
var kv = hyperkv({ db: level('index'), log: log })

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
    <form onsubmit=${sync}>
      <h1>sync</h1>
      <input type="text" value="ws://localhost:5001"
        name="href">
      <button type="submit"></button>
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
  function sync (ev) {
    ev.preventDefault()
    var stream = wsock(this.elements.href.value)
    stream.pipe(log.replicate()).pipe(stream)
  }
}
