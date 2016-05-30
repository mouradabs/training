var xhr = require('xhr')
var strftime = require('strftime')
var fs = require('fs')
var formatString = fs.readFileSync('format.txt', 'utf8')

var html = require('yo-yo')
var root = document.querySelector('#content')

function render (date) {
  return html`<div>
    <h1>hello</h1>
    <div>${strftime(formatString, date)}</div>
  </div>`
}

setInterval(function () {
  xhr('/time', function (err, res, body) {
    var d = new Date(Number(body))
    html.update(root, render(d))
  })
}, 1000)
