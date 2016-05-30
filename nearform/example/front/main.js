var xhr = require('xhr')
var strftime = require('strftime')
var fs = require('fs')
var formatString = fs.readFileSync('format.txt', 'utf8')

setInterval(function () {
  xhr('/time', function (err, res, body) {
    var d = new Date(Number(body))
    document.body.innerText = strftime(formatString, d)
  })
}, 1000)
