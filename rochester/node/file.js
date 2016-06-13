var fs = require('fs')

fs.readFile('hello.txt', 'utf8', function (err, src) {
  if (err) console.error(err)
  else console.log(src)
})

fs.readFile('hello.txt', 'utf8', onread)

function onread (err, src) {
  if (err) console.error(err)
  else console.log(src)
}
