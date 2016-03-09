var fs = require('fs')
var data = fs.readFileSync(__dirname + '/apatosaur.png', 'base64')

var img = document.createElement('img')
img.src = 'data:image/png;base64,' + data
document.body.appendChild(img)
