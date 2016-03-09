var dragDrop = require('drag-and-drop-files')
var fileReader = require('filereader-stream')
var concat = require('concat-stream')
var path = require('path')

dragDrop(window, function (files) {
  files.forEach(function (file) {
    fileReader(file).pipe(concat({ encoding: 'buffer' }, function (buf) {
      var ext = path.extname(file.name).slice(1)
      if (ext === 'svg') ext = 'svg+xml'
      var img = document.createElement('img')
      var src = 'data:image/' + ext + ';base64,' + buf.toString('base64')
      img.setAttribute('src', src)
      document.body.appendChild(img)
    }))
  })
})
