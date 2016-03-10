var fs = require('fs')
var src = fs.readFileSync('apatosaur.png', 'base64')
var img = document.createElement('img')
img.src = 'data:image/png;base64,' + src
document.body.appendChild(img)
