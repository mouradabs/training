var dragDrop = require('drag-and-drop-files')
var fileReader = require('filereader-stream')
var concat = require('concat-stream')
var xhr = require('xhr')

dragDrop(window, function (files) {
  files.forEach(function (file) {
    fileReader(file).pipe(concat(function (buf) {
      var src = 'data:' + file.type + ';base64,' + buf.toString('base64')
      var img = document.createElement('img')
      img.src = src
      document.body.appendChild(img)
      xhr.post({
        url: '/upload',
        body: buf
      }, function (err, res, body) {
        console.log('uploaded:', res.statusCode, body)
      })
    }))
  })
})
