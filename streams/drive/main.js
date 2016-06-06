var hyperdrive = require('hyperdrive')
var level = require('level-browserify')
var sub = require('subleveldown')
var collect = require('collect-stream')
var concat = require('concat-stream')
var db = level('drive2.db')
var info = sub(db, 'info')
var html = require('yo-yo')
var wsock = require('websocket-stream')
var root = document.querySelector('#content')

var state = { files: [] }
var archive
update()

info.get('link', function (err, link) {
  var drive = hyperdrive(sub(db, 'drive'))
  if (link) link = Buffer(link, 'hex')
  archive = drive.createArchive(link, { live: true })
  if (!link) info.put('link', archive.key.toString('hex'))
  list()
})

function list () {
  collect(archive.list(), function (err, files) {
    console.log('files=', files)
    state.files = files
    update()
  })
}

function update () {
  html.update(root, html`<div>
    <form onsubmit=${onsubmit}>
      file=<input type="text" name="filename">
      <div><textarea name="contents"></textarea></div>
      <button type="submit">submit</button>
    </form>
    <form onsubmit=${replicate}>
      <input type="text" name="href">
      <button type="submit">replicate</button>
    </form>
    ${state.files.map(function (file) {
      return html`<div><a onclick=${show}>${file.name}</a></div>`
      function show () {
        archive.createFileReadStream(file.name)
          .pipe(concat(function (body) {
            console.log('body=', body)
            location.href = 'data:text/plain,' + body
          }))
      }
    })}
  </div>`)

  function onsubmit (ev) {
    ev.preventDefault()
    var file = this.elements.filename.value
    var stream = archive.createFileWriteStream(file)
    stream.on('finish', list)
    stream.end(this.elements.contents.value)
  }
  function replicate (ev) {
    ev.preventDefault()
    var href = this.elements.href.value
    var stream = wsock(href)
    var r = archive.replicate()
    stream.pipe(r).pipe(stream)
    r.on('finish', list)
  }
}
