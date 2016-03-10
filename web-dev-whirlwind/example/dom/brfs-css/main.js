var fs = require('fs')
var insertcss = require('insert-css')
insertcss(fs.readFileSync(__dirname + '/whatever.css', 'utf8'))

var div = document.createElement('div')
div.className = 'whatever'
div.innerText = 'blah'
document.body.appendChild(div)
